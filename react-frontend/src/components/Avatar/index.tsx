import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth.service";
import {
  setUser,
  toggleIsAuth,
  userSelector,
} from "../../store/auth/authSlice";
import avatar from "../../images/avatar.jpg";
import "./style.css";

const Avatar = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  async function handleLogout() {
    try {
      await logout();

      dispatch(toggleIsAuth(false));
      dispatch(setUser(null));
    } catch (err) {
      console.log(err, "error in handle Logout function");
    }
  }

  return (
    <>
      <div className="dropdown">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="dropdown-content">
          <ul>
            <li className="disabled">{user?.email}</li>
            <li>
              <Link to="my-profile">my-profile</Link>
            </li>
            <li>
              <button className="logout_btn" onClick={handleLogout}>
                log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Avatar;
