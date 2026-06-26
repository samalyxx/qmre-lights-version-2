const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin } = require('./database');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'qmre_lights_secret_key_2024';

// Generate JWT Token
const generateToken = (adminId) => {
    return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '24h' });
};

// Verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken || req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.redirect('/admin/login');
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.redirect('/admin/login');
        }

        const admin = await Admin.findById(decoded.adminId);
        if (!admin || !admin.isActive) {
            return res.redirect('/admin/login');
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.redirect('/admin/login');
    }
};

// Login Admin
const loginAdmin = async (username, password) => {
    try {
        const admin = await Admin.findOne({ username, isActive: true });
        if (!admin) {
            return { success: false, message: 'Invalid credentials' };
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid credentials' };
        }

        const token = generateToken(admin._id);
        return { success: true, token, admin };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed' };
    }
};

// Hash Password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Create Default Admin
const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await hashPassword('admin123');
            await Admin.create({
                username: 'admin',
                password: hashedPassword,
                email: 'admin@qmrelights.com',
                role: 'admin'
            });
            console.log('Default admin created: admin / admin123');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

module.exports = {
    authenticateAdmin,
    loginAdmin,
    hashPassword,
    createDefaultAdmin,
    generateToken,
    verifyToken
}; 