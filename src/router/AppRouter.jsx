import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { useAuthStore } from "../store/authStore";

export const AppRouter = () => {
  const { isAuth } = useAuthStore();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          isAuth ? <h1>Welcome to My web site</h1> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};
