import { Link, useNavigate } from "react-router-dom";
import './header-sidebar.css'

// icons imports
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { BiCartAlt } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRef, useState } from "react";
//import { userRef } from "react";


export function Sidebar(){

    const navigate = useNavigate()
    //const userRef = userRef()

    const [active, setActive] = useState()
    const [optionsVisible, setOptionsVisible] = useState('');

    const ShowFullSidebar = () => {
        const refClassname = sidebarRef.current.className
        if (refClassname === "sidebar") 
            sidebarRef.current.className = "sidebar sidebar-hover"
        
        if (refClassname === "sidebar sidebar-hover")
            sidebarRef.current.className = "sidebar"
    
    }

    const sidebarRef = useRef()

    return <div className="sidebar" ref={sidebarRef}>

        <div className="hamburger-menu" onMouseDown={ShowFullSidebar}>
            <RxHamburgerMenu className="icon"/>
        </div>

        <div className="menu-sidebar">

            <div className={`icon-tag ${active === 'Users' ? 'clicked': ''}`}
                id="Users"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/Users')}
                }>
                    <FaUsers className="icon"/>
                    <span>Users</span>
            </div>

            <div className={`icon-tag ${active === 'Produits' ? 'clicked': ''}`}
                id="Produits"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/products')}
                }>
                <AiFillProduct className="icon"/>
                <span>Produits</span>
            </div>

            <div className={`icon-tag ${active === 'Fournisseurs' ? 'clicked': ''}`}
                id="Fournisseurs"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/suppliers')}
                }>
                <FaUserPlus className="icon"/>
                <span>Fournisseurs</span>
            </div>

            <div className={`icon-tag ${active === 'Achat' ? 'clicked': ''}`}
                id="Achat">
                <BiCartAlt className="icon" onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/purchases')}
                }/>
                <span onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/purchases')}
                }>Achat</span>
                <IoIosArrowDropdownCircle className="icon" 
                    onMouseDown={() => setOptionsVisible(optionsVisible == 'Achat' ? '' : 'Achat')}
                    // onMouseLeave={() => setOptionsVisible('')}
                />
                
                    <ul className={`options ${optionsVisible == 'Achat' ? 'show-icon-options': ''}`}>
                        <Link to={'/superadmin/purchases/new-purchase'}><li className="option">Demande achat</li></Link>
                        
                        <li className="option">Livraison</li>
                        <li className="option">Gestion retour</li>
                    </ul>
                
            </div>

            <div className={`icon-tag ${active === 'Vente' ? 'clicked': ''}`}
                id="Vente"
                >
                <MdSell className="icon"onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    // navigate('/superadmin/sellings')}
                }
                }/>
                <span onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    // navigate('/superadmin/sellings')}
                }
                }>Vente</span>
                <IoIosArrowDropdownCircle className='icon' 
                    onMouseDown={() => setOptionsVisible(optionsVisible == 'Vente' ? '' : 'Vente')}
                    // onMouseLeave={() => setOptionsVisible('')}
                />
                
    
                    <ul className={`options ${optionsVisible == 'Vente' ? 'show-icon-options': ''}`}>
                        <li className="option">Emettre vente</li>
                        <li className="option">Livraison</li>
                        <li className="option">Gestion retour</li>
                    </ul>
                
            </div>

            <div className={`icon-tag ${active === 'Clients' ? 'clicked': ''}`}
                id="Clients"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)
                    navigate('/superadmin/clients')}
                }>
                <FaHospitalUser className="icon"/>
                <span>Clients</span>
            </div>

            
        </div>
    </div>
}