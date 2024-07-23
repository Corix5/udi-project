import { useState } from "react";
import "./RegisterForm.css";

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
      if (/^\d*$/.test(value) && value.length <= 10) {
        setStudent({
          ...student,
          [name]: value,
        });
      }
    } else if (name === "name") {
      if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ´\s]*$/.test(value)) {
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(student.email)) {
      alert("Por favor ingresa un correo electrónico válido.");
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
            className="form-select"
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
            className="form-control"
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
            className="form-control"
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

      <section className="mb-2 d-flex justify-content-center">
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

      <section className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </section>
    </form>
  );
};

export default RegisterForm;
