export function initTheme() {
    // Initialize theme based on time or user preference
    const savedTheme = localStorage.getItem('mq_theme');
    const currentHour = new Date().getHours();
    
    // Default to night theme between 6 PM and 6 AM
    const isNightTime = currentHour >= 18 || currentHour < 6;
    const shouldUseNight = savedTheme === 'night' || (savedTheme === null && isNightTime);
    
    if (shouldUseNight) {
        document.body.classList.add('night');
    }
    
    // Optional: Add theme toggle functionality
    // This could be expanded later with a theme toggle button
}