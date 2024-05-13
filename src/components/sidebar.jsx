import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { BiCartAlt } from "react-icons/bi";
import './sidebar.css'


export function Sidebar(){
    return <div className="sidebar">
        <div className="hamburger-menu">
            <RxHamburgerMenu className="icon"/>
        </div>
        <div className="menu-sidebar">

            <div className="icon-tag">
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