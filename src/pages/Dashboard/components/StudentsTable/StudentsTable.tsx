import { useState, useEffect, FormEvent } from "react";
import Swal from "sweetalert2";
import FormButton from "../../../../components/FormButtons/FormButton";
import update from "../../../../assets/update.svg";
import del from "../../../../assets/delete.svg";
import "./StudentsTable.css";
import {
  getRegisters,
  deleteRegister,
  deleteAllRegisters,
} from "../../../../api/register";
import { getAdminInfo } from "../../../../api/admin";

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
  const [registers, setRegisters] = useState<Register[]>([]);
  const [hasDeletePermission, setHasDeletePermission] = useState(false); // Estado para los permisos
  const [originalRegisters, setOriginalRegisters] = useState<Register[]>([]);
  const [allRegisters, setAllRegisters] = useState<Register[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRegister = await getRegisters();

        const registerOfTheDay = resultRegister.data.filter(
          (register: Register) => {
            const registerDate = new Date(register.date)
              .toISOString()
              .split("T")[0];
            const date = new Date();
            const formattedDate =
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0");
            const currentDate = formattedDate;
            console.log(currentDate);
            return registerDate === currentDate;
          }
        );
        setAllRegisters(resultRegister.data);
        setRegisters(registerOfTheDay);
        setOriginalRegisters(registerOfTheDay);

        // Verifica permisos del administrador
        const adminInfo = await getAdminInfo();
        // Supongamos que adminInfo tiene un campo `canDelete` que indica si puede eliminar
        setHasDeletePermission(adminInfo.canDelete);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (student_id: string, register_id: string) => {
    window.location.href = `/updateRegister/${student_id}/${register_id}`;
  };

  const handleDelete = async (student_id: string, register_id: string) => {
    if (!hasDeletePermission) {
      Swal.fire({
        title: "Permiso denegado",
        text: "No tienes permiso para eliminar registros",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "¿Está seguro de eliminar?",
      text: "Los cambios no se podrán revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRegister(student_id, register_id);
          Swal.fire({
            title: "Eliminado",
            text: "Registro eliminado",
            icon: "success",
          });
          setRegisters(
            registers.filter(
              (register: Register) => register.register_id !== register_id
            )
          );
        } catch (error) {
          console.error("Error deleting register:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el registro",
            icon: "error",
          });
        }
      }
    });
  };

  const handleDeleteAll = async () => {
    if (!hasDeletePermission) {
      Swal.fire({
        title: "Permiso denegado",
        text: "No tienes permiso para eliminar todos los registros",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "¿Está seguro de eliminar todos los registros?",
      text: "Los cambios no se podrán revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAllRegisters();
          Swal.fire({
            title: "Eliminado",
            text: "Todos los registros han sido eliminados",
            icon: "success",
          });
          setAllRegisters([]);
        } catch (error) {
          console.error("Error deleting all registers:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudieron eliminar todos los registros",
            icon: "error",
          });
        }
      }
    });
  };

  const [searchValue, setSearchValue] = useState({
    searchByNumber: "",
    registerDate: "",
  });

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (searchValue.registerDate === "" && searchValue.searchByNumber === "") {
      setRegisters(originalRegisters);
    } else if (
      searchValue.registerDate !== "" &&
      searchValue.searchByNumber === ""
    ) {
      const registerOfTheDay = allRegisters.filter((register: Register) => {
        const registerDate = new Date(register.date)
          .toISOString()
          .split("T")[0];
        return registerDate === searchValue.registerDate;
      });
      setRegisters(registerOfTheDay);
    } else if (
      searchValue.registerDate === "" &&
      searchValue.searchByNumber !== ""
    ) {
      const registerOfTheDay = allRegisters.filter((register: Register) => {
        return register.id_number === searchValue.searchByNumber;
      });
      if (registerOfTheDay.length > 0) {
        setRegisters(registerOfTheDay);
      } else {
        Swal.fire({
          title: "No encontrado",
          text: "No se encontró la boleta",
          icon: "error",
        });
        setRegisters(originalRegisters);
      }
    } else {
      const registerOfTheDay = allRegisters.filter((register: Register) => {
        const registerDate = new Date(register.date)
          .toISOString()
          .split("T")[0];
        return registerDate === searchValue.registerDate;
      });
      const registerOfTheDayAndNumber = registerOfTheDay.filter(
        (register: Register) => {
          return register.id_number === searchValue.searchByNumber;
        }
      );
      if (registerOfTheDayAndNumber.length > 0) {
        setRegisters(registerOfTheDayAndNumber);
      } else {
        Swal.fire({
          title: "No encontrado",
          text: "No se encontró la boleta",
          icon: "error",
        });
        setRegisters(originalRegisters);
      }
    }
  }

  return (
    <>
      <div>
        {hasDeletePermission && (
          <button
            className="btn btn-danger ms-5 mb-2"
            onClick={handleDeleteAll}
          >
            Eliminar registros
          </button>
        )}
        <form onSubmit={handleSubmit} className="d-flex ms-4">
          <div className="input-container">
            <input
              type="text"
              name="searchByNumber"
              id="searchByNumber"
              placeholder="Boleta"
              value={searchValue.searchByNumber}
              onChange={handleChange}
              className="form-control m-2"
            />
          </div>

          <div className="input-container">
            <input
              type="date"
              name="registerDate"
              onChange={handleChange}
              value={searchValue.registerDate}
              className="form-control m-2"
            />
          </div>

          <button type="submit" className="btn btn-primary m-2">Filtrar</button>
        </form>
      </div>

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
              {registers.length > 0 ? (
                registers.map((register: Register) => (
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
                          handleUpdate(
                            register.student_id,
                            register.register_id
                          )
                        }
                      />
                      {hasDeletePermission && (
                        <FormButton
                          type="button"
                          svg={del}
                          className="btn btn-danger"
                          method={() =>
                            handleDelete(
                              register.student_id,
                              register.register_id
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No hay registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsTable;
