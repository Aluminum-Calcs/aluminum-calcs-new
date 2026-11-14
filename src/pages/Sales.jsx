import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext';
import InputField from '../components/InputField';
import '../scss/pages/Sales.scss';

const trialSales = [
  {
    item_name: "Roller",
    item_qty: 4,
    item_price: 300,
    item_total: 1200,
    item_category: 'accesories',
    date_bought: 'Tue, Nov 3, 2026: 11:23 AM',
    customer_name: 'Mr Agbon-ifoh'
  },
  {
    item_name: "1132",
    item_qty: 4,
    item_price: 300,
    item_total: 1200,
    item_category: 'profile',
    date_bought: 'Sat, Nov 7, 2026: 02:07 PM',
    customer_name: 'Oga Thomas'
  },
];

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
  const [sales, setSales] = useState([]);

  function handleValues(property, value) {
    setValues(prev => ({ ...prev, [property]: value }));
  }

  function addSale() {
    // Add Sales
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

      <section className="add_sales">
        <div className="container">
          <h2>Add a Quick sale</h2>
          {/* J2ME loader for Java  games */}
          <form className="sales_form"onSubmit={e => {
            e.preventDefault();
            addSale();
          }}>
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
            {/* Add a units field. For example, glass have different units like sheets and pieces. some other items have different units too. */}
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
            {/* Still add a Category Dropdown */}
            <InputField
              inputType="text"
              label="Customer Name"
              name="item_buyer"
              placeholder="Who is buying this?"
              value={values.item_buyer}
              onChange={handleValues}
            />

            <button className="primary-btn" type="submit">
              <i className="fa fa-plus"></i>
              Add Sale
            </button>
          </form>
        </div>
      </section>

      {/* Sales Search form:
        sorting by: 
          date, time specific(ascending or descending)
          customer: A-Z or Z to A
          price: ascending or descending
      */}
      {/* sales grid: default sorting by date */}
      
      <section className="sales_grid">
        <div className="container">
          <h2>Your Sales</h2>
          <ul className="sales_grid_list">
            {trialSales?.map((each,i) =>
              <SingleSale
                key={i}
                sale_data={each}
              />
            )}
          </ul>
        </div>
      </section>
    </main>
  )
};

export function SingleSale({
  sale_data, // Object
  class_names, // Array
}) {

  return <article className={`single_sale ${class_names?.join(' ')}`}>
    <div className="details">
      <p>{sale_data?.item_name}</p>
      <p>{sale_data?.item_qty}</p>
      <p>@₦{sale_data?.item_price}</p>
      <p>₦{sale_data?.item_total}</p>
      <p>{sale_data?.date_bought}</p>
      <p>{sale_data?.customer_name}</p>
    </div>
    <div className="actions">
      <button><i className="fa fa-edit"></i></button>
      <button><i className="fa fa-trash"></i></button>
    </div>
  </article>
};

export default Sales;