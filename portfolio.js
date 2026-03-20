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

// --- Scroll Progress ---
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// --- Canvas Fluid Aurora Background ---
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener('mousemove', (e) => {
        // Track mouse position to influence the fluid curves smoothly
        mouse.x += (e.clientX - mouse.x) * 0.1;
        mouse.y += (e.clientY - mouse.y) * 0.1;
    });

    function drawWave() {
        requestAnimationFrame(drawWave);
        
        // Dark trail fade effect for aurora
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');   // Indigo
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)'); // Purple
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.4)');   // Pink
        ctx.strokeStyle = gradient;

        const maxLines = 4;
        for (let i = 0; i < maxLines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1.5;

            for (let x = 0; x < width; x += 10) {
                // Organic combination of sine waves
                const mouseInfluenceX = (mouse.x - width/2) * 0.001 * x;
                const mouseInfluenceY = (mouse.y - height/2) * 0.1;

                const y = Math.sin((x * 0.003) + time + i) * 60 
                        + Math.sin((x * 0.001) - time * 0.5) * 120 
                        + Math.cos((x * 0.005) + time * 0.2 + mouseInfluenceX) * 40
                        + Math.sin(x * 0.002) * mouseInfluenceY;
                
                if (x === 0) {
                    ctx.moveTo(x, centerY + y + (i * 20 - (maxLines*10)));
                } else {
                    ctx.lineTo(x, centerY + y + (i * 20 - (maxLines*10)));
                }
            }
            ctx.stroke();
        }
        time += 0.015;
    }
    
    drawWave();
}

// --- Typing Effect ---
if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
        strings: ['Web Developer', 'Frontend Specialist', 'UI/UX Enthusiast', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}


// --- Skills Filtering ---
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    gsap.fromTo(card, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" });
                } else {
                    card.style.display = 'none';
                }
            });
            ScrollTrigger.refresh();
        });
    });
}

// ANIMATIONS

// Initial Load Animations
const tl = gsap.timeline();

tl.from('header', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    clearProps: "all"
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
