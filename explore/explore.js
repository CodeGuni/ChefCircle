// Import Recipes
import { recipes } from './recipelist.js';

// DOM Element References
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const timeFilter = document.getElementById('timeFilter');
const calorieSlider = document.getElementById('calorieSlider');
const calorieValue = document.getElementById('calorieValue');
const surpriseBtn = document.getElementById('surpriseMe');
const recipesContainer = document.querySelector('.recipes-container');
const recipeTemplate = document.getElementById('recipe-template');
const darkModeToggle = document.getElementById('darkModeToggle');
const viewButtons = document.querySelectorAll('#listViewBtn, #gridViewBtn');
const recipeModal = document.getElementById('recipeModal');
const closeModalBtn = document.querySelector('.close-modal');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const modalFavoriteBtn = document.getElementById('modalFavoriteBtn');
const modalStartBtn = document.getElementById('modalStartBtn');
const recipeProgress = document.getElementById('recipe-progress');
const timeRemaining = document.getElementById('time-remaining');
const progressFill = document.querySelector('.progress-fill');

// Timer Variables
let timerInterval;
let totalTime;
let timeLeft;

// Cooking Timer Functions
function startCooking(cookingTime) {
    totalTime = cookingTime * 60;
    timeLeft = totalTime;
    
    // Show progress bar and update button
    recipeProgress.classList.remove('hidden');
    modalStartBtn.textContent = 'Stop Cooking ⏹️';
    modalStartBtn.classList.add('active');
    
    // Start the timer
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopCooking() {
    // Clear interval and reset UI
    clearInterval(timerInterval);
    recipeProgress.classList.add('hidden');
    modalStartBtn.textContent = 'Start Cooking ▶️';
    modalStartBtn.classList.remove('active');
    progressFill.style.width = '0%';
}

function updateTimer() {
    if (timeLeft <= 0) {
        stopCooking();
        alert('Hope you enjoyed the cooking session, Please leave feedback for us on community page');
        return;
    }

    // Update time display
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeRemaining.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update progress bar
    const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
    progressFill.style.width = `${progressPercent}%`;

    timeLeft--;
}

// View Management Functions
function toggleView(viewType) {
    recipesContainer.classList.remove('grid-view', 'list-view');
    recipesContainer.classList.add(`${viewType}-view`);

    viewButtons.forEach(btn => {
        btn.classList.toggle('active', btn.id === `${viewType}ViewBtn`);
    });
}

// Dark Mode Function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? 'Light Mode 🌞' : 'Dark Mode 🌙';
}

// Search and Filter Functions
function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const maxTime = parseInt(timeFilter.value) || Infinity;
    const maxCalories = parseInt(calorieSlider.value);

    const filtered = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                            recipe.description.toLowerCase().includes(searchTerm) ||
                            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm));
        const matchesCategory = !category || recipe.category === category;
        const matchesTime = recipe.cookingTime <= maxTime;
        const matchesCalories = recipe.nutrition.calories <= maxCalories;

        return matchesSearch && matchesCategory && matchesTime && matchesCalories;
    });

    renderRecipes(filtered);
}

// Random Recipe Function
function showRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    renderRecipes([recipes[randomIndex]]);
}

// Recipe Modal Functions
function toggleRecipeDetails(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Fill content
    const modalTitle = recipeModal.querySelector('.modal-title');
    const ingredientsList = recipeModal.querySelector('.modal-ingredients');
    const instructionsList = recipeModal.querySelector('.modal-instructions');

    modalTitle.textContent = recipe.title;

    stopCooking();
    
    // Update start button click handler
    modalStartBtn.onclick = () => {
        if (!modalStartBtn.classList.contains('active')) {
            startCooking(recipe.cookingTime);
        } else {
            stopCooking();
        }
    };
    
    // Update favorite button in modal
    modalFavoriteBtn.textContent = recipe.isFavorite ? '❤️' : '🤍';
    modalFavoriteBtn.onclick = () => toggleFavorite(recipe.id);

    // Clear and fill ingredients
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = `${ing.amount} ${ing.unit} ${ing.name}`;
        ingredientsList.appendChild(li);
    });

    // Clear and fill instructions
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    // Show modal
    recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling in background

    modalDownloadBtn.onclick = () => downloadRecipe(recipe);
}

// Download Recipe Function
function downloadRecipe(recipe) {
    const text = `
Recipe: ${recipe.title}

Time: ${recipe.cookingTime} minutes
Calories: ${recipe.nutrition.calories}

Ingredients:
${recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`).join('\n')}

