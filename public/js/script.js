/* ============================================================
   FIASTARA PORTFOLIO - MAIN JAVASCRIPT
   ExpressJS + Handlebars Version | Stage 6 Final Polish
   ============================================================ */

// SECTION 1: NAVIGATION & SCROLL BEHAVIOR
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior for anchor links
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const navCollapse = document.querySelector('.navbar-collapse');
                    if (navCollapse && navCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                }
            });
        });
    };

    // Sticky header effect
    const handleHeaderScroll = () => {
        const header = document.querySelector('header');
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    // Active nav link highlighting
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current) && current !== '') {
                    link.classList.add('active');
                }
            });
        });
    };

    // SECTION 2: FORM HANDLING
    const handleFormSubmission = () => {
        const contactForm = document.querySelector('form[action="/contact"]');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Form will submit normally to server
                // Show optional loading feedback
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                    
                    // Re-enable after form submission
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }
            });
        }
    };

    // SECTION 3: PROJECT FILTERING (if applicable)
    const handleProjectFiltering = () => {
        const categoryFilter = document.querySelector('#categoryFilter');
        const statusFilter = document.querySelector('#statusFilter');

        if (categoryFilter || statusFilter) {
            const updateFilters = () => {
                const category = categoryFilter ? categoryFilter.value : '';
                const status = statusFilter ? statusFilter.value : '';
                
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (status) params.append('status', status);
                
                const queryString = params.toString();
                const newUrl = queryString ? `?${queryString}` : window.location.pathname;
                window.location.href = newUrl;
            };

            if (categoryFilter) {
                categoryFilter.addEventListener('change', updateFilters);
            }
            if (statusFilter) {
                statusFilter.addEventListener('change', updateFilters);
            }
        }
    };

    // SECTION 4: PROJECT SEARCH (if applicable)
    const handleProjectSearch = () => {
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const projectCards = document.querySelectorAll('.portfolio-card');
                
                projectCards.forEach(card => {
                    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    };

    // SECTION 5: ADD ANIMATION KEYFRAMES
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .fade-in {
                animation: fadeIn 0.5s ease-in forwards;
            }

            .slide-in-up {
                animation: slideInUp 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    };

    // SECTION 6: OBSERVED ANIMATIONS (for cards when they come into view)
    const initIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.portfolio-card, .experience-card, .education-card').forEach(card => {
            observer.observe(card);
        });
    };

    // SECTION 7: COPY TO CLIPBOARD HELPER
    const handleCopyToClipboard = () => {
        const copyButtons = document.querySelectorAll('[data-copy]');
        copyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const textToCopy = this.getAttribute('data-copy');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            });
        });
    };

    // SECTION 8: TOOLTIPS (Bootstrap)
    const initBootstrapTooltips = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    };

    // SECTION 9: INITIALIZATION
    const init = () => {
        smoothScroll();
        handleHeaderScroll();
        updateActiveNavLink();
        handleFormSubmission();
        handleProjectFiltering();
        handleProjectSearch();
        addAnimationStyles();
        initIntersectionObserver();
        handleCopyToClipboard();
        initBootstrapTooltips();
    };

    // Initialize when DOM is ready
    init();
});

// SECTION 10: UTILITY FUNCTIONS
window.Fiastara = {
    // Format date helper
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    },

    // Calculate time difference
    calculateDuration: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 30) {
            return `${diffDays} days`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months > 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(diffDays / 365);
            const remainingMonths = Math.floor((diffDays % 365) / 30);
            return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
        }
    },

    // Scroll to element
    scrollTo: function(elementId) {
        const element = document.querySelector(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    // Toggle element visibility
    toggleElement: function(elementId) {
        const element = document.querySelector(elementId);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    }
};
