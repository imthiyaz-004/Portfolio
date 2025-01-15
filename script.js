// Scroll to Top Button
const topButton = document.getElementById('top-button');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
};

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Get the buttons and sections
const educationBtn = document.getElementById('educationBtn');
const experienceBtn = document.getElementById('experienceBtn');
const educationSection = document.getElementById('educationSection');
const experienceSection = document.getElementById('experienceSection');

// Add event listeners to buttons
educationBtn.addEventListener('click', () => {
    // Toggle sections
    educationSection.style.display = 'block';
    experienceSection.style.display = 'none';

    // Toggle active button classes
    educationBtn.classList.add('active');
    experienceBtn.classList.remove('active');
});

experienceBtn.addEventListener('click', () => {
    // Toggle sections
    educationSection.style.display = 'none';
    experienceSection.style.display = 'block';

    // Toggle active button classes
    experienceBtn.classList.add('active');
    educationBtn.classList.remove('active');
});

window.addEventListener("load", function() {
    document.querySelector('.landing-page .profile-img').classList.add('fade-in');
});
