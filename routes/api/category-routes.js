const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll({
      include: [{ model: Product }],
    }).then((data)=>{
      if (!data) {
        res.status(404).json({ message: "No categories exist." });
        return;
      }
      res.status(200).json(data);
    });
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    }).then((data)=>{

      if (!data) {
        res.status(404).json({ message: "No category exists with that ID." });
        return;
      }
      res.status(200).json(data);
    });
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create({
      category_name: req.body.category_name,
    }).then((data)=>{
      res.status(200).json(data);
    });

  } catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body,{ 
      where: { id: req.params.id } 

    }).then((data)=>{

      if (!data) {
        res.status(404).json({ message: "No category exists with that ID." });
        return;
      }
    res.status(200).json({ message: "Category updated." });
  });
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: { id: req.params.id }
    }).then((data)=>{
      if (!data) {
        res.status(404).json({ message: "No category exists with that id!" });
        return;
      }
      res.status(200).json({ message: "Category deleted." });
    });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
