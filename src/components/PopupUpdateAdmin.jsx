import React, {useState} from 'react'
import PropTypes from 'prop-types';
import '../style/PopupUpdateAdmin.css';
function PopupUpdateAdmin({ message, onConfirm, onCancel, isClosingStore }) {

  return (
    <div className="popup-overlay-update-admin">
        <div className="popup-update-admin">
          <button className="close-popup-update-admin-btn" onClick={onCancel}>×</button>
          <p>{message}</p>
          <div className="popup-update-admin-buttons">
            <button 
                className="popup-confirm-update-admin-btn" 
                onClick={onConfirm}
                style={{  background: isClosingStore ? 'red' : '#FF9D00' }}
                >
                    Yes
            </button>
            <button 
                className="popup-cancel-update-admin-btn" 
                onClick={onCancel}
                style={{  background: isClosingStore ? '#FF9D00' : 'red' }}
            >
                No
            </button>
          </div>
        </div>
      </div>
  )
};

PopupUpdateAdmin.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isClosingStore: PropTypes.bool.isRequired,
};

export default PopupUpdateAdmin;