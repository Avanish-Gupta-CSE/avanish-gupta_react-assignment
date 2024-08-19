import { Link } from "react-router-dom";
import BuyButton from "../BuyButton/BuyButton";
import './ProductRow.css';

const ProductRow = ({ product }) => {
  return (
    <tr className="product-row-container">
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>${product.price}</td>
      <td>
      <Link to={`/products/${product.id}`} className="view-link-button">View</Link>
        <BuyButton product={product} />
      </td>
    </tr>
  );
};

export default ProductRow;
