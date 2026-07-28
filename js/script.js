// ============================================ //
// CLOUD DESSERTZ - THEME TOGGLE JAVASCRIPT    //
// ============================================ //

// Get references to the DOM elements
const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
const bodyElement = document.body;
const logoImage = document.getElementById('site-logo');

// ============================================ //
// FUNCTION: Apply Theme Based on Preference   //
// ============================================ //

function applyTheme(isDark) {
    if (isDark) {
        // Add dark class to body
        bodyElement.classList.add('dark-theme');
        // Check the toggle (so it visually shows ON)
        toggleCheckbox.checked = true;
        // Logo filter is handled by CSS via --logo-filter variable
    } else {
        // Remove dark class from body
        bodyElement.classList.remove('dark-theme');
        // Uncheck the toggle (so it visually shows OFF)
        toggleCheckbox.checked = false;
        // Logo filter is handled by CSS via --logo-filter variable
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
// OPTIONAL: If you have a separate dark logo  //
// Uncomment the code below and upload logo-   //
// dark.jpg to swap images instead of using    //
// CSS filter.                                 //
// ============================================ //

/*
function swapLogo(isDark) {
    if (isDark) {
        logoImage.src = 'images/logo-dark.jpg';
    } else {
        logoImage.src = 'images/logo.jpg';
    }
}

// Then modify the applyTheme function above to call swapLogo(isDark)
// And remove the --logo-filter CSS approach.
*/

// ============================================ //
// RUN ON PAGE LOAD                            //
// ============================================ //

loadSavedTheme();

console.log('🍰 Cloud Dessertz theme system loaded!');
