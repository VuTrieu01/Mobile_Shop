import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import Apple from "../features/apple/Apple";
import Introduce from "../features/introduce/Introduce";
import NoMatch from "../components/NoMatch";
import UpdatePassword from "../features/user/UpdatePassword";
import DetailProduct from "../features/apple/DetailProduct";
import News from "../features/new/News";
import Contact from "../features/contact/Contact";
import NewDetail from "../features/new/NewDetail";
import Apple2 from "../features/apple/Apple2";
export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/trangchu" element={<Home />} />
      <Route path="/updateProfile" element={<UpdatePassword />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/gioithieu" element={<Introduce />} />
      <Route path="/tintuc">
        <Route index element={<News />} />
        <Route path=":id" element={<NewDetail />} />
      </Route>
      <Route path="/lienhe" element={<Contact />} />
      <Route path="/sanpham">
        <Route index element={<Apple />} />
        <Route path=":id" element={<DetailProduct />} />
      </Route>
      <Route path="/sanpham2">
        <Route index element={<Apple2 />} />
        <Route path=":id" element={<DetailProduct />} />
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
