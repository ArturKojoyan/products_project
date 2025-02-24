import { useSelector } from "react-redux";
import Product from "../Product";
import type { RootState } from "../../store";
import "./style.css";

const Products = () => {
  const product = useSelector((state: RootState) => state.product);

  if (product.loading) {
    return <div>loading...</div>;
  }

  if (!product.loading && product.error) {
    return <div>{product.error}</div>;
  }

  return (
    <>
      <h2>Products</h2>
      {product.products.length > 0 ? (
        <div className="cards-container">
          {product.products.map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
      ) : <p>No Products</p>}
    </>
  );
};

export default Products;
