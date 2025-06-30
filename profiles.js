/**
 * Profile System for StreamerSongList Overlay
 * 
 * This file contains different styling and effect profiles that can be applied
 * to customize the appearance and behavior of the queue overlay.
 */

// Available profiles with their configurations
const profiles = {
    superhero: {
        name: "Superhero",
        description: "Comic book style with vibrant colors and dynamic effects",
        fonts: {
            primary: "'Bangers', 'Arial', sans-serif",
            secondary: "'Fredoka One', sans-serif",
            accent: "'Bungee', sans-serif"
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
    },

    minimal: {
        name: "Minimal",
        description: "Clean and simple design with subtle effects",
        fonts: {
            primary: "'Roboto', 'Arial', sans-serif",
            secondary: "'Roboto', sans-serif",
            accent: "'Roboto', sans-serif"
        },
        colors: {
            primary: "#FFFFFF",
            secondary: "#E0E0E0",
            accent: "#2196F3",
            background: "rgba(0, 0, 0, 0.8)",
            titleColor: "#FFFFFF",
            artistColor: "#E0E0E0",
            requesterColor: "#2196F3",
            positionColor: "#2196F3"
        },
        effects: {
            animations: false,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: false,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "48px",
            artistSize: "36px",
            requesterSize: "28px",
            positionSize: "32px",
            spacing: "compact",
            borders: false,
            shadows: false
        },
        background: {
            gradients: false,
            patterns: false,
            animation: false
        }
    },

    neon: {
        name: "Neon",
        description: "Cyberpunk-inspired with glowing neon effects",
        fonts: {
            primary: "'Orbitron', 'Arial', sans-serif",
            secondary: "'Exo 2', sans-serif",
            accent: "'Audiowide', sans-serif"
        },
        colors: {
            primary: "#00FFFF",
            secondary: "#FF00FF",
            accent: "#00FF00",
            background: "rgba(0, 0, 0, 0.9)",
            titleColor: "#00FFFF",
            artistColor: "#FF00FF",
            requesterColor: "#00FF00",
            positionColor: "#FFFF00"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: true,
            bounce: false,
            pulse: true,
            shimmer: true,
            sparkles: false
        },
        layout: {
            titleSize: "56px",
            artistSize: "42px",
            requesterSize: "32px",
            positionSize: "40px",
            spacing: "standard",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    retro: {
        name: "Retro",
        description: "80s-inspired with warm colors and classic styling",
        fonts: {
            primary: "'Press Start 2P', monospace",
            secondary: "'VT323', monospace",
            accent: "'Courier New', monospace"
        },
        colors: {
            primary: "#FFE066",
            secondary: "#FF6B9D",
            accent: "#C44569",
            background: "rgba(20, 20, 20, 0.9)",
            titleColor: "#FFE066",
            artistColor: "#FF6B9D",
            requesterColor: "#C44569",
            positionColor: "#00D2D3"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: true,
            pulse: false,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "42px",
            artistSize: "32px",
            requesterSize: "24px",
            positionSize: "36px",
            spacing: "retro",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: false
        }
    },

    elegant: {
        name: "Elegant",
        description: "Sophisticated design with elegant typography",
        fonts: {
            primary: "'Playfair Display', serif",
            secondary: "'Source Sans Pro', sans-serif",
            accent: "'Crimson Text', serif"
        },
        colors: {
            primary: "#F5F5F5",
            secondary: "#D4AF37",
            accent: "#8B4513",
            background: "rgba(0, 0, 0, 0.7)",
            titleColor: "#F5F5F5",
            artistColor: "#D4AF37",
            requesterColor: "#8B4513",
            positionColor: "#D4AF37"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: true,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "52px",
            artistSize: "38px",
            requesterSize: "30px",
            positionSize: "36px",
            spacing: "elegant",
            borders: false,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: false,
            animation: false
        }
    },

    gaming: {
        name: "Gaming",
        description: "High-energy design perfect for gaming streams with bold colors",
        fonts: {
            primary: "'Orbitron', 'Arial', sans-serif",
            secondary: "'Exo 2', sans-serif",
            accent: "'Rajdhani', sans-serif"
        },
        colors: {
            primary: "#FFFFFF",
            secondary: "#00FF41",
            accent: "#FF0080",
            background: "rgba(0, 0, 0, 0.85)",
            titleColor: "#00FF41",
            artistColor: "#FF0080",
            requesterColor: "#00BFFF",
            positionColor: "#FFD700"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: true,
            pulse: true,
            shimmer: false,
            sparkles: true
        },
        layout: {
            titleSize: "58px",
            artistSize: "44px",
            requesterSize: "34px",
            positionSize: "42px",
            spacing: "gaming",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    music: {
        name: "Music",
        description: "Smooth and rhythmic design ideal for music and DJ streams",
        fonts: {
            primary: "'Montserrat', sans-serif",
            secondary: "'Open Sans', sans-serif",
            accent: "'Dancing Script', cursive"
        },
        colors: {
            primary: "#F8F8FF",
            secondary: "#9370DB",
            accent: "#FF69B4",
            background: "rgba(25, 25, 112, 0.8)",
            titleColor: "#F8F8FF",
            artistColor: "#9370DB",
            requesterColor: "#FF69B4",
            positionColor: "#FFD700"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: true,
            bounce: false,
            pulse: true,
            shimmer: true,
            sparkles: false
        },
        layout: {
            titleSize: "54px",
            artistSize: "42px",
            requesterSize: "32px",
            positionSize: "38px",
            spacing: "music",
            borders: false,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: false,
            animation: true
        }
    },

    chatting: {
        name: "Just Chatting",
        description: "Comfortable and readable design for talk shows and casual streams",
        fonts: {
            primary: "'Lato', sans-serif",
            secondary: "'Source Sans Pro', sans-serif",
            accent: "'Merriweather', serif"
        },
        colors: {
            primary: "#2C3E50",
            secondary: "#3498DB",
            accent: "#E74C3C",
            background: "rgba(236, 240, 241, 0.95)",
            titleColor: "#2C3E50",
            artistColor: "#3498DB",
            requesterColor: "#E74C3C",
            positionColor: "#F39C12"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: true,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "48px",
            artistSize: "36px",
            requesterSize: "28px",
            positionSize: "34px",
            spacing: "comfortable",
            borders: true,
            shadows: false
        },
        background: {
            gradients: false,
            patterns: false,
            animation: false
        }
    },

    horror: {
        name: "Horror",
        description: "Dark and spooky design perfect for horror games and scary content",
        fonts: {
            primary: "'Creepster', cursive",
            secondary: "'Nosifer', cursive",
            accent: "'Butcherman', cursive"
        },
        colors: {
            primary: "#FF0000",
            secondary: "#8B0000",
            accent: "#DC143C",
            background: "rgba(0, 0, 0, 0.95)",
            titleColor: "#FF0000",
            artistColor: "#8B0000",
            requesterColor: "#DC143C",
            positionColor: "#FF4500"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: false,
            pulse: true,
            shimmer: true,
            sparkles: false
        },
        layout: {
            titleSize: "56px",
            artistSize: "42px",
            requesterSize: "32px",
            positionSize: "40px",
            spacing: "horror",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    kawaii: {
        name: "Kawaii",
        description: "Cute and colorful design perfect for anime, art, and kawaii content",
        fonts: {
            primary: "'Quicksand', sans-serif",
            secondary: "'Comfortaa', cursive",
            accent: "'Kalam', cursive"
        },
        colors: {
            primary: "#FF69B4",
            secondary: "#FFB6C1",
            accent: "#FF1493",
            background: "rgba(255, 240, 245, 0.9)",
            titleColor: "#FF69B4",
            artistColor: "#9370DB",
            requesterColor: "#FF1493",
            positionColor: "#FFD700"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: true,
            bounce: true,
            pulse: true,
            shimmer: true,
            sparkles: true
        },
        layout: {
            titleSize: "52px",
            artistSize: "40px",
            requesterSize: "30px",
            positionSize: "36px",
            spacing: "kawaii",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    corporate: {
        name: "Corporate",
        description: "Professional and clean design for business streams and presentations",
        fonts: {
            primary: "'Inter', sans-serif",
            secondary: "'Roboto', sans-serif",
            accent: "'Source Sans Pro', sans-serif"
        },
        colors: {
            primary: "#2C3E50",
            secondary: "#34495E",
            accent: "#3498DB",
            background: "rgba(255, 255, 255, 0.95)",
            titleColor: "#2C3E50",
            artistColor: "#34495E",
            requesterColor: "#3498DB",
            positionColor: "#E67E22"
        },
        effects: {
            animations: false,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: false,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "46px",
            artistSize: "34px",
            requesterSize: "26px",
            positionSize: "32px",
            spacing: "corporate",
            borders: true,
            shadows: false
        },
        background: {
            gradients: false,
            patterns: false,
            animation: false
        }
    },

    synthwave: {
        name: "Synthwave",
        description: "80s synthwave aesthetic with neon grids and retro-futuristic vibes",
        fonts: {
            primary: "'Orbitron', monospace",
            secondary: "'Electrolize', sans-serif",
            accent: "'Audiowide', cursive"
        },
        colors: {
            primary: "#FF00FF",
            secondary: "#00FFFF",
            accent: "#FFFF00",
            background: "rgba(16, 0, 32, 0.9)",
            titleColor: "#FF00FF",
            artistColor: "#00FFFF",
            requesterColor: "#FFFF00",
            positionColor: "#FF0080"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: true,
            bounce: false,
            pulse: true,
            shimmer: true,
            sparkles: false
        },
        layout: {
            titleSize: "54px",
            artistSize: "40px",
            requesterSize: "30px",
            positionSize: "38px",
            spacing: "synthwave",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    nature: {
        name: "Nature",
        description: "Earthy and organic design perfect for outdoor and nature content",
        fonts: {
            primary: "'Merriweather', serif",
            secondary: "'Lora', serif",
            accent: "'Amatic SC', cursive"
        },
        colors: {
            primary: "#2E8B57",
            secondary: "#228B22",
            accent: "#8FBC8F",
            background: "rgba(245, 245, 220, 0.9)",
            titleColor: "#2E8B57",
            artistColor: "#228B22",
            requesterColor: "#CD853F",
            positionColor: "#DAA520"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: true,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "50px",
            artistSize: "38px",
            requesterSize: "28px",
            positionSize: "34px",
            spacing: "nature",
            borders: false,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: false,
            animation: false
        }
    }
};

// Current active profile (default to superhero)
let currentProfile = 'superhero';

/**
 * Apply a profile to the overlay
 * @param {string} profileName - Name of the profile to apply
 */
function applyProfile(profileName) {
    if (!profiles[profileName]) {
        console.error(`Profile '${profileName}' not found`);
        return;
    }

    currentProfile = profileName;
    const profile = profiles[profileName];
    
    console.log(`Applying profile: ${profile.name}`);
    
    // Apply CSS variables for the profile
    applyCSSVariables(profile);
    
    // Apply profile-specific classes
    applyProfileClasses(profileName);
    
    // Load profile-specific fonts
    loadProfileFonts(profile);
    
    // Apply effects configuration
    applyEffectsConfiguration(profile);
    
    // Trigger a queue update to apply new styling
    if (typeof $("body").updateQueue === 'function') {
        $("body").updateQueue();
    }
}

/**
 * Apply CSS variables based on profile configuration
 * @param {Object} profile - Profile configuration object
 */
function applyCSSVariables(profile) {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--primary-color', profile.colors.primary);
    root.style.setProperty('--secondary-color', profile.colors.secondary);
    root.style.setProperty('--accent-color', profile.colors.accent);
    root.style.setProperty('--background-color', profile.colors.background);
    root.style.setProperty('--title-color', profile.colors.titleColor);
    root.style.setProperty('--artist-color', profile.colors.artistColor);
    root.style.setProperty('--requester-color', profile.colors.requesterColor);
    root.style.setProperty('--position-color', profile.colors.positionColor);
    
    // Apply font variables
    root.style.setProperty('--primary-font', profile.fonts.primary);
    root.style.setProperty('--secondary-font', profile.fonts.secondary);
    root.style.setProperty('--accent-font', profile.fonts.accent);
    
    // Apply layout variables
    root.style.setProperty('--title-size', profile.layout.titleSize);
    root.style.setProperty('--artist-size', profile.layout.artistSize);
    root.style.setProperty('--requester-size', profile.layout.requesterSize);
    root.style.setProperty('--position-size', profile.layout.positionSize);
}

/**
 * Apply profile-specific CSS classes
 * @param {string} profileName - Name of the profile
 */
function applyProfileClasses(profileName) {
    const body = document.body;
    
    // Remove existing profile classes
    Object.keys(profiles).forEach(name => {
        body.classList.remove(`profile-${name}`);
    });
    
    // Add new profile class
    body.classList.add(`profile-${profileName}`);
}

/**
 * Load fonts required by the profile
 * @param {Object} profile - Profile configuration object
 */
function loadProfileFonts(profile) {
    const fonts = [
        profile.fonts.primary,
        profile.fonts.secondary,
        profile.fonts.accent
    ];
    
    // Extract font family names and load them
    fonts.forEach(fontDeclaration => {
        const fontFamily = fontDeclaration.split(',')[0].replace(/['"]/g, '').trim();
        
        // Skip loading system fonts
        if (['Arial', 'sans-serif', 'serif', 'monospace', 'Courier New'].includes(fontFamily)) {
            return;
        }
        
        // Load Google Fonts
        loadGoogleFont(fontFamily);
    });
}

/**
 * Load a Google Font
 * @param {string} fontFamily - Font family name
 */
function loadGoogleFont(fontFamily) {
    const fontMap = {
        'Bangers': 'Bangers',
        'Fredoka One': 'Fredoka+One:wght@400',
        'Bungee': 'Bungee',
        'Orbitron': 'Orbitron:wght@400;700;900',
        'Exo 2': 'Exo+2:wght@400;700',
        'Audiowide': 'Audiowide',
        'Press Start 2P': 'Press+Start+2P',
        'VT323': 'VT323',
        'Playfair Display': 'Playfair+Display:wght@400;700',
        'Source Sans Pro': 'Source+Sans+Pro:wght@400;600',
        'Crimson Text': 'Crimson+Text:wght@400;600',
        'Roboto': 'Roboto:wght@400;500',
        'Rajdhani': 'Rajdhani:wght@400;500;600',
        'Montserrat': 'Montserrat:wght@400;500;600',
        'Open Sans': 'Open+Sans:wght@400;600',
        'Dancing Script': 'Dancing+Script:wght@400;700',
        'Lato': 'Lato:wght@400;700',
        'Merriweather': 'Merriweather:wght@400;700',
        'Creepster': 'Creepster',
        'Nosifer': 'Nosifer',
        'Butcherman': 'Butcherman',
        'Quicksand': 'Quicksand:wght@400;500;600',
        'Comfortaa': 'Comfortaa:wght@400;700',
        'Kalam': 'Kalam:wght@400;700',
        'Inter': 'Inter:wght@400;500;600',
        'Electrolize': 'Electrolize',
        'Lora': 'Lora:wght@400;700',
        'Amatic SC': 'Amatic+SC:wght@400;700'
    };
    
    const googleFontName = fontMap[fontFamily];
    if (!googleFontName) return;
    
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="${googleFontName}"]`);
    if (existingLink) return;
    
    // Create and append font link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap`;
    document.head.appendChild(link);
}

/**
 * Apply effects configuration from profile
 * @param {Object} profile - Profile configuration object
 */
function applyEffectsConfiguration(profile) {
    const root = document.documentElement;
    
    // Set effect flags as CSS custom properties
    root.style.setProperty('--animations-enabled', profile.effects.animations ? '1' : '0');
    root.style.setProperty('--flipboard-enabled', profile.effects.flipBoard ? '1' : '0');
    root.style.setProperty('--glow-enabled', profile.effects.glow ? '1' : '0');
    root.style.setProperty('--bounce-enabled', profile.effects.bounce ? '1' : '0');
    root.style.setProperty('--pulse-enabled', profile.effects.pulse ? '1' : '0');
    root.style.setProperty('--shimmer-enabled', profile.effects.shimmer ? '1' : '0');
    root.style.setProperty('--sparkles-enabled', profile.effects.sparkles ? '1' : '0');
    
    // Set layout flags
    root.style.setProperty('--borders-enabled', profile.layout.borders ? '1' : '0');
    root.style.setProperty('--shadows-enabled', profile.layout.shadows ? '1' : '0');
    
    // Set background flags
    root.style.setProperty('--gradients-enabled', profile.background.gradients ? '1' : '0');
    root.style.setProperty('--patterns-enabled', profile.background.patterns ? '1' : '0');
    root.style.setProperty('--bg-animation-enabled', profile.background.animation ? '1' : '0');
}

/**
 * Get the current active profile
 * @returns {Object} Current profile configuration
 */
function getCurrentProfile() {
    return profiles[currentProfile];
}

/**
 * Get all available profiles
 * @returns {Object} All profiles
 */
function getAllProfiles() {
    return profiles;
}

/**
 * Get profile names
 * @returns {Array} Array of profile names
 */
function getProfileNames() {
    return Object.keys(profiles);
}

// Initialize with default profile when DOM is ready
$(document).ready(function() {
    // Apply default profile
    applyProfile(currentProfile);
});