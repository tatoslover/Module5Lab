// Static friends database - pure client-side, no API calls
const Exercise4 = {
  // Static friends data
  friends: [
    {
      id: 1,
      name: "Alice Johnson",
      age: 28,
      gender: "female",
      hobby: "reading",
    },
    { id: 2, name: "Bob Smith", age: 32, gender: "male", hobby: "gaming" },
    { id: 3, name: "Charlie Brown", age: 25, gender: "male", hobby: "cooking" },
    {
      id: 4,
      name: "Diana Prince",
      age: 30,
      gender: "female",
      hobby: "martial arts",
    },
    {
      id: 5,
      name: "Eve Wilson",
      age: 27,
      gender: "female",
      hobby: "photography",
    },
    { id: 6, name: "Frank Miller", age: 35, gender: "male", hobby: "writing" },
    { id: 7, name: "Grace Lee", age: 29, gender: "female", hobby: "dancing" },
    { id: 8, name: "Henry Davis", age: 31, gender: "male", hobby: "hiking" },
    { id: 9, name: "Ivy Chen", age: 26, gender: "female", hobby: "painting" },
    { id: 10, name: "Jack Taylor", age: 33, gender: "male", hobby: "music" },
    { id: 11, name: "Karen White", age: 24, gender: "female", hobby: "yoga" },
    { id: 12, name: "Leo Garcia", age: 36, gender: "male", hobby: "traveling" },
    {
      id: 13,
      name: "Mia Rodriguez",
      age: 28,
      gender: "female",
      hobby: "gardening",
    },
    {
      id: 14,
      name: "Noah Anderson",
      age: 30,
      gender: "male",
      hobby: "fishing",
    },
    {
      id: 15,
      name: "Olivia Martinez",
      age: 27,
      gender: "female",
      hobby: "baking",
    },
    {
      id: 16,
      name: "Paul Thompson",
      age: 34,
      gender: "male",
      hobby: "cycling",
    },
    {
      id: 17,
      name: "Quinn Roberts",
      age: 25,
      gender: "non-binary",
      hobby: "coding",
    },
    {
      id: 18,
      name: "Rachel Green",
      age: 29,
      gender: "female",
      hobby: "shopping",
    },
    { id: 19, name: "Sam Wilson", age: 31, gender: "male", hobby: "running" },
    {
      id: 20,
      name: "Tina Turner",
      age: 26,
      gender: "female",
      hobby: "singing",
    },
    { id: 21, name: "Uma Thurman", age: 33, gender: "female", hobby: "acting" },
    {
      id: 22,
      name: "Victor Hugo",
      age: 29,
      gender: "male",
      hobby: "literature",
    },
    {
      id: 23,
      name: "Wendy Williams",
      age: 32,
      gender: "female",
      hobby: "podcasting",
    },
    {
      id: 24,
      name: "Xavier Woods",
      age: 27,
      gender: "male",
      hobby: "woodworking",
    },
    {
      id: 25,
      name: "Yara Shahidi",
      age: 25,
      gender: "female",
      hobby: "activism",
    },
    { id: 26, name: "Zoe Kravitz", age: 34, gender: "female", hobby: "music" },
    {
      id: 27,
      name: "Alex Morgan",
      age: 28,
      gender: "non-binary",
      hobby: "sports",
    },
    {
      id: 28,
      name: "Blake Lively",
      age: 31,
      gender: "female",
      hobby: "fashion",
    },
    {
      id: 29,
      name: "Cameron Diaz",
      age: 35,
      gender: "female",
      hobby: "wellness",
    },
    { id: 30, name: "Daniel Craig", age: 37, gender: "male", hobby: "acting" },
  ],

  // Current filtered friends
  currentFriends: [],

  // App state
  state: {
    isLoading: false,
    lastUpdate: null,
    totalFriends: 0,
    filters: {
      gender: "",
      startsWith: "",
    },
  },
};

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  console.log("👥 Static Friends Demo loaded");
  console.log("📊 Total friends in database:", Exercise4.friends.length);
  console.log("💡 All operations are client-side - no API calls");

  // Set initial state
  Exercise4.currentFriends = [...Exercise4.friends];
  Exercise4.state.totalFriends = Exercise4.friends.length;

  // Load all friends on startup
  loadAllFriends();

  // Add event listeners
  const nameFilter = document.getElementById("nameFilter");
  const genderFilter = document.getElementById("genderFilter");

  if (nameFilter) {
    nameFilter.addEventListener("input", debounce(applyFilters, 300));
  }

  if (genderFilter) {
    genderFilter.addEventListener("change", applyFilters);
  }

  // Add keyboard shortcuts
  addKeyboardSupport();

  console.log("🎯 Keyboard shortcuts:");
  console.log("  - Ctrl+A: Load all friends");
  console.log("  - Ctrl+F: Focus name filter");
  console.log("  - Ctrl+G: Focus gender filter");
  console.log("  - Ctrl+R: Random friend");
  console.log("  - Ctrl+I: Show info");
  console.log("  - Escape: Clear filters");
});

