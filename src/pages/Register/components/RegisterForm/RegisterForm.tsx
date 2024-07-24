import { useState } from "react";
import {
  validateIdNumber,
  validateEmail,
  validateName,
  validateForm
} from "./formValidations";
import "./RegisterForm.css";
import FormButton from "../../../../components/FormButtons/FormButton";
import user from "../../../../assets/user.svg";
import erase from "../../../../assets/erase.svg";

const RegisterForm = () => {
  interface Student {
    name: string;
    idNumber: string;
    email: string;
    equipment: string;
    date: string;
    entryTime: string;
    departureTime: string;
    comment: string;
  }

  const [student, setStudent] = useState({
    name: "",
    idNumber: "",
    email: "",
    equipment: "",
    date: "",
    entryTime: "",
    departureTime: "",
    comment: "",
  });

  const [error, setError] = useState("");

  const {
    name,
    idNumber,
    email,
    equipment,
    date,
    entryTime,
    departureTime,
    comment,
  }: Student = student;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "idNumber") {
      if (validateIdNumber(value)) {
        setStudent({
          ...student,
          [name]: value,
        });
      }
    } else if (name === "name") {
      if (validateName(value)) {
        setStudent({
          ...student,
          [name]: value,
        });
      }
    } else {
      setStudent({
        ...student,
        [name]: value,
      });
    }
  };

  const eraseFields = () => {
    setStudent({
      name: "",
      idNumber: "",
      email: "",
      equipment: "",
      date: "",
      entryTime: "",
      departureTime: "",
      comment: "",
    });  
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);

    if (!validateForm(student)) {
      setError("boder border-danger");
    }
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <section className="mb-2 d-flex justify-content-center input-gap">
        <div className="input-container">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${!name && error}`}
            placeholder="Nombre completo"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="id-number" className="form-label">
            Boleta
          </label>
          <input
            type="text"
            className={`form-control ${!idNumber && error}`}
            placeholder="Boleta"
            name="idNumber"
            id="id-number"
            value={idNumber}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="mb-2 d-flex justify-content-center input-gap">
        <div className="input-container">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="text"
            className={`form-control ${!email && error}`}
            placeholder="Correo"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="equipment" className="form-label">
            Equipo asignado
          </label>
          <select
            name="equipment"
            id="equipment"
            className={`form-select ${!equipment && error}`}
            value={equipment}
            onChange={handleChange}
          >
            <option value="">Seleccionar equipo</option>
            <option value="Lenovo 1">Lenovo 1</option>
            <option value="Lenovo 2">Lenovo 2</option>
          </select>
        </div>
      </section>

      <section className="mb-4 d-flex justify-content-center input-gap">
        <div className="input-container-time">
          <label htmlFor="date" className="form-label">
            Fecha
          </label>
          <input
            type="date"
            className={`form-control ${!date && error}`}
            name="date"
            value={date}
            onChange={handleChange}
          />
        </div>

        <div className="input-container-time">
          <label htmlFor="entry-time" className="form-label">
            Hora de entrada
          </label>
          <input
            type="time"
            className={`form-control ${!entryTime && error}`}
            id="entry-time"
            name="entryTime"
            value={entryTime}
            onChange={handleChange}
          />
        </div>

        <div className="input-container-time">
          <label htmlFor="departure-time" className="form-label">
            Hora de salida
          </label>
          <input
            type="time"
            className="form-control"
            id="departure-time"
            name="departureTime"
            value={departureTime}
            onChange={handleChange}
            disabled
          />
        </div>
      </section>

      <section className="mb-2 d-flex justify-content-center textarea-container">
        <div className="form-floating ">
          <textarea
            name="comment"
            id="floatingTextarea"
            className="form-control textarea"
            placeholder="Comentarios"
            value={comment}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea">Comentarios</label>
        </div>
      </section>

      <section className="d-flex justify-content-center gap-5">
        <FormButton type="submit" text="Registrar" svg={user} className="btn btn-light d-flex gap-2 align-items-center"/>
        <FormButton type="button" text="Borrar" svg={erase} method={eraseFields} className="btn btn-light d-flex gap-2 align-items-center"/>
      </section>
    </form>
  );
};

export default RegisterForm;
