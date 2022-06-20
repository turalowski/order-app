const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Operation = require('../../models/Operation');

// @route    POST api/products
// @desc     Add product
// @access   Private
router.post('/', auth, async (req, res) => {
  const { type, counterparty, currency, invoice, description, products } =
    req.body;

  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let operation = await Operation.findOne({ invoice, user: req.user.id });

    if (operation) {
      return res.status(400).json({
        errors: [{ param: 'invoice', msg: 'Operation is already exists' }],
      });
    }

    operation = new Operation({
      user: req.user.id,
      invoice,
      type,
      counterparty,
      currency,
      description,
      products,
    });

    await operation.save();

    res.json({ id: operation.id });
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

    let operations = await Operation.find({ user: req.user.id }).populate([
      'counterparty',
      'products',
    ]);

    res.json({ operations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
