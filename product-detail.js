// Product Detail Page JavaScript
let currentProduct = null;
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    loadProductDetail();
});

// Load product detail
async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showError('Product not found');
        return;
    }
    
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        
        const product = await response.json();
        currentProduct = product;
        displayProductDetail(product);
        loadRelatedProducts(product.category, productId);
        updateSEO(product);
    } catch (error) {
        console.error('Error loading product:', error);
        showError('Failed to load product details');
    }
}

// Display product detail
function displayProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    const breadcrumbProduct = document.getElementById('breadcrumbProduct');
    
    breadcrumbProduct.textContent = product.name;
    
    // Generate product images (multiple images if available)
    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
    const imageGallery = generateImageGallery(productImages);
    
    // Generate specifications
    const specifications = generateSpecifications(product);
    
    // Generate customer reviews
    const reviews = generateCustomerReviews(product);
    
    productDetail.innerHTML = `
        <div class="col-lg-6">
            <div class="product-gallery">
                ${imageGallery}
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-info">
                <h1 class="mb-3">${product.name}</h1>
                <div class="mb-3">
                    <span class="h3 text-primary fw-bold">Rs. ${product.price.toLocaleString()}</span>
                    ${product.stock > 0 ? 
                        `<span class="badge bg-success ms-2">In Stock (${product.stock})</span>` : 
                        `<span class="badge bg-danger ms-2">Out of Stock</span>`
                    }
                </div>
                
                <div class="mb-3">
                    ${generateStars(product.rating)}
                    <span class="ms-2">(${product.rating}/5)</span>
                    <span class="ms-2 text-muted">• ${product.reviewCount || 0} reviews</span>
                </div>
                
                <div class="mb-4">
                    <p class="text-muted">${product.description}</p>
                </div>
                
                <div class="mb-4">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Quantity</label>
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(-1)">-</button>
                                <input type="number" class="form-control text-center" id="quantity" value="1" min="1" max="${product.stock}">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(1)">+</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Category</label>
                            <div class="form-control-plaintext">
                                <span class="badge bg-secondary">${product.category.replace('-', ' ').toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" onclick="addToCart()" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                    <button class="btn btn-outline-primary" onclick="buyNow()" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-bolt me-2"></i>Buy Now
                    </button>
                </div>
                
                <div class="mt-4">
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shipping-fast text-primary me-2"></i>
                                <div>
                                    <small class="d-block">Free Shipping</small>
                                    <small class="text-muted">On orders above Rs. 10,000</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shield-alt text-primary me-2"></i>
                                <div>
                                    <small class="d-block">1 Year Warranty</small>
                                    <small class="text-muted">Full manufacturer warranty</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Product Specifications -->
        <div class="col-12 mt-5">
            <div class="product-specifications">
                <h3 class="mb-4">Product Specifications</h3>
                ${specifications}
            </div>
        </div>
        
        <!-- Customer Reviews -->
        <div class="col-12 mt-5">
            <div class="customer-reviews">
                <h3 class="mb-4">Customer Reviews</h3>
                ${reviews}
            </div>
        </div>
        
        <!-- You May Also Like -->
        <div class="col-12 mt-5">
            <div class="recommendations">
                <h3 class="mb-4">You May Also Like</h3>
                <div class="row g-4" id="recommendationsGrid">
                    <!-- Recommendations will be loaded here -->
                </div>
            </div>
        </div>
        
        <!-- Newsletter Subscription -->
        <div class="col-12 mt-5">
            <div class="newsletter-section bg-light p-4 rounded">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h4 class="mb-2">Stay Updated with QMRE Lights</h4>
                        <p class="mb-0 text-muted">Get the latest product updates, exclusive offers, and lighting tips delivered to your inbox.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input type="email" class="form-control" id="newsletterEmail" placeholder="Enter your email">
                            <button class="btn btn-primary" onclick="subscribeNewsletter()">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load recommendations
    loadRecommendations(product.category, product._id || product.id);
}

// Generate image gallery
function generateImageGallery(images) {
    if (images.length === 1) {
        return `
            <div class="main-image">
                <img src="${images[0]}" alt="Product" class="img-fluid rounded shadow" id="mainImage">
            </div>
        `;
    }
    
    const thumbnailImages = images.map((img, index) => `
        <div class="col-3 mb-2">
            <img src="${img}" alt="Product ${index + 1}" class="img-fluid rounded thumbnail-image ${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${img}', this)" style="cursor: pointer;">
        </div>
    `).join('');
    
    return `
        <div class="main-image mb-3">
            <img src="${images[0]}" alt="Product" class="img-fluid rounded shadow" id="mainImage">
        </div>
        <div class="thumbnail-gallery">
            <div class="row">
                ${thumbnailImages}
            </div>
        </div>
    `;
}

// Change main image
function changeMainImage(imageSrc, thumbnailElement) {
    document.getElementById('mainImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-image').forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

// Generate specifications
function generateSpecifications(product) {
    const specs = product.specifications || {
        'Power': '15W',
        'Voltage': '220-240V',
        'Color Temperature': '3000K-6500K',
        'Lifetime': '25,000 hours',
        'Material': 'Aluminum + Glass',
        'Dimensions': '60cm x 60cm x 20cm',
        'Weight': '2.5kg',
        'Warranty': '1 Year',
        'Certification': 'CE, RoHS',
        'Installation': 'Ceiling Mount'
    };
    
    const specsHTML = Object.entries(specs).map(([key, value]) => `
        <div class="col-md-6 mb-3">
            <div class="spec-item">
                <strong class="text-muted">${key}:</strong>
                <span class="ms-2">${value}</span>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="row">
            ${specsHTML}
        </div>
    `;
}

// Generate customer reviews
function generateCustomerReviews(product) {
    const reviews = product.reviews || [
        {
            id: 1,
            customerName: 'Ahmed Khan',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent quality! The chandelier looks even better in person. Installation was easy and the lighting is perfect for our living room.',
            verified: true
        },
        {
            id: 2,
            customerName: 'Fatima Ali',
            rating: 4,
            date: '2024-01-10',
            comment: 'Beautiful design and good quality. The LED lights are bright and energy efficient. Highly recommended!',
            verified: true
        },
        {
            id: 3,
            customerName: 'Muhammad Hassan',
            rating: 5,
            date: '2024-01-08',
            comment: 'Amazing product! Fast delivery and excellent customer service. The chandelier adds elegance to our dining room.',
            verified: true
        }
    ];
    
    const reviewsHTML = reviews.map(review => `
        <div class="review-item border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <h6 class="mb-1">${review.customerName}</h6>
                    <div class="mb-1">
                        ${generateStars(review.rating)}
                        <span class="ms-2 text-muted">${new Date(review.date).toLocaleDateString()}</span>
                        ${review.verified ? '<span class="badge bg-success ms-2">Verified Purchase</span>' : ''}
                    </div>
                </div>
            </div>
            <p class="mb-0">${review.comment}</p>
        </div>
    `).join('');
    
    return `
        <div class="reviews-container">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 class="mb-1">Customer Reviews</h5>
                    <p class="text-muted mb-0">${reviews.length} reviews</p>
                </div>
                <button class="btn btn-outline-primary" onclick="showReviewForm()">
                    <i class="fas fa-plus me-2"></i>Write a Review
                </button>
            </div>
            ${reviewsHTML}
        </div>
    `;
}

// Load recommendations
async function loadRecommendations(category, excludeId) {
    try {
        const response = await fetch(`/api/products?category=${category}&limit=4&exclude=${excludeId}`);
        const products = await response.json();
        
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        
        if (products.length === 0) {
            recommendationsGrid.innerHTML = '<div class="col-12 text-center"><p>No recommendations available.</p></div>';
            return;
        }
        
        recommendationsGrid.innerHTML = products.map(product => `
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" class="card-img-top">
                        <button class="wishlist-btn" onclick="toggleWishlist('${product._id || product.id}')" data-product-id="${product._id || product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text text-primary fw-bold">Rs. ${product.price.toLocaleString()}</p>
                        <div class="d-flex justify-content-between">
                            <a href="/product?id=${product._id || product.id}" class="btn btn-sm btn-outline-primary">View Details</a>
                            <button class="btn btn-sm btn-primary" onclick="addToCart('${product._id || product.id}')">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        updateWishlistDisplay();
    } catch (error) {
        console.error('Error loading recommendations:', error);
    }
}

