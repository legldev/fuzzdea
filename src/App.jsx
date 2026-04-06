import { useEffect, useEffectEvent, useRef, useState } from 'react'
import './App.css'

const formName = 'contacto'
const storageKeys = {
  locale: 'fuzzdea-locale',
  theme: 'fuzzdea-theme',
}

const content = {
  en: {
    meta: {
      title: 'Fuzzdea | Software development, websites, and staff augmentation',
      description:
        'Fuzzdea builds custom software, commercial websites, and staff augmentation solutions for teams that need to move faster.',
    },
    ui: {
      language: 'Language',
      theme: 'Theme',
      english: 'EN',
      spanish: 'ES',
      light: 'Light',
      dark: 'Dark',
      primaryCta: 'Request a proposal',
      secondaryCta: 'See services',
      contactCta: 'Contact us',
      nextStepCta: 'Open form',
    },
    navigation: [
      { label: 'Services', href: '#services' },
      { label: 'Models', href: '#models' },
      { label: 'Process', href: '#process' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      eyebrow: 'Software delivery for growing teams',
      title: 'Software that helps you launch, sell, and scale.',
      lead:
        'Custom software, websites, staff augmentation, and ongoing support for teams that need reliable execution.',
      chips: [
        'Custom software',
        'Websites and landing pages',
        'Staff augmentation',
      ],
      solveEyebrow: 'What we do',
      solveTitle: 'We turn business needs into software that ships.',
      solveList: [
        'Launch a product or internal tool',
        'Upgrade a website that undersells your value',
        'Extend your team without hiring slowly',
        'Stabilize and improve existing software',
      ],
      workEyebrow: 'How we work',
      workItems: [
        {
          title: 'Project delivery',
          description: 'We own scope, execution, and release.',
        },
        {
          title: 'Augmentation',
          description: 'We join your team where velocity is missing.',
        },
        {
          title: 'Ongoing support',
          description: 'We keep improving after launch.',
        },
      ],
    },
    values: [
      'Business-focused delivery',
      'Clear communication',
      'Flexible collaboration',
    ],
    servicesIntro: {
      eyebrow: 'Services',
      title: 'Build, improve, or scale with the right delivery model.',
      description:
        'We keep the offering simple: solve the actual problem, ship quality work, and keep momentum high.',
    },
    services: [
      {
        key: 'custom',
        title: 'Custom software development',
        description: 'Products, internal tools, APIs, and operational platforms.',
        bullets: ['MVPs and platforms', 'Dashboards and internal systems', 'Integrations and architecture'],
      },
      {
        key: 'web',
        title: 'Websites and landing pages',
        description: 'Commercial sites that explain your value and drive action.',
        bullets: ['Landing pages', 'Corporate websites', 'Responsive and performance-focused'],
      },
      {
        key: 'augmentation',
        title: 'Staff augmentation',
        description: 'Additional engineering capacity when your roadmap needs speed.',
        bullets: ['Embedded developers', 'Flexible scaling', 'Aligned with your workflow'],
      },
      {
        key: 'support',
        title: 'Support and evolution',
        description: 'Refactors, maintenance, automation, and continuous improvement.',
        bullets: ['Technical cleanup', 'Feature evolution', 'Ongoing support'],
      },
    ],
    modelsIntro: {
      eyebrow: 'Models',
      title: 'We can work as a delivery partner or as part of your team.',
      description:
        'Not every project needs the same setup. We adapt to the stage, urgency, and structure you already have.',
    },
    models: [
      {
        title: 'End-to-end project',
        description: 'Best when you want one team handling scope, build, and release.',
      },
      {
        title: 'Staff augmentation',
        description: 'Best when you already have product direction and need more execution.',
      },
      {
        title: 'Hybrid setup',
        description: 'Best when part of the work is delegated and part stays in-house.',
      },
    ],
    processIntro: {
      eyebrow: 'Process',
      title: 'A simple process that keeps progress visible.',
      description:
        'We reduce uncertainty by aligning fast, building with focus, and iterating from real outcomes.',
    },
    process: [
      {
        step: '01',
        title: 'Align goals',
        description: 'We define the problem, the scope, and the first useful milestone.',
      },
      {
        step: '02',
        title: 'Design the approach',
        description: 'We shape the right solution before adding unnecessary complexity.',
      },
      {
        step: '03',
        title: 'Build and deliver',
        description: 'We ship with quality, visibility, and steady communication.',
      },
      {
        step: '04',
        title: 'Improve and scale',
        description: 'We keep the product or team moving after release.',
      },
    ],
    reasons: [
      {
        title: 'Business-aware',
        description: 'We care about outcomes, not just output.',
      },
      {
        title: 'Direct communication',
        description: 'Fewer layers, faster decisions, clearer progress.',
      },
      {
        title: 'Flexible by design',
        description: 'Project, augmentation, or a mix of both.',
      },
      {
        title: 'Built to evolve',
        description: 'The work is prepared for what comes next.',
      },
    ],
    faqsIntro: {
      eyebrow: 'FAQs',
      title: 'A few quick answers before we talk.',
      description:
        'These are the questions we usually hear before a project starts.',
    },
    faqs: [
      {
        question: 'Do you only work with startups?',
        answer: 'No. We work with startups, SMBs, and established teams.',
      },
      {
        question: 'Do you build websites only?',
        answer: 'No. We also build products, internal tools, APIs, and integrations.',
      },
      {
        question: 'Can you join an existing project?',
        answer: 'Yes. We can continue, stabilize, or accelerate work already in progress.',
      },
      {
        question: 'What do you need to start?',
        answer: 'A short conversation about goals, timing, and the current situation.',
      },
    ],
    cta: {
      eyebrow: 'Next step',
      title: 'If you already have a need, we can start with a simple conversation.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what you need.',
      description:
        'Share the project, the bottleneck, or the idea you want to validate and we will reply with clear next steps.',
      checklistTitle: 'Useful details to include',
      checklist: [
        'What you want to build or improve',
        'The business problem behind it',
        'Current team, stack, or project stage',
        'Timeline or urgency',
      ],
    },
    form: {
      labels: {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        service: 'Service',
        message: 'Message',
      },
      servicePlaceholder: 'Select a service',
      captchaTitle: 'Spam protection',
      captchaReady: 'Protected with Cloudflare Turnstile.',
      captchaMissing:
        'Add VITE_TURNSTILE_SITE_KEY locally and configure TURNSTILE_SECRET_KEY in Netlify before going live.',
      submit: 'Send message',
      status: {
        idle: '',
        sending: 'Sending...',
        success: 'Thanks. Your message was received.',
        error: 'We could not send your message. Please try again.',
        captcha: 'Please complete the CAPTCHA first.',
        config: 'CAPTCHA is not configured yet.',
      },
      subject: 'New lead from %{formName} (%{submissionId})',
    },
    footer: {
      brand: 'Fuzzdea',
      text: 'Software development, websites, and staff augmentation.',
    },
  },
  es: {
    meta: {
      title: 'Fuzzdea | Desarrollo de software, sitios web y staff augmentation',
      description:
        'Fuzzdea construye software a medida, sitios comerciales y soluciones de staff augmentation para equipos que necesitan avanzar más rápido.',
    },
    ui: {
      language: 'Idioma',
      theme: 'Modo',
      english: 'EN',
      spanish: 'ES',
      light: 'Claro',
      dark: 'Oscuro',
      primaryCta: 'Quiero una propuesta',
      secondaryCta: 'Ver servicios',
      contactCta: 'Hablemos',
      nextStepCta: 'Ir al formulario',
    },
    navigation: [
      { label: 'Servicios', href: '#services' },
      { label: 'Modelos', href: '#models' },
      { label: 'Proceso', href: '#process' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Contacto', href: '#contact' },
    ],
    hero: {
      eyebrow: 'Entrega de software para equipos en crecimiento',
      title: 'Software que te ayuda a lanzar, vender y escalar.',
      lead:
        'Desarrollo a medida, sitios web, staff augmentation y soporte continuo para equipos que necesitan ejecutar mejor.',
      chips: [
        'Software a medida',
        'Sitios web y landings',
        'Staff augmentation',
      ],
      solveEyebrow: 'Qué hacemos',
      solveTitle: 'Convertimos necesidades reales en software que sale a producción.',
      solveList: [
        'Lanzar un producto o herramienta interna',
        'Mejorar una web que hoy no representa tu valor',
        'Extender tu equipo sin frenar contrataciones',
        'Estabilizar y mejorar software existente',
      ],
      workEyebrow: 'Cómo trabajamos',
      workItems: [
        {
          title: 'Proyecto',
          description: 'Tomamos alcance, ejecución y release.',
        },
        {
          title: 'Augmentation',
          description: 'Nos sumamos al equipo donde falta velocidad.',
        },
        {
          title: 'Continuidad',
          description: 'Seguimos mejorando después del lanzamiento.',
        },
      ],
    },
    values: [
      'Entrega con foco en negocio',
      'Comunicación clara',
      'Colaboración flexible',
    ],
    servicesIntro: {
      eyebrow: 'Servicios',
      title: 'Construí, mejorá o escalá con el modelo de trabajo correcto.',
      description:
        'Mantenemos la propuesta simple: resolver el problema real, entregar con calidad y sostener el avance.',
    },
    services: [
      {
        key: 'custom',
        title: 'Desarrollo de software a medida',
        description: 'Productos, herramientas internas, APIs y plataformas operativas.',
        bullets: ['MVPs y plataformas', 'Dashboards y sistemas internos', 'Integraciones y arquitectura'],
      },
      {
        key: 'web',
        title: 'Páginas web y landings',
        description: 'Sitios comerciales que explican mejor tu valor y convierten.',
        bullets: ['Landings', 'Sitios corporativos', 'Responsive y performance'],
      },
      {
        key: 'augmentation',
        title: 'Staff augmentation',
        description: 'Más capacidad técnica cuando el roadmap necesita velocidad.',
        bullets: ['Desarrolladores integrados', 'Escalado flexible', 'Alineado a tu proceso'],
      },
      {
        key: 'support',
        title: 'Soporte y evolución',
        description: 'Refactors, mantenimiento, automatización y mejora continua.',
        bullets: ['Orden técnico', 'Evolución funcional', 'Soporte continuo'],
      },
    ],
    modelsIntro: {
      eyebrow: 'Modelos',
      title: 'Podemos trabajar como partner de delivery o como parte de tu equipo.',
      description:
        'No todos los proyectos necesitan el mismo esquema. Nos adaptamos a la etapa, la urgencia y la estructura que ya tenés.',
    },
    models: [
      {
        title: 'Proyecto end-to-end',
        description: 'Ideal cuando querés un equipo que tome alcance, desarrollo y entrega.',
      },
      {
        title: 'Staff augmentation',
        description: 'Ideal cuando ya tenés dirección de producto y necesitás más ejecución.',
      },
      {
        title: 'Esquema híbrido',
        description: 'Ideal cuando una parte se delega y otra queda dentro del equipo.',
      },
    ],
    processIntro: {
      eyebrow: 'Proceso',
      title: 'Un proceso simple para que el avance siempre sea visible.',
      description:
        'Bajamos la incertidumbre alineando rápido, construyendo con foco e iterando desde resultados reales.',
    },
    process: [
      {
        step: '01',
        title: 'Alinear objetivos',
        description: 'Definimos problema, alcance y primer hito útil.',
      },
      {
        step: '02',
        title: 'Diseñar el enfoque',
        description: 'Armamos la solución correcta antes de sumar complejidad.',
      },
      {
        step: '03',
        title: 'Construir y entregar',
        description: 'Entregamos con calidad, visibilidad y buena comunicación.',
      },
      {
        step: '04',
        title: 'Mejorar y escalar',
        description: 'Seguimos moviendo el producto o el equipo después del release.',
      },
    ],
    reasons: [
      {
        title: 'Mirada de negocio',
        description: 'Nos importa el impacto, no solo producir código.',
      },
      {
        title: 'Comunicación directa',
        description: 'Menos capas, decisiones más rápidas y más claridad.',
      },
      {
        title: 'Flexibilidad real',
        description: 'Proyecto, augmentation o una mezcla de ambos.',
      },
      {
        title: 'Base para crecer',
        description: 'El trabajo queda listo para seguir evolucionando.',
      },
    ],
    faqsIntro: {
      eyebrow: 'FAQs',
      title: 'Respuestas rápidas antes de hablar.',
      description:
        'Estas son algunas dudas típicas antes de empezar un proyecto.',
    },
    faqs: [
      {
        question: '¿Trabajan solo con startups?',
        answer: 'No. Trabajamos con startups, pymes y equipos ya consolidados.',
      },
      {
        question: '¿Hacen solo sitios web?',
        answer: 'No. También hacemos productos, herramientas internas, APIs e integraciones.',
      },
      {
        question: '¿Pueden sumarse a un proyecto existente?',
        answer: 'Sí. Podemos continuarlo, estabilizarlo o acelerarlo.',
      },
      {
        question: '¿Qué necesitan para empezar?',
        answer: 'Una charla breve sobre objetivos, tiempos y situación actual.',
      },
    ],
    cta: {
      eyebrow: 'Próximo paso',
      title: 'Si ya tenés una necesidad concreta, podemos empezar con una conversación simple.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Contanos qué necesitás.',
      description:
        'Compartinos el proyecto, el cuello de botella o la idea que querés validar y te respondemos con próximos pasos claros.',
      checklistTitle: 'Datos útiles para incluir',
      checklist: [
        'Qué querés construir o mejorar',
        'Qué problema de negocio querés resolver',
        'Equipo, stack o etapa actual',
        'Tiempo deseado o urgencia',
      ],
    },
    form: {
      labels: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Email',
        service: 'Servicio',
        message: 'Mensaje',
      },
      servicePlaceholder: 'Seleccionar servicio',
      captchaTitle: 'Protección anti-spam',
      captchaReady: 'Protegido con Cloudflare Turnstile.',
      captchaMissing:
        'Agregá VITE_TURNSTILE_SITE_KEY en local y configurá TURNSTILE_SECRET_KEY en Netlify antes de publicar.',
      submit: 'Enviar mensaje',
      status: {
        idle: '',
        sending: 'Enviando...',
        success: 'Gracias. Recibimos tu mensaje.',
        error: 'No pudimos enviar el mensaje. Probá nuevamente.',
        captcha: 'Completá el CAPTCHA antes de enviar.',
        config: 'El CAPTCHA todavía no está configurado.',
      },
      subject: 'Nuevo lead desde %{formName} (%{submissionId})',
    },
    footer: {
      brand: 'Fuzzdea',
      text: 'Desarrollo de software, sitios web y staff augmentation.',
    },
  },
}

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en'
  }

  return window.localStorage.getItem(storageKeys.locale) === 'es' ? 'es' : 'en'
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.localStorage.getItem(storageKeys.theme) === 'dark'
    ? 'dark'
    : 'light'
}

