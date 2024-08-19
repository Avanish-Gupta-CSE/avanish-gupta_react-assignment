import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductRow from "../ProductRow/ProductRow";
import './Products.css';

const Products = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = () => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="products-container">
      <h2>Products Page</h2>
      <div className="table-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <div className="product-count">
          <h3>Product Count: {filteredProducts.length}</h3>
        </div>
      </div>
      {filteredProducts.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Products;
