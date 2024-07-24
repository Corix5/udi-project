import EquipmentBox from "./components/EquipmentBox/EquipmentBox";
import deviceFree from "../../assets/deviceFree.svg";
import deviceBusy from "../../assets/deviceBusy.svg";

const EquipmentBoard = () => {
  return (
    <>
      <h2 className="text-center fs-3 mt-4">
        LABORATORIO DE TIEMPO LIBRE <br /> TABLERO DE EQUIPOS
      </h2>
      <div className="container text-center mt-4">
        <div className="row">
          <EquipmentBox title="Lenovo 1" image={deviceFree} />
          <EquipmentBox title="Lenovo 2" image={deviceFree} />
          <EquipmentBox title="Lenovo 3" image={deviceBusy} />
          <EquipmentBox title="Lenovo 4" image={deviceFree} />
          <EquipmentBox title="Lenovo 5" image={deviceFree} />
          <EquipmentBox title="Lenovo 6" image={deviceBusy} />
        </div>

        <div className="row">
          <EquipmentBox title="Lenovo 7" image={deviceFree} />
          <EquipmentBox title="Lenovo 8" image={deviceFree} />
          <EquipmentBox title="Lenovo 9" image={deviceFree} />
          <EquipmentBox title="Lenovo 10" image={deviceBusy} />
          <EquipmentBox title="Lenovo 11" image={deviceFree} />
          <EquipmentBox title="Lenovo 12" image={deviceFree} />
        </div>
      </div>
    </>
  );
};

export default EquipmentBoard;
