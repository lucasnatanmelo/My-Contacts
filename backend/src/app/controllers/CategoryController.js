const CategoriesRespository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

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

    response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoriesRespository.findById(id);

    console.log(category);

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!category) {
      // 404: Not Found
      return response.status(404).json({ error: 'Category not found' });
    }

    await CategoriesRespository.delete(id);
    // 204: No Content
    response.sendStatus(204);

    // Colocar um retorno que o usuário foi deletado
  }
}

module.exports = new CategoryController();
