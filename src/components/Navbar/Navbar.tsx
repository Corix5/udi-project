import { Link } from "react-router-dom";
import escom from "../../assets/escudo_ESCOM.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getAdminInfo } from "../../api/admin";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminInfo();
        setAdminName(response.username);
        console.log(response.username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary nav">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <figure className="navbar-logo">
            <img src={escom} alt="escom" />
          </figure>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-cont" id="navbarNav">
          <ul className="navbar-nav">
            {adminName !== "tablero_admin" && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="equipment" className="nav-link">
                    Tablero
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div>
            <p className="nav-logout" onClick={handleLogout}>
              Cerrar sesión
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
