const express = require('express');
const router = express.Router();

// Model produk
const Product = require('../models/product');

// Rute GET untuk mendapatkan semua produk
router.get('/', (req, res) => {
  try {
    const products = Product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute GET untuk mendapatkan produk berdasarkan ID
router.get('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = Product.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... tambahkan rute lainnya untuk operasi CRUD

module.exports = router;
