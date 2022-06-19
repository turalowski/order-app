const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Catalog = require('../../models/Catalog');

// @route    POST api/catalogs
// @desc     Register catalog
// @access   Public
router.post('/', auth, async (req, res) => {
  const { name, type, description } = req.body;

  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let catalog = await Catalog.findOne({ name, user: req.user.id });

    if (catalog) {
      return res.status(400).json({
        errors: [{ param: 'name', msg: 'Catalog is already exists' }],
      });
    }

    catalog = new Catalog({
      user: req.user.id,
      name,
      type,
      description,
    });

    await catalog.save();

    res.json({ id: catalog.id });
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

    let catalogs = await Catalog.find({ user: req.user.id });


    res.json({ catalogs });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);

    if (!catalog) {
      return res.status(404).json({ msg: 'Catalog not found' });
    }

    if (catalog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await catalog.remove();

    res.json({ id: catalog._id, msg: 'Catalog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
