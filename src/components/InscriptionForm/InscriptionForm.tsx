/*
  Ce composant utilise :
  - React Hook Form (RHF) pour la gestion des formulaires, la validation, le contrôle des champs et la gestion de l'état du formulaire.
  - Zod pour la validation des schémas côté front, ce qui permet d'avoir une validation déclarative, réutilisable et typée.

  Fonctionnement :
  - Deux schémas Zod sont définis (userCreateSchema et associationCreateSchema) et typés avec z.infer pour garantir la cohérence des types.
  - Deux hooks useForm sont utilisés, un pour chaque type d'utilisateur (bénévole ou association), chacun avec son schéma et ses valeurs par défaut.
  - Lors du switch de type d'utilisateur, le bon formulaire et le bon schéma sont utilisés dynamiquement.
  - La validation du mot de passe, de la confirmation et des autres champs est gérée directement dans le schéma Zod.
  - Les erreurs de validation côté front sont affichées instantanément sous chaque champ.
  - Les erreurs serveur (retournées par l'API, via Zod côté back) sont mappées sur les champs du formulaire grâce à setError, ou affichées globalement si pas de champ précis.
  - Les valeurs par défaut sont typées pour garantir la sécurité et l'autocomplétion.

  On peut modifier la validation, il suffit d'adapter le schéma Zod.
  Lien de la documentation utilisées: https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/#heading-getting-started.
*/

import React, { useState } from 'react';
import './InscriptionForm.scss';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema, UserFormData } from '../../schemas/userSchema';
import {
  associationCreateSchema,
  AssociationFormData,
} from '../../schemas/associationSchema';
import { API_URL } from '../../config';

// Valeurs par défaut pour le formulaire bénévole, typées pour garantir la sécurité
const defaultUserValues: UserFormData = {
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirmPassword: '',
  address: '',
  zip_code: '',
  city: '',
  phone_number: '',
  is_admin: false,
};

// Valeurs par défaut pour le formulaire association,
const defaultAssociationValues: AssociationFormData = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  address: '',
  zip_code: '',
  city: '',
  phone_number: '',
  description:
    'À compléter dans votre profil, faite une description de votre association, des valeurs, des missions, etc. pour que nos bénévoles sachent qui vous êtes et ce que vous faites.',
  logo: '/src/assets/logo-assos-provisoire.png',
};

