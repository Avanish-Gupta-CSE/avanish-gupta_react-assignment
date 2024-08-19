import { useState } from "react";
import AppRouter from "../AppRouter";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext"; 

const Container = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {

    const storedUser = localStorage.getItem('user');
    return !!storedUser;
  });

  return (
    <CartProvider>
      <ProductProvider>
        <UserProvider>
          <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </UserProvider>
      </ProductProvider>
    </CartProvider>
  );
};

export default Container;
