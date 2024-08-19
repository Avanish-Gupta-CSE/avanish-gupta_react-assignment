import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import './PurchaseSuccess.css';

const PurchaseSuccess = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    clearCart();
    navigate("/products");
  };

  return (
    <div className="purchase-success-container">
      <h1>Purchase Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button onClick={handleHomeClick}>Go to Home</button>
    </div>
  );
};

export default PurchaseSuccess;
