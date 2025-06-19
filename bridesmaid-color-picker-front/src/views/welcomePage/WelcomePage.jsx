import NamePicker from '../../components/NamePicker/NamePicker.jsx';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import getAvaibleColors from '../../api/colors.js'
import Title from '../../components/Title/Title';
import Header from '../../components/Header/Header.jsx';
import styles from './WelcomePage.module.css'

export default function WelcomePage() {
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
            <Header />
            <div className={styles.wraperContainer}>



                <div className={styles.collumWrapper}>

                    <Title size='large' text='Bem-vinda à corrida das madrinhas!' />

                    <div className={styles.infoWrapper}>

                        <p> As regras para a escolha da cor do vestido são: </p>
                        <p>- As numerações aqui contidas correspondem aos números inseridos no catálogo de cores enviado pelos noivos; </p>
                        <p>- Após o sinal da noiva, todas devem selecionar a cor desejada e enviar para submissão; </p>
                        <p>- Apenas uma cor pode ser escolhida por pessoa; </p>
                        <p>- Após a escolha de determinada cor, ela sumirá da lista; </p>
                        <p>- Caso a cor escolhida esteja indisponível, escolha outra e repita o processo; </p>
                        <p>- Divirta-se!! </p>

                    </div>



                    <Title size='medim' text='Preencha seu nome' />

                    <NamePicker
                        setNameFunction={setName}
                        nameState={name} />
                    <div className="card">


                        <button onClick={() => {
                            getColors()
                            getUserId()
                        }}>
                            Enviar
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}