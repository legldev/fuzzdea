import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { labsPlan } from '../data/labsData'
import '../styles/labs-promo.css'

const siteUrl = 'https://fuzzdea.com'
const kitFormId = 'cf59544089'
const kitFormUrl = 'https://fuzzdea.kit.com/cf59544089'
const kitScriptUrl = `${kitFormUrl}/index.js`

function setMeta(selector, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${selector}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, selector)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function KitModalButton({ children, className }) {
  return (
    <a className={className} data-formkit-toggle={kitFormId} href={kitFormUrl}>
      {children}
    </a>
  )
}

function LabsPromoLandingPage() {
  const title =
    'fuzzdea labs | Aprende a programar desde cero con clases, comunidad y mentoring'
  const description =
    'Nueva academia digital de fuzzdea para aprender programacion desde cero con clases virtuales semanales, comunidad, contenido exclusivo, soporte 24/7 y mentoring para conseguir trabajo en software.'
  const ogImage = `${siteUrl}/og-image.svg`

  useEffect(() => {
    document.title = title
    document.documentElement.lang = 'es'
    setMeta('description', description)
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', `${siteUrl}/labs`, 'property')
    setMeta('og:site_name', 'fuzzdea labs', 'property')
    setMeta('og:image', ogImage, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
    setLink('canonical', `${siteUrl}/labs`)
  }, [description, ogImage, title])

  useEffect(() => {
    const existingScript = document.querySelector(`script[data-uid="${kitFormId}"]`)

    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.dataset.uid = kitFormId
    script.src = kitScriptUrl
    document.body.appendChild(script)
  }, [])

  return (
    <main className="labs-promo">
      <div className="labs-promo__glow labs-promo__glow--one" aria-hidden="true" />
      <div className="labs-promo__glow labs-promo__glow--two" aria-hidden="true" />

      <section className="labs-promo__hero">
        <div className="labs-promo__copy">
          <p className="labs-promo__eyebrow">fuzzdea labs</p>
          <h1>Aprende a programar desde cero con una ruta clara y practica.</h1>
          <p className="labs-promo__lead">
            fuzzdea labs es una academia digital creada para que puedas aprender
            programacion desde cero con clases virtuales semanales, comunidad,
            contenido exclusivo, soporte 24/7 y mentoring real para entrar al
            mundo del software.
          </p>

          <div className="labs-promo__actions">
            <KitModalButton className="labs-promo__button">
              Quiero acceso anticipado
            </KitModalButton>
            <Link className="labs-promo__button labs-promo__button--ghost" to="/">
              Volver a fuzzdea
            </Link>
          </div>

          <p className="labs-promo__cta-note">
            Te sumamos a la lista de espera para avisarte cuando abramos.
          </p>

          <div className="labs-promo__chips">
            <span>Clases semanales en vivo</span>
            <span>Comunidad</span>
            <span>Contenido exclusivo</span>
            <span>Soporte 24/7</span>
            <span>Mentoring laboral</span>
          </div>
        </div>

        <aside className="labs-promo__card">
          <p className="labs-promo__eyebrow">Preventa</p>
          <strong>
            USD {labsPlan.price.toFixed(2)} / mes
          </strong>
          <p>
            Una suscripcion accesible para construir una base fuerte, sostener el
            aprendizaje y avanzar con acompanamiento.
          </p>

          <ul className="labs-promo__list">
            <li>Ruta guiada para principiantes absolutos</li>
            <li>Clases semanales virtuales</li>
            <li>Comunidad para avanzar con otros alumnos</li>
            <li>Mentoria para prepararte para conseguir trabajo</li>
          </ul>
        </aside>
      </section>

      <section className="labs-promo__section">
        <div className="labs-promo__section-intro">
          <p className="labs-promo__eyebrow">Lo que se viene</p>
          <h2>Una academia pensada para que no te pierdas entre tutoriales.</h2>
          <p>
            El foco de fuzzdea labs es ofrecer un camino simple, ordenado y
            sostenido para aprender de verdad y convertir ese proceso en una
            oportunidad laboral concreta.
          </p>
        </div>

        <div className="labs-promo__grid">
          <article className="labs-promo__feature">
            <h3>Desde cero, en serio</h3>
            <p>
              Si nunca programaste, vas a poder empezar desde fundamentos, con
              explicaciones claras y una progresion hecha para principiantes.
            </p>
          </article>

          <article className="labs-promo__feature">
            <h3>Clases semanales y comunidad</h3>
            <p>
              La experiencia combina clases virtuales, comunidad activa y
              seguimiento para ayudarte a mantener el ritmo de aprendizaje.
            </p>
          </article>

          <article className="labs-promo__feature">
            <h3>Contenido exclusivo y soporte 24/7</h3>
            <p>
              Habra material propio, recursos seleccionados y soporte continuo
              para que no te trabes cada vez que aparezca una duda.
            </p>
          </article>

          <article className="labs-promo__feature">
            <h3>Mentoring para conseguir laburo</h3>
            <p>
              Tambien incluye mentoring para entender como entrar al mercado:
              portfolio, posicionamiento, practica y criterio para buscar el
              primer trabajo en software.
            </p>
          </article>
        </div>
      </section>

      <section className="labs-promo__section labs-promo__section--accent">
        <div className="labs-promo__section-intro">
          <p className="labs-promo__eyebrow">Ideal para</p>
          <h2>Personas que quieren dejar de improvisar y empezar con una base real.</h2>
        </div>

        <div className="labs-promo__audience">
          <div>
            <strong>Quienes arrancan de cero</strong>
            <p>Sin experiencia previa, sin roadmap y con ganas de entrar bien.</p>
          </div>
          <div>
            <strong>Quienes ya probaron tutoriales sueltos</strong>
            <p>Y necesitan orden, estructura y contexto para avanzar.</p>
          </div>
          <div>
            <strong>Quienes quieren trabajar en software</strong>
            <p>Y buscan acompanamiento practico para llegar a ese objetivo.</p>
          </div>
        </div>
      </section>

      <section className="labs-promo__footer">
        <div>
          <p className="labs-promo__eyebrow">Acceso anticipado</p>
          <h2>Si quieres enterarte primero cuando abra fuzzdea labs, hablemos.</h2>
        </div>
        <KitModalButton className="labs-promo__button">
          Quiero que me avisen
        </KitModalButton>
      </section>
    </main>
  )
}

export default LabsPromoLandingPage
