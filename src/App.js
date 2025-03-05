import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./features/user/AuthContext";
import ClientLayout from "./layout/ClientLayout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<ClientLayout />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
