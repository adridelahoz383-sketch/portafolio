import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/projects.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

const C = 200;
const R_OUT = 192;
const R_IN = 82;
const SPAN = 116;
// Centro angular de cada sector (0° = derecha, sentido horario en coordenadas SVG).
const CENTERS = { games: -90, web: 30, java: 150 };
const SHORT = { games: 'Unity · C#', web: 'JS · React', java: 'Spring · MySQL' };

const rad = (deg) => (deg * Math.PI) / 180;
const polar = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))];

function sectorPath(start, end) {
  const [x1, y1] = polar(R_OUT, start);
  const [x2, y2] = polar(R_OUT, end);
  const [x3, y3] = polar(R_IN, end);
  const [x4, y4] = polar(R_IN, start);
  return `M${x1},${y1} A${R_OUT},${R_OUT} 0 0 1 ${x2},${y2} L${x3},${y3} A${R_IN},${R_IN} 0 0 0 ${x4},${y4} Z`;
}

export default function CategoryWheel() {
  const { t } = useLang();
  const [active, setActive] = useState(null);
  const current = active ? t.cats[active] : null;

  return (
    <div className="wheel-wrap">
      <svg className="wheel" viewBox="0 0 400 400" role="group" aria-label={t.home.wheelTitle}>
        <defs>
          <linearGradient id="g-lavender" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c3b8fb" />
            <stop offset="1" stopColor="#8f7cf0" />
          </linearGradient>
          <linearGradient id="g-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b5dafd" />
            <stop offset="1" stopColor="#5aa6ee" />
          </linearGradient>
          <linearGradient id="g-mint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b4f1e7" />
            <stop offset="1" stopColor="#3cc2b2" />
          </linearGradient>
        </defs>

        {CATEGORIES.map((cat) => {
          const mid = CENTERS[cat.id];
          const [lx, ly] = polar(138, mid);
          // Indicador de interacción en la esquina del sector, lejos del texto.
          const [ax, ay] = polar(166, mid + SPAN / 2 - 16);
          const [dx, dy] = [Math.cos(rad(mid)) * 8, Math.sin(rad(mid)) * 8];
          const label = t.cats[cat.id];
          return (
            <a
              key={cat.id}
              href={`#/categoria/${cat.slug}`}
              className={`sector sector-${cat.color} ${active === cat.id ? 'is-active' : ''}`}
              style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
              aria-label={`${label.name}: ${label.desc}`}
              onMouseEnter={() => setActive(cat.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(cat.id)}
              onBlur={() => setActive(null)}
            >
              <path className="sector-shape" d={sectorPath(mid - SPAN / 2, mid + SPAN / 2)} fill={`url(#g-${cat.color})`} />
              <Icon name={cat.icon} size={30} x={lx - 15} y={ly - 40} className="sector-icon" />
              <text x={lx} y={ly + 8} textAnchor="middle" className="sector-title">
                {label.name}
              </text>
              <text x={lx} y={ly + 26} textAnchor="middle" className="sector-sub">
                {SHORT[cat.id]}
              </text>
              <g className="sector-cue" transform={`translate(${ax} ${ay})`}>
                <circle r="11" />
                <path d="M-4 0h8M1-4l4 4-4 4" />
              </g>
            </a>
          );
        })}

        <Link to="/proyectos" className="wheel-center" aria-label={t.home.exploreAll}>
          <circle cx={C} cy={C} r={R_IN - 10} />
          <text x={C} y={C + 6} textAnchor="middle">
            {t.home.explore}
          </text>
        </Link>
      </svg>

      <p className="wheel-caption" aria-hidden="true">
        {current ? (
          <>
            <strong>{current.name}</strong> — {current.desc}
          </>
        ) : (
          t.home.wheelHint
        )}
      </p>

      {/* Alternativa en móvil: tres tarjetas claras con los mismos destinos */}
      <ul className="wheel-cards">
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <Link to={`/categoria/${cat.slug}`} className={`cat-card glass tone-${cat.color}`}>
              <span className="cat-card-icon">
                <Icon name={cat.icon} size={26} />
              </span>
              <span>
                <strong>{t.cats[cat.id].name}</strong>
                <small>{t.cats[cat.id].desc}</small>
              </span>
              <Icon name="arrow" className="cat-card-arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
