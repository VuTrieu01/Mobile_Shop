import React from "react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import ClientRoutes from "../routes/ClientRoutes";

export default function ClientLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <ClientRoutes />
      </div>
      <FooterBar />
    </div>
  );
}
