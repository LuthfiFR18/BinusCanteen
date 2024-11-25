import React from 'react';
import '../style/Sellerpage.css'; // Pastikan Anda membuat file CSS untuk styling

function PopUpDeleteMenuSeller({ message, onClose, onConfirm }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-popup-btn" onClick={onClose}>
                    &times;
                </button>
                <p>{message}</p>
                <div className="popup-buttons">
                    {/* Tukar posisi tombol Yes dan No */}
                    <button
                        className="popup-confirm-btn"
                        onClick={() => {
                            const confirmation = window.confirm(
                                "Are you sure you want to delete this menu permanently? There's no way to recover a deleted menu."
                            );
                            if (confirmation) onConfirm();
                        }}
                    >
                        Yes
                    </button>
                    <button className="popup-cancel-btn" onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopUpDeleteMenuSeller;
