import Carrousel from "./components/Carrousel/Carrousel";
import ipn from "../../../src/assets/pleca-gob.png";
import "./Login.css";

const Login = () => {
  return (
    <div className="general-login-container">
      <div className="login-container">
        <section className="carrousel-container">
          <Carrousel />
        </section>

        <section className="login-form-container">
          <h1>Inicio de sesión</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Contraseña"
              />
            </div>
            <button type="submit" className="btn btn-escom">
              Iniciar sesión
            </button>
          </form>

          <div className="login-footer">
              <img src={ipn} alt="IPN" />
            </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
