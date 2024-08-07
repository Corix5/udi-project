import FormButton from "../../../../components/FormButtons/FormButton";
import update from "../../../../assets/update.svg";
import del from "../../../../assets/delete.svg";
import "./StudentsTable.css";
import { useState, useEffect } from "react";
import {
  getRegisters,
  deleteRegister,
  deleteAllRegisters,
} from "../../../../api/register";
import Swal from "sweetalert2";

interface Register {
  register_id: string;
  student_id: string;
  name: string;
  id_number: string;
  email: string;
  equipment_name: string;
  date: string;
  entry_time: string;
  departure_time: string | null;
  comment: string | null;
}

const StudentsTable = () => {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultRegister = await getRegisters();
      setRegisters(resultRegister.data);
      console.log(resultRegister.data);
    };
    fetchData();
  }, []);

  const handleUpdate = (student_id: string, register_id: string) => {
    window.location.href = `/updateRegister/${student_id}/${register_id}`;
  };

  const handleDelete = async (student_id: string, register_id: string) => {
    Swal.fire({
      title: "¿Está seguro de eliminar?",
      text: "Los cambios no se podrán revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "Registro eliminado",
          icon: "success",
        });
      }
      await deleteRegister(student_id, register_id);
      setRegisters(
        registers.filter(
          (register: Register) => register.register_id !== register_id
        )
      );
    });
  };

  const handleDeleteAll = async () => {
    Swal.fire({
      title: "¿Está seguro de eliminar todos los registros?",
      text: "Los cambios no se podrán revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "Registro eliminado",
          icon: "success",
        });
      }
      await deleteAllRegisters();
      setRegisters([]);
    });
  };

  return (
    <>
      <button className="btn btn-danger ms-5 mb-2" onClick={handleDeleteAll}>
        Eliminar registros
      </button>

      <div className=" p-1 register-table">
        <div className="table-responsive table-container">
          <table className="table text-center border">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Boleta</th>
                <th scope="col">Correo</th>
                <th scope="col">Equipo</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora de entrada</th>
                <th scope="col">Hora de salida</th>
                <th scope="col">Comentarios</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registers.map((register: Register) => (
                <tr key={register.register_id}>
                  <td>{register.name}</td>
                  <td>{register.id_number}</td>
                  <td>{register.email}</td>
                  <td>{register.equipment_name}</td>
                  <td>{register.date.split("T")[0]}</td>
                  <td>{register.entry_time}</td>
                  <td>{register.departure_time}</td>
                  <td>{register.comment}</td>
                  <td className="d-flex align-center gap-2">
                    <FormButton
                      type="button"
                      svg={update}
                      className="btn btn-warning"
                      method={() =>
                        handleUpdate(register.student_id, register.register_id)
                      }
                    />
                    <FormButton
                      type="button"
                      svg={del}
                      className="btn btn-danger"
                      method={() =>
                        handleDelete(register.student_id, register.register_id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsTable;
