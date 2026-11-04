import { useState, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext.jsx';
import InputField, { DropdownField } from '../components/InputField.jsx';
import { material_list } from '../js/materials/material-list.js';

import "../scss/pages/Materials.scss";

const STORAGE_KEY = 'aluminum-calcs-materials';
const LOW_STOCK_LEVEL = 5;

const options = {
  category: [
    { value: 'all', label: 'All' },
    { value: 'profile', label: 'Profile' },
    { value: 'glass', label: 'Glass' },
    { value: 'accessory', label: 'Accessory' },
    { value: 'fastener', label: 'Fastener' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'other', label: 'Other' },
  ],
  usage: [
    { value: 'all', label: 'All' },
    { value: 'sliding', label: 'Sliding' },
    { value: 'casement', label: 'Casement' },
    { value: 'frameless', label: 'Frameless' },
    { value: 'door', label: 'Door' },
    { value: 'railing', label: 'Railing' },
  ],
  stock: [
    { value: 'all', label: 'All stock' },
    { value: 'in-stock', label: 'In stock' },
    { value: 'low-stock', label: 'Low stock' },
    { value: 'out-of-stock', label: 'Out of stock' },
  ],
  sort_by: [
    { value: 'name', label: 'Name' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'stock', label: 'Stock: lowest first' },
  ],
};

const defaultFilters = {
  query: '',
  category: 'all',
  usage: 'all',
  stock: 'all',
  sort_by: 'name',
};

const emptyMaterial = {
  name: '',
  category: 'profile',
  price: '',
  units: '',
  stock: '',
  usage: [],
};

// ===== Helpers =====
const slugify = (text) => String(text).toLowerCase().trim().replace(/\s+/g, '_');

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ?? `material-${Date.now()}`;

function normalizeMaterial(material, index) {
  return {
    id: material.id ?? `${slugify(material.name ?? 'material')}-${index}`,
    name: material.name ?? 'Unnamed material',
    category: material.category ?? 'other',
    price: Number(material.price) || 0,
    units: material.units ?? '',
    stock: Number(material.stock) || 0,
    usage: Array.isArray(material.usage) ? material.usage : [],
  };
}

function loadMaterials() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved.map(normalizeMaterial);
  } catch {
    // storage unavailable or corrupted; fall back to the default list
  }
  return (material_list ?? []).map(normalizeMaterial);
}

// Same { text, selectors } structure used for the nav statuses
function getStockStatus(stock) {
  const amount = Number(stock) || 0;
  if (amount <= 0) {
    return { key: 'out-of-stock', text: 'Out of stock', selectors: ['status--out-of-stock'] };
  }
  if (amount <= LOW_STOCK_LEVEL) {
    return { key: 'low-stock', text: 'Low stock', selectors: ['status--pending'] };
  }
  return { key: 'in-stock', text: 'In stock', selectors: ['status--active'] };
}

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  'price-asc': (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
  'price-desc': (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0),
  stock: (a, b) => (Number(a.stock) || 0) - (Number(b.stock) || 0),
};

