# MongoDB Setup Guide for QMRE Lights

This guide will help you set up MongoDB for your QMRE Lights e-commerce website.

## 🎯 Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" and create an account
   - Choose "Free" tier (M0)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select your preferred cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to you
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Username: `qmre_admin`
   - Password: Create a strong password
   - Role: "Atlas admin"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update Environment Variables**
   ```bash
   # Create a .env file in your project root
   MONGODB_URI=mongodb+srv://qmre_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/qmre_lights?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

### Option 2: Local MongoDB Installation

#### Windows:
1. **Download MongoDB Community Server**
   - Go to [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Download the Windows MSI installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB Service**
   ```cmd
   # Open Command Prompt as Administrator
   net start MongoDB
   ```

3. **Create Database Directory**
   ```cmd
   mkdir C:\data\db
   ```

#### macOS:
1. **Using Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB Service**
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

#### Linux (Ubuntu):
1. **Install MongoDB**
   ```bash
   # Import MongoDB public GPG key
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

   # Create list file for MongoDB
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

   # Update package database
   sudo apt-get update

   # Install MongoDB
   sudo apt-get install -y mongodb-org
   ```

2. **Start MongoDB Service**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

### Option 3: Docker (Advanced Users)

1. **Install Docker**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)

2. **Run MongoDB Container**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

## 🔧 Configuration

### 1. Environment Variables
Create a `.env` file in your project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/qmre_lights

# JWT Secret for Admin Authentication
JWT_SECRET=qmre_lights_secret_key_2024_change_this_in_production

# Payment Gateway Credentials (Replace with real credentials)
JAZZCASH_MERCHANT_ID=your_jazzcash_merchant_id
JAZZCASH_PASSWORD=your_jazzcash_password
EASYPAISA_MERCHANT_ID=your_easypaisa_merchant_id
EASYPAISA_PASSWORD=your_easypaisa_password

# WhatsApp Business Number
WHATSAPP_NUMBER=923001234567

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
The application will automatically:
- Connect to MongoDB
- Create the database and collections
- Create a default admin user (admin/admin123)

## 🚀 Running the Application

1. **Start the Server**
   ```bash
   node server.js
   ```

2. **Access the Application**
   - Main Website: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login
   - Admin Dashboard: http://localhost:3000/admin

3. **Default Admin Credentials**
   - Username: `admin`
   - Password: `admin123`

## 📊 Database Structure

### Collections Created:

1. **products**
   ```javascript
   {
     _id: ObjectId,
     name: String,
     category: String,
     price: Number,
     description: String,
     image: String,
     rating: Number,
     stock: Number,
     featured: Boolean,
     status: String,
     createdAt: Date,
     updatedAt: Date
   }
   ```

2. **orders**
   ```javascript
   {
     _id: ObjectId,
     orderId: String,
     customer: {
       name: String,
       email: String,
       phone: String,
       address: String
     },
     items: Array,
     total: Number,
     paymentMethod: String,
     status: String,
     paymentStatus: String,
     transactionId: String,
     createdAt: Date,
     updatedAt: Date
   }
   ```

3. **customers**
   ```javascript
   {
     _id: ObjectId,
     name: String,
     email: String,
     phone: String,
     address: String,
     totalOrders: Number,
     totalSpent: Number,
     createdAt: Date,
     updatedAt: Date
   }
   ```

4. **admins**
   ```javascript
   {
     _id: ObjectId,
     username: String,
     password: String (hashed),
     email: String,
     role: String,
     isActive: Boolean,
     createdAt: Date,
     updatedAt: Date
   }
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Connection Failed**
   ```bash
   # Check if MongoDB is running
   # Windows:
   net start MongoDB
   
   # macOS:
   brew services start mongodb/brew/mongodb-community
   
   # Linux:
   sudo systemctl start mongod
   ```

2. **Authentication Failed**
   - Check your connection string
   - Verify username and password
   - Ensure network access is configured

3. **Port Already in Use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   
   # Kill the process
   kill -9 <PID>
   ```

4. **Permission Denied**
   ```bash
   # Create data directory with proper permissions
   sudo mkdir -p /data/db
   sudo chown -R $USER /data/db
   ```

## 🔒 Security Best Practices

1. **Change Default Passwords**
   - Update admin password after first login
   - Use strong, unique passwords

2. **Environment Variables**
   - Never commit `.env` files to version control
   - Use different secrets for development and production

3. **Network Security**
   - Restrict MongoDB access to your application only
   - Use VPN for remote access

4. **Regular Backups**
   ```bash
   # Create backup
   mongodump --db qmre_lights --out ./backup
   
   # Restore backup
   mongorestore --db qmre_lights ./backup/qmre_lights
   ```

## 📈 Monitoring

### MongoDB Compass (GUI Tool)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse and manage your data visually

### Logs
```bash
# View MongoDB logs
# Windows:
tail -f "C:\Program Files\MongoDB\Server\6.0\log\mongod.log"

# macOS/Linux:
tail -f /var/log/mongodb/mongod.log
```

## 🚀 Production Deployment

For production deployment:

1. **Use MongoDB Atlas** (recommended)
2. **Set up proper environment variables**
3. **Configure SSL/TLS**
4. **Set up automated backups**
5. **Monitor performance**
6. **Implement proper logging**

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review MongoDB documentation
3. Check application logs for errors
4. Ensure all dependencies are installed

---

**Happy coding! 🎉** 