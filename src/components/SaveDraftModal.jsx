import { useState, useContext } from 'react';

import { QuoteContext } from '../context/QuoteContext.jsx';

import '../scss/components/SaveDraftModal.scss';

import { writeStorageItem } from '../js/glass-price/storage.js';

export default function SaveDraftModal({
  values,
  storageKey
}) {
  
  const [quoteHeader, setQuoteHeader] = useState({
    quoteName: "Mr John's residence - Living room window",
    quoteNotes: "Add any notes about this quote..."
  });
  const {isSaveDraftVisible, setSaveDraftVisibility} = useContext(QuoteContext);


  function handleInputChange(e) {
   setQuoteHeader((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  function finallySave() {
    const toSave = {
      quoteHeader: quoteHeader,
      data: values,
    }

    writeStorageItem(storageKey, toSave);
  };

  return (
    <section className={
      isSaveDraftVisible ? "saveDraftModal show" : "saveDraftModal"
    }>
      <button className="overlay" onClick={() => setSaveDraftVisibility(false)}></button>

      <div className="container">
        <div className="container_header">
          <h3>
            Save <span className="special">Draft</span>
          </h3>
          <button id="closeModal" onClick={() => setSaveDraftVisibility(false)}>
            <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
            </svg>
          </button>
        </div>

        <form className='saveDraftModal_form'>
          <label htmlFor="quoteName">Name your quote</label>
          <input
            type='text'
            id="quoteName"
            value={quoteHeader.quoteName}
            placeholder="Mr J's ..."
            onChange={e=> handleInputChange(e)}
          />

          <label htmlFor="quoteNotes">Add notes</label>
          <textarea
            id="quoteNotes"
            value={quoteHeader.quoteNotes}
            placeholder="Add any notes about this quote..."
            onChange={e=>handleInputChange(e)}
          />
        </form>

        <button
          className="saveDraftButton"
          onClick={finallySave}
        >
          <i className="fa fa-save"></i>
          Save Draft
        </button>
      </div>
    </section>
  )
}

