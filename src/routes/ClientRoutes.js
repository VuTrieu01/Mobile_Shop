import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import Apple from "../features/apple/Apple";
import Laptop from "../features/laptop/Laptop";
import OldMachine from "../features/oldMachine/OldMachine";
import Pc from "../features/pc/Pc";
import Phone from "../features/phone/CellPhone";
import NoMatch from "../components/NoMatch";
import UpdatePassword from "../features/user/UpdatePassword";
import DetailProduct from "../features/apple/DetailProduct";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/updateProfile" element={<UpdatePassword />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/phone" element={<Phone />} />
      <Route path="/laptop" element={<Laptop />} />
      <Route path="/apple">
        <Route index element={<Apple />} />
        <Route path=":id" element={<DetailProduct />} />
      </Route>
      <Route path="/oldMachine" element={<OldMachine />} />
      <Route path="/pc" element={<Pc />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
