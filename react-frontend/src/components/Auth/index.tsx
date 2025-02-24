import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { login, registration } from "../../services/auth.service";
import { setUser, toggleIsAuth } from "../../store/auth/authSlice";
import ErrorMessage from "../ErrorMessage";
import "./style.css";

type FormValues = {
  email: string;
  password: string;
  confirm_password: string;
};

const validationOptions = {
  email: {
    required: { value: true, message: "This field is required!" },
    validate: (value: string) => value.includes("@"),
  },
  password: {
    required: { value: true, message: "This field is required!" },
    minLength: {
      value: 5,
      message: "Length must be at least 5",
    },
  },
};

const Auth = ({ isLogin = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onAuthenticate(payload: FormValues) {
    try {
      const auth = isLogin ? login : registration;
      const resp = await auth(payload.email, payload.password);

      const { accessToken } = resp.data;
      const user = jwtDecode(accessToken);

      dispatch(toggleIsAuth(true));
      dispatch(setUser(user));

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("password", { message: err.response?.data.message });
        return;
      }
      if (typeof err === "string") {
        setError("password", { message: err });
        return;
      }
      setError("password", {
        message: "Unable to authenticate, please try again!",
      });
    }
  }

  return (
    <div className="form-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit(onAuthenticate)}>
        <div className="field-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            {...register("email", validationOptions.email)}
          />
          <ErrorMessage
            show={!!errors.email}
            message={errors.email?.message || "Not valid email"}
          />
        </div>

        <div className="field-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            {...register("password", validationOptions.password)}
          />
          <ErrorMessage
            show={!!errors.password}
            message={errors.password?.message}
          />
        </div>

        {!isLogin && (
          <div className="field-wrapper">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm your Password"
              {...register("confirm_password", {
                required: { value: true, message: "This field is required!" },
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            <ErrorMessage
              show={!!errors.confirm_password}
              message={errors.confirm_password?.message}
            />
          </div>
        )}

        <div className="wrap">
          <button type="submit" style={{ width: "100%" }}>
            Submit
          </button>
        </div>
      </form>

      <div className="links">
        {isLogin ? (
          <p>
            Not registered?
            <Link to="/signup">register</Link>
          </p>
        ) : (
          <p>
            Already registered?
            <Link to="/signin">login</Link>
          </p>
        )}
        <Link to="/">dashboard</Link>
      </div>
    </div>
  );
};

export default Auth;