function setMeta(selector, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${selector}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, selector)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function loadTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Turnstile is unavailable on the server'))
  }

  if (window.turnstile?.render) {
    return Promise.resolve(window.turnstile)
  }

  if (window.__fuzzdeaTurnstilePromise) {
    return window.__fuzzdeaTurnstilePromise
  }

  window.__fuzzdeaTurnstilePromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('fuzzdea-turnstile-script')

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.turnstile), {
        once: true,
      })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Turnstile')),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.id = 'fuzzdea-turnstile-script'
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(script)
  })

  return window.__fuzzdeaTurnstilePromise
}

function TurnstileWidget({ language, onError, onSuccess, siteKey, theme }) {
  const containerRef = useRef(null)
  const handleSuccess = useEffectEvent(onSuccess)
  const handleError = useEffectEvent(onError)

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return undefined
    }

    let cancelled = false
    let widgetId

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) {
          return
        }

        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          language,
          size: 'flexible',
          'response-field': false,
          callback: (token) => handleSuccess(token),
          'expired-callback': () => handleError(),
          'timeout-callback': () => handleError(),
          'error-callback': () => handleError(),
        })
      })
      .catch(() => {
        handleError()
      })

    return () => {
      cancelled = true
      if (widgetId !== undefined && window.turnstile?.remove) {
        window.turnstile.remove(widgetId)
      }
    }
  }, [language, siteKey, theme])

  return <div className="turnstile-widget" ref={containerRef} />
}

