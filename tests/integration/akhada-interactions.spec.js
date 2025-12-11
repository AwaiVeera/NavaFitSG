import { initAkhadaInteractions } from '../../scripts/modules/akhadaInteractions.js';

describe('akhada interactions', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        document.body.innerHTML = `
            <div class="glass-card">
                <h3>Warrior Flow</h3>
                <button type="button">Start</button>
            </div>
            <a href="#rituals">Jump</a>
            <section id="rituals"></section>
        `;
        document.getElementById('rituals').scrollIntoView = vi.fn();
        window.scrollTo = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
        document.body.innerHTML = '';
        vi.restoreAllMocks();
    });

    it('notifies when a training card button is pressed', () => {
        const notify = vi.fn();
        initAkhadaInteractions({ document, window, notify });

        const button = document.querySelector('.glass-card button');
        button.click();
        vi.runAllTimers();

        expect(notify).toHaveBeenCalledWith(
            'Starting Warrior Flow! This would navigate to the specific training module.'
        );
        expect(button.style.transform).toBe('');
    });

    it('defaults to window.alert when notify is not provided', () => {
        window.alert = vi.fn();
        initAkhadaInteractions({ document, window });

        document.querySelector('.glass-card button').click();
        vi.runAllTimers();

        expect(window.alert).toHaveBeenCalled();
    });

    it('smooth scrolls internal anchor links', () => {
        initAkhadaInteractions({ document, window });
        const anchor = document.querySelector('a');
        const scrollSpy = document.getElementById('rituals').scrollIntoView;

        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

        expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });

    it('falls back to window.scrollTo when scrollIntoView is unavailable', () => {
        const target = document.getElementById('rituals');
        target.scrollIntoView = undefined;
        target.getBoundingClientRect = () => ({ top: 120 });
        window.scrollY = 30;

        initAkhadaInteractions({ document, window });
        document.querySelector('a').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

        expect(window.scrollTo).toHaveBeenCalledWith({ top: 150, behavior: 'smooth' });
    });

    it('ignores anchors that do not resolve to a target', () => {
        document.querySelector('a').setAttribute('href', '#missing');
        initAkhadaInteractions({ document, window });
        document.querySelector('a').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        expect(window.scrollTo).not.toHaveBeenCalled();
    });
});

