const express = require('express');
const router = express.Router();
const CategoryModel = require('./model/Category');
const { createOrGetCategoryByIdAndName } = require('../../../utils/modelUtils')

router.post('', async (req, res) => {
    const { name } = req.body;
    const category = await createOrGetCategoryByIdAndName(CategoryModel, name)
    res.json({ category });
})

router.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;

        const existingCategory = await CategoryModel.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await CategoryModel.findByIdAndDelete(categoryId);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.delete('/', async (req, res) => {
    try {
        const { name } = req.body;

        const existingCategory = await CategoryModel.findOne({ name });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await CategoryModel.findByIdAndDelete(existingCategory._id);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/all', async (req, res) => {
    const allCategory = await CategoryModel.find()
    res.json({ allCategory });
})


module.exports = router;