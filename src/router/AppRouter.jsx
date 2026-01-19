import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { Products } from "../pages/Products";
import { Profile } from "../profile/Profile"
import { Cart } from "../pages/Cart";
import { ProductDetail } from "../pages/productDetail";

export const AppRouter = () => {
  const { isAuth } = useAuthStore();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/products" element={<Products/>}/> 
      <Route path="/products/:id" element={<ProductDetail/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route
        path="/"
        element={
          isAuth ? <h1>Welcome to My web site</h1> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};
