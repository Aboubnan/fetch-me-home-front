import Layout from './components/Layout/Layout';
import InscriptionForm from './components/InscriptionForm/InscriptionForm';
import Contact from './components/Contact_FAQ/Contact/Contact';
import AssociationAnimals from './components/AssociationAnimals/AssociationAnimals';
import BenevoleProfile from './components/Dashboard/BenevoleDashBoard/BenevoleProfile';
import AssociationDashboard from './components/Dashboard/AssociationDashboard/AssociationDashboard';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import UnauthorizedPage from './components/Unauthorized/Unauthorized';
import LegalMentions from './components/Info/LegalMentions';
import { Routes, Route } from 'react-router-dom';
import Carousel from './components/Carousel/Carousel';
import Associations from './components/Associations/Associations';
import AnimalsPage from './components/AnimalsPage/AnimalsPage';
import AssociationDetails from './components/DetailsAssociation/DetailsAssociation';
import AnimalDetails from './components/AnimalDetails/AnimalDetails';
import ConnexionForm from './components/ConnexionForm/ConnexionForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Carousel />} />
          <Route path="associations" element={<Associations />} />
          <Route path="pets" element={<AnimalsPage />} />
          <Route path="associations/:id" element={<AssociationDetails />} />
          <Route
            path="/associations/:id/animals"
            element={<AssociationAnimals />}
          />
          <Route path="pets/:id" element={<AnimalDetails />} />
          <Route path="inscription" element={<InscriptionForm />} />
          <Route path="login" element={<ConnexionForm />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<LegalMentions />} />

          {/* Routes protégées par rôle */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            {/* <Route path="/dashboard-admin" element={<AdminDasboard />} /> */}
          </Route>

          <Route element={<ProtectedRoute requiredRole="benevole" />}>
            <Route path="/dashboard-benevole" element={<BenevoleProfile />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="association" />}>
            <Route
              path="/dashboard-association"
              element={<AssociationDashboard />}
            />
          </Route>

          {/* Route 404 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
