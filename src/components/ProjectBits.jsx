import { Link } from 'react-router-dom';
import { categoryById } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

export function StatusBadge({ status }) {
  const { t } = useLang();
  return <span className={`status status-${status}`}>{t.status[status]}</span>;
}

// Imagen real si existe; si no, una composición tipográfica que no se confunde con una captura.
export function ProjectVisual({ project, large = false }) {
  const { t } = useLang();
  const cat = categoryById(project.category);
  if (project.image) {
    return (
      <div className={`visual ${large ? 'visual-large' : ''}`}>
        <img
          src={project.image}
          alt={`${t.detail.gallery}: ${project.displayName ?? project.name}`}
          loading={large ? 'eager' : 'lazy'}
          width="1280"
          height="800"
        />
      </div>
    );
  }
  return (
    <div className={`visual visual-placeholder tone-${cat.color} ${large ? 'visual-large' : ''}`} role="img" aria-label={`${project.name} — ${t.projects.noImage}`}>
      <span className="ph-name">{project.name}</span>
      <span className="ph-note">
        <Icon name={cat.icon} size={16} /> {t.projects.noImage}
      </span>
    </div>
  );
}

// Acciones reales del proyecto: nunca se muestra un botón sin destino.
export function ProjectActions({ project, compact = false }) {
  const { t } = useLang();
  return (
    <div className="actions">
      {project.demo && (
        <a className="btn btn-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
          <Icon name="play" size={16} /> {t.projects.demo}
        </a>
      )}
      {project.video && (
        <a className="btn" href={project.video} target="_blank" rel="noopener noreferrer">
          <Icon name="play" size={16} /> {t.projects.video}
        </a>
      )}
      {project.repo && (
        <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">
          <Icon name="github" size={16} /> {t.projects.code}
        </a>
      )}
      {!compact && (
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            const target = document.getElementById('como-ejecutar');
            target?.scrollIntoView({ behavior: 'smooth' });
            target?.focus({ preventScroll: true });
          }}
        >
          <Icon name="terminal" size={16} /> {t.projects.howTo}
        </button>
      )}
    </div>
  );
}

export function ProjectCard({ project }) {
  const { t, lang } = useLang();
  const text = project[lang];
  const cat = categoryById(project.category);
  return (
    <article className={`project-card glass tone-${cat.color}`}>
      <ProjectVisual project={project} />
      <div className="project-card-body">
        <div className="card-meta">
          <span className={`chip tone-${cat.color}`}>
            <Icon name={cat.icon} size={14} /> {t.cats[project.category].name}
          </span>
          <StatusBadge status={project.verification.status} />
        </div>
        <h3>
          <Link to={`/proyectos/${project.slug}`} className="stretched">
            {project.name}
          </Link>
        </h3>
        <p>{text.tagline}</p>
        <ul className="tags" aria-label={t.detail.tech}>
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {project.tech.length > 4 && <li>+{project.tech.length - 4}</li>}
        </ul>
        <div className="card-foot">
          <span className="more">
            {t.projects.details} <Icon name="arrow" size={16} />
          </span>
          {project.repo && (
            <a className="icon-link" href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.code}: ${project.name}`}>
              <Icon name="github" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
