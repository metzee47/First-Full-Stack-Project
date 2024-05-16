import { PiNumberSquareZeroFill, PiNumberSquareFourFill } from "react-icons/pi";
import { FaFaceSadTear } from "react-icons/fa6";
import './Error.css'
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";


export function Error (){
    return (
        <>
        <Header/>
        <Sidebar/>
        <div className="error-interface">
            <div className="error-container">
                <div className="error-img">
                    <PiNumberSquareFourFill className="error-icon"/>
                    <PiNumberSquareZeroFill className="error-icon"/>
                    <PiNumberSquareFourFill className="error-icon"/>
                </div>

                <div className="error-text">
                    <p>Nous sommes desoles <span><FaFaceSadTear/></span>, mais la page que vous demandez est introuvable</p>
                </div>
            </div>
        </div>
        </>
    )
}