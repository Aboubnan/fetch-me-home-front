// import { Link } from 'react-router-dom';
// import './Item.scss';

// const Item = ({ animal, activeIndex, setActiveIndex, direction, setDirection }) => {
//   return (
//     <>
//       {/* conteneur comprenant l'animal central du carrousel  */}
//       {/* <div id="container" className={direction} >
//                 <img className="pet" src={animal.img} alt={animal.name} />
//                 <span>{animal.name}</span>
//             </div> */}

//       <Link className='pet-link' to={`/pets/${animal.id}`} >
//         <div className={`section-carousel-img visible ${direction  || ""}`}>
//           <img
//             src={animal.pictures[0].url}
//             alt={animal.name}
//             className="carousel-img scale"   // == 'mon petpet' chez moi
//           />
//         </div>
//       </Link>
//     </>
//   );
// };

// export default Item;
import { Link } from 'react-router-dom';
import './Item.scss';
import defaultImage from '../../assets/dog.png'; // adapte le chemin si besoin
import { API_URL } from '../../config';

const Item = ({
  animal,
  activeIndex,
  setActiveIndex,
  direction,
  setDirection,
}) => {
  if (!animal) return null;

  const imageUrl = animal.pictures?.[0]?.url
    ? `${API_URL}${animal.pictures[0].url}`
    : defaultImage;

  return (
    <>
      <Link className="pet-link" to={`/pets/${animal.id}`}>
        <div className={`section-carousel-img visible ${direction || ''}`}>
          <img
            src={imageUrl}
            alt={animal.name}
            className="carousel-img scale"
          />
        </div>
      </Link>
    </>
  );
};

export default Item;
