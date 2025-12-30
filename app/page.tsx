'use client';

import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

interface User {
  id?: string;
  email: string;
  username?: string;
  fullName?: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const goToRegister = () => {
    setCurrentPage('register');
  };

  const backToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} onGoToRegister={goToRegister} />
      )}
      {currentPage === 'register' && (
        <RegisterPage onBackToLogin={backToLogin} onRegisterSuccess={handleRegisterSuccess} />
      )}
      {currentPage === 'dashboard' && user && (
        <Dashboard user={user} handleLogout={handleLogout} />
      )}
    </>
  );
}