# QMRE Lights - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

Or install manually:
```bash
npm install express axios mongoose bcryptjs jsonwebtoken cookie-parser
```

### 2. MongoDB Setup
**For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)**

**Quick Options:**
- **MongoDB Atlas (Recommended)**: Free cloud database at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- **Local Installation**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 3. Environment Variables
Create a `.env` file in your project root:
```env
MONGODB_URI=mongodb://localhost:27017/qmre_lights
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 4. Start the Server
```bash
node server.js
```

### 5. Access the Website
- **Main Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## ✨ New Features Added

### 🛒 Complete E-commerce System
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Customer information, payment methods
- **Order Management**: Track orders, update status
- **Payment Integration**: JazzCash, EasyPaisa, WhatsApp ordering

### 🔐 Secure Admin Panel
- **Authentication**: JWT-based login system
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **Customer Management**: Track customer data
- **Analytics Dashboard**: Sales and performance metrics

### 📱 Individual Product Pages
- **SEO Optimized**: Each product has its own URL
- **Rich Product Details**: Images, descriptions, specifications
- **Related Products**: Show similar items
- **Social Sharing**: Share products on social media

### ❤️ Wishlist System
- **Save Favorites**: Add products to wishlist
- **Persistent Storage**: Wishlist saved in browser
- **Quick Access**: Easy to find saved items

### 🔍 Advanced Search
- **Real-time Search**: Instant results as you type
- **Multiple Filters**: Category, price, rating
- **Smart Suggestions**: Search across product names and descriptions

### 🎨 QMRE Brand Design
- **Custom Color Scheme**: Orange-brown brand colors
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, professional appearance

## 📁 File Structure
```
qmre-lights-version-2/
├── index.html              # Main website
├── admin.html              # Admin dashboard
├── styles.css              # Main website styles
├── admin-styles.css        # Admin dashboard styles
├── script.js               # Main website JavaScript
├── admin-script.js         # Admin dashboard JavaScript
├── payment-api.js          # Payment gateway integration
├── server.js               # Express server
├── package.json            # Project dependencies
├── README.md               # Complete documentation
├── SETUP.md                # This setup guide
├── sitemap.xml             # SEO sitemap
└── robots.txt              # Search engine guidance
```

## 🔧 Configuration

### Payment Gateway Setup
1. **JazzCash Configuration**:
   - Get your Merchant ID from JazzCash
   - Update `payment-api.js` with your credentials
   - Set environment variables:
     ```bash
     JAZZCASH_MERCHANT_ID=your_merchant_id
     JAZZCASH_PASSWORD=your_password
     JAZZCASH_RETURN_URL=https://yourdomain.com/payment/return
     ```

2. **EasyPaisa Configuration**:
   - Get your Merchant ID and Store ID from EasyPaisa
   - Update `payment-api.js` with your credentials
   - Set environment variables:
     ```bash
     EASYPAISA_MERCHANT_ID=your_merchant_id
     EASYPAISA_STORE_ID=your_store_id
     EASYPAISA_RETURN_URL=https://yourdomain.com/payment/return
     ```

### WhatsApp Integration
Update the WhatsApp number in `script.js`:
```javascript
const whatsappNumber = '923001234567'; // Replace with your number
```

### Business Information
Update business details in `index.html`:
- Company name
- Phone number
- Email address
- Address

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Change port in server.js or use different port
   PORT=3001 node server.js
   ```

2. **Payment API errors**:
   - Check your merchant credentials
   - Verify API endpoints are correct
   - Ensure return URLs are accessible

3. **Images not loading**:
   - Replace placeholder images with your actual product photos
   - Optimize images for web (recommended size: 400x400px)

4. **Admin dashboard not working**:
   - Check browser console for JavaScript errors
   - Ensure all admin files are in the same directory

## 📱 Features Overview

### Main Website
- ✅ Product showcase with filtering
- ✅ WhatsApp integration
- ✅ Payment gateway integration
- ✅ Shopping cart functionality
- ✅ Responsive design
- ✅ SEO optimized

### Admin Dashboard
- ✅ Product management
- ✅ Order tracking
- ✅ Customer management
- ✅ Payment configuration
- ✅ Analytics and reports
- ✅ Store settings

### Payment Integration
- ✅ JazzCash API
- ✅ EasyPaisa API
- ✅ Payment status tracking
- ✅ Webhook support
- ✅ Return URL handling

## 🚀 Deployment

### Local Development
```bash
npm install
node server.js
```

### Production Deployment
1. **Upload files** to your web server
2. **Install Node.js** on your server
3. **Install dependencies**: `npm install --production`
4. **Start server**: `node server.js`
5. **Use PM2** for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   ```

### Environment Variables
Create a `.env` file for production:
```env
PORT=3000
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
EASYPAISA_MERCHANT_ID=your_merchant_id
EASYPAISA_STORE_ID=your_store_id
WEBHOOK_SECRET=your_webhook_secret
```

## 📞 Support

For technical support:
- Email: support@qmrelights.com
- WhatsApp: +92 300 1234567

## 🔄 Updates

To update the website:
1. Backup your current files
2. Download the latest version
3. Replace files (keep your customizations)
4. Restart the server

---

**QMRE Lights - Illuminate Your Space with Elegance** ✨ 