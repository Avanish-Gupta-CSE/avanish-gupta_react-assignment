import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };
  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isProductInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isProductInCart }}>
      {children}
    </CartContext.Provider>
  );
};


