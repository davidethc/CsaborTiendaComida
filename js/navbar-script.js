document.addEventListener('DOMContentLoaded', function() {
    // Marcar el enlace activo según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-hamburger'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'diplay.json'
    });

    // Get menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const body = document.body;
    let isMenuOpen = false;

    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        menu.classList.toggle('open');
        body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        if (isMenuOpen) {
            animation.playSegments([0, 28], true);
        } else {
            animation.playSegments([28, 0], true);
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            menu.classList.remove('open');
            animation.goToAndStop(0, true);
            isMenuOpen = false;
        }
    });
});
