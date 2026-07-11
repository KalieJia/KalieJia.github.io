/**
 * Router - Handles client-side routing and dynamic content loading
 * Loads navigation, footer, and section content dynamically
 */

class Router {
    constructor() {
        this.currentSection = 'home';
        this.sectionFiles = {
            home: 'home.html',
            accomplishments: 'accomplishments.html',
            coursework: 'coursework.html',
            videos: 'videos.html',
            writing: 'writing.html',
            music: 'music.html',
            resume: 'resume.html',
            travels: 'travels.html',
            community: 'community.html'
        };
        this.sections = Object.keys(this.sectionFiles);
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
            
            // Update footer year after loading
            if (window.updateFooterYear) {
                window.updateFooterYear();
            }
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }

    /**
     * Load a section component
     * Prefer the flat layout and fall back to the legacy folder structure.
     */
    async loadSection(section) {
        const primaryPath = this.sectionFiles[section] || `${section}.html`;
        const fallbackPath = `${section}/${section}.html`;
        const candidatePaths = [primaryPath, fallbackPath];

        for (const path of candidatePaths) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    continue;
                }

                const html = await response.text();
                this.components.sections[section] = html;
                return;
            } catch (error) {
                // Try the next candidate path.
            }
        }

        console.error(`Failed to load section ${section} from any supported path.`);
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
            const fragment = document.createElement('div');
            fragment.innerHTML = this.components.sections[section];

            viewport.innerHTML = '';
            viewport.appendChild(fragment);
            this.executeSectionScripts(viewport);
            
            // Re-initialize features that depend on DOM
            this.initializeSectionFeatures(section);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    executeSectionScripts(container) {
        const scripts = Array.from(container.querySelectorAll('script'));

        scripts.forEach((script) => {
            const newScript = document.createElement('script');

            Array.from(script.attributes).forEach((attribute) => {
                newScript.setAttribute(attribute.name, attribute.value);
            });

            newScript.textContent = script.textContent;
            script.replaceWith(newScript);
        });
    }

    /**
     * Initialize section-specific features
     */
    initializeSectionFeatures(section) {
        if (section === 'home' || section === 'music') {
            this.initSlideshow();
        }
        
        if (section === 'community') {
            // Reinitialize community filter when community section is displayed
            if (typeof window.CommunityFilter === 'function' || typeof CommunityFilter === 'function') {
                window.communityFilter = new CommunityFilter();
            }
        }
    }

    /**
     * Initialize slideshow functionality
     */
    initSlideshow() {
        const slideshow = document.getElementById('slideshow');
        if (!slideshow) return;
        
        // Prevent duplicate initialization
        if (slideshow.hasAttribute('data-slideshow-initialized')) return;
        slideshow.setAttribute('data-slideshow-initialized', 'true');

        const hasVideoWall = slideshow.hasAttribute('data-video-wall') ||
            (document.getElementById('music-video-column-left') && document.getElementById('music-video-column-right'));

        if (hasVideoWall) {
            this.initVideoWall(slideshow);
            return;
        }

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
        const autoPlayInterval = setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
        
        // Store interval ID for potential cleanup
        slideshow.setAttribute('data-slideshow-interval', autoPlayInterval);
    }

    initVideoWall(slideshow) {
        const orbit = document.getElementById('music-video-orbit');

        if (!orbit) return;

        if (orbit.dataset.initialized === 'true') return;
        orbit.dataset.initialized = 'true';

        const musicVideos = [
            { id: 'QUNe5xbDOhY' },
            { id: 'MXHqKtq_f3Y' },
            { id: '0LlF3-1k3dY' },
            { id: 'fezuk06LcKE' },
            { id: 'yAqeAe8HtEE' },
            { id: 'N4mN08RBK38' }
        ];

        const createVideoTile = (video, index) => {
            const button = document.createElement('button');
            button.className = 'video-tile';
            button.type = 'button';
            button.dataset.videoId = video.id;
            button.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=${video.id}&rel=0&modestbranding=1&showinfo=0"
                    title="Performance video"
                    loading="lazy"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            `;

            const total = musicVideos.length;
            const angle = (index / total) * (Math.PI * 2) - Math.PI / 2;
            const radiusX = 320;
            const radiusY = 180;
            const x = Math.cos(angle) * radiusX;
            const y = Math.sin(angle) * radiusY;
            const rotation = (index % 2 === 0 ? 4 : -4) + (index % 3 === 0 ? 2 : 0);

            button.style.setProperty('--orbit-x', `${x}px`);
            button.style.setProperty('--orbit-y', `${y}px`);
            button.style.setProperty('--orbit-rotation', `${rotation}deg`);
            return button;
        };

        orbit.append(...musicVideos.map(createVideoTile));

        let modal = document.getElementById('video-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'video-modal';
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-backdrop"></div>
                <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Video player">
                    <button class="video-modal-close" type="button" aria-label="Close video">×</button>
                    <div class="video-modal-frame">
                        <iframe
                            title="Featured performance"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        ></iframe>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.video-modal-close')?.addEventListener('click', () => this.closeVideoModal(modal));
            modal.querySelector('.video-modal-backdrop')?.addEventListener('click', () => this.closeVideoModal(modal));

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.closeVideoModal(document.getElementById('video-modal'));
                }
            });
        }

        const iframe = modal.querySelector('iframe');

        slideshow.querySelectorAll('.video-tile').forEach((tile) => {
            tile.addEventListener('click', () => {
                const videoId = tile.getAttribute('data-video-id');

                if (iframe && videoId) {
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
                }

                modal.classList.add('is-open');
                document.body.classList.add('modal-open');
            });
        });
    }

    closeVideoModal(modal) {
        if (!modal) return;

        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');

        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
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
