const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryRoute = await Category.findAll(
      { include: [{ model: Product }] }
    );
    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryRoute = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Category, through: Product, as: 'category_id', }]
    });
    if (!categoryRoute) {
      res.status(404).json({ message: 'No Category found with this ID!' });
      return;
    }
    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryRoute = await Category.create(req.body);
    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryRoute = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryRoute[0]) {
      res.status(404).json({ message: 'No category with id!' });
      return;
    }
    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryRoute = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryRoute) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
