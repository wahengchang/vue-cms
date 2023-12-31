function isObjectIdPattern(str) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(str);
}

const createOrGetCategoryByIdAndName = async (CategoryModel, categoryInput) => {
    if(!categoryInput) return null

    const query = isObjectIdPattern(categoryInput) ? { _id: categoryInput } : { name: categoryInput };
    const todoCategory = await CategoryModel.findOne(query);

    if (!todoCategory) {
      return await (new CategoryModel(query)).save();
    }

    return todoCategory
}

const normalizeRequestBody = async (req, TypeModel, systemKey, CategoryModel) => {
    const requestBody = req.body
    const userId = req.user._id
    const modelKeys = Object.keys(TypeModel.schema.paths);
    const validKeys = Object.keys(requestBody).filter((key) => modelKeys.includes(key) && !systemKey.includes(key));
    const todoCategory = await createOrGetCategoryByIdAndName(CategoryModel, requestBody['category'])
  
    const newTodoData = {};
    validKeys.forEach((key) => {
      newTodoData[key] = requestBody[key];
    });
  
    newTodoData.creator = userId;
    newTodoData.category = todoCategory ? todoCategory._id : null
    return newTodoData
  }
  
module.exports = {
    createOrGetCategoryByIdAndName,
    normalizeRequestBody
}