// Redirect Page JavaScript

// Configuration
const REDIRECT_DELAY = 2000; // 2 seconds
const TARGET_URL = 'frontend/index.html';

// DOM elements
let progressBar;
let redirectContainer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeRedirect();
});

/**
 * Initialize the redirect functionality
 */
function initializeRedirect() {
    // Get DOM elements
    progressBar = document.querySelector('.progress-fill');
    redirectContainer = document.querySelector('.redirect-container');

    // Add progress bar if not exists
    if (!progressBar) {
        addProgressBar();
    }

    // Start the redirect timer
    startRedirectTimer();

    // Add keyboard navigation
    addKeyboardNavigation();

    // Add accessibility features
    addAccessibilityFeatures();
}

/**
 * Add progress bar to show redirect progress
 */
function addProgressBar() {
    const container = document.querySelector('.redirect-container');
    const progressBarHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', progressBarHTML);
    progressBar = document.querySelector('.progress-fill');
}

/**
 * Start the redirect timer
 */
function startRedirectTimer() {
    // Update the redirect text with countdown
    updateCountdown();

    // Set the main redirect timer
    const redirectTimer = setTimeout(() => {
        performRedirect();
    }, REDIRECT_DELAY);

    // Allow manual cancellation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearTimeout(redirectTimer);
            cancelRedirect();
        }
    });
}

/**
 * Update countdown display
 */
function updateCountdown() {
    const countdownElement = document.querySelector('.redirect-info');
    let remainingTime = REDIRECT_DELAY / 1000;

    // Create countdown element if it doesn't exist
    if (!countdownElement) {
        const container = document.querySelector('.redirect-container');
        const countdownHTML = `
            <div class="redirect-info">
                Redirecting in <span id="countdown">${remainingTime}</span> seconds...
                <br><small>Press ESC to cancel</small>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', countdownHTML);
    }

    // Update countdown every second
    const countdownInterval = setInterval(() => {
        remainingTime--;
        const countdownSpan = document.getElementById('countdown');

        if (countdownSpan) {
            countdownSpan.textContent = remainingTime;
        }

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

/**
 * Perform the redirect
 */
function performRedirect() {
    // Add loading state
    addLoadingState();

    // Attempt redirect
    try {
        window.location.href = TARGET_URL;
    } catch (error) {
        console.error('Redirect failed:', error);
        showRedirectError();
    }
}

/**
 * Add loading state during redirect
 */
function addLoadingState() {
    const container = document.querySelector('.redirect-container');
    container.style.opacity = '0.8';

    // Update text
    const mainText = container.querySelector('p');
    if (mainText) {
        mainText.textContent = 'Redirecting now...';
    }
}

/**
 * Cancel the redirect
 */
function cancelRedirect() {
    const container = document.querySelector('.redirect-container');
    const mainText = container.querySelector('p');

    if (mainText) {
        mainText.innerHTML = 'Redirect cancelled. <a href="' + TARGET_URL + '" class="redirect-link">Click here to continue</a>';
    }

    // Remove countdown
    const countdownElement = document.querySelector('.redirect-info');
    if (countdownElement) {
        countdownElement.remove();
    }

    // Stop progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.animationPlayState = 'paused';
    }
}

/**
 * Show redirect error
 */
function showRedirectError() {
    const container = document.querySelector('.redirect-container');
    const mainText = container.querySelector('p');

    if (mainText) {
        mainText.innerHTML = `
            <span style="color: #ff6b6b;">Redirect failed!</span><br>
            <a href="${TARGET_URL}" class="redirect-link">Click here to continue manually</a>
        `;
    }

    // Remove spinner
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

/**
 * Add keyboard navigation
 */
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                performRedirect();
                break;
            case 'Escape':
                e.preventDefault();
                // Already handled in startRedirectTimer
                break;
        }
    });
}

/**
 * Add accessibility features
 */
function addAccessibilityFeatures() {
    // Add ARIA labels
    const container = document.querySelector('.redirect-container');
    if (container) {
        container.setAttribute('role', 'main');
        container.setAttribute('aria-label', 'Module 5 Lab redirect page');
    }

    // Add focus management
    const redirectLink = document.querySelector('.redirect-link');
    if (redirectLink) {
        redirectLink.setAttribute('aria-label', 'Manually navigate to main application');
    }

    // Announce redirect to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = 'Page will redirect to main application in 2 seconds';
    document.body.appendChild(announcement);
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.animationPlayState = 'paused';
        }
    } else {
        // Resume animations when page is visible
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.animationPlayState = 'running';
        }
    }
});

/**
 * Preload the target page for faster navigation
 */
function preloadTargetPage() {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = TARGET_URL;
    document.head.appendChild(link);
}

// Preload on initialization
document.addEventListener('DOMContentLoaded', preloadTargetPage);
