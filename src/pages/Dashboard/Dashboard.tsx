import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import StudentsTable from "./components/StudentsTable/StudentsTable";
import FormButton from "../../components/FormButtons/FormButton";
import excel from "../../assets/excel.svg";
import { getRegisters } from "../../api/register";

interface Register {
  name: string;
  id_number: string;
  email: string;
  equipment_name: string;
  date: string;
  entry_time: string;
  departure_time: string | null;
  comment: string | null;
}

const Dashboard: React.FC = () => {
  const [register, setRegister] = useState<Register[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const registerResponse = await getRegisters();
      setRegister(registerResponse.data);
    };
    fetchData();
  }, []);

  const ExcelExport = () => {
    const customizedData = register.map(({ name, id_number, email, equipment_name, date, entry_time, departure_time, comment }) => ({
      "Nombre": name,
      "Boleta": id_number,
      "Correo Electrónico": email,
      "Equipo Asignado": equipment_name,
      "Fecha": date,
      "Hora de Entrada": entry_time,
      "Hora de Salida": departure_time,
      "Comentario": comment
    }));

    const worksheet = XLSX.utils.json_to_sheet(customizedData);

    // Estilos de las celdas de encabezado
    const headerStyle = {
      fill: { fgColor: { rgb: "0000FF" } }, // Fondo azul
      font: { color: { rgb: "FFFFFF" } }, // Letras blancas
      alignment: { horizontal: "center", vertical: "center" } // Centrado
    };

    // Verificar que worksheet["!ref"] no sea undefined
    if (worksheet["!ref"]) {
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[address]) continue;
        worksheet[address] = {
          ...worksheet[address],
          s: headerStyle
        };
      }

      // Ajustar el ancho de las columnas
      const wscols = [
        { wch: 25 }, // Nombre
        { wch: 15 }, // Boleta
        { wch: 30 }, // Correo Electrónico
        { wch: 20 }, // Equipo Asignado
        { wch: 15 }, // Fecha
        { wch: 15 }, // Hora de Entrada
        { wch: 15 }, // Hora de Salida
        { wch: 30 }  // Comentario
      ];
      worksheet['!cols'] = wscols;
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");

    const currentDataFormat = new Date().toLocaleDateString();
    XLSX.writeFile(workbook, `Registros laboratorio de tiempo libre ${currentDataFormat}.xlsx`);
  };

  return (
    <>
      <h2 className="text-center fs-3 mt-4 p-1">
        LABORATORIO DE TIEMPO LIBRE <br /> LISTA DE REGISTROS
      </h2>
      <StudentsTable />
      <div className="d-flex justify-content-center">
        <FormButton
          className="btn btn-success d-flex gap-1 align-items-center"
          svg={excel}
          text="Exportar tabla"
          type="button"
          method={ExcelExport}
        />
      </div>
    </>
  );
};

export default Dashboard;
