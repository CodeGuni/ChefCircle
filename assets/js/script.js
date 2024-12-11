const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.getElementById('close-modal');
const colorButtons = document.querySelectorAll('.color-button');

// Open modal
settingsButton.addEventListener('click', () => settingsModal.style.display = 'block');

// Close modal
closeModal.addEventListener('click', () => settingsModal.style.display = 'none');

// Change background color
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.backgroundColor = button.getAttribute('data-color');
        settingsModal.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
});

$(document).ready(function () {
    const sliderContainer = $(".slider-container");
    const slides = $(".banner-slide");
    const totalSlides = slides.length;
    let currentIndex = 0;

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        sliderContainer.css("transform", `translateX(-${currentIndex * 100}%)`);
    }

    setInterval(autoSlide, 3000);
});

document.getElementById('hamburger-menu').addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelector('.nav-links').classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks.contains(event.target) && !event.target.closest('#hamburger-menu')) {
        navLinks.classList.remove('active');
    }
});
