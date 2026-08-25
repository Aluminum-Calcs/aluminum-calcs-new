import '../scss/components/QuotationSummary.scss';
import { getQuotationTotals } from '../js/Quote/quotationTotals.js';

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
  const total = subTotal;

  if (window.innerWidth >= 1100) {
    return <section className="quotation">
      <div className="container">

        <div className="quotation_breakdown">
          <div className="header">
            <h3>Quotation Breakdown</h3>
          </div>
          <div className="quotation_profiles section">
            <div className="details">
              <button className="details_summary">
                <h4>Aluminum Profiles</h4>
                <span className="right">
                  <span className="price">₦ {profilesTotal && profilesTotal.toLocaleString()}</span>
                  <i className="fa fa-chevron-down"></i>
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
              <button className="details_summary">
                <h4>Glass</h4>
                <span className="right">
                  <span className="price">₦ {glassTotal && glassTotal.toLocaleString()}</span>
                  <i className="fa fa-chevron-down"></i>
                </span>
              </button>
              <div className="details_content">
                <div className="details_item">
                  <span className="item_name">Profile 1</span>
                  <span className="item_qty">{values.sashCount} × {glassPrice.toLocaleString() ?? 0.00}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="quotation_accesories section">
            <div className="details">
              <button className="details_summary">
                <h4>Accesories</h4>
                <span className="right">
                  <span className="price">₦ {accessoriesTotal && accessoriesTotal.toLocaleString()}</span>
                  <i className="fa fa-chevron-down"></i>
                </span>
              </button>
              <div className="details_content">
                {accessories && accessories.length > 0 && accessories.map((accessory, i) => {
                  return <div className="details_item" key={i}>
                    <span className="item_name">{accessory.label}</span>
                    <span className="item_qty">{accessory.qty * values.sashCount} × {accessory.price.toLocaleString()}</span>
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
            <span className="price">- ₦0</span>
          </div>
          <div className="total">
            <span className="text">Total</span>
            <span className="price">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="quotation_warning">
          <i className="fa fa-info"></i>
          <p>Prices may change. Add to cart to save this quotation.</p>
        </div>
      </div>
    </section>;
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
                <span className="price">₦ {profilesTotal && profilesTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-down"></i>
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
            <button className="details_summary">
              <h4>Glass</h4>
              <span className="right">
                <span className="price">₦ {glassTotal && glassTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </button>
            <div className="details_content">
              <div className="details_item">
                <span className="item_name">Profile 1</span>
                <span className="item_qty">{values.sashCount} × {glassPrice.toLocaleString() ?? 0.00}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="quotation_accesories section">
          <div className="details">
            <button className="details_summary">
              <h4>Accesories</h4>
              <span className="right">
                <span className="price">₦ {accessoriesTotal && accessoriesTotal.toLocaleString()}</span>
                <i className="fa fa-chevron-down"></i>
              </span>
            </button>
            <div className="details_content">
              {accessories && accessories.length > 0 && accessories.map((accessory, i) => {
                return <div className="details_item" key={i}>
                  <span className="item_name">{accessory.label}</span>
                  <span className="item_qty">{accessory.qty * values.sashCount} × {accessory.price.toLocaleString()}</span>
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
          <span className="price">- ₦0</span>
        </div>
        <div className="total">
          <span className="text">Total</span>
          <span className="price">₦{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="quotation_warning">
        <i className="fa fa-info"></i>
        <p>Prices may change. Add to cart to save this quotation.</p>
      </div>
    </div>
  </section>;
}
