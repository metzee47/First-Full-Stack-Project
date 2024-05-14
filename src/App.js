import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginForm } from './pages/Authentification/LoginForm';
import { SignUpForm } from './pages/Authentification/SignUpForm';
import './App.css';
import { SuperAdmin } from './pages/SuperAdmin/SuperAdmin';
import { useState } from 'react';
import { RenderAllUsers, AddNewUser } from './pages/SuperAdmin/RenderUser/RenderUsers';

function App() {

  const [login, setLogin] = useState(true)

  return <div className='log-interface'>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUpForm/>}/>
        <Route path='/' element={<LoginForm setLogin={setLogin}/>}/> 
        <Route path='/superadmin' element={<SuperAdmin login={login}/>}>
          <Route path='/superadmin/users' element ={<RenderAllUsers/>}/>        
          <Route path='/superadmin/users/new-user' element ={<AddNewUser/>}/>        
        </Route>
        
      </Routes>
    </BrowserRouter>
</div>
  
}

export default App;
