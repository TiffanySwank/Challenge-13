const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const products = Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` 
  // be sure to include its associated Product data
  try {
    const app = App.findByPk(req.params.id);

    if (!app) {
      res.status(404).json({ message: 'App not found' });
      return;
    }

    res.status(200).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new tag
  try {
    const newApp = App.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          app_id: newApp.id,
          tag_id,
        };
      });
     AppTag.bulkCreate(appTagIdArr);
    }

    res.status(200).json(newApp);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedProduct = Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
