import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';
import './BenevoleProfile.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateSchema } from '../../../schemas/userSchema';
import type { UserUpdateFormData } from '../../../schemas/userSchema';

function VolunteerDashboard() {
  const [requests, setRequests] = useState([]);
  const [volunteer, setVolunteer] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const token = sessionStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  // Récupération de l'id depuis sessionStorage
  const storedUser = sessionStorage.getItem('userData');
  const parsedUser =
    storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id;

  const userForm = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: async () => {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers,
      });
      setVolunteer(response.data);
      return {
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        password: '',
        confirmPassword: '',
        address: response.data.address,
        zip_code: response.data.zip_code,
        city: response.data.city,
        phone_number: response.data.phone_number,
        is_admin: response.data.is_admin,
      };
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/myProfile/requests`, {
          headers,
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des demandes', err);
      }
    };
    fetchRequests();
  }, []);

  const handleDeleteRequest = async (requestId: number) => {
    const confirmDelete = window.confirm(
      'Es-tu sûr de vouloir supprimer cette demande ?',
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/requests/${requestId}`, { headers });
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {
      console.error('Erreur suppression demande :', err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Es-tu sûr de vouloir supprimer ton compte ?',
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/users/${userId}`, { headers });
      sessionStorage.clear();
      alert('Compte supprimé avec succès. À bientôt !');

      window.location.href = '/';
    } catch (err) {
      console.error('Erreur suppression compte :', err);
    }
  };

  const onSubmit = async (data: UserUpdateFormData) => {
    setSuccessMessage('');
    setServerError('');
    try {
      const res = await axios.put(`${API_URL}/users/${userId}`, data, {
        headers,
      });
      if (res.status === 200) {
        setSuccessMessage('Profil mis à jour avec succès !');
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Erreur serveur');
    }
  };

  return (
    <main className="volunteer-dashboard">
      <h1>Bienvenue {volunteer?.first_name} 👋</h1>

      <section className="requests-section">
        <h2>Mes demandes d’adoption</h2>
        {requests.length === 0 ? (
          <p>Vous n’avez encore fait aucune demande.</p>
        ) : (
          <ul className="request-list">
            {requests.map((req) => (
              <li
                key={req.id}
                className={`request-card status-${req.status.toLowerCase()}`}
              >
                <p>
                  <strong>Animal :</strong> {req.pet.name}
                </p>
                <p>
                  <strong>Début :</strong> {req.starting_date}
                </p>
                <p>
                  <strong>Fin :</strong> {req.ending_date}
                </p>
                <p>
                  <strong>Statut :</strong> {req.status}
                </p>
                <p>
                  <strong>Réponse :</strong> {req.response || 'En attente...'}
                </p>
                <div className="actions">
                  <button>Modifier</button>
                  <button onClick={() => handleDeleteRequest(req.id)}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="profile-section">
        <h2>Mon profil</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {serverError && <p className="error-message">{serverError}</p>}
        <form onSubmit={userForm.handleSubmit(onSubmit)}>
          <input {...userForm.register('first_name')} placeholder="Prénom" />
          <input {...userForm.register('last_name')} placeholder="Nom" />
          <input
            {...userForm.register('email')}
            placeholder="Email"
            type="email"
          />
          <input
            {...userForm.register('password')}
            placeholder="Mot de passe"
            type="password"
          />
          <input
            {...userForm.register('confirmPassword')}
            placeholder="Confirmer le mot de passe"
            type="password"
          />
          <input {...userForm.register('address')} placeholder="Adresse" />
          <input {...userForm.register('zip_code')} placeholder="Code postal" />
          <input {...userForm.register('city')} placeholder="Ville" />
          <input
            {...userForm.register('phone_number')}
            placeholder="Téléphone"
          />
          <button type="submit">Mettre à jour le profil</button>
        </form>
        <button className="delete-account" onClick={handleDeleteAccount}>
          Supprimer mon compte
        </button>
      </section>
    </main>
  );
}

export default VolunteerDashboard;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../../config';
// import './BenevoleProfile.scss';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { userUpdateSchema } from '../../../schemas/userSchema';
// import type { UserUpdateFormData } from '../../../schemas/userSchema';

// function VolunteerDashboard() {
//   const [requests, setRequests] = useState([]);
//   const [volunteer, setVolunteer] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [serverError, setServerError] = useState('');

//   const token = sessionStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const userForm = useForm<UserUpdateFormData>({
//     resolver: zodResolver(userUpdateSchema),
//     defaultValues: async () => {
//       const response = await axios.get(`${API_URL}/myProfile`, { headers });
//       setVolunteer(response.data);
//       return {
//         email: response.data.email,
//         first_name: response.data.firstname,
//         last_name: response.data.lastname,
//         password: '',
//         confirmPassword: '',
//         address: response.data.address,
//         zip_code: response.data.zip_code,
//         city: response.data.city,
//         phone_number: response.data.phone_number,
//         is_admin: response.data.is_admin,
//       };
//     },
//     mode: 'onBlur',
//   });

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/myProfile/requests`, {
//           headers,
//         });
//         setRequests(res.data);
//       } catch (err) {
//         console.error('Erreur lors du chargement des demandes', err);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleDeleteRequest = async (requestId: number) => {
//     const confirmDelete = window.confirm(
//       'Es-tu sûr de vouloir supprimer cette demande ?',
//     );
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(`${API_URL}/requests/${requestId}`, { headers });
//       setRequests((prev) => prev.filter((req) => req.id !== requestId));
//     } catch (err) {
//       console.error('Erreur suppression demande :', err);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirmDelete = window.confirm(
//       'Es-tu sûr de vouloir supprimer ton compte ?',
//     );
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(`${API_URL}/users/me`, { headers });
//       sessionStorage.clear();
//       window.location.href = '/';
//     } catch (err) {
//       console.error('Erreur suppression compte :', err);
//     }
//   };

//   const onSubmit = async (data: UserUpdateFormData) => {
//     setSuccessMessage('');
//     setServerError('');
//     try {
//       const res = await axios.put(`${API_URL}/users/me`, data, { headers });
//       if (res.status === 200) {
//         setSuccessMessage('Profil mis à jour avec succès !');
//       }
//     } catch (err: any) {
//       setServerError(err.response?.data?.message || 'Erreur serveur');
//     }
//   };

//   return (
//     <main className="volunteer-dashboard">
//       <h1>Bienvenue {volunteer?.firstname} 👋</h1>

//       <section className="requests-section">
//         <h2>Mes demandes d’adoption</h2>
//         {requests.length === 0 ? (
//           <p>Vous n’avez encore fait aucune demande.</p>
//         ) : (
//           <ul className="request-list">
//             {requests.map((req) => (
//               <li
//                 key={req.id}
//                 className={`request-card status-${req.status.toLowerCase()}`}
//               >
//                 <p>
//                   <strong>Animal :</strong> {req.pet.name}
//                 </p>
//                 <p>
//                   <strong>Début :</strong> {req.starting_date}
//                 </p>
//                 <p>
//                   <strong>Fin :</strong> {req.ending_date}
//                 </p>
//                 <p>
//                   <strong>Statut :</strong> {req.status}
//                 </p>
//                 <p>
//                   <strong>Réponse :</strong> {req.response || 'En attente...'}
//                 </p>
//                 <div className="actions">
//                   <button>Modifier</button>
//                   <button onClick={() => handleDeleteRequest(req.id)}>
//                     Supprimer
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <section className="profile-section">
//         <h2>Mon profil</h2>

//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {serverError && <p className="error-message">{serverError}</p>}

//         <form onSubmit={userForm.handleSubmit(onSubmit)}>
//           <input {...userForm.register('first_name')} placeholder="Prénom" />
//           <input {...userForm.register('last_name')} placeholder="Nom" />
//           <input
//             {...userForm.register('email')}
//             placeholder="Email"
//             type="email"
//           />
//           <input
//             {...userForm.register('password')}
//             placeholder="Mot de passe"
//             type="password"
//           />
//           <input
//             {...userForm.register('confirmPassword')}
//             placeholder="Confirmer le mot de passe"
//             type="password"
//           />
//           <input {...userForm.register('address')} placeholder="Adresse" />
//           <input {...userForm.register('zip_code')} placeholder="Code postal" />
//           <input {...userForm.register('city')} placeholder="Ville" />
//           <input
//             {...userForm.register('phone_number')}
//             placeholder="Téléphone"
//           />
//           <button type="submit">Mettre à jour le profil</button>
//         </form>

//         <button className="delete-account" onClick={handleDeleteAccount}>
//           Supprimer mon compte
//         </button>
//       </section>
//     </main>
//   );
// }

// export default VolunteerDashboard;
