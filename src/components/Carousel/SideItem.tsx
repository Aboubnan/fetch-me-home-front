import './SiteItem.scss';

const SideItem = ({ animal, direction }) => {
  // direction donnera le sens à suivre pour les images annexes selon le choix de la flêche pour voir les images (droite par défaut)
  return (
    // <img className={`visible ${direction}`} src={animal.img} alt={animal.name} />
    <div className="section-carousel-img">
      <img
        src={animal.pictures[0].url}
        alt={animal.name}
        className= {`carousel-img ${direction}`}
      />
    </div>
  );
};

export default SideItem;
