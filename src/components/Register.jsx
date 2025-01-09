import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { register } from '../api/auth';
import Layout from './Layout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register(email, password);
    const data = await response.json();
    if (response.status === 201) {
      if (data.user) {
        setUser(data.user);
      }
      if (data.token) {
        setToken(data.token);
      }
      navigate('/tutoring');
    } else {
      console.error('Registration failed:', data.message);
      setError(data.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('register.title')}</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder={t('register.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder={t('register.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            {t('register.registerButton')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t('register.loginHere')}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;