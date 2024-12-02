function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initNavbar();
        });
}

function initNavbar() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-nav');
    
    hamburger.onclick = function() {
        document.querySelector('.navbar').classList.toggle('responsive');
        navMenu.classList.toggle('active');
    }

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);