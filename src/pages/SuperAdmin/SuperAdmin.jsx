// import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../../components/header"
import { Sidebar } from "../../components/sidebar"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export function SuperAdmin(){

    const navigate = useNavigate()

    /*

    useEffect(()=>{

        if(localStorage.getItem('login') === 'false')
            navigate('/')
    }, [])

    */
    

    return <>
        <Sidebar/>
        <Header/>
        <Outlet></Outlet>
    </>  
        
            
            
        

}