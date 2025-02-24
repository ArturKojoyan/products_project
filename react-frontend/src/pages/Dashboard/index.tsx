import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Products from "../../components/Products";
import Modal from "../../components/Modal";
import AddProductForm from "../../components/AddProductForm";
import { isAuthSelector, userSelector } from "../../store/auth/authSlice";
import type { Dispatch } from "../../store";
import { fetchAllProducts } from "../../store/product/productSlice";
import "./style.css";

const Dashboard = () => {
  const isAuth = useSelector(isAuthSelector);
  const authUser = useSelector(userSelector);
  const dispatch = useDispatch<Dispatch>();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const owner = searchParams.get("owner");

  function handleFilter() {
    if (authUser?.id) {
      setSearchParams({ owner: String(authUser.id) });
      dispatch(fetchAllProducts(authUser.id));
    }
  }

  useEffect(() => {
    if (owner) {
      dispatch(fetchAllProducts(+owner));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, owner]);

  return (
    <div>
      <Products />
      {isAuth && (
        <>
          <div className="buttons_wrapper">
            <button onClick={() => setIsOpen(true)}>Add Product</button>
            <button style={{ marginLeft: "3.5rem" }} onClick={handleFilter}>
              Filter by my products
            </button>
            {searchParams.size > 0 && (
              <button onClick={() => setSearchParams({})}>Clear filter</button>
            )}
          </div>
          <Modal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            title="Add Product"
          >
            <AddProductForm setIsOpen={setIsOpen} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
