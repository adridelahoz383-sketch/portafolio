import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import PolygonBackground from './components/PolygonBackground.jsx';
import { LanguageProvider, useLang } from './i18n/LanguageContext.jsx';
import About from './pages/About.jsx';
import Category from './pages/Category.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Projects from './pages/Projects.jsx';
import './styles/global.css';

// Al cambiar de ruta: volver arriba y mover el foco al contenido principal.
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

function Layout() {
  const { t } = useLang();
  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        {t.skip}
      </a>
      <PolygonBackground />
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="proyectos" element={<Projects />} />
            <Route path="proyectos/:slug" element={<ProjectDetail />} />
            <Route path="categoria/:slug" element={<Category />} />
            <Route path="sobre-mi" element={<About />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  </StrictMode>,
);
