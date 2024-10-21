
import './App.css';
import React, { useState } from 'react';
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
import HistoryBuyer from './pages/HistoryBuyer';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import DeliveryPage from './pages/DeliveryPage';
import InProgress from './pages/InProgress';
import UpdateAdmin from './pages/UpdateAdmin';
import Sellerpage from './pages/Sellerpage';
import EditPictureSeller from './pages/EditPictureSeller';
import EditMenuSeller from './pages/EditMenuSeller';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';  
function App() {

  // const [uploadedImage, setUploadedImage] = React.useState(null);
  const [img, setImg] = useState('/path/to/default/image.jpg');
  
  const [menus, setMenus] = useState([
    {
      name: 'Nasi Goreng Special',
      price: 'Rp 20.000',
      description: 'Nasi goreng dengan topping telur dadar/mata sapi',
      image: ''
    },
    {
      name: 'Nasi Goreng Seafood',
      price: 'Rp 30.000',
      description: 'Nasi goreng dengan aneka seafood segar',
      image: ''
    },
    {
      name: 'Nasi Goreng Komplit',
      price: 'Rp 35.000',
      description: 'Nasi goreng dengan topping seafood dan telur dadar/mata sapi',
      image: ''
    },

  ]);

  const [editingMenuIndex, setEditingMenuIndex] = useState(null);

  const handleEditMenu = (index) => {
    setEditingMenuIndex(index);
  };

  const handleSaveMenu = (updatedMenu) => {
    const updatedMenus = [...menus];
    updatedMenus[editingMenuIndex] = updatedMenu;
    setMenus(updatedMenus);
    setEditingMenuIndex(null);
  };

  // const handleSaveImage = (image) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImg(reader.result);
  //   };
  //   reader.readAsDataURL(image);
  // };

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
        <Route path='/Sellerpage' element={<Sellerpage img={img} />}/>
        <Route path='/editpictureseller' element={<EditPictureSeller onSave={setImg}/>}/>
        <Route path='/editmenuseller' element={<EditMenuSeller/>}/>
        <Route path='/' element={<Navigate to='/Sellerpage'/>}/>  
        <Route path='/historybuyer' element={<HistoryBuyer/>}/>    
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>    
        <Route path='/paymentfail' element={<PaymentFail/>}/>    
        <Route path='/deliverypage' element={<DeliveryPage/>}/>    
        <Route path='/inprogress' element={<InProgress/>}/>       
        <Route path='/adminupdatecustomer' element={<UpdateAdmin/>}/>    
      </Routes>
    </Router>
  );
}

export default App;
