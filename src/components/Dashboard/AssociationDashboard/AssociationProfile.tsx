import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { associationUpdateSchema } from '../../../schemas/associationSchema';
import type { AssociationUpdateFormData } from '../../../schemas/associationSchema';
import styles from '../dashboard.module.scss';
import axios from 'axios';

// Ce composant gère l'affichage, la validation, la soumission et les messages du formulaire

// Props attendues :
// - association : données du profil à afficher/éditer
// - onUpdate : callback appelé après une mise à jour réussie pour remonter les données mises à jour au parent, ici AssociationDashboard = maj state global assos

type Props = {
  association: AssociationUpdateFormData;
  onUpdate: (data: AssociationUpdateFormData) => void;
};

export default function AssociationProfile({ association, onUpdate }: Props) {
  // Message de succès après mise à jour
  const [successMessage, setSuccessMessage] = useState('');
  // Message d'erreur serveur
  const [serverError, setServerError] = useState('');
  // Aperçu du logo
  const [logoPreview, setLogoPreview] = useState(association.logo);

  // Initialisation du formulaire RHF + Zod
  const associationForm = useForm<AssociationUpdateFormData>({
    resolver: zodResolver(associationUpdateSchema),
    defaultValues: association,
    mode: 'onBlur',
  });
  // Fonction de soumission du formulaire
  const onSubmit = async (data: AssociationUpdateFormData) => {
    // On réinitialise les messages globaux avant de traiter la soumission
    setSuccessMessage('');
    setServerError('');
    try {
      const response = await axios.put(
        `http://localhost:3001/associations/1`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (response.status === 200) {
        setSuccessMessage('Profil association mis à jour avec succès !');
        associationForm.reset(data);
        onUpdate(data);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (Array.isArray(data.issues) && data.issues.length > 0) {
          for (const issue of data.issues) {
            if (issue.path && issue.path.length > 0) {
              associationForm.setError(issue.path[0], {
                type: 'server',
                message: issue.message,
              });
            } else {
              setServerError(issue.message);
            }
          }
        } else if (data.message) {
          setServerError(data.message);
        } else {
          setServerError('Erreur réseau ou serveur. Veuillez réessayer.');
        }
      } else {
        setServerError('Erreur réseau ou serveur. Veuillez réessayer.');
      }
    }
  };

  // Gestion de l'upload du logo :
  // - Affiche un aperçu local du logo sélectionné
  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={`${styles.bulmaScope} container`}>
      {/* Titre principal */}
      <h2 className="title is-3 has-text-centered">Profil Association</h2>
      <div className="columns">
        {/* Colonne Logo (aperçu + upload) */}
        <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
          <h3 className="title is-5 has-text-grey">Logo</h3>
          <figure className="image is-128x128">
            <img
              src={logoPreview}
              alt="Logo association"
              className="is-rounded"
            />
          </figure>
          <div className="file mt-2">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
              <span className="file-cta file is-primary file is-small">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Changer le logo</span>
              </span>
            </label>
          </div>
        </div>
        {/* Colonne Formulaire principal */}
        <div className="column is-two-thirds">
          <div className="box">
            {/* Affichage des messages globaux */}
            {successMessage && (
              <div className="notification is-success">{successMessage}</div>
            )}
            {serverError && (
              <div className="notification is-danger">{serverError}</div>
            )}
            {/* Formulaire d'édition du profil association */}
            <form onSubmit={associationForm.handleSubmit(onSubmit)}>
              {/* Nom de l'association */}
              <div className="field">
                <label className="label" htmlFor="name">
                  Nom de l'association
                </label>
                <div className="control">
                  <input
                    id="name"
                    className="input"
                    type="text"
                    {...associationForm.register('name')}
                  />
                </div>
                {associationForm.formState.errors.name && (
                  <p className="help is-danger">
                    {associationForm.formState.errors.name.message as string}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="field">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="control">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    {...associationForm.register('email')}
                  />
                </div>
                {associationForm.formState.errors.email && (
                  <p className="help is-danger">
                    {associationForm.formState.errors.email.message as string}
                  </p>
                )}
              </div>
              {/* Mot de passe et confirmation sur deux colonnes */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="password">
                      Mot de passe
                    </label>
                    <div className="control">
                      <input
                        id="password"
                        className="input"
                        type="password"
                        {...associationForm.register('password')}
                      />
                    </div>
                    <small className="help">
                      Le mot de passe doit contenir entre 6 et 20 caractères
                      dont au moins : 1 minuscule, 1 majuscule, 1 chiffre, 1
                      caractère spécial parmi +=#[]?!@$%^&*()-]
                    </small>
                    {associationForm.formState.errors.password && (
                      <p className="help is-danger">
                        {
                          associationForm.formState.errors.password
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="confirmPassword">
                      Confirmer le mot de passe
                    </label>
                    <div className="control">
                      <input
                        id="confirmPassword"
                        className="input"
                        type="password"
                        {...associationForm.register('confirmPassword')}
                      />
                    </div>
                    {associationForm.formState.errors.confirmPassword && (
                      <p className="help is-danger">
                        {
                          associationForm.formState.errors.confirmPassword
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Adresse */}
              <div className="field">
                <label className="label" htmlFor="address">
                  Adresse
                </label>
                <div className="control">
                  <input
                    id="address"
                    className="input"
                    type="text"
                    {...associationForm.register('address')}
                  />
                </div>
                {associationForm.formState.errors.address && (
                  <p className="help is-danger">
                    {associationForm.formState.errors.address.message as string}
                  </p>
                )}
              </div>
              {/* Code postal et Ville sur deux colonnes */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="zip_code">
                      Code Postal
                    </label>
                    <div className="control">
                      <input
                        id="zip_code"
                        className="input"
                        type="text"
                        {...associationForm.register('zip_code')}
                      />
                    </div>
                    {associationForm.formState.errors.zip_code && (
                      <p className="help is-danger">
                        {
                          associationForm.formState.errors.zip_code
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="city">
                      Ville
                    </label>
                    <div className="control">
                      <input
                        id="city"
                        className="input"
                        type="text"
                        {...associationForm.register('city')}
                      />
                    </div>
                    {associationForm.formState.errors.city && (
                      <p className="help is-danger">
                        {
                          associationForm.formState.errors.city
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Numéro de téléphone */}
              <div className="field">
                <label className="label" htmlFor="phone_number">
                  Numéro de téléphone
                </label>
                <div className="control">
                  <input
                    id="phone_number"
                    className="input"
                    type="tel"
                    {...associationForm.register('phone_number')}
                  />
                </div>
                {associationForm.formState.errors.phone_number && (
                  <p className="help is-danger">
                    {
                      associationForm.formState.errors.phone_number
                        .message as string
                    }
                  </p>
                )}
              </div>
              {/* Description de l'association */}
              <div className="field">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <div className="control">
                  <textarea
                    id="description"
                    className="textarea"
                    {...associationForm.register('description')}
                  />
                </div>
                {associationForm.formState.errors.description && (
                  <p className="help is-danger">
                    {
                      associationForm.formState.errors.description
                        .message as string
                    }
                  </p>
                )}
              </div>
              {/* Boutons d'action */}
              <div className="field mt-5">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary"
                    disabled={
                      associationForm.formState.isSubmitting ||
                      !associationForm.formState.isDirty ||
                      !associationForm.formState.isValid
                    }
                  >
                    Mettre à jour le profil
                  </button>
                  <button
                    type="button"
                    className="button is-light ml-2"
                    onClick={() => associationForm.reset()}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
