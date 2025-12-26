'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Shield, Check, AlertCircle } from 'lucide-react';

interface RegisterPageProps {
  onBackToLogin: () => void;
}

export default function RegisterPage({ onBackToLogin }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (!formData.email || !formData.username || !formData.password || !formData.fullName) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (passwordStrength < 2) {
      setError('Le mot de passe doit être plus fort');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de l\'inscription');
        setLoading(false);
        return;
      }

      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      onBackToLogin();
    } catch (err) {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const texts = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    return texts[passwordStrength] || 'Très faible';
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
            <p className="text-xl text-red-100">Créez votre compte en 5 minutes</p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={18} className="text-gray-900" />
            </div>
            <p className="text-red-100">Accès immédiat à vos comptes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={18} className="text-gray-900" />
            </div>
            <p className="text-red-100">Virements instantanés gratuits</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={18} className="text-gray-900" />
            </div>
            <p className="text-red-100">Support 24h/24 et 7j/7</p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-red-200">© 2025 Société Générale. Tous droits réservés.</p>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Inscription</h2>
              <p className="text-gray-600">Créez votre compte Société Générale</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex gap-3">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet 
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="Choisissez un identifiant"
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
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      checkPasswordStrength(e.target.value);
                    }}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition outline-none"
                    placeholder="Mot de passe sécurisé"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Indicateur de force */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Utilisez des majuscules, minuscules, chiffres et caractères spéciaux
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3.5 rounded-xl font-semibold hover:from-red-800 hover:to-red-900 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </div>

            {/* Conditions */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              En créant un compte, vous acceptez nos <a href="#" className="text-red-700 hover:underline">conditions d'utilisation</a>
            </p>

            <div className="mt-6 text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-3">Vous avez déjà un compte ?</p>
              <button
                onClick={onBackToLogin}
                className="w-full text-red-700 hover:text-red-800 font-semibold hover:underline py-2"
              >
                Se connecter maintenant
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2024 Société Générale. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}