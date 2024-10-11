import '../style/Sellerpage.css'; // Include the CSS file in the same directory
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PopUp({ message, onConfirm, onCancel, isClosingStore }) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-popup-btn" onClick={onCancel}>×</button>
          <p>{message}</p>
          <div className="popup-buttons">
            <button 
                className="popup-confirm-btn" 
                onClick={onConfirm}
                style={{  background: isClosingStore ? 'red' : '#FF9D00' }}
                >
                    Yes
            </button>
            <button 
                className="popup-cancel-btn" 
                onClick={onCancel}
                style={{  background: isClosingStore ? '#FF9D00' : 'red' }}
            >
                No
            </button>
          </div>
        </div>
      </div>
    );
  }
PopUp.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isClosingStore: PropTypes.bool.isRequired,
};



export default PopUp;
