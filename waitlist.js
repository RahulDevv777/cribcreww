// Waitlist form: client-side validation + animated success state.
// Backend integration configured below — replace with your Supabase/project endpoint.

const CONFIG = {
    // SUPABASE: replace with your project URL and anon key
    // supabaseUrl: 'https://your-project.supabase.co',
    // supabaseKey: 'your-anon-key',

    // OR USE A CUSTOM ENDPOINT:
    endpoint: '/api/waitlist', // relative URL, or full URL like 'https://api.example.com/waitlist'
    method: 'POST',
};

const form = document.getElementById('wl-form');
const successPanel = document.getElementById('wl-success');
const submitBtn = form.querySelector('.wl-submit');
const submitText = form.querySelector('.wl-submit-text');

const fields = {
    name:  document.getElementById('wl-name'),
    email: document.getElementById('wl-email'),
    city:  document.getElementById('wl-city'),
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function markInvalid(field) {
    field.parentElement.classList.add('invalid');
    field.addEventListener('input', () => {
        field.parentElement.classList.remove('invalid');
    }, { once: true });
}

function validate(values) {
    let firstInvalid = null;
    if (values.name.length < 2)        { markInvalid(fields.name);  firstInvalid ||= fields.name; }
    if (!emailRe.test(values.email))   { markInvalid(fields.email); firstInvalid ||= fields.email; }
    if (values.city.length < 2)        { markInvalid(fields.city);  firstInvalid ||= fields.city; }
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
}

async function submitToBackend(payload) {
    const { supabaseUrl, supabaseKey, endpoint, method } = CONFIG;

    // Option 1: Supabase
    if (supabaseUrl && supabaseKey) {
        const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=minimal',
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
                city: payload.city,
                created_at: new Date().toISOString(),
            }),
        });
        if (!res.ok) throw new Error('Supabase error');
        return { ok: true };
    }

    // Option 2: Custom endpoint
    if (endpoint) {
        const res = await fetch(endpoint, {
            method: method || 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');
        return { ok: true };
    }

    // Fallback: localStorage (for demo/testing before Supabase)
    const STORAGE_KEY = 'cribcreww_waitlist';
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push({ ...payload, created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log('📝 Waitlist submission:', payload);
    return { ok: true };
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const values = {
        name:  fields.name.value.trim(),
        email: fields.email.value.trim(),
        city:  fields.city.value.trim(),
    };

    if (!validate(values)) return;

    submitBtn.classList.add('is-loading');
    submitText.textContent = 'Reserving…';

    try {
        const res = await submitToBackend(values);
        if (!res.ok) throw new Error('submit failed');

        form.style.display = 'none';
        successPanel.classList.add('is-visible');
        successPanel.setAttribute('aria-hidden', 'false');
    } catch (err) {
        submitBtn.classList.remove('is-loading');
        submitText.textContent = 'Try again';
    }
});

// Pause marquees on hover for readability
document.querySelectorAll('.marquee').forEach((m) => {
    const track = m.querySelector('.marquee-track');
    if (!track) return;
    m.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    m.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
});
