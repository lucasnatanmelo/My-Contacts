const CategoriesRespository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRespository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const category = await CategoriesRespository.create({ name });

    response.stats(201).json(category);
  }
}

module.exports = new CategoryController();
