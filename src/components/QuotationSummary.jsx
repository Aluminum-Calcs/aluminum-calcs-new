
import '../scss/components/QuotationSummary.scss';
import { getQuotationTotals } from '../js/Quote/quotationTotals.js';
import { useState, useEffect } from 'react';

export default function Quotation({
  values,
  onAddToCart,
  onSaveDraft,
}) {
  const {
    profiles = [],
    profilesTotal = 0,
    glassPrice = 0,
    glassTotal = 0,
    accessories = [],
    accessoriesTotal = 0,
    subTotal = 0,
  } = getQuotationTotals(values);

  const [discount, setDiscount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1100
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const total = Math.max(0, subTotal - discount);

  function handleDiscountChange(e) {
    const amount = Number(e.target.value);

    if (!Number.isFinite(amount)) {
      setDiscount(0);
      return;
    }

    setDiscount(Math.min(Math.max(amount, 0), subTotal));
  }

  function handleAddToCart() {
    onAddToCart?.({
      values,
      subtotal: subTotal,
      discount,
      total,
    });
  }

  function toggleDetails(e) {
    const details = e.currentTarget.closest('.details');

    if (details) {
      details.classList.toggle('closed');
    }
  }

  const formatPrice = (price = 0) =>
    Number(price || 0).toLocaleString();

  const sectionsHTML = (
    <>
      <div className="quotation_breakdown">
        {!isDesktop && (
          <div className="header">
            <h3>Quotation Breakdown</h3>
          </div>
        )}

        <div className="quotation_profiles section">
          <div className="details">
            <button
              type="button"
              className="details_summary"
              onClick={toggleDetails}
            >
              <h4>Aluminum Profiles</h4>
              <span className="right">
                <span className="price">
                  ₦ {formatPrice(profilesTotal)}
                </span>
                <i className="fa fa-chevron-up" />
              </span>
            </button>

            <div className="details_content">
              {profiles.map((obj, i) => (
                <div className="details_item" key={i}>
                  <span className="item_name">{obj.label}</span>
                  <span className="item_qty">
                    {obj.qty ?? 1} × {formatPrice(obj.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="quotation_glass section">
          <div className="details">
            <button
              type="button"
              className="details_summary"
              onClick={toggleDetails}
            >
              <h4>Glass</h4>
              <span className="right">
                <span className="price">
                  ₦ {formatPrice(glassTotal)}
                </span>
                <i className="fa fa-chevron-up" />
              </span>
            </button>

            <div className="details_content">
              <div className="details_item">
                <span className="item_name">
                  {values.glassThickness} {values.glassColor} glass
                </span>
                <span className="item_qty">
                  {values.sashCount} × {formatPrice(glassPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="quotation_accesories section">
          <div className="details">
            <button
              type="button"
              className="details_summary"
              onClick={toggleDetails}
            >
              <h4>Accessories</h4>
              <span className="right">
                <span className="price">
                  ₦ {formatPrice(accessoriesTotal)}
                </span>
                <i className="fa fa-chevron-up" />
              </span>
            </button>

            <div className="details_content">
              {accessories.map((accessory, i) => (
                <div className="details_item" key={i}>
                  <span className="item_name">
                    {accessory.label}
                  </span>
                  <span className="item_qty">
                    {accessory.qty} × {formatPrice(accessory.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="quotation_totals">
        <div className="subtotal">
          <span className="text">Subtotal</span>
          <span className="price">
            ₦ {formatPrice(subTotal)}
          </span>
        </div>

        <div className="discount">
          <span className="text">Discount</span>
          <span className="price">
            ₦
            <input
              type="number"
              id="discount"
              min="0"
              max={subTotal}
              step="1"
              value={discount}
              onChange={handleDiscountChange}
            />
          </span>
        </div>

        <div className="total">
          <span className="text">Total</span>
          <span className="price">
            ₦ {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="quotation_warning">
        <i className="fa fa-info" />
        <p>Prices may change. Add to cart to save this quotation.</p>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <section className="desktop_quotation">
        <div className="container">
          <div className="preview">
            <div className="card-heading section-header">
              <div className="card-icon">
                <i className="fa fa-sticky-note" aria-hidden="true" />
              </div>

              <div>
                <p className="eyebrow">Detailed totals</p>
                <h2>Quotation Preview</h2>
              </div>
            </div>

            <div className="preview_content card-content">
              {sectionsHTML}
            </div>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="addToCartButton"
              onClick={handleAddToCart}
            >
              <i className="fa fa-shopping-cart" />
              Add to Cart
            </button>

            <button
              type="button"
              className="saveDraftButton"
              onClick={() => onSaveDraft?.()}
            >
              <i className="fa fa-save" />
              Save Draft
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quotation">
      <div className="container">
        <div className="quotation_summary">
          <div className="header">
            <h3>Window Summary</h3>
          </div>

          <table>
            <tbody>
              <tr>
                <td>Type</td>
                <td>
                  {(values.windowType || '').replaceAll('-', ' ')}
                </td>
              </tr>

              <tr>
                <td>Sashes</td>
                <td>{values.sashCount}</td>
              </tr>

              <tr>
                <td>Size (W × H)</td>
                <td>
                  {values.width} × {values.height} mm
                </td>
              </tr>

              <tr>
                <td>Orientation</td>
                <td>{values.orientation}</td>
              </tr>

              {values.windowType !== 'sliding-window' && (
                <tr>
                  <td>Opening</td>
                  <td>{values.openingStyle}</td>
                </tr>
              )}

              {values.windowType === 'frameless-window' && (
                <tr>
                  <td>Matter Transom</td>
                  <td>{values.matterTransom}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sectionsHTML}
      </div>
    </section>
  );
}
