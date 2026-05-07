// --- DISCRETE SLIDE-BASED NAVIGATION ---
// One gesture = one slide. Speed/length of scroll doesn't matter — direction does.

document.body.style.overflow = 'hidden';
document.body.style.height = '100vh';

const features = gsap.utils.toArray('.feature-item');
const heroEl = document.querySelector('.hero-wrapper');
const slides = [heroEl, ...features];

let currentIndex = 0;
let isAnimating = false;
let acceptingInput = true;

const waitlistAction = document.querySelector('.bottom-right-action');

// Initial state: hero visible, features hidden
gsap.set(heroEl, { autoAlpha: 1, scale: 1, force3D: true });
features.forEach((feat) => {
    gsap.set(feat, { autoAlpha: 0, scale: 0.94, force3D: true });
});

function goToSlide(targetIndex) {
    if (isAnimating) return;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    if (targetIndex === currentIndex) return;

    isAnimating = true;
    acceptingInput = false;
    const direction = targetIndex > currentIndex ? 1 : -1;
    const current = slides[currentIndex];
    const next = slides[targetIndex];

    gsap.set(next, { autoAlpha: 0, scale: direction > 0 ? 0.94 : 1.06 });

    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            rearmInput();
        }
    });

    tl.to(current, {
        autoAlpha: 0,
        scale: direction > 0 ? 1.06 : 0.94,
        duration: 0.55,
        ease: "power2.inOut",
        force3D: true,
    }, 0);

    tl.to(next, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        force3D: true,
    }, 0.35);

    currentIndex = targetIndex;

    // Toggle waitlist button visibility
    if (waitlistAction) {
        if (currentIndex === 0) {
            waitlistAction.style.opacity = '1';
            waitlistAction.style.visibility = 'visible';
        } else {
            waitlistAction.style.opacity = '0';
            waitlistAction.style.visibility = 'hidden';
        }
    }
}

// After animation completes, wait until wheel/trackpad goes IDLE before
// accepting the next gesture. This naturally absorbs trackpad inertia
// without filtering out the user's first real event.
let lastWheelTs = -Infinity;
function rearmInput() {
    const startedAt = performance.now();
    const tick = () => {
        const now = performance.now();
        const idleFor = now - lastWheelTs;
        // Re-enable when 120ms of trackpad silence, or after 1.5s safety cap.
        if (idleFor > 120 || now - startedAt > 1500) {
            acceptingInput = true;
        } else {
            setTimeout(tick, 30);
        }
    };
    tick();
}

// --- INPUT: WHEEL / TRACKPAD ---
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    lastWheelTs = performance.now();          // record EVERY event for idle-detection only

    if (!acceptingInput) return;
    if (isAnimating) return;
    if (e.deltaY === 0) return;               // pure horizontal scroll, ignore

    if (e.deltaY > 0) goToSlide(currentIndex + 1);
    else goToSlide(currentIndex - 1);
}, { passive: false });

// --- INPUT: TOUCH (mobile) ---
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    if (!acceptingInput || isAnimating) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 50) return;
    
    if (dy > 0) goToSlide(currentIndex + 1);
    else goToSlide(currentIndex - 1);
}, { passive: true });

// --- INPUT: KEYBOARD ---
window.addEventListener('keydown', (e) => {
    if (isAnimating) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1);
    }
});

// --- INPUT: NAV LINKS ---
const navLinks = document.querySelectorAll('.nav-center a[data-slide-index]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(link.getAttribute('data-slide-index'), 10);
        goToSlide(targetIndex);
    });
});
