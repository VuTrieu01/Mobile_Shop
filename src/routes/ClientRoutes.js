import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import User from "../features/user/User";
import Apple from "../features/apple/Apple";
import Laptop from "../features/laptop/Laptop";
import OldMachine from "../features/oldMachine/OldMachine";
import Pc from "../features/pc/Pc";
import Phone from "../features/phone/CellPhone";
import NoMatch from "../components/NoMatch";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/user" element={<User />} />
      <Route path="/phone" element={<Phone />} />
      <Route path="/laptop" element={<Laptop />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
