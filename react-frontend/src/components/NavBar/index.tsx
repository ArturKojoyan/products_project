import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../store/auth/authSlice";
import Avatar from "../Avatar";
import "./style.css";

const Navbar = () => {
  const isAuth = useSelector(isAuthSelector);

  return (
    <nav className="top_nav">
      <div>
        <Link to="/" className="item">
          Dashboard
        </Link>
      </div>
      {isAuth ? (
        <Avatar />
      ) : (
        <Link to="/signin" className="item">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
