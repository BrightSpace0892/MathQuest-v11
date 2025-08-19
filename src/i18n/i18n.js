let currentLocale = 'en';
let translations = {};

export async function loadLocale(locale) {
    try {
        const response = await fetch(`/src/i18n/${locale}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load locale: ${locale}`);
        }
        translations = await response.json();
        currentLocale = locale;
        return translations;
    } catch (error) {
        console.error('Error loading locale:', error);
        // Fallback to default translations
        translations = {
            "home": "Home",
            "games": "Games",
            "missions": "Missions",
            "leaderboard": "Leaderboard",
            "play": "Play",
            "welcome": "Welcome to MathQuest",
            "hero-description": "Embark on an epic mathematical adventure!",
            "setup-game": "Setup Game",
            "select-grade": "Select Grade:",
            "select-mode": "Select Mode:",
            "remember-choice": "Remember my choice",
            "start": "Start"
        };
        return translations;
    }
}

export function t(key, fallback = key) {
    return translations[key] || fallback;
}

export function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            element.value = translation;
        } else if (element.hasAttribute('placeholder')) {
            element.placeholder = translation;
        } else if (element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', translation);
        } else {
            element.textContent = translation;
        }
    });
}