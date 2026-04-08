import { createContext, useContext, useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  labsAdminSeed,
  labsCourses,
  labsMarketing,
  labsPlan,
  labsRoadmap,
  labsSubscriptionFeatures,
} from '../data/labsData'
import '../styles/labs.css'

const siteUrl = 'https://fuzzdea.com'
const labsBasePath = '/labs/app'
const labsBaseUrl = `${siteUrl}${labsBasePath}`
const storageKey = 'fuzzdea-labs-state-v1'
const adminEmail = 'admin@labs.fuzzdea'

const LabsContext = createContext(null)

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

function setStructuredData(data) {
  let element = document.getElementById('fuzzdea-labs-structured-data')

  if (!element) {
    element = document.createElement('script')
    element.id = 'fuzzdea-labs-structured-data'
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

function removeStructuredData() {
  document.getElementById('fuzzdea-labs-structured-data')?.remove()
}

function buildLabsStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'fuzzdea labs',
        url: `${labsBaseUrl}`,
      },
      {
        '@type': 'Course',
        name: 'Aprender programacion desde cero',
        provider: {
          '@type': 'Organization',
          name: 'fuzzdea labs',
          sameAs: labsBaseUrl,
        },
        description: labsMarketing.meta.description,
        courseMode: 'online',
        educationalLevel: 'beginner',
        inLanguage: 'es',
      },
      {
        '@type': 'FAQPage',
        mainEntity: labsMarketing.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }
}

