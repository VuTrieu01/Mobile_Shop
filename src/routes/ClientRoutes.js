import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import Phone from "../features/phone/CellPhone";
import Television from "../features/television/Television";
import NoMatch from "../components/NoMatch";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phone" element={<Phone />} />
      <Route path="/television" element={<Television />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
