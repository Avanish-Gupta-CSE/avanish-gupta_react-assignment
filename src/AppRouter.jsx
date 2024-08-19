import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import PurchaseSuccess from "./components/PurchaseSuccess/PurchaseSuccess";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/products" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/" />} />
        <Route path="/products/:id" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/" />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/" />} />
        <Route path="/purchase-success" element={isLoggedIn ? <PurchaseSuccess /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
