import { useState, useEffect } from 'react';
import { Palette, Check, X, RefreshCw } from 'lucide-react';
import { colorsAPI } from '../services/api';

const ColorPicker = ({ user, onColorSelected }) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setIsLoading(true);
      const data = await colorsAPI.getColors(true);
      setColors(data);
    } catch (err) {
      setError('Erro ao carregar cores. Tente novamente.');
      console.error('Error fetching colors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorSelect = (color) => {
    if (color.status === 'AVAILABLE') {
      setSelectedColor(color);
      setError('');
      setSuccess('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedColor) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await colorsAPI.chooseColor(user.id, selectedColor.id);
      setSuccess('Cor reservada com sucesso! 🎉');
      onColorSelected(selectedColor);
      
      // Refresh colors to show updated status
      setTimeout(() => {
        fetchColors();
      }, 1000);
    } catch (err) {
        if (err.response.status === 404) {
            setError('Cor já reservada. Clique no botão para atualizar as cores e tente outra cor.');
        }  
      console.info('Error choosing color:');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: { text: 'Disponível', class: 'bg-green-100 text-green-800' },
      RESERVED: { text: 'Reservada', class: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { text: 'Confirmada', class: 'bg-blue-100 text-blue-800' },
    };
    
    const config = statusConfig[status] || statusConfig.AVAILABLE;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="card max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cores disponíveis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Escolha sua Cor, {user.name}! 💕
        </h2>
        <p className="text-gray-600">
          Clique em uma cor para selecioná-la
          <br />
          Depois clique no botão "Reservar esta Cor".
        </p>
      </div>


      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800">{success}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {colors.map((color) => (
          <div
            key={color.id}
            className={`text-center ${
              color.status !== 'AVAILABLE' ? 'opacity-60' : ''
            }`}
          >
            <div
              className={`color-swatch mx-auto mb-2 ${
                selectedColor?.id === color.id ? 'selected' : ''
              } ${color.status !== 'AVAILABLE' ? 'reserved' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorSelect(color)}
            />
            <p className="text-sm font-medium text-gray-800 mb-1">
              {color.displayName}-{color.id}
            </p>
            {getStatusBadge(color.status)}
          </div>
        ))}
      </div>

      {selectedColor && selectedColor.status === 'AVAILABLE' && (
        <div className="text-center">
          <div className="mb-4 p-4 bg-primary-50 rounded-lg">
            <p className="text-primary-800 font-medium">
              Cor selecionada: <span className="font-bold">{selectedColor.displayName}-{selectedColor.id}</span>
            </p>
            <div
              className="w-8 h-8 rounded-full mx-auto mt-2 border-2 border-white shadow-md"
              style={{ backgroundColor: selectedColor.hex }}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Reservando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Reservar esta Cor
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}
      
      <div className="text-center mt-6">
        <button
          onClick={fetchColors}
          className="btn-secondary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar Cores
        </button>
      </div>
    </div>
  );
};

export default ColorPicker; 