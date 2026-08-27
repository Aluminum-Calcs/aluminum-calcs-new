import { useContext, useState } from "react";
import EhiEjakhian from "../assets/images/ehiejakhian.jpg";
import "../scss/components/Footer.scss";
import { PageContext } from "../context/PageContext";

function Footer() {
  const {preferences} = useContext(PageContext);

  if (preferences.includeFooter == false) return;

  return (
    <footer>
      <div className="container">
        <div className="developer">
          <img src={EhiEjakhian} alt="Ehi Ejakhian" />
          <div className="developer-info">
            <p>Designed and developed by <a href="https://ehiejakhian.github.io/" target="_blank">Ehi Ejakhian</a>.</p>
          </div>
        </div>
        <div className="social-links">
          <a href="#" className="github"><i className="fa fa-github"></i></a>
          <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
          <a href="#" className="whatsapp"><i className="fa fa-whatsapp"></i></a>
          <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
          <a href="#" className="mail"><i className="fa fa-envelope-o"></i></a>
          <a href="#" className="phone"><i className="fa fa-phone"></i></a>
        </div>
        <div className="copyright"><p>© 2026 Ehi Ejakhian. All rights reserved.</p></div>
      </div>
   </footer>
  )
}

export default Footer;