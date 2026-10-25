// Iconos SVG en línea: sin librerías externas.
const paths = {
  gamepad: (
    <>
      <path d="M6 9h12a4 4 0 0 1 3.9 4.8l-.8 3.6a2.5 2.5 0 0 1-4.3 1.1L14.5 16h-5l-2.3 2.5a2.5 2.5 0 0 1-4.3-1.1l-.8-3.6A4 4 0 0 1 6 9Z" />
      <path d="M8 11.5v3M6.5 13h3" />
      <circle cx="15.5" cy="12.5" r=".6" fill="currentColor" />
      <circle cx="17.5" cy="14" r=".6" fill="currentColor" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
      <path d="m9.5 13-2 1.8 2 1.8M14.5 13l2 1.8-2 1.8" />
    </>
  ),
  cup: (
    <>
      <path d="M5 10h11v4.5A4.5 4.5 0 0 1 11.5 19h-2A4.5 4.5 0 0 1 5 14.5V10Z" />
      <path d="M16 11.5h1.5a2 2 0 0 1 0 4H16M8 3.5c-.8 1 .8 2-.1 3.2M11 3.5c-.8 1 .8 2-.1 3.2" />
    </>
  ),
  github: (
    <path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.44v-1.54c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.11.98 2.62.75.08-.58.32-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.14.08-2.38 0 0 .76-.24 2.48.93a8.6 8.6 0 0 1 4.5 0c1.72-1.17 2.47-.93 2.47-.93.5 1.24.19 2.15.1 2.38.57.63.92 1.44.92 2.42 0 3.46-2.1 4.22-4.1 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.44A9 9 0 0 0 12 3Z" />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8h.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="m7 9.5 3 2.5-3 2.5M12.5 15H17" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
};

export default function Icon({ name, size = 20, className = '', filled = false, ...rest }) {
  return (
    <svg
      {...rest}
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled || name === 'github' ? 'currentColor' : 'none'}
      stroke={name === 'github' ? 'none' : 'currentColor'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
