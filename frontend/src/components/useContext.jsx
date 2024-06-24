import React, { createContext, useContext, useState } from "react";


// global input search context
const inputSearchContext = createContext()

export const InputSearchProvider = ({children}) => {

    const [inputSearch, setInputSearch] = useState('')

    return (
        <inputSearchContext.Provider value={[inputSearch, setInputSearch]}>
            {children}
        </inputSearchContext.Provider>
    )

};

export const useInputSearch = () => useContext(inputSearchContext);


//glabal customised message

const messageContext = createContext({
    showMessage: false,
    content: ``,
    errorMessage: false

})

export const MessageProvider = ({children}) => {

    const [message, setMessage] = useState({
        showMessage: false,
        content: ``,
        errorMessage: false

    })

    return (
        <messageContext.Provider value={[message, setMessage]}>
            {children}
            {
                message.showMessage && 
                <div className={`message ${message.errorMessage ? 'message-error' : ''}`}>
                    <p className="message-content">{message.content}</p>
                </div> 
            } 
        </messageContext.Provider>
    )

};

export const useMessage = () => useContext(messageContext);


//global customised popup

const popupContext = createContext({
    showPopup: false,
    title: ``,
    content: ``,
    answer: false,
    dangerPopup: false,
})

export const PopupProvider = ({children}) => {

    const [popup, setPopup] = useState({
        showPopup: false,
        title: ``,
        content: ``,
        answer: false,
        dangerPopup: false,
    })


    return (
        <popupContext.Provider value={[popup, setPopup]}>
            {children}

            {
                popup.showPopup &&
                <div className={`popup ${popup.dangerPopup ? 'danger-popup': ''}`}>
                <h3 className="title">{popup.title}</h3>
                <p className="content">{popup.content}</p>
                <div className="buttons">
                    {popup.dangerPopup ? <><button className="dont-do-it" onClick={() => setPopup({...popup, showPopup: false})}>Cancel</button>
                    <button className="do-it" onClick={() => setPopup({...popup, showPopup: false, answer: true})}>Confirm</button></> : 
                    <button onClick={() => setPopup({...popup, showPopup: false})}>Okay</button> }
                    
                </div>
            </div>
            }
        </popupContext.Provider>
    )
}

export const usePopup = () => useContext(popupContext);