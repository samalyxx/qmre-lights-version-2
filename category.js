// Category page functionality
let currentCategory = 'all';
let filteredProducts = [];
let currentPage = 1;
let productsPerPage = 12;
let currentViewMode = 'grid';

// Initialize category page
document.addEventListener('DOMContentLoaded', function() {
    initializeCategoryPage();
    initializeFilters();
    initializeCart();
});

// Initialize category page
function initializeCategoryPage() {
    currentCategory = getCategoryFromUrl();
    
    updateCategoryHeader();
    updatePageMeta();
    updateCategorySeoContent();
    loadCategoryProducts();
    
    // Initialize search
    const searchInput = document.getElementById('categorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    
    // Initialize sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // Initialize price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = `Rs. ${(this.value / 1000).toFixed(0)}k`;
            applyFilters();
        });
    }
}

// Parse category from URL path (/category/ceiling-lights) or query (?category=bulbs)
function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryCategory = urlParams.get('category');
    if (queryCategory) return queryCategory;

    const pathMatch = window.location.pathname.match(/\/category\/([^/?]+)/);
    if (pathMatch) return pathMatch[1];

    return 'all';
}

// SEO meta data per category
const categorySeo = {
    'all': {
        title: 'LED Lights Categories Pakistan | Chandeliers, Ceiling Lights, Rope Lights - QMRE Lights',
        description: 'Browse LED lights by category in Pakistan. Shop chandeliers, ceiling lights, rope lights, LED bulbs & switches. Best LED lights price in Pakistan with fast delivery.',
        keywords: 'led lights price in pakistan, led light, led bulbs pakistan, ceiling lights pakistan, rope light price',
        h1: 'All LED Light Categories',
        lead: 'Discover our complete collection of premium LED lighting solutions at the best prices in Pakistan'
    },
    'chandeliers': {
        title: 'LED Chandeliers Price in Pakistan | Premium Chandeliers - QMRE Lights',
        description: 'Shop elegant LED chandeliers in Pakistan. Modern crystal & pendant chandeliers from Rs. 5,000. Free delivery across Pakistan.',
        keywords: 'led chandeliers pakistan, chandelier price pakistan, led light, led lights price in pakistan',
        h1: 'LED Chandeliers Pakistan',
        lead: 'Elegant chandeliers that transform any space into a masterpiece of light and style'
    },
    'ceiling-lights': {
        title: 'Ceiling Lights Price in Pakistan | LED Ceiling Lights - QMRE Lights',
        description: 'Buy premium ceiling lights in Pakistan. Modern LED ceiling lights, flush mount & pendant lights from Rs. 1,200. Fast delivery in Lahore, Karachi & Islamabad.',
        keywords: 'ceiling lights pakistan, ceiling light price, led ceiling lights, led lights price in pakistan, led light',
        h1: 'LED Ceiling Lights Pakistan',
        lead: 'Modern ceiling lights that provide efficient, stylish illumination for every room in your home'
    },
    'rope-lights': {
        title: 'Rope Light Price in Pakistan | LED Rope Lights - QMRE Lights',
        description: 'Best rope light price in Pakistan. Flexible LED rope lights from Rs. 300/meter. Waterproof outdoor rope lights for decoration & accent lighting.',
        keywords: 'rope light price pakistan, rope light, led rope lights, led lights price in pakistan, led light',
        h1: 'LED Rope Lights Pakistan',
        lead: 'Flexible LED rope lights for creative decoration, outdoor lighting, and stunning accent effects'
    },
    'switches': {
        title: 'Smart Switches Price in Pakistan | Modern Light Switches - QMRE Lights',
        description: 'Shop smart switches and modern light switches in Pakistan. Touch switches, dimmer switches & smart home controls at best prices.',
        keywords: 'smart switches pakistan, light switches, led light switches, led lights price in pakistan',
        h1: 'Smart Switches & Controls',
        lead: 'Smart switches and control systems for modern, energy-efficient homes'
    },
    'bulbs': {
        title: 'LED Bulb Price in Pakistan | Best LED Bulbs - QMRE Lights',
        description: 'Best LED bulb price in Pakistan. Energy-efficient LED bulbs from Rs. 150. 9W, 12W, 15W & smart LED bulbs with 2-year warranty. Fast delivery nationwide.',
        keywords: 'led bulb price in pakistan, led bulb price, led light, led lights price in pakistan, energy saving bulbs',
        h1: 'LED Bulb Price in Pakistan',
        lead: 'Energy-efficient LED bulbs for every lighting need — save up to 80% on electricity bills'
    }
};

// Update document title and meta tags for SEO
function updatePageMeta() {
    const seo = categorySeo[currentCategory] || categorySeo['all'];
    document.title = seo.title;

    setMetaTag('description', seo.description);
    setMetaTag('keywords', seo.keywords);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = currentCategory === 'all'
        ? 'https://qmrelights.com/category/all'
        : `https://qmrelights.com/category/${currentCategory}`;
}

