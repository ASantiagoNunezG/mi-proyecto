// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig.js'); // Conexión a tu base de datos

// Registro de usuario
exports.register = async (req, res) => {
    const { nombres, apellidos, correo, clave } = req.body;

    // Verificar si el correo ya existe
    const existingUser = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (existingUser[0].length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la clave
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Registrar el usuario
    await db.query('INSERT INTO usuarios (nombres, apellidos, correo, clave) VALUES (?, ?, ?, ?)',
        [nombres, apellidos, correo, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { correo, clave } = req.body;

    // Buscar al usuario por correo
    const user = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (user[0].length === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la clave
    const validPassword = await bcrypt.compare(clave, user[0][0].clave);
    if (!validPassword) {
        return res.status(400).json({ message: 'Clave incorrecta' });
    }

    // Guardar sesión
    req.session.userId = user[0][0].id;
    res.json({ message: 'Inicio de sesión exitoso' });
};

// Listar usuarios (requiere sesión)
exports.listUsers = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'No ha iniciado sesión' });
    }

    const users = await db.query('SELECT id, nombres, apellidos, correo FROM usuarios');
    res.json(users[0]);
};

// Eliminar usuario (requiere sesión)
exports.deleteUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'No ha iniciado sesión' });
    }

    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
};
