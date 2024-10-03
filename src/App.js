
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import Meals from './pages/Meals';
import Drink from './pages/Drink';
import Dessert from './pages/Dessert';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Adminpage from './pages/Adminbuyerpage';
import Adminsellerpage from './pages/Adminsellerpage';
import Admindeliverypage from './pages/Admindeliverypage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';  
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>    
        <Route path='/meals' element={<Meals/>}/>    
        <Route path='/drink' element={<Drink/>}/>    
        <Route path='/dessert' element={<Dessert/>}/>    
        <Route path='/cart' element={<Cart/>}/>    
        <Route path='/payment' element={<Payment/>}/>    
        <Route path='/adminbuyer' element={<Adminpage/>}/>    
        <Route path='/adminseller' element={<Adminsellerpage/>}/>    
        <Route path='/admindelivery' element={<Admindeliverypage/>}/>    
      </Routes>
    </Router>
  );
}

export default App;
