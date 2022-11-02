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
import Payment from "../features/shoppingCart/Payment";
import InfoClient from "../features/user/InfoClient";
import Bill from "../features/bill/Bill";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path=":id" element={<DetailProduct />} />
      </Route>
      <Route path="/infoClient" element={<InfoClient />} />
      <Route path="/bill" element={<Bill />} />
      <Route path="/updateProfile" element={<UpdatePassword />} />
      <Route path="/shoppingCart">
        <Route index element={<ShoppingCart />} />
        <Route path=":id" element={<Payment />} />
      </Route>
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
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
