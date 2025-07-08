// Friends API Progression JavaScript
// Simulated API with offline-proof functionality

// Simulated Friends Data
const simulatedFriends = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    gender: "female",
    email: "alice.johnson@email.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 32,
    gender: "male",
    email: "bob.smith@email.com",
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 25,
    gender: "male",
    email: "charlie.brown@email.com",
  },
  {
    id: 4,
    name: "Diana Prince",
    age: 30,
    gender: "female",
    email: "diana.prince@email.com",
  },
  {
    id: 5,
    name: "Emma Watson",
    age: 29,
    gender: "female",
    email: "emma.watson@email.com",
  },
  {
    id: 6,
    name: "Frank Miller",
    age: 34,
    gender: "male",
    email: "frank.miller@email.com",
  },
  {
    id: 7,
    name: "Grace Lee",
    age: 26,
    gender: "female",
    email: "grace.lee@email.com",
  },
  {
    id: 8,
    name: "Henry Ford",
    age: 31,
    gender: "male",
    email: "henry.ford@email.com",
  },
  {
    id: 9,
    name: "Ian Rivera",
    age: 27,
    gender: "non-binary",
    email: "ian.rivera@email.com",
  },
  {
    id: 10,
    name: "Jamie Taylor",
    age: 24,
    gender: "non-binary",
    email: "jamie.taylor@email.com",
  },
];

// Global variables
let currentStage = "basic-api";
let allFriends = [...simulatedFriends];
let filteredFriends = [...simulatedFriends];
let nextId = 11;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initializeStageNavigation();
  loadAllFriends("basic");
});

// Stage navigation functionality
function initializeStageNavigation() {
  const stageMarkers = document.querySelectorAll(".stage-marker");

  stageMarkers.forEach((marker) => {
    marker.addEventListener("click", function () {
      const stage = this.dataset.stage;
      switchToStage(stage);
    });
  });
}

function switchToStage(stage) {
  // Update active states
  document.querySelectorAll(".stage-marker").forEach((marker) => {
    marker.classList.remove("active");
  });
  document.querySelectorAll(".stage-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Set new active stage
  document.querySelector(`[data-stage="${stage}"]`).classList.add("active");
  document.getElementById(stage).classList.add("active");

  currentStage = stage;

  // Load appropriate data for the stage
  if (stage === "basic-api") {
    loadAllFriends("basic");
  } else if (stage === "mvc-arch") {
    loadAllFriends("mvc");
  }
}

// Simulated API Functions
function simulateApiDelay() {
  return new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 700),
  );
}

async function loadAllFriends(type) {
  const containerId =
    type === "basic" ? "friendsContainer1" : "friendsContainer2";
  const countId = type === "basic" ? "friendsCount1" : "friendsCount2";

  try {
    showLoading(containerId);

    // Simulate API delay
    await simulateApiDelay();

    // Use simulated data
    const friends = [...allFriends];
    filteredFriends = friends;

    displayFriends(friends, containerId, countId);
    updateStatistics(friends, type);
  } catch (error) {
    console.error("Error loading friends:", error);
    showError(containerId, "Failed to load friends data.");
  }
}

async function applyFilters(type) {
  const genderFilter = document.getElementById(
    type === "basic" ? "genderFilter1" : "genderFilter2",
  ).value;
  const nameFilter = document
    .getElementById(type === "basic" ? "nameFilter1" : "nameFilter2")
    .value.toLowerCase();
  const containerId =
    type === "basic" ? "friendsContainer1" : "friendsContainer2";
  const countId = type === "basic" ? "friendsCount1" : "friendsCount2";

  try {
    showLoading(containerId);

    // Simulate API delay
    await simulateApiDelay();

    let filtered = [...allFriends];

    // Apply gender filter
    if (genderFilter) {
      filtered = filtered.filter((friend) => friend.gender === genderFilter);
    }

    // Apply name filter
    if (nameFilter) {
      if (type === "basic") {
        filtered = filtered.filter((friend) =>
          friend.name.toLowerCase().startsWith(nameFilter),
        );
      } else {
        filtered = filtered.filter((friend) =>
          friend.name.toLowerCase().includes(nameFilter),
        );
      }
    }

    filteredFriends = filtered;
    displayFriends(filtered, containerId, countId);
    updateStatistics(filtered, type);
  } catch (error) {
    console.error("Error applying filters:", error);
    showError(containerId, "Failed to apply filters.");
  }
}

