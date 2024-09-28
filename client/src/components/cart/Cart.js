import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { axiosClient } from "../../utils";
import { loadStripe } from "@stripe/stripe-js";

function Cart({ onClose }) {
  const stripePromise = loadStripe(
    "pk_test_51OBXUaSHvogPCnxSmwHIOMtpIlRyRMYBuAqe70qgqKFnYTcGdxzQ6iIxNM22zbfiaoyddVhuamKCi2eftNGGDcZK00Kulybm4V"
  );

  const cart = useSelector((state) => {
    return state.cartReducer.cart;
  });
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.price * item.quantity;
  });

  const isEmpty = cart.length === 0;

  async function handleCheckout() {
    const response = await axiosClient.post("/orders", {
      products: cart,
    });

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: response.data.stripeId,
    });
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="card-content">
        <div className="header">
          <h4>Shopping cart</h4>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose /> Close
          </div>
        </div>
        <div className="cart-item">
          {cart.map((cart) => {
            return <CartItem cart={cart} key={cart.key} />;
          })}
        </div>
        {isEmpty ? (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h3>Cart is Empty</h3>
          </div>
        ) : (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total message">Total:</h3>
              <h3 className="total-value">₹ {totalQuantity}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>
              Checkout now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
