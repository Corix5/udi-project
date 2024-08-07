import {Link} from "react-router-dom";
import escom from "../../assets/escudo_ESCOM.png";
import "./Navbar.css";

const Navbar = () => {
    return(
<nav className="navbar navbar-expand-lg bg-body-tertiary nav">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" ><figure className="navbar-logo"><img src={escom} alt="escom" /></figure></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="register"className="nav-link">Registro</Link>
        </li>
        <li className="nav-item">
          <Link to="equipment" className="nav-link">Tablero</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default Navbar;