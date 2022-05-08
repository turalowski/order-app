const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Relation = require('../../models/Relation');

// @route    POST api/relations
// @desc     Register relation
// @access   Public
router.post('/', auth, async (req, res) => {
  const {
    name,
    type,
    category,
    company,
    position,
    iban,
    description,
    email,
    website,
    phoneNumber,
    address,
  } = req.body;

  try {
    let relation = await Relation.findOne({ name });

    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    if (relation) {
      return res.status(400).json({
        errors: [{ param: 'name', msg: 'Relation is already exists' }],
      });
    }

    relation = new Relation({
      user: req.user.id,
      name,
      type,
      category,
      company,
      position,
      iban,
      description,
      email,
      website,
      phoneNumber,
      address,
      email,
    });

    await relation.save();

    res.json({ id: relation.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let relations = await Relation.find({ user: req.user.id });

    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    res.json({ relations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {

    const relation = await Relation.findById(req.params.id);

    if (!relation) {
      return res.status(404).json({ msg: 'Relation not found' });
    }

    if (relation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await relation.remove();

    res.json({ id: relation._id, msg: 'Post removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
