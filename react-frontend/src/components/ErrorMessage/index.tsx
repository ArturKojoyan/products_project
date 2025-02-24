import { FC } from "react";
import "./style.css";

type PROPS = {
  message?: string;
  show: boolean;
};

const ErrorMessage: FC<PROPS> = ({ show, message = "" }) => {
  if (!show) {
    return <span className="error" />;
  }
  return <span className="error">{message}</span>;
};

export default ErrorMessage;
