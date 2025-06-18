import { Heart } from 'lucide-react';

export default function Title() {
    return (
        <>
            <div className="header">
                <Heart className='header-icon'/>
                <h1 className="header-title">Corrida Das Madrinhas</h1>
                <Heart className='header-icon'/>
            </div>
        </>
    )
}