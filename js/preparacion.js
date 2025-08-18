document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Navbar scroll handling
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavbar() {
        let scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavbar);
    highlightNavbar();

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
    
    // Hero section animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.3,
        ease: 'power4.out'
    });
    
    gsap.from('.hero-text', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Instrucciones generales animation
    const instruccionesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#instrucciones-generales',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    instruccionesTimeline
        .from('#instrucciones-generales h2', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('#instrucciones-generales .d-flex', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');
    
    // Productos preparación animation
    gsap.from('#productos-preparacion h2', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#productos-preparacion h2',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate each preparation item
    document.querySelectorAll('.preparation-item').forEach(function(item, index) {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        timeline
            .from(item.querySelector('img'), {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 1,
                ease: 'power3.out'
            })
            .from(item.querySelector('.card'), {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from(item.querySelectorAll('.method'), {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.4');
    });
    
    // Consejos adicionales animation
    const consejosTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#consejos-adicionales',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    consejosTimeline
        .from('#consejos-adicionales h2', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('#consejos-adicionales .card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('#consejos-adicionales .btn', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.2');
    
    // Preguntas frecuentes animation
    const preguntasTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#preguntas-frecuentes',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    preguntasTimeline
        .from('#preguntas-frecuentes h2', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('#preguntas-frecuentes .accordion-item', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');
    
    // Footer animation
    const footerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
    
    footerTimeline
        .from('footer h5', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        })
        .from('footer p, footer li', {
            opacity: 0,
            y: 10,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out'
        }, '-=0.4')
        .from('footer .social-icons a', {
            opacity: 0,
            y: 10,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.2');
    
    // WhatsApp button animation
    gsap.from('.chat-button', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        delay: 2,
        ease: 'elastic.out(1, 0.5)'
    });
});