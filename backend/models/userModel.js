//backend/models/userModel.js
const db = require('../config/dbConfig');

exports.create = async (userData) => {
    const { nombres, apellidos, correo, clave } = userData;
    const [result] = await db.execute('INSERT INTO usuarios (nombres, apellidos, correo, clave) VALUES (?, ?, ?, ?)', [nombres, apellidos, correo, clave]);
    return result;
};

exports.findByEmail = async (correo) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows[0];
};

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
};

exports.delete = async (id) => {
    const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result;
};
