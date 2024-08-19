import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const { cartItems } = useContext(CartContext);
  const { user, clearUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserDetails(); 
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="header">
      <h1>Avanish Mart</h1>
      {isLoggedIn && user && (
        <nav>
          <ul>
            
            <li className="username">{`${user.firstName} ${user.lastName}`}</li> 
            <li>
              <button onClick={handleCartClick}>Cart ({cartItems.length})</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
