import { useContext, useEffect } from 'react';
import { PageContext } from '../context/PageContext.jsx';
import '../scss/pages/Clients.scss';

const clients = [
  {
    name: 'Aisha Okafor',
    company: 'Oakline Homes',
    project: '3-bedroom villa glazing',
    value: '₦1,240,000',
    status: 'Active',
    phone: '+234 803 111 2244',
  },
  {
    name: 'Daniel Adebayo',
    company: 'Urban Frame Studio',
    project: 'Showroom front facade',
    value: '₦2,460,000',
    status: 'In review',
    phone: '+234 814 882 1033',
  },
  {
    name: 'Mariam Ubani',
    company: 'Elite Glass Works',
    project: 'Office partitions',
    value: '₦940,000',
    status: 'Pending',
    phone: '+234 705 446 9211',
  },
  {
    name: 'Ifeanyi Eze',
    company: 'Terracotta Build',
    project: 'Apartment cluster',
    value: '₦3,520,000',
    status: 'Active',
    phone: '+234 909 443 7780',
  },
];

export default function Clients() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Clients');
  }, [setCurrentPage]);

  return (
    <main className="clients-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Customer records</p>
            <h1>Clients</h1>
            <p className="hero-copy">Track active projects, customer details, and quote health from one place.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-users" />
          </div>
        </div>
      </section>

      <section className="clients-panel">
        <div className="container">
          <div className="stats-row">
            <div className="stat-card">
              <span>Total clients</span>
              <strong>128</strong>
            </div>
            <div className="stat-card">
              <span>Active projects</span>
              <strong>42</strong>
            </div>
            <div className="stat-card">
              <span>Open quotes</span>
              <strong>17</strong>
            </div>
          </div>

          <div className="clients-grid">
            {clients.map((client) => (
              <article className="client-card" key={client.name}>
                <div className="client-card__top">
                  <div className="avatar">{client.name.charAt(0)}</div>
                  <span className={`status status--${client.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {client.status}
                  </span>
                </div>

                <div className="client-card__content">
                  <h3>{client.name}</h3>
                  <p className="company">{client.company}</p>
                  <p>{client.project}</p>
                </div>

                <dl className="client-meta">
                  <div>
                    <dt>Value</dt>
                    <dd>{client.value}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{client.phone}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