// ===== Page =====
function Materials() {
  const { setCurrentPage } = useContext(PageContext);
  const { pathname } = useLocation();

  const [materials, setMaterials] = useState(loadMaterials);
  const [filters, setFilters] = useState(defaultFilters);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setCurrentPage('Materials');
  }, [pathname]);

  // Persist edits locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
    } catch {
      // storage unavailable or full; fail silently
    }
  }, [materials]);

  function handleFilters(property, value) {
    setFilters((prev) => ({ ...prev, [property]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  // price and stock are stored as typed and converted to numbers when used,
  // so decimals like "12." can be typed without the input jumping around
  function updateMaterial(id, property, value) {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [property]: value } : m))
    );
  }

  function addMaterial(material) {
    setMaterials((prev) => [
      normalizeMaterial({ ...material, id: makeId() }, prev.length),
      ...prev,
    ]);
    setAdding(false);
  }

  function deleteMaterial(id) {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  const visibleMaterials = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const filtered = materials.filter((m) => {
      const matchesQuery =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query);
      const matchesCategory =
        filters.category === 'all' || m.category === filters.category;
      const matchesUsage =
        filters.usage === 'all' || m.usage.includes(filters.usage);
      const matchesStock =
        filters.stock === 'all' || getStockStatus(m.stock).key === filters.stock;

      return matchesQuery && matchesCategory && matchesUsage && matchesStock;
    });

    return [...filtered].sort(sorters[filters.sort_by] ?? sorters.name);
  }, [materials, filters]);

  const summary = useMemo(
    () =>
      materials.reduce(
        (acc, m) => {
          const stock = Number(m.stock) || 0;
          const status = getStockStatus(stock).key;
          acc.value += (Number(m.price) || 0) * stock;
          if (status === 'low-stock') acc.low += 1;
          if (status === 'out-of-stock') acc.out += 1;
          return acc;
        },
        { value: 0, low: 0, out: 0 }
      ),
    [materials]
  );

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
                type="button"
                className="add-material-btn"
                onClick={() => setAdding(true)}
              >
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

      {adding && (
        <AddMaterialForm
          onAdd={addMaterial}
          onCancel={() => setAdding(false)}
        />
      )}

      <section className="inventory-summary">
        <div className="container">
          <div className="summary-tile">
            <span className="label">Materials</span>
            <span className="value">{materials.length}</span>
          </div>
          <div className="summary-tile">
            <span className="label">Low stock</span>
            <span className="value">{summary.low}</span>
          </div>
          <div className="summary-tile">
            <span className="label">Out of stock</span>
            <span className="value">{summary.out}</span>
          </div>
          <div className="summary-tile">
            <span className="label">Stock value</span>
            <span className="value">
              ₦{summary.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </section>

      <section className="material-controls">
        <div className="container">
          <form
            className="material-filters"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              inputType="search"
              placeholder="Type here..."
              label="search material"
              name="query"
              value={filters.query}
              onChange={handleFilters}
            />

            <div className="filter-fields">
              <DropdownField
                label="category"
                name="category"
                value={filters.category}
                selectedValue={filters.category}
                options={options.category}
                classNames={['category-dropdown']}
                onChange={handleFilters}
              />
              <DropdownField
                label="usage"
                name="usage"
                value={filters.usage}
                selectedValue={filters.usage}
                options={options.usage}
                classNames={['usage-dropdown']}
                onChange={handleFilters}
              />
              <DropdownField
                label="Stock"
                name="stock"
                value={filters.stock}
                selectedValue={filters.stock}
                options={options.stock}
                classNames={['stock-dropdown']}
                onChange={handleFilters}
              />
              <DropdownField
                label="Sort by"
                name="sort_by"
                value={filters.sort_by}
                selectedValue={filters.sort_by}
                options={options.sort_by}
                classNames={['sort-by-dropdown']}
                onChange={handleFilters}
              />
            </div>
            <button
              type="button"
              className="reset-button"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </form>

          <p className="results-count">
            Showing {visibleMaterials.length} of {materials.length} materials
          </p>
        </div>
      </section>

      <section className="materials-grid">
        <div className="container">
          {visibleMaterials.length ? (
            visibleMaterials.map((material) => (
              <Material
                data={material}
                key={material.id}
                onChange={updateMaterial}
                onDelete={deleteMaterial}
              />
            ))
          ) : (
            <div className="materials-empty">
              <i className="fa fa-tags" aria-hidden="true"></i>
              <p className="empty-title">
                {materials.length ? 'No materials match your filters' : 'No materials yet'}
              </p>
              <p className="empty-text">
                {materials.length
                  ? 'Try a different search or clear the filters.'
                  : 'Use "Add material" to start building your list.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Material({ data, onChange, onDelete }) {
  const status = getStockStatus(data.stock);
  const handleField = (property, value) => onChange(data.id, property, value);

  return (
    <article className="material-card">
      <div className="card-heading">
        <div className="card-icon"><i className="icon-tags" aria-hidden="true" /></div>
        <div>
          <h2>{data.name}</h2>
          <p className="eyebrow"><b>category: </b>{data.category}</p>
        </div>
        <span className={['status', ...status.selectors].join(' ')}>
          {status.text}
        </span>
      </div>

      <div className="card-description">
        <InputField
          inputType="number"
          id={`${data.id}-price`}
          name="price"
          label="price"
          value={data.price}
          placeholder="Type the new price"
          unit="₦"
          onChange={handleField}
        />
        <InputField
          inputType="text"
          id={`${data.id}-units`}
          name="units"
          label="Unit"
          value={data.units}
          placeholder="...sheets?"
          onChange={handleField}
        />
        <InputField
          inputType="number"
          id={`${data.id}-stock`}
          name="stock"
          label="In stock"
          value={data.stock}
          placeholder="How many?"
          onChange={handleField}
        />
      </div>

      {data.usage.length > 0 && (
        <div className="material-usage">
          <span>Usage:</span>
          <div>
            {data.usage.map((each) => (
              <span className="use" key={each}>{each}</span>
            ))}
          </div>
        </div>
      )}

      <div className="material-actions">
        <button
          type="button"
          className="delete-button"
          title={`Delete ${data.name}`}
          onClick={() => {
            if (window.confirm(`Delete "${data.name}" from your materials?`)) {
              onDelete(data.id);
            }
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i> Delete
        </button>
      </div>
    </article>
  );
}

function AddMaterialForm({ onAdd, onCancel }) {
  const [values, setValues] = useState(emptyMaterial);

  const usageOptions = options.usage.filter((o) => o.value !== 'all');
  const canSave = values.name.trim() !== '';

  function handleValues(property, value) {
    setValues((prev) => ({ ...prev, [property]: value }));
  }

  function toggleUsage(value) {
    setValues((prev) => ({
      ...prev,
      usage: prev.usage.includes(value)
        ? prev.usage.filter((u) => u !== value)
        : [...prev.usage, value],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSave) return;
    onAdd({ ...values, name: values.name.trim() });
  }

  return (
    <section className="add-material">
      <div className="container">
        <form className="add-material-form" onSubmit={handleSubmit}>
          <div className="card-heading">
            <div className="card-icon"><i className="fa fa-plus" aria-hidden="true" /></div>
            <div>
              <h2>Add material</h2>
              <p className="eyebrow">New item for your workshop list</p>
            </div>
          </div>

          <div className="add-material-fields">
            <InputField
              inputType="text"
              id="new-material-name"
              name="name"
              label="Name"
              value={values.name}
              placeholder="e.g. Sliding window track"
              onChange={handleValues}
            />
            <DropdownField
              label="Category"
              name="category"
              value={values.category}
              selectedValue={values.category}
              options={options.category.filter((o) => o.value !== 'all')}
              onChange={handleValues}
            />
            <InputField
              inputType="number"
              id="new-material-price"
              name="price"
              label="Price"
              value={values.price}
              placeholder="Enter price"
              unit="₦"
              onChange={handleValues}
            />
            <InputField
              inputType="text"
              id="new-material-units"
              name="units"
              label="Unit"
              value={values.units}
              placeholder="...sheets?"
              onChange={handleValues}
            />
            <InputField
              inputType="number"
              id="new-material-stock"
              name="stock"
              label="In stock"
              value={values.stock}
              placeholder="How many?"
              onChange={handleValues}
            />
          </div>

          <div className="usage-picker" role="group" aria-label="Usage">
            <span>Usage:</span>
            {usageOptions.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                className={`usage-chip ${values.usage.includes(value) ? 'selected' : ''}`}
                aria-pressed={values.usage.includes(value)}
                onClick={() => toggleUsage(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="add-material-actions">
            <button type="submit" className="save-button" disabled={!canSave}>
              <i className="fa fa-check" aria-hidden="true"></i> Save material
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Materials;