// Show review form
function showReviewForm() {
    const reviewFormHTML = `
        <div class="modal fade" id="reviewModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Write a Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="reviewForm">
                            <div class="mb-3">
                                <label class="form-label">Rating</label>
                                <div class="rating-input">
                                    <i class="far fa-star" data-rating="1"></i>
                                    <i class="far fa-star" data-rating="2"></i>
                                    <i class="far fa-star" data-rating="3"></i>
                                    <i class="far fa-star" data-rating="4"></i>
                                    <i class="far fa-star" data-rating="5"></i>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Your Review</label>
                                <textarea class="form-control" rows="4" placeholder="Share your experience with this product..."></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitReview()">Submit Review</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('reviewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', reviewFormHTML);
    
    // Show modal
    const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
    reviewModal.show();
    
    // Initialize rating stars
    initializeRatingStars();
}

// Initialize rating stars
function initializeRatingStars() {
    const stars = document.querySelectorAll('.rating-input i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            highlightStars(rating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-rating');
            highlightStars(selectedRating);
        });
    });
    
    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        highlightStars(selectedRating);
    });
}

// Highlight stars
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'text-warning');
        } else {
            star.classList.remove('fas', 'text-warning');
            star.classList.add('far');
        }
    });
}

// Submit review
function submitReview() {
    // This would typically send the review to the server
    showNotification('Review submitted successfully!', 'success');
    
    // Close modal
    const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    reviewModal.hide();
}

// Subscribe to newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    // This would typically send the email to the server
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    document.getElementById('newsletterEmail').value = '';
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}

// Update quantity
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    const newQuantity = parseInt(quantityInput.value) + change;
    const maxStock = currentProduct.stock;
    
    if (newQuantity >= 1 && newQuantity <= maxStock) {
        quantityInput.value = newQuantity;
    }
}

// Add to cart
function addToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === currentProduct._id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct._id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification('Product added to cart!', 'success');
}

// Buy now
function buyNow() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Clear cart and add only this product
    cart = [{
        id: currentProduct._id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity: quantity
    }];
    
    saveCart();
    updateCartDisplay();
    
    // Show checkout form
    showCheckoutForm();
}

// Load related products
async function loadRelatedProducts(category, excludeId) {
    try {
        const response = await fetch(`/api/products?category=${category}&limit=4&exclude=${excludeId}`);
        const products = await response.json();
        
        const relatedProductsContainer = document.getElementById('relatedProducts');
        
        if (products.length === 0) {
            relatedProductsContainer.innerHTML = '<div class="col-12 text-center"><p>No related products found.</p></div>';
            return;
        }
        
        relatedProductsContainer.innerHTML = products.map(product => `
            <div class="col-lg-3 col-md-6">
                <div class="card h-100 product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" class="card-img-top">
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text text-primary fw-bold">Rs. ${product.price.toLocaleString()}</p>
                        <div class="d-flex justify-content-between">
                            <a href="/product.html?id=${product._id}" class="btn btn-sm btn-outline-primary">View Details</a>
                            <button class="btn btn-sm btn-primary" onclick="quickAddToCart('${product._id}')">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading related products:', error);
    }
}