function setMetaTag(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
    }
    tag.content = content;
}

// Render SEO-rich content block below products
function updateCategorySeoContent() {
    const container = document.getElementById('categorySeoContent');
    if (!container) return;

    const seoContent = {
        'ceiling-lights': `
            <h2 class="h4 mb-3">Best Ceiling Lights Price in Pakistan</h2>
            <p>Looking for affordable <strong>ceiling lights in Pakistan</strong>? QMRE Lights offers a wide range of modern LED ceiling lights including flush mount ceiling lights, surface mount lights, and decorative pendant ceiling lights. Our ceiling light prices start from just <strong>Rs. 1,200</strong>, making quality LED lighting accessible for every Pakistani home.</p>
            <div class="row g-4 mt-2">
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">Why Choose Our Ceiling Lights?</h3>
                    <ul>
                        <li>Energy-efficient LED technology — save up to 80% on bills</li>
                        <li>Modern designs for living rooms, bedrooms & kitchens</li>
                        <li>Smart ceiling lights with remote control available</li>
                        <li>2-year warranty on all products</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">Ceiling Light Price Guide (PKR)</h3>
                    <ul>
                        <li>Basic LED ceiling light — Rs. 1,200 – 2,500</li>
                        <li>Decorative ceiling light — Rs. 2,500 – 8,000</li>
                        <li>Smart ceiling light — Rs. 3,500 – 12,000</li>
                        <li>Premium designer ceiling light — Rs. 8,000+</li>
                    </ul>
                </div>
            </div>`,
        'bulbs': `
            <h2 class="h4 mb-3">LED Bulb Price in Pakistan — Updated 2024</h2>
            <p>Find the best <strong>LED bulb price in Pakistan</strong> at QMRE Lights. We stock a complete range of energy-saving LED bulbs from 5W to 20W, including smart WiFi-enabled bulbs. Whether you need bulbs for home, office, or commercial use, our <strong>LED light</strong> collection delivers premium quality at competitive prices.</p>
            <div class="row g-4 mt-2">
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">LED Bulb Price List (PKR)</h3>
                    <ul>
                        <li>5W LED Bulb — Rs. 150 – 250</li>
                        <li>9W LED Bulb — Rs. 250 – 400</li>
                        <li>12W LED Bulb — Rs. 350 – 500</li>
                        <li>15W LED Bulb — Rs. 400 – 600</li>
                        <li>20W LED Bulb — Rs. 550 – 800</li>
                        <li>Smart LED Bulb — Rs. 800 – 2,500</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">Benefits of LED Bulbs</h3>
                    <ul>
                        <li>Last up to 25,000 hours — 25× longer than incandescent</li>
                        <li>Instant brightness with no warm-up time</li>
                        <li>Available in warm white, cool white & daylight</li>
                        <li>Eco-friendly — no mercury, low heat emission</li>
                    </ul>
                </div>
            </div>`,
        'rope-lights': `
            <h2 class="h4 mb-3">Rope Light Price in Pakistan</h2>
            <p>Decorate your home, shop, or event with our premium <strong>LED rope lights</strong>. QMRE Lights offers the most competitive <strong>rope light price in Pakistan</strong>, starting from just <strong>Rs. 300 per meter</strong>. Perfect for weddings, Eid decorations, outdoor patios, and accent lighting.</p>
            <div class="row g-4 mt-2">
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">Rope Light Types & Prices</h3>
                    <ul>
                        <li>Standard LED rope light — Rs. 300 – 500/meter</li>
                        <li>Waterproof outdoor rope light — Rs. 500 – 800/meter</li>
                        <li>RGB color-changing rope light — Rs. 600 – 1,000/meter</li>
                        <li>Neon flex rope light — Rs. 800 – 1,500/meter</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h3 class="h6 fw-bold">Popular Uses for Rope Lights</h3>
                    <ul>
                        <li>Home & room decoration</li>
                        <li>Shop signage & display lighting</li>
                        <li>Wedding & event decoration</li>
                        <li>Outdoor garden & patio lighting</li>
                    </ul>
                </div>
            </div>`,
        'chandeliers': `
            <h2 class="h4 mb-3">LED Chandeliers Price in Pakistan</h2>
            <p>Elevate your home with our stunning collection of <strong>LED chandeliers in Pakistan</strong>. From crystal chandeliers for dining rooms to modern minimalist designs for living spaces, QMRE Lights offers premium chandeliers at prices starting from <strong>Rs. 5,000</strong>.</p>`,
        'switches': `
            <h2 class="h4 mb-3">Smart Switches & Light Controls in Pakistan</h2>
            <p>Upgrade your home with modern <strong>smart switches and light controls</strong>. Touch-sensitive panels, dimmer switches, and WiFi-enabled smart switches for complete lighting control from your phone.</p>`,
        'all': `
            <h2 class="h4 mb-3">LED Lights Price in Pakistan — Shop by Category</h2>
            <p>Welcome to QMRE Lights, Pakistan's trusted online store for premium <strong>LED lights</strong>. Browse our categories to find the best <strong>LED lights price in Pakistan</strong> — from affordable LED bulbs starting at Rs. 150 to elegant chandeliers and decorative rope lights. We deliver across Lahore, Karachi, Islamabad, and all major cities.</p>
            <div class="row g-3 mt-2">
                <div class="col-md-4"><a href="/category/bulbs" class="text-decoration-none"><strong>LED Bulbs</strong> — from Rs. 150</a></div>
                <div class="col-md-4"><a href="/category/ceiling-lights" class="text-decoration-none"><strong>Ceiling Lights</strong> — from Rs. 1,200</a></div>
                <div class="col-md-4"><a href="/category/rope-lights" class="text-decoration-none"><strong>Rope Lights</strong> — from Rs. 300/m</a></div>
            </div>`
    };

    const content = seoContent[currentCategory] || seoContent['all'];
    container.innerHTML = content;
    container.style.display = content ? 'block' : 'none';
}

