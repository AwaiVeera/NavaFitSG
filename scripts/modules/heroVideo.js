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

function getMediaQuery(win, query) {
    if (win ? .matchMedia) {
        return win.matchMedia(query);
    }
    return undefined;
}

export function initHeroVideoController(context = {}) {
    const doc = getDocument(context.document);
    const win = getWindow(context.window);
    const video = doc ? .querySelector ? .('[data-hero-video]');
    const reduceMotion = context.mediaQuery || getMediaQuery(win, '(prefers-reduced-motion: reduce)');

    if (!doc || !win || !video || !reduceMotion) {
        return {
            updatePlayback: () => {},
            cleanup: () => {}
        };
    }

    const updatePlayback = () => {
        if (reduceMotion.matches) {
            if (typeof video.pause === 'function') {
                video.pause();
            }
            video.removeAttribute ? .('autoplay');
        } else if (typeof video.play === 'function') {
            video.play().catch(() => {});
        }
    };

    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', updatePlayback, {
            once: true
        });
    } else {
        updatePlayback();
    }

    const listener = () => updatePlayback();
    if (typeof reduceMotion.addEventListener === 'function') {
        reduceMotion.addEventListener('change', listener);
    } else if (typeof reduceMotion.addListener === 'function') {
        reduceMotion.addListener(listener);
    }

    return {
        updatePlayback,
        cleanup: () => {
            if (typeof reduceMotion.removeEventListener === 'function') {
                reduceMotion.removeEventListener('change', listener);
            } else if (typeof reduceMotion.removeListener === 'function') {
                reduceMotion.removeListener(listener);
            }
        }
    };
}