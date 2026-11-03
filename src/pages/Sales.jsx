import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext';
import InputField from '../components/InputField';
import '../scss/pages/Sales.scss';

function Sales() {
  const { pathname } = useLocation();
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => { 
    setCurrentPage("Sales")
  }, [pathname]);

  const [values, setValues] = useState({
    item_name: "Rubber Roller (4-in-1)",
    item_qty: 4,
    item_price: 300,
    item_total: 1200,
  });

  function handleValues(property, value) {
    setValues(prev => ({ ...prev, [property]: value }));
  }

  return (
    <main className="sales-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Quick Sale</p>
            <h1>Record a <span className="special">sale</span> in seconds.</h1>
            <p className="hero-copy">Quickly add materials sold at the counter, enter quantities and let aluminum-calcs calculate the total for you.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-file-text-o" />
          </div>
        </div>
      </section>

      <section className="sales-grid">
        <div className="container">
          <h2>Add a Quick sale</h2>
          <form>
            <InputField
              inputType="text"
              label="item name"
              name="item_name"
              placeholder="Item name"
              value={values.item_name}
              onChange={handleValues}
            />
            <InputField
              inputType="number"
              label="Quantity"
              name="item_qty"
              placeholder="1,2, ...How many?"
              value={values.item_qty}
              onChange={handleValues}
              unit={"units"}
            />
            <InputField
              inputType="number"
              label="Unit Price"
              name="item_price"
              placeholder="Per unit price"
              value={values.item_price}
              onChange={handleValues}
              unit={"₦"}
            />
            <InputField
              inputType="number"
              label="Total price"
              name="item_total"
              placeholder="00,000"
              value={values.item_total}
              onChange={handleValues}
              unit={"₦"}
            />

            <button className="add-sale-btn">
              <i className="fa fa-plus"></i>
              Add Sale
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Sales;