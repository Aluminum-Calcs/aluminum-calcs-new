import { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext.jsx';
import InputField, { DropdownField } from '../components/InputField.jsx';

import "../scss/pages/Materials.scss";
// import { material_list } from '../js/materials/material-list.js';

const options = {
  category: [
    { value: "all" },
    { value: "profile" },
    { value: "glass" },
    { value: "accesory" },
    { value: "fastener" },
    { value: "hardware" },
    { value: "other" },
  ],
  usage: [
    { value: 'all' },
    { value: 'sliding' },
    { value: 'casement' },
    { value: 'frameless' },
    { value: 'door' },
    { value: 'railing' },
  ],
  stock: [
    { value: 'all-stock' },
    { value: 'in-stock' },
    { value: 'low-stock' },
    { value: 'out-of-stock' },
  ],
  sort_by: [
    { value: 'name' },
    { value: 'price: low to high' },
    { value: 'price: high to low' },
    { value: 'stock' },
  ],
};

function Materials() {
  const { setCurrentPage } = useContext(PageContext);
  // const { materials } = useContext(PageContext);
  const { pathname } = useLocation();
  useEffect(() => {
    setCurrentPage('Materials')
  }, [pathname]);
  
  const [values, setValues] = useState({
    query: null,
    category: null,
    usage: null,
    stock: null,
    sort_by: null,
  });

  function resetValues() {
    setValues({
      query: null,
      category: null,
      usage: null,
      stock: null,
      sort_by: null,
    });
  }

  function handleValues(property, value) {
    setValues((prev) => ({ ...prev, [property]: value }));
  };


  return (
    <main className="materials-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Materials</p>
            <h1>Keep your <span className="special">materials</span> in check.</h1>
            <p className="hero-copy">
              Manage the materials in your workshop, keep prices up-to-date, and track the stock available for your next job.
              <button
                className="add-material-btn">
                <i className="fa fa-plus"></i>
                Add material
              </button>
            </p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-tags" />
          </div>
        </div>
      </section>

      <section className="material-controls">
        <div className="container">
          <form className="material-filters" role='search'>
            <InputField
              inputType='search'
              placeholder="Type here..."
              label="search material"
              name="search"
              value={values.query ?? ""}
              onChange={handleValues}
            />
            
            <div className="filter-fields">
              <DropdownField
                label="category"
                name="category"
                value={values.category ?? "all"}
                options={options.category}
                classNames={['category-dropdown']}
                onChange={handleValues}
              />
              <DropdownField
                label="usage"
                name="usage"
                value={values.usage ?? "all"}
                options={options.usage}
                classNames={['usage-dropdown']}
                onChange={handleValues}
              />
              <DropdownField
                label="Stock"
                name="stock"
                value={values.stock ?? "all stock"}
                options={options.stock}
                classNames={['stock-dropdown']}
                onChange={handleValues}
              />
              <DropdownField
                label="Sort by"
                name="sort_by"
                value={values.sort_by ?? "name"}
                options={options.sort_by}
                classNames={['sort-by-dropdown']}
                onChange={handleValues}
              />
            </div>
            <button
              type="reset"
              className="reset-button"
              onClick={(e) => {
                e.preventDefault();
                resetValues();
              }}
            >
              Clear filters
            </button>
          </form>
        </div>
      </section>

      <section className="materials-grid">
        <div className="container">
          {console.log(material_list)}
          {material_list && material_list.map((material, i)=>{
            return <Material data={material} key={i}/>;
          })}
        </div>
      </section>
    </main>
  )
}

function Material({ data }) {
  return <div className="material-card">
    <div className="card-heading">
      <div className="card-icon"><i className="icon-tags" aria-hidden="true" /></div>
      <div>
        <h2>{data.name}</h2>
        <p className="eyebrow"><b>category: </b>{data.category}</p>
      </div>
    </div>
    <div className="card-description">
      <InputField
        inputType='number'
        label="price"
        value={data.price}
        placeholder="Type the new price"
        unit="₦"
        name={data.name.toLowerCase().replaceAll(' ', '_')}
        />
      <InputField
        inputType='text'
        label="Unit"
        value={data.units}
        placeholder="...sheets?"
        name={data.name.toLowerCase().replaceAll(' ', '_')}
        />
      <InputField
        inputType='number'
        label="In stock"
        value={data.stock}
        placeholder="How many?"
        name={data.name.toLowerCase().replaceAll(' ', '_')}
        
      />

    </div>
    <p className="material-usage">
      <span>Usage:</span>
      <div>
        {data.usage && data.usage.map((each, i) => <span className="use" key={i}>
          {each}
        </span>)}
      </div>
    </p>
  </div>
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