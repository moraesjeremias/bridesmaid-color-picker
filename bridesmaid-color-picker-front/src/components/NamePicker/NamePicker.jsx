import "./NamePicker.module.css"


export default function NamePicker({setNameFunction, nameState}) {
    return (
            <div className="name-picker-container">
                    <input
                    className="bridesmaid-input-name"
                    type="text"
                    placeholder="Escreva aqui seu nome..."
                    value={nameState}
                    onChange={event => {
                        setNameFunction(event.target.value);
                        console.log(nameState);
                    }}
                    required
                />
            </div>
    )
}
