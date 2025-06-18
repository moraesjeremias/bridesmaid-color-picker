import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import getAvaibleColors from './api/colors'
import './App.css'
import Title from './components/Title';
import Card from './components/Card';
import NamePicker from './components/NamePicker';
import Info from './components/Info';

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("");

  useEffect(() => {
    let userId = Cookies.get("userId");
    if (!userId) {
      const random = Math.random().toString(36).substring(2) + Date.now();
      userId = CryptoJS.SHA256(random).toString(CryptoJS.enc.Hex);
      Cookies.set("userId", userId, { expires: 365 });
    }
  }, []);

  const getUserId = () => {
    console.info(Cookies.get("userId"));
  }

  const getColors = async () => {
    const colors = await getAvaibleColors();
    console.log(colors)
  }

  return (
    <>
    <Title />
    <Card components={
        [
        <Info></Info>,
        <NamePicker 
            setNameFunction={setName} 
            nameState={name}
        />]
    }/>
      <div className="card">
        <button onClick={() => {
            setCount((count) => count + 1)
            getColors()
            getUserId()
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
