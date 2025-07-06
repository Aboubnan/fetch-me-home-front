import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateSchema } from '../../../schemas/userSchema';
import type { UserUpdateFormData } from '../../../schemas/userSchema';
import axios from 'axios';
import styles from '../dashboard.module.scss';

// Valeurs fictives pour l'exemple (à remplacer après par les vraies données utilisateur)
const defaultValues: UserUpdateFormData = {
  email: 'kellyslater@email.com',
  first_name: 'Slater',
  last_name: 'Kelly',
  password: 'Seasexsun&surf1!',
  confirmPassword: 'Seasexsun&surf1!',
  address: '1 rue du shortbreak',
  zip_code: '97118',
  city: 'Saint-Francois',
  phone_number: '0612345678',
  is_admin: false,
};

// Composant principal d'affichage et édition du profil utilisateur
export default function BenevoleProfile() {
  // State pour les messages succès et erreur serveur
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    'https://i.pravatar.cc/150?u=125',
  );

  // Initialisation du formulaire RHF + Zod
  const userForm = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues,
    mode: 'onBlur',
  });

  // Soumission du formulaire : envoi des données à l'API + gestion des messages
  const onSubmit = async (data: UserUpdateFormData) => {
    setSuccessMessage('');
    setServerError('');
    const userId = 1; // À remplacer dynamiquement
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${userId}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      // Si la mise à jour réussit
      if (response.status === 200) {
        setSuccessMessage('Profil mis à jour avec succès !');
        userForm.reset(data); // remet à jour le formulaire avec les nouvelles valeurs
      }
    } catch (err: any) {
      // Gestion des erreurs serveur
      if (err.response && err.response.data) {
        const data = err.response.data;
        // On vérifie si la réponse d'erreur du serveur contient un tableau 'issues' (erreurs de validation détaillées)
        // Si oui, on traite chaque erreur pour l'afficher sur le champ concerné ou en gloabal
        if (Array.isArray(data.issues) && data.issues.length > 0) {
          // Map chaque erreur serveur sur le champ concerné qd c'est possible
          for (const issue of data.issues) {
            if (issue.path && issue.path.length > 0) {
              userForm.setError(issue.path[0], {
                type: 'server',
                message: issue.message,
              });
            } else {
              // Sinon, on affiche l'erreur comme message global
              setServerError(issue.message);
            }
          }
        } else if (data.message) {
          // Si la réponse contient un message d'erreur global, on l'affiche
          setServerError(data.message);
        } else {
          // Si aucune info précise, on affiche un message d'erreur générique
          setServerError('Erreur réseau ou serveur. Veuillez réessayer.');
        }
      } else {
        // Si la réponse ne contient pas de data par ex problème réseau, on affiche aussi un message générique
        setServerError('Erreur réseau ou serveur. Veuillez réessayer.');
      }
    }
  };

  // Fonction de gestion du changement d'avatar utilisateur
  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    // On récupère le fichier sélectionné (le premier si plusieurs)
    const file = event.target.files && event.target.files[0];
    if (file) {
      // On crée un FileReader pour lire le fichier localement
      const reader = new FileReader();
      // Quand la lecture est terminée, on met à jour l'aperçu avec le résultat (base64)
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      // On lance la lecture du fichier en base64 (data URL)
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={`${styles.bulmaScope} container mt-5`}>
      {/* Titre principal */}
      <h1 className="title is-2 has-text-centered">Profil Utilisateur</h1>
      <div className="columns">
        {/* Colonne Avatar (1/3) */}
        <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
          <h2 className="title is-4 has-text-grey">Avatar</h2>
          <figure className="image is-128x128">
            <img
              src={avatarPreview}
              alt="Avatar utilisateur"
              className="is-rounded"
            />
          </figure>
          <div className="file mt-2">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <span className="file-cta file is-primary file is-small">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Changer l'avatar</span>
              </span>
            </label>
          </div>
        </div>
        {/* Colonne Formulaire Profil (2/3) */}
        <div className="column is-two-thirds">
          <h2 className="title is-4 has-text-grey">
            Informations Personnelles
          </h2>
          <div className="box">
            {/* Affichage des messages de succès et d'erreur global */}
            {successMessage && (
              <div className="notification is-success">{successMessage}</div>
            )}
            {serverError && (
              <div className="notification is-danger">{serverError}</div>
            )}
            {/* Formulaire d'informations utilisateur */}
            <form onSubmit={userForm.handleSubmit(onSubmit)}>
              {/* Champ Email */}
              <div className="field">
                <label
                  className="label has-text-dark has-icons-left"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="control">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    {...userForm.register('email')}
                  />
                </div>
                {userForm.formState.errors.email && (
                  <p className="help is-danger">
                    {userForm.formState.errors.email.message as string}
                  </p>
                )}
              </div>
              {/* Prénom et Nom sur deux colonnes */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label has-text-dark" htmlFor="first_name">
                      Prénom
                    </label>
                    <div className="control">
                      <input
                        id="first_name"
                        className="input"
                        type="text"
                        {...userForm.register('first_name')}
                      />
                    </div>
                    {userForm.formState.errors.first_name && (
                      <p className="help is-danger">
                        {userForm.formState.errors.first_name.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label has-text-dark" htmlFor="last_name">
                      Nom
                    </label>
                    <div className="control">
                      <input
                        id="last_name"
                        className="input"
                        type="text"
                        {...userForm.register('last_name')}
                      />
                    </div>
                    {userForm.formState.errors.last_name && (
                      <p className="help is-danger">
                        {userForm.formState.errors.last_name.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Mot de passe et confirmation */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label has-text-dark" htmlFor="password">
                      Mot de passe
                    </label>
                    <div className="control">
                      <input
                        id="password"
                        className="input"
                        type="password"
                        {...userForm.register('password')}
                      />
                    </div>
                    <small className="help">
                      Le mot de passe doit contenir entre 6 et 20 caractères
                      dont au moins : 1 minuscule, 1 majuscule, 1 chiffre, 1
                      caractère spécial parmi +=#[]?!@$%^&*()-]
                    </small>
                    {userForm.formState.errors.password && (
                      <p className="help is-danger">
                        {userForm.formState.errors.password.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label
                      className="label has-text-dark"
                      htmlFor="confirmPassword"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="control">
                      <input
                        id="confirmPassword"
                        className="input"
                        type="password"
                        {...userForm.register('confirmPassword')}
                      />
                    </div>
                    {userForm.formState.errors.confirmPassword && (
                      <p className="help is-danger">
                        {
                          userForm.formState.errors.confirmPassword
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Adresse */}
              <div className="field">
                <label className="label has-text-dark" htmlFor="address">
                  Adresse
                </label>
                <div className="control">
                  <input
                    id="address"
                    className="input"
                    type="text"
                    {...userForm.register('address')}
                  />
                </div>
                {userForm.formState.errors.address && (
                  <p className="help is-danger">
                    {userForm.formState.errors.address.message as string}
                  </p>
                )}
              </div>
              {/* Code postal et Ville sur deux colonnes */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label has-text-dark" htmlFor="zip_code">
                      Code Postal
                    </label>
                    <div className="control">
                      <input
                        id="zip_code"
                        className="input"
                        type="text"
                        {...userForm.register('zip_code')}
                      />
                    </div>
                    {userForm.formState.errors.zip_code && (
                      <p className="help is-danger">
                        {userForm.formState.errors.zip_code.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label has-text-dark" htmlFor="city">
                      Ville
                    </label>
                    <div className="control">
                      <input
                        id="city"
                        className="input"
                        type="text"
                        {...userForm.register('city')}
                      />
                    </div>
                    {userForm.formState.errors.city && (
                      <p className="help is-danger">
                        {userForm.formState.errors.city.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Numéro de téléphone */}
              <div className="field">
                <label className="label has-text-dark" htmlFor="phone_number">
                  Numéro de téléphone
                </label>
                <div className="control">
                  <input
                    id="phone_number"
                    className="input"
                    type="tel"
                    {...userForm.register('phone_number')}
                  />
                </div>
                {userForm.formState.errors.phone_number && (
                  <p className="help is-danger">
                    {userForm.formState.errors.phone_number.message as string}
                  </p>
                )}
              </div>
              {/* Checkbox Administrateur (lecture seule) */}
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={defaultValues.is_admin}
                      readOnly
                    />{' '}
                    Administrateur
                  </label>
                </div>
              </div>
              {/* Bouton de mise à jour */}
              <div className="field mt-5">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary"
                    disabled={
                      userForm.formState.isSubmitting ||
                      !userForm.formState.isDirty ||
                      !userForm.formState.isValid
                    }
                  >
                    Mettre à jour le profil
                  </button>
                  <button
                    type="button"
                    className="button is-light ml-2"
                    onClick={() => userForm.reset()}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Section des demandes d'accueil */}
      <div className="columns mt-5">
        <div className="column is-full">
          <h2 className="title is-4 has-text-grey">Demandes d'accueil</h2>
          <div className="columns is-multiline">
            {/* Première demande d'accueil */}
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">
                    Statut: <span className="tag is-info">Nouveau</span>
                  </p>
                  <p className="subtitle is-6">Du 01/05/2025 au 10/05/2025</p>
                  <div className="content">
                    <p>
                      Je souhaite accueillir un animal pendant mes vacances de
                      printemps.
                    </p>
                    <p className="is-size-7">
                      ID Utilisateur: 1 | ID Animal: 101
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <div className="card-footer-item">
                    <button
                      className="button is-danger is-fullwidth"
                      type="button"
                    >
                      Supprimer la demande
                    </button>
                  </div>
                </footer>
              </div>
            </div>
            {/* Deuxième demande d'accueil */}
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">
                    Statut: <span className="tag is-warning">En cours</span>
                  </p>
                  <p className="subtitle is-6">Du 15/06/2025 au 30/06/2025</p>
                  <div className="content">
                    <p>
                      Disponible pour garder un chat pendant deux semaines en
                      juin.
                    </p>
                    <p className="is-size-7">
                      ID Utilisateur: 1 | ID Animal: 102
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
