'use client';

import { useState, useEffect } from 'react';

const MealPlanCalculator = () => {
    const [goal, setGoal] = useState('');
    const [preferences, setPreferences] = useState('');
    const [planResult, setPlanResult] = useState('');
    const [foodInput, setFoodInput] = useState('');
    const [drinkInput, setDrinkInput] = useState('');
    const [calorieResult, setCalorieResult] = useState('');

    const foodDatabase = {
        "apple": { calories: 95, healthy: true },
        "banana": { calories: 105, healthy: true },
        "pizza": { calories: 285, healthy: false },
        "broccoli": { calories: 55, healthy: true },
        "chocolate bar": { calories: 200, healthy: false }
    };

    const drinkDatabase = {
        "milkshake": { calories: 202, healthy: true },
        "softdrink": { calories: 80, healthy: false },
        "juices": { calories: 120, healthy: true }
    };

    const generatePlan = (event) => {
        event.preventDefault();
        let mealPlan;
        if (goal.includes("weight loss")) {
            mealPlan = `Breakfast: Green smoothie with spinach, apple, and chia seeds\nLunch: Grilled chicken salad with mixed greens\nDinner: Baked salmon with steamed broccoli and quinoa`;
        } else if (goal.includes("muscle gain")) {
            mealPlan = `Breakfast: Oatmeal with protein powder and bananas\nLunch: Turkey and avocado wrap with whole grain tortilla\nDinner: Steak with sweet potato and asparagus`;
        } else if (goal.includes("maintenance")) {
            mealPlan = `Breakfast: Greek yogurt with mixed berries and honey\nLunch: Quinoa bowl with avocado, black beans, and veggies\nDinner: Grilled chicken with sweet potato and sautéed greens`;
        } else {
            mealPlan = `Breakfast: Fruit smoothie with almond milk and spinach\nLunch: Chickpea salad with cucumber, tomato, and lemon dressing\nDinner: Stir-fried tofu with vegetables and brown rice`;
        }

        if (preferences.includes("vegan") || preferences.includes("vegetarian")) {
            mealPlan = mealPlan.replace(/chicken|salmon|turkey|steak/gi, "tofu").replace(/yogurt|milk/gi, "almond yogurt");
        }
        if (preferences.includes("keto")) {
            mealPlan = mealPlan.replace(/quinoa|rice|sweet potato|banana|apple|berries|honey|smoothie/gi, "cauliflower rice or avocado");
        }
        if (preferences.includes("balanced")) {
            mealPlan += `\nDessert: Fresh fruit or dark chocolate to round off your balanced diet!`;
        }

        setPlanResult(mealPlan);
    };

    const calculateCalories = (event) => {
        event.preventDefault();
        let result = "";
        if (foodInput && foodDatabase[foodInput]) {
            const { calories, healthy } = foodDatabase[foodInput];
            result = `Calories: ${calories} kcal\n${healthy ? "This is a healthy choice!" : "Consider a healthier option."}`;
        } else if (drinkInput && drinkDatabase[drinkInput]) {
            const { calories, healthy } = drinkDatabase[drinkInput];
            result = `Calories: ${calories} kcal\n${healthy ? "This is a healthy choice!" : "Consider a healthier option."}`;
        } else {
            result = "No data available.";
        }
        setCalorieResult(result);
    };

    useEffect(() => {
        if (foodInput) setDrinkInput('');
        if (drinkInput) setFoodInput('');
    }, [foodInput, drinkInput]);

    return (
        <div className="flex flex-col items-center text-center px-6 py-20">
            <h2 className="text-3xl font-bold text-orange-500">Nutrition Tools</h2>
            <p className="text-gray-600 mt-2 mb-6">
                Use our personalized plan generator and calorie counter to make informed dietary choices and
                achieve your health goals with ease.
            </p>
            <div className="max-w-6xl mx-auto  grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border-2 border-orange-500 p-6 rounded-lg shadow-md w-full  bg-gray-100">
                    <h3 className="text-xl font-bold text-orange-500">Plan Generator</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Input your goals and dietary preferences to receive a sample meal plan:
                    </p>
                    <form onSubmit={generatePlan} className="mb-6">
                        <label className="block text-left font-semibold">Goal:</label>
                        <input type="text" placeholder="e.g., Weight loss, Muscle gain, Maintenance" value={goal} onChange={(e) => setGoal(e.target.value)} className="border p-2 w-full mb-2" />
                        <label className="block text-left font-semibold">Dietry Preferences:</label>
                        <input type="text" placeholder="e.g., Balanced, Vegetarian, Keto" value={preferences} onChange={(e) => setPreferences(e.target.value)} className="border p-2 w-full mb-2" />
                        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Generate Plan</button>
                    </form>
                    <div className="border p-4">{planResult && <p>{planResult}</p>}</div>
                </div>
                <div className="border-2 border-orange-500 p-6 rounded-lg shadow-md w-full  bg-gray-100">
                    <h3 className="text-xl font-bold text-orange-500">Calorie Calculator</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Enter a food item to check its calorie content and get advice:
                    </p>

                    <form onSubmit={calculateCalories} className="mt-6">
                        <label className="block text-left font-semibold">Food Item:</label>
                        <input type="text" placeholder="e.g., Apple, Pizza, Broccoli, Banana, Chocolate bar" value={foodInput} onChange={(e) => setFoodInput(e.target.value)} className="border p-2 w-full mb-2" disabled={drinkInput} />
                        <label className="block text-left font-semibold">Drink Item:</label>
                        <input type="text" placeholder="e.g., Milkshake, Soft drink, Juices" value={drinkInput} onChange={(e) => setDrinkInput(e.target.value)} className="border p-2 w-full mb-2" disabled={foodInput} />
                        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Calculate Calories</button>
                    </form>
                    <div className="border p-4 mt-4">{calorieResult && <p>{calorieResult}</p>}</div>
                </div>
            </div>
        </div>
    );
};

export default MealPlanCalculator;
