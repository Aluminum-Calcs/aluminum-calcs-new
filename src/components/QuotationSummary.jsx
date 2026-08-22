import '../scss/components/QuotationSummary.scss';
import { computeResult } from '../js/stile-calc/main.js';
import { calculateGlassPrice } from '../js/glass-price/calculation.js';
import { CheckGlassSheetPrice, getWindowAccessories } from '../js/global.js';
import { useState } from 'react';

export default function Quotation(props) {
  const [discount, setDiscount] = useState(0);
  const { values } = props;

  
  let breakdown = computeResult('all', values.windowType, values.sashCount, values.width, values.height);
  
  let profiles = breakdown.filter(e => e.category === 'profile');
  let profilesTotal = 0;
  profiles.forEach((profile) => {
    profilesTotal += profile.price;
  });

  let glassPrice = calculateGlassPrice({
    width: values.width,
    height: values.height,
    quantity: 1,
    fullSheetPrice: CheckGlassSheetPrice(values.glassThickness, values.glassColor),
  });
  glassPrice = glassPrice.totalPrice;
  let glassTotal = values.sashCount * glassPrice;

  let accessories = getWindowAccessories(values.windowType);
  let accessoriesTotal = 0;
  accessories.forEach(accessory => {
    accessoriesTotal += accessory.price;
  });

  let subTotal = profilesTotal + glassTotal + accessoriesTotal;
  let total = subTotal - discount;

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
              <td>{values.windowType.replace('-', ' ')}</td>
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
            <tr>
              <td>Opening</td>
              <td>{values.openingStyle}</td>
            </tr>
            <tr>
              <td>Matter Transom</td>
              <td>{values.matterTransom}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="quotation_breakdown">
        <div className="header">
          <h3>Quotation Breakdown</h3>
        </div>
        <div className="quotation_profiles section">
          <div className="details">
            <button className="details_summary">
              <h4>Aluminum Profiles</h4>
              <span className="right">
                <span className="price">₦ {profilesTotal && profilesTotal}</span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </button>
            <div className="details_content">
              {profiles && profiles !== null && profiles.map((obj, i) => {
                return <div className="details_item" key={i}>
                  <span className="item_name">{obj.label}</span>
                  <span className="item_qty">{obj.qty ?? 1} × {obj.price ?? 0}</span>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className="quotation_glass section">
          <div className="details">
            <button className="details_summary">
              <h4>Glass</h4>
              <span className="right">
                <span className="price">₦ {glassTotal && glassTotal}</span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </button>
            <div className="details_content">
              <div className="details_item">
                <span className="item_name">Profile 1</span>
                <span className="item_qty">{values.sashCount} × {glassPrice ?? 0.00}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="quotation_accesories section">
          <div className="details">
            <button className="details_summary">
              <h4>Accesories</h4>
              <span className="right">
                <span className="price">₦ {accessoriesTotal && accessoriesTotal}</span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </button>
            <div className="details_content">
              {accessories && accessories.length > 0 && accessories.map((accessory, i) => {
                return <div className="details_item" key={i}>
                  <span className="item_name">{accessory.label}</span>
                  <span className="item_qty">{accessory.qty * values.sashCount} × {accessory.price}</span>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="quotation_totals">
        <div className="subtotal">
          <span className="text">Subtotal</span>
          <span className="price">₦{subTotal}</span>
        </div>
        <div className="discount">
          <span className="text">Discount</span>
          <span className="price">- ₦{discount}</span>
        </div>
        <div className="total">
          <span className="text">Total</span>
          <span className="price">₦{total}</span>
        </div>
      </div>

      <div className="quotation_warning">
        <i className="fa fa-info"></i>
        <p>Prices may change. Add to cart to save this quotation.</p>
      </div>
    </div>
  </section>;
}
