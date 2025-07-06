import { Link } from 'react-router-dom';
import './Item.scss';

const Item = ({ animal, activeIndex, setActiveIndex, direction, setDirection }) => {
  return (
    <>
      {/* conteneur comprenant l'animal central du carrousel  */}
      {/* <div id="container" className={direction} >
                <img className="pet" src={animal.img} alt={animal.name} />
                <span>{animal.name}</span>
            </div> */}

      <Link className='pet-link' to={`/pets/${animal.id}`} >
        <div className={`section-carousel-img visible ${direction  || ""}`}>
          <img
            src={animal.pictures[0].url}
            alt={animal.name}
            className="carousel-img scale"   // == 'mon petpet' chez moi
          />
        </div>
      </Link>
    </>
  );
};

export default Item;
