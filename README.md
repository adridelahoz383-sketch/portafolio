# Portafolio — Adrián De La Hoz

Portafolio bilingüe (ES / EN) con siete proyectos en tres áreas: videojuegos, web y Java. Hecho con React 19, React Router y Vite. No tiene backend.

## Ejecutar

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo
npm test          # comprueba los datos del portafolio
npm run build     # compilación de producción en dist/
npm run preview   # sirve dist/ en local
```

## Estructura

```
src/
├── data/projects.js     # TODO el contenido de los proyectos (ES y EN) y su verificación
├── data/profile.js      # datos de perfil y contacto
├── i18n/                # textos de la interfaz y selector de idioma
├── components/          # cabecera, pie, círculo interactivo, tarjetas, iconos, fondo poligonal
├── pages/               # Inicio, Proyectos, Categoría, Detalle, Sobre mí, Contacto, 404
└── styles/global.css    # variables de color y todos los estilos
public/projects/         # capturas reales (tomadas de las apps ejecutándose en local)
tests/data.test.js       # integridad de datos y comprobación de que no se publica teléfono ni documento
```

Rutas (con `HashRouter`, para que funcione en GitHub Pages sin configuración):
`#/`, `#/proyectos`, `#/proyectos?cat=games|web|java`, `#/categoria/videojuegos|web|java`, `#/proyectos/<slug>`, `#/sobre-mi`, `#/contacto`.

## Editar contenido

- Proyecto nuevo o cambio de texto: edita `src/data/projects.js`. Cada proyecto tiene sus textos en `es` y `en`, y los tests comprueban que ambos idiomas tengan la misma forma.
- Demo o video: rellena `demo` o `video` con la URL real. Los botones aparecen solos; si están vacíos no se muestra ningún botón.
- Captura: copia la imagen a `public/projects/` y pon su ruta en `image`.
- Estado de verificación: `verified`, `partial`, `unverified` o `blocked`.

## Desplegar en GitHub Pages

1. Crea un repositorio (por ejemplo `portafolio`) y sube este código.
2. `npm run build`.
3. Publica la carpeta `dist/`, por ejemplo con `npx gh-pages -d dist`, o con una GitHub Action de Pages.

`vite.config.js` usa `base: './'`, así que el sitio funciona en cualquier subruta.
