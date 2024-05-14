import logo from '../assets/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
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
        <div className="header-buttons">
            <button className="notif-button button" onClick={()=> null}><IoMdNotifications/><span>0</span></button>
            <button className="disconnect-button button" onClick={()=> navigate('/')}><RiLogoutCircleRLine/></button>
        </div>
        
    </div>
}