const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

// Rotas para Contatos
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// Rotas para Categorias
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);
module.exports = router;
