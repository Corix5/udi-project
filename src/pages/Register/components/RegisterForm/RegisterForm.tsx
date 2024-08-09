import { useState, useEffect } from "react";
import {
  validateid_number,
  validateEmail,
  validateName,
  validateForm,
  registerAlert,
  updateAlert,
  badRegisterAlert,
} from "./formValidations";
import {
  createStudent,
  getStudentById,
  getStudents,
} from "../../../../api/student";
import {
  createRegister,
  getRegisterId,
  updateRegister,
} from "../../../../api/register";
import { getEquipments } from "../../../../api/equipments";
import "./RegisterForm.css";
import FormButton from "../../../../components/FormButtons/FormButton";
import user from "../../../../assets/user.svg";
import erase from "../../../../assets/erase.svg";

interface RegisterFormProps {
  student_id?: string;
  register_id?: string;
}

const RegisterForm = ({ student_id, register_id }: RegisterFormProps) => {
  interface Student {
    id: string;
    name: string;
    id_number: string;
    email: string;
  }

  interface Register {
    student_id: string;
    equipment_id: string;
    date: string;
    entry_time: string;
    departure_time: string;
    comment: string;
  }

  interface Equipment {
    id?: string;
    equipment_name: string;
    state?: string;
  }

  const [equipments, setEquipments] = useState([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (register_id && student_id) {
        const student = await getStudentById(student_id);
        const registerResponse = await getRegisterId(student_id, register_id);
        const registerData = registerResponse.data && registerResponse.data[0];
        
        if (registerData.date) {
          registerData.date = registerData.date.split("T")[0];
        }

        if (registerData.equipment_name) {
          setEquipment({
            ...equipment,
            equipment_name: registerData.equipment_name,
          });
        }

        if (registerData.departure_time === null) {
          registerData.departure_time = "";
        }
        setStudent(student.data);
        setRegister(registerData);
      }
      const resultStudents = await getStudents();
      const result = await getEquipments();
      setEquipments(result.data);
      setStudents(resultStudents.data);
    };
    fetchData();
  }, []);

  const [student, setStudent] = useState({
    name: "",
    id_number: "",
    email: "",
  });

  const [register, setRegister] = useState({
    student_id: "",
    equipment_id: "",
    date: "",
    entry_time: "",
    departure_time: "",
    comment: "",
  });

  const [equipment, setEquipment] = useState({
    equipment_name: "",
  });

  const [error, setError] = useState("");

  const { name, id_number, email }: Student = { ...student, id: "" };

  const { date, entry_time, departure_time, comment, equipment_id }: Register = register;

  const { equipment_name }: Equipment = equipment;

  const formatTime = (time: string): string => {
    const parts = time.split(":");
    return parts.length === 2 ? `${time}:00` : time;
  };

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

        //si exitse ya el id_number, asigna automaticamente el nombre y correo
        const studentExists = students.find(
          (student: Student) => student.id_number === value
        );

        if (studentExists) {
          setStudent({
            name: studentExists.name,
            id_number: studentExists.id_number,
            email: studentExists.email,
          });
        }
      }
    } else if (name === "name") {
      if (validateName(value)) {
        setStudent({
          ...student,
          [name]: value,
        });
      }
    } else if (name === "email") {
      setStudent({
        ...student,
        [name]: value,
      });
    } else if (name === "equipment_name") {
      setEquipment({
        ...equipment,
        [name]: value,
      });
      setRegister({
        ...register,
        equipment_id: value,
      });
    } else {
      setRegister({
        ...register,
        [name]: value,
      });
    }
  };

  const eraseFields = () => {
    setStudent({
      name: "",
      id_number: "",
      email: "",
    });

    setRegister({
      student_id: "",
      equipment_id: "",
      date: "",
      entry_time: "",
      departure_time: "",
      comment: "",
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);

    const registerData = {
      ...register,
      entry_time: formatTime(register.entry_time),
      departure_time:
        register.departure_time === "" ? null : register.departure_time,
      comment: register.comment === "" ? "Sin comentarios" : register.comment,
    };

    const studentData = {
      ...student,
    };

    if (!validateForm(student, register)) {
      setError("boder border-danger");
    }
    else{
      try {
        if (register_id && student_id) {
          await updateRegister(student_id, register_id, registerData);
          return updateAlert();
        }
  
        // Crear el estudiante primero si id_number no existe
        const studentExists = students.find(
          (student: Student) => student.id_number === id_number
        );
  
        if (!studentExists) {
          const student = await createStudent(studentData);
          registerData.student_id = student.data.id;
        } else {
          registerData.student_id = studentExists.id;
        }
  
        // Crear el registro con el student_id actualizado
        await createRegister(registerData);
  
        registerAlert();
      } catch (error) {
        badRegisterAlert();
      }
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
            name="equipment_name"
            id="equipment_name"
            className={`form-select ${!equipment_name && error}`}
            value={equipment_id}
            onChange={handleChange}
          >
            <option value="">Seleccionar equipo</option>
            {!register_id
              ? equipments
                  .filter((equipment: Equipment) => equipment.state === "available")
                  .map((equipment: Equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.equipment_name}
                    </option>
                  ))
              : equipments.map((equipment: Equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.equipment_name}
                  </option>
                ))}
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
            {...(register_id ? {} : { disabled: true })}
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
          text={register_id ? "Actualizar" : "Registrar"}
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
