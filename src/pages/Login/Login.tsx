import Carrousel from "./components/Carrousel/Carrousel";
import ipn from "../../../src/assets/pleca-gob.png";
import "./Login.css";
import { useState } from "react";
import { alertEmptyFields, invalidCredentialsAlert } from "../Register/components/RegisterForm/formValidations";
import { loginAdmin } from "../../api/admin";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

const Login = () => {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Instancia useNavigate para la redirección
  const { username, password } = loginData;

  const handleChange = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alertEmptyFields();
      return;
    } else {
      try {
        const response = await loginAdmin(loginData); // Llama a la API y espera la respuesta

        if (response.token) {
          localStorage.setItem("token", response.token); // Almacena el token en localStorage
          navigate(username !== "tablero_admin" ? "/" : "/equipment"); // Redirige al dashboard u otra ruta protegida
        } else {
          // Manejo de errores en caso de que no haya token en la respuesta
          invalidCredentialsAlert();
        }
        
      } catch (error) {
        // Manejo de errores en caso de que ocurra un problema con la solicitud
        console.error("Error during login:", error);
      }
    }
  }

  return (
    <div className="general-login-container">
      <div className="login-container">
        <section className="carrousel-container">
          <Carrousel />
        </section>

        <section className="login-form-container">
          <h1>Inicio de sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Nombre de usuario"
                name="username"
                onChange={handleChange}
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
                name="password"
                onChange={handleChange}
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
