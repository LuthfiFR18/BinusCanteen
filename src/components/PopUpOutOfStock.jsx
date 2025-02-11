import '../style/Sellerpage.css'; // Include CSS file for styling
import React from 'react';
import PropTypes from 'prop-types';

function PopUpOutOfStock({ message, onConfirm, onCancel, isOutOfStock }) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-popup-btn" onClick={onCancel}>×</button>
          <p>{message}</p>
          <div className="popup-buttons">
            <button 
                className="popup-confirm-btn" 
                onClick={onConfirm}
                style={{ background: isOutOfStock ? 'red' : '#FF9D00' }}
            >
                Yes
            </button>
            <button 
                className="popup-cancel-btn" 
                onClick={onCancel}
                style={{ background: isOutOfStock ? '#FF9D00' : 'red' }}
            >
                No
            </button>
          </div>
        </div>
      </div>
    );
}

PopUpOutOfStock.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOutOfStock: PropTypes.bool.isRequired,
};

export default PopUpOutOfStock;