// Load all friends (static)
async function loadAllFriends() {
  showLoading();

  try {
    // Simulate brief loading time for better UX
    await new Promise((resolve) => setTimeout(resolve, 200));

    Exercise4.currentFriends = [...Exercise4.friends];
    Exercise4.state.filters = { gender: "", startsWith: "" };

    // Clear filter inputs
    document.getElementById("nameFilter").value = "";
    document.getElementById("genderFilter").value = "";

    displayFriends(Exercise4.currentFriends);
    updateStats(Exercise4.currentFriends);
    Exercise4.state.lastUpdate = new Date();

    console.log("✅ Loaded", Exercise4.currentFriends.length, "friends");
  } catch (error) {
    showError("Failed to load friends: " + error.message);
    console.error("❌ Error loading friends:", error);
  }
}

// Apply filters (client-side)
async function applyFilters() {
  const genderFilter = document.getElementById("genderFilter");
  const nameFilter = document.getElementById("nameFilter");

  const gender = genderFilter ? genderFilter.value : "";
  const startsWith = nameFilter ? nameFilter.value.trim() : "";

  // Update state
  Exercise4.state.filters = { gender, startsWith };

  if (!gender && !startsWith) {
    loadAllFriends();
    return;
  }

  showLoading();

  try {
    // Simulate brief processing time
    await new Promise((resolve) => setTimeout(resolve, 150));

    let filteredFriends = [...Exercise4.friends];

    // Filter by gender
    if (gender) {
      filteredFriends = filteredFriends.filter(
        (friend) => friend.gender.toLowerCase() === gender.toLowerCase(),
      );
    }

    // Filter by name starting with
    if (startsWith) {
      filteredFriends = filteredFriends.filter((friend) =>
        friend.name.toLowerCase().startsWith(startsWith.toLowerCase()),
      );
    }

    Exercise4.currentFriends = filteredFriends;
    displayFriends(filteredFriends);
    updateStats(filteredFriends);
    Exercise4.state.lastUpdate = new Date();

    console.log("🔍 Filtered to", filteredFriends.length, "friends");
  } catch (error) {
    showError("Failed to filter friends: " + error.message);
    console.error("❌ Error filtering friends:", error);
  }
}

// Show API info (static)
async function loadApiInfo() {
  showLoading();

  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const info = {
      server: "Static Client-Side Database",
      totalFriends: Exercise4.friends.length,
      timestamp: new Date().toISOString(),
      version: "2.0.0-static",
      mode: "Client-Side",
      features: [
        "Static data storage",
        "Client-side filtering",
        "Real-time search",
        "Local statistics",
        "Keyboard shortcuts",
        "No API dependencies",
      ],
      endpoints: [
        "No API endpoints - all client-side!",
        "Static data in JavaScript",
        "Local filtering and search",
        "Browser-based operations",
      ],
      performance: {
        loadTime: "< 1ms",
        searchTime: "< 10ms",
        dataSize: `${JSON.stringify(Exercise4.friends).length} bytes`,
      },
    };

    displayApiInfo(info);
    console.log("📊 API Info:", info);
  } catch (error) {
    showError("Failed to load API info: " + error.message);
    console.error("❌ Error loading API info:", error);
  }
}

