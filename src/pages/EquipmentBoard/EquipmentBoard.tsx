import EquipmentBox from "./components/EquipmentBox/EquipmentBox";
import deviceFree from "../../assets/deviceFree.svg";
import deviceBusy from "../../assets/deviceBusy.svg";
import { useEffect, useState } from "react";
import { getEquipments } from "../../api/equipments";
import "./EquipmentBoard.css";

interface Equipment {
  id: string;
  equipment_name: string;
  state: string;
}

const groupEquipmentsLeft = (equipments: Equipment[], itemsPerRow: number) => {
  const rows = [];
  for (let i = 0; i < 7; i += itemsPerRow) {
    rows.push(equipments.slice(i, i + itemsPerRow));
  }
  return rows;
};

const groupEquipmentsCenter = (
  equipments: Equipment[],
  itemsPerRow: number
) => {
  const rows = [];
  for (let i = 8; i < 26; i += itemsPerRow) {
    rows.push(equipments.slice(i, i + itemsPerRow));
  }
  return rows;
};

const groupEquipmentRigth = (equipments: Equipment[], itemsPerRow: number) => {
  const rows = [];
  for (let i = 26; i < equipments.length; i += itemsPerRow) {
    rows.push(equipments.slice(i, i + itemsPerRow));
  }
  return rows;
};

const EquipmentBoard = () => {
  const [equipments, setEquipments] = useState([]);
  const left = groupEquipmentsLeft(equipments, 2);
  const center = groupEquipmentsCenter(equipments, 2);
  const rigth = groupEquipmentRigth(equipments, 2);

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
      TABLERO DE EQUIPOS
      </h2>

      <div className="lab-container">
        <div className="left-lab">
          <div className="container text-center mt-4">
            {left.map((rows: Equipment[], index) => (
              <div key={index} className="row">
                {rows.map((equipment: Equipment) => (
                  <EquipmentBox
                    key={equipment.id}
                    title={equipment.equipment_name}
                    image={equipment.state == "available" ? deviceFree : deviceBusy}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="center-lab">
          <div className="container text-center mt-4">
            {center.map((rows: Equipment[], index) => (
              <div key={index} className="row">
                {rows.map((equipment: Equipment) => (
                  <EquipmentBox
                    key={equipment.id}
                    title={equipment.equipment_name}
                    image={equipment.state == "available" ? deviceFree : deviceBusy}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="rigth-lab">
          <div className="container text-center mt-4">
            {rigth.map((rows: Equipment[], index) => (
              <div key={index} className="row">
                {rows.map((equipment: Equipment) => (
                  <EquipmentBox
                    key={equipment.id}
                    title={equipment.equipment_name}
                    image={equipment.state == "available" ? deviceFree : deviceBusy}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentBoard;
