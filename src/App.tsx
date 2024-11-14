
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import ProductsPage from "./pages/product/products";
import Navbar from "./pages/navbar";
import CreateProductPage from "./pages/product/createproduct";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateProductPage />} />
      </Routes>
    </>
  );
}

export default App;
