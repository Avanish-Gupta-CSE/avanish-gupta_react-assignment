import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleProceedToBuy = () => {
    navigate("/purchase-success");
  };

  const handleBackToProducts = () => {
    navigate("/products");
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Total: ${totalAmount}</h3>
            <button onClick={handleProceedToBuy}>Proceed to Buy</button>
            <button onClick={handleBackToProducts}>Back to Products</button>
          </div>
        </>
      ) : (
        <div>
            <p>No items in the cart.</p>
           <button onClick={handleBackToProducts}>Back to Products</button>
        </div>
        
      )}
    </div>
  );
};

export default Cart;
