import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from './pages/Authentification/LoginForm';
import { SignUpForm } from './pages/Authentification/SignUpForm';
import './App.css';
import 'tailwindcss/tailwind.css';



// import subpages from superadmin user
import { InputSearchProvider, MessageProvider, PopupProvider } from './components/useContext';
import { SuperAdmin }  from './pages/SuperAdmin/SuperAdmin';
import { Users }  from './pages/SuperAdmin/Subpages/Users';
import { Products } from './pages/SuperAdmin/Subpages/Products';
import { Suppliers }  from './pages/SuperAdmin/Subpages/Suppliers';
import { Clients } from './pages/SuperAdmin/Subpages/Clients';
import { AddPurchase, AllPurchase, Demande } from './pages/SuperAdmin/Subpages/Purchase';
import { AddSelling, AllSellings } from './pages/SuperAdmin/Subpages/Selling';
import { Error} from './pages/Error'



function App() {
  
  return <div className='log-interface'>
    <InputSearchProvider>
      <PopupProvider>
        <MessageProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/sign-up' element={<SignUpForm/>}/>
              <Route path='/' element={<LoginForm/>}/> 
              
                
                  <Route path='/superadmin/*' element={<SuperAdmin />}>
                    <Route path='users/*' element ={<Users/>}/>  
                    <Route path='suppliers/*' element ={<Suppliers/>}/>        
                    <Route path='clients/*' element ={<Clients/>}/>        
                    <Route path='products/*' element ={<Products/>}/>        
                    <Route path='purchases' element ={<AllPurchase/>}/>
                    <Route path='purchases/new-purchase' element ={<AddPurchase/>}/>
                    <Route path='sellings/new-selling' element ={<AddSelling/>}/>
                    <Route path='sellings' element ={<AllSellings/>}/>
                   
                </Route>
                
              
              <Route path='/*' element={<Error/>}/>     
              
            </Routes>
          </BrowserRouter>
        </MessageProvider>
      </PopupProvider>
    </InputSearchProvider>   
</div>
  
}

 {/* <Route path='/superadmin/users/new-user' element ={<AddUser/>}/>   */}
                    {/* <Route path='/superadmin/products' element ={<AllProducts/>}/>
                    <Route path='/superadmin/products/new-product' element ={<AddProduct/>}/>
                    <Route path='/superadmin/suppliers' element ={<AllSuppliers/>}/>
                    <Route path='/superadmin/suppliers/new-supplier' element ={<AddSupplier/>}/>
                    <Route path='/superadmin/clients' element ={<AllClients/>}/>
                    <Route path='/superadmin/clients/new-client' element ={<AddClient/>}/>
                    <Route path='/superadmin/purchases' element ={<AllPurchase/>}/>
                    <Route path='/superadmin/purchases/new-purchase' element ={<AddPurchase/>}/>
                    <Route path='/superadmin/sellings' element ={<AllSellings/>}/>
                    <Route path='/superadmin/sellings/new-selling' element ={<AddSelling/>}/> */}

export default App;
