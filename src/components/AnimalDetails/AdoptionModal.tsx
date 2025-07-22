import { Link } from 'react-router-dom';
import './AdoptionModal.scss';
import { useState } from 'react';
import axios from 'axios';
import { EventType, useForm } from 'react-hook-form'; // import de react Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // resolver Zod pour pouvoir utiliser ls schémas de validation Zod
import { requestCreateSchema } from '../../schemas/request.schema'; // schéma de validatino utilisée pour valider les données du formulaire d'adoption soumis
import { API_URL } from '../../config';

// date :  les dates récupérées de BDD sont AAAA-MM-JJ sous forme string.
// On peut créer une date depuis cette valeur avec new Date()

const AdoptionModal = ({ closeModal, animal, setMessage }) => {
  // state pour checkbox afin de pouvoir valider la demande d'adoption
  const [accept, setAccept] = useState(false);

  // state pour date de début d'adoption choisi
  const [beginningDate, setBeginningDate] = useState();
  //console.log("beginning date", beginningDate);

  // initalisation via le hook useForm : on met register, handleSubmit, formState : {errors} (pour l'affichage des erreurs) !
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(requestCreateSchema) }); // utilisation de zodResolver et on indique le schéma utilisé

  // fonction pour la soumission du formulaire d'adoption
  const submitAdoptionForm = (dataSubmit) => {
    const formData = new FormData();
    for (const key in dataSubmit) {
      // on met les données en FormData
      if (key === 'field') {
        formData.append(key, dataSubmit[key][1]);
      } else {
        formData.append(key, dataSubmit[key]);
      }
    }
    console.log(formData);
    console.log(animal.association.id, animal.id); // vérif données

    if (
      formData.get('request_text') &&
      formData.get('starting_date') &&
      formData.get('ending_date') &&
      formData.get('accept') &&
      animal.association.id &&
      animal.id
    ) {
      console.log('Le formulaire est complet');
      //console.log(formData);

      // test pour savoir si on a token et un user id
      if (window.sessionStorage.getItem('token')) {
        console.log("c'est okay !");
      } else {
        console.log("C'est pêté !");
      }

      let data = Object.fromEntries(formData);
      // user_id mis en dur : il faudrait le récupérer depuis le cookie/token (ou header requête)
      data = {
        ...data,
        status: 'Nouveau',
        association_id: animal.association.id,
        pet_id: animal.id,
      }; // on intègre les id en number donc on reprend les valeurs numériques (pour ne pas avoir de string lié au formData)

      console.log(data);

      const token = sessionStorage.getItem('token');

      if (token) {
        console.log('✅ Token trouvé :', token);
      } else {
        console.log('❌ Aucun token trouvé dans sessionStorage');
      }

      axios
        .post(`${API_URL}/requests`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // on met le token dans l'entête Authorization
          },
        })
        .then((response) =>
          response.status === 201
            ? setMessage("La demande d'adoption a bien été enregistrée")
            : '',
        )
        .catch((err /*console.log(err.response.data.errors || err.message)*/) =>
          setMessage('Une erreur est survenue lors du traitement.'),
        ) // message d'erreurs liées aux données incorrectes ou erreur de traitement

        .finally(() => document.getElementById('modal')?.click()); // simulation clic sur l'élément modal pour la fermeture
    } else {
      console.log(
        'erreur : le formulaire est incomplet ou avec des valeurs incorrectes',
      );
    }
  };

  // date de début/fin maximal (1 an après la date du jour)
  function calculateMaxDate(date) {
    const year = Number(date.slice(0, 4)) + 1;
    //console.log(`${year}${date.slice(4)}`);
    return `${year}${date.slice(4)}`;
  }

  function calculateMinStartingDate(date) {
    const date_starting = date.getTime() + 1000 * 3600 * 24 * 10; // début adoption = jour actuel + 10j
    //console.log(new Date(date_starting).toLocaleDateString().split("/").reverse().join("-"));
    return new Date(date_starting)
      .toLocaleDateString()
      .split('/')
      .reverse()
      .join('-');
  }

  function calculateMinEndingDate(date) {
    //console.log(date);
    const date_ending = date.getTime() + 1000 * 3600 * 24 * 1; // fin adoption = au plus tôt, le lendemain du premier jour sélectionnable
    //console.log(new Date(date_ending).toLocaleDateString().split("/").reverse().join("-"));
    return new Date(date_ending)
      .toLocaleDateString()
      .split('/')
      .reverse()
      .join('-');
  }

  //console.log(animal);

  return (
    <section id="modal" className="close" onClick={closeModal}>
      <article>
        <i className="fa-solid fa-xmark close" onClick={closeModal} />

        <header id="modal-header">
          <span id="pet-name">{animal.name}</span>
          {/* <img src={`/${animal.pictures[0].url}`} alt={animal.name} /> */}
          <img src={`${API_URL}${animal.pictures[0].url}`} alt={animal.name} />
          <h2>Formulaire d'adoption</h2>
        </header>
        <form id="modal-form" onSubmit={handleSubmit(submitAdoptionForm)}>
          <textarea
            {...register('request_text')}
            name="request_text"
            id="request-text"
            placeholder={`Merci de saisir ici vos motivations pour l'accueil temporaire de "${animal.name}".\nVeuillez-indiquer également la composition de votre habitation (enfants, animaux, surface, jardin, etc...)`}
          ></textarea>

          <fieldset>
            <legend>Dates d'accueil temporaire</legend>
            <div id="dates">
              <label htmlFor="starting_date" className="date">
                Debut{' '}
                <input
                  {...register('starting_date')}
                  type="date"
                  id="starting_date"
                  name="starting_date"
                  className="calendar"
                  min={calculateMinStartingDate(new Date())}
                  max={calculateMaxDate(
                    new Date()
                      .toLocaleDateString()
                      .split('/')
                      .reverse()
                      .join('-'),
                  )}
                  onChangeCapture={(event) =>
                    setBeginningDate(event.target.value)
                  }
                />
              </label>
              <label htmlFor="ending_date" className="date">
                Fin{' '}
                <input
                  {...register('ending_date')}
                  type="date"
                  id="ending_date"
                  name="ending_date"
                  className="calendar"
                  disabled={!beginningDate}
                  min={calculateMinEndingDate(new Date(beginningDate))}
                  max={calculateMaxDate(
                    new Date()
                      .toLocaleDateString()
                      .split('/')
                      .reverse()
                      .join('-'),
                  )}
                />
              </label>
            </div>
          </fieldset>
          <label htmlFor="accept" id="confirm-text">
            <input
              type="checkbox"
              {...register('accept')}
              name="accept"
              id="accept"
              checked={accept}
              onChange={() => setAccept((prev) => !prev)}
            />{' '}
            J'ai pris connaissance et accepte le règlement relatif à l'adoption
            temporaire d'un animal... Pour plus de renseignements sur
            l'adoption, merci de consulter la{' '}
            <Link className="close" to="/contact" onClick={closeModal}>
              FAQ
            </Link>
          </label>

          <button
            type="submit"
            className={`link-redirection ${accept ? '' : 'disabled'}`}
            aria-disabled={accept ? false : true}
            disabled={!accept}
          >
            C'est parti !
          </button>
          {/* bloc affichage des erreurs en validation */}
          {errors !== null && (
            <ul id="errors">
              {/* affichage des messages d'erreurs depuis le schema de validation utilisée */}
              {errors.request_text && <li>{errors.request_text.message}</li>}
              {errors.starting_date && <li>{errors.starting_date.message}</li>}
              {errors.ending_date && <li>{errors.ending_date.message}</li>}
            </ul>
          )}
        </form>
      </article>
    </section>
  );
};

export default AdoptionModal;