async function loadRandomFriend(type) {
  const containerId =
    type === "basic" ? "friendsContainer1" : "friendsContainer2";
  const countId = type === "basic" ? "friendsCount1" : "friendsCount2";

  try {
    showLoading(containerId);

    // Simulate API delay
    await simulateApiDelay();

    const friends = [...allFriends];

    if (friends.length === 0) {
      showError(containerId, "No friends found!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * friends.length);
    const randomFriend = friends[randomIndex];

    displayFriends([randomFriend], containerId, countId);
    updateStatistics([randomFriend], type);
  } catch (error) {
    console.error("Error loading random friend:", error);
    showError(containerId, "Failed to load random friend.");
  }
}

async function loadApiInfo(type) {
  const containerId =
    type === "basic" ? "friendsContainer1" : "friendsContainer2";
  const countId = type === "basic" ? "friendsCount1" : "friendsCount2";

  try {
    showLoading(containerId);

    // Simulate API delay
    await simulateApiDelay();

    if (type === "basic") {
      const apiInfo = {
        title: "Friends API - Basic Version",
        description:
          "Simple REST API with basic CRUD operations and filtering capabilities",
        version: "1.0.0",
        endpoints: [
          "GET /friends - Get all friends",
          "GET /friends?gender=male - Filter by gender",
          "GET /friends?name=John - Filter by name prefix",
          "POST /friends - Add new friend",
          "PUT /friends/:id - Update friend",
          "DELETE /friends/:id - Delete friend",
        ],
        features: [
          "Basic filtering by gender and name prefix",
          "Simple error handling and validation",
          "JSON responses with consistent structure",
          "RESTful design principles",
          "Basic statistics and analytics",
        ],
      };

      displayApiInfo(apiInfo, containerId);
    } else {
      const apiInfo = {
        title: "Friends API - MVC Architecture",
        description:
          "Professional API built with Model-View-Controller pattern for better maintainability",
        version: "2.0.0",
        architecture: {
          Model: "Handles data management, validation, and business logic",
          View: "Manages response formatting and presentation layer",
          Controller:
            "Coordinates requests, handles routing and input validation",
        },
        benefits: [
          "Separation of concerns for better code organization",
          "Improved testability with isolated components",
          "Better maintainability and extensibility",
          "Team collaboration friendly architecture",
          "Scalable design for enterprise applications",
        ],
        endpoints: [
          "GET /friends - Get all friends with pagination",
          "GET /friends/:id - Get specific friend by ID",
          "POST /friends - Add new friend with validation",
          "PUT /friends/:id - Update existing friend",
          "DELETE /friends/:id - Delete friend with confirmation",
        ],
      };

      displayMvcInfo(apiInfo, containerId);
    }

    document.getElementById(countId).textContent = "";
  } catch (error) {
    console.error("Error loading API info:", error);
    showError(containerId, "Failed to load API information.");
  }
}

// Display Functions
function displayFriends(friends, containerId, countId) {
  const container = document.getElementById(containerId);
  const countElement = document.getElementById(countId);

  if (friends.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">😔</div>
                <h3>No friends found</h3>
                <p>No friends match your current search criteria.</p>
                <p>Try adjusting your filters or loading all friends.</p>
            </div>
        `;
    countElement.textContent = "(0 friends)";
    return;
  }

  countElement.textContent = `(${friends.length} friend${friends.length !== 1 ? "s" : ""})`;

  const friendsHTML = friends
    .map(
      (friend) => `
        <div class="friend-card">
            <div class="friend-avatar">
                ${friend.name.charAt(0).toUpperCase()}
            </div>
            <div class="friend-info">
                <h4>${friend.name}</h4>
                <div class="friend-details">
                    <div class="detail-item">
                        <span class="detail-label">Age:</span>
                        <span class="detail-value">${friend.age}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Gender:</span>
                        <span class="detail-value gender-badge gender-${friend.gender.replace("-", "")}">
                            ${friend.gender}
                        </span>
                    </div>
                    ${
                      friend.email
                        ? `
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${friend.email}</span>
                    </div>
                    `
                        : ""
                    }
                </div>
                <div class="friend-id">ID: ${friend.id}</div>
            </div>
        </div>
    `,
    )
    .join("");

  container.innerHTML = `<div class="friends-grid">${friendsHTML}</div>`;
}

function displayApiInfo(apiInfo, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = `
        <div class="api-info">
            <h3>${apiInfo.title}</h3>
            <p class="api-description">${apiInfo.description}</p>

            <div class="api-section">
                <h4>📋 API Version</h4>
                <p><strong>Version:</strong> ${apiInfo.version}</p>
                <p><strong>Status:</strong> <span style="color: #28a745;">✅ Active</span></p>
                <p><strong>Response Format:</strong> JSON</p>
            </div>

            <div class="api-section">
                <h4>📍 Available Endpoints</h4>
                <ul class="endpoint-list">
                    ${apiInfo.endpoints.map((endpoint) => `<li>${endpoint}</li>`).join("")}
                </ul>
            </div>

            <div class="api-section">
                <h4>✨ Key Features</h4>
                <ul class="feature-list">
                    ${apiInfo.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            </div>

            <div class="api-section">
                <h4>🔧 Implementation Details</h4>
                <p>This basic API version focuses on simplicity and ease of use. It provides straightforward CRUD operations with basic filtering capabilities.</p>
            </div>
        </div>
    `;
}

function displayMvcInfo(apiInfo, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = `
        <div class="api-info mvc-info">
            <h3>${apiInfo.title}</h3>
            <p class="api-description">${apiInfo.description}</p>

            <div class="api-section">
                <h4>📋 API Version</h4>
                <p><strong>Version:</strong> ${apiInfo.version}</p>
                <p><strong>Architecture:</strong> <span style="color: #667eea;">Model-View-Controller</span></p>
                <p><strong>Status:</strong> <span style="color: #28a745;">✅ Active</span></p>
            </div>

            <div class="api-section">
                <h4>🏗️ Architecture Components</h4>
                <div class="architecture-grid">
                    ${Object.entries(apiInfo.architecture)
                      .map(
                        ([component, description]) => `
                        <div class="architecture-item">
                            <h5>${component}</h5>
                            <p>${description}</p>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>

            <div class="api-section">
                <h4>📍 Available Endpoints</h4>
                <ul class="endpoint-list">
                    ${apiInfo.endpoints.map((endpoint) => `<li>${endpoint}</li>`).join("")}
                </ul>
            </div>

            <div class="api-section">
                <h4>🎯 Architecture Benefits</h4>
                <ul class="benefit-list">
                    ${apiInfo.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
                </ul>
            </div>

            <div class="api-section">
                <h4>🔧 Implementation Highlights</h4>
                <p>This MVC version demonstrates professional software architecture patterns, focusing on separation of concerns, maintainability, and scalability.</p>
            </div>
        </div>
    `;
}

function updateStatistics(friends, type) {
  const suffix = type === "basic" ? "1" : "2";

  const totalFriends = friends.length;
  const maleCount = friends.filter((friend) => friend.gender === "male").length;
  const femaleCount = friends.filter(
    (friend) => friend.gender === "female",
  ).length;
  const nonBinaryCount = friends.filter(
    (friend) => friend.gender === "non-binary",
  ).length;
  const totalAge = friends.reduce((sum, friend) => sum + friend.age, 0);
  const averageAge = totalFriends > 0 ? Math.round(totalAge / totalFriends) : 0;

  // Update statistics display
  const totalElement = document.getElementById(`totalFriends${suffix}`);
  const maleElement = document.getElementById(`maleCount${suffix}`);
  const femaleElement = document.getElementById(`femaleCount${suffix}`);
  const ageElement = document.getElementById(`averageAge${suffix}`);

  if (totalElement) totalElement.textContent = totalFriends;
  if (maleElement) maleElement.textContent = maleCount;
  if (femaleElement) femaleElement.textContent = femaleCount;
  if (ageElement) ageElement.textContent = averageAge;
}

function showLoading(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading friends data...</p>
        </div>
    `;
}

function showError(containerId, message) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
        <div class="error">
            <div class="error-icon">⚠️</div>
            <h3>Error</h3>
            <p>${message}</p>
            <p>This is a simulated demo - all data is generated locally.</p>
        </div>
    `;
}

// Add Friend Modal Functions (for MVC stage)
function showAddFriendForm() {
  const modal = document.getElementById("addFriendModal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeAddFriendForm() {
  const modal = document.getElementById("addFriendModal");
  if (modal) {
    modal.style.display = "none";
  }
  const form = document.getElementById("addFriendForm");
  if (form) {
    form.reset();
  }
}

// Add friend form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addFriendForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const newFriend = {
        id: nextId++,
        name: document.getElementById("friendName").value.trim(),
        age: parseInt(document.getElementById("friendAge").value),
        gender: document.getElementById("friendGender").value,
        email: document.getElementById("friendEmail").value.trim(),
      };

      // Validate the input
      if (
        !newFriend.name ||
        !newFriend.age ||
        !newFriend.gender ||
        !newFriend.email
      ) {
        alert("Please fill in all fields");
        return;
      }

      if (newFriend.age < 1 || newFriend.age > 120) {
        alert("Please enter a valid age between 1 and 120");
        return;
      }

      try {
        // Simulate API delay
        await simulateApiDelay();

        // Add to simulated data
        allFriends.push(newFriend);

        closeAddFriendForm();
        loadAllFriends("mvc");

        // Show success message
        setTimeout(() => {
          alert(`${newFriend.name} has been added successfully!`);
        }, 300);
      } catch (error) {
        console.error("Error adding friend:", error);
        alert("Failed to add friend. Please try again.");
      }
    });
  }
});

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("addFriendModal");
  if (event.target === modal) {
    closeAddFriendForm();
  }
});

