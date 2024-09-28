import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Collection from "./pages/collection/Collection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import Payment from "./components/payment/Payment";

function App() {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(fetchCategories());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId?" element={<Collection />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/payment/:status" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
