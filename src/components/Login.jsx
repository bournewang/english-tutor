import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth';
import { useUser } from '../context/UserContext';
import Layout from './Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    const data = await response.json();
    if (response.status === 200) {
      if (data.user) {
        setUser(data.user);
      }
      if (data.token) {
        setToken(data.token);
      }
      navigate('/tutoring');
    } else {
      console.error('Login failed:', data.message);
      setError(data.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {t('login.loginButton')}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            {t('login.registerHere')}
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login; 