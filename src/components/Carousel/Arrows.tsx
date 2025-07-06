import { Link } from 'react-router-dom';
import './Arrows.scss';
import { useEffect } from "react";

const Arrows = ({animals, animal, setDirection, activeIndex, setActiveIndex}) => {

  useEffect(() => {

    console.log("effet clavier lancé")
    function handleKeyboard(e) {
      if(e.key === "ArrowRight") {
        setDirection("droite");
        setActiveIndex(activeIndex + 1 >= animals.length ? 0 : activeIndex + 1);
      }
      if(e.key === "ArrowLeft") {
        setDirection("gauche");
        setActiveIndex(activeIndex - 1 < 0 ? animals.length - 1 : activeIndex - 1);
      }
    }

    document.addEventListener("keyup", handleKeyboard);

    return(() => document.removeEventListener("keyup", handleKeyboard));

  }, [activeIndex]);

  return (
    <div className="section-arrow">
      <i className="fa-solid fa-chevron-left" 
        onClick={() => {
          setActiveIndex(activeIndex - 1 < 0 ? animals.length - 1 : activeIndex - 1);
          setDirection("gauche");
        }} 
      />

      <Link className='pet-name' to={`/pets/${animal.id}`} >
        {animal.name}
      </Link>
      
      <i className="fa-solid fa-chevron-right" 
        onClick={() => {
          setActiveIndex(activeIndex + 1 >= animals.length ? 0 : activeIndex + 1);
          setDirection("droite");
        }} />
    </div>
  );
};

export default Arrows;
