// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
    const [formData, setFormData] = useState({
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
            const response = await fetch('http://localhost:8000/usuarios/login', {
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
            <h2>Iniciar Sesión</h2>
            <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="clave" placeholder="Clave" onChange={handleChange} required />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
