import FormButton from "../../../../components/FormButtons/FormButton";
import update from "../../../../assets/update.svg";
import del from "../../../../assets/delete.svg";
import { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../../../../api/student";

interface Student {
  id: string,
  name: string,
  id_number: string;
  email: string,
  equipment: string,
  date: string,
  entry_time: string,
  departure_time: string,
  comment: string
}

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStudents();
      setStudents(result.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id:string) => {
    await deleteStudent(id);
    setStudents(students.filter((student:Student) => student.id !== id));
  };

  return (
    <div className="container p-2">
      <div className="table-responsive">
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
            {students.map((student: Student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.id_number}</td>
                <td>{student.email}</td>
                <td>{student.equipment}</td>
                <td>{student.date}</td>
                <td>{student.entry_time}</td>
                <td>{student.departure_time}</td>
                <td>{student.comment}</td>
                <td className="d-flex align-center gap-2">
                  <FormButton
                    type="button"
                    svg={update}
                    className="btn btn-warning"
                  />
                  <FormButton
                    type="button"
                    svg={del}
                    className="btn btn-danger"
                    method={() => handleDelete(student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
