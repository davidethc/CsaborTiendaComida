/**
 * C'sabor - Productos Page JavaScript
 * This file handles product loading, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Productos script loaded");
    
    // Initialize animations
    initAnimations();
    
    // Initialize product filters
    initProductFilters();
    
    // Initialize product cards
    initProductCards();
    
    // Initialize product images (ensure they load correctly)
    loadProductImages();
    
    // Hide preloader when everything is loaded
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
});

/**
 * Initialize animations for the page
 */
function initAnimations() {
    // Animate hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('animate-fade-in');
    }
    
    // Animate product cards with staggered delay
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-fade-in-up');
        }, 100 * index);
    });
    
    // Add scroll animations
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Animate elements when they come into view
        document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition > elementPosition - window.innerHeight * 0.8) {
                element.classList.add('animated');
            }
        });
    });
    
    // Add hover animations to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

/**
 * Initialize product filters
 */
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    // Set initial state - show all products
    productItems.forEach(item => {
        item.style.display = 'block';
        item.classList.add('animate-on-scroll');
    });
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter products with animation
            productItems.forEach(item => {
                // First add a fade-out animation
                item.classList.add('fade-out');
                
                setTimeout(() => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                    
                    // Remove fade-out and add fade-in for visible items
                    item.classList.remove('fade-out');
                    if (item.style.display === 'block') {
                        item.classList.add('fade-in');
                        setTimeout(() => {
                            item.classList.remove('fade-in');
                        }, 500);
                    }
                }, 300);
            });
        });
    });
}

/**
 * Initialize product cards and add-to-cart functionality
 */
function initProductCards() {
    // First, remove all existing event listeners by setting a flag on buttons that have been processed
    document.querySelectorAll('.add-to-combo-btn').forEach(button => {
        if (button.hasAttribute('data-event-attached')) {
            button.removeEventListener('click', handleAddToCart);
        }
    });
    
    // Define the handler function outside to be able to remove it later
    function handleAddToCart(event) {
        // Prevent default action and stop propagation
        event.preventDefault();
        event.stopPropagation();
        
        const button = this;
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productImage = button.getAttribute('data-image');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        
        console.log(`Adding to cart: ${productName} - $${productPrice}`);
        
        // Add animation to button
        button.classList.add('btn-added');
        setTimeout(() => {
            button.classList.remove('btn-added');
        }, 1000);
        
        // Use the global addToCart function from cart.js
        if (window.addToCart) {
            // Ensure we only call addToCart once
            window.addToCart(productId, productName, productImage, productPrice);
            
            // Add floating animation from product to cart
            addToCartAnimation(button);
        } else {
            console.error("addToCart function not found");
        }
    }
    
    // Now add the event listeners to all buttons and mark them as processed
    document.querySelectorAll('.add-to-combo-btn').forEach(button => {
        // Remove old event listeners if any (by cloning)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new event listener
        newButton.addEventListener('click', handleAddToCart);
        
        // Mark as processed
        newButton.setAttribute('data-event-attached', 'true');
    });
    
    // Add click event to product images for zoom effect
    document.querySelectorAll('.product-image img').forEach(img => {
        // Remove old event listeners
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        newImg.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const overlay = this.parentElement.querySelector('.product-overlay');
                if (overlay) {
                    const detailsBtn = overlay.querySelector('a');
                    if (detailsBtn) {
                        detailsBtn.click();
                    }
                }
            }
        });
    });
}

/**
 * Create animation for adding product to cart
 */
function addToCartAnimation(button) {
    // Create floating element
    const floater = document.createElement('div');
    floater.className = 'cart-item-floater';
    
    // Get product image
    const productCard = button.closest('.product-card');
    const productImg = productCard.querySelector('.product-image img');
    
    // Create a small version of the product image
    const floaterImg = document.createElement('img');
    floaterImg.src = productImg.src;
    floaterImg.alt = productImg.alt;
    floater.appendChild(floaterImg);
    
    // Add to body
    document.body.appendChild(floater);
    
    // Get positions
    const buttonRect = button.getBoundingClientRect();
    const cartIconRect = document.getElementById('cart-icon').getBoundingClientRect();
    
    // Set initial position
    floater.style.top = `${buttonRect.top + window.scrollY}px`;
    floater.style.left = `${buttonRect.left + window.scrollX}px`;
    
    // Animate to cart
    setTimeout(() => {
        floater.style.top = `${cartIconRect.top + window.scrollY}px`;
        floater.style.left = `${cartIconRect.left + window.scrollX}px`;
        floater.style.transform = 'scale(0.1)';
        floater.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(floater);
            
            // Animate cart icon
            const cartIcon = document.getElementById('cart-icon');
            cartIcon.classList.add('cart-icon-pulse');
            setTimeout(() => {
                cartIcon.classList.remove('cart-icon-pulse');
            }, 700);
        }, 500);
    }, 10);
}

/**
 * Ensure all product images load correctly
 */
function loadProductImages() {
    const productImages = document.querySelectorAll('.product-image img');
    
    productImages.forEach(img => {
        // Set a flag to prevent infinite error loops
        let hasErrored = false;
        
        // Check if image exists, if not, handle gracefully
        img.onerror = function() {
            // Only try to replace once to avoid infinite loops
            if (!hasErrored) {
                hasErrored = true;
                console.warn(`Image not found: ${this.src}`);
                
                // Instead of trying to load another image that might not exist,
                // just hide the broken image or show a colored background
                this.style.display = 'none';
                
                // Add a colored background to the parent container
                const container = this.parentElement;
                if (container) {
                    container.style.backgroundColor = '#f8f9fa'; // Light gray background
                    
                    // Optionally add a product icon or text
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-center p-3';
                    placeholder.innerHTML = '<i class="fas fa-utensils fa-2x text-secondary"></i>';
                    container.appendChild(placeholder);
                }
            }
        };
        
        // Add loading animation
        img.classList.add('image-loading');
        
        img.onload = function() {
            this.classList.remove('image-loading');
            this.classList.add('image-loaded');
        };
    });
}