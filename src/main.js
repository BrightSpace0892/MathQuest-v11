import { router } from './router.js';
import { loadLocale, applyI18n } from './i18n/i18n.js';
import { initPlaySheet } from './components/playSheet.js';
import { initTheme } from './theme.js';

// Initialize the application
async function init() {
    try {
        // Load default locale
        await loadLocale('en');
        
        // Apply i18n to the page
        applyI18n();
        
        // Initialize router
        router.init();
        
        // Initialize play sheet
        initPlaySheet();
        
        // Initialize theme
        initTheme();
        
        console.log('MathQuest v11 initialized successfully');
    } catch (error) {
        console.error('Failed to initialize MathQuest:', error);
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}