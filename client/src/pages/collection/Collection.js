import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils";

function Collection() {
  const navigate = useNavigate();
  const params = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState([]);

  const sortOptions = [
    {
      key: "price-asc",
      value: "Price - Low To High",
      sort: "price",
    },
    {
      key: "newest-first",
      value: "Newest first",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);
  const categories = useSelector((state) => {
    return state.categoryReducer.categories;
  });

  async function fetchData() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);

    setProduct(response?.data.data);
  }

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchData();
  }, [params, sortBy]);
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print And Artwork</h2>
            <p>
              India largest collection of wall posterz India largest collection
              of wall posterz India largest collection of wall posterz
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                name="sort-by"
                id="sort-by"
                className="select-sort-by"
                onChange={(e) => {
                  setSortBy(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {sortOptions.map((item) => {
                  return (
                    <option value={item.sort} key={item.sort}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => {
                return (
                  <div key={item.id} className="filter-radio">
                    <input
                      type="radio"
                      name="category"
                      id={item.id}
                      value={item.attributes.key}
                      onChange={updateCategory}
                      checked={item.attributes.key === categoryId}
                    />
                    <label htmlFor={item.id}>{item.attributes.title}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="products-box">
            {product?.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
