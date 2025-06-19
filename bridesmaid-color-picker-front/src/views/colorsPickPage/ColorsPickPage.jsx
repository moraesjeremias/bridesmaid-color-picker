import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import { getAvaibleColors } from "../../api/colors"
import { useEffect, useState } from "react";

export default function ColorsPickPage() {
    const [colors, setColors] = useState([]);

    const getColors = async () => {
        const availableColors = await getAvaibleColors();
        return setColors([...availableColors])
    }

    useEffect(() => {
        getColors
    }, [])

    return (
        <>
            <Header />
            <div className="wraperContainer">
                <div className="collumWrapper">
                    <Title
                        size='larger'
                        text='Escolhar sua cor '
                    />

                    <div className="rowWrapper">
                        <ul>
                            {colors.map((color, index) => {
                                <li key={index}>
                                    {color}
                                </li>
                            })}
                        </ul>
                    </div>

                    <button>
                        Escolher
                    </button>
                </div>
            </div>

        </>
    )
}