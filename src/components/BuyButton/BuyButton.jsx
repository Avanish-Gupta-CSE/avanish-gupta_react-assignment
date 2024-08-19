import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import './BuyButton.css'

const BuyButton = ({ product, onAddToCart }) => {
  const { addToCart, isProductInCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsInCart(isProductInCart(product.id));
  }, [isProductInCart, product.id]);

  const handleClick = () => {
    if (!isInCart) {
      addToCart(product);
      setIsInCart(true);
      if (onAddToCart) onAddToCart();
    } else {
      navigate("/cart");
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={isInCart}
      className={isInCart ? 'added' : ''}
    >
      {isInCart ? "Added to Cart" : "Buy"}
    </button>
  );
};

export default BuyButton;
