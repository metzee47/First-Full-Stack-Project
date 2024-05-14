import { useNavigate } from "react-router-dom";
import './sidebar.css'

// icons imports
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { BiCartAlt } from "react-icons/bi";
import { userRef } from "react";


export function Sidebar(){

    const navigate = useNavigate()
    //const userRef = userRef()

    return <div className="sidebar">
        <div className="hamburger-menu">
            <RxHamburgerMenu className="icon"/>
        </div>
        <div className="menu-sidebar">

            <div 
                //ref={userRef} 
                className="icon-tag" 
                onClick={(e)=> {
                    navigate('/superadmin/users')}
                    }>
                        <FaUsers className="icon"/>
                        <span>Users</span>
            </div>

            <div className="icon-tag">
                <AiFillProduct className="icon"/>
                <span>Produits</span>
            </div>

            <div className="icon-tag">
                <FaUserPlus className="icon"/>
                <span>Fournisseurs</span>
            </div>

            <div className="icon-tag">
                <BiCartAlt className="icon"/>
                <span>Achat</span>
            </div>

            <div className="icon-tag">
                <MdSell className="icon"/>
                <span>Vente</span>
            </div>

            <div className="icon-tag">
                <FaHospitalUser className="icon"/>
                <span>Clients</span>
            </div>

            
        </div>
    </div>
}