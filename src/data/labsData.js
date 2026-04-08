export const labsPlan = {
  id: 'labs-monthly',
  name: 'fuzzdea labs mensual',
  price: 6.99,
  currency: 'USD',
  interval: 'month',
}

export const labsMarketing = {
  meta: {
    title:
      'fuzzdea labs | Aprende programacion desde cero con una suscripcion accesible',
    description:
      'Academia digital para aprender programacion desde cero con clases guiadas, proyectos reales, roadmap claro y comunidad.',
  },
  hero: {
    eyebrow: 'fuzzdea labs',
    title: 'Aprende a programar desde cero con una ruta clara y practica.',
    lead:
      'Una academia digital pensada para personas que quieren empezar bien: fundamentos, proyectos reales, acompanamiento y una suscripcion simple de 6,99 USD al mes.',
    primaryCta: 'Empezar ahora',
    secondaryCta: 'Ver plan de estudio',
    stats: [
      { label: 'Suscripcion', value: '6,99 USD / mes' },
      { label: 'Nivel', value: 'Desde cero' },
      { label: 'Formato', value: 'Clases + proyectos + comunidad' },
    ],
  },
  promise: [
    'Ruta para principiantes absolutos',
    'Explicaciones simples y paso a paso',
    'Proyectos para armar portfolio',
    'Backoffice para gestionar alumnos, cursos y contenidos',
  ],
  audience: [
    {
      title: 'Personas sin experiencia',
      description:
        'Si nunca escribiste una linea de codigo, arrancas desde los conceptos base y herramientas esenciales.',
    },
    {
      title: 'Personas que empezaron y se trabaron',
      description:
        'Si ya viste tutoriales pero no lograste ordenar ideas, te damos una progresion mas clara y practica.',
    },
    {
      title: 'Equipos que quieren capacitar juniors',
      description:
        'Tambien puede funcionar como un entorno interno para onboarding tecnico y formacion inicial.',
    },
  ],
  curriculumIntro: {
    eyebrow: 'Plan de estudio',
    title: 'Una progresion pensada para llegar de cero a construir proyectos.',
    description:
      'El recorrido combina fundamentos, practica y contexto real para que entiendas lo que haces y puedas seguir avanzando.',
  },
  features: [
    {
      title: 'Clases grabadas y modulos guiados',
      description:
        'Contenido ordenado por niveles, con checkpoints y objetivos concretos por modulo.',
    },
    {
      title: 'Roadmap y seguimiento de progreso',
      description:
        'Cada alumno ve en que punto esta, que modulo sigue y que tareas ya completo.',
    },
    {
      title: 'Proyectos reales para portfolio',
      description:
        'No se trata solo de teoria. El foco es construir cosas que sirvan para practicar y mostrar.',
    },
    {
      title: 'Comunidad y anuncios',
      description:
        'Actualizaciones, novedades, lanzamientos de modulos y mensajes clave desde el panel.',
    },
  ],
  testimonials: [
    {
      name: 'Camila R.',
      role: 'Estudiante inicial',
      quote:
        'Lo que mas me ayudo fue tener un camino claro. Antes saltaba entre tutoriales y no entendia por donde seguir.',
    },
    {
      name: 'Martin S.',
      role: 'Cambio de carrera',
      quote:
        'La combinacion de fundamentos y proyectos me dio mas confianza para practicar todos los dias.',
    },
  ],
  faqs: [
    {
      question: '¿Esto sirve si arranco desde cero?',
      answer:
        'Si. El producto esta planteado para principiantes absolutos, con una progresion desde fundamentos hasta proyectos guiados.',
    },
    {
      question: '¿La suscripcion es mensual?',
      answer:
        'Si. El plan inicial es de 6,99 USD por mes. La idea es mantenerlo simple y accesible.',
    },
    {
      question: '¿Ya incluye pagos reales?',
      answer:
        'En este MVP el flujo de suscripcion esta listo a nivel producto y UX. La pasarela de pago se conecta en la siguiente fase.',
    },
    {
      question: '¿Puedo administrar cursos y alumnos?',
      answer:
        'Si. El backoffice incluye vistas de cursos, estudiantes, suscripciones, anuncios y estado del contenido.',
    },
  ],
}

