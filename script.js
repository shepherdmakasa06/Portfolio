// Typewriter effect
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const current = this.isDeleting ? 
            this.text.substring(0, this.index - 1) : 
            this.text.substring(0, this.index + 1);

        this.element.textContent = current;
        this.element.classList.add('typewriter-cursor');

        let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && current === this.text) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && current === '') {
            this.isDeleting = false;
            typeSpeed = 500; // Pause before retyping
        }

        this.index = this.isDeleting ? this.index - 1 : this.index + 1;

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        new TypeWriter(typewriterElement, 'Full Stack Developer', 100);
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting - updates active class based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Initialize EmailJS
    (function() {
        emailjs.init("Urt5qyHkjdNQW74cx");
    })();

    // Form submission handler with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Send email using EmailJS
            emailjs.sendForm('service_4kheuje', 'template_bcfcnnl', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    const submitButton = contactForm.querySelector('.form-submit');
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.backgroundColor = '#10b981';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.backgroundColor = '';
                    }, 3000);
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    const submitButton = contactForm.querySelector('.form-submit');
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Failed to Send';
                    submitButton.style.backgroundColor = '#ef4444';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }

    // Add animation classes to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form submission handler
    const contactForm2 = document.getElementById('contactForm');
    if (contactForm2) {
        contactForm2.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to EmailJS or a backend
            console.log('Form submitted with data:', data);
            
            // Show success message
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#10b981';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Download CV functionality
   // Download CV functionality
    function downloadCV() {
        const cvPath = 'assets/Shepherd_Makasa_CV.pdf'; // Update with your actual file name
        
        // Check if file exists (optional but recommended)
        fetch(cvPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    const link = document.createElement('a');
                    link.href = cvPath;
                    link.download = 'Shepherd_Makasa_CV.pdf';
                    link.click();
                } else {
                    alert('CV file not found. Please contact me directly.');
                    console.error('CV file not found at:', cvPath);
                }
            })
            .catch(error => {
                console.error('Error accessing CV:', error);
                alert('Unable to download CV. Please contact me directly.');
            });
    }
});