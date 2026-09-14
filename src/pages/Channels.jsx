import { useContext, useEffect } from 'react';
import { PageContext } from '../context/PageContext';
import "../scss/pages/Channels.scss";

const channelItems = [
  {
    title: 'Width',
    description: 'A core reference for the horizontal window profile and framing dimension used in casement builds.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Decurve',
    description: 'Used where softened edges or curved profile transitions bring a cleaner, more integrated look.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Height',
    description: 'The vertical section used to align proportions and frame strength across taller openings.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Lock Stile',
    description: 'A locking edge profile commonly used in sliding frames and narrow glass configurations.',
    tags: ['Sliding Windows', 'Sliding Doors', 'Show glass'],
  },
  {
    title: 'Nine-Nine',
    description: 'A commonly referenced profile in standard aluminum fabrication and enclosure detailing.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: '1132',
    description: 'A strong architectural profile often selected for balanced structure and visibility.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Show glass bit',
    description: 'A glazing-adjacent profile that supports clean visibility and neat reveal lines.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: '40-40',
    description: 'A compact profile used in smaller frames where proportion and clean detailing matter.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Track',
    description: 'The guide profile used to support smooth sliding motion in track-based systems.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Side Jamb',
    description: 'A practical jamb section used to stabilise openings while preserving a clean finish.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
  {
    title: 'Interlock',
    description: 'A closure profile used to improve edge fit, alignment, and weather performance.',
    tags: ['Casement Windows', 'Toilet Doors'],
  },
];

function Channels() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Channels');
  }, [setCurrentPage]);

  return (
    <main className="channels-page">
      <section className="channels-hero">
        <div className="container channels-hero__inner">
          <div>
            <p className="eyebrow">Reference library</p>
            <h1>Aluminum channels</h1>
            <p className="hero-copy">
              Learn how common aluminum channel profiles are named and used in residential and commercial window work.
            </p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-cubes" />
          </div>
        </div>
      </section>

      <section className="channels" id="channel-grid">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Profiles</p>
            <h2>Reference list</h2>
          </div>

          <div className="channels__grid">
            {channelItems.map((item, index) => (
              <article className="channels__grid__each" key={`${item.title}-${index}`}>
                <div className="channels__grid__each__img" aria-hidden="true">
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V13H30V7M12 39H30V18H12V39ZM18 18V13M28 18V13M14 26H28M14 31H26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="channels__grid__each__content">
                  <span className="card-index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Channels;