# QMRE Lights - Premium LED Chandeliers Store

A modern, minimalist, and SEO-optimized e-commerce website for LED chandeliers with integrated payment methods and WhatsApp ordering system.

## 🌟 Features

### 🎨 Design & User Experience
- **Minimalist & Modern Design**: Clean, eye-catching interface with smooth animations
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: CSS transitions and hover effects for enhanced UX
- **Loading Animations**: Progressive loading with staggered animations

### 🛒 E-commerce Features
- **Product Showcase**: Beautiful product cards with hover effects
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Payment Integration**: JazzCash and EasyPaisa payment methods
- **Product Ratings**: Star ratings for customer trust
- **Order Processing**: Complete order flow with payment confirmation

### 💳 Payment Methods
- **JazzCash**: Secure mobile payment integration
- **EasyPaisa**: Quick and easy payment processing
- **WhatsApp Orders**: Direct ordering through WhatsApp Business

### 📱 WhatsApp Features
- **Floating WhatsApp Button**: Always accessible contact button
- **Product-Specific Orders**: Pre-filled messages for specific products
- **Order Confirmation**: Automated WhatsApp notifications
- **Customer Support**: Direct customer service integration

### 📝 Blog Section
- **Lighting Tips & Trends**: Educational content for customers
- **SEO-Optimized Content**: Relevant keywords and meta descriptions
- **Responsive Blog Cards**: Beautiful blog post layouts

### 🔍 SEO Optimization
- **Meta Tags**: Complete meta description and keywords
- **Open Graph Tags**: Social media sharing optimization
- **Structured Data**: Schema markup for better search results
- **Fast Loading**: Optimized images and code
- **Mobile-First**: Google's mobile-first indexing compliance

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Customize** the content for your business

### File Structure
```
qmre-lights-version-2/
├── index.html          # Main website file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── favicon.ico         # Website favicon (add your own)
```

## 🎯 Customization Guide

### 1. Business Information
Update the following in `index.html`:
- Company name: "QMRE Lights"
- Phone number: "+92 300 1234567"
- Email: "info@qmrelights.com"
- Address: "Lahore, Pakistan"

### 2. Products
Modify product information in the products section:
- Product names and descriptions
- Prices (in Pakistani Rupees)
- Product images (replace with your actual product photos)

### 3. Payment Integration
The website includes payment method placeholders. To integrate real payments:

#### JazzCash Integration
```javascript
// Add your JazzCash merchant credentials
const jazzCashConfig = {
    merchantId: 'YOUR_MERCHANT_ID',
    password: 'YOUR_PASSWORD',
    returnUrl: 'YOUR_RETURN_URL'
};
```

#### EasyPaisa Integration
```javascript
// Add your EasyPaisa merchant credentials
const easyPaisaConfig = {
    merchantId: 'YOUR_MERCHANT_ID',
    storeId: 'YOUR_STORE_ID',
    returnUrl: 'YOUR_RETURN_URL'
};
```

### 4. WhatsApp Integration
Update WhatsApp number in `script.js`:
```javascript
const whatsappNumber = '923001234567'; // Replace with your number
```

### 5. Images
Replace placeholder images with your actual product photos:
- Product images: Use high-quality, optimized images
- Hero image: Main banner image
- Blog images: Relevant to your content

## 🔧 Technical Features

### Performance Optimization
- **Lazy Loading**: Images load as they come into view
- **Minified CSS/JS**: Optimized file sizes
- **CDN Resources**: Bootstrap and Font Awesome from CDN
- **Image Optimization**: Responsive images with proper sizing

### Security Features
- **Form Validation**: Client-side validation for all forms
- **XSS Protection**: Sanitized user inputs
- **HTTPS Ready**: Secure connection compatible

### Accessibility
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes
- **Focus States**: Clear focus indicators

## 📊 SEO Features

### Meta Tags
```html
<meta name="description" content="Premium LED Chandeliers - Elegant lighting solutions for your home. Shop our collection of modern, energy-efficient chandeliers with secure payment options.">
<meta name="keywords" content="LED chandeliers, modern lighting, home decor, energy efficient lights, luxury chandeliers, Pakistan lighting">
```

### Open Graph Tags
```html
<meta property="og:title" content="QMRE Lights - Premium LED Chandeliers">
<meta property="og:description" content="Discover our elegant collection of LED chandeliers. Modern designs with energy efficiency.">
<meta property="og:type" content="website">
```

### Schema Markup
Add structured data for better search results:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "QMRE Lights",
  "description": "Premium LED Chandeliers Store",
  "url": "https://qmrelights.com",
  "telephone": "+92 300 1234567"
}
</script>
```

## 📱 Mobile Optimization

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Touch-Friendly**: Large touch targets for mobile users
- **Fast Loading**: Optimized for slower mobile connections
- **Viewport Meta**: Proper mobile viewport configuration

### WhatsApp Mobile Features
- **Direct App Integration**: Opens WhatsApp app on mobile
- **Pre-filled Messages**: Reduces typing for customers
- **Quick Order Process**: Streamlined mobile ordering

## 🎨 Design System

### Color Palette
- **Primary**: #ffc107 (Warning Yellow)
- **Secondary**: #6c757d (Gray)
- **Success**: #25d366 (WhatsApp Green)
- **Info**: #17a2b8 (Blue)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Components
- **Cards**: Product cards with hover effects
- **Buttons**: Consistent button styling
- **Forms**: Clean, accessible form design
- **Modals**: Bootstrap modal integration

## 🔄 Future Enhancements

### Planned Features
- [ ] Shopping cart functionality
- [ ] User accounts and profiles
- [ ] Product reviews and ratings
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] Order tracking system
- [ ] Email marketing integration
- [ ] Analytics dashboard

### Technical Improvements
- [ ] PWA (Progressive Web App) features
- [ ] Service worker for offline functionality
- [ ] Advanced caching strategies
- [ ] Real-time inventory updates
- [ ] Multi-language support

## 📞 Support & Contact

### Technical Support
For technical issues or customization help:
- Email: support@qmrelights.com
- WhatsApp: +92 300 1234567

### Business Inquiries
For business partnerships or bulk orders:
- Email: business@qmrelights.com
- Phone: +92 300 1234567

## 📄 License

This project is created for QMRE Lights. All rights reserved.

## 🙏 Acknowledgments

- **Bootstrap**: For the responsive framework
- **Font Awesome**: For beautiful icons
- **Google Fonts**: For typography
- **Unsplash**: For placeholder images

---

**Built with ❤️ for QMRE Lights**

*Transform your space with elegance and efficiency.* 