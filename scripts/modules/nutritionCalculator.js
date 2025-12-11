function getDocument(candidate) {
    if (candidate) return candidate;
    if (typeof document !== 'undefined') return document;
    return undefined;
}

const selectorMap = {
    age: '#age',
    gender: '#gender',
    weight: '#weight',
    height: '#height',
    activity: '#activity',
    goal: '#goal',
    calorieTarget: '#calorieTarget',
    proteinTarget: '#proteinTarget',
    carbTarget: '#carbTarget',
    fatTarget: '#fatTarget',
    doshaType: '#doshaType',
    doshaDescription: '#doshaDescription'
};

export function readMacroInputs(doc = getDocument()) {
    if (!doc) return null;
    return {
        age: Number.parseInt(doc.querySelector(selectorMap.age) ? .value ? ? '0', 10) || 0,
        gender: doc.querySelector(selectorMap.gender) ? .value || 'male',
        weight: Number.parseFloat(doc.querySelector(selectorMap.weight) ? .value ? ? '0') || 0,
        height: Number.parseFloat(doc.querySelector(selectorMap.height) ? .value ? ? '0') || 0,
        activity: Number.parseFloat(doc.querySelector(selectorMap.activity) ? .value ? ? '1') || 1,
        goal: doc.querySelector(selectorMap.goal) ? .value || 'maintain'
    };
}

export function computeMacroPlan(inputs) {
    if (!inputs) return null;
    const {
        age,
        weight,
        height
    } = inputs;
    if (!age || !weight || !height) return null;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += inputs.gender === 'male' ? 5 : -161;

    let calories = bmr * inputs.activity;
    if (inputs.goal === 'lose') calories -= 500;
    if (inputs.goal === 'gain') calories += 300;

    const protein = Math.round((calories * 0.3) / 4);
    const fats = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

    const bmi = weight / ((height / 100) ** 2);
    let dosha = 'Pitta';
    let description = 'Strong metabolism with balanced nutrition needs.';
    if (bmi < 20) {
        dosha = 'Vata';
        description = 'Light build, grounding meals & warm spices.';
    } else if (bmi > 25) {
        dosha = 'Kapha';
        description = 'Earthy build, lighter plates and thermic spices.';
    }

    return {
        calories: Math.round(calories),
        protein,
        fats,
        carbs,
        dosha,
        description
    };
}

export function renderMacroPlan(doc = getDocument(), plan) {
    if (!doc || !plan) return;
    doc.querySelector(selectorMap.calorieTarget).textContent = `${plan.calories} kcal`;
    doc.querySelector(selectorMap.proteinTarget).textContent = `${plan.protein}g`;
    doc.querySelector(selectorMap.carbTarget).textContent = `${plan.carbs}g`;
    doc.querySelector(selectorMap.fatTarget).textContent = `${plan.fats}g`;
    doc.querySelector(selectorMap.doshaType).textContent = `${plan.dosha} Warrior`;
    doc.querySelector(selectorMap.doshaDescription).textContent = plan.description;
}

export function initNutritionCalculator(context = {}) {
    const doc = getDocument(context.document);
    if (!doc) return;

    const trigger = doc.querySelector('[data-nutrition-calc]');
    if (!trigger) return;

    const handler = () => {
        const inputs = readMacroInputs(doc);
        const plan = computeMacroPlan(inputs);
        if (plan) {
            renderMacroPlan(doc, plan);
        }
    };

    trigger.addEventListener('click', handler);
    handler();

    return {
        recalculate: handler
    };
}