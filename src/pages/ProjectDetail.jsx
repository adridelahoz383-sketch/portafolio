import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ProjectActions, ProjectVisual, StatusBadge } from '../components/ProjectBits.jsx';
import { categoryById, getProject } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import NotFound from './NotFound.jsx';

function List({ items, className = '' }) {
  return (
    <ul className={className}>
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const project = getProject(slug);
  if (!project) return <NotFound message={t.detail.notFound} />;

  const text = project[lang];
  const cat = categoryById(project.category);
  const v = project.verification;

  return (
    <article className={`container page detail ${project.featured ? 'detail-featured' : ''}`}>
      <Link to="/proyectos" className="text-link back">
        <Icon name="back" size={16} /> {t.detail.back}
      </Link>

      <header className={`detail-head glass tone-${cat.color}`}>
        <div className="detail-head-copy">
          <div className="card-meta">
            <Link to={`/categoria/${cat.slug}`} className={`chip tone-${cat.color}`}>
              <Icon name={cat.icon} size={14} /> {t.cats[project.category].name}
            </Link>
            <StatusBadge status={v.status} />
            {project.team && <span className="chip">{t.detail.team}</span>}
          </div>
          <h1>{project.name}</h1>
          {(project.displayName || project.repoName) && (
            <p className="aka">
              {t.projects.repoAs}: <code>{project.repoName ?? project.displayName}</code>
            </p>
          )}
          <p className="lead">{text.summary}</p>
          <ProjectActions project={project} />
          {!project.demo && <p className="note">{t.detail.noDemo}</p>}
        </div>
        <ProjectVisual project={project} large />
      </header>

      {project.gallery?.length > 0 && (
        <section className="gallery" aria-label={t.detail.gallery}>
          {project.gallery.map((src) => (
            <figure key={src} className="glass">
              <img src={src} alt={`${t.detail.gallery}: ${project.name}`} loading="lazy" />
            </figure>
          ))}
        </section>
      )}

      <div className="detail-grid">
        <div className="detail-main">
          <section className="panel glass">
            <h2>{t.detail.purpose}</h2>
            <p>{text.purpose}</p>
          </section>

          <section className="panel glass">
            <h2>{t.detail.features}</h2>
            <List items={text.features} className="checklist" />
          </section>

          {(text.contribution.length > 0 || text.contributionNote) && (
            <section className="panel glass">
              <h2>{t.detail.contribution}</h2>
              {text.contribution.length > 0 && <List items={text.contribution} className="bullets" />}
              {text.contributionNote && <p className="note">{text.contributionNote}</p>}
            </section>
          )}

          {text.challenges.length > 0 && (
            <section className="panel glass">
              <h2>{t.detail.challenges}</h2>
              <List items={text.challenges} className="bullets" />
            </section>
          )}

          <section className="panel glass" id="como-ejecutar" tabIndex={-1}>
            <h2>{t.detail.run}</h2>
            <ol className="steps">
              {text.run.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="detail-side">
          <section className="panel glass">
            <h2>{t.detail.tech}</h2>
            <ul className="tags">
              {project.tech.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="panel glass">
            <h2>{t.detail.verification}</h2>
            <p className="verify-head">
              <StatusBadge status={v.status} />
              <small>
                {t.detail.checkedOn} {new Date(v.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { dateStyle: 'long' })}
              </small>
            </p>
            <ul className="checks">
              {v.checks.map((c) => (
                <li key={c.es} className={`check check-${c.status}`}>
                  <StatusBadge status={c.status} />
                  <span>{c[lang]}</span>
                </li>
              ))}
            </ul>
          </section>

          {text.pending.length > 0 && (
            <section className="panel glass">
              <h2>{t.detail.pending}</h2>
              <List items={text.pending} className="bullets muted" />
            </section>
          )}

          <section className="panel glass">
            <h2>{t.detail.links}</h2>
            <ul className="link-list">
              {project.repo && (
                <li>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" size={16} /> {project.repo.replace('https://', '')} <Icon name="external" size={14} />
                  </a>
                </li>
              )}
              {project.demo && (
                <li>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Icon name="play" size={16} /> {t.projects.demo} <Icon name="external" size={14} />
                  </a>
                </li>
              )}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}
