// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Cart script loaded");
    
    // Inicializar el carrito en todas las páginas
    console.log("Inicializando carrito...");
    
    // Cart variables
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Create backdrop for modal
    let backdrop = document.querySelector('.cart-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'cart-backdrop';
        document.body.appendChild(backdrop);
    }
    
    // Convert cart dropdown to modal if it exists
    if (cartDropdown) {
        // Remove any existing classes that position it as a dropdown
        cartDropdown.classList.remove('dropdown-menu');
        // Add modal styling classes
        cartDropdown.classList.add('cart-modal');
    }
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('csabor-cart')) || [];
    
    // Update cart display on page load
    updateCartDisplay();
    
    // Toggle cart modal when clicking cart icon
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault(); // Importante para evitar que el enlace redirija
            e.stopPropagation();
            toggleCart();
        });
    }
    
    // Close cart when clicking on backdrop
    backdrop.addEventListener('click', function() {
        closeCart();
    });
    
    // Close cart when clicking outside but NOT when clicking inside
    document.addEventListener('click', function(e) {
        if (cartDropdown && cartDropdown.classList.contains('show') && 
            !cartDropdown.contains(e.target) && 
            cartIcon && !cartIcon.contains(e.target)) {
            closeCart();
        }
    });
    
    // IMPORTANT: Stop propagation for all clicks inside the cart dropdown
    if (cartDropdown) {
        cartDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Checkout button functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            processCheckout();
        });
    }
    
    // Functions
    
    // Toggle cart visibility
    function toggleCart() {
        if (cartDropdown) {
            cartDropdown.classList.toggle('show');
            backdrop.classList.toggle('show');
            document.body.classList.toggle('cart-open');
            
            // Center the modal when shown
            if (cartDropdown.classList.contains('show')) {
                centerCartModal();
            }
        }
    }
    
    // Center the cart modal on screen
    function centerCartModal() {
        if (cartDropdown) {
            // Reset any previous positioning
            cartDropdown.style.top = '50%';
            cartDropdown.style.left = '50%';
            cartDropdown.style.transform = 'translate(-50%, -50%)';
        }
    }
    
    // Close cart
    function closeCart() {
        if (cartDropdown) {
            cartDropdown.classList.remove('show');
            backdrop.classList.remove('show');
            document.body.classList.remove('cart-open');
        }
    }
    
    // Update cart display
    function updateCartDisplay() {
        // Update cart count
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // If other elements don't exist, we can still update the count
        if (!cartItems || !cartSubtotal || !cartTotal) {
            return;
        }
        
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Add items to cart
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center my-3">Tu carrito está vacío</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item d-flex align-items-center py-2';
                cartItem.innerHTML = `
                    <div class="cart-item-image me-2">
                        <img src="${item.image}" alt="${item.name}" width="50" height="50" class="rounded" onerror="this.onerror=null;this.src='imagenes/combo.png';">
                    </div>
                    <div class="cart-item-details flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-1">
                            <div class="quantity-controls d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                            </div>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger remove-item" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
        
        // Update subtotal and total
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        
        // Check minimum purchase
        if (checkoutBtn) {
            if (subtotal >= 5.00) {
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = 'Proceder con la Compra';
            } else {
                checkoutBtn.disabled = true;
                checkoutBtn.textContent = 'Compra mínima: $5.00';
            }
        }
        
        // Add event listeners to quantity buttons
        setupQuantityButtons();
    }
    
    // Setup quantity buttons
    function setupQuantityButtons() {
        // Decrease quantity
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                localStorage.setItem('csabor-cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
        
        // Increase quantity
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                item.quantity += 1;
                
                localStorage.setItem('csabor-cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
        
        // Remove item
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                const id = this.getAttribute('data-id');
                
                cart = cart.filter(item => item.id !== id);
                
                localStorage.setItem('csabor-cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
    
    // Process checkout
    function processCheckout() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Añade productos antes de proceder con la compra.');
            return;
        }
        
        // Create order message for WhatsApp
        let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n";
        
        // Add each item to the message
        cart.forEach(item => {
            message += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        // Add total
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        message += `\nTotal: $${subtotal.toFixed(2)}\n\n`;
        
        // Add customer note
        message += "Por favor, indícame el costo de envío y los métodos de pago disponibles.";
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Clear cart after checkout
        cart = [];
        localStorage.setItem('csabor-cart', JSON.stringify(cart));
        updateCartDisplay();
        
        // Close cart dropdown
        closeCart();
        
        // Open WhatsApp with the message
        window.open(`https://wa.me/+593939352807?text=${encodedMessage}`, '_blank');
    }
    
    // Add to cart function (to be called from product pages)
    // Make sure this is only defined once
    // Add this at the beginning of the cart.js file, outside any function
    let isAddingToCart = false;
    
    // Then modify the addToCart function
    window.addToCart = function(id, name, image, price) {
        // Prevent multiple calls in quick succession
        if (isAddingToCart) {
            console.log("Already adding to cart, ignoring duplicate call");
            return;
        }
        
        isAddingToCart = true;
        
        console.log(`Adding to cart: ${name} (ID: ${id})`);
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                image: image,
                price: parseFloat(price),
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('csabor-cart', JSON.stringify(cart));
        
        // Update cart display (just update the count, don't open the cart)
        updateCartDisplay();
        
        // Remove this section that automatically opens the cart
        // if (cartDropdown) {
        //     cartDropdown.classList.add('show');
        //     backdrop.classList.add('show');
        //     document.body.classList.add('cart-open');
        // }
        
        // Reset the flag after a short delay
        setTimeout(() => {
            isAddingToCart = false;
        }, 300);
    };
    
    // Make updateCart available globally
    window.updateCart = updateCartDisplay;
    
    // Add this at the end of your cart.js file
    
    // Make closeCart available globally for the close button
    window.closeCartModal = function() {
        closeCart();
    };
});