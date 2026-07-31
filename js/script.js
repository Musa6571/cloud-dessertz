// ============================================ //
// CLOUD DESSERTZ - THEME TOGGLE JAVASCRIPT    //
// ============================================ //

// Get references to the DOM elements
const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
const bodyElement = document.body;
const logoImage = document.getElementById('site-logo');
const cloudImage = document.getElementById('cloud-image');

// ============================================ //
// FUNCTION: Swap Logo with Fade Effect        //
// ============================================ //

function swapLogo(isDark) {
    // Fade out
    logoImage.style.opacity = '0';
    
    // Wait for fade out, then swap image
    setTimeout(function() {
        if (isDark) {
            logoImage.src = 'images/logo-dark.jpg';
        } else {
            logoImage.src = 'images/logo.jpg';
        }
        // Fade back in
        logoImage.style.opacity = '1';
    }, 200);
}

// ============================================ //
// FUNCTION: Swap Cloud Image with Fade Effect //
// ============================================ //

function swapCloud(isDark) {
    // Fade out
    cloudImage.style.opacity = '0';
    
    // Wait for fade out, then swap image
    setTimeout(function() {
        if (isDark) {
            cloudImage.src = 'images/cloud-dark.jpg';
        } else {
            cloudImage.src = 'images/cloud-light.jpg';
        }
        // Fade back in
        cloudImage.style.opacity = '1';
    }, 200);
}

// ============================================ //
// FUNCTION: Apply Theme Based on Preference   //
// ============================================ //

function applyTheme(isDark) {
    if (isDark) {
        bodyElement.classList.add('dark-theme');
        toggleCheckbox.checked = true;
        swapLogo(true);
        swapCloud(true);
    } else {
        bodyElement.classList.remove('dark-theme');
        toggleCheckbox.checked = false;
        swapLogo(false);
        swapCloud(false);
    }

    localStorage.setItem('cloud-dessertz-theme', isDark ? 'dark' : 'light');
}

// ============================================ //
// FUNCTION: Load Saved Preference on Page Load//
// ============================================ //

function loadSavedTheme() {
    // Set initial opacity to 1
    logoImage.style.opacity = '1';
    cloudImage.style.opacity = '1';
    
    const savedTheme = localStorage.getItem('cloud-dessertz-theme');

    if (savedTheme === 'dark') {
        // Load dark theme immediately (no animation on page load)
        bodyElement.classList.add('dark-theme');
        toggleCheckbox.checked = true;
        logoImage.src = 'images/logo-dark.jpg';
        cloudImage.src = 'images/cloud-dark.jpg';
    } else if (savedTheme === 'light') {
        bodyElement.classList.remove('dark-theme');
        toggleCheckbox.checked = false;
        logoImage.src = 'images/logo.jpg';
        cloudImage.src = 'images/cloud-light.jpg';
    } else {
        // Default to Light Theme
        bodyElement.classList.remove('dark-theme');
        toggleCheckbox.checked = false;
        logoImage.src = 'images/logo.jpg';
        cloudImage.src = 'images/cloud-light.jpg';
    }
}

// ============================================ //
// EVENT LISTENER: Toggle Click                //
// ============================================ //

toggleCheckbox.addEventListener('change', function() {
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
