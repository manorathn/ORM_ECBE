const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryRoute = await Category.findByPk(req.params.id, {
      include: [{ model: Product, }]
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryRoute = await Category.create(req.body);
    res.status(200).json(categoryRoute);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
