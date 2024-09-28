import React, { useState } from "react";
import dummyCartImg from "../../assets/naruto.jpeg";
import { AiOutlineClose } from "react-icons/ai";
import "./CartItem.scss";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeTocart } from "../../redux/cartSlice";

function CartItem({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="CartItem">
      <div className="item-img">
        <img src={cart.image} alt={cart.title} />
      </div>
      <div className="item-info-wrapper">
        <div className="info-item">
          <p className="heading">{cart.title}</p>
          <p className="price">₹ {cart.price}</p>
          <div className="quantity-selector">
            <span
              className="btn decreement"
              onClick={(e) => {
                dispatch(removeTocart(cart));
              }}
            >
              -
            </span>
            <span className="Quantity">{cart.quantity}</span>
            <span
              className="btn increement"
              onClick={(e) => {
                dispatch(addToCart(cart));
              }}
            >
              +
            </span>
          </div>
          <p className="total-price">
            Subtotal: ₹ {cart.quantity * cart.price}
          </p>
        </div>
        <div
          className="item-remove"
          onClick={() => {
            dispatch(removeFromCart(cart));
          }}
        >
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
