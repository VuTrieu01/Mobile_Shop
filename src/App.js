import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layout/ClientLayout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ClientLayout />}></Route>
    </Routes>
  );
}

export default App;
