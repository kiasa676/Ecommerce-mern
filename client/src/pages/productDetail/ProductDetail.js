import React, { useEffect, useState } from "react";
import dummyImg from "../../assets/naruto.jpeg";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeTocart } from "../../redux/cartSlice";

function ProductDetail() {
  const params = useParams();
  const [ProductDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();
  async function fetchData() {
    const response = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=image`
    );
    if (response?.data.data.length > 0) {
      setProductDetail(response?.data.data[0]);
    }
  }

  useEffect(() => {
    fetchData();
  }, [params]);

  const cart = useSelector((state) => {
    return state.cartReducer.cart;
  });
  const quantity =
    cart.find((item) => {
      return item.key === params.productId;
    })?.quantity || 0;

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <img
              src={ProductDetail?.attributes.image.data.attributes.url}
              alt=""
            />
          </div>
          <div className="product-info">
            <h1 className="heading">{ProductDetail?.attributes.title}</h1>
            <h3 className="price">₹ {ProductDetail?.attributes.price}</h3>
            <p className="description">{ProductDetail?.attributes.desc}</p>
            <div className="cart-option">
              <div className="quantity-selector">
                <span
                  className="btn decreement"
                  onClick={(e) => {
                    dispatch(removeTocart(ProductDetail));
                  }}
                >
                  -
                </span>
                <span className="Quantity">{quantity}</span>
                <span
                  className="btn increement"
                  onClick={(e) => {
                    dispatch(addToCart(ProductDetail));
                  }}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={(e) => {
                  dispatch(addToCart(ProductDetail));
                }}
              >
                Add to Cart
              </button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam aperiam numquam iste ad itaque, veritatis consectetur,
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Molestias ducimus fugiat
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
