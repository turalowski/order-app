const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Product = require('../../models/Product');

// @route    POST api/products
// @desc     Add product
// @access   Private
router.post('/', auth, async (req, res) => {
  const {
    name,
    catalog,
    manufacturer,
    price,
    currency,
    measurement,
    barcode,
    description,
  } = req.body;

  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let product = await Product.findOne({ name, user: req.user.id });

    if (product) {
      return res.status(400).json({
        errors: [{ param: 'name', msg: 'Product is already exists' }],
      });
    }

    product = new Product({
      user: req.user.id,
      name,
      catalog,
      manufacturer,
      price,
      currency,
      measurement,
      barcode,
      description,
    });

    await product.save();

    res.json({ id: product.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let products = await Product.find({ user: req.user.id }).populate([
      'catalog',
      'manufacturer',
    ]);

    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
