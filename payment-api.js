// Payment API Integration for QMRE Lights
// This file contains the backend API endpoints for payment processing

const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();

// JazzCash Configuration
const JAZZCASH_CONFIG = {
    merchantId: process.env.JAZZCASH_MERCHANT_ID || 'MC12345',
    password: process.env.JAZZCASH_PASSWORD || 'your_password',
    returnUrl: process.env.JAZZCASH_RETURN_URL || 'https://qmrelights.com/payment/return',
    currency: 'PKR',
    language: 'EN',
    apiUrl: 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
};

// EasyPaisa Configuration
const EASYPAISA_CONFIG = {
    merchantId: process.env.EASYPAISA_MERCHANT_ID || 'EP67890',
    storeId: process.env.EASYPAISA_STORE_ID || 'ST12345',
    returnUrl: process.env.EASYPAISA_RETURN_URL || 'https://qmrelights.com/payment/return',
    currency: 'PKR',
    apiUrl: 'https://easypay.easypaisa.com.pk/easypay/Index.jsf'
};

// JazzCash Payment Endpoint
router.post('/jazzcash/payment', async (req, res) => {
    try {
        const {
            amount,
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress
        } = req.body;

        // Validate required fields
        if (!amount || !orderId || !customerName || !customerPhone) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            });
        }

        // Create JazzCash payment request
        const paymentRequest = {
            pp_MerchantID: JAZZCASH_CONFIG.merchantId,
            pp_Password: JAZZCASH_CONFIG.password,
            pp_ReturnURL: JAZZCASH_CONFIG.returnUrl,
            pp_Amount: amount * 100, // Convert to smallest currency unit
            pp_BillReference: orderId,
            pp_Description: `Payment for order ${orderId}`,
            pp_TxnCurrency: JAZZCASH_CONFIG.currency,
            pp_TxnDateTime: new Date().toISOString(),
            pp_TxnExpiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            pp_TxnRefNo: `TXN${Date.now()}`,
            pp_Version: '1.1',
            pp_TxnType: 'MWALLET',
            pp_Language: JAZZCASH_CONFIG.language,
            pp_CNIC: customerPhone.replace(/\D/g, '').substring(0, 13),
            pp_MobileNumber: customerPhone.replace(/\D/g, '').substring(0, 11),
            pp_EmailAddress: customerEmail || 'customer@qmrelights.com',
            pp_BillReference: orderId,
            pp_ProductID: 'RETL',
            pp_Amount: amount * 100,
            pp_TxnCurrency: JAZZCASH_CONFIG.currency,
            pp_TxnDateTime: new Date().toISOString(),
            pp_TxnExpiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            pp_TxnRefNo: `TXN${Date.now()}`,
            pp_Version: '1.1',
            pp_TxnType: 'MWALLET',
            pp_Language: JAZZCASH_CONFIG.language,
            pp_CNIC: customerPhone.replace(/\D/g, '').substring(0, 13),
            pp_MobileNumber: customerPhone.replace(/\D/g, '').substring(0, 11),
            pp_EmailAddress: customerEmail || 'customer@qmrelights.com',
            pp_BillReference: orderId,
            pp_ProductID: 'RETL'
        };

        // Generate hash for JazzCash
        const hashString = `${paymentRequest.pp_Amount}&${paymentRequest.pp_BillReference}&${paymentRequest.pp_CNIC}&${paymentRequest.pp_Currency}&${paymentRequest.pp_EmailAddress}&${paymentRequest.pp_Language}&${paymentRequest.pp_MerchantID}&${paymentRequest.pp_MobileNumber}&${paymentRequest.pp_Password}&${paymentRequest.pp_ProductID}&${paymentRequest.pp_ReturnURL}&${paymentRequest.pp_TxnCurrency}&${paymentRequest.pp_TxnDateTime}&${paymentRequest.pp_TxnExpiryDateTime}&${paymentRequest.pp_TxnRefNo}&${paymentRequest.pp_TxnType}&${paymentRequest.pp_Version}`;
        
        paymentRequest.pp_SecureHash = crypto.createHash('sha256').update(hashString).digest('hex');

        // Make request to JazzCash API
        const response = await axios.post(JAZZCASH_CONFIG.apiUrl, paymentRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.ResponseCode === '000') {
            // Payment initiated successfully
            res.json({
                status: 'success',
                paymentUrl: response.data.pp_RedirectURL,
                transactionId: response.data.pp_TxnRefNo,
                message: 'Payment initiated successfully'
            });
        } else {
            throw new Error(response.data.ResponseMessage || 'Payment initiation failed');
        }

    } catch (error) {
        console.error('JazzCash payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Payment processing failed',
            error: error.message
        });
    }
});

