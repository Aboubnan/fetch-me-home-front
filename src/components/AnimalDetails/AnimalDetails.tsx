import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './AnimalDetails.scss';
import { mapApiAnimal } from '../../utils/animalUtils';
import type { Animal } from '../@types/animal';
import { Link, useParams } from 'react-router-dom';
import AdoptionModal from './AdoptionModal.tsx'; // composant Modale

// Composant principal pour l'affichage des détails d'un animal
function AnimalDetails() {
  // Récupère l'ID de l'animal depuis l'URL grâce au hook useParams
  const { id } = useParams();
  // State pour stocker les données de l'animal récupérées de l'API
  const [animal, setAnimal] = useState<Animal | null>(null);
  // state pour la modale
  const [showModal, setShowModal] = useState(false);
  // state pour message à afficher après création request
  const [messageAdoption, setMessageAdoption] = useState<string>("");


  // Galerie d'images statique temporaire (seront remplacer par les img API))
  // const galleryImages = [
  //   { id: 1, url: '/src/assets/border-collie.jpg' },
  //   { id: 2, url: '/src/assets/border-collie2.jpg' },
  //   { id: 3, url: '/src/assets/border-collie3.jpg' },
  // ];

  console.log(animal);
  // Par défaut, la première image est sélectionnée
  const [selectedImage, setSelectedImage] = useState();

  // Effet pour aller chercher les infos de l'animal à chaque changement d'ID
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        // Appel API pour récupérer les infos de l'animal
        const response = await axios.get(`${API_URL}/pets/${id}`);
        // Transformation des données API en objet Animal typé
        setAnimal(mapApiAnimal(response.data));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'animal :", error);
      }
    };
    if (id) fetchAnimal();
  }, [id]);

  // effet pour fermer modale avec Echap
  useEffect(() => {
    const closeModalWithKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('touche echap pressée');
        closeModal(e);
      }
    };
    document.addEventListener('keydown', closeModalWithKey);

    return () => document.removeEventListener('keydown', closeModalWithKey);
  }, []);
  // fin effet modale

  // fonction showModal
  function showModalAdoption() {
    console.log('dans la fonction showModalAdoption');
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }

     // fonction closeModal
  function closeModal(e:MouseEvent|KeyboardEvent) {
    e.stopPropagation();  // pour éviter le bouillonement sur l'élément "#modal" pour les clics sur croix et lien FAQ
    //console.log(e.currentTarget);
    if(e.target?.classList.contains("close") || e.key ==="Escape") {
      document.body.style.overflow = "visible";
      setShowModal(false);  
    }
  }

  // Affichage d'un message de chargement si les données ne sont pas encore arrivées
  if (!animal) {
    return <div>Chargement...</div>; // à modifier plus tard
  }

  // Affichage de la carte de détails de l'animal
  return (
    <main className="animal-details-card">
      {/* Bloc principal de la carte (image + infos) */}
      <div className="animal-card-container">
        {/* Image principale de l'animal */}
        <img
          src={selectedImage ? `../${selectedImage}` : `../${animal.pictures[0].url}`}
          alt={`Photo principale de ${animal.name}`}
          className="animal-main-image"
        />
        {/* Bloc infos (nom, âge, lieu, genre, galerie) */}
        <div className="animal-card-infos">
          {/* insertion de la modale à ce niveau avec passage des props */}
          {showModal && <AdoptionModal closeModal={closeModal} animal={animal} setMessage={setMessageAdoption}/>}

          <h1>{animal.name}</h1>
          <ul className="info-list">
            <li>
              {/* Icône âge + valeur */}
              <i className="fa-solid fa-cake-candles icon" />{' '}
              <span>{animal.age}</span>
            </li>
            <li>
              {/* Icône localisation + valeur */}
              <i className="fa-solid fa-location-dot icon" />{' '}
              <span>{animal.location}</span>
            </li>
            <li>
              {/* Icône genre (♂ ou ♀) + texte */}
              <i
                className={`fa-solid ${animal.gender === '♀' ? 'fa-venus' : 'fa-mars'} icon`}
              />{' '}
              <span>{animal.gender === '♀' ? 'Femelle' : 'Mâle'}</span>
            </li>
          </ul>
          {/* Galerie d'images miniatures */}
          {animal.pictures.length > 1 && (
            <div className="details-gallery">
              {animal.pictures.map((picture) => (
                <button
                  key={picture.id}
                  className={`gallery-thumb ${selectedImage === picture.url ? 'active' : ''}`}
                  onClick={() => setSelectedImage(picture.url)}
                  type="button"
                >
                  <img src={`../${picture.url}`} alt={`Miniature ${picture.id}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Bloc description et bouton adoption */}
      <div className="animal-description-section">
        <h2>Quelques mots sur {animal.name}</h2>
        <p className="description-text">{animal.description}</p>
        <Link to="" className="link-redirection" onClick={showModalAdoption}>
          Adopte-moi !
        </Link>
        {messageAdoption && <p className="messageAdoption">{messageAdoption}</p>}
      </div>
    </main>
  );
}

export default AnimalDetails;
