const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/search', async (req, res) => {
  try {
    const filter = req.query.filter.toLowerCase();
    const products = await Product.find();

    const filteredProducts = products.filter(product => {
      return product.title.toLowerCase().includes(filter);
    });
    
    const chunkSize = 3; 

    const productChunks = Array.from(
      { length: Math.ceil(filteredProducts.length / chunkSize) },
      (v, i) => filteredProducts.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    res.render('shop/index', { products: productChunks });
  } 
  catch (error) {
    console.error('Error searching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
