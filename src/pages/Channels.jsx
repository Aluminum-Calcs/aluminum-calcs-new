import { useState, useContext, useEffect } from 'react';
import { PageContext } from '../context/PageContext';
import "../scss/pages/Channels.scss";

function Channels() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Channels');
  });

  return (
    <main className="channels-page">
      <section className="intro">
        <h1>Aluminum Channels and their names</h1>
        <p>Learn more about aluminum channels and their names as they are known in Nigeria and other parts of the world.</p>
        <a href="#channel-grid"><i className="fa fa-chevron-down"></i></a>
      </section>

      <section className="channels" id="channel-grid">
        <div className="channels__grid">
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 0V0.5M13.5 16H0.5V5.5M13.5 16V5.5M13.5 16V21.5M0.5 5.5H13.5M0.5 5.5V0.5M13.5 5.5V0.5H9M0.5 0.5H5M3.5 16.5V18M11 16.5V18M12 25V26.5H13.5V21.5M13.5 21.5H12V23"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Width</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 15.5339H0.5V5.03392M13.5 15.5339V5.03392M13.5 15.5339V21.0339M0.5 5.03392H13.5M0.5 5.03392C0.5 3.36725 1.4 0.13392 5 0.53392M13.5 5.03392C13.5 3.36725 12.6 0.13392 9 0.53392M3.5 16.0339V17.5339M11 16.0339V17.5339M12 24.5339V26.0339H13.5V21.0339M13.5 21.0339H12V22.5339" />
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Decurve</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0V0.5M0.5 5.5V16H4M0.5 5.5H13.5M0.5 5.5V0.5M13.5 5.5V16V21.5M13.5 5.5V0.5H9H0.5M3.5 16.5V18M12 25V26.5H13.5V21.5M13.5 21.5H12V23"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Height</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="10" height="27" viewBox="0 0 10 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="9" height="17"/>
              <path d="M0.5 15.5V26H3V24M9.5 15.5V26H7V24"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Lock Stile</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Sliding Windows</span>
                <span>Sliding Doors</span>
                <span>Show glass</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 0V0.5M13.5 16H0.5V4M13.5 16V4M13.5 16V21.5M0.5 4H13.5M0.5 4V0.5M13.5 4V0.5H9M0.5 0.5H5M3.5 16.5V18M11 16.5V18M12 25V26.5H13.5V21.5M13.5 21.5H12V23"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Nine-Nine</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="17" height="5" viewBox="0 0 17 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7857 4.5V0.5H0.5V4.5H10.7857ZM10.7857 4.5H14.2143V0.5H16.5" />
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>1132</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="path-1-inside-1_12_42" fill="white">
              <path d="M11 1H13V2H10V1H1V7H2V6H7V7H13.5V7.76758L11.7773 8.91602L11.2227 8.08398L11.3486 8H6V7H3V8H0V0H11V1Z"/>
              </mask>
              <path d="M11 1H13V2H10V1H1V7H2V6H7V7H13.5V7.76758L11.7773 8.91602L11.2227 8.08398L11.3486 8H6V7H3V8H0V0H11V1Z" fill="black"/>
                <path d="M11 1H10V2H11V1ZM13 1H14V0H13V1ZM13 2V3H14V2H13ZM10 2H9V3H10V2ZM10 1H11V0H10V1ZM1 1V0H0V1H1ZM1 7H0V8H1V7ZM2 7V8H3V7H2ZM2 6V5H1V6H2ZM7 6H8V5H7V6ZM7 7H6V8H7V7ZM13.5 7H14.5V6H13.5V7ZM13.5 7.76758L14.0547 8.59963L14.5 8.30276V7.76758H13.5ZM11.7773 8.91602L10.9453 9.47072L11.5 10.3028L12.332 9.74807L11.7773 8.91602ZM11.2227 8.08398L10.668 7.25193L9.83591 7.80663L10.3906 8.63868L11.2227 8.08398ZM11.3486 8L11.9033 8.83205L14.6514 7H11.3486V8ZM6 8H5V9H6V8ZM6 7H7V6H6V7ZM3 7V6H2V7H3ZM3 8V9H4V8H3ZM0 8H-1V9H0V8ZM0 0V-1H-1V0H0ZM11 0H12V-1H11V0ZM11 1V2H13V1V0H11V1ZM13 1H12V2H13H14V1H13ZM13 2V1H10V2V3H13V2ZM10 2H11V1H10H9V2H10ZM10 1V0H1V1V2H10V1ZM1 1H0V7H1H2V1H1ZM1 7V8H2V7V6H1V7ZM2 7H3V6H2H1V7H2ZM2 6V7H7V6V5H2V6ZM7 6H6V7H7H8V6H7ZM7 7V8H13.5V7V6H7V7ZM13.5 7H12.5V7.76758H13.5H14.5V7H13.5ZM13.5 7.76758L12.9453 6.93553L11.2226 8.08397L11.7773 8.91602L12.332 9.74807L14.0547 8.59963L13.5 7.76758ZM11.7773 8.91602L12.6094 8.36132L12.0547 7.52928L11.2227 8.08398L10.3906 8.63868L10.9453 9.47072L11.7773 8.91602ZM11.2227 8.08398L11.7774 8.91603L11.9033 8.83205L11.3486 8L10.7939 7.16795L10.668 7.25193L11.2227 8.08398ZM11.3486 8V7H6V8V9H11.3486V8ZM6 8H7V7H6H5V8H6ZM6 7V6H3V7V8H6V7ZM3 7H2V8H3H4V7H3ZM3 8V7H0V8V9H3V8ZM0 8H1V0H0H-1V8H0ZM0 0V1H11V0V-1H0V0ZM11 0H10V1H11H12V0H11Z" fill="black" mask="url(#path-1-inside-1_12_42)"/>
              </svg>

            </div>
            <div className="channels__grid__each__content">
              <h3>Show glass bit</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 0.5V16.4912C7.7847 16.2318 0.768198 9.2153 0.508789 0.5H16.5Z" />
              </svg>

            </div>
            <div className="channels__grid__each__content">
              <h3>40-40</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="37" height="20" viewBox="0 0 37 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.11928 1H1.61928V6H17.1193V4H18.1193V6H33.1193V4H36.1193V5.5H35.1193V5H34.1193V7H25.6193V17.1182C26.1437 17.3807 26.409 18.0387 26.1193 18.6182L25.6779 19.5H24.5607L24.1193 18.6182C23.8296 18.0388 24.095 17.3807 24.6193 17.1182V7H12.1193V17.1182C12.6437 17.3807 12.909 18.0387 12.6193 18.6182L12.1779 19.5H11.0607L10.6193 18.6182C10.3296 18.0388 10.595 17.3807 11.1193 17.1182V7H1.61928V19.5L0.672013 19.7236L0.119278 18.6182C-0.17037 18.0388 0.0949592 17.3807 0.619278 17.1182V0H3.11928V1Z" fill="#ccc"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Track</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="33" height="20" viewBox="0 0 33 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 0V19.1875H16.5V10H32V0V19.1875" />
              <mask id="path-2-inside-1_12_76" fill="white">
              <path d="M18.8254 17.6129C18.6823 17.3713 18.4621 17.185 18.2001 17.0838C17.9381 16.9827 17.6498 16.9728 17.3815 17.0556C17.1132 17.1383 16.8805 17.3091 16.7211 17.5402C16.5616 17.7713 16.4847 18.0494 16.5025 18.3296C16.5204 18.6098 16.6321 18.8758 16.8196 19.0848C17.0072 19.2938 17.2596 19.4336 17.5363 19.4816C17.8129 19.5296 18.0977 19.4831 18.3447 19.3495C18.5916 19.2159 18.7864 19.0031 18.8977 18.7453L18.4004 18.5307C18.3374 18.6768 18.227 18.7974 18.087 18.8731C17.947 18.9488 17.7857 18.9752 17.6289 18.948C17.4721 18.9208 17.329 18.8416 17.2227 18.7231C17.1165 18.6047 17.0532 18.4539 17.043 18.2951C17.0329 18.1363 17.0765 17.9787 17.1669 17.8477C17.2573 17.7167 17.3891 17.62 17.5411 17.5731C17.6932 17.5262 17.8566 17.5318 18.0051 17.5891C18.1535 17.6464 18.2784 17.752 18.3595 17.8889L18.8254 17.6129Z"/>
              </mask>
              <path d="M18.8254 17.6129C18.6823 17.3713 18.4621 17.185 18.2001 17.0838C17.9381 16.9827 17.6498 16.9728 17.3815 17.0556C17.1132 17.1383 16.8805 17.3091 16.7211 17.5402C16.5616 17.7713 16.4847 18.0494 16.5025 18.3296C16.5204 18.6098 16.6321 18.8758 16.8196 19.0848C17.0072 19.2938 17.2596 19.4336 17.5363 19.4816C17.8129 19.5296 18.0977 19.4831 18.3447 19.3495C18.5916 19.2159 18.7864 19.0031 18.8977 18.7453L18.4004 18.5307C18.3374 18.6768 18.227 18.7974 18.087 18.8731C17.947 18.9488 17.7857 18.9752 17.6289 18.948C17.4721 18.9208 17.329 18.8416 17.2227 18.7231C17.1165 18.6047 17.0532 18.4539 17.043 18.2951C17.0329 18.1363 17.0765 17.9787 17.1669 17.8477C17.2573 17.7167 17.3891 17.62 17.5411 17.5731C17.6932 17.5262 17.8566 17.5318 18.0051 17.5891C18.1535 17.6464 18.2784 17.752 18.3595 17.8889L18.8254 17.6129Z" fill="black"  stroke-width="4" mask="url(#path-2-inside-1_12_76)"/>
              <mask id="path-3-inside-2_12_76" fill="white">
              <path d="M27.2421 7.70938C26.9929 7.83874 26.7945 8.04824 26.6789 8.30413C26.5633 8.56001 26.5372 8.84736 26.6048 9.11988C26.6725 9.39241 26.8299 9.63422 27.0517 9.80636C27.2735 9.9785 27.5469 10.0709 27.8276 10.0688C28.1084 10.0666 28.3803 9.96999 28.5995 9.79446C28.8186 9.61893 28.9723 9.37472 29.0357 9.10119C29.0992 8.82766 29.0686 8.54074 28.9491 8.28666C28.8296 8.03259 28.628 7.82617 28.3768 7.70065L28.1347 8.18512C28.277 8.25626 28.3913 8.37324 28.459 8.51723C28.5268 8.66122 28.5441 8.82383 28.5081 8.97884C28.4722 9.13386 28.3851 9.27226 28.2609 9.37174C28.1367 9.47122 27.9826 9.52598 27.8235 9.52721C27.6644 9.52843 27.5095 9.47604 27.3837 9.37849C27.258 9.28093 27.1688 9.14389 27.1305 8.98944C27.0922 8.835 27.1069 8.67214 27.1725 8.52713C27.238 8.38211 27.3504 8.26338 27.4917 8.19007L27.2421 7.70938Z"/>
              </mask>
              <path d="M27.2421 7.70938C26.9929 7.83874 26.7945 8.04824 26.6789 8.30413C26.5633 8.56001 26.5372 8.84736 26.6048 9.11988C26.6725 9.39241 26.8299 9.63422 27.0517 9.80636C27.2735 9.9785 27.5469 10.0709 27.8276 10.0688C28.1084 10.0666 28.3803 9.96999 28.5995 9.79446C28.8186 9.61893 28.9723 9.37472 29.0357 9.10119C29.0992 8.82766 29.0686 8.54074 28.9491 8.28666C28.8296 8.03259 28.628 7.82617 28.3768 7.70065L28.1347 8.18512C28.277 8.25626 28.3913 8.37324 28.459 8.51723C28.5268 8.66122 28.5441 8.82383 28.5081 8.97884C28.4722 9.13386 28.3851 9.27226 28.2609 9.37174C28.1367 9.47122 27.9826 9.52598 27.8235 9.52721C27.6644 9.52843 27.5095 9.47604 27.3837 9.37849C27.258 9.28093 27.1688 9.14389 27.1305 8.98944C27.0922 8.835 27.1069 8.67214 27.1725 8.52713C27.238 8.38211 27.3504 8.26338 27.4917 8.19007L27.2421 7.70938Z" fill="black"  stroke-width="4" mask="url(#path-3-inside-2_12_76)"/>
              <mask id="path-4-inside-3_12_76" fill="white">
              <path d="M3.17183 16.6587C2.92417 16.791 2.72826 17.0029 2.61567 17.2601C2.50309 17.5173 2.4804 17.805 2.55124 18.0767C2.62209 18.3484 2.78235 18.5883 3.0062 18.7578C3.23006 18.9273 3.50446 19.0165 3.78519 19.0111C4.06593 19.0056 4.33664 18.9057 4.55371 18.7276C4.77078 18.5495 4.92155 18.3035 4.98174 18.0292C5.04193 17.755 5.00803 17.4684 4.88549 17.2158C4.76296 16.9632 4.55893 16.7591 4.30629 16.6366L4.06994 17.1239C4.21312 17.1933 4.32875 17.309 4.39819 17.4521C4.46764 17.5953 4.48685 17.7577 4.45274 17.9131C4.41863 18.0686 4.33318 18.208 4.21016 18.3089C4.08715 18.4099 3.93372 18.4665 3.77462 18.4696C3.61552 18.4727 3.46001 18.4221 3.33315 18.3261C3.20628 18.23 3.11546 18.094 3.07531 17.94C3.03516 17.786 3.04802 17.623 3.11182 17.4773C3.17563 17.3315 3.28666 17.2114 3.42702 17.1364L3.17183 16.6587Z"/>
              </mask>
              <path d="M3.17183 16.6587C2.92417 16.791 2.72826 17.0029 2.61567 17.2601C2.50309 17.5173 2.4804 17.805 2.55124 18.0767C2.62209 18.3484 2.78235 18.5883 3.0062 18.7578C3.23006 18.9273 3.50446 19.0165 3.78519 19.0111C4.06593 19.0056 4.33664 18.9057 4.55371 18.7276C4.77078 18.5495 4.92155 18.3035 4.98174 18.0292C5.04193 17.755 5.00803 17.4684 4.88549 17.2158C4.76296 16.9632 4.55893 16.7591 4.30629 16.6366L4.06994 17.1239C4.21312 17.1933 4.32875 17.309 4.39819 17.4521C4.46764 17.5953 4.48685 17.7577 4.45274 17.9131C4.41863 18.0686 4.33318 18.208 4.21016 18.3089C4.08715 18.4099 3.93372 18.4665 3.77462 18.4696C3.61552 18.4727 3.46001 18.4221 3.33315 18.3261C3.20628 18.23 3.11546 18.094 3.07531 17.94C3.03516 17.786 3.04802 17.623 3.11182 17.4773C3.17563 17.3315 3.28666 17.2114 3.42702 17.1364L3.17183 16.6587Z" fill="black"  stroke-width="4" mask="url(#path-4-inside-3_12_76)"/>
              </svg>

            </div>
            <div className="channels__grid__each__content">
              <h3>Side Jamb</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
          <div className="channels__grid__each">
            <div className="channels__grid__each__img">
              <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0V0.5M0.5 5.5V16H4M0.5 5.5H13.5M0.5 5.5V0.5M13.5 5.5V16V21.5M13.5 5.5V0.5H9H0.5M3.5 16.5V18M12 25V26.5H13.5V21.5M13.5 21.5H12V23"/>
              </svg>
            </div>
            <div className="channels__grid__each__content">
              <h3>Interlock</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
              <div className="tags">
                <span>Casement Windows</span>
                <span>Toilet Doors</span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}

export function Material({}) {
  return <div className="channels__grid__each">
    <div className="channels__grid__each__img">
      <svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 0V0.5M0.5 5.5V16H4M0.5 5.5H13.5M0.5 5.5V0.5M13.5 5.5V16V21.5M13.5 5.5V0.5H9H0.5M3.5 16.5V18M12 25V26.5H13.5V21.5M13.5 21.5H12V23" />
      </svg>
    </div>
    <div className="channels__grid__each__content">
      <h3>Interlock</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facilis itaque eum?</p>
      <div className="tags">
        <span>Casement Windows</span>
        <span>Toilet Doors</span>
      </div>
    </div>
  </div>;
}

export default Channels;