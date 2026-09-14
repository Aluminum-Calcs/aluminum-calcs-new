import { useContext, useEffect } from "react";
import { PageContext } from "../context/PageContext.jsx";
import "../scss/pages/Settings.scss";

const layoutOptions = [
  { key: "includeHeader", label: "Show header", detail: "Keep the top bar visible while you work." },
  { key: "includeAside", label: "Show navigation", detail: "Make the main navigation available from the menu." },
  { key: "includeFooter", label: "Show footer", detail: "Display contact and attribution details at the bottom." },
];

export default function Settings() {
  const { theme, setTheme, preferences, setPreferences, user, handleUser } = useContext(PageContext);

  useEffect(() => {
    document.title = "Aluminum Calcs | Settings";
  }, []);

  function handlePreferenceChange(key) {
    setPreferences((previous) => ({ ...previous, [key]: !previous[key] }));
  }

  function resetLayout() {
    setPreferences({ includeHeader: true, includeAside: true, includeFooter: true });
  }

  return (
    <main className="settings-page">
      <section className="settings-hero">
        <div className="container">
          <div>
            <p className="eyebrow">Workspace controls</p>
            <h1>Settings</h1>
            <p className="hero-copy">Tune Aluminum Calcs to feel like your workbench.</p>
          </div>
          <div className="hero-mark" aria-hidden="true"><i className="fa fa-sliders" /></div>
        </div>
      </section>

      <section className="settings-content">
        <div className="container settings-grid">
          <section className="settings-card identity-card">
            <div className="card-heading">
              <div className="card-icon"><i className="fa fa-user" aria-hidden="true" /></div>
              <div><p className="eyebrow">Your workspace</p><h2>Profile</h2></div>
            </div>
            <p className="card-description">This name appears in your dashboard greeting.</p>
            <label className="settings-label" htmlFor="display-name">Display name</label>
            <input
              id="display-name"
              className="settings-input"
              type="text"
              value={user.name}
              onChange={(event) => handleUser("name", event.target.value)}
              placeholder="Enter your name"
            />
            <div className="profile-preview">
              <span className="avatar">{user.name?.charAt(0).toUpperCase() || "A"}</span>
              <span>Welcome, <strong>{user.name || "there"}</strong></span>
            </div>
          </section>

          <section className="settings-card appearance-card">
            <div className="card-heading">
              <div className="card-icon"><i className="fa fa-adjust" aria-hidden="true" /></div>
              <div><p className="eyebrow">Visual preference</p><h2>Appearance</h2></div>
            </div>
            <p className="card-description">Choose the mode that works best for your environment.</p>
            <div className="theme-options" role="radiogroup" aria-label="Color theme">
              <button type="button" className={theme === "light-mode" ? "selected" : ""} onClick={() => setTheme("light-mode")} aria-pressed={theme === "light-mode"}>
                <i className="fa fa-sun-o" aria-hidden="true" /><span>Light</span>{theme === "light-mode" && <i className="fa fa-check" aria-hidden="true" />}
              </button>
              <button type="button" className={theme === "dark-mode" ? "selected" : ""} onClick={() => setTheme("dark-mode")} aria-pressed={theme === "dark-mode"}>
                <i className="fa fa-moon-o" aria-hidden="true" /><span>Dark</span>{theme === "dark-mode" && <i className="fa fa-check" aria-hidden="true" />}
              </button>
            </div>
          </section>

          <section className="settings-card layout-card">
            <div className="card-heading">
              <div className="card-icon"><i className="fa fa-window-maximize" aria-hidden="true" /></div>
              <div><p className="eyebrow">Interface</p><h2>Layout</h2></div>
            </div>
            <p className="card-description">Show or hide supporting parts of the application.</p>
            <div className="preference-list">
              {layoutOptions.map((option) => (
                <label className="preference" key={option.key}>
                  <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                  <input type="checkbox" checked={preferences[option.key]} onChange={() => handlePreferenceChange(option.key)} />
                  <span className="switch" aria-hidden="true" />
                </label>
              ))}
            </div>
            <button className="text-button" type="button" onClick={resetLayout}><i className="fa fa-refresh" aria-hidden="true" /> Reset layout</button>
          </section>

          <section className="settings-card about-card">
            <div className="card-heading">
              <div className="card-icon"><i className="fa fa-info" aria-hidden="true" /></div>
              <div><p className="eyebrow">About this tool</p><h2>Aluminum Calcs</h2></div>
            </div>
            <p className="card-description">A focused workspace for aluminum window calculations, glass pricing, and quotations.</p>
            <div className="about-meta"><span>Version</span><strong>2026.1</strong></div>
            <div className="about-meta"><span>Theme</span><strong>{theme === "dark-mode" ? "Dark" : "Light"}</strong></div>
          </section>
        </div>
      </section>
    </main>
  );
}