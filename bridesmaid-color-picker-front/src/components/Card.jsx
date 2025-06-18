export default function Card({components}) {
    return (
        <>
            <div className="card-container">
                <div className="cardx">
                    {components.map((component) => component)}
                </div>
            </div>
        </>
    )
}