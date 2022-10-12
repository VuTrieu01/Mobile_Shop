import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import Apple from "../features/apple/Apple";
import Introduce from "../features/gioithieu/Introduce";
import NoMatch from "../components/NoMatch";
import UpdatePassword from "../features/user/UpdatePassword";
import DetailProduct from "../features/apple/DetailProduct";
import News from "../features/tintuc/News";
import Contact from "../features/lienhe/Contact";
export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/updateProfile" element={<UpdatePassword />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/gioithieu" element={<Introduce />} />
      <Route path="/tintuc" element={<News />} />
      <Route path="/lienhe" element={<Contact />} />
      <Route path="/sanpham">
        <Route index element={<Apple />} />
        <Route path=":id" element={<DetailProduct />} />
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