// Load random friend (static)
async function loadRandomFriend() {
  if (Exercise4.friends.length === 0) {
    showError("No friends available");
    return;
  }

  showLoading();

  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const randomIndex = Math.floor(Math.random() * Exercise4.friends.length);
    const randomFriend = Exercise4.friends[randomIndex];

    const selectedFriends = [randomFriend];
    Exercise4.currentFriends = selectedFriends;

    displayFriends(selectedFriends);
    updateStats(selectedFriends);

    console.log("🎲 Random friend selected:", randomFriend.name);
  } catch (error) {
    showError("Failed to load random friend: " + error.message);
    console.error("❌ Error loading random friend:", error);
  }
}

// Display friends in the UI
function displayFriends(friends) {
  const container = document.getElementById("friendsContainer");
  const countElement = document.getElementById("friendsCount");

  if (!container) return;

  if (countElement) {
    countElement.textContent = `(${friends.length} found)`;
  }

  if (friends.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #666;">
        <h3>No friends found</h3>
        <p>Try adjusting your filters or loading all friends.</p>
        <button class="btn btn-primary" onclick="loadAllFriends()" style="margin-top: 15px;">
          Load All Friends
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="friends-grid">
      ${friends.map((friend) => createFriendCard(friend)).join("")}
    </div>
  `;
}

// Create HTML for a friend card
function createFriendCard(friend) {
  const initials = friend.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const genderClass = friend.gender.replace("-", "_");

  return `
    <div class="friend-card" data-friend-id="${friend.id}">
      <div class="friend-header">
        <div class="friend-avatar">${initials}</div>
        <div class="friend-name">${friend.name}</div>
      </div>
      <div class="friend-details">
        <div class="friend-detail">
          <span class="detail-label">ID:</span>
          <span class="detail-value">#${friend.id}</span>
        </div>
        <div class="friend-detail">
          <span class="detail-label">Age:</span>
          <span class="detail-value">${friend.age} years</span>
        </div>
        <div class="friend-detail">
          <span class="detail-label">Gender:</span>
          <span class="detail-value">
            <span class="gender-badge gender-${genderClass}">${friend.gender}</span>
          </span>
        </div>
        <div class="friend-detail">
          <span class="detail-label">Hobby:</span>
          <span class="detail-value">${friend.hobby}</span>
        </div>
      </div>
    </div>
  `;
}

// Display API information
function displayApiInfo(info) {
  const container = document.getElementById("friendsContainer");

  if (!container) return;

  container.innerHTML = `
    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px;">
      <h3 style="color: #667eea; margin-bottom: 15px;">📡 Static Database Information</h3>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Mode:</strong> ${info.mode}
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Total Friends:</strong> ${info.totalFriends}
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Version:</strong> ${info.version}
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Last Updated:</strong> ${new Date(info.timestamp).toLocaleString()}
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Performance:</strong>
        <ul style="margin-top: 10px; padding-left: 20px;">
          <li>Load Time: ${info.performance.loadTime}</li>
          <li>Search Time: ${info.performance.searchTime}</li>
          <li>Data Size: ${info.performance.dataSize}</li>
        </ul>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <strong>Features:</strong>
        <ul style="margin-top: 10px; padding-left: 20px;">
          ${info.features.map((feature) => `<li style="margin: 5px 0;">${feature}</li>`).join("")}
        </ul>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <strong>Operation Mode:</strong>
        <ul style="margin-top: 10px; padding-left: 20px;">
          ${info.endpoints.map((endpoint) => `<li style="margin: 5px 0;">${endpoint}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// Show loading state
function showLoading() {
  const container = document.getElementById("friendsContainer");
  if (!container) return;

  Exercise4.state.isLoading = true;

  container.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Processing...</p>
    </div>
  `;
}

// Show error message
function showError(message) {
  const container = document.getElementById("friendsContainer");
  if (!container) return;

  Exercise4.state.isLoading = false;

  container.innerHTML = `
    <div class="error">
      <h3>❌ Error</h3>
      <p>${message}</p>
      <button class="btn btn-primary" onclick="loadAllFriends()" style="margin-top: 15px;">
        Try Again
      </button>
    </div>
  `;
}

// Update statistics
function updateStats(friends) {
  const totalFriends = friends.length;
  const maleCount = friends.filter((f) => f.gender === "male").length;
  const femaleCount = friends.filter((f) => f.gender === "female").length;
  const nonBinaryCount = friends.filter(
    (f) => f.gender === "non-binary",
  ).length;
  const averageAge =
    totalFriends > 0
      ? Math.round(friends.reduce((sum, f) => sum + f.age, 0) / totalFriends)
      : 0;

  // Update the displayed stats
  const totalElement = document.getElementById("totalFriends");
  const maleElement = document.getElementById("maleCount");
  const femaleElement = document.getElementById("femaleCount");
  const avgAgeElement = document.getElementById("averageAge");

  if (totalElement) totalElement.textContent = totalFriends;
  if (maleElement) maleElement.textContent = maleCount;
  if (femaleElement) femaleElement.textContent = femaleCount;
  if (avgAgeElement) avgAgeElement.textContent = averageAge;

  // Log additional stats
  console.log("📊 Statistics:", {
    total: totalFriends,
    male: maleCount,
    female: femaleCount,
    nonBinary: nonBinaryCount,
    averageAge: averageAge,
  });
}

// Add keyboard support
function addKeyboardSupport() {
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" && e.key !== "Escape") {
      return; // Don't interfere with typing in inputs
    }

    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "a":
        case "A":
          e.preventDefault();
          loadAllFriends();
          break;
        case "f":
        case "F":
          e.preventDefault();
          document.getElementById("nameFilter")?.focus();
          break;
        case "g":
        case "G":
          e.preventDefault();
          document.getElementById("genderFilter")?.focus();
          break;
        case "r":
        case "R":
          e.preventDefault();
          loadRandomFriend();
          break;
        case "i":
        case "I":
          e.preventDefault();
          loadApiInfo();
          break;
      }
    }

    switch (e.key) {
      case "Escape":
        // Clear all filters
        document.getElementById("nameFilter").value = "";
        document.getElementById("genderFilter").value = "";
        loadAllFriends();
        break;
    }
  });
}

