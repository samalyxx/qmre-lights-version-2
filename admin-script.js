// Admin Dashboard JavaScript

// Global variables
let currentSection = 'dashboard';
let products = [];
let orders = [];
let customers = [];

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    loadSampleData();
    initializeEventListeners();
    loadProducts();
    loadOrders();
    loadCustomers();
});

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Sidebar toggle for mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = getSectionTitle(sectionName);
        }
    }
}

// Get section title
function getSectionTitle(section) {
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'Product Management',
        'orders': 'Order Management',
        'customers': 'Customer Management',
        'payments': 'Payment Management',
        'analytics': 'Analytics & Reports',
        'settings': 'Store Settings'
    };
    return titles[section] || 'Dashboard';
}

// Initialize charts
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rs. ' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Products Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
        new Chart(productsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Chandeliers', 'Rope Lights', 'Switches', 'LED Bulbs'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c',
                        '#f39c12',
                        '#27ae60'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'bar',
            data: {
                labels: ['Chandeliers', 'Rope Lights', 'Switches', 'LED Bulbs'],
                datasets: [{
                    label: 'Revenue',
                    data: [450000, 320000, 180000, 150000],
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c',
                        '#f39c12',
                        '#27ae60'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rs. ' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Payment Chart
    const paymentCtx = document.getElementById('paymentChart');
    if (paymentCtx) {
        new Chart(paymentCtx, {
            type: 'pie',
            data: {
                labels: ['JazzCash', 'EasyPaisa', 'WhatsApp Orders'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: [
                        '#27ae60',
                        '#3498db',
                        '#25d366'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Load sample data
function loadSampleData() {
    // Sample products data
    products = [
        {
            id: 1,
            name: 'Modern Crystal Chandelier',
            category: 'chandeliers',
            price: 45000,
            stock: 15,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            name: 'LED Rope Light 10m',
            category: 'rope-lights',
            price: 8500,
            stock: 50,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            name: 'Smart LED Switch',
            category: 'switches',
            price: 3200,
            stock: 30,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 4,
            name: 'LED Bulb Pack (5pcs)',
            category: 'bulbs',
            price: 1200,
            stock: 100,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];
    
    // Sample orders data
    orders = [
        {
            id: 'QMRE001',
            customer: 'Ahmed Khan',
            products: ['Modern Crystal Chandelier'],
            total: 45000,
            paymentMethod: 'JazzCash',
            status: 'completed',
            date: '2024-01-15'
        },
        {
            id: 'QMRE002',
            customer: 'Fatima Ali',
            products: ['LED Rope Light 10m'],
            total: 8500,
            paymentMethod: 'EasyPaisa',
            status: 'pending',
            date: '2024-01-14'
        },
        {
            id: 'QMRE003',
            customer: 'Usman Hassan',
            products: ['Smart LED Switch'],
            total: 3200,
            paymentMethod: 'WhatsApp',
            status: 'processing',
            date: '2024-01-13'
        }
    ];
    
    // Sample customers data
    customers = [
        {
            id: 1,
            name: 'Ahmed Khan',
            email: 'ahmed@email.com',
            phone: '+92 300 1234567',
            orders: 5,
            totalSpent: 125000,
            joined: '2023-06-15'
        },
        {
            id: 2,
            name: 'Fatima Ali',
            email: 'fatima@email.com',
            phone: '+92 301 2345678',
            orders: 3,
            totalSpent: 45000,
            joined: '2023-08-20'
        },
        {
            id: 3,
            name: 'Usman Hassan',
            email: 'usman@email.com',
            phone: '+92 302 3456789',
            orders: 2,
            totalSpent: 15000,
            joined: '2023-10-10'
        }
    ];
}

// Initialize event listeners
function initializeEventListeners() {
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterProducts);
    }
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6';
    card.innerHTML = `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <h5 class="product-title">${product.name}</h5>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                <div class="product-stats">
                    <span class="product-stock">Stock: ${product.stock}</span>
                    <span class="product-status ${product.status}">${product.status}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewProduct(${product.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="toggleProductStatus(${product.id})">
                        ${product.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Get category name
function getCategoryName(category) {
    const categories = {
        'chandeliers': 'Chandeliers',
        'ceiling-lights': 'Ceiling Lights',
        'rope-lights': 'Rope Lights',
        'switches': 'Switches',
        'bulbs': 'LED Bulbs'
    };
    return categories[category] || category;
}

// Load orders
function loadOrders() {
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (!ordersTableBody) return;
    
    ordersTableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products.join(', ')}</td>
            <td>Rs. ${order.total.toLocaleString()}</td>
            <td>${order.paymentMethod}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewOrder('${order.id}')">View</button>
                <button class="btn btn-sm btn-success" onclick="updateOrderStatus('${order.id}')">Update</button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Load customers
function loadCustomers() {
    const customersTableBody = document.getElementById('customersTableBody');
    if (!customersTableBody) return;
    
    customersTableBody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>Rs. ${customer.totalSpent.toLocaleString()}</td>
            <td>${customer.joined}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewCustomer(${customer.id})">View</button>
                <button class="btn btn-sm btn-warning" onclick="editCustomer(${customer.id})">Edit</button>
            </td>
        `;
        customersTableBody.appendChild(row);
    });
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'completed': 'success',
        'pending': 'warning',
        'processing': 'info',
        'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
}

// Handle add product
function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newProduct = {
        id: products.length + 1,
        name: formData.get('name') || 'New Product',
        category: formData.get('category') || 'chandeliers',
        price: parseInt(formData.get('price')) || 0,
        stock: parseInt(formData.get('stock')) || 0,
        status: formData.get('status') || 'active',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    };
    
    products.push(newProduct);
    loadProducts();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    
    // Reset form
    e.target.reset();
    
    showNotification('Product added successfully!', 'success');
}

// Handle search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (currentSection === 'products') {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        displayFilteredProducts(filteredProducts);
    }
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    let filteredProducts = products;
    
    if (categoryFilter.value) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
    }
    
    if (statusFilter.value) {
        filteredProducts = filteredProducts.filter(product => product.status === statusFilter.value);
    }
    
    displayFilteredProducts(filteredProducts);
}

// Display filtered products
function displayFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="col-12 text-center"><p>No products found.</p></div>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Product actions
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showEditProductModal(product);
    }
}

// Show edit product modal
function showEditProductModal(product) {
    const modalHTML = `
        <div class="modal fade" id="editProductModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editProductForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Product Name</label>
                                    <input type="text" class="form-control" name="name" value="${product.name}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Category</label>
                                    <select class="form-select" name="category" required>
                                        <option value="chandeliers" ${product.category === 'chandeliers' ? 'selected' : ''}>Chandeliers</option>
                                        <option value="ceiling-lights" ${product.category === 'ceiling-lights' ? 'selected' : ''}>Ceiling Lights</option>
                                        <option value="rope-lights" ${product.category === 'rope-lights' ? 'selected' : ''}>Rope Lights</option>
                                        <option value="switches" ${product.category === 'switches' ? 'selected' : ''}>Switches</option>
                                        <option value="bulbs" ${product.category === 'bulbs' ? 'selected' : ''}>LED Bulbs</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Price (PKR)</label>
                                    <input type="number" class="form-control" name="price" value="${product.price}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Stock Quantity</label>
                                    <input type="number" class="form-control" name="stock" value="${product.stock}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Rating</label>
                                    <input type="number" class="form-control" name="rating" value="${product.rating}" min="0" max="5" step="0.1" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Status</label>
                                    <select class="form-select" name="status">
                                        <option value="active" ${product.status === 'active' ? 'selected' : ''}>Active</option>
                                        <option value="inactive" ${product.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Image URL</label>
                                    <input type="url" class="form-control" name="image" value="${product.image}" required>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" name="description" rows="3" required>${product.description}</textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="featured" id="featured" ${product.featured ? 'checked' : ''}>
                                        <label class="form-check-label" for="featured">
                                            Featured Product
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveProductEdit('${product.id}')">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('editProductModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editModal.show();
}

// Save product edit
async function saveProductEdit(productId) {
    const form = document.getElementById('editProductForm');
    const formData = new FormData(form);
    
    const updatedProduct = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        rating: parseFloat(formData.get('rating')),
        status: formData.get('status'),
        image: formData.get('image'),
        description: formData.get('description'),
        featured: formData.get('featured') === 'on'
    };
    
    try {
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        });
        
        if (response.ok) {
            // Update local product data
            const productIndex = products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedProduct };
            }
            
            // Close modal
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
            editModal.hide();
            
            // Reload products
            loadProducts();
            showNotification('Product updated successfully!', 'success');
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        showNotification('Failed to update product. Please try again.', 'error');
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        loadProducts();
        showNotification('Product deleted successfully!', 'success');
    }
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Open product detail page in new tab
        window.open(`/product?id=${product._id || product.id}`, '_blank');
    }
}

function toggleProductStatus(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.status = product.status === 'active' ? 'inactive' : 'active';
        loadProducts();
        showNotification(`Product ${product.status} successfully!`, 'success');
    }
}

// Order actions
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        showNotification(`Viewing order: ${order.id}`, 'info');
        // Implement view functionality
    }
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const newStatus = prompt('Enter new status (completed/pending/processing/cancelled):', order.status);
        if (newStatus && ['completed', 'pending', 'processing', 'cancelled'].includes(newStatus)) {
            order.status = newStatus;
            loadOrders();
            showNotification(`Order status updated to: ${newStatus}`, 'success');
        }
    }
}

// Customer actions
function viewCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        showNotification(`Viewing customer: ${customer.name}`, 'info');
        // Implement view functionality
    }
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        showNotification(`Editing customer: ${customer.name}`, 'info');
        // Implement edit functionality
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for global access
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.viewProduct = viewProduct;
window.toggleProductStatus = toggleProductStatus;
window.saveProductEdit = saveProductEdit;
window.viewOrder = viewOrder;
window.updateOrderStatus = updateOrderStatus;
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer; 