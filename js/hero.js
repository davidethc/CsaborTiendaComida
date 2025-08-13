const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'flex' : 'none';
    });
}

document.querySelectorAll('.hero-arrow.left').forEach(btn => {
    btn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
});

document.querySelectorAll('.hero-arrow.right').forEach(btn => {
    btn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
});

showSlide(currentSlide);
