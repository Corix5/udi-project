import RegisterForm from "../Register/components/RegisterForm/RegisterForm";
import { useParams } from "react-router-dom";

const UpdateRegister = () => {
  const { student_id, register_id } = useParams();
  return (
    <>
      <h2 className="text-center fs-3 mt-4 p-1">
        LABORATORIO TIEMPO LIBRE <br /> ACTUALIZACIÓN DE REGISTRO PARA PRESTAMO DE EQUIPO DE
        CÓMPUTO
      </h2>
      <RegisterForm register_id={register_id} student_id={student_id}/>
    </>
  );
};

export default UpdateRegister;
