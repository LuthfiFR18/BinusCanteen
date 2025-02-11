import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../style/HeaderCartPayment.css";
import ProfileDropdown from "./ProfileDropdown";
import { CartContext } from "../app/CartContext";

function HeaderCartPayment() {
  const navigate = useNavigate();
  const { cartItemCount } = useContext(CartContext);

  return (
    <div className="header-cartpayment-container">
      <div className="logo-cartpayment-text" onClick={() => navigate("/dashboard")}>
        Binus<span className="logo-text-cartpayment-span">Canteen</span>
      </div>

      <div className="logo-cartpayment-box">
        <a href="#" className="logo-cart" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faCartShopping} className="logo-icon" />
          {cartItemCount > 0 && <div className="cart-notification"></div>}
        </a>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default HeaderCartPayment;