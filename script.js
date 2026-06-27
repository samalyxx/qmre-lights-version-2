// Global variables
let currentProduct = null;
let currentPaymentMethod = null;
let allProducts = [];
let filteredProducts = [];
let cart = [];
let wishlist = [];
let searchTimeout = null;

// Product data
const productsData = [
    {
        id: 1,
        name: 'Modern Crystal Chandelier',
        category: 'chandeliers',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Elegant crystal design with warm LED lighting',
        rating: 5,
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: 'Contemporary LED Chandelier',
        category: 'chandeliers',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Sleek modern design with adjustable brightness',
        rating: 4,
        stock: 12,
        featured: true
    },
    {
        id: 3,
        name: 'Luxury Gold Chandelier',
        category: 'chandeliers',
        price: 52000,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Premium gold finish with crystal accents',
        rating: 5,
        stock: 8,
        featured: true
    },
    {
        id: 4,
        name: 'LED Rope Light 10m',
        category: 'rope-lights',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Flexible LED rope light for decorative lighting',
        rating: 4,
        stock: 50,
        featured: false
    },
    {
        id: 5,
        name: 'Smart LED Switch',
        category: 'switches',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'WiFi-enabled smart switch with app control',
        rating: 4,
        stock: 30,
        featured: false
    },
    {
        id: 6,
        name: 'LED Bulb Pack (5pcs)',
        category: 'bulbs',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Energy-efficient LED bulbs for home lighting',
        rating: 5,
        stock: 100,
        featured: false
    },
    {
        id: 7,
        name: 'Minimalist LED Chandelier',
        category: 'chandeliers',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Clean lines and subtle elegance',
        rating: 4,
        stock: 20,
        featured: false
    },
    {
        id: 8,
        name: 'Vintage Style Chandelier',
        category: 'chandeliers',
        price: 41000,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Classic design with modern LED technology',
        rating: 5,
        stock: 10,
        featured: false
    },
    {
        id: 9,
        name: 'Smart LED Chandelier',
        category: 'chandeliers',
        price: 48000,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'WiFi-enabled with voice control',
        rating: 5,
        stock: 5,
        featured: true
    },
    {
        id: 10,
        name: 'LED Strip Light 5m',
        category: 'rope-lights',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Adhesive LED strip for under-cabinet lighting',
        rating: 4,
        stock: 75,
        featured: false
    },
    {
        id: 11,
        name: 'Touch LED Switch',
        category: 'switches',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Touch-sensitive LED switch with dimming',
        rating: 4,
        stock: 40,
        featured: false
    },
    {
        id: 12,
        name: 'LED Panel Light',
        category: 'bulbs',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Modern panel light for ceiling installation',
        rating: 4,
        stock: 25,
        featured: false
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to elements
    addLoadingAnimations();
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize form handling
    initializeForms();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
    
    // Initialize product interactions
    initializeProductInteractions();
    
    // Initialize e-commerce functionality
    initializeEcommerce();
});

// Add loading animations to elements
function addLoadingAnimations() {
    const elements = document.querySelectorAll('.card, .feature-item, .payment-card, .blog-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('loading');
    });
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('#mainHeader');
    const scrollTarget = navbar || header;
    if (!scrollTarget) return;

    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
            return;
        }
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white', 'shadow');
        } else {
            navbar.classList.remove('bg-white', 'shadow');
        }
    });
}

// Initialize form handling
function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const phone = e.target.querySelector('input[type="tel"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !phone || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Initialize product interactions
function initializeProductInteractions() {
    // Add click event to product cards for more details
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const productName = this.querySelector('.card-title').textContent;
                const productPrice = this.querySelector('.text-warning').textContent;
                showProductDetails(productName, productPrice);
            }
        });
    });
}

// Show product details modal
function showProductDetails(name, price) {
    // You can implement a detailed product modal here
    console.log(`Product: ${name}, Price: ${price}`);
}

// Order product via WhatsApp
function orderProduct(productName, price) {
    currentProduct = {
        name: productName,
        price: price
    };
    
    const message = `Hi! I'm interested in ordering the ${productName} for ${price}. Can you provide more details about availability and delivery?`;
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Open WhatsApp for general inquiries
function openWhatsApp() {
    const message = "Hi! I'm interested in your LED chandeliers. Can you help me choose the perfect one for my space?";
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Show payment modal
function showPaymentModal(paymentMethod) {
    currentPaymentMethod = paymentMethod;
    
    // Set modal content
    document.getElementById('productName').value = currentProduct ? currentProduct.name : 'Select a product first';
    document.getElementById('productPrice').value = currentProduct ? `Rs. ${currentProduct.price.toLocaleString()}` : 'Select a product first';
    document.getElementById('paymentMethod').value = paymentMethod;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
}

// Process payment
function processPayment() {
    const phoneInput = document.querySelector('#paymentModal input[type="tel"]');
    const addressInput = document.querySelector('#paymentModal textarea');
    
    if (!phoneInput.value || !addressInput.value) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!currentProduct) {
        showNotification('Please select a product first', 'error');
        return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        // Simulate successful payment
        showNotification('Payment processed successfully! We\'ll contact you for delivery details.', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('paymentForm').reset();
        
        // Send WhatsApp confirmation
        const message = `Thank you for your order! Product: ${currentProduct.name}, Amount: Rs. ${currentProduct.price.toLocaleString()}, Payment Method: ${currentPaymentMethod}. We'll contact you soon for delivery.`;
        const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add to cart functionality (for future enhancement)
function addToCart(productName, price) {
    // You can implement a shopping cart system here
    showNotification(`${productName} added to cart!`, 'success');
}

// Search functionality (for future enhancement)
function searchProducts(query) {
    // You can implement product search functionality here
    console.log('Searching for:', query);
}

// Filter products by category (for future enhancement)
function filterProducts(category) {
    // You can implement product filtering here
    console.log('Filtering by category:', category);
}

// Newsletter subscription
function subscribeNewsletter(email) {
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    // Simulate subscription
    showNotification('Thank you for subscribing to our newsletter!', 'success');
}

// Subscribe to homepage newsletter
function subscribeHomepageNewsletter() {
    const email = document.getElementById('homepageNewsletterEmail').value;
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    // This would typically send the email to the server
    console.log('Homepage newsletter subscription:', email);
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    document.getElementById('homepageNewsletterEmail').value = '';
}

// Share product on social media
function shareProduct(productName, platform) {
    const url = window.location.href;
    const text = `Check out this amazing ${productName} from QMRE Lights!`;
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-warning position-fixed';
    backToTopBtn.style.cssText = 'bottom: 100px; right: 30px; z-index: 999; width: 50px; height: 50px; border-radius: 50%; display: none;';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initializeBackToTop);

// Analytics tracking (for future enhancement)
function trackEvent(eventName, eventData) {
    // You can implement Google Analytics or other tracking here
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
function trackPageView(pageName) {
    trackEvent('page_view', { page: pageName });
}

// Track product views
function trackProductView(productName) {
    trackEvent('product_view', { product: productName });
}

// Track purchases
function trackPurchase(productName, price) {
    trackEvent('purchase', { product: productName, price: price });
}

// Initialize e-commerce functionality
function initializeEcommerce() {
    allProducts = [...productsData];
    filteredProducts = [...allProducts];
    loadProducts();
    initializeShowcase();
    initializeFilters();
    initializeShowcaseFilters();
    initializeCategoryPills();
    initializeSectorTabs();
    initializeMobileNav();
    initializeCart();
    initializeWishlist();
    initializeSearch();
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Load new arrivals
function loadNewArrivals() {
    const showcaseGrid = document.getElementById('showcaseProductsGrid');
    if (!showcaseGrid) return;
    
    // Get the latest 8 products
    const newArrivals = allProducts.slice(0, 8);
    
    showcaseGrid.innerHTML = '';
    newArrivals.forEach(product => {
        const productCard = createProductCard(product);
        showcaseGrid.appendChild(productCard);
    });
    updateWishlistDisplay();
}

// Initialize showcase
function initializeShowcase() {
    switchShowcaseTab('trending');
}

// Category pill filters on homepage
function initializeCategoryPills() {
    const pills = document.querySelectorAll('.category-pill');
    const cards = document.querySelectorAll('.category-card');
    if (!pills.length) return;

    const activeClasses = ['bg-brand-gold', 'text-brand-dark', 'font-semibold'];
    const inactiveClasses = ['border', 'border-gray-600'];

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => {
                p.classList.remove(...activeClasses);
                inactiveClasses.forEach(cls => p.classList.add(cls));
            });
            pill.classList.add(...activeClasses);
            inactiveClasses.forEach(cls => pill.classList.remove(cls));

            const filter = pill.dataset.filter;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.display = show ? '' : 'none';
            });
        });
    });
}

