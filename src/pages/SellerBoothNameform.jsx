import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/SellerBoothNameform.css';
import axios from 'axios';

function SellerBoothNameform() {

  const navigate = useNavigate();
  const location = useLocation();

  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState('');
  const [boothName, setBoothName] = useState('');
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');

  useEffect(() => {
      console.log("Location state:", location.state);
      if (location.state?.userId) {
          setUserId(location.state.userId);
          console.log("User ID set to:", location.state.userId);
      } else {
          console.log("No userId found in location.state");
          setUserId("defaultUserId"); // Or handle the case appropriately
      }
  }, [location.state]);

  const saveBooth = async (e) => {
    e.preventDefault();

        console.log("saveBooth is called"); // To check if the function is being called

        if (!boothName || !opening || !closing) {
          setMsg("Please fill in all the fields");
          return;
      }

      try {
        const response = await axios.post("http://localhost:5000/booth", {
        name: boothName,
        openingTime: opening,
        closingTime: closing,
        userId: userId,
        });
        console.log("Ready To be Submitted", response.data);
        console.log("Booth saved successfully:", response.data);

        navigate("/");

    } catch (error) {
        if (error.response) {
        setMsg(error.response.data.msg);
        }
    }
  };

  const [formData, setFormData] = useState({
        productImage: null, // Image file
        previewImage: "", // Preview URL for the image
      });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
    ...formData,
    productImage: file,
    previewImage: URL.createObjectURL(file), // Create URL for preview
    });
  };

  const [openTime, setOpenTime] = useState('');


  return (
    <div className='seller-booth-form-container'>
      <div className="seller-booth-form-wrapper">
        <h3 className="booth-title">Enter Your Booth Name</h3>
        <p className='errorMsg'>{msg}</p>

        <form onSubmit={saveBooth}>
          <h5 className='booth-label'>Booth Name:</h5>
          <input className='booth-input' type="text" onChange={(e)=> setBoothName(e.target.value)} placeholder='Booth Name' />

          <h5 className="time-open-booth-text">Time Open Booth:</h5>
          <input type="time" className="time-open-booth" onChange={(e)=> setOpening(e.target.value)}/>

          <h5 className="time-close-booth-text">Time Close Booth:</h5>
          <input type="time" className="time-close-booth" onChange={(e)=> setClosing(e.target.value)}/>

          <label htmlFor="productImage">Booth Image:</label>
            <input
              className='image-input'
              type="file"
              id="productImage"
              name="productImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            {formData.previewImage && (
              <img src={formData.previewImage} alt="Product" className="product-image" />
            )}

          <button className="submit-booth-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SellerBoothNameform;