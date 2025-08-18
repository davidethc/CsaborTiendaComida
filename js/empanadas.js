// Empanadas functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Empanadas script loaded");
    
    // Product prices
    const productPrices = {
        'mini-empanada-carne': 0.75,
        'mini-empanada-pollo': 0.75,
        'mini-empanada-queso': 0.70,
        'mini-corviche': 0.80,
        'mini-dedito-queso': 0.65,
        'mini-bolon-queso': 0.85,
        'mini-bolon-chicharron': 0.90
    };
    
    // Add click event to all "Add to Combo" buttons
    const addToComboButtons = document.querySelectorAll('.add-to-combo-btn');
    
    addToComboButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productImage = this.getAttribute('data-image');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            console.log(`Adding to cart: ${productName} - $${productPrice}`);
            
            // Use the global addToCart function from cart.js
            if (window.addToCart) {
                window.addToCart(productId, productName, productImage, productPrice);
            } else {
                console.error("addToCart function not found");
            }
        });
    });
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter products
            const productItems = document.querySelectorAll('.product-item');
            productItems.forEach(item => {
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
            });
        });
    });
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.display = 'none';
        });
        
        // Fallback to hide preloader after 2 seconds
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 2000);
    }
});