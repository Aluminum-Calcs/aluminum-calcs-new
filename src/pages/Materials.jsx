import { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext.jsx';
import InputField, { DropdownField } from '../components/InputField.jsx';

import "../scss/pages/Materials.scss";

const options = {
  category: [
    { value: "all" },
    { value: "profiles" },
    { value: "glass" },
    { value: "accesories" }
  ],
  usage: [
    { value: 'all' },
    { value: 'sliding' },
    { value: 'casement' },
    { value: 'frameless' },
    { value: 'door' },
    { value: 'railing' },
  ],
};

function Materials() {
  const { setCurrentPage } = useContext(PageContext);
  // const { materials } = useContext(PageContext);
  const { pathname } = useLocation();
  useEffect(() => {
    setCurrentPage('Materials')
  }, [pathname]);
  
  const [form, setForm] = useState({
    query: null,
    category: '',
    usage: '',
  });

  function handleForm(prop, val) {
    return;
  }


  return (
    <main className="materials-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Materials</p>
            <h1>Keep your <span className="special">materials</span> in check.</h1>
            <p className="hero-copy">Manage the materials in your workshop, keep prices up-to-date, and track the stock available for your next job.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-file-text-o" />
          </div>
        </div>
      </section>

      <section className="material-controls">
        <div className="container">
          <button
            className="add-material-btn">
            <i className="fa fa-plus"></i>
            Add material
          </button>
          <form className="material-filters" role='search'>
            <div className="material-search-box">
              <input
                type="search"
                name="search"
                id="search-input"
                value={form.query ?? ""}
                placeholder="Type here..."
                onChange={handleForm}
              />
              <button className="search-button">
                <i className="icon-search1"/>
              </button>
            </div>
            <div className="dropdowns">
              <DropdownField
                label="category"
                name="category"
                value="profiles"
                options={options.category}
                classNames={['category-dropdown']}
                // onChange
              />
              <DropdownField
                label="usage"
                name="usage"
                value="profiles"
                options={options.usage}
                classNames={['usage-dropdown']}
                // onChange
              />
            </div>
            <button
              type="reset"
              className="reset-button">
              Clear filters
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Materials;

/*
  <section className='form'>
    <form className="container">
      <InputField
        inputType="text"
        id="item-name"
        val="Roller"
        key="1"
      />
      <InputField
        id="Quantity"
        val="1"
        key="2"
      />
      <InputField
        id="Price"
        val="1000"
        key="3"
        msgType="static"
        msg="You can set a custom price for this item"
      />

      <div className="btns">
        <button id="submit">Add</button>
        <button id="submit-new">
          <i className="fa fa-shopping-cart"></i>
          Add to <b>New</b> Cart
        </button>
    </div>
    </form>
  </section>

  <section className="results carts">
    <div className="container">
      { carts.length > 0
        ? carts.map(cart => <SingleCart cartData={cart} />)
        : <div className="carts__empty">
        <i className="fa fa-shopping-cart"></i>
          <p>
            Your cart is empty<br />
            Create and populate carts.
          </p>
        </div>
      }
      

    </div>
  </section>
*/