// Update category header
function updateCategoryHeader() {
    const seo = categorySeo[currentCategory] || categorySeo['all'];
    
    const categoryNames = {
        'all': 'All Categories',
        'chandeliers': 'Chandeliers',
        'ceiling-lights': 'Ceiling Lights',
        'rope-lights': 'Rope Lights',
        'switches': 'Switches',
        'bulbs': 'LED Bulbs'
    };
    
    const title = document.getElementById('categoryTitle');
    const description = document.getElementById('categoryDescription');
    const breadcrumb = document.getElementById('categoryBreadcrumb');
    
    if (title) title.textContent = seo.h1 || categoryNames[currentCategory];
    if (description) description.textContent = seo.lead;
    if (breadcrumb) breadcrumb.textContent = categoryNames[currentCategory] || 'Categories';
    
    // Pre-check the active category filter
    if (currentCategory !== 'all') {
        const checkbox = document.querySelector(`input[type="checkbox"][value="${currentCategory}"]`);
        if (checkbox) checkbox.checked = true;
    }
}

// Load category products
function loadCategoryProducts() {
    let products = allProducts;
    
    // Filter by category if not 'all'
    if (currentCategory !== 'all') {
        products = allProducts.filter(product => product.category === currentCategory);
    }
    
    filteredProducts = [...products];
    currentPage = 1;
    
    displayProducts();
    updateProductCount();
}

// Display products
function displayProducts() {
    const grid = document.getElementById('categoryProductsGrid');
    if (!grid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (currentPage === 1) {
        grid.innerHTML = '';
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = endIndex >= filteredProducts.length ? 'none' : 'block';
    }
    
    updateWishlistDisplay();
}

// Load more products
function loadMoreCategoryProducts() {
    currentPage++;
    displayProducts();
}

// Initialize filters
function initializeFilters() {
    // Category checkboxes
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Rating checkboxes
    const ratingCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="rating"]');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

// Apply filters
function applyFilters() {
    let products = allProducts;
    
    // Category filter
    const selectedCategories = getSelectedCategories();
    if (selectedCategories.length > 0) {
        products = products.filter(product => selectedCategories.includes(product.category));
    }
    
    // Price filter
    const maxPrice = document.getElementById('priceRange').value;
    if (maxPrice > 0) {
        products = products.filter(product => product.price <= maxPrice);
    }
    
    // Rating filter
    const selectedRatings = getSelectedRatings();
    if (selectedRatings.length > 0) {
        products = products.filter(product => {
            return selectedRatings.some(rating => product.rating >= rating);
        });
    }
    
    // Search filter
    const searchQuery = document.getElementById('categorySearch').value.toLowerCase();
    if (searchQuery) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    // Sort
    const sortValue = document.getElementById('sortSelect').value;
    if (sortValue) {
        products = sortProducts(products, sortValue);
    }
    
    filteredProducts = products;
    currentPage = 1;
    displayProducts();
    updateProductCount();
}

// Get selected categories
function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][value]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Get selected ratings
function getSelectedRatings() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="rating"]:checked');
    return Array.from(checkboxes).map(cb => parseInt(cb.value));
}

// Sort products
function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch (sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        default:
            return sorted;
    }
}

// Clear all filters
function clearAllFilters() {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 25000;
        document.getElementById('priceValue').textContent = 'Rs. 25k';
    }
    
    // Reset search
    const searchInput = document.getElementById('categorySearch');
    if (searchInput) searchInput.value = '';
    
    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = '';
    
    // Reload products
    loadCategoryProducts();
}

// Set view mode
function setViewMode(mode) {
    currentViewMode = mode;
    const grid = document.getElementById('categoryProductsGrid');
    const buttons = document.querySelectorAll('.view-toggle .btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update grid class
    if (grid) {
        grid.className = `row g-4 ${mode === 'list' ? 'list-view' : ''}`;
    }
    
    // Redisplay products
    displayProducts();
}

// Update product count
function updateProductCount() {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navigate to category
function navigateToCategory(category) {
    window.location.href = `/category/${category}`;
} 