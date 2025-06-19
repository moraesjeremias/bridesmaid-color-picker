import './Header.module.css'
import { Heart } from 'lucide-react';
import Title from '../Title/Title';

export default function Header() {
    return (
            <header>
                <Heart className='headerIcon' fill='#ec4899'/>
                <Title size='giant' className="header-title" text='Corrida Das Madrinhas'/>
                <Heart className='headerIcon' fill='#ec4899'/>
            </header>
    )
}