// Sector Solutions tab screens
function initializeSectorTabs() {
    const tabs = document.querySelectorAll('.sector-tab');
    const panels = document.querySelectorAll('.sector-panel');
    if (!tabs.length || !panels.length) return;

    const activeTabClasses = ['bg-gray-800', 'text-brand-gold', 'font-semibold'];
    const inactiveTabClasses = ['text-gray-400'];

    function showSector(sector) {
        tabs.forEach(tab => {
            const isActive = tab.dataset.sector === sector;
            if (isActive) {
                tab.classList.add(...activeTabClasses);
                tab.classList.remove(...inactiveTabClasses);
            } else {
                tab.classList.remove(...activeTabClasses);
                tab.classList.add(...inactiveTabClasses);
            }
        });

        panels.forEach(panel => {
            panel.classList.toggle('hidden', panel.dataset.sector !== sector);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => showSector(tab.dataset.sector));
    });
}

// Mobile navigation toggle
function initializeMobileNav() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
        });
    });
}

// Switch showcase tab
function switchShowcaseTab(tab) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find the correct button to activate
    const targetButton = document.querySelector(`[onclick="switchShowcaseTab('${tab}')"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // Load products based on tab
    if (tab === 'trending') {
        loadTrendingProducts();
    } else if (tab === 'new-arrivals') {
        loadNewArrivals();
    }
}

// Load trending products
function loadTrendingProducts() {
    const showcaseGrid = document.getElementById('showcaseProductsGrid');
    if (!showcaseGrid) return;
    
    // Get featured products or most popular ones
    let trendingProducts = allProducts.filter(product => product.featured).slice(0, 8);
    
    if (trendingProducts.length === 0) {
        // If no featured products, show first 8 products
        trendingProducts = allProducts.slice(0, 8);
    }
    
    showcaseGrid.innerHTML = '';
    trendingProducts.forEach(product => {
        const productCard = createProductCard(product);
        showcaseGrid.appendChild(productCard);
    });
    updateWishlistDisplay();
}

// Initialize new arrivals filters
function initializeNewArrivalsFilters() {
    const categoryFilter = document.getElementById('newArrivalsCategoryFilter');
    const priceFilter = document.getElementById('newArrivalsPriceFilter');
    const searchFilter = document.getElementById('newArrivalsSearchFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyNewArrivalsFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyNewArrivalsFilters);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', applyNewArrivalsFilters);
    }
}

// Apply new arrivals filters
function applyNewArrivalsFilters() {
    const categoryFilter = document.getElementById('newArrivalsCategoryFilter');
    const priceFilter = document.getElementById('newArrivalsPriceFilter');
    const searchFilter = document.getElementById('newArrivalsSearchFilter');
    
    let newArrivals = allProducts.slice(0, 8); // Get more products for filtering
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        newArrivals = newArrivals.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        newArrivals = newArrivals.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Search filter
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        newArrivals = newArrivals.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Display filtered results
    const newArrivalsGrid = document.getElementById('newArrivalsGrid');
    if (newArrivalsGrid) {
        newArrivalsGrid.innerHTML = '';
        newArrivals.slice(0, 4).forEach(product => {
            const productCard = createProductCard(product);
            newArrivalsGrid.appendChild(productCard);
        });
        updateWishlistDisplay();
    }
}

// Initialize trending filters
function initializeTrendingFilters() {
    const categoryFilter = document.getElementById('trendingCategoryFilter');
    const priceFilter = document.getElementById('trendingPriceFilter');
    const searchFilter = document.getElementById('trendingSearchFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyTrendingFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyTrendingFilters);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', applyTrendingFilters);
    }
}

// Apply trending filters
function applyTrendingFilters() {
    const categoryFilter = document.getElementById('trendingCategoryFilter');
    const priceFilter = document.getElementById('trendingPriceFilter');
    const searchFilter = document.getElementById('trendingSearchFilter');
    
    let trendingProducts = allProducts.filter(product => product.featured);
    if (trendingProducts.length === 0) {
        trendingProducts = allProducts.slice(0, 8);
    }
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        trendingProducts = trendingProducts.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        trendingProducts = trendingProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Search filter
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        trendingProducts = trendingProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Display filtered results
    const trendingProductsGrid = document.getElementById('trendingProductsGrid');
    if (trendingProductsGrid) {
        trendingProductsGrid.innerHTML = '';
        trendingProducts.slice(0, 4).forEach(product => {
            const productCard = createProductCard(product);
            trendingProductsGrid.appendChild(productCard);
        });
        updateWishlistDisplay();
    }
}

// Initialize category filters
function initializeCategoryFilters() {
    const priceFilter = document.getElementById('categoryPriceFilter');
    const sortFilter = document.getElementById('categorySortFilter');
    const searchFilter = document.getElementById('categorySearchFilter');
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyCategoryFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyCategoryFilters);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', applyCategoryFilters);
    }
}

// Show category products
function showCategoryProducts(category) {
    const categoryProductsSection = document.getElementById('categoryProductsSection');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryNav = document.querySelector('.category-nav');
    
    if (categoryProductsSection && categoryTitle) {
        categoryProductsSection.style.display = 'block';
        categoryTitle.textContent = getCategoryDisplayName(category);
        
        // Hide category navigation
        if (categoryNav) {
            categoryNav.style.display = 'none';
        }
        
        // Load category products
        loadCategoryProducts(category);
        
        // Scroll to category section
        categoryProductsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hide category products
function hideCategoryProducts() {
    const categoryProductsSection = document.getElementById('categoryProductsSection');
    const categoryNav = document.querySelector('.category-nav');
    
    if (categoryProductsSection) {
        categoryProductsSection.style.display = 'none';
    }
    
    // Show category navigation
    if (categoryNav) {
        categoryNav.style.display = 'block';
    }
}

// Load category products
function loadCategoryProducts(category) {
    const categoryProductsGrid = document.getElementById('categoryProductsGrid');
    if (!categoryProductsGrid) return;
    
    let categoryProducts = allProducts.filter(product => product.category === category);
    
    // Store current category for filtering
    window.currentCategory = category;
    
    // Display products
    categoryProductsGrid.innerHTML = '';
    categoryProducts.forEach(product => {
        const productCard = createProductCard(product);
        categoryProductsGrid.appendChild(productCard);
    });
    updateWishlistDisplay();
}

// Apply category filters
function applyCategoryFilters() {
    const priceFilter = document.getElementById('categoryPriceFilter');
    const sortFilter = document.getElementById('categorySortFilter');
    const searchFilter = document.getElementById('categorySearchFilter');
    
    let categoryProducts = allProducts.filter(product => product.category === window.currentCategory);
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        categoryProducts = categoryProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Search filter
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        categoryProducts = categoryProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Sort filter
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'price-low':
                categoryProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                categoryProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                categoryProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
                categoryProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    // Display filtered results
    const categoryProductsGrid = document.getElementById('categoryProductsGrid');
    if (categoryProductsGrid) {
        categoryProductsGrid.innerHTML = '';
        categoryProducts.forEach(product => {
            const productCard = createProductCard(product);
            categoryProductsGrid.appendChild(productCard);
        });
        updateWishlistDisplay();
    }
}

// Clear category filters
function clearCategoryFilters() {
    const priceFilter = document.getElementById('categoryPriceFilter');
    const sortFilter = document.getElementById('categorySortFilter');
    const searchFilter = document.getElementById('categorySearchFilter');
    
    if (priceFilter) priceFilter.value = '';
    if (sortFilter) sortFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    // Reload category products
    if (window.currentCategory) {
        loadCategoryProducts(window.currentCategory);
    }
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'chandeliers': 'Chandeliers',
        'rope-lights': 'Rope Lights',
        'switches': 'Switches',
        'bulbs': 'LED Bulbs'
    };
    return categoryNames[category] || category;
}

// Initialize showcase filters
function initializeShowcaseFilters() {
    const categoryFilter = document.getElementById('showcaseCategoryFilter');
    const priceFilter = document.getElementById('showcasePriceFilter');
    const sortFilter = document.getElementById('showcaseSortFilter');
    const searchFilter = document.getElementById('showcaseSearchFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyShowcaseFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyShowcaseFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyShowcaseFilters);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', applyShowcaseFilters);
    }
}

// Apply showcase filters
function applyShowcaseFilters() {
    const categoryFilter = document.getElementById('showcaseCategoryFilter');
    const priceFilter = document.getElementById('showcasePriceFilter');
    const sortFilter = document.getElementById('showcaseSortFilter');
    const searchFilter = document.getElementById('showcaseSearchFilter');
    
    // Get current active tab
    const activeTab = document.querySelector('.tab-btn.active');
    const isTrending = activeTab && activeTab.textContent.includes('Trending');
    
    let products = isTrending ? 
        allProducts.filter(product => product.featured) : 
        allProducts.slice(0, 12);
    
    if (products.length === 0) {
        products = allProducts.slice(0, 12);
    }
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        products = products.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        products = products.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Search filter
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        products = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Sort filter
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
                products.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    // Display filtered results
    const showcaseGrid = document.getElementById('showcaseProductsGrid');
    if (showcaseGrid) {
        showcaseGrid.innerHTML = '';
        products.slice(0, 8).forEach(product => {
            const productCard = createProductCard(product);
            showcaseGrid.appendChild(productCard);
        });
        updateWishlistDisplay();
    }
}

// Load more products
function loadMoreProducts() {
    const showcaseGrid = document.getElementById('showcaseProductsGrid');
    if (!showcaseGrid) return;
    
    // Get current active tab
    const activeTab = document.querySelector('.tab-btn.active');
    const isTrending = activeTab && activeTab.textContent.includes('Trending');
    
    let products = isTrending ? 
        allProducts.filter(product => product.featured) : 
        allProducts;
    
    // Apply current filters
    const categoryFilter = document.getElementById('showcaseCategoryFilter');
    const priceFilter = document.getElementById('showcasePriceFilter');
    const searchFilter = document.getElementById('showcaseSearchFilter');
    
    if (categoryFilter && categoryFilter.value) {
        products = products.filter(product => product.category === categoryFilter.value);
    }
    
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        products = products.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        products = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Add more products to grid
    const currentCount = showcaseGrid.children.length;
    const moreProducts = products.slice(currentCount, currentCount + 4);
    
    moreProducts.forEach(product => {
        const productCard = createProductCard(product);
        showcaseGrid.appendChild(productCard);
    });
    
    // Hide load more button if no more products
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn && currentCount + 4 >= products.length) {
        loadMoreBtn.style.display = 'none';
    }
    
    updateWishlistDisplay();
}

// Navigate to category
function navigateToCategory(category) {
    window.location.href = `/category/${category}`;
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6';
    card.innerHTML = `
        <div class="card product-card hover-gold-border h-100 border-0 shadow-sm">
            <div class="product-image">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <button class="wishlist-btn" onclick="toggleWishlist('${product._id || product.id}')" data-product-id="${product._id || product.id}">
                    <i class="far fa-heart"></i>
                </button>
                <div class="product-overlay">
                    <button class="btn btn-warning btn-sm" onclick="orderProduct('${product.name}', ${product.price})">
                        <i class="fab fa-whatsapp me-1"></i>Order Now
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${product._id || product.id}')">
                        <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title fw-bold">${product.name}</h5>
                <p class="card-text text-muted">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="h5 text-warning mb-0">Rs. ${product.price.toLocaleString()}</span>
                    <div class="rating">
                        ${generateStars(product.rating)}
                    </div>
                </div>
                <div class="mt-2">
                    <small class="text-muted">Stock: ${product.stock} units</small>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                    <a href="/product?id=${product._id || product.id}" class="btn btn-outline-primary btn-sm">
                        <i class="fas fa-eye me-1"></i>View Details
                    </a>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${product._id || product.id}')">
                        <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Generate star ratings
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}

