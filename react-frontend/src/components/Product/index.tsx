import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { ProductT } from "../../types";
import imageSrc from "../../images/placeholder.jpg";
import { userSelector } from "../../store/auth/authSlice";
import "./style.css";

const Product: FC<ProductT> = ({
  id,
  name,
  price,
  discount_price,
  description,
  photo,
  user_id,
}) => {
  const authUser = useSelector(userSelector);
  return (
    <div className="card">
      <div className="image_wrapper">
        <Link to={`/product-details/${id}`}>
          <img src={photo ?? imageSrc} alt={name} />
        </Link>
      </div>
      <h2>{name}</h2>
      <p className="price">${price}</p>
      <p className="disc-price">${discount_price}</p>
      <p className="description">{description}</p>
      {authUser?.id === user_id && (
        <p style={{ color: "green", fontWeight: "600", marginTop: "auto" }}>
          My product
        </p>
      )}
    </div>
  );
};

export default Product;
