import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { profile } from '../data/profile.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function About() {
  const { t, lang } = useLang();
  return (
    <section className="container page about">
      <header className="page-head">
        <h1>{t.about.title}</h1>
        <p className="lead">{t.about.lead}</p>
      </header>

      <div className="about-grid">
        <div className="panel glass about-body">
          <h2 className="visually-hidden">{profile.name}</h2>
          <p className="about-name">{profile.name}</p>
          <p className="muted">
            <Icon name="pin" size={16} /> {profile.location}
          </p>
          {t.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="actions">
            <Link to="/proyectos" className="btn btn-primary">
              {t.home.ctaProjects} <Icon name="arrow" size={16} />
            </Link>
            <Link to="/contacto" className="btn">
              {t.home.ctaContact}
            </Link>
          </div>
        </div>

        <div className="about-side">
          <section className="panel glass">
            <h2>{t.about.education}</h2>
            <ul className="timeline">
              {profile.education.map((e) => (
                <li key={e.es.title}>
                  <strong>{e[lang].title}</strong>
                  <span>{e[lang].place}</span>
                  <small>{e[lang].period}</small>
                </li>
              ))}
            </ul>
          </section>
          <section className="panel glass">
            <h2>{t.about.skills}</h2>
            <ul className="tags">
              {profile.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section className="panel glass">
            <h2>{t.about.languages}</h2>
            <ul className="bullets">
              {profile.languages[lang].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
