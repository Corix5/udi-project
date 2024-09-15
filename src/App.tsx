// App.tsx
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import EquipmentBoard from "./pages/EquipmentBoard/EquipmentBoard";
import UpdateResgister from "./pages/UpdateRegister/UpdateRegister";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {

  const location = useLocation();
  const noNavbarRoutes = ['/login', '/unauthorized'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/equipment" element={<PrivateRoute><EquipmentBoard /></PrivateRoute>} />
        <Route path="/updateRegister/:student_id/:register_id" element={<PrivateRoute><UpdateResgister /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
