require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectDB, Product, Order, Customer } = require('./database');
const { authenticateAdmin, loginAdmin, createDefaultAdmin } = require('./auth');
const paymentRoutes = require('./payment-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB, then create default admin
connectDB().then((connected) => {
    if (connected) {
        createDefaultAdmin();
    }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Routes
app.use('/api', paymentRoutes);

// Serve main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin routes with authentication
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Product detail page
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'product.html'));
});

// Category pages
app.get('/category', (req, res) => {
    res.sendFile(path.join(__dirname, 'category.html'));
});

app.get('/category/:category', (req, res) => {
    res.sendFile(path.join(__dirname, 'category.html'));
});

// Admin login API
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginAdmin(username, password);
        
        if (result.success) {
            res.cookie('adminToken', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
            res.json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.json({ success: true, message: 'Logged out successfully' });
});

// API Routes for products
app.get('/api/products', async (req, res) => {
    try {
        const { category, limit, exclude } = req.query;
        let query = { status: 'active' };
        
        if (category) {
            query.category = category;
        }
        
        if (exclude) {
            query._id = { $ne: exclude };
        }
        
        let productsQuery = Product.find(query);
        
        if (limit) {
            productsQuery = productsQuery.limit(parseInt(limit));
        }
        
        const products = await productsQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Admin API Routes (protected)
app.get('/api/admin/products', authenticateAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Cart and Order API Routes
app.post('/api/cart/checkout', async (req, res) => {
    try {
        const { customer, items, total, paymentMethod } = req.body;
        
        // Create or find customer
        let customerDoc = await Customer.findOne({ email: customer.email });
        if (!customerDoc) {
            customerDoc = new Customer({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
            });
            await customerDoc.save();
        }
        
        // Create order
        const order = new Order({
            orderId: `QMRE${Date.now()}`,
            customer: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
            },
            items: items,
            total: total,
            paymentMethod: paymentMethod
        });
        
        await order.save();
        
        // Update customer stats
        customerDoc.totalOrders += 1;
        customerDoc.totalSpent += total;
        await customerDoc.save();
        
        res.json({
            success: true,
            orderId: order.orderId,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Admin order routes
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.put('/api/admin/orders/:id/status', authenticateAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`QMRE Lights server running on port ${PORT}`);
    console.log(`Website: http://localhost:${PORT}`);
    console.log(`Admin: http://localhost:${PORT}/admin`);
}); 