import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
    }

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token"); // Obten el token del localStorage

  return token ? children : <Navigate to="/login" />; // Si hay token, renderiza la ruta, sino redirige a login
};

export default PrivateRoute;
