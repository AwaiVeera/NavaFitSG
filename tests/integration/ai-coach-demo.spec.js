import { AICoachDemo, initAICoachDemo } from '../../scripts/modules/aiCoachDemo.js';

function buildCoachDom() {
    document.body.innerHTML = `
        <button id="startCoaching"></button>
        <button id="stopCoaching" disabled></button>
        <button id="toggleCamera" disabled></button>
        <button id="captureScreenshot" disabled></button>
        <select id="exerciseSelect">
            <option value="squats" selected>Squats</option>
            <option value="lunges">Lunges</option>
        </select>
        <div id="sessionTime"></div>
        <div id="repCount"></div>
        <div id="calorieCount"></div>
        <div id="formScore"></div>
        <div id="feedbackPanel"></div>
    `;
}

describe('AI coach demo interactions', () => {
    beforeEach(() => {
        buildCoachDom();
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockReturnValue(0.05);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        document.body.innerHTML = '';
    });

    it('starts and stops a coaching session with UI feedback', () => {
        const demo = new AICoachDemo({
            document,
            window,
            now: () => new Date('2025-01-01T00:00:00Z')
        });

        document.getElementById('startCoaching').click();
        vi.advanceTimersByTime(2000);

        expect(document.getElementById('sessionTime').textContent).toBe('00:02');
        expect(Number(document.getElementById('repCount').textContent)).toBeGreaterThanOrEqual(1);
        expect(document.getElementById('startCoaching').disabled).toBe(true);
        expect(document.getElementById('stopCoaching').disabled).toBe(false);

        demo.stopCoaching();
        expect(document.getElementById('stopCoaching').disabled).toBe(true);

        vi.advanceTimersByTime(2000);
        expect(document.getElementById('feedbackPanel').children.length).toBeGreaterThan(0);
    });

    it('handles exercise changes and queued feedback messages', () => {
        const demo = new AICoachDemo({
            document,
            window,
            now: () => new Date('2025-01-01T00:00:00Z')
        });

        const select = document.getElementById('exerciseSelect');
        select.value = 'lunges';
        select.dispatchEvent(new Event('change'));

        vi.advanceTimersByTime(5000);

        const panelText = document.getElementById('feedbackPanel').textContent;
        expect(panelText).toMatch(/Exercise changed to lunges/);
        expect(document.getElementById('feedbackPanel').children.length).toBeGreaterThanOrEqual(4);

        demo.stopCoaching();
    });

    it('defers initialization until DOM is ready', () => {
        const docMock = {
            readyState: 'loading',
            addEventListener: vi.fn()
        };
        const result = initAICoachDemo({ document: docMock, window });
        expect(result).toBeNull();
        expect(docMock.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function), { once: true });
    });

    it('ignores duplicate start invocations and emits encouragements', () => {
        const demo = new AICoachDemo({
            document,
            window,
            now: () => new Date('2025-01-01T00:00:00Z')
        });

        demo.startCoaching();
        const existingInterval = demo.sessionInterval;
        demo.startCoaching();
        expect(demo.sessionInterval).toBe(existingInterval);

        demo.sessionTime = 30;
        demo.isCoaching = true;
        Math.random.mockReturnValue(0.9);
        const initialFeedbackCount = document.getElementById('feedbackPanel').children.length;
        demo.simulateCoaching();
        expect(document.getElementById('feedbackPanel').children.length).toBeGreaterThanOrEqual(initialFeedbackCount);

        demo.stopCoaching();
    });

    it('safely stops when no session is active', () => {
        const demo = new AICoachDemo({
            document,
            window,
            now: () => new Date('2025-01-01T00:00:00Z')
        });
        demo.stopCoaching();
        expect(document.getElementById('stopCoaching').disabled).toBe(true);
    });
});

