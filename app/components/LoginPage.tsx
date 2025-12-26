'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Shield, Smartphone, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onGoToRegister: () => void;
}

export default function LoginPage({ onLoginSuccess, onGoToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la connexion');
        setLoading(false);
        return;
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Partie gauche - Bannière rouge et noire SG */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-700 via-red-600 to-gray-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-700 rounded-full opacity-20 -ml-36 -mb-36"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <span className="text-6xl font-bold text-white">SG</span>
            <div className="h-1 w-16 bg-gradient-to-r from-yellow-300 to-red-400 mt-3"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Société Générale</h2>
            <p className="text-xl text-red-100">Votre banque en ligne sécurisée</p>
          </div>
        </div>

        <div className="relative z-10 space-y-6 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-1">Sécurité maximale</h3>
              <p className="text-sm text-red-100">Vos données sont protégées avec le chiffrement de haut niveau</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Smartphone size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-1">Accès mobile</h3>
              <p className="text-sm text-red-100">Gérez vos comptes partout avec nos applications mobiles</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-1">Authentification forte</h3>
              <p className="text-sm text-red-100">Protection supplémentaire avec double authentification</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <p className="text-sm text-red-200">© 2025 Société Générale. Tous droits réservés.</p>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Logo juste au-dessus du formulaire */}
          <div className="flex justify-center mb-6">
            <img src="/SG_logo.png" alt="Logo SG" className="w-24 h-24 object-contain" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre espace Société Générale</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex gap-3">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Identifiant
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="Entrez votre identifiant"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="Entrez votre mot de passe"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3.5 rounded-xl font-semibold hover:from-red-800 hover:to-red-900 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm gap-4">
              <a href="#" className="text-red-700 hover:text-red-800 font-medium hover:underline">
                Mot de passe oublié ?
              </a>
              <div className="w-px h-5 bg-gray-200"></div>
              <button
                onClick={onGoToRegister}
                className="text-gray-600 hover:text-red-700 font-medium hover:underline"
              >
                Créer un compte
              </button>
            </div>

            {/* Sécurité */}
            <div className="mt-6 p-3 bg-red-50 rounded-lg flex items-start gap-2">
              <Shield size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">
                <strong>Sécurisé :</strong> Vos informations sont protégées .
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2025 Société Générale. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
