import {
    computeMacroPlan,
    initNutritionCalculator
} from '../../scripts/modules/nutritionCalculator.js';

describe('nutrition calculator', () => {
    function buildForm() {
        document.body.innerHTML = `
            <input id="age" value="30" />
            <select id="gender"><option value="male" selected>male</option></select>
            <input id="weight" value="70" />
            <input id="height" value="175" />
            <select id="activity"><option value="1.55" selected>1.55</option></select>
            <select id="goal"><option value="maintain" selected>maintain</option></select>
            <button data-nutrition-calc></button>
            <div id="calorieTarget"></div>
            <div id="proteinTarget"></div>
            <div id="carbTarget"></div>
            <div id="fatTarget"></div>
            <div id="doshaType"></div>
            <div id="doshaDescription"></div>
        `;
    }

    it('computes macro plan from data', () => {
        const plan = computeMacroPlan({
            age: 28,
            gender: 'female',
            weight: 60,
            height: 165,
            activity: 1.55,
            goal: 'gain'
        });
        expect(plan).toMatchObject({
            calories: expect.any(Number),
            protein: expect.any(Number),
            fats: expect.any(Number),
            carbs: expect.any(Number),
            dosha: expect.any(String)
        });
    });

    it('adjusts calories for fat loss goals', () => {
        const maintain = computeMacroPlan({
            age: 30,
            gender: 'male',
            weight: 80,
            height: 180,
            activity: 1.4,
            goal: 'maintain'
        });
        const fatLoss = computeMacroPlan({
            age: 30,
            gender: 'male',
            weight: 80,
            height: 180,
            activity: 1.4,
            goal: 'lose'
        });
        expect(fatLoss.calories).toBeLessThan(maintain.calories);
    });

    it('classifies dosha ranges for vata and kapha', () => {
        const vata = computeMacroPlan({
            age: 25,
            gender: 'female',
            weight: 45,
            height: 178,
            activity: 1.2,
            goal: 'maintain'
        });
        const kapha = computeMacroPlan({
            age: 40,
            gender: 'male',
            weight: 110,
            height: 170,
            activity: 1.2,
            goal: 'gain'
        });
        expect(vata.dosha).toBe('Vata');
        expect(kapha.dosha).toBe('Kapha');
    });

    it('renders macro plan when initialized', () => {
        buildForm();
        const button = document.querySelector('[data-nutrition-calc]');

        initNutritionCalculator({
            document
        });
        button.click();

        expect(document.getElementById('calorieTarget').textContent).toMatch(/kcal$/);
        expect(document.getElementById('doshaType').textContent).toMatch(/Warrior$/);
    });
});