// Debounce function for search input
function debounce(func, wait) {
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

// Add friend (for demo purposes)
function addFriend(friend) {
  if (!friend.name || !friend.age || !friend.gender) {
    console.error("Friend must have name, age, and gender");
    return false;
  }

  const newId = Math.max(...Exercise4.friends.map((f) => f.id)) + 1;
  const newFriend = {
    id: newId,
    name: friend.name,
    age: parseInt(friend.age),
    gender: friend.gender,
    hobby: friend.hobby || "unknown",
  };

  Exercise4.friends.push(newFriend);

  // Refresh display if not filtered
  if (!Exercise4.state.filters.gender && !Exercise4.state.filters.startsWith) {
    loadAllFriends();
  }

  console.log("✅ Friend added:", newFriend);
  return true;
}

// Remove friend by ID
function removeFriend(friendId) {
  const index = Exercise4.friends.findIndex((f) => f.id === friendId);
  if (index === -1) {
    console.error("Friend not found:", friendId);
    return false;
  }

  const removedFriend = Exercise4.friends.splice(index, 1)[0];

  // Refresh display
  applyFilters();

  console.log("🗑️ Friend removed:", removedFriend);
  return true;
}

// Search friends by name (case-insensitive)
function searchFriends(query) {
  if (!query) return Exercise4.friends;

  const lowerQuery = query.toLowerCase();
  return Exercise4.friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(lowerQuery) ||
      friend.hobby.toLowerCase().includes(lowerQuery),
  );
}

// Get friends by age range
function getFriendsByAgeRange(minAge, maxAge) {
  return Exercise4.friends.filter(
    (friend) => friend.age >= minAge && friend.age <= maxAge,
  );
}

// Get friends by hobby
function getFriendsByHobby(hobby) {
  const lowerHobby = hobby.toLowerCase();
  return Exercise4.friends.filter((friend) =>
    friend.hobby.toLowerCase().includes(lowerHobby),
  );
}

// Export functions for global access
window.Exercise4Functions = {
  loadAllFriends,
  applyFilters,
  loadApiInfo,
  loadRandomFriend,
  addFriend,
  removeFriend,
  searchFriends,
  getFriendsByAgeRange,
  getFriendsByHobby,
  updateStats,
};

// Make data available globally for debugging
window.Exercise4 = Exercise4;