// Initialize filters
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    let filtered = [...allProducts];
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Search filter
    if (searchFilter && searchFilter.value) {
        const query = searchFilter.value.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Sort
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    filteredProducts = filtered;
    loadProducts();
}

// Initialize cart
function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('qmreCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Add to cart
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('qmreCart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    // Update cart modal
    updateCartModal();
}

// Update cart modal
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
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">
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

// Update quantity
function updateQuantity(productId, change) {
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

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('Item removed from cart', 'success');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Close cart modal
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
    
    // Show checkout form
    showCheckoutForm();
}

// Show checkout form
function showCheckoutForm() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const checkoutHTML = `
        <div class="modal fade" id="checkoutModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-credit-card me-2"></i>Checkout
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h6>Customer Information</h6>
                                <form id="checkoutForm">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Full Name</label>
                                            <input type="text" class="form-control" name="name" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" name="email" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone</label>
                                            <input type="tel" class="form-control" name="phone" required>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Address</label>
                                            <textarea class="form-control" name="address" rows="3" required></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-4">
                                <h6>Order Summary</h6>
                                <div class="border rounded p-3">
                                    ${cart.map(item => `
                                        <div class="d-flex justify-content-between mb-2">
                                            <span>${item.name} x${item.quantity}</span>
                                            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    `).join('')}
                                    <hr>
                                    <div class="d-flex justify-content-between fw-bold">
                                        <span>Total:</span>
                                        <span>Rs. ${total.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <h6>Payment Method</h6>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="jazzcash" value="jazzcash" checked>
                                        <label class="form-check-label" for="jazzcash">
                                            <i class="fas fa-mobile-alt text-primary me-2"></i>JazzCash
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="easypaisa" value="easypaisa">
                                        <label class="form-check-label" for="easypaisa">
                                            <i class="fas fa-wallet text-success me-2"></i>EasyPaisa
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="whatsapp" value="whatsapp">
                                        <label class="form-check-label" for="whatsapp">
                                            <i class="fab fa-whatsapp text-success me-2"></i>WhatsApp Order
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="processCheckout()">
                            <i class="fas fa-credit-card me-2"></i>Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('checkoutModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
    
    // Show modal
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

// Initialize wishlist
function initializeWishlist() {
    const savedWishlist = localStorage.getItem('qmreWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// Save wishlist to localStorage
function saveWishlist() {
    localStorage.setItem('qmreWishlist', JSON.stringify(wishlist));
}

// Toggle wishlist item
function toggleWishlist(productId) {
    const product = allProducts.find(p => p._id === productId || p.id === productId);
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification('Added to wishlist', 'success');
    }
    
    saveWishlist();
    updateWishlistDisplay();
}

// Update wishlist display
function updateWishlistDisplay() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(btn => {
        const productId = btn.getAttribute('data-product-id');
        if (wishlist.find(item => item.id === productId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchFilter');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
    }
}

// Perform search
function performSearch(query) {
    if (!query.trim()) {
        applyFilters();
        return;
    }
    
    const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(searchResults);
}

// Display search results
function displaySearchResults(results) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (results.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p class="text-muted">Try adjusting your search terms</p>
            </div>
        `;
    } else {
        productsGrid.innerHTML = results.map(product => createProductCard(product)).join('');
        updateWishlistDisplay();
    }
}

