import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchProfile,
  setUser,
  userSelector,
} from "../../store/auth/authSlice";
import type { UserT } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { updateProfile } from "../../services/user.service";
import type { Dispatch } from "../../store";
import "./style.css";

const validationOptions = {
  email: {
    required: { value: true, message: "This field is required!" },
    validate: (value: string) => value.includes("@"),
  },
  firstName: {
    required: { value: true, message: "This field is required!" },
    minLength: { value: 3, message: "Min length must be 3" },
  },
  lastName: {
    required: { value: true, message: "This field is required!" },
    minLength: { value: 3, message: "Min length must be 3" },
  },
  dob: {
    required: { value: true, message: "This field is required!" },
  },
};

const MyProfile = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserT>();

  useEffect(() => {
    if (user) {
      let dob = user.dob;
      // if dob !== null, change its format
      if (user.dob) {
        const date = new Date(user.dob);
        dob = date.toISOString().slice(0, 10);
      }
      reset({ ...user, dob });
    }
  }, [reset, user]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id]);

  async function handleProfileUpdate(payload: UserT) {
    console.log("🚀 ~ handleProfileUpdate ~ payload:", payload);
    try {
      const { data } = await updateProfile(+payload.id, payload);
      dispatch(setUser(data.updatedUser));
      navigate("/");
    } catch (err) {
      console.log(err, "error in handleProfileUpdate function");
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-block">
        <h1 className="title">My Profile</h1>
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div className="form-item">
            <label htmlFor="firstName">First Name*</label>
            <input
              placeholder="first name"
              {...register("firstName", validationOptions.firstName)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="lastName">Last Name*</label>
            <input
              placeholder="last name"
              {...register("lastName", validationOptions.lastName)}
            />
            <ErrorMessage
              show={!!errors.lastName}
              message={errors.lastName?.message}
            />
          </div>

          <div className="form-item">
            <label htmlFor="email">Email*</label>
            <input
              placeholder="email"
              {...register("email", validationOptions.email)}
            />
            <ErrorMessage
              show={!!errors.email}
              message={errors.email?.message}
            />
          </div>

          <div className="form-item">
            <label htmlFor="dob">DOB*</label>
            <input type="date" {...register("dob", validationOptions.dob)} />
            <ErrorMessage show={!!errors.dob} message={errors.dob?.message} />
          </div>

          <div className="form-item">
            <label htmlFor="photo">Photo</label>
            <input type="file" {...register("photo")} />
          </div>

          <button
            type="submit"
            disabled={!isDirty}
            style={{ cursor: !isDirty ? "not-allowed" : "pointer" }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
