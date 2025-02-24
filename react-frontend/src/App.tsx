import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Router from "./Router";
import { setUser, toggleIsAuth, userSelector } from "./store/auth/authSlice";
import { checkAuth } from "./services/auth.service";

function App() {
  const user = useSelector(userSelector);
  console.log("🚀 ~ App ~ user:", user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function verify() {
      try {
        const resp = await checkAuth();
        const { accessToken } = resp.data;
        const user = jwtDecode(accessToken);

        dispatch(toggleIsAuth(true));
        dispatch(setUser(user));
      } catch (error) {
        console.log(error, "error in verify function");
      }
    }
    verify();
  }, [dispatch]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
