// import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../../components/header"
import { Sidebar } from "../../components/sidebar"
// import { useNavigate } from "react-router-dom"


export function SuperAdmin({login}){

    //const navigate = useNavigate()

    return <div>        
        {   
            login && 
            <>
                <Sidebar/>
                <Header/>
                <Outlet></Outlet>
            </>
        }
    </div>

}