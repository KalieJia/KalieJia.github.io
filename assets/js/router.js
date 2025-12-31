/**
 * Router - Handles client-side routing and dynamic content loading
 * Loads navigation, footer, and section content dynamically
 */

class Router {
    constructor() {
        this.currentSection = 'home';
        this.sections = [
            'home', 'accomplishments', 'coursework',
            'videos', 'writing', 'music', 'resume',
            'photos', 'travels', 'community', 'contact'
        ];
        this.components = {
            nav: null,
            footer: null,
            sections: {}
        };
    }

    /**
     * Initialize router - load all components and set up event listeners
     */
    async init() {
        try {
            // Load navigation and footer components
            await this.loadNav();
            await this.loadFooter();
            
            // Load all section components
            for (let section of this.sections) {
                await this.loadSection(section);
            }

            // Set up event listeners for navigation
            this.setupNavigation();
            
            // Handle initial route based on hash
            this.handleRoute();
            
            // Listen for hash changes
            window.addEventListener('hashchange', () => this.handleRoute());
            
            // If no hash, default to home
            if (!window.location.hash) {
                window.location.hash = '#home';
            }
        } catch (error) {
            console.error('Router initialization failed:', error);
        }
    }

    /**
     * Load navigation component
     */
    async loadNav() {
        try {
            const response = await fetch('components/nav.html');
            const html = await response.text();
            this.components.nav = html;
            document.getElementById('navbar-container').innerHTML = html;
            
            // Setup mobile navigation after loading nav
            if (window.setupMobileNavigation) {
                window.setupMobileNavigation();
            }
            
            // Setup theme selector after loading nav
            if (window.setupThemeSelector) {
                window.setupThemeSelector();
            }
        } catch (error) {
            console.error('Failed to load navigation:', error);
        }
    }

    /**
     * Load footer component
     */
    async loadFooter() {
        try {
            const response = await fetch('components/footer.html');
            const html = await response.text();
            this.components.footer = html;
            document.getElementById('footer-container').innerHTML = html;
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }

    /**
     * Load a section component
     */
    async loadSection(section) {
        try {
            
            let path;
            path = `${section}/${section}.html`;
            
            const response = await fetch(path);
            const html = await response.text();
            this.components.sections[section] = html;
        } catch (error) {
            console.error(`Failed to load section ${section}:`, error);
        }
    }

    /**
     * Set up navigation event listeners
     */
    setupNavigation() {
        // Nav links with data-section attribute
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-section]');
            if (link) {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                window.location.hash = `#${section}`;
            }
        });
    }

    /**
     * Handle route changes and display appropriate section
     */
    handleRoute() {
        let section = window.location.hash.slice(1);
        
        // Validate section
        if (!this.sections.includes(section)) {
            section = 'home';
            window.location.hash = '#home';
        }

        this.currentSection = section;
        this.displaySection(section);
        this.updateNavigation();
    }

    /**
     * Display a section in the viewport
     */
    displaySection(section) {
        const viewport = document.getElementById('content-viewport');
        
        if (this.components.sections[section]) {
            viewport.innerHTML = this.components.sections[section];
            
            // Re-initialize features that depend on DOM
            this.initializeSectionFeatures(section);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    /**
     * Initialize section-specific features
     */
    initializeSectionFeatures(section) {
        if (section === 'home' || section === 'music') {
            this.initSlideshow();
        }
    }

    /**
     * Initialize slideshow functionality
     */
    initSlideshow() {
        const slideshow = document.getElementById('slideshow');
        if (!slideshow) return;

        let currentSlide = 0;
        const slides = slideshow.querySelectorAll('.slide');
        const dots = slideshow.querySelectorAll('.slide-dot');
        const totalSlides = slides.length;

        const showSlide = (index) => {
            // Handle wrap-around
            if (index >= totalSlides) currentSlide = 0;
            if (index < 0) currentSlide = totalSlides - 1;

            // Update slides
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');

            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        // Next/Previous buttons
        slideshow.querySelector('.slide-arrow.next')?.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });

        slideshow.querySelector('.slide-arrow.prev')?.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });

        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-play slideshow (optional)
        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    }

    /**
     * Initialize puzzle toggle functionality
     */
    initPuzzles() {
        const puzzleToggles = document.querySelectorAll('.puzzle-toggle');
        
        puzzleToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const solution = toggle.nextElementSibling;
                if (solution && solution.classList.contains('puzzle-solution')) {
                    solution.classList.toggle('hidden');
                    toggle.textContent = solution.classList.contains('hidden') 
                        ? 'Show Solution' 
                        : 'Hide Solution';
                }
            });
        });
    }

    /**
     * Update navigation active states
     */
    updateNavigation() {
        document.querySelectorAll('[data-section]').forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === this.currentSection) {
                link.classList.add('active');
                link.parentElement?.classList.add('active');
            } else {
                link.classList.remove('active');
                link.parentElement?.classList.remove('active');
            }
        });
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    router.init();
    
    // Make router globally accessible for main.js
    window.appRouter = router;
});
