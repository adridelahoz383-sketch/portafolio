import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ProjectCard } from '../components/ProjectBits.jsx';
import { byCategory, CATEGORIES, categoryBySlug } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import NotFound from './NotFound.jsx';

export default function Category() {
  const { slug } = useParams();
  const { t } = useLang();
  const cat = categoryBySlug(slug);
  if (!cat) return <NotFound />;

  const list = byCategory(cat.id).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const others = CATEGORIES.filter((c) => c.id !== cat.id);

  return (
    <section className="container page">
      <Link to="/proyectos" className="text-link back">
        <Icon name="back" size={16} /> {t.category.back}
      </Link>
      <header className={`category-hero glass tone-${cat.color}`}>
        <span className="category-icon">
          <Icon name={cat.icon} size={40} />
        </span>
        <div>
          <h1>{t.cats[cat.id].name}</h1>
          <p className="lead">{t.cats[cat.id].desc}</p>
          <p className="result-count">{t.projects.count(list.length)}</p>
        </div>
      </header>

      <div className="grid">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <nav className="other-cats" aria-label={t.category.others}>
        <h2>{t.category.others}</h2>
        <ul>
          {others.map((c) => (
            <li key={c.id}>
              <Link to={`/categoria/${c.slug}`} className={`cat-card glass tone-${c.color}`}>
                <span className="cat-card-icon">
                  <Icon name={c.icon} size={24} />
                </span>
                <span>
                  <strong>{t.cats[c.id].name}</strong>
                  <small>{t.cats[c.id].desc}</small>
                </span>
                <Icon name="arrow" className="cat-card-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
