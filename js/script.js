// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Contact form handling
    initContactForm();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Mobile menu
    initMobileMenu();
    
    // Typing animation
    initTypingAnimation();
    
    // Parallax effects
    initParallaxEffects();
    
    // Initialize particles
    initParticles();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on load
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger animation for skill items and project cards
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillItems();
                } else if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards();
                } else if (entry.target.classList.contains('timeline')) {
                    animateTimelineItems();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .projects-grid, .timeline, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    addAnimationStyles();
}

// Add animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .section-title, .about-content, .skills-grid, .projects-grid, .timeline, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .section-title.animate, .about-content.animate, .skills-grid.animate, 
        .projects-grid.animate, .timeline.animate, .contact-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-item, .project-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease-out;
        }
        
        .skill-item.animate, .project-card.animate, .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Animate skill items with stagger
function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
}

// Animate project cards with stagger
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 150);
    });
}

// Animate timeline items with stagger
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            submitForm(formObject);
        });
    }
}

// Simulate form submission (replace with actual backend integration)
function submitForm(formData) {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        document.querySelector('.contact-form').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const texts = [
        'Full Stack Developer',
        'Frontend Specialist', 
        'Backend Engineer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Profile image parallax
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Particle system for hero section
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.style.position = 'relative';
    hero.appendChild(canvas);
    
    // Particle array
    const particles = [];
    const particleCount = 50;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particle constructor
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    Particle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.1;
    };
    
    Particle.prototype.draw = function() {
        ctx.fillStyle = `rgba(255, 69, 0, ${this.opacity})`;
        ctx.strokeStyle = `rgba(139, 0, 0, ${this.opacity})`;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Project Modal System
function initProjectModal() {
    console.log('Initializing project modal...');
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalThumbnails = document.getElementById('imageThumbnails');
    const modalDetails = document.getElementById('modalProjectDetails');
    const closeBtn = document.querySelector('.modal-close');
    const previewBtns = document.querySelectorAll('.preview-btn');
    
    console.log('Modal elements found:', {
        modal: modal ? 'Yes' : 'No',
        modalTitle: modalTitle ? 'Yes' : 'No',
        modalMainImage: modalMainImage ? 'Yes' : 'No',
        modalThumbnails: modalThumbnails ? 'Yes' : 'No',
        modalDetails: modalDetails ? 'Yes' : 'No',
        closeBtn: closeBtn ? 'Yes' : 'No',
        previewBtns: previewBtns.length
    });
    
    // Check if modal exists, if not, return early
    if (!modal) {
        console.error('Modal not found! Check if projectModal exists in HTML.');
        return;
    }
    
    if (previewBtns.length === 0) {
        console.error('No preview buttons found! Check if elements with class "preview-btn" exist.');
        return;
    }
    
    // Project data with multiple images and details
    const projectData = {
        'weather-app': {
            title: 'Weather Forecast App',
            images: [
                'assets/project3.jpg',
                'assets/weather-app-2.jpg',
                'assets/weather-app-3.jpg',
                'assets/weather-app-4.jpg'
            ],
            description: 'A beautiful weather app with location-based forecasts, interactive animations, and detailed weather information using external APIs.',
            features: [
                'Real-time weather data from OpenWeatherMap API',
                'Location-based weather detection using GPS',
                'Interactive weather animations and transitions',
                '7-day weather forecast with hourly details',
                'Beautiful gradient backgrounds based on weather conditions',
                'Offline mode with cached weather data',
                'Multiple city weather tracking',
                'Weather alerts and notifications'
            ]
        },
        'snake-game': {
            title: 'Snake Game',
            images: [
                'assets/project5.jpg',
                'assets/snake-game-2.jpg',
                'assets/snake-game-3.jpg'
            ],
            description: 'A classic snake game built with Flutter featuring smooth animations, score tracking, and increasing difficulty levels.',
            features: [
                'Classic snake gameplay with modern UI',
                'Smooth animations and responsive controls',
                'High score tracking and leaderboard',
                'Multiple difficulty levels',
                'Colorful food items and power-ups',
                'Game pause and resume functionality',
                'Sound effects and background music',
                'Progressive difficulty increase'
            ]
        },
        'ecommerce-app': {
            title: 'E-commerce Mobile App',
            images: [
                'assets/project1.jpg',
                'assets/ecommerce-app-2.jpg',
                'assets/ecommerce-app-3.jpg',
                'assets/ecommerce-app-4.jpg'
            ],
            description: 'A full-featured e-commerce mobile application built with Flutter. Includes payment integration, user authentication, and real-time product updates.',
            features: [
                'User registration and authentication',
                'Product catalog with categories and search',
                'Shopping cart and wishlist functionality',
                'Secure payment integration with Stripe',
                'Order tracking and history',
                'User profile and address management',
                'Push notifications for offers and updates',
                'Admin panel for product management'
            ]
        },
        'task-management': {
            title: 'Task Management App',
            images: [
                'assets/project2.jpg',
                'assets/task-app-2.jpg',
                'assets/task-app-3.jpg'
            ],
            description: 'A productivity mobile app with task organization, reminders, and team collaboration features.',
            features: [
                'Task creation with priority levels',
                'Due date reminders and notifications',
                'Category-based task organization',
                'Team collaboration and sharing',
                'Progress tracking with statistics',
                'Dark and light theme support',
                'Offline synchronization',
                'Calendar integration'
            ]
        },
        'shopping-website': {
            title: 'Online Shopping Website',
            images: [
                'assets/project-web-1.jpg',
                'assets/shopping-web-2.jpg',
                'assets/shopping-web-3.jpg'
            ],
            description: 'A modern e-commerce web application with product catalog, cart, authentication, and order management features.',
            features: [
                'Responsive web design for all devices',
                'Product catalog with advanced filtering',
                'User authentication with JWT tokens',
                'Shopping cart with real-time updates',
                'Payment processing with PayPal integration',
                'Admin dashboard for inventory management',
                'Order tracking and email notifications',
                'Customer reviews and ratings system'
            ]
        },
        'elearning-platform': {
            title: 'E-Learning Management Platform',
            images: [
                'assets/project-enterprise-1.jpg',
                'assets/elearning-2.jpg',
                'assets/elearning-3.jpg'
            ],
            description: 'A complete learning platform for students, instructors, and admins with course management, progress tracking, quizzes, and role-based authentication.',
            features: [
                'Multi-role user management (Students, Instructors, Admins)',
                'Course creation and management system',
                'Video lectures with streaming support',
                'Interactive quizzes and assessments',
                'Progress tracking and analytics',
                'Certificate generation upon completion',
                'Discussion forums for each course',
                'Assignment submission and grading system'
            ]
        },
        'project-management': {
            title: 'Project Management System',
            images: [
                'assets/project-enterprise-2.jpg',
                'assets/project-mgmt-2.jpg',
                'assets/project-mgmt-3.jpg'
            ],
            description: 'A team collaboration system with task assignment, sprint planning, project timelines, status tracking, and reporting dashboard.',
            features: [
                'Project creation and team assignment',
                'Sprint planning with Kanban boards',
                'Task assignment and dependency tracking',
                'Time tracking and reporting',
                'Gantt charts for project timelines',
                'Team collaboration with chat integration',
                'Document sharing and version control',
                'Performance analytics and dashboards'
            ]
        }
    };
    
    // Open modal function
    function openModal(projectId) {
        console.log('Opening modal for project:', projectId);
        
        const project = projectData[projectId];
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        console.log('Project data found:', project.title);
        
        // Set modal content
        modalTitle.textContent = project.title;
        modalMainImage.src = project.images[0];
        modalMainImage.alt = project.title;
        
        // Clear and populate thumbnails
        modalThumbnails.innerHTML = '';
        project.images.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${image}" alt="${project.title} ${index + 1}">`;
            thumb.addEventListener('click', () => {
                modalMainImage.src = image;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            modalThumbnails.appendChild(thumb);
        });
        
        // Set project details
        modalDetails.innerHTML = `
            <h4>Project Overview</h4>
            <p>${project.description}</p>
            <h4>Key Features</h4>
            <ul class="project-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        
        // Show modal
        console.log('Displaying modal...');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                console.log('Modal animation applied');
            }
        }, 10);
    }
    
    // Close modal function
    function closeModal() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Event listeners
    console.log('Adding event listeners to', previewBtns.length, 'preview buttons');
    
    previewBtns.forEach((btn, index) => {
        console.log(`Adding listener to button ${index + 1}:`, btn.getAttribute('data-project'));
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            console.log('Preview button clicked for project:', projectId);
            openModal(projectId);
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        console.log('Close button listener added');
    } else {
        console.error('Close button not found!');
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Initialize modal content styles
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.7)';
            modalContent.style.opacity = '0';
            modalContent.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            console.log('Modal content styles initialized');
        } else {
            console.error('Modal content not found inside modal!');
        }
    }
    
    console.log('Project modal initialization complete');
}

// Fallback: Direct event listener setup (runs after everything loads)
window.addEventListener('load', function() {
    console.log('Window loaded - setting up fallback modal listeners...');
    
    // Simple fallback modal functionality
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (!modal) {
        console.error('FALLBACK: Modal not found!');
        return;
    }
    
    // Simple project data (fallback)
    const simpleProjectData = {
        'weather-app': {
            title: 'Weather Forecast App',
            image: 'assets/project3.jpg',
            description: 'A beautiful weather app with location-based forecasts.'
        },
        'snake-game': {
            title: 'Snake Game', 
            image: 'assets/project5.jpg',
            description: 'A classic snake game with modern UI design.'
        },
        'ecommerce-app': {
            title: 'E-commerce Mobile App',
            image: 'assets/project1.jpg', 
            description: 'A full-featured e-commerce mobile application.'
        },
        'task-management': {
            title: 'Task Management App',
            image: 'assets/project2.jpg',
            description: 'A productivity mobile app with task organization.'
        },
        'shopping-website': {
            title: 'Online Shopping Website',
            image: 'assets/project-web-1.jpg',
            description: 'A modern e-commerce web application.'
        },
        'elearning-platform': {
            title: 'E-Learning Management Platform', 
            image: 'assets/project-enterprise-1.jpg',
            description: 'A complete learning platform for students and instructors.'
        },
        'project-management': {
            title: 'Project Management System',
            image: 'assets/project-enterprise-2.jpg', 
            description: 'A team collaboration system with task assignment.'
        }
    };
    
    // Add click listeners to all preview buttons
    const previewButtons = document.querySelectorAll('.preview-btn');
    console.log('FALLBACK: Found', previewButtons.length, 'preview buttons');
    
    previewButtons.forEach((btn, index) => {
        const projectId = btn.getAttribute('data-project');
        console.log(`FALLBACK: Adding listener ${index + 1}: ${projectId}`);
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('FALLBACK: Button clicked for:', projectId);
            
            const project = simpleProjectData[projectId];
            if (!project) {
                console.error('FALLBACK: Project not found:', projectId);
                return;
            }
            
            // Show simple modal
            const modalTitle = document.getElementById('modalProjectTitle');
            const modalImage = document.getElementById('modalMainImage');
            const modalDetails = document.getElementById('modalProjectDetails');
            const modalThumbnails = document.getElementById('imageThumbnails');
            
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalImage) {
                modalImage.src = project.image;
                modalImage.alt = project.title;
            }
            if (modalDetails) {
                modalDetails.innerHTML = `<h4>Project Overview</h4><p>${project.description}</p>`;
            }
            if (modalThumbnails) {
                modalThumbnails.innerHTML = `<div class="thumbnail active"><img src="${project.image}" alt="${project.title}"></div>`;
            }
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('FALLBACK: Modal should be visible now');
        });
    });
    
    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('FALLBACK: Modal closed');
        });
    }
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('FALLBACK: Modal closed by outside click');
        }
    });
    
    console.log('FALLBACK: Modal setup complete');
});

// Test function for debugging
function testModal() {
    console.log('Testing modal...');
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Modal should be visible now');
    } else {
        console.log('Modal not found!');
    }
        canvas.height = hero.offsetHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    function initParticleSystem() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Initialize and start
    resizeCanvas();
    initParticleSystem();
    animate();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);


// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll to top button
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function() {
    // Any heavy scroll calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add modern loading animation
function addLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-bg-animation"></div>
        <div class="loader-content">
            <div class="loader-logo">
                <span class="logo-text">Tarek<span class="logo-dot">.dev</span></span>
            </div>
            <div class="loader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loader-text">
                <span class="loading-word">Crafting</span>
                <span class="loading-word">Amazing</span>
                <span class="loading-word">Experiences</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a1a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: all 0.8s ease;
        overflow: hidden;
    `;
    
    // Add all styles for the modern loader
    const style = document.createElement('style');
    style.textContent = `
        .loader-bg-animation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #1a1a1a, #2d2d2d, #1a1a1a);
            background-size: 400% 400%;
            animation: gradientShift 4s ease-in-out infinite;
        }
        
        .loader-bg-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(139, 0, 0, 0.05) 0%, transparent 50%);
            animation: floating 6s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        @keyframes floating {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
        }
        
        .loader-content {
            text-align: center;
            color: #e5e5e5;
            position: relative;
            z-index: 2;
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loader-logo {
            margin-bottom: 3rem;
            animation: logoGlow 2s ease-in-out infinite alternate;
        }
        
        .logo-text {
            font-size: 3rem;
            font-weight: 700;
            color: #e5e5e5;
            font-family: 'Poppins', sans-serif;
        }
        
        .logo-dot {
            background: linear-gradient(135deg, #8B0000 0%, #FF4500 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        @keyframes logoGlow {
            from { transform: scale(1); filter: brightness(1); }
            to { transform: scale(1.02); filter: brightness(1.1); }
        }
        
        .loader-spinner {
            position: relative;
            width: 120px;
            height: 120px;
            margin: 0 auto 3rem;
        }
        
        .spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid transparent;
        }
        
        .spinner-ring:nth-child(1) {
            border-top: 3px solid #8B0000;
            border-right: 3px solid #8B0000;
            animation: spinRing 2s linear infinite;
        }
        
        .spinner-ring:nth-child(2) {
            border-bottom: 3px solid #FF4500;
            border-left: 3px solid #FF4500;
            animation: spinRing 2s linear infinite reverse;
            transform: scale(0.8);
        }
        
        .spinner-ring:nth-child(3) {
            border-top: 2px solid rgba(255, 69, 0, 0.5);
            animation: spinRing 3s linear infinite;
            transform: scale(0.6);
        }
        
        @keyframes spinRing {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-text {
            margin-bottom: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loading-word {
            font-size: 1.2rem;
            font-weight: 500;
            opacity: 0;
            animation: wordFade 4.5s ease-in-out infinite;
            position: absolute;
            transition: all 0.3s ease;
        }
        
        .loading-word:nth-child(1) { animation-delay: 0s; }
        .loading-word:nth-child(2) { animation-delay: 1.5s; }
        .loading-word:nth-child(3) { animation-delay: 3s; }
        
        @keyframes wordFade {
            0%, 77.78%, 100% { 
                opacity: 0; 
                transform: translateY(10px) scale(0.9); 
            }
            11.11%, 22.22% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }
        
        .progress-bar {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #8B0000 0%, #FF4500 100%);
            border-radius: 2px;
            width: 0%;
            animation: progressLoad 3s ease-in-out infinite;
            position: relative;
        }
        
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: progressShine 2s ease-in-out infinite;
        }
        
        @keyframes progressLoad {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
        
        @keyframes progressShine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .logo-text { font-size: 2rem; }
            .loader-spinner { width: 80px; height: 80px; }
            .loading-word { font-size: 1rem; }
            .progress-bar { width: 150px; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.transform = 'scale(0.95)';
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 800);
        }, 1500);
    });
}

// Initialize loading animation
addLoadingAnimation();
