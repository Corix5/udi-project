import FormButton from "../../../../components/FormButtons/FormButton";
import update from "../../../../assets/update.svg";
import del from "../../../../assets/delete.svg";

const StudentsTable = () => {
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
            <tr>
              <td>Luis David Cortés Coria</td>
              <td>2020630085</td>
              <td>lcortesc1600@alumno.ipn.mx</td>
              <td>Lenovo 1</td>
              <td>23-07-2024</td>
              <td>10:05</td>
              <td>11:35</td>
              <td>Sin comentarios</td>
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
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
