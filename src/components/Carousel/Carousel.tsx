import './Carousel.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Arrows from './Arrows';
import Item from './Item';
import Loader from './Loader';
import SideItem from './SideItem';
import Species from './Species';
import Info from '../Info/Info';
import { API_URL } from '../../config'; // adapte le chemin si besoin

function Carousel() {
  // states
  // state animals pour les 3 (ou plus ?) animaux du carroussel
  const [animals, setAnimals] = useState([]); // récupération des données dans un state "animals" (normalement on aurait fait cela dans un effet de bord depuios un appel Axios)
  // state de l'index courant (valeur par défaut 0)
  const [activeIndex, setActiveIndex] = useState(0); // par défaut index est 0
  // state pour le défilement du carrousel (effets de transition)
  const [direction, setDirection] = useState(null);

  // effet pour récupérer les animaux (appel axios à l'API)
  useEffect(() => {
    axios
      .get(`${API_URL}/pets?limit=4`) // https://test-pet-foster-back.onrender.com/pets    --  https://aboubnan-server.eddi.cloud/pets
      .then((response) => {
        //console.log(response);
        // on récupère deux props sur response.data : rows (données des animaux) et count (nombre d'animaux total)

        setAnimals(response.data.rows); // mis à jour du state avec les données récupérées
        // setActiveIndex(0); // on indique l'index à ce niveau afin de lancer l'effet de défilement
      });
  }, []);

  //  effet de bord pour lancer le défilement auto du carrousel
  //   useEffect(() => {
  //     const forward = setInterval(function forward() {
  //       setDirection('droite');
  //       setActiveIndex(activeIndex + 1 >= animals.length ? 0 : activeIndex + 1);
  //     }, 5000);

  //     return () => clearInterval(forward);
  //   }, [activeIndex]); // mettre activeIndex pour avoir un défilement auto !

  //console.log(animals);

  return (
    <>
      <Info />
      <section className="carousel-container">
        <div className="section-carousel">
          {animals.length === 0 ? (
            <Loader />
          ) : (
            <>
              {/* Catégories d'animaux */}
              <Species animal={animals[activeIndex]} />

              {/* Images carousel */}
              <div className="carousel-wrapper">
                <div className="carousel-images">
                  {/* <div className="section-carousel-img">
                <img
                  src="src/assets/border-collie.jpg"
                  alt="chien heureux dans l'herbe"
                  className="carousel-img"
                />
              </div> */}
                  <SideItem
                    key={
                      animals[
                        activeIndex - 1 < 0
                          ? animals.length - 1
                          : activeIndex - 1
                      ].name
                    }
                    animal={
                      animals[
                        activeIndex - 1 < 0
                          ? animals.length - 1
                          : activeIndex - 1
                      ]
                    }
                    direction={direction}
                  />

                  <Item
                    key={animals[activeIndex].name}
                    animal={animals[activeIndex]}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    direction={direction}
                    setDirection={setDirection}
                  />

                  {/* <div className="section-carousel-img visible">
                <img
                  src="src/assets/border-collie.jpg"
                  alt="chien heureux dans l'herbe"
                  className="carousel-img scale"
                />
              </div> */}

                  <SideItem
                    key={
                      animals[
                        activeIndex + 1 >= animals.length ? 0 : activeIndex + 1
                      ].name
                    }
                    animal={
                      animals[
                        activeIndex + 1 >= animals.length ? 0 : activeIndex + 1
                      ]
                    }
                    direction={direction}
                  />
                  {/* <div className="section-carousel-img">
                <img
                  src="src/assets/border-collie.jpg"
                  alt="chien heureux dans l'herbe"
                  className="carousel-img"
                />
              </div> */}
                </div>

                {/* Chevrons carousel */}
                <Arrows
                  setDirection={setDirection}
                  setActiveIndex={setActiveIndex}
                  activeIndex={activeIndex}
                  animals={animals}
                  animal={animals[activeIndex]}
                />
                {/* <div className="section-arrow">
              <i className="fa-solid fa-chevron-left" />
              <a href="#" className="pet-name">
                Nom animal
              </a>
              <i className="fa-solid fa-chevron-right" />
            </div> */}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Carousel;
