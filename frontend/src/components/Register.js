// src/components/Register.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Register = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        clave: '',
    });
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                setIsAuthenticated(true); // Establecer autenticación
                navigate('/users'); // Redirigir a la lista de usuarios
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input type="text" name="nombres" placeholder="Nombres" onChange={handleChange} required />
            <input type="text" name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
            <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="clave" placeholder="Clave" onChange={handleChange} required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
