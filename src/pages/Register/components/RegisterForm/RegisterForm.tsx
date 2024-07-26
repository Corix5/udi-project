import { useState, useEffect } from "react";
import {
  validateid_number,
  validateEmail,
  validateName,
  validateForm,
  registerAlert,
  badRegisterAlert,
} from "./formValidations";
import { createStudent, getStudentById, updateStudent } from "../../../../api/student";
import { getEquipments } from "../../../../api/equipments";
import "./RegisterForm.css";
import FormButton from "../../../../components/FormButtons/FormButton";
import user from "../../../../assets/user.svg";
import erase from "../../../../assets/erase.svg";


interface RegisterFormProps {
  id?: string;
}


const RegisterForm = ({id}: RegisterFormProps ) => {
  interface Student {
    name: string;
    id_number: string;
    email: string;
    equipment: string;
    date: string;
    entry_time: string;
    departure_time: string;
    comment: string;
  }

  interface Equipment {
    id: string,
    equipment_name: string,
    state: string
  }

  const [equipments, setEquipments] = useState([]);

  useEffect(() =>{
    const fetchData = async () =>{
      if(id){
        const student = await getStudentById(id);
        //darle formato a la fecha
        student.data.date = student.data.date.split("T")[0];
        if(student.data.departure_time === null){
          student.data.departure_time = "";
        }
        setStudent(student.data);
      }
      const result = await getEquipments();
      setEquipments(result.data)
    }
    fetchData();
  }, []);

  const [student, setStudent] = useState({
    name: "",
    id_number: "",
    email: "",
    equipment: "",
    date: "",
    entry_time: "",
    departure_time: "",
    comment: "",
  });


  const [error, setError] = useState("");

  const {
    name,
    id_number,
    email,
    equipment,
    date,
    entry_time,
    departure_time,
    comment,
  }: Student = student;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "id_number") {
      if (validateid_number(value)) {
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
      id_number: "",
      email: "",
      equipment: "",
      date: "",
      entry_time: "",
      departure_time: "",
      comment: "",
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);

    const studentData = {
      ...student, 
      departure_time: student.departure_time === "" ? null : student.departure_time,
      comment: student.comment === "" ? "Sin comentarios" : student.comment
    }

    if (!validateForm(student)) {
      setError("boder border-danger");
    }

    try {
      if(id){
        await updateStudent(id, studentData);
        return registerAlert();
      }      
      await createStudent(studentData);
      registerAlert();
    } catch (error) {
      badRegisterAlert;
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
            className={`form-control ${!id_number && error}`}
            placeholder="Boleta"
            name="id_number"
            id="id-number"
            value={id_number}
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
            {
              !id ? (              
                equipments.filter((equipment:Equipment) => equipment.state).map((equipment:Equipment) => (
                <option key={equipment.id} value={equipment.id}>{equipment.equipment_name}</option>
              ))):(
                equipments.map((equipment:Equipment) => (
                  <option key={equipment.id} value={equipment.id}>{equipment.equipment_name}</option>
                ))
              )
            }
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
            className={`form-control ${!entry_time && error}`}
            id="entry-time"
            name="entry_time"
            value={entry_time}
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
            name="departure_time"
            value={departure_time}
            onChange={handleChange}
            {...(id ? {} : { disabled: true })}
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
        <FormButton
          type="submit"
          text={id ? "Actualizar" : "Registrar"}
          svg={user}
          className="btn btn-light d-flex gap-2 align-items-center"
        />
        <FormButton
          type="button"
          text="Borrar"
          svg={erase}
          method={eraseFields}
          className="btn btn-light d-flex gap-2 align-items-center"
        />
      </section>
    </form>
  );
};

export default RegisterForm;
