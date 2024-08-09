import escom from "../../../../assets/escudo_ESCOM.png";

const Carrousel = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={escom} className="d-block w-100" alt={escom} />
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
