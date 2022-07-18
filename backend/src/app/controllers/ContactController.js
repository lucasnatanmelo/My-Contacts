const ContactsRepository = require('../repositories/ContactsRepositoryPG');

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

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.status(201).json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    // Procura por id
    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Procura por email
    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(404).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);

    // Colocar um retorno que o usuário foi deletado
  }
}

module.exports = new ContactController();