// Quick add to cart
function quickAddToCart(productId) {
    // This would need to fetch product details first
    showNotification('Product added to cart!', 'success');
}

// Update SEO
function updateSEO(product) {
    // Update title
    document.title = `${product.name} - QMRE Lights`;
    document.getElementById('productTitle').textContent = `${product.name} - QMRE Lights`;
    
    // Update meta description
    const description = product.description.substring(0, 160) + '...';
    document.getElementById('productDescription').content = description;
    document.getElementById('ogDescription').content = description;
    document.getElementById('twitterDescription').content = description;
    
    // Update meta titles
    document.getElementById('ogTitle').content = `${product.name} - QMRE Lights`;
    document.getElementById('twitterTitle').content = `${product.name} - QMRE Lights`;
    
    // Update images
    document.getElementById('ogImage').content = product.image;
    document.getElementById('twitterImage').content = product.image;
    
    // Update URL
    const currentUrl = window.location.href;
    document.getElementById('ogUrl').content = currentUrl;
    
    // Update schema markup
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "brand": {
            "@type": "Brand",
            "name": "QMRE Lights"
        },
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "PKR",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": Math.floor(product.rating * 10)
        }
    };
    
    document.getElementById('schemaMarkup').textContent = JSON.stringify(schemaMarkup, null, 2);
}

// Cart functions (reused from main script)
function initializeCart() {
    const savedCart = localStorage.getItem('qmreCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('qmreCart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    updateCartModal();
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.style.display = 'block';
        cartTotal.textContent = 'Rs. 0';
        checkoutBtn.disabled = true;
    } else {
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;
        
        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item d-flex align-items-center mb-3 p-3 border rounded">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="mb-1 text-muted">Rs. ${item.price.toLocaleString()}</p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                            <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart('${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="text-end">
                        <h6 class="mb-0">Rs. ${itemTotal.toLocaleString()}</h6>
                    </div>
                </div>
            `;
        }).join('');
        
        cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
    }
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('Item removed from cart', 'success');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
    showCheckoutForm();
}

function showCheckoutForm() {
    // This function is defined in script.js
    if (typeof window.showCheckoutForm === 'function') {
        window.showCheckoutForm();
    } else {
        // Fallback to redirect to main page
        window.location.href = '/#checkout';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showError(message) {
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="col-12 text-center">
            <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
            <h3>Product Not Found</h3>
            <p class="text-muted">${message}</p>
            <a href="/" class="btn btn-primary">Go to Homepage</a>
        </div>
    `;
} 