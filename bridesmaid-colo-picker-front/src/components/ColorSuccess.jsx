import { CheckCircle, Heart, Share2 } from 'lucide-react';
import { useEffect } from 'react';

const ColorSuccess = ({ user, selectedColor, onReset }) => {

useEffect(() => {
    console.log("selectedColor");
  console.log(selectedColor);
}, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Minha Cor de Madrinha!',
        text: `Acabei de reservar a cor ${selectedColor.displayName}-${selectedColor.id} para ser Madrinha da Maria! 💕`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Acabei de reservar a cor ${selectedColor.displayName}-${selectedColor.id} para ser bridesmaid! 💕`
      );
      alert('Texto copiado para a área de transferência!');
    }
  };

  return (
    <div className="card max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Parabéns, {user.name}! 🎉
        </h2>
        <p className="text-gray-600">
          Sua cor foi reservada com sucesso!
        </p>
      </div>

      <div className="mb-6 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
        <div
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          style={{ backgroundColor: selectedColor.hex }}
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {selectedColor.displayName}
        </h3>
        <p className="text-gray-600 text-sm">
          Esta é sua cor especial para o grande dia!
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleShare}
          className="w-full btn-secondary flex items-center justify-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar Minha Escolha
        </button>
        
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Dica:</strong> Guarde seu ID de usuário para acessar suas informações depois: 
          <code className="block mt-1 bg-blue-100 px-2 py-1 rounded text-xs font-mono">
            {user.id}
          </code>
        </p>
      </div>
    </div>
  );
};

export default ColorSuccess; 