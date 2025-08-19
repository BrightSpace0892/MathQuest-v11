export function initPlaySheet() {
    const playButton = document.getElementById('btn-play');
    const playSheet = document.getElementById('play-sheet');
    const cancelButton = document.getElementById('sheet-cancel');
    const startButton = document.getElementById('sheet-start');
    const rememberCheckbox = document.getElementById('remember-choice');
    const gradeSelect = document.getElementById('grade-select');
    const modeSelect = document.getElementById('mode-select');

    if (!playButton || !playSheet) {
        console.warn('Play button or sheet not found');
        return;
    }

    // Check if user has saved preferences
    const savedPrefs = localStorage.getItem('mq_gamePrefs');
    const rememberChoice = localStorage.getItem('mq_rememberChoice') === 'true';

    playButton.addEventListener('click', () => {
        if (rememberChoice && savedPrefs) {
            // Navigate directly to games if preferences are saved
            window.dispatchEvent(new CustomEvent('navigate', { detail: '/games' }));
            return;
        }
        
        // Show the setup sheet
        playSheet.classList.add('active');
        document.body.classList.add('sheet-open');
        
        // Focus the first form element
        gradeSelect.focus();
    });

    cancelButton.addEventListener('click', closeSheet);
    
    // Close sheet when clicking outside
    playSheet.addEventListener('click', (e) => {
        if (e.target === playSheet) {
            closeSheet();
        }
    });

    startButton.addEventListener('click', () => {
        const grade = gradeSelect.value;
        const mode = modeSelect.value;
        const remember = rememberCheckbox.checked;

        // Save preferences if remember is checked
        if (remember) {
            localStorage.setItem('mq_gamePrefs', JSON.stringify({ grade, mode }));
            localStorage.setItem('mq_rememberChoice', 'true');
        } else {
            localStorage.removeItem('mq_gamePrefs');
            localStorage.removeItem('mq_rememberChoice');
        }

        closeSheet();
        
        // Navigate to games page
        if (window.router) {
            window.router.navigate('/games');
        } else {
            // Fallback navigation
            window.location.href = '/games';
        }
    });

    // Load saved preferences
    if (savedPrefs) {
        try {
            const prefs = JSON.parse(savedPrefs);
            gradeSelect.value = prefs.grade || '1';
            modeSelect.value = prefs.mode || 'easy';
            rememberCheckbox.checked = rememberChoice;
        } catch (e) {
            console.warn('Failed to load saved preferences:', e);
        }
    }

    function closeSheet() {
        playSheet.classList.remove('active');
        document.body.classList.remove('sheet-open');
        playButton.focus(); // Return focus to play button
    }

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && playSheet.classList.contains('active')) {
            closeSheet();
        }
    });
}