import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import EquipmentBoard from "./pages/EquipmentBoard/EquipmentBoard";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="equipment" element={<EquipmentBoard />} />
      </Routes>
    </>
  );
};

export default App;
