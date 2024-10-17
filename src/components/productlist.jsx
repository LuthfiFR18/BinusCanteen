import React, {useState} from 'react'
import '../style/ProductList.css';
import PopupUpdateAdmin from './PopupUpdateAdmin';
function ProductList() {

  const [showPopup, setShowPopup] = useState(false);
    const [storeClosed, setStoreClosed] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isClosingStore, setIsClosingStore] = useState(false);

    // const handleNavigate = (path) =>{
    //     navigate(path);
    // };

    const handleCloseStore = () => {
        setStoreClosed(true);
        setShowPopup(false);
    };

    const handlePopup = () => {
        // setPopupMassage(storeClosed ? 'Are you sure want to open your store?' : 'Are you sure want to close your store?');
        // setIsClosingStore(!storeClosed);
        // setShowPopup(true);
        // if (storeClosed) {
        //     setPopupMassage('Are you sure want to open your store?');
        // } else{
        //     setPopupMassage('Are you sure want to close your store?');
        // }
        const message = storeClosed 
            ? 'Are you sure want to open your store?' 
            : 'Are you sure want to close your store?';
        
        setPopupMessage(message);
        setIsClosingStore(!storeClosed);
        setShowPopup(true);
    };

    const handleOpenStore = () =>{
        setStoreClosed(false);
        setShowPopup(false);
    }

  return (
    <table className='product-table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name Product</th>
        <th>Price</th>
        <th>Product Type</th>
        <th>Seller Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>01</td>
            <td>Ayam Gulai</td>
            <td>Rp.30.000</td>
            <td>Food</td>
            <td>Mamat Suryono Cahyadi</td>
            <td>
                <button className='button-admin-seller-update' onClick={(handlePopup)}>Update</button>
                <button className='button-admin-seller-delete'>Delete</button>

                {showPopup &&(
                  <PopupUpdateAdmin
                  //message="Are you sure you want to close the store?"
                  // onConfirm={handleCloseStore}
                  message={popupMessage}
                  onConfirm={isClosingStore ? handleCloseStore : handleOpenStore}
                  onCancel={() => setShowPopup(false)}
                  isClosingStore={isClosingStore}
                  // onClose={() => setStoreClosed(true)}
                  />
              )} 
            </td>
        </tr>
    </tbody>
    </table>
  )
}

export default ProductList;