// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Update Year
document.getElementById('year').textContent = new Date().getFullYear();

// Audio setup
const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.2;

const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Audio play failed:', e));
};

// Add sound to click events only
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', playClickSound);
});

// Mobile Menu Logic
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
const navLinks = document.querySelector('.nav-links');

const openMenu = () => {
    navLinks.classList.add('active');
    gsap.fromTo('.nav-link', 
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.2}
    );
};

const closeMenu = () => {
    navLinks.classList.remove('active');
};

mobileMenuBtn.addEventListener('click', openMenu);
if(mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Form Submission Handler (Prevent 405 Error on Localhost)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Check if running on localhost or local network
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.')) {
            e.preventDefault();
            // Simulate success
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1000);
        }
    });
}

// ANIMATIONS

// Initial Load Animations
const tl = gsap.timeline();

tl.from('header', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
})
.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.5")
.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.6")
.from('.hero-desc', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from('.hero-btns .btn', {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.4")
.from('.scroll-indicator', {
    opacity: 0,
    duration: 1
}, "-=0.2");

// Scroll Animations

// Section Titles
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// About Section
gsap.from('.about-img-wrapper', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 70%"
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 70%"
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Projects Stagger
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects',
        start: "top 75%"
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

// Skills Stagger
// Skills Stagger (Robust Fix)
gsap.fromTo('.skill-card', 
    { opacity: 0, y: 50 }, // Start state
    {
        scrollTrigger: {
            trigger: '.skills',
            start: "top 85%", // Trigger when top of skills section hits 85% of viewport height
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
    }
);

// Contact Form
gsap.from('.contact-container', {
    scrollTrigger: {
        trigger: '.contact',
        start: "top 75%"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Canvas Background (Optional - Star field or particles)
// We can add a simple particle effect here later if requested
