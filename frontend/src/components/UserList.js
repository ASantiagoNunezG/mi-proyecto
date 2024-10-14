import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/usuarios/list', {
                credentials: 'include' // Esto es importante para enviar las cookies
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
