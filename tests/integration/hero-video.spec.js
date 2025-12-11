import {
    initHeroVideoController
} from '../../scripts/modules/heroVideo.js';

describe('hero video controller', () => {
    beforeEach(() => {
        document.body.innerHTML = `<video data-hero-video></video>`;
    });

    it('pauses autoplay when reduced motion is enabled', () => {
        const video = document.querySelector('video');
        video.play = vi.fn().mockResolvedValue();
        video.pause = vi.fn();

        const mediaQuery = {
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };

        initHeroVideoController({
            document,
            window,
            mediaQuery
        });

        expect(video.pause).toHaveBeenCalled();
        expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('attempts playback when animations are allowed', () => {
        const video = document.querySelector('video');
        video.play = vi.fn().mockResolvedValue();
        video.pause = vi.fn();

        const mediaQuery = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };

        initHeroVideoController({
            document,
            window,
            mediaQuery
        });

        expect(video.play).toHaveBeenCalled();
    });

    it('registers DOMContentLoaded handler when document is loading', () => {
        const video = {
            play: vi.fn().mockResolvedValue(),
            pause: vi.fn(),
            removeAttribute: vi.fn()
        };
        const docMock = {
            readyState: 'loading',
            addEventListener: vi.fn(),
            querySelector: () => video
        };
        const mediaQuery = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };

        initHeroVideoController({
            document: docMock,
            window,
            mediaQuery
        });

        expect(docMock.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function), {
            once: true
        });
    });

    it('detaches listeners when cleanup is invoked', () => {
        const video = document.querySelector('video');
        video.play = vi.fn().mockResolvedValue();
        video.pause = vi.fn();

        const mediaQuery = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };

        const controller = initHeroVideoController({
            document,
            window,
            mediaQuery
        });
        controller.cleanup();

        expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('returns noop handlers when required nodes are missing', () => {
        document.body.innerHTML = '';
        const controller = initHeroVideoController({
            document,
            window
        });
        expect(typeof controller.updatePlayback).toBe('function');
        expect(typeof controller.cleanup).toBe('function');
        controller.cleanup();
    });

    it('supports legacy media query listeners', () => {
        const video = document.querySelector('video');
        video.play = vi.fn().mockResolvedValue();
        video.pause = vi.fn();

        const mediaQuery = {
            matches: true,
            addListener: vi.fn(),
            removeListener: vi.fn()
        };

        const controller = initHeroVideoController({
            document,
            window,
            mediaQuery
        });
        expect(mediaQuery.addListener).toHaveBeenCalledWith(expect.any(Function));
        controller.cleanup();
        expect(mediaQuery.removeListener).toHaveBeenCalledWith(expect.any(Function));
    });

    it('returns noop when reduced motion query is unavailable', () => {
        const video = document.querySelector('video');
        video.play = vi.fn().mockResolvedValue();
        video.pause = vi.fn();
        const controller = initHeroVideoController({
            document,
            window: {
                matchMedia: undefined
            }
        });
        expect(controller.updatePlayback).toBeDefined();
    });
});