// Process checkout
async function processCheckout() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    const customer = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    try {
        const response = await fetch('/api/cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer,
                items: cart,
                total,
                paymentMethod
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Clear cart
            cart = [];
            saveCart();
            updateCartDisplay();
            
            // Close checkout modal
            const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
            checkoutModal.hide();
            
            if (paymentMethod === 'whatsapp') {
                // Send WhatsApp message
                const message = `New order placed! Order ID: ${result.orderId}, Total: Rs. ${total.toLocaleString()}. Customer: ${customer.name}, Phone: ${customer.phone}`;
                const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            } else {
                // Process payment
                const orderData = {
                    amount: total,
                    orderId: result.orderId,
                    customerName: customer.name,
                    customerEmail: customer.email,
                    customerPhone: customer.phone,
                    customerAddress: customer.address
                };
                
                if (paymentMethod === 'jazzcash') {
                    await processJazzCashPayment(orderData);
                } else if (paymentMethod === 'easypaisa') {
                    await processEasyPaisaPayment(orderData);
                }
            }
            
            showNotification('Order placed successfully!', 'success');
        } else {
            showNotification('Failed to place order. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Checkout failed. Please try again.', 'error');
    }
}

// JazzCash API Integration
async function processJazzCashPayment(orderData) {
    try {
        const response = await fetch('/api/jazzcash/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                merchantId: 'MC12345', // Replace with your merchant ID
                password: 'your_password', // Replace with your password
                returnUrl: 'https://qmrelights.com/payment/return',
                amount: orderData.amount,
                orderId: orderData.orderId,
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                customerPhone: orderData.customerPhone,
                customerAddress: orderData.customerAddress
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Redirect to JazzCash payment page
            window.location.href = result.paymentUrl;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('JazzCash payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
    }
}

// EasyPaisa API Integration
async function processEasyPaisaPayment(orderData) {
    try {
        const response = await fetch('/api/easypaisa/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                merchantId: 'EP67890', // Replace with your merchant ID
                storeId: 'ST12345', // Replace with your store ID
                returnUrl: 'https://qmrelights.com/payment/return',
                amount: orderData.amount,
                orderId: orderData.orderId,
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                customerPhone: orderData.customerPhone,
                customerAddress: orderData.customerAddress
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Redirect to EasyPaisa payment page
            window.location.href = result.paymentUrl;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('EasyPaisa payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
    }
}

// Export functions for global access
window.orderProduct = orderProduct;
window.openWhatsApp = openWhatsApp;
window.showPaymentModal = showPaymentModal;
window.processPayment = processPayment;
window.shareProduct = shareProduct;
window.addToCart = addToCart;
window.processJazzCashPayment = processJazzCashPayment;
window.processEasyPaisaPayment = processEasyPaisaPayment;

// Hero image carousel (auto-rotating with clickable dots)
function initHeroCarousel() {
    const carousel = document.querySelector('[data-purpose="hero-carousel"]');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dots = Array.from(carousel.querySelectorAll('.hero-dot'));
    if (slides.length <= 1) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 5000;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function next() { goTo(current + 1); }

    function start() {
        stop();
        timer = setInterval(next, INTERVAL);
    }

    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            start();
        });
    });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    start();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
    initHeroCarousel();
}
