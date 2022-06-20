const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Relation = require('../../models/Relation');
const Operation = require('../../models/Operation');

router.get('/', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        errors: [{ msg: 'Token is not valid' }],
      });
    }

    let relations = await Relation.find({ user: req.user.id });
    let operations = await Operation.find({ user: req.user.id }).populate([
      'products',
    ]);

    let reportsOfRelations = relations.map(relation => {
      let totalProductAmount = 0;
      relationOperations = operations.filter(operation => {
        return operation.counterparty.toString() === relation._id.toString();
      });

      relationOperations.map(relationOperation => {
        const totalAmount = relationOperation.products.reduce(function (
          previousValue,
          currentValue
        ) {
          return relationOperation.type === 1
            ? previousValue - currentValue.amount * currentValue.price
            : previousValue + currentValue.amount * currentValue.price;
        },
        0);
        totalProductAmount += totalAmount;
      });

      return {
        _id: relation._id,
        name: relation.name,
        type: relation.category,
        totalTurnover: totalProductAmount,
        operationsCount: relationOperations.length
      };
    });
    res.json({ reportsOfRelations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
