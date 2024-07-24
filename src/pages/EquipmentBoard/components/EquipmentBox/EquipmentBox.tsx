import './EquipmentBox.css';

interface EquipmentBoxProps {
    image: string;
    title: string;
    }

const EquipmentBox = ({image, title}: EquipmentBoxProps) => {
    return (
        <div className="border equipment-box col">
            <img src={image} alt={title} />
            <p>{title}</p>
        </div>
    )
}

export default EquipmentBox;