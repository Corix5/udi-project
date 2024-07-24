import EquipmentBox from "./components/EquipmentBox/EquipmentBox";
import deviceFree from "../../assets/deviceFree.svg";
import deviceBusy from "../../assets/deviceBusy.svg";
import { useEffect, useState } from "react";
import { getEquipments } from "../../api/equipments";

interface Equipment {
  id: string;
  equipment_name: string;
  state: string;
}

const groupEquipments = (equipments: Equipment[], itemsPerRow: number) => {
  const rows = [];
  for (let i = 0; i < equipments.length; i += itemsPerRow) {
    rows.push(equipments.slice(i, i + itemsPerRow));
  }
  return rows;
};

const EquipmentBoard = () => {
  const [equipments, setEquipments] = useState([]);
  const rows = groupEquipments(equipments, 6);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEquipments();
      setEquipments(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center fs-3 mt-4">
        LABORATORIO DE TIEMPO LIBRE <br /> TABLERO DE EQUIPOS
      </h2>
      <div className="container text-center mt-4">
        {rows.map((rows: Equipment[]) => (
          <div className="row">
            {rows.map((equipment: Equipment) => (
              <EquipmentBox
                key={equipment.id}
                title={equipment.equipment_name}
                image={equipment.state ? deviceFree : deviceBusy}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default EquipmentBoard;
