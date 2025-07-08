// Exercise 5: Friends API - MVC Architecture
// This file handles the frontend interactions with the MVC-structured Friends API

class Exercise5 {
    constructor() {
        this.baseUrl = 'http://localhost:3005';
        this.friends = [];
        this.filteredFriends = [];
        this.currentFilter = { gender: '', name: '' };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAllFriends();
        this.addKeyboardSupport();
    }

    setupEventListeners() {
        // Filter input listeners
        const nameFilter = document.getElementById('nameFilter');
        const genderFilter = document.getElementById('genderFilter');

        if (nameFilter) {
            nameFilter.addEventListener('input', this.debounce(() => {
                this.currentFilter.name = nameFilter.value;
                this.applyFilters();
            }, 300));
        }

        if (genderFilter) {
            genderFilter.addEventListener('change', () => {
                this.currentFilter.gender = genderFilter.value;
                this.applyFilters();
            });
        }

        // Add friend form listener
        const addFriendForm = document.getElementById('addFriendForm');
        if (addFriendForm) {
            addFriendForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddFriend();
            });
        }

        // Modal close on outside click
        const modal = document.getElementById('addFriendModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAddFriendForm();
                }
            });
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAddFriendForm();
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.showAddFriendForm();
            }
        });
    }

    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    async loadAllFriends() {
        this.showLoading('Loading friends from MVC API...');

        try {
            const response = await this.makeRequest(`${this.baseUrl}/friends`);

            if (response.success) {
                this.friends = response.data || [];
                this.filteredFriends = [...this.friends];
                this.displayFriends(this.filteredFriends);
                this.updateFriendsCount();
            } else {
                throw new Error(response.message || 'Failed to load friends');
            }
        } catch (error) {
            this.showError(`Failed to load friends: ${error.message}`);
        }
    }

    async applyFilters() {
        const { gender, name } = this.currentFilter;

        this.filteredFriends = this.friends.filter(friend => {
            const matchesGender = !gender || friend.gender === gender;
            const matchesName = !name || friend.name.toLowerCase().includes(name.toLowerCase());
            return matchesGender && matchesName;
        });

        this.displayFriends(this.filteredFriends);
        this.updateFriendsCount();
    }

    async loadRandomFriend() {
        this.showLoading('Loading random friend...');

        try {
            const response = await this.makeRequest(`${this.baseUrl}/friends/random`);

            if (response.success) {
                this.displayFriends([response.data]);
                this.updateFriendsCount(1);
            } else {
                throw new Error(response.message || 'Failed to load random friend');
            }
        } catch (error) {
            this.showError(`Failed to load random friend: ${error.message}`);
        }
    }

    async loadApiInfo() {
        this.showLoading('Loading MVC architecture information...');

        try {
            const response = await this.makeRequest(`${this.baseUrl}/info`);

            if (response.success) {
                this.displayArchitectureInfo(response.data);
            } else {
                throw new Error(response.message || 'Failed to load API info');
            }
        } catch (error) {
            this.showError(`Failed to load API info: ${error.message}`);
        }
    }

    displayFriends(friends) {
        const container = document.getElementById('contentContainer');

        if (!friends.length) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>🔍 No friends found</h3>
                    <p>Try adjusting your filters or add some friends to get started!</p>
                </div>
            `;
            return;
        }

        const friendsGrid = friends.map(friend => this.createFriendCard(friend)).join('');
        container.innerHTML = `<div class="friends-grid">${friendsGrid}</div>`;
    }

    createFriendCard(friend) {
        const avatar = friend.name.charAt(0).toUpperCase();
        const genderClass = `gender-${friend.gender}`;

        return `
            <div class="friend-card">
                <div class="friend-header">
                    <div class="friend-avatar">${avatar}</div>
                    <div class="friend-name">${friend.name}</div>
                </div>
                <div class="friend-details">
                    <div class="friend-detail">
                        <span class="detail-label">Age:</span>
                        <span class="detail-value">${friend.age}</span>
                    </div>
                    <div class="friend-detail">
                        <span class="detail-label">Gender:</span>
                        <span class="detail-value">
                            <span class="gender-badge ${genderClass}">${friend.gender}</span>
                        </span>
                    </div>
                    <div class="friend-detail">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${friend.email}</span>
                    </div>
                    <div class="friend-detail">
                        <span class="detail-label">ID:</span>
                        <span class="detail-value">${friend.id}</span>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="btn btn-info btn-small" onclick="exercise5.loadFriendById(${friend.id})">
                        👁️ View
                    </button>
                    <button class="btn btn-warning btn-small" onclick="exercise5.editFriend(${friend.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="exercise5.deleteFriend(${friend.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }

    async loadFriendById(id) {
        this.showLoading(`Loading friend with ID: ${id}...`);

        try {
            const response = await this.makeRequest(`${this.baseUrl}/friends/${id}`);

            if (response.success) {
                this.displayFriends([response.data]);
                this.updateFriendsCount(1);
            } else {
                throw new Error(response.message || 'Friend not found');
            }
        } catch (error) {
            this.showError(`Failed to load friend: ${error.message}`);
        }
    }

    displayArchitectureInfo(info) {
        const container = document.getElementById('contentContainer');

        container.innerHTML = `
            <div class="architecture-display">
                <h4>🏗️ MVC Architecture Information</h4>
                <div class="architecture-section">
                    <h5>📊 Models</h5>
                    <pre>${JSON.stringify(info.models || {}, null, 2)}</pre>
                </div>
                <div class="architecture-section">
                    <h5>👁️ Views</h5>
                    <pre>${JSON.stringify(info.views || {}, null, 2)}</pre>
                </div>
                <div class="architecture-section">
                    <h5>🎛️ Controllers</h5>
                    <pre>${JSON.stringify(info.controllers || {}, null, 2)}</pre>
                </div>
                <div class="architecture-section">
                    <h5>🛤️ Routes</h5>
                    <pre>${JSON.stringify(info.routes || {}, null, 2)}</pre>
                </div>
            </div>
        `;
    }

    showAddFriendForm() {
        const modal = document.getElementById('addFriendModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Focus on first input
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeAddFriendForm() {
        const modal = document.getElementById('addFriendModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Reset form
            const form = document.getElementById('addFriendForm');
            if (form) {
                form.reset();
            }
        }
    }

    async handleAddFriend() {
        const name = document.getElementById('friendName').value.trim();
        const age = parseInt(document.getElementById('friendAge').value);
        const gender = document.getElementById('friendGender').value;
        const email = document.getElementById('friendEmail').value.trim();

        if (!name || !age || !gender || !email) {
            this.showError('Please fill in all fields');
            return;
        }

        try {
            const response = await this.makeRequest(`${this.baseUrl}/friends`, {
                method: 'POST',
                body: JSON.stringify({ name, age, gender, email })
            });

            if (response.success) {
                this.closeAddFriendForm();
                this.loadAllFriends(); // Refresh the list
                this.showSuccess('Friend added successfully!');
            } else {
                throw new Error(response.message || 'Failed to add friend');
            }
        } catch (error) {
            this.showError(`Failed to add friend: ${error.message}`);
        }
    }

    async editFriend(id) {
        // For now, just show the friend details
        this.loadFriendById(id);
    }

    async deleteFriend(id) {
        if (!confirm('Are you sure you want to delete this friend?')) {
            return;
        }

        try {
            const response = await this.makeRequest(`${this.baseUrl}/friends/${id}`, {
                method: 'DELETE'
            });

            if (response.success) {
                this.loadAllFriends(); // Refresh the list
                this.showSuccess('Friend deleted successfully!');
            } else {
                throw new Error(response.message || 'Failed to delete friend');
            }
        } catch (error) {
            this.showError(`Failed to delete friend: ${error.message}`);
        }
    }

    showLoading(message = 'Loading...') {
        const container = document.getElementById('contentContainer');
        container.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
    }

    showError(message) {
        const container = document.getElementById('contentContainer');
        container.innerHTML = `
            <div class="error">
                <h3>❌ Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="exercise5.loadAllFriends()">
                    🔄 Try Again
                </button>
            </div>
        `;
    }

    showSuccess(message) {
        const container = document.getElementById('contentContainer');
        const existingContent = container.innerHTML;

        container.innerHTML = `
            <div class="success" style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3>✅ Success</h3>
                <p>${message}</p>
            </div>
            ${existingContent}
        `;

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
            const successEl = container.querySelector('.success');
            if (successEl) {
                successEl.remove();
            }
        }, 3000);
    }

    updateFriendsCount(count = null) {
        const countElement = document.getElementById('friendsCount');
        if (countElement) {
            const displayCount = count !== null ? count : this.filteredFriends.length;
            countElement.textContent = `(${displayCount} friends)`;
        }
    }
}

// Global functions for onclick handlers
async function loadAllFriends() {
    await exercise5.loadAllFriends();
}

async function applyFilters() {
    await exercise5.applyFilters();
}

async function loadApiInfo() {
    await exercise5.loadApiInfo();
}

async function loadRandomFriend() {
    await exercise5.loadRandomFriend();
}

function showAddFriendForm() {
    exercise5.showAddFriendForm();
}

function closeAddFriendForm() {
    exercise5.closeAddFriendForm();
}

// Initialize the application
const exercise5 = new Exercise5();

// Add some helpful console messages
console.log('🏗️ Exercise 5: Friends API - MVC Architecture');
console.log('API Base URL:', exercise5.baseUrl);
console.log('Available keyboard shortcuts:');
console.log('- Ctrl+N: Add new friend');
console.log('- Escape: Close modal');
