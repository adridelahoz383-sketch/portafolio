import { profile } from '../data/profile.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.shortName}. {t.footer}
        </p>
        <ul className="social">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label={t.contact.email}>
              <Icon name="mail" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
