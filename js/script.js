// ============================================ //
// CLOUD DESSERTZ - THEME TOGGLE JAVASCRIPT    //
// ============================================ //

// Get references to the DOM elements
const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
const bodyElement = document.body;
const logoImage = document.getElementById('site-logo');

// ============================================ //
// FUNCTION: Swap Logo Based on Theme          //
// ============================================ //

function swapLogo(isDark) {
    if (isDark) {
        // Use the dark version of the logo
        logoImage.src = 'images/logo-dark.jpg';
    } else {
        // Use the regular version of the logo
        logoImage.src = 'images/logo.jpg';
    }
}

// ============================================ //
// FUNCTION: Apply Theme Based on Preference   //
// ============================================ //

function applyTheme(isDark) {
    if (isDark) {
        // Add dark class to body
        bodyElement.classList.add('dark-theme');
        // Check the toggle (so it visually shows ON)
        toggleCheckbox.checked = true;
        // Swap to dark logo
        swapLogo(true);
    } else {
        // Remove dark class from body
        bodyElement.classList.remove('dark-theme');
        // Uncheck the toggle (so it visually shows OFF)
        toggleCheckbox.checked = false;
        // Swap to light logo
        swapLogo(false);
    }

    // Save the user's preference to localStorage so it persists across pages
    localStorage.setItem('cloud-dessertz-theme', isDark ? 'dark' : 'light');
}

// ============================================ //
// FUNCTION: Load Saved Preference on Page Load//
// ============================================ //

function loadSavedTheme() {
    // Check if user has previously saved a preference
    const savedTheme = localStorage.getItem('cloud-dessertz-theme');

    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else {
        // No saved preference → Default to Light Theme
        applyTheme(false);
    }
}

// ============================================ //
// EVENT LISTENER: Toggle Click                //
// ============================================ //

toggleCheckbox.addEventListener('change', function() {
    // If checkbox is checked → Dark Theme, else → Light Theme
    if (this.checked) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
});

// ============================================ //
// RUN ON PAGE LOAD                            //
// ============================================ //

loadSavedTheme();

console.log('🍰 Cloud Dessertz theme system loaded!');
