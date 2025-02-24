import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "../../store";
import {
  fetchProduct,
  getCurrentProduct,
  getError,
  isLoading,
} from "../../store/product/productSlice";
import src from "../../images/placeholder.jpg";
import "./style.css";

const ProductDetails = () => {
  const dispatch = useDispatch<Dispatch>();
  const { productId } = useParams();

  const product = useSelector(getCurrentProduct);
  const loading = useSelector(isLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchProduct(String(productId)));
  }, [dispatch, productId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!loading && error) {
    return <p>{error}</p>;
  }
  return (
    <div className="details">
      <div className="image-wrapper">
        <img src={src} alt="product" />
      </div>
      <div className="details-block">
        <p>
          <strong>Product Name:</strong> {product.name}
        </p>
        <p>
          <strong>Price:</strong> {product.price} USD
        </p>
        {product.discount_price && (
          <p>
            <strong>Discount Price:</strong> {product.discount_price} USD
          </p>
        )}
        <p>
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
