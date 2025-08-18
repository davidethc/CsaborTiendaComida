document.addEventListener('DOMContentLoaded', () => {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Animación del Header al cargar la página
    gsap.from('.navbar-brand', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.navbar-nav .nav-item', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Animación para el banner de la página
    gsap.from('.page-banner h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.page-banner .breadcrumb', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Animación para la sección Historia
    const historiaTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#historia',
            start: 'top 70%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
        }
    });
    
    historiaTimeline.from('#historia h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }).from('#historia p', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.4');
    
    // Animación para la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.2
        });
    });
    
    // Animación para la sección Misión y Visión
    const misionVisionTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.mission-vision',
            start: 'top 70%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
        }
    });
    
    misionVisionTimeline.from('.mission-vision h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }).from('.mission-vision .card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
    }, '-=0.4');
    
    // Animación para la sección Valores
    const valoresTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#valores',
            start: 'top 70%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
        }
    });
    
    valoresTimeline.from('#valores h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }).from('#valores p.lead', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4').from('.valores-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.2');
    
    // Animación para la sección Equipo
    const equipoTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#equipo',
            start: 'top 70%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
        }
    });
    
    equipoTimeline.from('#equipo h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }).from('#equipo p.lead', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4').from('.team-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.2');
    
    // Normalizar alturas de las tarjetas después de cargar la página
    window.addEventListener('load', () => {
        normalizeCardHeights();
    });
    
    // Normalizar alturas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        normalizeCardHeights();
    });
    
    // Añadir funcionalidad de resaltado de navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Función para resaltar el elemento activo en la barra de navegación
    function highlightNavbar() {
        // Obtener la posición actual de desplazamiento
        let scrollPosition = window.scrollY + 200; // Añadir offset para activar antes
        
        // Verificar cada sección para ver si está en vista
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Eliminar la clase activa de todos los enlaces
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Añadir clase activa al elemento de navegación correspondiente
                const correspondingNavItem = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
        
        // Caso especial para la parte superior de la página
        if (scrollPosition < 200) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#inicio"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Llamada inicial para establecer la sección activa
    highlightNavbar();
    
    // Añadir evento de desplazamiento
    window.addEventListener('scroll', highlightNavbar);
});

// Función para normalizar alturas de tarjetas
function normalizeCardHeights() {
    // Normalizar alturas de las tarjetas de misión y visión
    let maxMissionVisionHeight = 0;
    document.querySelectorAll('.mission-vision .card').forEach(card => {
        card.style.height = ''; // Reset height first
        if (card.offsetHeight > maxMissionVisionHeight) {
            maxMissionVisionHeight = card.offsetHeight;
        }
    });
    
    if (maxMissionVisionHeight > 0) {
        document.querySelectorAll('.mission-vision .card').forEach(card => {
            card.style.height = maxMissionVisionHeight + 'px';
        });
    }

    // Normalizar alturas de las tarjetas de valores
    let maxValoresHeight = 0;
    document.querySelectorAll('.valores-card').forEach(card => {
        card.style.height = ''; // Reset height first
        if (card.offsetHeight > maxValoresHeight) {
            maxValoresHeight = card.offsetHeight;
        }
    });
    
    if (maxValoresHeight > 0) {
        document.querySelectorAll('.valores-card').forEach(card => {
            card.style.height = maxValoresHeight + 'px';
        });
    }
    
    // Normalizar alturas de las tarjetas de equipo
    let maxTeamHeight = 0;
    document.querySelectorAll('.team-card').forEach(card => {
        card.style.height = ''; // Reset height first
        if (card.offsetHeight > maxTeamHeight) {
            maxTeamHeight = card.offsetHeight;
        }
    });
    
    if (maxTeamHeight > 0) {
        document.querySelectorAll('.team-card').forEach(card => {
            card.style.height = maxTeamHeight + 'px';
        });
    }
}

// Función para animar elementos al hacer scroll
function animateOnScroll(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        const delay = options.stagger ? index * options.stagger : 0;
        gsap.from(element, {
            opacity: 0,
            y: options.y || 50,
            duration: options.duration || 0.8,
            delay: options.delay ? options.delay + delay : delay,
            ease: options.ease || 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: options.start || 'top 80%',
                end: options.end || 'bottom 60%',
                toggleActions: options.toggleActions || 'play none none none'
            }
        });
    });
}