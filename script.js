// --- 0. DYNAMIC BACKEND BOOTSTRAP (Invisible Logic) ---
(function() {
    // 1. Inject Modal HTML into Body
    const modalHTML = `
        <div id="waitlist-modal" class="modal-overlay">
            <div class="modal-content glass-panel">
                <button class="close-modal"><i data-lucide="x"></i></button>
                <div class="modal-header">
                    <div class="pill-badge">Early Access</div>
                    <h3>Feel the pulse of your city.</h3>
                    <p>Join the inner circle. We'll drop you an invite as soon as your neighborhood goes live.</p>
                </div>
                <form id="waitlist-form">
                    <div class="input-group">
                        <i data-lucide="mail" class="input-icon"></i>
                        <input type="email" id="waitlist-email" placeholder="Enter your email" required>
                    </div>
                    <button type="submit" class="btn-primary massive w-full text-center" id="submit-btn" style="width:100%">
                        <span class="btn-text">Reserve My Spot</span>
                        <div class="loader hidden"></div>
                    </button>
                </form>
                <div id="form-msg" class="msg-box hidden"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. Load Supabase SDK Dynamically
    const sbScript = document.createElement('script');
    sbScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    sbScript.onload = () => { initWaitlist(); };
    document.head.appendChild(sbScript);

    // 3. Initialize Waitlist Wiring
    function initWaitlist() {
        const modal = document.getElementById('waitlist-modal');
        const openBtns = document.querySelectorAll('.btn-get, .btn-primary, .btn-glow');
        const closeBtn = document.querySelector('.close-modal');
        const waitlistForm = document.getElementById('waitlist-form');
        const submitBtn = document.getElementById('submit-btn');
        const formMsg = document.getElementById('form-msg');

        const openModal = (e) => { e.preventDefault(); modal.classList.add('active'); document.body.style.overflow = 'hidden'; };
        const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };

        if (openBtns) openBtns.forEach(btn => btn.addEventListener('click', openModal));
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        if (waitlistForm) {
            const supabaseUrl = 'https://iwdkyeilyrpfijynhuvh.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZGt5ZWlseXJwZmlqeW5odXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2Mzg4NTksImV4cCI6MjA5MTIxNDg1OX0.KQ1W2q5DhwexVupSr04VWWcjDSz8pd2V5O2t6_M3OY8';
            const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

            waitlistForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('waitlist-email').value;
                submitBtn.disabled = true;
                try {
                    const { error } = await supabase.from('waitlist').insert([{ email }]);
                    if (error) {
                        if (error.code === '23505') alert('Already on the list! ⚡');
                        else throw error;
                    } else {
                        alert('Welcome to the pulse! 🚀');
                        closeModal();
                        waitlistForm.reset();
                    }
                } catch (err) {
                    alert('Error connecting to backend.');
                } finally {
                    submitBtn.disabled = false;
                }
            });
        }
    }
})();

// Initialize Lucide Icons
try { lucide.createIcons(); } catch(e) {}

// --- 1. SUPER SMOOTH SCROLLING WITH LENIS ---
const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. GSAP INTEGRATION ---
gsap.registerPlugin(ScrollTrigger);

// Navbar Reveal
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
});

// --- 3. FUNNEL HERO ANIMATIONS ---
gsap.fromTo(".gsap-hero-text", 
    { y: 60, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 1.4, stagger: 0.15, ease: "power4.out", delay: 0.2 }
);

gsap.fromTo(".gsap-hero-3d",
    { y: 150, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 1.8, ease: "power3.out", delay: 0.5 }
);

// --- 4. 3D INTERACTIVE HERO FLOAT EFFECT ---
const scene3D = document.getElementById('scene-3d');
if (scene3D && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        scene3D.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
}

// --- 5. STORY REVEALS ---
gsap.utils.toArray('.gsap-up').forEach(elem => {
    gsap.fromTo(elem, 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, ease: "power4.out", scrollTrigger: { trigger: elem, start: "top 85%", toggleActions: "play none none reverse" } }
    );
});

// --- 6. SOLUTION / BENTO GRID REVEALS ---
gsap.utils.toArray('.gsap-bento').forEach((box, i) => {
    gsap.fromTo(box, 
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: box, start: "top 85%", toggleActions: "play none none reverse" } }
    );
});
