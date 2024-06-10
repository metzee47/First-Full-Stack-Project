import { useNavigate } from "react-router-dom";
import './sidebar.css'

// icons imports
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { BiCartAlt } from "react-icons/bi";
import { useState } from "react";
//import { userRef } from "react";


export function Sidebar(){

    const navigate = useNavigate()
    //const userRef = userRef()

    const [active, setActive] = useState(null)

    return <div className="sidebar">

        <div className="hamburger-menu">
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
                id="Achat"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/purchases')}
                }>
                <BiCartAlt className="icon"/>
                <span>Achat</span>
            </div>

            <div className={`icon-tag ${active === 'Vente' ? 'clicked': ''}`}
                id="Vente"
                onClick={(e)=> {
                    setActive(e.currentTarget.id)                    
                    navigate('/superadmin/sellings')}
                }>
                <MdSell className="icon"/>
                <span>Vente</span>
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