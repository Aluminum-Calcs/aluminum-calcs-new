import '../scss/components/QuotationSummary.scss';
import { getQuotationTotals } from '../js/Quote/quotationTotals.js';
import { useState, useEffect } from 'react';

export default function Quotation(props) {
  const { values } = props;
  const {
    profiles,
    profilesTotal,
    glassPrice,
    glassTotal,
    accessories,
    accessoriesTotal,
    subTotal,
  } = getQuotationTotals(values);
  const [discount, setDiscount] = useState(0);
  const total = subTotal - discount;

  if (window.innerWidth >= 1100) {
    return <section className="desktop_quotation">
      <div className="container">
        <div className="preview">
          <div className="preview_header">
            <h2>Quotation Preview</h2>
          </div>
          <div className="preview_content">
            <table className="breakdown">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Amount (₦)</th>
                </tr>
              </thead>
              <tbody>
                <tr className='preview_content_group_header'>
                  <th>Aluminum Profiles</th>
                  <th>₦{profilesTotal.toLocaleString()}</th>
                </tr>
                {profiles && profiles !== null && profiles.map((obj, i) => {
                  return <tr className="preview_content_group" key={i}>
                    <td></td>
                    <td className="item_name">{obj.label}</td>

                    <td className="item_qty">{obj.qty ?? 1}</td>
                    
                    <td className="item_price">{obj.price.toLocaleString() ?? 0}</td>
                  </tr>
                })}
                <tr className='preview_content_group_header'>
                  <th>Glass</th>
                  <th>₦{glassTotal.toLocaleString()}</th>
                </tr>
                <tr className="preview_content_group">
                  <td></td>
                  <td className="item_name">{`${values.glassThickness} ${values.glassColor} glass`}
                  </td>
                  <td className="item_qty">{values.sashCount}</td>
                  <td className="item_price">
                    {glassPrice.toLocaleString() ?? 0.00}
                  </td>
                </tr>
                <tr className='preview_content_group_header'>
                  <th>Accesories</th>
                  <th>₦{accessoriesTotal.toLocaleString()}</th>
                </tr>
                {accessories && accessories.length > 0 && accessories.map((accessory, i) => {
                  return <tr className="preview_content_group" key={i}>
                    <td></td>

                    <td className="item_name">{accessory.label}</td>

                    <td className="item_qty">{accessory.qty}</td>

                    <td className='item_price'>{accessory.price.toLocaleString()}</td>
                  </tr>;
                })}
              </tbody>
            </table>

            <table className="totals">
              <tbody className="totals_subTotals">
                <tr>
                  <td>Subtotal</td>
                  <td>₦{subTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><label htmlFor="discount">Discount</label></td>

                  <td>
                    <input type="text" id="discount" value={`₦ ${discount.toLocaleString()}`} onChange={
                      (e) => setDiscount(parseFloat(e.target.value.replace('₦', '').replace(',', '').replace(' ', 0)))
                    } />
                  </td>
                </tr>
              </tbody>
              <tfoot className='totals_totals'>
                <tr>
                  <td>Total</td>
                  <td>₦{total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div className="quotation_warning">
              <i className="fa fa-info"></i>
              <p>Prices may change. Add to cart to save this quotation.</p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="addToCartButton">
            <i className="fa fa-shopping-cart"></i>
            Add to Cart
          </button>
          <button className="saveDraftButton">
            <i className="fa fa-save"></i>
            Save Draft
          </button>
        </div>
      </div>
    </section>;
  }

  function toggleDetails(e) {
    const details = e.target.closest('.details');
    details.classList.toggle('closed');
  }

  return <section className="quotation">
    <div className="container">
      <div className="quotation_summary">
        <div className="header">
          <h3>Window Summary</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Type</td>
              <td>{values.windowType.replaceAll('-', ' ')}</td>
            </tr>
            <tr>
              <td>Sashes</td>
              <td>{values.sashCount}</td>
            </tr>
            <tr>
              <td>Size (W × H)</td>
              <td>{`${values.width} × ${values.height} mm`}</td>
            </tr>
            <tr>
              <td>Orientation</td>
              <td>{values.orientation}</td>
            </tr>
            {values.windowType != "sliding-window" && <tr>
              <td>Opening</td>
              <td>{values.openingStyle}</td>
            </tr>}
           {values.windowType == "frameless-window" &&  <tr>
              <td>Matter Transom</td>
              <td>{values.matterTransom}</td>
            </tr>}
          </tbody>
        </table>
      </div>

      <div className="quotation_breakdown">
        <div className="header">
          <h3>Quotation Breakdown</h3>
        </div>
        <div className="quotation_profiles section">
          <div className="details">
            <button className="details_summary" onClick={(e)=>toggleDetails(e)}>
              <h4>Aluminum Profiles</h4>
              <span className="right">
                <span className="price">₦ {profilesTotal && profilesTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-up"></i>
              </span>
            </button>
            <div className="details_content">
              {profiles && profiles !== null && profiles.map((obj, i) => {
                return <div className="details_item" key={i}>
                  <span className="item_name">{obj.label}</span>
                  <span className="item_qty">{obj.qty ?? 1} × {obj.price.toLocaleString() ?? 0}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className="quotation_glass section">
          <div className="details">
            <button className="details_summary" onClick={(e)=>toggleDetails(e)}>
              <h4>Glass</h4>
              <span className="right">
                <span className="price">₦ {glassTotal && glassTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-up"></i>
              </span>
            </button>
            <div className="details_content">
              <div className="details_item">
                <span className="item_name">{`${values.glassThickness} ${values.glassColor} glass`}</span>
                <span className="item_qty">{values.sashCount} × {glassPrice.toLocaleString() ?? 0.00}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="quotation_accesories section">
          <div className="details">
            <button className="details_summary" onClick={(e)=>toggleDetails(e)}>
              <h4>Accesories</h4>
              <span className="right">
                <span className="price">₦ {accessoriesTotal && accessoriesTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-up"></i>
              </span>
            </button>
            <div className="details_content">
              {accessories && accessories.length > 0 && accessories.map((accessory, i) => {
                return <div className="details_item" key={i}>
                  <span className="item_name">{accessory.label}</span>
                  <span className="item_qty">{accessory.qty} × {accessory.price.toLocaleString()}</span>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="quotation_totals">
        <div className="subtotal">
          <span className="text">Subtotal</span>
          <span className="price">₦{subTotal.toLocaleString()}</span>
        </div>
        <div className="discount">
          <span className="text">Discount</span>
          <span className="price">
            <input type="text" id="discount" value={`₦ ${discount.toLocaleString()}`} onChange={
              (e) => setDiscount(parseFloat(e.target.value.replace('₦', '').replace(',', '').replace(' ', 0)))
            } />
          </span>
        </div>
        <div className="total">
          <span className="text">Total</span>
          <span className="price">₦ {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="quotation_warning">
        <i className="fa fa-info"></i>
        <p>Prices may change. Add to cart to save this quotation.</p>
      </div>
    </div>
  </section>;
}
