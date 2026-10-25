import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function NotFound({ message }) {
  const { t } = useLang();
  return (
    <section className="container page not-found">
      <div className="panel glass">
        <p className="eyebrow">404</p>
        <h1>{t.notFound.title}</h1>
        <p>{message ?? t.notFound.body}</p>
        <Link to="/" className="btn btn-primary">
          {t.notFound.home}
        </Link>
      </div>
    </section>
  );
}