export const labsCourses = [
  {
    id: 'foundations',
    title: 'Fundamentos de programacion',
    level: 'Principiante',
    duration: '4 semanas',
    progress: 22,
    description:
      'Mentalidad, logica, variables, condicionales, bucles y resolucion de problemas para arrancar con una base fuerte.',
    outcomes: [
      'Entender como piensa un programa',
      'Resolver ejercicios con logica',
      'Leer y escribir tus primeras funciones',
    ],
    lessons: [
      { id: 'intro-programming', title: 'Que es programar', duration: '12 min', type: 'video' },
      { id: 'logic-basics', title: 'Pensamiento logico', duration: '18 min', type: 'video' },
      { id: 'variables-flow', title: 'Variables y flujo', duration: '24 min', type: 'video' },
      { id: 'conditions-loops', title: 'Condiciones y bucles', duration: '29 min', type: 'video' },
      { id: 'mini-project', title: 'Mini proyecto de practica', duration: '45 min', type: 'project' },
    ],
  },
  {
    id: 'web-basics',
    title: 'HTML, CSS y la web',
    level: 'Principiante',
    duration: '5 semanas',
    progress: 0,
    description:
      'Aprende como se construye una pagina web moderna y como darle estructura, estilo y adaptacion mobile.',
    outcomes: [
      'Maquetar interfaces limpias',
      'Entender responsive design',
      'Publicar una landing real',
    ],
    lessons: [
      { id: 'html-structure', title: 'Estructura HTML', duration: '20 min', type: 'video' },
      { id: 'css-basics', title: 'CSS desde cero', duration: '28 min', type: 'video' },
      { id: 'responsive-layouts', title: 'Responsive y layouts', duration: '33 min', type: 'video' },
      { id: 'landing-project', title: 'Proyecto: landing completa', duration: '60 min', type: 'project' },
    ],
  },
  {
    id: 'javascript-starter',
    title: 'JavaScript inicial',
    level: 'Inicial',
    duration: '6 semanas',
    progress: 0,
    description:
      'Domina JavaScript para empezar a darle comportamiento real a tus aplicaciones y proyectos web.',
    outcomes: [
      'Manipular datos y listas',
      'Entender funciones y eventos',
      'Crear interacciones utiles en el navegador',
    ],
    lessons: [
      { id: 'js-syntax', title: 'Sintaxis y tipos', duration: '26 min', type: 'video' },
      { id: 'functions-arrays', title: 'Funciones y arrays', duration: '31 min', type: 'video' },
      { id: 'dom-events', title: 'DOM y eventos', duration: '30 min', type: 'video' },
      { id: 'app-project', title: 'Proyecto: app interactiva', duration: '75 min', type: 'project' },
    ],
  },
]

export const labsRoadmap = [
  { step: '01', title: 'Entender fundamentos', description: 'Logica, herramientas, variables, funciones y lectura de codigo.' },
  { step: '02', title: 'Construir para la web', description: 'HTML, CSS, responsive design y componentes visuales.' },
  { step: '03', title: 'Programar con JavaScript', description: 'Interactividad, estado, eventos y estructura de aplicaciones.' },
  { step: '04', title: 'Publicar proyectos', description: 'Portfolio, iteracion, practica guiada y siguiente especializacion.' },
]

export const labsAdminSeed = {
  students: [
    {
      id: 'student-demo',
      name: 'Lucia Perez',
      email: 'lucia@demo.fuzzdea',
      status: 'active',
      cohort: 'Abril 2026',
      plan: 'Mensual',
      progress: 24,
      joinedAt: '2026-04-02',
    },
    {
      id: 'student-two',
      name: 'Diego Romero',
      email: 'diego@demo.fuzzdea',
      status: 'trial',
      cohort: 'Abril 2026',
      plan: 'Pendiente',
      progress: 8,
      joinedAt: '2026-04-04',
    },
  ],
  announcements: [
    {
      id: 'announcement-1',
      title: 'Nuevo modulo de JavaScript',
      body: 'Ya esta disponible el modulo inicial de JavaScript con ejercicios y proyecto guiado.',
      audience: 'Todos',
      publishedAt: '2026-04-06',
    },
  ],
}

export const labsSubscriptionFeatures = [
  'Acceso a todos los modulos publicados',
  'Nuevas clases y proyectos cada mes',
  'Dashboard personal con progreso',
  'Acceso al roadmap completo',
  'Panel administrativo para operar la academia',
]
