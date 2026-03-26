import './App.css'

const focusAreas = ['Custom software', 'Web platforms', 'Product delivery']

function App() {
  return (
    <main className="page">
      <div className="page__halo page__halo--one" aria-hidden="true" />
      <div className="page__halo page__halo--two" aria-hidden="true" />

      <section className="hero">
        <header className="hero__header">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true">
              FD
            </div>
            <div>
              <p className="brand__name">Fuzzdea</p>
              <p className="brand__meta">Software development company</p>
            </div>
          </div>

          <p className="hero__domain">fuzzdea.com</p>
        </header>

        <div className="hero__body">
          <div className="hero__copy">
            <p className="eyebrow">Preview page</p>
            <h1>Our new website is coming soon.</h1>
            <p className="lead">
              Fuzzdea is building a new home on the web. Soon you will find our
              services, approach, and contact details here.
            </p>

            <div className="hero__tags" aria-label="Focus areas">
              {focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>

          <aside className="status-panel" aria-label="Launch status">
            <p className="status-panel__label">Status</p>
            <p className="status-panel__headline">Under construction</p>
            <p className="status-panel__text">
              This temporary landing page reserves the space while the full
              Fuzzdea site is being designed and written.
            </p>

            <div className="status-panel__meter" aria-hidden="true">
              <span />
            </div>

            <p className="status-panel__caption">
              More details, case studies, and contact information will be added
              soon.
            </p>
          </aside>
        </div>

        <footer className="hero__footer">
          <p>Software development for teams that need reliable execution.</p>
          <p>Stay tuned for the full launch.</p>
        </footer>
      </section>
    </main>
  )
}

export default App
