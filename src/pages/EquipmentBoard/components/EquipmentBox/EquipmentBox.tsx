import './EquipmentBox.css';

interface EquipmentBoxProps {
    image: string;
    title: string;
    }

const EquipmentBox = ({image, title}: EquipmentBoxProps) => {
    const numOfTitle = title.split(' ');
    const onlyNum = numOfTitle[1];

    return (
        <div className="border equipment-box col">
            <img src={image} alt={title} />
            <p>{onlyNum}</p>
        </div>
    )
}

export default EquipmentBox;