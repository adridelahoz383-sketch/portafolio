import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/proyectos', label: t.nav.projects },
    { to: '/sobre-mi', label: t.nav.about },
    { to: '/contacto', label: t.nav.contact },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner glass">
        <Link to="/" className="brand" aria-label="Adrián De La Hoz — inicio">
          <span className="brand-mark" aria-hidden="true">AD</span>
          <span className="brand-name">Adrián De La Hoz</span>
        </Link>

        <nav aria-label={t.nav.menu} className={`main-nav ${open ? 'is-open' : ''}`} id="main-nav">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label={t.nav.lang}>
            {['es', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                className={lang === code ? 'active' : ''}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
