import Icon from '../components/Icon.jsx';
import { profile } from '../data/profile.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Contact() {
  const { t } = useLang();
  const items = [
    { icon: 'mail', label: t.contact.email, value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'github', label: t.contact.github, value: profile.github.replace('https://', ''), href: profile.github, external: true },
    { icon: 'linkedin', label: t.contact.linkedin, value: profile.linkedin.replace('https://www.', ''), href: profile.linkedin, external: true },
    { icon: 'pin', label: t.contact.location, value: profile.location },
  ];

  return (
    <section className="container page contact">
      <header className="page-head">
        <h1>{t.contact.title}</h1>
        <p className="lead">{t.contact.lead}</p>
      </header>
      <ul className="contact-grid">
        {items.map((i) => (
          <li key={i.label}>
            {i.href ? (
              <a className="contact-card glass" href={i.href} {...(i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="contact-icon">
                  <Icon name={i.icon} size={24} />
                </span>
                <span>
                  <small>{i.label}</small>
                  <strong>{i.value}</strong>
                </span>
                {i.external && <Icon name="external" size={16} className="contact-ext" />}
              </a>
            ) : (
              <div className="contact-card glass">
                <span className="contact-icon">
                  <Icon name={i.icon} size={24} />
                </span>
                <span>
                  <small>{i.label}</small>
                  <strong>{i.value}</strong>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
