import './Title.module.css'


function Title({ text, size }) {
    const titleSize = {
        "giant": () => <h1>{text}</h1>,
        "large": () => <h2>{text}</h2>,
        "medium": () => <h3>{text}</h3>,
        "small": () => <h4>{text}</h4>
    };

    return titleSize[size] ? titleSize[size]() : <h4>{text}</h4>;
}

export default Title;