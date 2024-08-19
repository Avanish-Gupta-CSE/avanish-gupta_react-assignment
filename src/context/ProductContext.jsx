import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getActiveProduct = async (id) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setActiveProduct(data);
      } catch (error) {
        console.error("Failed to fetch active product:", error);
      }
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, activeProduct, deleteProduct, getActiveProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
