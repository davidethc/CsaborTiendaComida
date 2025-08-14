document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    // Preloader
    setTimeout(function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    }, 1000);

    // Animación Header
    gsap.from('.navbar-brand', { opacity: 0, x: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.navbar-nav .nav-item', { opacity: 0, y: -20, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' });

    // Quienes Somos
    if (document.querySelector('#quienes-somos')) {
        gsap.timeline({ scrollTrigger: { trigger: '#quienes-somos', start: 'top 70%' } })
            .from('#quienes-somos h2', { opacity: 0, y: 30, duration: 0.8 })
            .from('#quienes-somos p', { opacity: 0, y: 20, duration: 0.8, stagger: 0.2 }, '-=0.4')
            .from('#quienes-somos img', { opacity: 0, x: 50, duration: 1 }, '-=0.6');
    }

    // Productos
    if (document.querySelector('#productos')) {
        gsap.timeline({ scrollTrigger: { trigger: '#productos', start: 'top 70%' } })
            .from('#productos h2', { opacity: 0, y: 30, duration: 0.8 })
            .from('#productos .lead', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');
        setTimeout(initProductCarousel, 500);
    }

    window.addEventListener('load', normalizeCardHeights);
    window.addEventListener('resize', normalizeCardHeights);
});

// Carrusel de productos
function initProductCarousel() {
    if (typeof jQuery === 'undefined' || typeof jQuery.fn.owlCarousel === 'undefined') {
        console.error("jQuery u Owl Carousel no están cargados");
        return;
    }

    jQuery(function ($) {
        const $carousel = $('.product-carousel');
        if ($carousel.length === 0) {
            console.warn("No se encontró el contenedor del carrusel");
            return;
        }

        $carousel.owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            responsive: {
                0: { items: 1, margin: 15, nav: false },
                576: { items: 2, margin: 20 },
                992: { items: 3, margin: 25 },
                1200: { items: 4, margin: 30 }
            },
            onInitialized: () => setTimeout(normalizeProductCardHeights, 100),
            onResized: () => setTimeout(normalizeProductCardHeights, 100)
        });
    });
}

// Alturas uniformes
function normalizeProductCardHeights() {
    const items = document.querySelectorAll('.product-card');
    if (!items.length) return;
    let maxHeight = 0;
    items.forEach(item => item.style.height = 'auto');
    items.forEach(item => maxHeight = Math.max(maxHeight, item.offsetHeight));
    items.forEach(item => item.style.height = maxHeight + 'px');
}

function normalizeCardHeights() {
    normalizeProductCardHeights();
}
