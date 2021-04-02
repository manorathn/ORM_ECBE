const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagRoute = await Tag.findAll(
      { include: [{ model: Product }] }
    );
    res.status(200).json(tagRoute);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRoute = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: ProductTag, through: Product, as: 'product_tags', }]
    });
    if (!tagRoute) {
      res.status(404).json({ message: 'No Tags found with this ID!' });
      return;
    }
    res.status(200).json(tagRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagRoute = await Tag.create(req.body);
    res.status(200).json(tagRoute);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagRoute = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagRoute[0]) {
      res.status(404).json({ message: 'No user with this Tag!' });
      return;
    }
    res.status(200).json(tagRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagRoute = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagRoute) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