Instructions:
${recipe.instructions.join('\n')}
`;

    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    link.download = recipe.title + '.txt';

    link.click();
}

// Favorite Toggle Function
function toggleFavorite(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    recipe.isFavorite = !recipe.isFavorite;
    const newIcon = recipe.isFavorite ? '❤️' : '🤍';
    
    // Update heart in the card
    const btn = document.querySelector(`[data-recipe-id="${recipeId}"] .favorite-recipe`);
    btn.textContent = newIcon;
    
    // Update heart in the modal
    modalFavoriteBtn.textContent = newIcon;
}

// Reset Function
function resetAll() {
    // Clear search
    searchInput.value = '';

    // Reset filters
    categoryFilter.value = '';
    timeFilter.value = '';
    calorieSlider.value = 1000;
    calorieValue.textContent = '1000';

    if (window.resetTheme) {
        window.resetTheme();
    }

    // Show all recipes
    renderRecipes(recipes);

    // Visual feedback
    const resetBtn = document.getElementById('resetRecipes');
    resetBtn.textContent = 'Reset Complete ✓';
    setTimeout(() => {
        resetBtn.textContent = 'Reset All 🔄';
    }, 1000);
}

// Recipe Rendering Functions
function renderRecipes(recipesToRender) {
    recipesContainer.innerHTML = '';

    if (recipesToRender.length === 0) {
        recipesContainer.innerHTML = `
            <div class="no-results">
                <h2>No recipes found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    const recipeOfTheDay = getRecipeOfTheDay();

    recipesToRender.forEach(recipe => {
        const card = recipeTemplate.content.cloneNode(true);
        const recipeCard = card.querySelector('.recipe-card');

        // Add recipe of the day class if this is the selected recipe
        if (recipe.id === recipeOfTheDay.id) {
            recipeCard.classList.add('recipe-of-day');
        }

        card.querySelector('img').src = recipe.image;
        card.querySelector('img').alt = recipe.title;
        card.querySelector('.recipe-title').textContent = recipe.title;
        card.querySelector('.cooking-time').textContent = `⏲️ ${recipe.cookingTime} mins`;
        card.querySelector('.rating').textContent = '⭐'.repeat(Math.round(recipe.rating));
        card.querySelector('.calories').textContent = `🔥 ${recipe.nutrition.calories} kcal`;
        card.querySelector('.recipe-description').textContent = recipe.description;

        // Fill nutrition modal info
        card.querySelector('.nutrition-calories').textContent = recipe.nutrition.calories;
        card.querySelector('.nutrition-protein').textContent = recipe.nutrition.protein;
        card.querySelector('.nutrition-carbs').textContent = recipe.nutrition.carbs;
        card.querySelector('.nutrition-fat').textContent = recipe.nutrition.fat;

        const viewBtn = card.querySelector('.view-recipe');
        viewBtn.addEventListener('click', () => toggleRecipeDetails(recipe.id));

        const favoriteBtn = card.querySelector('.favorite-recipe');
        favoriteBtn.textContent = recipe.isFavorite ? '❤️' : '🤍';
        favoriteBtn.addEventListener('click', () => toggleFavorite(recipe.id));

        recipeCard.dataset.recipeId = recipe.id;

        recipesContainer.appendChild(card);
    });
}

function getRecipeOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Use the day of year to select a recipe 
    const recipeIndex = dayOfYear % recipes.length;
    return recipes[recipeIndex];
}

// Event Listener Initialization
function initializeEventListeners() {
    // Search and Filter Events
    searchInput.addEventListener('input', filterRecipes);
    categoryFilter.addEventListener('change', filterRecipes);
    timeFilter.addEventListener('change', filterRecipes);
    calorieSlider.addEventListener('input', (e) => {
        calorieValue.textContent = e.target.value;
        filterRecipes();
    });

    // View Toggle Events
    document.getElementById('gridViewBtn').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listViewBtn').addEventListener('click', () => toggleView('list'));

    surpriseBtn.addEventListener('click', showRandomRecipe);

    // Reset Button
    document.getElementById('resetRecipes').addEventListener('click', resetAll);

    // Modal Close Events
    closeModalBtn.addEventListener('click', () => {
        recipeModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            recipeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) {
            recipeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initial render
    renderRecipes(recipes);
}

// Footer Animations (jQuery)
$(document).ready(function() {
    // Fade in footer sections on scroll
    function checkFooterVisibility() {
        var windowBottom = $(window).scrollTop() + $(window).height();
        
        $('.footer-section').each(function() {
            var elementTop = $(this).offset().top;
            
            if (elementTop <= windowBottom && $(this).css('opacity') === '0') {
                $(this).animate({
                    opacity: 1
                }, 1000);
                $(this).css('transform', 'translateY(0)');
            }
        });
    }

    // Check on scroll
    $(window).on('scroll', checkFooterVisibility);
    
    // Check on page load
    setTimeout(checkFooterVisibility, 500);

    // Add hover animations for links
    $('.footer-links a').hover(
        function() {
            $(this).css('color', '#e67e22');
        },
        function() {
            $(this).css('color', '#fff');
        }
    );

    // Initial animation for footer sections
    setTimeout(function() {
        $('.footer-section').each(function(index) {
            var section = $(this);
            setTimeout(function() {
                section.animate({
                    opacity: 1
                }, 1000);
                section.css('transform', 'translateY(0)');
            }, 200 * index);
        });
    }, 500);
});

// Student Image Animation
$(document).ready(function() {
    $('.student-image').wrap('<div class="image-flip-container"></div>')
        .addClass('student-image-front')
        .after('<div class="student-image-back">Gunpreet<br>Singh</div>');

    $('.image-flip-container').hover(
        function() {
            $(this).addClass('flipped');
        },
        function() {
            $(this).removeClass('flipped');
        }
    );
});

// Initialize
document.addEventListener('DOMContentLoaded', initializeEventListeners);