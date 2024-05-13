import logo from '../assets/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import './header.css'
import { useNavigate } from 'react-router-dom';

export function Header(){

    const navigate = useNavigate()

  

    return <div className='header'>
        <div className="logo">
            <img src={logo} alt="logo fadesol" className='logo-img'/>
        </div>
        <div className="search-bar">
            <input type="text" className='search-input'placeholder='Search...'/>
            <IoSearchOutline className='icon'/>
        </div>
        <button className="disconnect-button" onClick={()=> navigate('/')}>Log out</button>
        
    </div>
}