"use strict";
/**
 * Loads the navbar from an external file (navbar.html) and adds it to the top of the page.
 * Initializes navbar functionality after loading.
 */
function loadNavbar() {
    fetch('../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);  // Add navbar to the page
            initNavbar(); // Initialize navbar functionality
        });
}

function initNavbar() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-nav');
    // Toggle navbar menu on hamburger click
    hamburger.onclick = function() {
        document.querySelector('.navbar').classList.toggle('responsive');
        navMenu.classList.toggle('active');
    }
    // Highlight the active page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
// Load the navbar when the page finishes loading
document.addEventListener('DOMContentLoaded', loadNavbar);