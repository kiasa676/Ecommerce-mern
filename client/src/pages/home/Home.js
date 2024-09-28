import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import "./Home.scss";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils";
import { useSelector } from "react-redux";

function Home() {
  const [categories, setCategories] = useState(null);
  const [TopProducts, setTopProducts] = useState(null);

  const category = useSelector((state) => {
    return state.categoryReducer.categories;
  });

  async function fetchData() {
    try {
      const topProductResponse = await axiosClient.get(
        "/products/?filters[topPicks][$eq]=true&populate=image"
      );

      setTopProducts(topProductResponse.data.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Films and TV Posters Collection
          </p>
        </div>
        <div className="content">
          {category?.map((category) => {
            return <Category key={category.id} category={category} />;
          })}
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All New Design, Same Old Details</p>
        </div>
        <div className="content">
          {TopProducts?.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
