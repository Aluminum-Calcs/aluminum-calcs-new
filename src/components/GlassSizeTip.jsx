import '../scss/components/GlassSizeTip.scss';
import { useEffect, useState } from 'react';
import { computeResult } from '../js/stile-calc/main.js';
import GlassImage from '../assets/images/svgs/glass.svg';

function GlassSizeTip({ windowType, sashes, width, height }) {
  const defaultRows = [
    { label: 'Glass Height', value: 500 },
    { label: 'Glass Width', value: 900 },
  ];

  const initialRows = computeResult('all', windowType, sashes, width, height) ?? defaultRows;

  const [rows, setRows] = useState(initialRows);
  const [sizeText, setSizeText] = useState(() => {
    const gh = initialRows.find(e => e.label === 'Glass Height')?.value;
    const gw = initialRows.find(e => e.label === 'Glass Width')?.value;
    return gh && gw ? `${gh} × ${gw} mm` : '562 × 812 mm';
  });

  useEffect(() => {
    const newRows = computeResult('all', windowType, sashes, width, height) ?? defaultRows;
    setRows(newRows);

    const glassHeight = newRows.find(e => e.label === 'Glass Height')?.value ?? null;
    const glassWidth = newRows.find(e => e.label === 'Glass Width')?.value ?? null;

    setSizeText(
      glassHeight && glassWidth ? `${glassHeight} × ${glassWidth} mm` : '562 × 812 mm'
    );
  }, [windowType, sashes, width, height]);

  return (
    <section className='GlassSizeTip'>
      <div className="container">
        <i className="fa fa-info"></i>
        <div className="content">
          <h4>Glass Size (Per Sheet)</h4>
          <span className="size">{sizeText}</span>
        </div>

        <img src={GlassImage} alt="Glass Img" />
      </div>
    </section>
  );
}

export default GlassSizeTip;