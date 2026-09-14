import { useContext, useEffect } from 'react';
import { PageContext } from '../context/PageContext.jsx';
import '../scss/pages/Quotes.scss';

const quoteRows = [
  {
    client: 'Aisha Okafor',
    title: 'Villa glazing package',
    total: '₦1,240,000',
    status: 'Approved',
    updated: '2 days ago',
  },
  {
    client: 'Mariam Ubani',
    title: 'Office partition supply',
    total: '₦940,000',
    status: 'Pending',
    updated: 'Today',
  },
  {
    client: 'Daniel Adebayo',
    title: 'Showroom glass facade',
    total: '₦2,460,000',
    status: 'Draft',
    updated: '5 days ago',
  },
  {
    client: 'Ifeanyi Eze',
    title: 'Apartment cluster glazing',
    total: '₦3,520,000',
    status: 'Ready',
    updated: '1 week ago',
  },
];

export default function Quotes() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Quotes');
  }, [setCurrentPage]);

  return (
    <main className="quotes-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Quotation desk</p>
            <h1>Quotes</h1>
            <p className="hero-copy">Review customer pricing, approval stages, and active request updates from one dashboard.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-file-text-o" />
          </div>
        </div>
      </section>

      <section className="quotes-panel">
        <div className="container">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Overview</p>
              <h2>Recent quotes</h2>
            </div>
            <button type="button" className="primary-btn">New quote</button>
          </div>

          <div className="quotes-table-wrap">
            <table className="quotes-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Project</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {quoteRows.map((quote) => (
                  <tr key={quote.title}>
                    <td>{quote.client}</td>
                    <td>{quote.title}</td>
                    <td>{quote.total}</td>
                    <td>
                      <span className={`status status--${quote.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td>{quote.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
