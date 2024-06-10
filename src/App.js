import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginForm } from './pages/Authentification/LoginForm';
import { SignUpForm } from './pages/Authentification/SignUpForm';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Error} from './pages/Error'

// import subpages from superadmin user
import { SuperAdmin } from './pages/SuperAdmin/SuperAdmin';
import { AllUsers, AddUser } from './pages/SuperAdmin/Subpages/Users';
import { AllProducts, AddProduct } from './pages/SuperAdmin/Subpages/Products';
import { AddSupplier, AllSuppliers } from './pages/SuperAdmin/Subpages/Suppliers';
import { AddClient, AllClients } from './pages/SuperAdmin/Subpages/Clients';
import { AddPurchase, AllPurchase, Demande } from './pages/SuperAdmin/Subpages/Purchase';
import { AddSelling, AllSellings } from './pages/SuperAdmin/Subpages/Selling';



function App() {

  //const [login, setLogin] = useState(false)
  
  return <div className='log-interface'>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUpForm/>}/>
        <Route path='/' element={<LoginForm/>}/> 
        <Route path='/superadmin' element={<SuperAdmin/>}>
          <Route path='/superadmin/users' element ={<AllUsers/>}/>        
          <Route path='/superadmin/users/new-user' element ={<AddUser/>}/>  
          <Route path='/superadmin/products' element ={<AllProducts/>}/>
          <Route path='/superadmin/products/new-product' element ={<AddProduct/>}/>
          <Route path='/superadmin/suppliers' element ={<AllSuppliers/>}/>
          <Route path='/superadmin/suppliers/new-supplier' element ={<AddSupplier/>}/>
          <Route path='/superadmin/clients' element ={<AllClients/>}/>
          <Route path='/superadmin/clients/new-client' element ={<AddClient/>}/>
          <Route path='/superadmin/purchases' element ={<AllPurchase/>}/>
          <Route path='/superadmin/purchases/new-purchase' element ={<AddPurchase/>}/>
          <Route path='/superadmin/sellings' element ={<AllSellings/>}/>
          <Route path='/superadmin/sellings/new-selling' element ={<AddSelling/>}/>
        </Route>
        <Route path='/*' element={<Error/>}/>     
        
      </Routes>
    </BrowserRouter>



    
</div>
  
}

export default App;
