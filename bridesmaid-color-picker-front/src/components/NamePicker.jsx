export default function NamePicker({setNameFunction, nameState}) {
    return (
        <>
            <div className="name-picker-container">
                <div className="name-picker-info">
                    <input
                    className="bridesmaid-input-name"
                    type="text"
                    placeholder="Enter your beautiful name..."
                    value={nameState}
                    onChange={event => {
                        setNameFunction(event.target.value);
                        console.log(nameState);
                    }}
                    required
                />
                </div>
            </div>
        </>
    )
}
