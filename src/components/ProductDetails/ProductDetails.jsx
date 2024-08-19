import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import BuyButton from "../BuyButton/BuyButton";
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { activeProduct, getActiveProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      await getActiveProduct(id);
      setTimeout(() => {
        setLoading(false); 
      }, 1000);
    };

    fetchProduct();
  }, [id, getActiveProduct]);

  if (loading || !activeProduct || !activeProduct.title) {
    return (
      <div className="loading-container">
        <div className="loading-message">
          Loading...
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(activeProduct);
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <h1>{activeProduct.title}</h1>
        <img src={activeProduct.thumbnail} alt={activeProduct.title} />
        <p>{activeProduct.description}</p>
        <p>Category: {activeProduct.category}</p>
        <p>Price: ${activeProduct.price}</p>
        <p>Brand: {activeProduct.brand}</p>
        <button onClick={() => navigate(-1)}>Back</button>
        <BuyButton product={activeProduct} onAddToCart={handleAddToCart} />

        {/* Display user reviews */}
        {activeProduct.reviews && activeProduct.reviews.length > 0 && (
          <div className="product-reviews">
            <h3>User Reviews:</h3>
            {activeProduct.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.reviewerName}</strong> ({review.rating} stars)</p>
                <p>{review.comment}</p>
                <p><small>{new Date(review.date).toLocaleDateString()}</small></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
