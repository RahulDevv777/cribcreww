// Initialize Lucide Icons
lucide.createIcons();

// --- 1. SUPER SMOOTH SCROLLING WITH LENIS ---
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. GSAP INTEGRATION ---
gsap.registerPlugin(ScrollTrigger);

// --- 3. NAVBAR REVEAL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- 4. HERO ANIMATIONS ---
// Initial Load Animations
const heroTl = gsap.timeline();

heroTl.fromTo(".gsap-hero-text", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
);

heroTl.fromTo(".gsap-hero-mockup",
    { y: 100, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
    "-=0.8"
);

// Parallax Orbs
gsap.to(".orb-1", {
    y: "-20vh", x: "10vw",
    scrollTrigger: { trigger: ".hero-container", scrub: 1, start: "top top", end: "bottom top" }
});
gsap.to(".orb-2", {
    y: "15vh", x: "-10vw",
    scrollTrigger: { trigger: ".hero-container", scrub: 1, start: "top top", end: "bottom top" }
});

// Mockup scale up on scroll
gsap.to(".gsap-hero-mockup", {
    scale: 1.05,
    y: "-50px",
    scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// --- 5. TEXT REVEALS ---
gsap.utils.toArray('.gsap-up').forEach(elem => {
    gsap.fromTo(elem, 
        { y: 40, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", 
                toggleActions: "play none none reverse"
            }
        }
    );
});

// --- 6. BENTO GRID ---
gsap.utils.toArray('.gsap-bento').forEach((box, i) => {
    gsap.fromTo(box, 
        { y: 60, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
                trigger: box,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Animate Feed Items Inside Bento
gsap.utils.toArray('.glass-feed-item').forEach((item, i) => {
    gsap.fromTo(item,
        { x: (i % 2 === 0) ? -30 : 30, opacity: 0 },
        {
            x: 0, opacity: 1, duration: 1, delay: 0.3 + (i * 0.2), ease: "power3.out",
            scrollTrigger: { trigger: ".feed-card", start: "top 80%" }
        }
    );
});

// Animate Chat Pills Inside Bento
gsap.utils.toArray('.chat-pill').forEach((pill, i) => {
    gsap.fromTo(pill,
        { scale: 0.8, opacity: 0, y: 20 },
        {
            scale: 1, opacity: 1, y: 0, duration: 0.6, delay: 0.3 + (i * 0.2), ease: "back.out(1.5)",
            scrollTrigger: { trigger: ".chat-card", start: "top 80%" }
        }
    );
});
