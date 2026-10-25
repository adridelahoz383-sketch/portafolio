import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ProjectCard } from '../components/ProjectBits.jsx';
import { CATEGORIES, projects } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Projects() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const requested = params.get('cat');
  const filter = CATEGORIES.some((c) => c.id === requested) ? requested : 'all';
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const options = [{ id: 'all', label: t.projects.all }, ...CATEGORIES.map((c) => ({ id: c.id, label: t.cats[c.id].name, icon: c.icon, color: c.color }))];

  return (
    <section className="container page">
      <header className="page-head">
        <h1>{t.projects.title}</h1>
        <p className="lead">{t.projects.lead}</p>
      </header>

      <div className="filters" role="group" aria-label={t.projects.filter}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`filter ${o.color ? `tone-${o.color}` : ''}`}
            aria-pressed={filter === o.id}
            onClick={() => setParams(o.id === 'all' ? {} : { cat: o.id }, { replace: true })}
          >
            {o.icon && <Icon name={o.icon} size={16} />} {o.label}
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {t.projects.count(list.length)}
      </p>

      {list.length ? (
        <div className="grid">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p>{t.projects.empty}</p>
      )}
    </section>
  );
}
