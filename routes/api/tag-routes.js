const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: Product }]
  })
  .catch ((err) => res.status(500).json(err));
  res.json(tagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneTag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }]
  })
  .catch((err) => res.json(err));
  res.json(oneTag);
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.status(200).json(deletedTag);
    })
    .catch((err) => res.status(500).json(err));

});

module.exports = router;
