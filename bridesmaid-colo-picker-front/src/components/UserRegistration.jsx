import { useState } from 'react';
import { Heart, User, Sparkles } from 'lucide-react';
import Cookies from 'js-cookie';
import { usersAPI } from '../services/api';

const UserRegistration = ({ onUserCreated }) => {
  const [name, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const userId = Cookies.get("userId");
      const userData = await usersAPI.createUser(name, userId);
      onUserCreated(userData);
    } catch (err) {
      setError('Erro ao criar usuário. Tente novamente.');
      console.error('Error creating user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Bem-vinda, Madrinha!
        </h2>
        <p className="text-gray-600">
          Registre-se para escolher sua cor especial.
          <br />
          Só precisamos de um nome para começar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Seu Nome e Sobrenome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Digite seu nome e sobrenome"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Criando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Começar a Escolher Cores
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserRegistration; 