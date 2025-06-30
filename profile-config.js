/**
 * Profile Configuration File
 * 
 * This file allows you to customize existing profiles or create new ones.
 * You can modify the settings below to create your own unique styling.
 */

// User-defined profile configurations
const userProfiles = {
    // Example custom profile
    custom: {
        name: "Custom",
        description: "Your custom profile - modify this to create your own style",
        fonts: {
            primary: "'Arial', sans-serif",
            secondary: "'Arial', sans-serif",
            accent: "'Arial', sans-serif"
        },
        colors: {
            primary: "#FFFFFF",
            secondary: "#FFD700",
            accent: "#FF6B35",
            background: "transparent",
            titleColor: "#FFFFFF",
            artistColor: "#FF6B35",
            requesterColor: "#9C27B0",
            positionColor: "#FFD700"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: true,
            pulse: true,
            shimmer: true,
            sparkles: true
        },
        layout: {
            titleSize: "64px",
            artistSize: "48px",
            requesterSize: "36px",
            positionSize: "48px",
            spacing: "standard",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    }
    
    // Add more custom profiles here following the same structure
    // yourProfileName: {
    //     name: "Your Profile Name",
    //     description: "Description of your profile",
    //     ... (same structure as above)
    // }
};

// Profile overrides - modify existing profiles
const profileOverrides = {
    // Example: Make superhero profile less flashy
    // superhero: {
    //     effects: {
    //         bounce: false,
    //         sparkles: false
    //     }
    // }
    
    // Example: Change neon profile colors
    // neon: {
    //     colors: {
    //         titleColor: "#FF0080",
    //         artistColor: "#00FF80"
    //     }
    // }
};

/**
 * Apply user configurations to the profile system
 * This function should be called after profiles.js is loaded
 */
function applyUserProfileConfigurations() {
    if (typeof profiles === 'undefined') {
        console.warn('Base profiles not loaded yet');
        return;
    }
    
    // Add user-defined profiles
    Object.keys(userProfiles).forEach(profileName => {
        profiles[profileName] = userProfiles[profileName];
        console.log(`Added user profile: ${profileName}`);
    });
    
    // Apply profile overrides
    Object.keys(profileOverrides).forEach(profileName => {
        if (profiles[profileName]) {
            // Deep merge the override with the existing profile
            profiles[profileName] = deepMerge(profiles[profileName], profileOverrides[profileName]);
            console.log(`Applied overrides to profile: ${profileName}`);
        }
    });
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
    const result = { ...target };
    
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    
    return result;
}

// Auto-apply configurations when this file is loaded
if (typeof profiles !== 'undefined') {
    applyUserProfileConfigurations();
} else {
    // Wait for profiles.js to load
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(applyUserProfileConfigurations, 100);
    });
}