export default function InscriptionForm() {
  // State pour gérer le type d'utilisateur sélectionné et les messages globaux
  const [userType, setUserType] = useState<'benevole' | 'association'>(
    'benevole',
  );
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // React Hook Form pour le formulaire bénévole, avec validation Zod et valeurs par défaut typées
  const userForm = useForm<UserFormData>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: defaultUserValues,
    mode: 'onBlur',
  });
  // RHF pour les associations
  const associationForm = useForm<AssociationFormData>({
    resolver: zodResolver(associationCreateSchema),
    defaultValues: defaultAssociationValues,
    mode: 'onBlur',
  });

  // Soumission bénévole : envoie les données à l'API, gère les erreurs serveur et les mappe sur les champs si besoin
  const onSubmitUser: Parameters<typeof userForm.handleSubmit>[0] = async (
    data,
  ) => {
    setSuccessMessage('');
    setServerError('');
    try {
      // On retire confirmPassword du payload envoyé à l'API
      const { confirmPassword, ...payload } = data;
      const response = await axios.post(`${API_URL}/users`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201) {
        setSuccessMessage('Inscription réussie ! Bienvenue parmi nous.');
        userForm.reset();
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (Array.isArray(data.issues) && data.issues.length > 0) {
          // On mappe chaque erreur serveur sur le champ concerné (si possible)
          for (const issue of data.issues) {
            if (issue.path && issue.path.length > 0) {
              userForm.setError(issue.path[0], {
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

  // Soumission association
  const onSubmitAssociation: Parameters<
    typeof associationForm.handleSubmit
  >[0] = async (data) => {
    setSuccessMessage('');
    setServerError('');
    try {
      const { confirmPassword, ...payload } = data;
      const response = await axios.post(`${API_URL}/associations`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201) {
        setSuccessMessage(
          'Inscription association réussie ! Vous pouvez compléter votre profil plus tard.',
        );
        associationForm.reset();
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

  // Gestion du switch de type d'utilisateur : réinitialise le bon formulaire et les messages globaux
  const handleSwitch = (type: 'benevole' | 'association') => {
    setUserType(type);
    setSuccessMessage('');
    setServerError('');
    if (type === 'benevole') {
      userForm.reset(defaultUserValues);
    } else {
      associationForm.reset(defaultAssociationValues);
    }
  };

  return (
    <div className="inscription-container">
      <div className="form-card">
        {/* Logo de l'application */}
        <div className="logo-inscription">
          <img src="/src/assets/logo.png" alt="Logo Fetch Me Home" />
        </div>

        <h2>Bienvenue parmi nous !</h2>

        {/* Sélecteur de type d'utilisateur */}
        <div className="user-type-toggle">
          <button
            className={`toggle-btn${userType === 'benevole' ? ' active' : ''}`}
            onClick={() => handleSwitch('benevole')}
            type="button"
          >
            BENEVOLE
          </button>
          <button
            className={`toggle-btn${userType === 'association' ? ' active' : ''}`}
            onClick={() => handleSwitch('association')}
            type="button"
          >
            ASSOCIATION
          </button>
        </div>

        {/* Affichage dynamique du bon formulaire selon le type d'utilisateur */}
        {userType === 'benevole' ? (
          <form onSubmit={userForm.handleSubmit(onSubmitUser)} noValidate>
            <div className="form-grid">
              {/* Champs RHF + Zod pour bénévole */}
              <div className="form-group">
                <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  className="form-input"
                  id="lastname"
                  {...userForm.register('last_name')}
                />
                {userForm.formState.errors.last_name && (
                  <span className="form-error">
                    {userForm.formState.errors.last_name.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  className="form-input"
                  id="firstname"
                  {...userForm.register('first_name')}
                />
                {userForm.formState.errors.first_name && (
                  <span className="form-error">
                    {userForm.formState.errors.first_name.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-input"
                  id="email"
                  {...userForm.register('email')}
                />
                {userForm.formState.errors.email && (
                  <span className="form-error">
                    {userForm.formState.errors.email.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  className="form-input"
                  id="phone"
                  {...userForm.register('phone_number')}
                />
                {userForm.formState.errors.phone_number && (
                  <span className="form-error">
                    {userForm.formState.errors.phone_number.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  className="form-input"
                  id="address"
                  {...userForm.register('address')}
                />
                {userForm.formState.errors.address && (
                  <span className="form-error">
                    {userForm.formState.errors.address.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="postal">Code postal</label>
                <input
                  type="text"
                  className="form-input"
                  id="postal"
                  {...userForm.register('zip_code')}
                />
                {userForm.formState.errors.zip_code && (
                  <span className="form-error">
                    {userForm.formState.errors.zip_code.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  className="form-input"
                  id="city"
                  {...userForm.register('city')}
                />
                {userForm.formState.errors.city && (
                  <span className="form-error">
                    {userForm.formState.errors.city.message as string}
                  </span>
                )}
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  {...userForm.register('password')}
                />
                <small className="password-hint">
                  Le mot de passe doit contenir entre 6 et 20 caractères dont au
                  moins : 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère
                  spécial parmi +=#[]?!@$%^&*()-]
                </small>
                {userForm.formState.errors.password && (
                  <span className="form-error">
                    {userForm.formState.errors.password.message as string}
                  </span>
                )}
              </div>
              <div className="form-group password-group">
                <label htmlFor="confirm-password">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="confirm-password"
                  {...userForm.register('confirmPassword')}
                />
                {userForm.formState.errors.confirmPassword && (
                  <span className="form-error">
                    {
                      userForm.formState.errors.confirmPassword
                        .message as string
                    }
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`submit-btn`}
              disabled={userForm.formState.isSubmitting}
            >
              S'inscrire
            </button>
            <p className="terms">
              En vous inscrivant, vous acceptez nos{' '}
              <NavLink to="/mentions-legales#mentions-legales">
                mentions légales
              </NavLink>
            </p>
            {successMessage && (
              <div className="form-success">{successMessage}</div>
            )}
            {serverError && <div className="form-error">{serverError}</div>}
          </form>
        ) : (
          <form
            onSubmit={associationForm.handleSubmit(onSubmitAssociation)}
            noValidate
          >
            <div className="form-grid">
              {/* Champs RHF + Zod pour association */}
              <div className="form-group">
                <label htmlFor="name">Nom de l'association</label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  {...associationForm.register('name')}
                />
                {associationForm.formState.errors.name && (
                  <span className="form-error">
                    {associationForm.formState.errors.name.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-input"
                  id="email"
                  {...associationForm.register('email')}
                />
                {associationForm.formState.errors.email && (
                  <span className="form-error">
                    {associationForm.formState.errors.email.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  className="form-input"
                  id="address"
                  {...associationForm.register('address')}
                />
                {associationForm.formState.errors.address && (
                  <span className="form-error">
                    {associationForm.formState.errors.address.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="zip_code">Code postal</label>
                <input
                  type="text"
                  className="form-input"
                  id="zip_code"
                  {...associationForm.register('zip_code')}
                />
                {associationForm.formState.errors.zip_code && (
                  <span className="form-error">
                    {
                      associationForm.formState.errors.zip_code
                        .message as string
                    }
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  className="form-input"
                  id="city"
                  {...associationForm.register('city')}
                />
                {associationForm.formState.errors.city && (
                  <span className="form-error">
                    {associationForm.formState.errors.city.message as string}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Téléphone</label>
                <input
                  type="tel"
                  className="form-input"
                  id="phone_number"
                  {...associationForm.register('phone_number')}
                />
                {associationForm.formState.errors.phone_number && (
                  <span className="form-error">
                    {
                      associationForm.formState.errors.phone_number
                        .message as string
                    }
                  </span>
                )}
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  {...associationForm.register('password')}
                />
                <small className="password-hint">
                  Le mot de passe doit contenir au moins : 1 minuscule, 1
                  majuscule, 1 chiffre, 1 caractère spécial parmi
                  +=#[]?!@$%^&*()-]
                </small>
                {associationForm.formState.errors.password && (
                  <span className="form-error">
                    {
                      associationForm.formState.errors.password
                        .message as string
                    }
                  </span>
                )}
              </div>
              <div className="form-group password-group">
                <label htmlFor="confirm-password">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="confirm-password"
                  {...associationForm.register('confirmPassword')}
                />
                {associationForm.formState.errors.confirmPassword && (
                  <span className="form-error">
                    {
                      associationForm.formState.errors.confirmPassword
                        .message as string
                    }
                  </span>
                )}
              </div>
              <div className="form-group">
                <small className="info-hint">
                  Le logo et la description pourront être ajoutés plus tard dans
                  votre profil. Un logo provisoire sera utilisé pour l'instant.
                </small>
              </div>
            </div>
            <button
              type="submit"
              className={`submit-btn association-submit`}
              disabled={associationForm.formState.isSubmitting}
            >
              S'inscrire
            </button>
            <p className="terms">
              En vous inscrivant, vous acceptez nos{' '}
              <NavLink to="/mentions-legales#mentions-legales">
                mentions légales
              </NavLink>
            </p>
            {successMessage && (
              <div className="form-success">{successMessage}</div>
            )}
            {serverError && <div className="form-error">{serverError}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
