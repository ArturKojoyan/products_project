import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { isAuthSelector } from "./store/auth/authSlice";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const MyProfile = lazy(() => import("./pages/MyProfile"));

const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

const Router = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="product-details/:productId"
            element={<ProductDetails />}
          />
          {isAuth && <Route path="my-profile" element={<MyProfile />} />}
          <Route path="*" element={<NotFound />} />
        </Route>
        {!isAuth && (
          <>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
