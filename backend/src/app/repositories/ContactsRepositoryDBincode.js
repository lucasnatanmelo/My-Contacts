// Instalar uuidV4 para criação de hashs
// yarn add uuidv4

const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Lucas',
    email: 'lucasnatan.dev@gmail.com',
    phone: '12345678',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus.dev@gmail.com',
    phone: '12344',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
      contacts = contacts.filter((contact) => contact.id != id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(
    id,
    {
      name, email, phone, category_id,
    },
  ) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
