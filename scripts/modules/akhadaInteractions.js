function getDocument(candidate) {
    if (candidate) return candidate;
    if (typeof document !== 'undefined') return document;
    return undefined;
}

function getWindow(candidate) {
    if (candidate) return candidate;
    if (typeof window !== 'undefined') return window;
    return undefined;
}

export function initAkhadaInteractions(context = {}) {
    const doc = getDocument(context.document);
    const win = getWindow(context.window);
    if (!doc || !win) return;

    const notify = context.notify || ((message) => {
        if (typeof win.alert === 'function') {
            win.alert(message);
        } else {
            console.info(message);
        }
    });

    const trainingButtons = doc.querySelectorAll('.glass-card button');
    trainingButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.glass-card');
            const title = card ? .querySelector('h3') ? .textContent || 'Training';
            notify(`Starting ${title}! This would navigate to the specific training module.`);
            button.style.transform = 'scale(0.95)';
            win.setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });

    doc.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetSelector = anchor.getAttribute('href');
            const target = targetSelector ? doc.querySelector(targetSelector) : null;
            if (!target) return;

            event.preventDefault();
            if (typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (typeof win.scrollTo === 'function') {
                const top = target.getBoundingClientRect().top + win.scrollY;
                win.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            }
        });
    });
}