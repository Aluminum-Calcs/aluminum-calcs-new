import { useContext, useState } from "react";
import EhiEjakhian from "../assets/images/ehiejakhian.jpg";
import "../scss/components/Footer.scss";
import { PageContext } from "../context/PageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpwork, faDiscord } from "@fortawesome/free-brands-svg-icons";

export const profileLinks = [
  {
    ref:"+2348142340182",
    id:"phone-link",
    iconClass:"fa fa-phone",
  },
  {
    ref:"https://pin.it/6eYrRLUYm",
    id:"pinterest-link", iconClass:"fa fa-pinterest",
  },
  {
    ref:"https://www.linkedin.com/in/ehi-ejakhian-ba220b388/",
    id:"linkedIn-link",
    iconClass:"fa fa-linkedin"
  },
  {
    ref: "https://wa.me/+2348142340182?text=Hello%20Ehi.%20I%20checked%20your%20website.%20",
    id: "whatsapp-link",
    iconClass: "fa fa-whatsapp"
  },
  { 
    ref:"https://discord.com/users/1427691425058783343", 
    id:"discord-link", 
    iconClass: "fa fa-discord"
  },
  { 
    ref:"https://www.upwork.com/freelancers/~01287f253aaa0dc476?mp_source=share", 
    id:"upwork-link", 
    iconClass: "fa fa-upwork"
  },
  { 
    ref:"https://github.com/Ehiejakhian", 
    id:"github-link", 
    iconClass: "fa fa-github"
  },
];

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
          {profileLinks && profileLinks.map((link, i) => {
            return <a href={link.ref} className={link.id} key={i}>
              <LinkIcon link={link}/>
            </a>;
          })}
        </div>
        <div className="copyright"><p>© 2026 Ehi Ejakhian. All rights reserved.</p></div>
      </div>
   </footer>
  )
}

function LinkIcon({ link }) {
  if (link.id.includes('upwork')) return <FontAwesomeIcon icon={faUpwork} />;
  else if (link.id.includes('discord')) return <FontAwesomeIcon icon={faDiscord} />;
  else return <i className={link.iconClass} />;
}

export default Footer;