function useLabsSeo({
  canonicalPath = labsBasePath,
  description,
  robots = 'noindex, nofollow',
  structuredData,
  title,
}) {
  useEffect(() => {
    document.title = title
    document.documentElement.lang = 'es'
    setMeta('description', description)
    setMeta('robots', robots)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', `${siteUrl}${canonicalPath}`, 'property')
    setMeta('og:site_name', 'fuzzdea labs', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setLink('canonical', `${siteUrl}${canonicalPath}`)

    if (structuredData) {
      setStructuredData(structuredData)
    } else {
      removeStructuredData()
    }

    return () => {
      removeStructuredData()
    }
  }, [canonicalPath, description, robots, structuredData, title])
}

function getTotalLessons() {
  return labsCourses.reduce((total, course) => total + course.lessons.length, 0)
}

function getProgressFromLessons(completedLessons = []) {
  return Math.round((completedLessons.length / getTotalLessons()) * 100)
}

function mapSeedStudent(student) {
  const completedLessons = student.completedLessons || ['foundations:intro-programming']

  return {
    ...student,
    role: 'student',
    subscriptionStatus: student.status === 'active' ? 'active' : 'inactive',
    billingAmount: labsPlan.price,
    completedLessons,
    progress: getProgressFromLessons(completedLessons),
    goal: 'Conseguir mi primer stack base',
  }
}

function createDefaultState() {
  return {
    announcements: labsAdminSeed.announcements,
    currentUser: null,
    students: labsAdminSeed.students.map(mapSeedStudent),
  }
}

function loadState() {
  if (typeof window === 'undefined') {
    return createDefaultState()
  }

  try {
    const raw = window.localStorage.getItem(storageKey)

    if (!raw) {
      return createDefaultState()
    }

    return JSON.parse(raw)
  } catch {
    return createDefaultState()
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

function LabsProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  const activeSubscriptions = state.students.filter(
    (student) => student.subscriptionStatus === 'active',
  ).length

  const totalRevenue = activeSubscriptions * labsPlan.price

  const registerStudent = ({ email, goal, name }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const existing = state.students.find(
      (student) => student.email.toLowerCase() === normalizedEmail,
    )

    if (existing) {
      setState((current) => ({
        ...current,
        currentUser: existing,
      }))

      return { ok: true, user: existing, existing: true }
    }

    const newStudent = {
      id: `student-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      role: 'student',
      goal: goal.trim(),
      plan: 'Mensual',
      cohort: 'Nueva camada',
      joinedAt: new Date().toISOString().slice(0, 10),
      completedLessons: [],
      progress: 0,
      status: 'pending',
      subscriptionStatus: 'inactive',
      billingAmount: labsPlan.price,
    }

    setState((current) => ({
      ...current,
      currentUser: newStudent,
      students: [newStudent, ...current.students],
    }))

    return { ok: true, user: newStudent, existing: false }
  }

  const login = (email) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail === adminEmail) {
      const adminUser = {
        id: 'admin-demo',
        email: adminEmail,
        name: 'Equipo fuzzdea labs',
        role: 'admin',
      }

      setState((current) => ({
        ...current,
        currentUser: adminUser,
      }))

      return { ok: true, user: adminUser }
    }

    const existing = state.students.find(
      (student) => student.email.toLowerCase() === normalizedEmail,
    )

    if (!existing) {
      return { ok: false, error: 'No encontramos una cuenta con ese email.' }
    }

    setState((current) => ({
      ...current,
      currentUser: existing,
    }))

    return { ok: true, user: existing }
  }

  const startDemo = (role) => {
    if (role === 'admin') {
      return login(adminEmail)
    }

    const demoStudent = state.students[0]

    setState((current) => ({
      ...current,
      currentUser: demoStudent,
    }))

    return { ok: true, user: demoStudent }
  }

  const activateSubscription = () => {
    if (!state.currentUser || state.currentUser.role !== 'student') {
      return
    }

    const updatedUser = {
      ...state.currentUser,
      plan: 'Mensual activo',
      status: 'active',
      subscriptionStatus: 'active',
      renewsAt: '2026-05-06',
    }

    setState((current) => ({
      ...current,
      currentUser: updatedUser,
      students: current.students.map((student) =>
        student.id === updatedUser.id ? updatedUser : student,
      ),
    }))
  }

  const completeLesson = (courseId, lessonId) => {
    if (!state.currentUser || state.currentUser.role !== 'student') {
      return
    }

    const lessonKey = `${courseId}:${lessonId}`
    const completedLessons = Array.from(
      new Set([...(state.currentUser.completedLessons || []), lessonKey]),
    )
    const updatedUser = {
      ...state.currentUser,
      completedLessons,
      progress: getProgressFromLessons(completedLessons),
    }

    setState((current) => ({
      ...current,
      currentUser: updatedUser,
      students: current.students.map((student) =>
        student.id === updatedUser.id ? updatedUser : student,
      ),
    }))
  }

  const publishAnnouncement = ({ audience, body, title }) => {
    const announcement = {
      id: `announcement-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      audience,
      publishedAt: new Date().toISOString().slice(0, 10),
    }

    setState((current) => ({
      ...current,
      announcements: [announcement, ...current.announcements],
    }))
  }

  const logout = () => {
    setState((current) => ({
      ...current,
      currentUser: null,
    }))
  }

  const value = {
    ...state,
    activateSubscription,
    activeSubscriptions,
    completeLesson,
    courses: labsCourses,
    login,
    logout,
    monthlyRevenue: totalRevenue,
    plan: labsPlan,
    publishAnnouncement,
    registerStudent,
    startDemo,
  }

  return <LabsContext.Provider value={value}>{children}</LabsContext.Provider>
}

function useLabs() {
  const context = useContext(LabsContext)

  if (!context) {
    throw new Error('useLabs must be used within LabsProvider')
  }

  return context
}

function LabsLayout() {
  const { currentUser, logout } = useLabs()

  return (
    <div className="labs-app">
      <header className="labs-header">
        <Link className="labs-brand" to="/labs">
          <span className="labs-brand__mark">fl</span>
          <span>
            <strong>fuzzdea labs</strong>
            <span>Academia digital para aprender programacion desde cero</span>
          </span>
        </Link>

        <nav className="labs-nav" aria-label="Labs navigation">
          <NavLink to="/labs/app">Inicio</NavLink>
          <NavLink to="/labs/app/pricing">Suscripcion</NavLink>
          <NavLink to="/labs/app/register">Registro</NavLink>
          {currentUser?.role === 'student' ? (
            <NavLink to="/labs/app/dashboard">Mi panel</NavLink>
          ) : null}
          {currentUser?.role === 'admin' ? (
            <NavLink to="/labs/app/admin">Backoffice</NavLink>
          ) : null}
          <a href="/">fuzzdea.com</a>
        </nav>

        <div className="labs-header__actions">
          {currentUser ? (
            <>
              <span className="labs-user-chip">
                {currentUser.name}
                <small>{currentUser.role === 'admin' ? 'Admin' : 'Alumno'}</small>
              </span>
              <button className="labs-button labs-button--ghost" onClick={logout} type="button">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="labs-button labs-button--ghost" to="/labs/app/login">
                Ingresar
              </Link>
              <Link className="labs-button" to="/labs/app/register">
                Empezar
              </Link>
            </>
          )}
        </div>
      </header>

      <Outlet />
    </div>
  )
}

function LabsLandingPage() {
  useLabsSeo({
    title: labsMarketing.meta.title,
    description: labsMarketing.meta.description,
    canonicalPath: '/labs/app',
    structuredData: buildLabsStructuredData(),
  })

  return (
    <main className="labs-page">
      <section className="labs-hero">
        <div className="labs-hero__copy">
          <p className="labs-eyebrow">{labsMarketing.hero.eyebrow}</p>
          <h1>{labsMarketing.hero.title}</h1>
          <p>{labsMarketing.hero.lead}</p>

          <div className="labs-actions">
            <Link className="labs-button" to="/labs/app/register">
              {labsMarketing.hero.primaryCta}
            </Link>
            <a className="labs-button labs-button--ghost" href="#curriculum">
              {labsMarketing.hero.secondaryCta}
            </a>
          </div>

          <div className="labs-promise">
            {labsMarketing.promise.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="labs-hero__panel">
          <div className="labs-stats">
            {labsMarketing.hero.stats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <div className="labs-callout">
            <p className="labs-eyebrow">MVP de plataforma</p>
            <h2>Landing, registro, suscripcion, panel de alumno y backoffice admin.</h2>
            <p>
              La base ya contempla el producto y la operacion. El siguiente paso
              natural es conectar auth y pagos reales.
            </p>
          </div>
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Para quien es</p>
          <h2>Una academia para empezar bien y sostener el proceso.</h2>
        </div>
        <div className="labs-card-grid labs-card-grid--three">
          {labsMarketing.audience.map((item) => (
            <article className="labs-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section" id="curriculum">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">{labsMarketing.curriculumIntro.eyebrow}</p>
          <h2>{labsMarketing.curriculumIntro.title}</h2>
          <p>{labsMarketing.curriculumIntro.description}</p>
        </div>

        <div className="labs-roadmap">
          {labsRoadmap.map((step) => (
            <article className="labs-roadmap__item" key={step.step}>
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="labs-card-grid">
          {labsCourses.map((course) => (
            <article className="labs-card labs-card--course" key={course.id}>
              <div className="labs-chip-row">
                <span className="labs-chip">{course.level}</span>
                <span className="labs-chip">{course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <ul className="labs-list">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section labs-section--contrast">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Lo que incluye la plataforma</p>
          <h2>Una experiencia completa para vender, dictar y administrar la academia.</h2>
        </div>
        <div className="labs-card-grid labs-card-grid--four">
          {labsMarketing.features.map((feature) => (
            <article className="labs-card labs-card--dark" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-pricing-card">
          <div>
            <p className="labs-eyebrow">Suscripcion</p>
            <h2>{formatPrice(labsPlan.price)} por mes</h2>
            <p>
              Acceso a los cursos, proyectos, roadmap, dashboard y nuevas
              publicaciones de contenido.
            </p>
          </div>

          <ul className="labs-list">
            {labsSubscriptionFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="labs-actions">
            <Link className="labs-button" to="/labs/app/checkout">
              Suscribirme
            </Link>
            <Link className="labs-button labs-button--ghost" to="/labs/app/admin">
              Ver backoffice
            </Link>
          </div>
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-card-grid labs-card-grid--two">
          {labsMarketing.testimonials.map((item) => (
            <article className="labs-card" key={item.name}>
              <p className="labs-quote">“{item.quote}”</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Preguntas frecuentes</p>
          <h2>Lo esencial para lanzar la academia con una base clara.</h2>
        </div>
        <div className="labs-faq">
          {labsMarketing.faqs.map((faq) => (
            <details className="labs-card" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}

function LabsPricingPage() {
  useLabsSeo({
    title: `Suscripcion | fuzzdea labs`,
    description:
      'Plan mensual accesible para acceder a la academia digital, el dashboard de alumno y los nuevos modulos.',
    canonicalPath: '/labs/app/pricing',
  })

  return (
    <main className="labs-page labs-page--narrow">
      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Plan mensual</p>
          <h1>{formatPrice(labsPlan.price)} / mes</h1>
          <p>
            El producto esta pensado para mantener una barrera de entrada baja,
            sumar contenido nuevo y dar una experiencia guiada a principiantes.
          </p>
        </div>

        <div className="labs-card-grid labs-card-grid--two">
          <article className="labs-card">
            <h2>Que incluye</h2>
            <ul className="labs-list">
              {labsSubscriptionFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="labs-card">
            <h2>Como funciona</h2>
            <ol className="labs-steps">
              <li>Creas tu cuenta.</li>
              <li>Activas la suscripcion mensual.</li>
              <li>Accedes al dashboard y al contenido.</li>
              <li>Ves tu progreso y continuas el roadmap.</li>
            </ol>
            <div className="labs-actions">
              <Link className="labs-button" to="/labs/app/checkout">
                Ir a suscribirme
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

function LabsAuthPage({ mode }) {
  const { currentUser, login, registerStudent, startDemo } = useLabs()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    goal: '',
    name: '',
  })

  useLabsSeo({
    title: `${mode === 'register' ? 'Registro' : 'Ingreso'} | fuzzdea labs`,
    description:
      mode === 'register'
        ? 'Crea tu cuenta para acceder a fuzzdea labs y comenzar tu roadmap desde cero.'
        : 'Ingresa a fuzzdea labs para continuar tu progreso o administrar la academia.',
    canonicalPath: `/labs/app/${mode}`,
  })

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/labs/app/admin', { replace: true })
    } else if (currentUser?.role === 'student') {
      navigate('/labs/app/dashboard', { replace: true })
    }
  }, [currentUser, navigate])

  const targetPath = location.state?.from?.pathname

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (mode === 'register') {
      if (!form.name.trim() || !form.email.trim() || !form.goal.trim()) {
        setError('Completa nombre, email y objetivo para crear la cuenta.')
        return
      }

      registerStudent(form)
      navigate('/labs/app/checkout')
      return
    }

    if (!form.email.trim()) {
      setError('Ingresa tu email para continuar.')
      return
    }

    const result = login(form.email)

    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate(
      targetPath ||
        (result.user.role === 'admin' ? '/labs/app/admin' : '/labs/app/dashboard'),
    )
  }

  return (
    <main className="labs-page labs-page--narrow">
      <section className="labs-section">
        <div className="labs-auth">
          <div className="labs-section__intro">
            <p className="labs-eyebrow">
              {mode === 'register' ? 'Crear cuenta' : 'Ingresar'}
            </p>
            <h1>
              {mode === 'register'
                ? 'Abre tu cuenta y prepara tu suscripcion.'
                : 'Ingresa a tu academia.'}
            </h1>
            <p>
              {mode === 'register'
                ? 'El registro crea tu perfil de alumno y te deja listo para activar el plan mensual.'
                : 'Puedes ingresar como alumno o usar el demo admin para ver el backoffice.'}
            </p>
          </div>

          <form className="labs-card labs-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <label className="labs-field">
                <span>Nombre</span>
                <input name="name" onChange={handleChange} value={form.name} />
              </label>
            ) : null}

            <label className="labs-field">
              <span>Email</span>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                value={form.email}
              />
            </label>

            {mode === 'register' ? (
              <label className="labs-field">
                <span>Objetivo</span>
                <textarea
                  name="goal"
                  onChange={handleChange}
                  rows="4"
                  value={form.goal}
                />
              </label>
            ) : null}

            {error ? <p className="labs-form__error">{error}</p> : null}

            <div className="labs-actions">
              <button className="labs-button" type="submit">
                {mode === 'register' ? 'Continuar a suscripcion' : 'Entrar'}
              </button>
              <button
                className="labs-button labs-button--ghost"
                onClick={() => {
                  startDemo(mode === 'login' ? 'admin' : 'student')
                  navigate(
                    mode === 'login' ? '/labs/app/admin' : '/labs/app/dashboard',
                  )
                }}
                type="button"
              >
                {mode === 'login' ? 'Usar demo admin' : 'Usar demo alumno'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

function LabsCheckoutPage() {
  const { activateSubscription, currentUser, plan } = useLabs()
  const navigate = useNavigate()

  useLabsSeo({
    title: 'Suscripcion y checkout | fuzzdea labs',
    description:
      'Activa tu suscripcion mensual y deja listo el acceso a la academia digital.',
    canonicalPath: '/labs/app/checkout',
  })

  if (!currentUser) {
    return <Navigate to="/labs/app/register" replace />
  }

  return (
    <main className="labs-page labs-page--narrow">
      <section className="labs-section">
        <div className="labs-card-grid labs-card-grid--two">
          <article className="labs-card">
            <p className="labs-eyebrow">Resumen</p>
            <h1>{plan.name}</h1>
            <p>{formatPrice(plan.price)} al mes.</p>
            <ul className="labs-list">
              {labsSubscriptionFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="labs-card">
            <p className="labs-eyebrow">Checkout ready</p>
            <h2>Flujo listo para integrar pagos</h2>
            <p>
              En esta fase el boton activa la suscripcion demo y te deja entrar al
              panel. En la siguiente fase se reemplaza por Stripe Checkout, Paddle
              o el proveedor que elijas.
            </p>
            <div className="labs-actions">
              <button
                className="labs-button"
                onClick={() => {
                  activateSubscription()
                  navigate('/labs/app/dashboard')
                }}
                type="button"
              >
                Activar suscripcion demo
              </button>
              <Link className="labs-button labs-button--ghost" to="/labs/app/pricing">
                Volver al plan
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

function StudentDashboardPage() {
  const { announcements, courses, currentUser } = useLabs()

  useLabsSeo({
    title: 'Dashboard de alumno | fuzzdea labs',
    description:
      'Sigue tu progreso, continua tus modulos y revisa novedades desde el panel del alumno.',
    canonicalPath: '/labs/app/dashboard',
  })

  if (!currentUser) {
    return <Navigate to="/labs/app/login" replace />
  }

  if (currentUser.role === 'admin') {
    return <Navigate to="/labs/app/admin" replace />
  }

  return (
    <main className="labs-page">
      <section className="labs-dashboard-hero">
        <div>
          <p className="labs-eyebrow">Mi panel</p>
          <h1>Hola, {currentUser.name}.</h1>
          <p>
            {currentUser.subscriptionStatus === 'active'
              ? 'Tu suscripcion esta activa. Sigue avanzando sobre el roadmap y los proyectos.'
              : 'Tu cuenta esta creada, pero todavia no activaste la suscripcion mensual.'}
          </p>
        </div>

        <div className="labs-dashboard-stats">
          <article>
            <strong>{currentUser.progress}%</strong>
            <span>Progreso general</span>
          </article>
          <article>
            <strong>{currentUser.subscriptionStatus === 'active' ? 'Activa' : 'Pendiente'}</strong>
            <span>Suscripcion</span>
          </article>
          <article>
            <strong>{courses.length}</strong>
            <span>Tracks disponibles</span>
          </article>
        </div>
      </section>

      {currentUser.subscriptionStatus !== 'active' ? (
        <section className="labs-section">
          <article className="labs-paywall">
            <div>
              <p className="labs-eyebrow">Activacion pendiente</p>
              <h2>Activa el plan mensual para desbloquear las clases completas.</h2>
            </div>
            <Link className="labs-button" to="/labs/app/checkout">
              Activar por {formatPrice(labsPlan.price)} / mes
            </Link>
          </article>
        </section>
      ) : null}

      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Tus cursos</p>
          <h2>Continua exactamente donde te quedaste.</h2>
        </div>

        <div className="labs-card-grid">
          {courses.map((course) => (
            <article className="labs-card" key={course.id}>
              <div className="labs-chip-row">
                <span className="labs-chip">{course.level}</span>
                <span className="labs-chip">{course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link className="labs-inline-link" to={`/labs/app/course/${course.id}`}>
                Ver modulo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Novedades</p>
          <h2>Anuncios y actualizaciones.</h2>
        </div>
        <div className="labs-card-grid labs-card-grid--two">
          {announcements.map((item) => (
            <article className="labs-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="labs-card__meta">
                {item.audience} • {item.publishedAt}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function LabsCoursePage() {
  const { completeLesson, courses, currentUser } = useLabs()
  const { courseId } = useParams()

  const course = courses.find((item) => item.id === courseId)

  useLabsSeo({
    title: `${course?.title || 'Curso'} | fuzzdea labs`,
    description: course?.description || labsMarketing.meta.description,
    canonicalPath: `/labs/app/course/${courseId}`,
  })

  if (!currentUser) {
    return <Navigate to="/labs/app/login" replace />
  }

  if (!course) {
    return <Navigate to="/labs/app/dashboard" replace />
  }

  return (
    <main className="labs-page labs-page--narrow">
      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">{course.level}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        <div className="labs-card">
          <h2>Lecciones</h2>
          <div className="labs-lesson-list">
            {course.lessons.map((lesson) => {
              const lessonKey = `${course.id}:${lesson.id}`
              const isDone = currentUser.completedLessons?.includes(lessonKey)

              return (
                <article className="labs-lesson" key={lesson.id}>
                  <div>
                    <strong>{lesson.title}</strong>
                    <span>
                      {lesson.type} • {lesson.duration}
                    </span>
                  </div>
                  <button
                    className={`labs-button ${
                      isDone ? 'labs-button--ghost labs-button--done' : ''
                    }`}
                    onClick={() => completeLesson(course.id, lesson.id)}
                    type="button"
                  >
                    {isDone ? 'Completada' : 'Marcar como completada'}
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function AdminDashboardPage() {
  const { announcements, currentUser, monthlyRevenue, publishAnnouncement, students } =
    useLabs()
  const [form, setForm] = useState({
    audience: 'Todos',
    body: '',
    title: '',
  })

  useLabsSeo({
    title: 'Backoffice admin | fuzzdea labs',
    description:
      'Gestion de alumnos, suscripciones, anuncios y operaciones de la academia digital.',
    canonicalPath: '/labs/app/admin',
  })

  if (!currentUser) {
    return <Navigate to="/labs/app/login" replace />
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/labs/app/dashboard" replace />
  }

  const activeStudents = students.filter(
    (student) => student.subscriptionStatus === 'active',
  ).length

  return (
    <main className="labs-page">
      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Backoffice</p>
          <h1>Operacion de fuzzdea labs</h1>
          <p>
            Vista central para administrar alumnos, suscripciones, anuncios y el
            estado general de la academia.
          </p>
        </div>

        <div className="labs-card-grid labs-card-grid--four">
          <article className="labs-card">
            <strong>{students.length}</strong>
            <span>Alumnos registrados</span>
          </article>
          <article className="labs-card">
            <strong>{activeStudents}</strong>
            <span>Suscripciones activas</span>
          </article>
          <article className="labs-card">
            <strong>{formatPrice(monthlyRevenue)}</strong>
            <span>MRR estimado</span>
          </article>
          <article className="labs-card">
            <strong>{announcements.length}</strong>
            <span>Anuncios publicados</span>
          </article>
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-card-grid labs-card-grid--two">
          <article className="labs-card">
            <h2>Alumnos</h2>
            <div className="labs-table">
              <div className="labs-table__head">
                <span>Alumno</span>
                <span>Estado</span>
                <span>Progreso</span>
              </div>
              {students.map((student) => (
                <div className="labs-table__row" key={student.id}>
                  <span>
                    <strong>{student.name}</strong>
                    <small>{student.email}</small>
                  </span>
                  <span>{student.subscriptionStatus}</span>
                  <span>{student.progress}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="labs-card">
            <h2>Publicar anuncio</h2>
            <div className="labs-form">
              <label className="labs-field">
                <span>Titulo</span>
                <input
                  name="title"
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  value={form.title}
                />
              </label>
              <label className="labs-field">
                <span>Mensaje</span>
                <textarea
                  name="body"
                  onChange={(event) =>
                    setForm((current) => ({ ...current, body: event.target.value }))
                  }
                  rows="4"
                  value={form.body}
                />
              </label>
              <label className="labs-field">
                <span>Audiencia</span>
                <select
                  name="audience"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      audience: event.target.value,
                    }))
                  }
                  value={form.audience}
                >
                  <option>Todos</option>
                  <option>Alumnos activos</option>
                  <option>Nueva camada</option>
                </select>
              </label>
              <button
                className="labs-button"
                onClick={() => {
                  if (!form.title.trim() || !form.body.trim()) {
                    return
                  }

                  publishAnnouncement(form)
                  setForm({
                    audience: 'Todos',
                    body: '',
                    title: '',
                  })
                }}
                type="button"
              >
                Publicar anuncio
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">Timeline operativo</p>
          <h2>Ultimas novedades.</h2>
        </div>
        <div className="labs-card-grid labs-card-grid--two">
          {announcements.map((announcement) => (
            <article className="labs-card" key={announcement.id}>
              <h3>{announcement.title}</h3>
              <p>{announcement.body}</p>
              <span className="labs-card__meta">
                {announcement.audience} • {announcement.publishedAt}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function ProtectedLabsRoute({ role }) {
  const { currentUser } = useLabs()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate replace state={{ from: location }} to="/labs/app/login" />
  }

  if (role && currentUser.role !== role) {
    return (
      <Navigate
        replace
        to={currentUser.role === 'admin' ? '/labs/app/admin' : '/labs/app/dashboard'}
      />
    )
  }

  return <Outlet />
}

function LabsNotFoundPage() {
  return (
    <main className="labs-page labs-page--narrow">
      <section className="labs-section">
        <div className="labs-section__intro">
          <p className="labs-eyebrow">404</p>
          <h1>Esa vista no existe todavia.</h1>
          <p>Vuelve al inicio de fuzzdea labs para seguir explorando la plataforma.</p>
        </div>
        <div className="labs-actions">
          <Link className="labs-button" to="/labs/app">
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}

export function LabsAppShell() {
  return (
    <LabsProvider>
      <LabsLayout />
    </LabsProvider>
  )
}

export {
  AdminDashboardPage,
  LabsAuthPage,
  LabsCheckoutPage,
  LabsLandingPage,
  LabsNotFoundPage,
  LabsPricingPage,
  ProtectedLabsRoute,
  StudentDashboardPage,
  LabsCoursePage,
}
