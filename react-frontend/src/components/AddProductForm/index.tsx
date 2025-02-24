import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import { createProduct } from "../../services/product.service";
import { setProducts } from "../../store/product/productSlice";

const validationOptions = {
  product_name: {
    required: { value: true, message: "This field is required!" },
    minLength: { value: 4, message: "The length must be at least 4!" },
  },
  price: {
    required: { value: true, message: "This field is required!" },
    min: { value: 0, message: "Must not be negative!" },
  },
  discount_price: {
    required: { value: true, message: "This field is required!" },
    min: { value: 0, message: "Must not be negative!" },
  },
  description: {
    required: { value: true, message: "This field is required!" },
    minLength: { value: 4, message: "The length must be at least 12!" },
  },
};

type FormValues = {
  name: string;
  price: number;
  discount_price: number;
  description: string;
  photo: string;
};

type PROPS = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddProductForm: FC<PROPS> = ({ setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function handleAddProduct(payload: FormValues) {
    setIsLoading(true);
    try {
      const { data } = await createProduct(payload);
      dispatch(setProducts(data));
      setIsOpen(false);
    } catch (err) {
      console.log(err, "error in handleAddProduct");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      style={{ marginTop: "0.5rem" }}
      onSubmit={handleSubmit(handleAddProduct)}
    >
      <input
        type="text"
        placeholder="product name..."
        {...register("name", validationOptions.product_name)}
      />
      <ErrorMessage show={!!errors.name} message={errors.name?.message} />

      <input
        type="number"
        placeholder="enter price..."
        {...register("price", validationOptions.price)}
      />
      <ErrorMessage show={!!errors.price} message={errors.price?.message} />

      <input
        type="number"
        placeholder="discount price..."
        {...register("discount_price", validationOptions.discount_price)}
      />
      <ErrorMessage
        show={!!errors.discount_price}
        message={errors.discount_price?.message}
      />

      <input
        type="text"
        placeholder="description..."
        {...register("description", validationOptions.description)}
      />
      <ErrorMessage
        show={!!errors.description}
        message={errors.description?.message}
      />

      <input
        type="file"
        style={{ marginBottom: "0.5rem" }}
        {...register("photo")}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Add"}
      </button>
    </form>
  );
};

export default AddProductForm;
