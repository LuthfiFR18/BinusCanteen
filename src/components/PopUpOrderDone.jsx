import React from "react";
import '../style/OrderListSeller.css';;

const PopUpOrderDone = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <p>Are you sure this order is done?</p>
        <div className="popup-buttons">
          <button className="popup-yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="popup-no" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpOrderDone;
