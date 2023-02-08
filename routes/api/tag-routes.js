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

// TO DO BELOW
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await ProductTag.create(req.body);
    res.json(200).json(newTag);
  } catch (err) {
    res.json(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await ProductTag.update(
      {
      tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
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
