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

export class AICoachDemo {
    constructor(context = {}) {
        this.document = getDocument(context.document);
        this.window = getWindow(context.window);
        if (!this.document || !this.window) {
            throw new Error('AICoachDemo requires a document and window');
        }

        this.isCoaching = false;
        this.sessionTime = 0;
        this.repCount = 0;
        this.calorieCount = 0;
        this.sessionInterval = null;
        this.currentExercise = 'squats';
        this.now = context.now || (() => new Date());

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFeedbackMessages();
    }

    setupEventListeners() {
        const startBtn = this.document.getElementById('startCoaching');
        const stopBtn = this.document.getElementById('stopCoaching');
        const exerciseSelect = this.document.getElementById('exerciseSelect');

        startBtn ? .addEventListener('click', () => this.startCoaching());
        stopBtn ? .addEventListener('click', () => this.stopCoaching());
        exerciseSelect ? .addEventListener('change', (event) => {
            this.currentExercise = event.target.value;
            this.updateFeedback(`Exercise changed to ${event.target.value}`);
        });
    }

    startCoaching() {
        if (this.isCoaching) return;
        this.isCoaching = true;
        this.resetSession();
        this.updateControls(true);
        this.sessionInterval = this.window.setInterval(() => {
            this.sessionTime++;
            this.updateSessionDisplay();
            this.simulateCoaching();
        }, 1000);
        this.updateFeedback('AI Coaching session started! Get ready to train!');
        this.updateFeedback('Stand in front of the camera and begin your exercise.');
    }

    stopCoaching() {
        if (!this.isCoaching) return;
        this.isCoaching = false;
        if (this.sessionInterval) {
            this.window.clearInterval(this.sessionInterval);
            this.sessionInterval = null;
        }
        this.updateControls(false);
        this.updateFeedback(`Session completed! Great work! Total reps: ${this.repCount}`);
    }

    updateControls(isActive) {
        const toggle = (id, disabled) => {
            const element = this.document.getElementById(id);
            if (element) element.disabled = disabled;
        };
        toggle('startCoaching', isActive);
        toggle('stopCoaching', !isActive);
        toggle('toggleCamera', !isActive);
        toggle('captureScreenshot', !isActive);
    }

    resetSession() {
        this.sessionTime = 0;
        this.repCount = 0;
        this.calorieCount = 0;
        this.updateSessionDisplay();
        const feedbackPanel = this.document.getElementById('feedbackPanel');
        if (feedbackPanel) {
            feedbackPanel.innerHTML = '<div class="text-gray-400 text-sm"><span class="text-neon">◉</span> Session starting...</div>';
        }
    }

    simulateCoaching() {
        if (!this.isCoaching) return;
        if (Math.random() < 0.1) {
            this.repCount++;
            this.calorieCount += Math.floor(Math.random() * 3) + 2;
            const formScore = Math.floor(Math.random() * 20) + 80;
            const formScoreNode = this.document.getElementById('formScore');
            if (formScoreNode) {
                formScoreNode.textContent = `${formScore}%`;
            }
            this.updateFeedback(`Rep ${this.repCount} completed! Form score: ${formScore}%`);
            if (Math.random() < 0.3) {
                this.window.setTimeout(() => {
                    const feedbackMessages = [
                        'Great form! Keep it up!',
                        'Lower your squat a bit more for better depth',
                        'Perfect alignment! Excellent technique',
                        'Keep your core engaged throughout the movement',
                        'Nice tempo! Control the descent',
                        'Excellent! Your form is improving'
                    ];
                    const message = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
                    this.updateFeedback(message);
                }, 1500);
            }
        }

        if (this.sessionTime > 0 && this.sessionTime % 30 === 0) {
            const encouragements = [
                'Keep pushing! You\'re doing great!',
                'Focus on your breathing',
                'Maintain that warrior spirit!',
                'Your strength is showing!',
                'Ancient power flows through you!'
            ];
            const message = encouragements[Math.floor(Math.random() * encouragements.length)];
            this.updateFeedback(message);
        }
    }

    updateSessionDisplay() {
        const minutes = Math.floor(this.sessionTime / 60);
        const seconds = this.sessionTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const timeNode = this.document.getElementById('sessionTime');
        const repNode = this.document.getElementById('repCount');
        const calorieNode = this.document.getElementById('calorieCount');

        if (timeNode) timeNode.textContent = timeString;
        if (repNode) repNode.textContent = this.repCount;
        if (calorieNode) calorieNode.textContent = this.calorieCount;
    }

    updateFeedback(message) {
        const feedbackPanel = this.document.getElementById('feedbackPanel');
        if (!feedbackPanel) return;

        const timestamp = this.now().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const feedbackItem = this.document.createElement('div');
        feedbackItem.className = 'text-sm mb-2 fade-in-up';
        feedbackItem.innerHTML = `
            <span class="text-gray-500 text-xs">${timestamp}</span>
            <div class="text-gray-200">${message}</div>
        `;

        feedbackPanel.insertBefore(feedbackItem, feedbackPanel.firstChild);
        while (feedbackPanel.children.length > 10) {
            feedbackPanel.removeChild(feedbackPanel.lastChild);
        }
    }

    setupFeedbackMessages() {
        const welcomeMessages = [
            'Welcome to NavaFit AI Coach!',
            'This is a demo mode showing AI coaching capabilities',
            'Real implementation uses TensorFlow.js for pose detection',
            'Click "Start Coaching Session" to begin training'
        ];
        welcomeMessages.forEach((message, index) => {
            this.window.setTimeout(() => this.updateFeedback(message), index * 1000);
        });
    }
}

export function initAICoachDemo(context = {}) {
    const doc = getDocument(context.document);
    if (!doc) return null;

    const start = () => new AICoachDemo(context);
    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', start, {
            once: true
        });
        return null;
    }
    return start();
}