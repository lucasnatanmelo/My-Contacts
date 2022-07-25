const ContactsRepository = require('../repositories/ContactsRepositoryPG');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    // Para liberar para todos
    // response.setHeader('Acess-Control-Allow-Origin', '*');

    // Para liberar o acesso para o localhost:3000
    // response.setHeader('Acess-Control-Allow-Origin', 'https://localhost:3000');
    response.json(contacts);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  // Criar um novo registro
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category Id' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category Id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Procura por id
    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    // Procura por email
    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(404).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(200).json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);

    // Colocar um retorno que o usuário foi deletado
  }
}

module.exports = new ContactController();
