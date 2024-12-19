
import './App.css';
import React, { useState } from 'react';
import Register from './pages/Register';
import SellerBoothNameform from './pages/SellerBoothNameform';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordVerification from './pages/ResetPasswordVerification';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Drink from './pages/Drink';
import Dessert from './pages/Dessert';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Adminpage from './pages/Adminbuyerpage';
import Adminsellerpage from './pages/Adminsellerpage';
import HistoryBuyer from './pages/HistoryBuyer';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import DeliveryPage from './pages/DeliveryPage';
import InProgress from './pages/InProgress';
import Sellerpage from './pages/Sellerpage';
import EditPictureSeller from './pages/EditPictureSeller';
import EditMenuSeller from './pages/EditMenuSeller';
import AddListMenuSeller from './pages/AddListMenuSeller';
import OrderListSeller from './pages/OrderListSeller';
import ListMenuSeller from './pages/ListMenuSeller';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'; 
import { MenuProvider } from './app/MenuContext'; 
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
    <MenuProvider>
      <Router>
        <Routes>
          <Route path='/'element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/sellerbooth' element={<SellerBoothNameform/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/resetpasswordverification' element={<ResetPasswordVerification/>}/>
          <Route path='/changepassword' element={<ChangePassword/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>    
          <Route path='/meals/:boothId' element={<Meals/>}/>    
          <Route path='/drinks/:boothId' element={<Drink/>}/>    
          <Route path='/desserts/:boothId' element={<Dessert/>}/>    
          <Route path='/cart' element={<Cart/>}/>    
          <Route path='/payment' element={<Payment/>}/>    
          <Route path='/adminbuyer' element={<Adminpage/>}/>    
          <Route path='/adminseller' element={<Adminsellerpage/>}/>    
          <Route path='/Sellerpage' element={<Sellerpage img={img} />}/>
          <Route path='/editpictureseller' element={<EditPictureSeller onSave={setImg}/>}/>
          <Route path='/editmenuseller' element={<EditMenuSeller/>}/>
          <Route path='/orderlistseller' element={<OrderListSeller/>}/>
          <Route path='/listmenuseller' element={<ListMenuSeller/>}/>
          <Route path='/' element={<Navigate to='/Sellerpage'/>}/> 
          <Route path='/addlistmenuseller' element={<AddListMenuSeller/>}/> 
          <Route path='/historybuyer' element={<HistoryBuyer/>}/>    
          <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>    
          <Route path='/paymentfail' element={<PaymentFail/>}/>    
          <Route path='/deliverypage' element={<DeliveryPage/>}/>    
          <Route path='/inprogress' element={<InProgress/>}/>
          <Route path='/SellerBoothNameform' element={<SellerBoothNameform/>}/>       
        </Routes>
      </Router>
    </MenuProvider>
  );
}

export default App;
