const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Product.findAll({
      include: [{ model: Product }],
    });

    if(!data){
      res.status(404).json({ message: "No tags exist." });
      return;
    }

    res.status(200).json(data);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Product.findByPk(req.params.id,{
      include: [{ model: Product }],
    });

    if(!data){
      res.status(404).json({ message: "No tag exists with given ID." });
      return;
    }

    res.status(200).json(data);
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const data = await Product.create({
      tag_name: req.body.tag_name,
    });

    res.status(200).json(data);
  } catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Product.update({
      tag_name: req.body.tag_name},{
      where: { id: req.body.id }
    });

    if(!data){
      res.status(404).json({ message: "No tag exsts with given ID." });
      return;
    }

    res.status(200).json(data);
  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Product.destroy({
      where: { id: req.body.id }
    });

    if(!data){
      res.status(404).json({ message: "No tag exsts with given ID." });
      return;
    }

    res.status(200).json(data);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
