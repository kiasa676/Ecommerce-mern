import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.scss";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function Payment() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (status === "success") {
    dispatch(resetCart());
  }
  const infoData = {
    success: {
      message: "your order has been placed",
      cta: "Shop More",
      icon: <BsFillCartCheckFill />,
    },
    failed: {
      message: "Payment failed",
      cta: "Try Again",
      icon: <BiErrorCircle />,
    },
  };
  return (
    <div className="Payment">
      <div className="icon">{infoData[status].icon}</div>
      <h2 className="message">{infoData[status].message}</h2>
      <button
        className="btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        {infoData[status].cta}
      </button>
    </div>
  );
}

export default Payment;
