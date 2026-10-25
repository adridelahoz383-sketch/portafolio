// Textura poligonal decorativa: triángulos translúcidos, líneas finas y puntos.
// Se genera una sola vez con una semilla fija para que sea idéntica en cada carga.

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1600;
const H = 1000;
const COLS = 9;
const ROWS = 6;

function buildMesh() {
  const r = rng(20261024);
  const pts = [];
  for (let y = 0; y <= ROWS; y++) {
    for (let x = 0; x <= COLS; x++) {
      const jitter = x === 0 || x === COLS || y === 0 || y === ROWS ? 0 : 1;
      pts.push([(x / COLS) * W + (r() - 0.5) * 120 * jitter, (y / ROWS) * H + (r() - 0.5) * 110 * jitter]);
    }
  }
  const at = (x, y) => pts[y * (COLS + 1) + x];
  const tris = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const a = at(x, y), b = at(x + 1, y), c = at(x, y + 1), d = at(x + 1, y + 1);
      const flip = r() > 0.5;
      tris.push(flip ? [a, b, d] : [a, b, c], flip ? [a, d, c] : [b, d, c]);
    }
  }
  const fills = ['#ffffff', '#c9bdfb', '#a9d2fb', '#a8eee2'];
  return {
    tris: tris.map((t) => ({ d: `M${t.map((p) => p.map((n) => n.toFixed(1)).join(',')).join('L')}Z`, fill: fills[Math.floor(r() * fills.length)], o: 0.06 + r() * 0.16 })),
    pts: pts.filter(() => r() > 0.55),
  };
}

const mesh = buildMesh();

export default function PolygonBackground() {
  return (
    <div className="poly-bg" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        {mesh.tris.map((t, i) => (
          <path key={i} d={t.d} fill={t.fill} fillOpacity={t.o} stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1" />
        ))}
        {mesh.pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.2 : 2} fill="#ffffff" fillOpacity="0.55" />
        ))}
      </svg>
    </div>
  );
}
