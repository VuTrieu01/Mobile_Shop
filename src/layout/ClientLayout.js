import React from "react";
import Navbar from "../components/Navbar";
import ClientRoutes from "../routes/ClientRoutes";

export default function ClientLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <ClientRoutes />
      </div>
    </div>
  );
}
