import { Link } from 'react-router-dom';
import CategoryWheel from '../components/CategoryWheel.jsx';
import Icon from '../components/Icon.jsx';
import { ProjectActions, ProjectCard, ProjectVisual, StatusBadge } from '../components/ProjectBits.jsx';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Home() {
  const { t, lang } = useLang();
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured && p.image).slice(0, 3);
  const f = featured[lang];

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="lead">{t.home.lead}</p>
          <div className="actions">
            <Link to="/proyectos" className="btn btn-primary">
              {t.home.ctaProjects} <Icon name="arrow" size={16} />
            </Link>
            <Link to="/contacto" className="btn">
              {t.home.ctaContact}
            </Link>
          </div>
          <ul className="social social-inline">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" /> {profile.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="hero-wheel">
          <h2 className="visually-hidden">{t.home.wheelTitle}</h2>
          <CategoryWheel />
        </div>
      </section>

      <section className="container section" aria-labelledby="featured-title">
        <div className="section-head">
          <p className="eyebrow">
            <Icon name="star" size={14} filled /> {t.home.featured}
          </p>
        </div>
        <article className="featured glass">
          <ProjectVisual project={featured} large />
          <div className="featured-body">
            <div className="card-meta">
              <span className="chip tone-lavender">{t.cats.games.name}</span>
              <StatusBadge status={featured.verification.status} />
              {featured.team && <span className="chip">{t.detail.team}</span>}
            </div>
            <h2 id="featured-title">{featured.name}</h2>
            <p className="lead">{f.summary}</p>
            <ul className="checklist">
              {f.features.slice(0, 3).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="actions">
              <Link to={`/proyectos/${featured.slug}`} className="btn btn-primary">
                {t.projects.details} <Icon name="arrow" size={16} />
              </Link>
              <ProjectActions project={featured} compact />
            </div>
          </div>
        </article>
      </section>

      <section className="container section" aria-labelledby="more-title">
        <div className="section-head row">
          <h2 id="more-title">{t.home.more}</h2>
          <Link to="/proyectos" className="text-link">
            {t.home.viewAll} <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="grid">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
