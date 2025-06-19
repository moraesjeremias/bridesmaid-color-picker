import { useState, useEffect } from 'react'
import Header from './components/Header'
import UserRegistration from './components/UserRegistration'
import ColorPicker from './components/ColorPicker'
import ColorSuccess from './components/ColorSuccess'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { usersAPI } from './services/api';

function App() {
  const [user, setUser] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [currentStep, setCurrentStep] = useState('registration') // 'registration', 'picker', 'success'
  useEffect(() => {
    let userId = Cookies.get("userId");
    if (!userId) {
      const random = Math.random().toString(36).substring(2) + Date.now();
      userId = CryptoJS.SHA256(random).toString(CryptoJS.enc.Hex);
      Cookies.set("userId", userId, { expires: 365 });
    }
    validateUserHasPickedColor(userId);
  }, []);

  const validateUserHasPickedColor = async (userId) => {
    const userFromAPI = await usersAPI.getUser(userId);
    if(!userFromAPI) {
        setCurrentStep('registration');
        return;
    }
    if (!userFromAPI.hasPickedColor) {
        setUser(userFromAPI);
        setCurrentStep('picker');
        return;
    } else {
        setUser(userFromAPI);
        setCurrentStep('success');
        return;
    }
  }


  const handleUserCreated = (userData) => {
    setUser(userData)
    setCurrentStep('picker')
  }

  const handleColorSelected = (colorData) => {
    setSelectedColor(colorData)
    setCurrentStep('success')
  }

  const handleReset = () => {
    setUser(null)
    setSelectedColor(null)
    setCurrentStep('registration')
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'registration':
        return <UserRegistration onUserCreated={handleUserCreated} />
      case 'picker':
        return <ColorPicker user={user} onColorSelected={handleColorSelected} />
      case 'success':
        return (
          <ColorSuccess
            user={user}
            selectedColor={selectedColor}
            onReset={handleReset}
          />
        )
      default:
        return <UserRegistration onUserCreated={handleUserCreated} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-500 text-sm">
        <p>💕 Feito com amor para as madrinhas especiais da Maria 💕</p>
      </footer>
    </div>
  )
}

export default App
