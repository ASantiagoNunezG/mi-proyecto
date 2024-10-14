// backend/app.js
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const app = express();


require('dotenv').config(); // Cargar las variables de entorno

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
    credentials: true, // Permitir el uso de credenciales
};
app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
    credentials: true // Permitir cookies
  }));

//app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SECRET_SESSION_KEY, // Usar la clave secreta desde la variable de entorno
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true en producción si usas HTTPS
}));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de usuario
app.use('/usuarios', userRoutes);

app.listen(8000, () => {
    console.log('Servidor corriendo en http://localhost:8000');
});