function App() {
  const [locale, setLocale] = useState(getInitialLocale)
  const [theme, setTheme] = useState(getInitialTheme)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
    'bot-field': '',
  })
  const [formStatus, setFormStatus] = useState('idle')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaVersion, setCaptchaVersion] = useState(0)

  const captchaSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
  const isCaptchaConfigured = Boolean(captchaSiteKey)
  const t = content[locale]
  const selectedService = t.services.find(
    (service) => service.key === formData.service,
  )

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(storageKeys.locale, locale)
    window.localStorage.setItem(storageKeys.theme, theme)

    document.title = t.meta.title
    setMeta('description', t.meta.description)
    setMeta('og:title', t.meta.title, 'property')
    setMeta('og:description', t.meta.description, 'property')
    setMeta('theme-color', theme === 'dark' ? '#0f1916' : '#11201c')
  }, [locale, theme, t.meta.description, t.meta.title])

  useEffect(() => {
    setCaptchaToken('')
    setCaptchaVersion((current) => current + 1)
  }, [locale, theme])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isCaptchaConfigured) {
      setFormStatus('config')
      return
    }

    if (!captchaToken) {
      setFormStatus('captcha')
      return
    }

    setFormStatus('sending')

    try {
      const response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName,
          locale,
          subject: t.form.subject,
          token: captchaToken,
          data: {
            ...formData,
            service_label: selectedService?.title || '',
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setFormData({
        name: '',
        company: '',
        email: '',
        service: '',
        message: '',
        'bot-field': '',
      })
      setCaptchaToken('')
      setCaptchaVersion((current) => current + 1)
      setFormStatus('success')
    } catch {
      setFormStatus('error')
      setCaptchaToken('')
      setCaptchaVersion((current) => current + 1)
    }
  }

  return (
    <main className="page">
      <div className="page__glow page__glow--one" aria-hidden="true" />
      <div className="page__glow page__glow--two" aria-hidden="true" />
      <div className="page__grid" aria-hidden="true" />

      <div className="shell">
        <header className="site-header">
          <a className="brand" href="#home" aria-label="Go to home">
            <span className="brand__mark" aria-hidden="true">
              FD
            </span>
            <span>
              <strong className="brand__name">Fuzzdea</strong>
              <span className="brand__meta">
                {locale === 'en' ? 'Software services' : 'Servicios de software'}
              </span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {t.navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-controls">
            <div className="toggle-group" aria-label={t.ui.language}>
              <button
                className={`toggle ${locale === 'en' ? 'toggle--active' : ''}`}
                onClick={() => setLocale('en')}
                type="button"
              >
                {t.ui.english}
              </button>
              <button
                className={`toggle ${locale === 'es' ? 'toggle--active' : ''}`}
                onClick={() => setLocale('es')}
                type="button"
              >
                {t.ui.spanish}
              </button>
            </div>

            <div className="toggle-group" aria-label={t.ui.theme}>
              <button
                className={`toggle ${theme === 'light' ? 'toggle--active' : ''}`}
                onClick={() => setTheme('light')}
                type="button"
              >
                {t.ui.light}
              </button>
              <button
                className={`toggle ${theme === 'dark' ? 'toggle--active' : ''}`}
                onClick={() => setTheme('dark')}
                type="button"
              >
                {t.ui.dark}
              </button>
            </div>

            <a className="button button--small button--secondary" href="#contact">
              {t.ui.contactCta}
            </a>
          </div>
        </header>

        <section className="hero" id="home">
          <div className="hero__copy">
            <p className="section__eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>

            <div className="hero__actions">
              <a className="button" href="#contact">
                {t.ui.primaryCta}
              </a>
              <a className="button button--secondary" href="#services">
                {t.ui.secondaryCta}
              </a>
            </div>

            <div className="hero__chips" aria-label="Primary services">
              {t.hero.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="hero__stack">
            <article className="feature-card feature-card--accent">
              <p className="feature-card__eyebrow">{t.hero.solveEyebrow}</p>
              <h2>{t.hero.solveTitle}</h2>
              <ul className="feature-list">
                {t.hero.solveList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="feature-card">
              <p className="feature-card__eyebrow">{t.hero.workEyebrow}</p>
              <div className="mini-grid">
                {t.hero.workItems.map((item) => (
                  <div key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section section--compact" aria-label="Value proposition">
          <div className="value-strip">
            {t.values.map((value, index) => (
              <div key={value}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section__intro">
            <p className="section__eyebrow">{t.servicesIntro.eyebrow}</p>
            <h2>{t.servicesIntro.title}</h2>
            <p>{t.servicesIntro.description}</p>
          </div>

          <div className="services-grid">
            {t.services.map((service) => (
              <article className="service-card" key={service.key}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--contrast" id="models">
          <div className="section__intro section__intro--narrow">
            <p className="section__eyebrow">{t.modelsIntro.eyebrow}</p>
            <h2>{t.modelsIntro.title}</h2>
            <p>{t.modelsIntro.description}</p>
          </div>

          <div className="models-grid">
            {t.models.map((model) => (
              <article className="model-card" key={model.title}>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="process">
          <div className="section__intro">
            <p className="section__eyebrow">{t.processIntro.eyebrow}</p>
            <h2>{t.processIntro.title}</h2>
            <p>{t.processIntro.description}</p>
          </div>

          <div className="process-grid">
            {t.process.map((step) => (
              <article className="process-card" key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <div className="reasons-grid">
            {t.reasons.map((reason) => (
              <article className="reason-card" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--faq" id="faqs">
          <div className="section__intro section__intro--narrow">
            <p className="section__eyebrow">{t.faqsIntro.eyebrow}</p>
            <h2>{t.faqsIntro.title}</h2>
            <p>{t.faqsIntro.description}</p>
          </div>

          <div className="faq-list">
            {t.faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta-banner" aria-label="Call to action">
          <div>
            <p className="section__eyebrow">{t.cta.eyebrow}</p>
            <h2>{t.cta.title}</h2>
          </div>
          <a className="button" href="#contact">
            {t.ui.nextStepCta}
          </a>
        </section>

        <section className="contact" id="contact">
          <div className="contact__copy">
            <p className="section__eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.description}</p>

            <div className="contact-panel">
              <p>{t.contact.checklistTitle}</p>
              <ul>
                {t.contact.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <form
            className="contact-form"
            name={formName}
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value={formName} />

            <p hidden>
              <label>
                Do not fill this field:
                <input
                  name="bot-field"
                  value={formData['bot-field']}
                  onChange={handleChange}
                />
              </label>
            </p>

            <div className="form-grid">
              <label className="field">
                <span>{t.form.labels.name}</span>
                <input
                  autoComplete="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field">
                <span>{t.form.labels.company}</span>
                <input
                  autoComplete="organization"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>{t.form.labels.email}</span>
                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field">
                <span>{t.form.labels.service}</span>
                <div className="field__control field__control--select">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t.form.servicePlaceholder}</option>
                    {t.services.map((service) => (
                      <option key={service.key} value={service.key}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <span className="field__chevron" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>
                </div>
              </label>

              <label className="field field--full">
                <span>{t.form.labels.message}</span>
                <textarea
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="captcha-block">
              <p className="captcha-block__title">{t.form.captchaTitle}</p>
              {isCaptchaConfigured ? (
                <>
                  <TurnstileWidget
                    key={`${locale}-${theme}-${captchaVersion}`}
                    language={locale}
                    onError={() => {
                      setCaptchaToken('')
                    }}
                    onSuccess={(value) => {
                      setCaptchaToken(value || '')
                      if (formStatus !== 'idle') {
                        setFormStatus('idle')
                      }
                    }}
                    siteKey={captchaSiteKey}
                    theme={theme}
                  />
                  <p className="form-note">{t.form.captchaReady}</p>
                </>
              ) : (
                <p className="form-note form-note--warning">
                  {t.form.captchaMissing}
                </p>
              )}
            </div>

            <div className="contact-form__footer">
              <button className="button" type="submit">
                {formStatus === 'sending' ? t.form.status.sending : t.form.submit}
              </button>

              <p
                className={`form-status ${
                  formStatus !== 'idle' ? `form-status--${formStatus}` : ''
                }`}
                aria-live="polite"
              >
                {t.form.status[formStatus]}
              </p>
            </div>
          </form>
        </section>

        <footer className="site-footer">
          <p>{t.footer.brand}</p>
          <p>{t.footer.text}</p>
        </footer>
      </div>
    </main>
  )
}

export default App
