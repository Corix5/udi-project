import StudentsTable from "./components/StudentsTable/StudentsTable";
import FormButton from "../../components/FormButtons/FormButton";
import excel from "../../assets/excel.svg";

const Dashboard = () => {
  return (
    <>
      <h2 className="text-center fs-3 mt-4 p-1">LABORATORIO DE TIEMPO LIBRE <br /> LISTA DE REGISTROS</h2>
      <StudentsTable />
      <div className="d-flex justify-content-center">
        <FormButton
          className="btn btn-success d-flex gap-1 align-items-center"
          svg={excel}
          text="Exportar tabla"
          type="button"
        />
      </div>
    </>
  );
};

export default Dashboard;
