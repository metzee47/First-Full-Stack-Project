import logo from '../assets/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import './header-sidebar.css'
import { useNavigate } from 'react-router-dom';
import { useInputSearch } from './useContext';
export function Header(){

    const [search, setSearch] = useInputSearch()

    const navigate = useNavigate()

    const deconnexion = () => {
        if (window.confirm('Souhaitez-vous vous deconnectez du dashbord ?'))
            navigate('/')
    }


    return <div className='header'>
        <div className="logo">
            <img src={logo} alt="logo fadesol" className='logo-img'/>
        </div>
        <div className="search-bar">
            <input type="text" className='search-input'placeholder='Search...' value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <IoSearchOutline className='icon'/>
        </div>
        <div className="header-buttons">
            <button className="notif-button button" onClick={()=> null}><IoMdNotifications/><span>0</span></button>
            <button className="disconnect-button button" onClick={deconnexion}><RiLogoutCircleRLine/></button>
        </div>
        
    </div>
}