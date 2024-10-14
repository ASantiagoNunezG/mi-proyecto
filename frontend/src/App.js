import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usuarios/list" element={<UserList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
