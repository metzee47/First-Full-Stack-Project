import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginForm } from './pages/Authentification/LoginForm';
import { SignUpForm } from './pages/Authentification/SignUpForm';
import './App.css';
import { SuperAdmin } from './pages/SuperAdmin/SuperAdmin';
import { useState } from 'react';
import { AllUsers, AddUser } from './pages/SuperAdmin/Render/Users';
import { Error} from './pages/Error'
import { AllProducts } from './pages/SuperAdmin/Render/Products';

function App() {

  const [login, setLogin] = useState(true)

  return <div className='log-interface'>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUpForm/>}/>
        <Route path='/' element={<LoginForm setLogin={setLogin}/>}/> 
        <Route element={<SuperAdmin login={login}/>}>
          <Route path='/superadmin/users' element ={<AllUsers/>}/>        
          <Route path='/superadmin/users/new-user' element ={<AddUser/>}/>  
          <Route path='/superadmin/products' element ={<AllProducts/>}/>
        </Route>
        <Route path='/*' element={<Error/>}/>     
        
      </Routes>
    </BrowserRouter>
</div>
  
}

export default App;
