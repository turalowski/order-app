const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Stock = require('../../models/Stock');

// @route    POST api/stocks
// @desc     Register stock
// @access   Public
router.post('/', auth, async (req, res) => {
  const { name, description, address } = req.body;

  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let stock = await Stock.findOne({ name });

    if (stock) {
      return res.status(400).json({
        errors: [{ param: 'name', msg: 'Stock is already exists' }],
      });
    }

    stock = new Stock({
      user: req.user.id,
      name,
      description,
      address,
    });

    await stock.save();

    res.json({ id: stock.id });
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

    let stocks = await Stock.find({ user: req.user.id });


    res.json({ stocks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }

    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await stock.remove();

    res.json({ id: stock._id, msg: 'Stock removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
