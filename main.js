// Add at the beginning of the file
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1000);
});

// Add page transition
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('pages/')) {
            e.preventDefault();
            document.body.classList.add('page-transition');
            setTimeout(() => {
                window.location = this.href;
            }, 500);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidenav = document.querySelector('.sidenav');
    const main = document.querySelector('.main');

    // Toggle Sidenav
    menuToggle.addEventListener('click', () => {
        sidenav.classList.toggle('active');
        main.classList.toggle('shifted');
    });

    // Close sidenav when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidenav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidenav.classList.contains('active')) {
            sidenav.classList.remove('active');
            main.classList.remove('shifted');
        }
    });

    // Ripple effect for cards
    const rippleElements = document.querySelectorAll('.ripple');
    rippleElements.forEach(element => {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple-effect';

            element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});