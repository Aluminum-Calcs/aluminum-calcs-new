import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router';

import { PageContext } from '../context/PageContext';
import InputField from '../components/InputField';

import "../scss/pages/SignIn.scss";

export default function SignIn() {
  const {
    user,
    handleUser,
    currentPage,
    setCurrentPage,
    setPreferences
  } = useContext(PageContext);

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  })

  function handleFormData(key, value) {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }))
  }


  useEffect(() => {
    setCurrentPage('');
    setPreferences(prev => ({
      ...prev,
      // includeHeader: false,
      includeFooter: false,
      includeAside: false,
    }))
  }, [currentPage]);

  return (<main className="SignIn-page">
    <section className="welcome">
      <div className="container">
        <h1>Welcome!</h1>
        <p>Sign in to continue calculating, estimating and managing your aluminum projects</p>
      </div>
    </section>
    <section className="SignIn-form">
      <form class="container">
        <InputField
          inputType="text"
          label="Your Name"
          value={formData.name}
          onChange={handleFormData}
          placeholder='Type here ...'
        />
        <InputField
          inputType="password"
          label="Password"
          value={formData.password}
          onChange={handleFormData}
        />
      </form>

      <NavLink className="SignIn-button "><i className="fa fa-enter"></i>Sign In</NavLink>
    </section>
  </main>);
}