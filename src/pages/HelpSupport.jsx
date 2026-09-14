import { useContext, useEffect } from 'react';
import { PageContext } from '../context/PageContext.jsx';
import '../scss/pages/HelpSupport.scss';

const supportAreas = [
  {
    title: 'Product guidance',
    description: 'Find answers about profile selection, glazing, and quote structure.',
    icon: 'fa fa-book',
  },
  {
    title: 'Technical support',
    description: 'Check common setup and calculation issues affecting your daily workflow.',
    icon: 'fa fa-wrench',
  },
  {
    title: 'Status & updates',
    description: 'Monitor system health, release notes, and maintenance updates.',
    icon: 'fa fa-bell',
  },
];

export default function HelpSupport() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Help & Support');
  }, [setCurrentPage]);

  return (
    <main className="support-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Need a hand?</p>
            <h1>Help & Support</h1>
            <p className="hero-copy">Reach the right resource quickly and keep your calculations running without friction.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-life-ring" />
          </div>
        </div>
      </section>

      <section className="support-content">
        <div className="container support-grid">
          {supportAreas.map((area) => (
            <article className="support-card" key={area.title}>
              <div className="support-icon"><i className={area.icon} aria-hidden="true" /></div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <button type="button" className="secondary-btn">Open</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
