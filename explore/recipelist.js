export const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        description: "Creamy pasta dish with eggs, cheese, and pancetta",
        image: "placeholder-recipe.jpg",
        cookingTime: 30,
        rating: 4.8,
        category: "dinner",
        nutrition: {
            calories: 650,
            protein: 25,
            carbs: 70,
            fat: 35
        },
        ingredients: [
            { name: "spaghetti", amount: 400, unit: "g" },
            { name: "eggs", amount: 4, unit: "large" },
            { name: "pancetta", amount: 150, unit: "g" },
            { name: "parmesan", amount: 100, unit: "g" },
            { name: "black pepper", amount: 2, unit: "tsp" }
        ],
        instructions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package instructions",
            "While pasta cooks, cut pancetta into small cubes",
            "In a bowl, whisk eggs with grated parmesan and black pepper",
            "Fry pancetta until crispy, then remove from heat",
            "Drain pasta, reserving 1 cup of pasta water",
            "Working quickly, mix hot pasta with egg mixture and pancetta",
            "Add pasta water as needed to create a creamy sauce",
            "Serve immediately with extra parmesan and black pepper"
        ],
        isFavorite: false
    },
    {
        id: 2,
        title: "Avocado Toast",
        description: "Quick and healthy breakfast with mashed avocado",
        image: "placeholder-recipe.jpg",
        cookingTime: 15,
        rating: 4.5,
        category: "breakfast",
        nutrition: {
            calories: 350,
            protein: 12,
            carbs: 45,
            fat: 28
        },
        ingredients: [
            { name: "sourdough bread", amount: 2, unit: "slices" },
            { name: "avocado", amount: 1, unit: "large" },
            { name: "salt", amount: 1, unit: "pinch" },
            { name: "pepper", amount: 1, unit: "pinch" },
            { name: "red pepper flakes", amount: 1, unit: "pinch" }
        ],
        instructions: [
            "Toast bread until golden brown",
            "Cut avocado in half, remove pit, and scoop out flesh",
            "Mash avocado in a bowl with salt and pepper",
            "Spread mashed avocado on toasted bread",
            "Top with red pepper flakes and additional seasoning if desired"
        ],
        isFavorite: false
    },
    {
        id: 3,
        title: "Thai Green Curry",
        description: "Aromatic coconut curry with vegetables and chicken",
        image: "placeholder-recipe.jpg",
        cookingTime: 45,
        rating: 4.7,
        category: "dinner",
        nutrition: {
            calories: 520,
            protein: 28,
            carbs: 35,
            fat: 32
        },
        ingredients: [
            { name: "chicken breast", amount: 500, unit: "g" },
            { name: "green curry paste", amount: 3, unit: "tbsp" },
            { name: "coconut milk", amount: 400, unit: "ml" },
            { name: "bamboo shoots", amount: 200, unit: "g" },
            { name: "bell peppers", amount: 2, unit: "medium" },
            { name: "fish sauce", amount: 2, unit: "tbsp" },
            { name: "palm sugar", amount: 1, unit: "tbsp" },
            { name: "thai basil", amount: 1, unit: "cup" }
        ],
        instructions: [
            "Cut chicken into bite-sized pieces",
            "Heat oil in a large pan and fry curry paste until fragrant",
            "Add chicken and cook until browned",
            "Pour in coconut milk and bring to a simmer",
            "Add bamboo shoots and peppers",
            "Season with fish sauce and palm sugar",
            "Simmer for 15-20 minutes until chicken is cooked",
            "Stir in thai basil leaves before serving",
            "Serve hot with jasmine rice"
        ],
        isFavorite: false
    },
    {
        id: 4,
        title: "Homemade Pizza Margherita",
        description: "Classic Italian pizza with fresh mozzarella and basil",
        image: "placeholder-recipe.jpg",
        cookingTime: 60,
        rating: 4.9,
        category: "dinner",
        nutrition: {
            calories: 880,
            protein: 34,
            carbs: 126,
            fat: 24
        },
        ingredients: [
            { name: "pizza dough", amount: 500, unit: "g" },
            { name: "tomato sauce", amount: 200, unit: "ml" },
            { name: "fresh mozzarella", amount: 250, unit: "g" },
            { name: "fresh basil", amount: 1, unit: "bunch" },
            { name: "olive oil", amount: 2, unit: "tbsp" },
            { name: "salt", amount: 1, unit: "tsp" }
        ],
        instructions: [
            "Preheat oven to highest setting (usually 250°C/480°F) with pizza stone if available",
            "Roll out pizza dough on floured surface",
            "Spread tomato sauce evenly over dough",
            "Tear mozzarella into pieces and distribute over sauce",
            "Bake for 10-12 minutes until crust is golden",
            "Remove from oven and immediately add fresh basil leaves",
            "Drizzle with olive oil and serve hot"
        ],
        isFavorite: false
    },
    {
        id: 5,
        title: "Quinoa Buddha Bowl",
        description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
        image: "placeholder-recipe.jpg",
        cookingTime: 40,
        rating: 4.6,
        category: "lunch",
        nutrition: {
            calories: 420,
            protein: 15,
            carbs: 58,
            fat: 18
        },
        ingredients: [
            { name: "quinoa", amount: 200, unit: "g" },
            { name: "sweet potato", amount: 1, unit: "large" },
            { name: "chickpeas", amount: 400, unit: "g" },
            { name: "kale", amount: 200, unit: "g" },
            { name: "tahini", amount: 3, unit: "tbsp" },
            { name: "lemon", amount: 1, unit: "whole" },
            { name: "avocado", amount: 1, unit: "medium" }
        ],
        instructions: [
            "Cook quinoa according to package instructions",
            "Cube sweet potato and roast with chickpeas at 200°C for 25 minutes",
            "Massage kale with olive oil and salt",
            "Make dressing by mixing tahini, lemon juice, and water",
            "Assemble bowls with quinoa base, roasted vegetables, and kale",
            "Top with sliced avocado and drizzle with tahini dressing",
            "Garnish with seeds if desired"
        ],
        isFavorite: false
    },
    {
        id: 6,
        title: "Classic French Onion Soup",
        description: "Rich beef broth with caramelized onions and melted gruyere",
        image: "placeholder-recipe.jpg",
        cookingTime: 90,
        rating: 4.8,
        category: "dinner",
        nutrition: {
            calories: 340,
            protein: 16,
            carbs: 38,
            fat: 14
        },
        ingredients: [
            { name: "onions", amount: 6, unit: "large" },
            { name: "beef stock", amount: 1.5, unit: "L" },
            { name: "gruyere cheese", amount: 200, unit: "g" },
            { name: "baguette", amount: 1, unit: "whole" },
            { name: "butter", amount: 50, unit: "g" },
            { name: "thyme", amount: 4, unit: "sprigs" },
            { name: "bay leaf", amount: 2, unit: "pieces" }
        ],
        instructions: [
            "Slice onions thinly",
            "Slowly caramelize onions in butter for 45-60 minutes until deep brown",
            "Add thyme and bay leaves",
            "Pour in beef stock and simmer for 30 minutes",
            "Toast baguette slices",
            "Ladle soup into oven-proof bowls",
            "Top with toasted bread and grated gruyere",
            "Broil until cheese is melted and bubbly"
        ],
        isFavorite: false
    },
    {
        id: 7,
        title: "Mango Smoothie Bowl",
        description: "Tropical smoothie bowl topped with fresh fruits and granola",
        image: "placeholder-recipe.jpg",
        cookingTime: 15,
        rating: 4.4,
        category: "breakfast",
        nutrition: {
            calories: 380,
            protein: 8,
            carbs: 82,
            fat: 4
        },
        ingredients: [
            { name: "frozen mango", amount: 300, unit: "g" },
            { name: "banana", amount: 1, unit: "medium" },
            { name: "coconut milk", amount: 200, unit: "ml" },
            { name: "honey", amount: 2, unit: "tbsp" },
            { name: "granola", amount: 50, unit: "g" },
            { name: "fresh berries", amount: 100, unit: "g" },
            { name: "chia seeds", amount: 1, unit: "tbsp" }
        ],
        instructions: [
            "Blend frozen mango, banana, and coconut milk until smooth",
            "Add honey to taste",
            "Pour into a bowl",
            "Top with granola, fresh berries, and chia seeds",
            "Serve immediately before it melts"
        ],
        isFavorite: false
    },
    {
        id: 8,
        title: "Beef and Broccoli Stir-Fry",
        description: "Quick and flavorful Asian stir-fry with tender beef",
        image: "placeholder-recipe.jpg",
        cookingTime: 25,
        rating: 4.6,
        category: "dinner",
        nutrition: {
            calories: 440,
            protein: 32,
            carbs: 28,
            fat: 22
        },
        ingredients: [
            { name: "beef sirloin", amount: 400, unit: "g" },
            { name: "broccoli", amount: 300, unit: "g" },
            { name: "soy sauce", amount: 4, unit: "tbsp" },
            { name: "oyster sauce", amount: 2, unit: "tbsp" },
            { name: "garlic", amount: 3, unit: "cloves" },
            { name: "ginger", amount: 2, unit: "tbsp" },
            { name: "cornstarch", amount: 1, unit: "tbsp" }
        ],
        instructions: [
            "Slice beef thinly against the grain",
            "Cut broccoli into florets",
            "Mix soy sauce, oyster sauce, and cornstarch for sauce",
            "Stir-fry beef until browned, then remove from pan",
            "Stir-fry broccoli, garlic, and ginger",
            "Return beef to pan and add sauce",
            "Cook until sauce thickens",
            "Serve hot with steamed rice"
        ],
        isFavorite: false
    },
    {
        id: 9,
        title: "Chocolate Lava Cake",
        description: "Decadent dessert with a molten chocolate center",
        image: "placeholder-recipe.jpg",
        cookingTime: 20,
        rating: 4.9,
        category: "dessert",
        nutrition: {
            calories: 420,
            protein: 7,
            carbs: 45,
            fat: 28
        },
        ingredients: [
            { name: "dark chocolate", amount: 200, unit: "g" },
            { name: "butter", amount: 120, unit: "g" },
            { name: "eggs", amount: 4, unit: "large" },
            { name: "sugar", amount: 100, unit: "g" },
            { name: "flour", amount: 60, unit: "g" },
            { name: "vanilla extract", amount: 1, unit: "tsp" }
        ],
        instructions: [
            "Preheat oven to 200°C/400°F",
            "Melt chocolate and butter together",
            "Whisk eggs and sugar until light and fluffy",
            "Fold chocolate mixture into egg mixture",
            "Gently fold in flour",
            "Pour into greased ramekins",
            "Bake for 12-14 minutes until edges are set but center is soft",
            "Serve immediately with vanilla ice cream"
        ],
        isFavorite: false
    },
    {
        id: 10,
        title: "Mediterranean Grilled Salmon",
        description: "Fresh salmon with herbs and lemon",
        image: "placeholder-recipe.jpg",
        cookingTime: 25,
        rating: 4.7,
        category: "dinner",
        nutrition: {
            calories: 380,
            protein: 34,
            carbs: 8,
            fat: 24
        },
        ingredients: [
            { name: "salmon fillets", amount: 4, unit: "pieces" },
            { name: "olive oil", amount: 3, unit: "tbsp" },
            { name: "lemon", amount: 2, unit: "whole" },
            { name: "garlic", amount: 4, unit: "cloves" },
            { name: "oregano", amount: 2, unit: "tbsp" },
            { name: "rosemary", amount: 2, unit: "sprigs" },
            { name: "cherry tomatoes", amount: 200, unit: "g" }
        ],
        instructions: [
            "Preheat grill to medium-high heat",
            "Mix olive oil, lemon juice, minced garlic, and herbs",
            "Marinate salmon in the mixture for 30 minutes",
            "Grill salmon for 4-5 minutes per side",
            "Grill cherry tomatoes until slightly charred",
            "Serve with lemon wedges and fresh herbs",
            "Optionally serve with grilled vegetables or salad"
        ],
        isFavorite: false
    }
];