// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para registrar usuario
router.post('/register', userController.register);

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para listar usuarios (requiere estar logueado)
router.get('/list', userController.listUsers);

// Ruta para eliminar usuario (requiere estar logueado)
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
