"use strict";

function loadNavbar() {
    // navbar structure
    const navbarHTML = `
    <header class="navbar">
        <a href="index.html" class="navbar-brand">Chef Circle</a>
        <nav>
            <ul class="navbar-nav">
                <li class="nav-item"><a href="explore.html" class="nav-link">Recipes</a></li>
                <li class="nav-item"><a href="mealplanner.html" class="nav-link">Meal Planner</a></li>
                <li class="nav-item"><a href="community.html" class="nav-link">Community</a></li>
                <li class="nav-item"><a href="recipesubmission.html" class="nav-link">Submit Recipe</a></li>
                <li class="nav-item theme-toggle-container">
                    <label class="theme-toggle">
                        <input type="checkbox" id="theme-toggle">
                        <span class="theme-toggle-slider"></span>
                    </label>
                </li>
            </ul>
            <div class="hamburger">&#9776;</div>
        </nav>
    </header>`;
    
    // Insert navbar at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    initNavbar();
}

function initNavbar() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-nav');
    const themeToggle = document.getElementById('theme-toggle');

    // Toggle dark mode when theme switch is clicked
    themeToggle?.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Toggle mobile menu visibility when hamburger is clicked
    hamburger?.addEventListener('click', function() {
        document.querySelector('.navbar').classList.toggle('responsive');
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add shadow to navbar when page is scrolled
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Initialize navbar when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', loadNavbar);