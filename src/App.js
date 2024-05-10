import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import './App.css';


function App() {

  return <div className='log-interface'>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUpForm/>}/>
        <Route path='/' element={<LoginForm/>}/>       
      </Routes>
    </BrowserRouter>
</div>
  
}

export default App;
