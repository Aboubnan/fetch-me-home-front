import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

function Layout() {
  const location = useLocation();

  // Cacher le Header uniquement sur la page /login, /connexion, /profile
  const hideHeader = [
    '/login',
    '/connexion',
    '/profile',
    '/association-profile',
  ].includes(location.pathname);

  // Déterminer dynamiquement le titre selon la route
  const getTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Un accueil qui libère';
      case '/pets':
        return 'Adoption';
      case '/associations':
        return 'Association';
      case '/contact':
        return 'Contact';
      case '/faq':
        return 'FAQ';
      default:
        return 'Un accueil qui libère';
    }
  };

  const title = getTitle(location.pathname);

  return (
    <>
      <Navbar />
      {!hideHeader && <Header title={title} />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
