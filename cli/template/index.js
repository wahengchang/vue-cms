const express = require('express');
const {SYSTEM_KEY, POSTYPE_NAME} = require('./const')
const router = express.Router();
const PosttypeModel = require('./model/Posttype');
const CategoryModel = require('./model/Category');
const {normalizeRequestBody} = require('../../utils/modelUtils')

router.use('/category', require('./category'))

router.post('/', async (req, res) => {
  try {
    const modifiedPosttype = await normalizeRequestBody(req, PosttypeModel, SYSTEM_KEY, CategoryModel)
    const newModel = new PosttypeModel(modifiedPosttype);
    const response = await newModel.save();

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const exsistedPosttype = await PosttypeModel.findById(id);
  
      if (!exsistedPosttype) {
        return res.status(404).json({ message: `${POSTYPE_NAME} not found` });
      }
      const modifiedPosttype = await normalizeRequestBody(req, PosttypeModel, SYSTEM_KEY, CategoryModel);
      Object.assign(exsistedPosttype, modifiedPosttype);
      const response = await exsistedPosttype.save();
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:id', async (req, res) => {
  try {
    const exsistedPosttype = await PosttypeModel.findById(req.params.id)
    if (!exsistedPosttype) {
      return res.status(404).send(`${POSTYPE_NAME} not found`);
    }
    res.json({ [`${POSTYPE_NAME}`]: exsistedPosttype });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const exsistedPosttype = await PosttypeModel.findOneAndDelete({ _id: req.params.id });

    if (!exsistedPosttype) {
      return res.status(404).send(`${POSTYPE_NAME} not found`);
    }

    res.json({ message: `${POSTYPE_NAME} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


router.get('/', async (req, res) => {
  try {
    const { category, sortBy, limit, offset } = req.query;
    const userId = req.user._id;

    const query = { creator: userId };

    if (category) {
      const resCategoryModel = await CategoryModel.findOne({ _id: category });
      if (resCategoryModel) {
        query.category = resCategoryModel._id;
      }
    }

    const options = {
      skip: offset ? parseInt(offset) : 0,
      limit: limit ? parseInt(limit) : 100, 
    };

    const exsistedPosttypeList = await PosttypeModel.find(query).skip(options.skip).limit(options.limit);

    res.json({ 
      [`${POSTYPE_NAME}s`]: exsistedPosttypeList,
      userId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

  
module.exports = router;