// Clear filters function
function clearFilters(type) {
  const genderFilter = document.getElementById(
    type === "basic" ? "genderFilter1" : "genderFilter2",
  );
  const nameFilter = document.getElementById(
    type === "basic" ? "nameFilter1" : "nameFilter2",
  );

  if (genderFilter) genderFilter.value = "";
  if (nameFilter) nameFilter.value = "";

  loadAllFriends(type);
}

// Utility functions
function generateRandomFriend() {
  const names = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "Chris Davis",
    "Amanda Brown",
  ];
  const genders = ["male", "female", "non-binary"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const randomAge = Math.floor(Math.random() * 50) + 20;

  return {
    id: nextId++,
    name: randomName,
    age: randomAge,
    gender: randomGender,
    email: `${randomName.toLowerCase().replace(" ", ".")}@example.com`,
  };
}

// Demo data refresh function
function refreshDemoData() {
  allFriends = [...simulatedFriends];
  nextId = 11;

  const currentType = currentStage === "basic-api" ? "basic" : "mvc";
  loadAllFriends(currentType);
}

// Export functions for potential external use
window.FriendsAPI = {
  loadAllFriends,
  applyFilters,
  loadRandomFriend,
  loadApiInfo,
  showAddFriendForm,
  closeAddFriendForm,
  clearFilters,
  refreshDemoData,
};
