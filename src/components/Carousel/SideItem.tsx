// import './SiteItem.scss';

// const SideItem = ({ animal, direction }) => {
//   // direction donnera le sens à suivre pour les images annexes selon le choix de la flêche pour voir les images (droite par défaut)
//   return (
//     // <img className={`visible ${direction}`} src={animal.img} alt={animal.name} />
//     <div className="section-carousel-img">
//       <img
//         src={animal.pictures[0].url}
//         alt={animal.name}
//         className= {`carousel-img ${direction}`}
//       />
//     </div>
//   );
// };

// export default SideItem;
import './SiteItem.scss';
import defaultImage from '../../assets/dog.png'; // à adapter selon ton arborescence
import { API_URL } from '../../config';

const SideItem = ({ animal, direction }) => {
  if (!animal) return null;

  const imageUrl = animal.pictures?.[0]?.url
    ? `${API_URL}${animal.pictures[0].url}`
    : defaultImage;

  return (
    <div className="section-carousel-img">
      <img
        src={imageUrl}
        alt={animal.name}
        className={`carousel-img ${direction}`}
      />
    </div>
  );
};

export default SideItem;