// EasyPaisa Payment Endpoint
router.post('/easypaisa/payment', async (req, res) => {
    try {
        const {
            amount,
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress
        } = req.body;

        // Validate required fields
        if (!amount || !orderId || !customerName || !customerPhone) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            });
        }

        // Create EasyPaisa payment request
        const paymentRequest = {
            merchantId: EASYPAISA_CONFIG.merchantId,
            storeId: EASYPAISA_CONFIG.storeId,
            returnUrl: EASYPAISA_CONFIG.returnUrl,
            amount: amount,
            orderId: orderId,
            customerName: customerName,
            customerEmail: customerEmail || 'customer@qmrelights.com',
            customerPhone: customerPhone,
            customerAddress: customerAddress || 'Pakistan',
            currency: EASYPAISA_CONFIG.currency,
            transactionDateTime: new Date().toISOString(),
            transactionExpiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            transactionRefNumber: `TXN${Date.now()}`,
            version: '1.0',
            transactionType: 'MWALLET',
            language: 'EN',
            cnic: customerPhone.replace(/\D/g, '').substring(0, 13),
            mobileNumber: customerPhone.replace(/\D/g, '').substring(0, 11),
            emailAddress: customerEmail || 'customer@qmrelights.com',
            billReference: orderId,
            productId: 'RETL'
        };

        // Generate hash for EasyPaisa
        const hashString = `${paymentRequest.amount}&${paymentRequest.billReference}&${paymentRequest.cnic}&${paymentRequest.currency}&${paymentRequest.emailAddress}&${paymentRequest.language}&${paymentRequest.merchantId}&${paymentRequest.mobileNumber}&${paymentRequest.storeId}&${paymentRequest.productId}&${paymentRequest.returnUrl}&${paymentRequest.transactionCurrency}&${paymentRequest.transactionDateTime}&${paymentRequest.transactionExpiryDateTime}&${paymentRequest.transactionRefNumber}&${paymentRequest.transactionType}&${paymentRequest.version}`;
        
        paymentRequest.secureHash = crypto.createHash('sha256').update(hashString).digest('hex');

        // Make request to EasyPaisa API
        const response = await axios.post(EASYPAISA_CONFIG.apiUrl, paymentRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.responseCode === '000') {
            // Payment initiated successfully
            res.json({
                status: 'success',
                paymentUrl: response.data.redirectUrl,
                transactionId: response.data.transactionRefNumber,
                message: 'Payment initiated successfully'
            });
        } else {
            throw new Error(response.data.responseMessage || 'Payment initiation failed');
        }

    } catch (error) {
        console.error('EasyPaisa payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Payment processing failed',
            error: error.message
        });
    }
});

// Payment Return Handler
router.post('/payment/return', (req, res) => {
    try {
        const {
            pp_ResponseCode,
            pp_ResponseMessage,
            pp_TxnRefNo,
            pp_Amount,
            pp_BillReference,
            pp_RetreivalReferenceNo
        } = req.body;

        // Verify payment response
        if (pp_ResponseCode === '000') {
            // Payment successful
            res.json({
                status: 'success',
                message: 'Payment completed successfully',
                transactionId: pp_TxnRefNo,
                amount: pp_Amount,
                orderId: pp_BillReference,
                retrievalReference: pp_RetreivalReferenceNo
            });
        } else {
            // Payment failed
            res.json({
                status: 'failed',
                message: pp_ResponseMessage || 'Payment failed',
                transactionId: pp_TxnRefNo,
                orderId: pp_BillReference
            });
        }

    } catch (error) {
        console.error('Payment return error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error processing payment return'
        });
    }
});

// Payment Status Check
router.get('/payment/status/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;

        // Check payment status from database or payment gateway
        // This is a placeholder implementation
        const paymentStatus = {
            transactionId: transactionId,
            status: 'completed', // or 'pending', 'failed'
            amount: 45000,
            orderId: 'QMRE001',
            timestamp: new Date().toISOString()
        };

        res.json({
            status: 'success',
            data: paymentStatus
        });

    } catch (error) {
        console.error('Payment status check error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error checking payment status'
        });
    }
});

// Webhook for payment notifications
router.post('/payment/webhook', (req, res) => {
    try {
        const paymentData = req.body;

        // Verify webhook signature
        const signature = req.headers['x-signature'];
        const expectedSignature = crypto
            .createHmac('sha256', process.env.WEBHOOK_SECRET || 'your_webhook_secret')
            .update(JSON.stringify(paymentData))
            .digest('hex');

        if (signature !== expectedSignature) {
            return res.status(401).json({ error: 'Invalid signature' });
        }

        // Process payment notification
        console.log('Payment webhook received:', paymentData);

        // Update order status in database
        // Send confirmation email/SMS
        // Update inventory

        res.json({ status: 'success' });

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

module.exports = router; 