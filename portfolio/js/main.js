// Main JavaScript file for Module 5 Lab Portfolio

// Global configuration
const CONFIG = {
  apiBaseUrl: window.location.origin,
  githubRepo: "https://github.com/samuellove/Module5Lab",
  version: "1.0.0",
};

// Utility functions
const Utils = {
  // Show loading state
  showLoading: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<div class="loading-spinner"></div>Loading...';
      element.className = "response-display loading";
    }
  },

  // Show success response
  showSuccess: (elementId, data) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
      element.className = "response-display success";
    }
  },

  // Show error response
  showError: (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = `Error: ${message}`;
      element.className = "response-display error";
    }
  },

  // Format JSON for display
  formatJson: (data) => {
    return JSON.stringify(data, null, 2);
  },

  // Add click animation to buttons
  addClickAnimation: (element) => {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
      element.style.transform = "";
    }, 150);
  },

  // Debounce function for input events
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

// Navigation functions
const Navigation = {
  // Navigate to exercise page
  goToExercise: (exerciseNumber) => {
    const exercisePages = {
      1: "exercise1.html",
      2: "exercise2.html",
      3: "exercise3.html",
      4: "exercise4.html",
      5: "exercise5.html",
      6: "exercise6.html",
      7: "exercise7.html",
      8: "exercise8.html",
    };

    if (exercisePages[exerciseNumber]) {
      window.location.href = exercisePages[exerciseNumber];
    }
  },

  // Go back to home page
  goHome: () => {
    window.location.href = "index.html";
  },

  // Open GitHub repository
  openGitHub: () => {
    window.open(CONFIG.githubRepo, "_blank");
  },
};

// API helper functions
const API = {
  // Make GET request
  get: async (endpoint) => {
    try {
      const response = await fetch(`${CONFIG.apiBaseUrl}${endpoint}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  },

  // Make POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await fetch(`${CONFIG.apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || responseData.error || "Request failed",
        );
      }

      return responseData;
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },

  // Make PUT request
  put: async (endpoint, data = {}) => {
    try {
      const response = await fetch(`${CONFIG.apiBaseUrl}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || responseData.error || "Request failed",
        );
      }

      return responseData;
    } catch (error) {
      console.error("API PUT Error:", error);
      throw error;
    }
  },

  // Make DELETE request
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${CONFIG.apiBaseUrl}${endpoint}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API DELETE Error:", error);
      throw error;
    }
  },
};

// Exercise-specific functions
const Exercises = {
  // Show exercise details
  showExerciseDetails: (exerciseNumber) => {
    const exerciseInfo = {
      1: "Exercise 1: Multiple Web Servers - Learn how to create and manage multiple Express.js servers running on different ports simultaneously.",
      2: "Exercise 2: Calculator API - Build a RESTful calculator API with clean architecture and proper error handling.",
      3: "Exercise 3: Calculator Portfolio - Interactive HTML portfolio that consumes the Calculator API with real-time results.",
      4: "Exercise 4: Friends API - Advanced REST API with filtering, routing, and CRUD operations on friend data.",
      5: "Exercise 5: Friends API - MVC - Refactored Friends API using Model-View-Controller architecture pattern.",
      6: "Exercise 6: Calculator with Tests - Calculator API enhanced with comprehensive unit and integration tests using Jest.",
      7: "Exercise 7: Enhanced Calculator - Professional-grade calculator with custom libraries, logging, and advanced features.",
      8: "Exercise 8: eCommerce API - Full-featured eCommerce API with product management and order processing.",
    };

    alert(
      exerciseInfo[exerciseNumber] || "Exercise information not available.",
    );
  },

  // Show coming soon message
  showComingSoon: () => {
    alert(
      "🚧 This exercise is currently under development!\n\nCheck back soon for the complete implementation.",
    );
  },
};

// Theme and UI functions
const UI = {
  // Toggle theme (if implemented)
  toggleTheme: () => {
    // Placeholder for theme toggle functionality
    console.log("Theme toggle not implemented yet");
  },

  // Show notification
  showNotification: (message, type = "info") => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  },

  // Smooth scroll to element
  scrollToElement: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  },
};

// Keyboard shortcuts
const KeyboardShortcuts = {
  init: () => {
    document.addEventListener("keydown", (e) => {
      // Navigate to exercises with number keys
      if (e.key >= "1" && e.key <= "8") {
        const exerciseNumber = parseInt(e.key);
        const card = document.querySelector(
          `.exercise-card h3[data-number="${exerciseNumber}"]`,
        );
        if (card) {
          card.closest(".exercise-card").scrollIntoView({ behavior: "smooth" });
        }
      }

      // Home key to go to top
      if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Escape key to close modals or go back
      if (e.key === "Escape") {
        // Add modal close functionality here if needed
        console.log("Escape key pressed");
      }
    });
  },
};

// Initialize application
const App = {
  init: () => {
    console.log("🚀 Module 5 Lab Portfolio initialized");
    console.log(`📊 Version: ${CONFIG.version}`);
    console.log(`🔗 GitHub: ${CONFIG.githubRepo}`);

    // Initialize keyboard shortcuts
    KeyboardShortcuts.init();

    // Add click animations to buttons
    document
      .querySelectorAll(".btn, .test-btn, .operation-btn")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          Utils.addClickAnimation(this);
        });
      });

    // Initialize smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Log page load
    console.log(`📄 Page loaded: ${window.location.pathname}`);
  },
};

// Load polyfills for older browsers
const Polyfills = {
  loadAll: () => {
    // Add fetch polyfill for older browsers
    if (!window.fetch) {
      console.warn("Fetch API not supported, consider adding a polyfill");
    }

    // Add Promise polyfill for older browsers
    if (!window.Promise) {
      console.warn("Promise not supported, consider adding a polyfill");
    }
  },
};

// Error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  // You could send error reports to a logging service here
});

// Unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  // You could send error reports to a logging service here
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  Polyfills.loadAll();
  App.init();
});

// Export for use in other files
window.Module5Lab = {
  CONFIG,
  Utils,
  Navigation,
  API,
  Exercises,
  UI,
  App,
};
