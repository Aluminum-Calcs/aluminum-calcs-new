import { useState, useContext, useEffect } from 'react';

import { PageContext } from '../context/PageContext';

import "../scss/pages/SignIn.scss";
import InputField from '../components/InputField';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignIn() {
  const { setCurrentPage, setPreferences } = useContext(PageContext);
  const [authMode, setAuthMode] = useState('sign-in');
  const [formData, setFormData] = useState(initialForm);

  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  useEffect(() => {
    setCurrentPage('Sign In');
    setPreferences((previous) => ({
      ...previous,
      includeFooter: false,
      includeAside: false,
    }));
  }, [setCurrentPage, setPreferences]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <div className="container auth-intro__inner">
          <div>
            <p className="eyebrow">Account access</p>
            <h1>Welcome back.</h1>
            <p className="hero-copy">Sign in to resume your estimates, quotations, and aluminum workflow.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-lock" />
          </div>
        </div>
      </section>

      <section className="auth-shell">
        <div className="container auth-shell__grid">
          <aside className="auth-panel auth-panel--brand">
            <div className="card-heading">
              <div className="card-icon"><i className="fa fa-briefcase" aria-hidden="true" /></div>
              <div>
                <p className="eyebrow">Workspace</p>
                <h2>Aluminum Calcs</h2>
              </div>
            </div>

            <p className="card-description">
              Keep your calculations, cart values, and quote notes in one focused working space.
            </p>

            <ul className="feature-list">
              <li><i className="fa fa-check" aria-hidden="true" /> Fast quote building</li>
              <li><i className="fa fa-check" aria-hidden="true" /> Glass and profile calc access</li>
              <li><i className="fa fa-check" aria-hidden="true" /> Save your preferred layout</li>
            </ul>
          </aside>

          <section className="auth-panel auth-panel--form">
            <div className="auth-tabs" role="tablist" aria-label="Authentication form mode">
              <button
                type="button"
                className={authMode === 'sign-in' ? 'active' : ''}
                onClick={() => setAuthMode('sign-in')}
              >
                Sign in
              </button>
              <button
                type="button"
                className={authMode === 'sign-up' ? 'active' : ''}
                onClick={() => setAuthMode('sign-up')}
              >
                Sign up
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {authMode === 'sign-up' && (
                <InputField
                  label="Full name"
                  inputType="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder='Enter your full name'
                  onChange={handleFormData}
                />
              )}

              <InputField
                label={authMode === 'sign-up' ? 'Email address' : 'Username or email'}
                inputType='email'
                name="email"
                value={formData.email}
                onChange={handleFormData}
                placeholder={authMode === 'sign-up' ? 'name@example.com' : 'Type your email or username'}
              />

              <InputField
                label="Password"
                inputType='password'
                name="password"
                value={formData.password}
                onChange={handleFormData}
                placeholder={authMode === 'sign-up'? "Create a strong password":"Enter your password"}
              />

              {authMode === 'sign-up' && (
                <InputField
                  label="Confirm Password"
                  inputType='password'
                  name="password"
                  value={formData.confirmPassword}
                  onChange={handleFormData}
                  placeholder="Repeat your password"
                />
              )}

              {authMode === 'sign-in' && (
                <div className="form-row">
                  <label className="check-row">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-button">Forgot password?</button>
                </div>
              )}

              <button type="submit" className="primary-btn">
                <i className="fa fa-arrow-right" aria-hidden="true" />
                {authMode === 'sign-in' ? 'Sign in to dashboard' : 'Create account'}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}