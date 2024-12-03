// Get modal elements
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.getElementById('close-modal');
const colorButtons = document.querySelectorAll('.color-button');

// Open modal
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Change background color
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-color');
        document.body.style.backgroundColor = selectedColor;
        settingsModal.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});
