class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/games': 'games',
            '/missions': 'missions',
            '/leaderboard': 'leaderboard'
        };
        this.currentRoute = '/';
    }

    init() {
        // Handle initial route
        this.handleRoute(window.location.pathname);
        
        // Listen for popstate events (back/forward buttons)
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });
    }

    navigate(path) {
        if (path !== this.currentRoute) {
            history.pushState(null, '', path);
            this.handleRoute(path);
        }
    }

    handleRoute(path) {
        // Normalize path
        const normalizedPath = path === '' ? '/' : path;
        
        // Check if route exists
        if (!this.routes[normalizedPath]) {
            console.warn(`Route not found: ${normalizedPath}`);
            return;
        }
        
        this.currentRoute = normalizedPath;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show current page
        const pageId = this.routes[normalizedPath];
        const currentPage = document.getElementById(pageId);
        if (currentPage) {
            currentPage.classList.add('active');
        }
        
        // Update document title
        this.updateTitle(pageId);
        
        // Update navigation
        this.updateNavigation();
        
        // Update accessibility live region
        this.updateA11yLive(pageId);
        
        // Store last route
        localStorage.setItem('mq_lastRoute', normalizedPath);
    }

    updateTitle(pageId) {
        const pageTitles = {
            'home': 'Home',
            'games': 'Games',
            'missions': 'Missions',
            'leaderboard': 'Leaderboard'
        };
        
        const pageTitle = pageTitles[pageId] || 'MathQuest';
        document.title = pageId === 'home' ? 'MathQuest' : `${pageTitle} - MathQuest`;
    }

    updateNavigation() {
        // Update desktop navigation
        document.querySelectorAll('.desktop-nav [data-route]').forEach(link => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-route') === this.currentRoute) {
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Update mobile navigation
        document.querySelectorAll('.mobile-nav [data-route]').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-route') === this.currentRoute) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    updateA11yLive(pageId) {
        const liveRegion = document.getElementById('a11y-live');
        if (liveRegion) {
            const pageTitles = {
                'home': 'Home',
                'games': 'Games',
                'missions': 'Missions',
                'leaderboard': 'Leaderboard'
            };
            liveRegion.textContent = `${pageTitles[pageId] || 'Page'} loaded`;
        }
    }
}

export const router = new Router();