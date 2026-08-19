const LOGO_SRC = "assets/logos-institucionales.png";
const MATHUP_HEADER_SRC = "assets/mathup-header.png";
const STUDENT_PASSWORD = window.APP_CONFIG?.STUDENT_PASSWORD || "";
const ADMIN_PASSWORD = window.APP_CONFIG?.ADMIN_PASSWORD || "";
const DEVELOPER_MODE = window.APP_CONFIG?.DEVELOPER_MODE === true;
const REPORT_KEY = "margaritaSalasReports";
const GAME_PROGRESS_KEY = "margaritaSalasGameProgress";
const DEFAULT_QUESTION_SECONDS = 120;
const DEFAULT_QUESTIONS_PER_CHALLENGE = 10;
const DEFAULT_ACADEMIC_YEAR = "2026-2027";
const ACADEMIC_YEARS = ["2026-2027", "2025-2026"];
const ESO_COURSE_IDS = ["1eso", "2eso", "3eso", "4eso-a", "4eso-b"];
const BACH_II_COURSE_IDS = ["2bach-mates", "2bach-ccss"];
const FIRST_BACH_COURSE_IDS = ["1bach-mates", "1bach-ccss"];
const BACH_II_PAU_COMMUNITY_KEY = "margarita-bach-ii-pau-community-v1";
const BACH_II_PAU_COMMUNITIES = {
  clm: "Castilla-La Mancha",
  madrid: "Madrid"
};

const BACH_II_BLOCKS = {
  "2bach-mates": [
    {
      id: "algebra",
      label: "Bloque de álgebra",
      description: "Matrices, determinantes y sistemas de ecuaciones.",
      slot: "block-slot-left-top",
      topics: [0, 1, 2]
    },
    {
      id: "analisis",
      label: "Bloque de análisis",
      description: "Límites, continuidad, derivadas e integrales.",
      slot: "block-slot-right-top",
      topics: [6, 7, 8, 9, 10, 11]
    },
    {
      id: "geometria",
      label: "Bloque de geometría",
      description: "Vectores, rectas, planos y propiedades métricas.",
      slot: "block-slot-left-bottom",
      topics: [3, 4, 5]
    },
    {
      id: "probabilidad-estadistica",
      label: "Bloque de probabilidad y estadística",
      description: "Probabilidad y distribuciones de probabilidad.",
      slot: "block-slot-right-bottom",
      topics: [12, 13]
    }
  ],
  "2bach-ccss": [
    {
      id: "algebra",
      label: "Bloque de álgebra",
      description: "Matrices, determinantes, sistemas y programación lineal.",
      slot: "block-slot-left-top",
      topics: [0, 1, 2, 3]
    },
    {
      id: "analisis",
      label: "Bloque de análisis",
      description: "Límites, continuidad, derivadas e integrales.",
      slot: "block-slot-left-bottom",
      topics: [4, 5, 6, 7]
    },
    {
      id: "probabilidad",
      label: "Bloque de probabilidad",
      description: "Experimentos aleatorios y cálculo de probabilidades.",
      slot: "block-slot-right-top",
      topics: [8]
    },
    {
      id: "estadistica",
      label: "Bloque de estadística",
      description: "Distribuciones, muestreo e inferencia estadística.",
      slot: "block-slot-right-bottom",
      topics: [9, 10]
    }
  ]
};

const courses = [
  {
    id: "1eso",
    name: "1º ESO",
    label: "Matematicas 1º ESO",
    pdf: "Infografías 1º ESO/1-Números naturales - Infografía.pdf",
    resources: [
      "Infografías 1º ESO/1-Números naturales - Infografía.pdf",
      "Infografías 1º ESO/2-Números enteros - Infografía.pdf",
      "Infografías 1º ESO/3-Potencias y raíces cuadradas - Infografía.pdf",
      "Infografías 1º ESO/4-Fracciones - Infografía.pdf",
      "Infografías 1º ESO/5-Expresiones algebraicas - Infografía.pdf",
      "Infografías 1º ESO/6-Proporcionalidad - Infografía.pdf",
      "Infografías 1º ESO/7-Medida, ángulos, rectas y circunferencias - Infografía.pdf",
      "Infografías 1º ESO/8-Semejanza, Pitágoras y áreas - Infografía.pdf",
      "Infografías 1º ESO/9-Cuerpos geométricos - Infografía.pdf",
      "Infografías 1º ESO/10-Funciones - Infografía.pdf"
    ],
    exerciseResources: [
      [
        "documentos/1º ESO/Ejercicios/Ejercicios de números naturales.pdf",
        "documentos/1º ESO/Ejercicios/problemas Ejercicios de números natuales.pdf"
      ],
      [
        "documentos/1º ESO/Temas mios/2-Numeros enteros Ejercicios.doc",
        "documentos/1º ESO/Ejercicios/Repaso_enteros.pdf"
      ],
      "documentos/1º ESO/Ejercicios/potencias_raices.pdf",
      [
        "documentos/1º ESO/Temas mios/4-Fracciones Ejercicios.doc",
        "documentos/1º ESO/Ejercicios/ejercicios1-de-fracciones-1eso.pdf"
      ],
      "documentos/1º ESO/Temas mios/5-Expresiones algebraicas Ejercicios.doc",
      [
        "documentos/1º ESO/Temas mios/6-Proporcionalidad Ejercicios.doc",
        "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf"
      ],
      [
        "documentos/1º ESO/Temas mios/7-Medida. Ángulos, Rectas, Circunferencias.doc",
        "documentos/1º ESO/Ejercicios/Ejercicios de medidas, angulos rectas.pdf"
      ],
      "documentos/1º ESO/Ejercicios/Ejercicios de Perímetros y áreas.pdf",
      "documentos/1º ESO/Temas mios/9-Cuerpos geometricos Ejercicios.doc",
      "documentos/1º ESO/Temas mios/10-Funciones Ejercicios.doc"
    ],
    themes: [
      "Numeros naturales",
      "Numeros enteros",
      "Potencias y raices cuadradas",
      "Fracciones y numeros decimales",
      "Expresiones algebraicas",
      "Proporcionalidad",
      "Medida, angulos, rectas y circunferencias",
      "Semejanza, Pitagoras y areas",
      "Cuerpos geometricos",
      "Funciones"
    ]
  },
  {
    id: "2eso",
    name: "2º ESO",
    label: "Matematicas 2º ESO",
    pdf: "Infografías 2º ESO/1-Números enteros - Infografía.pdf",
    resources: [
      "Infografías 2º ESO/1-Números enteros - Infografía.pdf",
      "Infografías 2º ESO/2-Potencias y raíces cuadradas - Infografía.pdf",
      "Infografías 2º ESO/3-Fracciones - Infografía.pdf",
      "Infografías 2º ESO/4-Proporcionalidad - Infografía.pdf",
      "Infografías 2º ESO/5-Expresiones algebraicas - Infografía.pdf",
      "Infografías 2º ESO/6-Sistemas de ecuaciones - Infografía.pdf",
      "Infografías 2º ESO/7-Figuras planas - Infografía.pdf",
      "Infografías 2º ESO/8-Cuerpos geométricos - Infografía.pdf",
      "Infografías 2º ESO/9-Funciones - Infografía.pdf"
    ],
    exerciseResources: [
      "documentos/2º ESO/Temas mios/1-Numeros enteros Ejercicios.doc",
      "documentos/2º ESO/Temas mios/2-Potencias y Raíces Cuadradas Ejercicios.doc",
      "documentos/2º ESO/Temas mios/3-Fracciones Ejercicios.doc",
      "documentos/2º ESO/Temas mios/4-Proporcionalidad Ejercicios.doc",
      "documentos/2º ESO/Temas mios/5-Expresiones algebraicas Ejercicios.doc",
      "documentos/2º ESO/Temas mios/6-Sistemas de ecuaciones Ejercicios.doc",
      "documentos/2º ESO/Temas mios/7-Figuras planas Ejercicios.doc",
      "documentos/2º ESO/Temas mios/8-Cuerpos geometricos Ejercicios.doc",
      "documentos/2º ESO/Temas mios/9-Funciones Ejercicios.doc"
    ],
    themes: [
      "Numeros enteros",
      "Potencias y raices cuadradas",
      "Fracciones",
      "Proporcionalidad",
      "Expresiones algebraicas",
      "Sistemas de ecuaciones",
      "Figuras planas",
      "Cuerpos geometricos",
      "Funciones"
    ]
  },
  {
    id: "3eso",
    name: "3º ESO",
    label: "Matematicas 3º ESO",
    pdf: "Infografías 3º ESO/1-Números reales - Infografía.pdf",
    resources: [
      "Infografías 3º ESO/1-Números reales - Infografía.pdf",
      "Infografías 3º ESO/2-Potencias y raíces - Infografía.pdf",
      "Infografías 3º ESO/3-Expresiones algebraicas - Infografía.pdf",
      "Infografías 3º ESO/4-Ecuaciones y sistemas de ecuaciones - Infografía.pdf",
      "Infografías 3º ESO/5-Proporcionalidad - Infografía.pdf",
      "Infografías 3º ESO/6-Sucesiones - Infografía.pdf",
      "Infografías 3º ESO/7-Cuerpos geométricos - Infografía.pdf",
      "Infografías 3º ESO/8-Funciones - Infografía.pdf",
      "Infografías 3º ESO/9-Estadística - Infografía.pdf",
      "Infografías 3º ESO/10-Probabilidad - Infografía.pdf"
    ],
    exerciseResources: [
      "documentos/3º ESO/Temas mios/1-Nº Reales Ejercicios.doc",
      "documentos/3º ESO/Temas mios/2-Potencias y Raíces Ejercicio.doc",
      "documentos/3º ESO/Temas mios/3-Expresiones algebraicas Ejercicios.doc",
      "documentos/3º ESO/Temas mios/4-Ecuaciones y  sistemas de ecuaciones Ejercicios.doc",
      "documentos/3º ESO/Temas mios/5-Proporcionalidad Ejercicios.doc",
      "documentos/3º ESO/Temas mios/6-Sucesiones Ejercicios.doc",
      "documentos/3º ESO/Temas mios/7-Cuerpos geométricos Ejercicios.doc",
      "documentos/3º ESO/Temas mios/8-Funciones Ejercicios.doc",
      "documentos/3º ESO/Temas mios/9-Estadística Ejercicios.doc",
      "documentos/3º ESO/Temas mios/10-Probabilidad Ejercicios.doc"
    ],
    themes: [
      "Numeros reales",
      "Potencias y raices",
      "Expresiones algebraicas",
      "Ecuaciones y sistemas de ecuaciones",
      "Proporcionalidad",
      "Sucesiones",
      "Cuerpos geometricos",
      "Funciones",
      "Estadistica",
      "Probabilidad"
    ]
  },
  {
    id: "4eso-a",
    name: "4º ESO opcion A",
    label: "Matematicas A",
    pdf: "Infografías 4 ESO A/1-Números reales - Infografía.pdf",
    resources: [
      "Infografías 4 ESO A/1-Números reales - Infografía.pdf",
      "Infografías 4 ESO A/2-Radicales - Infografía.pdf",
      "Infografías 4 ESO A/3-Proporcionalidad - Infografía.pdf",
      "Infografías 4 ESO A/4-Expresiones algebraicas - Infografía.pdf",
      "Infografías 4 ESO A/5-Ecuaciones e inecuaciones - Infografía.pdf",
      "Infografías 4 ESO A/6-Sistemas de ecuaciones e inecuaciones - Infografía.pdf",
      "Infografías 4 ESO A/7-Semejanza y trigonometría - Infografía.pdf",
      "Infografías 4 ESO A/8-Áreas y cuerpos geométricos - Infografía.pdf",
      "Infografías 4 ESO A/9-Funciones - Infografía.pdf"
    ],
    exerciseResources: [
      "documentos/4 ESO A/Temas mios/1-Nº Reales Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/2-Radicales Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/3-Proporcionalidad Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/4-Expresiones algebraicas Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/5-Ecuaciones e inecuacioines Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/6-Sistemas de ecuaciones e inecuaciones Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/7-Semejanza y Trigonometría Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/8-Áreas y Cuerpos geométricos Ejercicios.doc",
      "documentos/4 ESO A/Temas mios/9-Funciones Ejercicio.pdf"
    ],
    themes: [
      "Numeros reales",
      "Radicales",
      "Proporcionalidad",
      "Expresiones algebraicas",
      "Ecuaciones e inecuaciones",
      "Sistemas de ecuaciones e inecuaciones",
      "Semejanza y trigonometria",
      "Areas y cuerpos geometricos",
      "Funciones"
    ]
  },
  {
    id: "4eso-b",
    name: "4º ESO opcion B",
    label: "Matematicas B",
    pdf: "Infografías 4º ESO B/1-Números reales - Infografía.pdf",
    resources: [
      "Infografías 4º ESO B/1-Números reales - Infografía.pdf",
      "Infografías 4º ESO B/2-Radicales y logaritmos - Infografía.pdf",
      "Infografías 4º ESO B/3-Expresiones algebraicas - Infografía.pdf",
      "Infografías 4º ESO B/4-Ecuaciones y sistemas de ecuaciones - Infografía.pdf",
      "Infografías 4º ESO B/5-Inecuaciones y sistemas de inecuaciones - Infografía.pdf",
      "Infografías 4º ESO B/6-Proporcionalidad - Infografía.pdf",
      "Infografías 4º ESO B/7-Semejanza - Infografía.pdf",
      "Infografías 4º ESO B/8-Trigonometría - Infografía.pdf",
      "Infografías 4º ESO B/9-Geometría analítica - Infografía.pdf",
      "Infografías 4º ESO B/10-Funciones - Infografía.pdf",
      "Infografías 4º ESO B/11-Límite de funciones - Infografía.pdf",
      "Infografías 4º ESO B/12-Derivadas - Infografía.pdf",
      "Infografías 4º ESO B/13-Límite de sucesiones - Infografía.pdf",
      "Infografías 4º ESO B/14-Combinatoria - Infografía.pdf"
    ],
    exerciseResources: [
      "documentos/4º ESO B/Temas mios/1-Nº Reales Rev1 Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/2-Radicales y Logaritmos Rev1 Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/3-Expresiones algebraicas Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/4-Ecuaciones y sistemas de ecuaciones Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/5-Inecuaciones y sistemas de inecuaciones Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/6-Proporcionalidad Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/7-Semejanza Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/8-Trigonometría Rev 1 Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/9-Geometría analítica Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/10-Funciones Ejercicio.doc",
      "documentos/4º ESO B/Temas mios/11-Límite de Funciones Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/12-Derivadas Ejercicios.doc",
      "documentos/4º ESO B/Temas mios/13-Límite de Sucesiones Ejerciicos.doc",
      "documentos/4º ESO B/Temas mios/14-Combinatoria Ejercicios.doc"
    ],
    themes: [
      "Numeros reales",
      "Radicales y logaritmos",
      "Expresiones algebraicas",
      "Ecuaciones y sistemas de ecuaciones",
      "Inecuaciones y sistemas de inecuaciones",
      "Proporcionalidad",
      "Semejanza",
      "Trigonometria",
      "Geometria analitica",
      "Funciones",
      "Limite de funciones",
      "Derivadas",
      "Limite de sucesiones",
      "Combinatoria"
    ]
  },
  {
    id: "1bach-ccss",
    name: "1º Bachillerato CCSS I",
    label: "Matematicas aplicadas CCSS I",
    folder: "documentos/1º BACHILLERATO CCSSI",
    resources: [
      "documentos/1º BACHILLERATO CCSSI/1-Estadística Unidimensional y Bidimensional Teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/2-Probabilidad teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/3-Distribución de probabilidad. Distribución Binomial teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/4-Distribuciones continuas. Distribuición normal teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/5-Nº Reales teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/6-Nº Complejos teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/7- Ecuaciones y Sistemas teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/8- Inecuaciones y Sistemas teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/9- Funciones teoria.pdf",
      "documentos/1º BACHILLERATO CCSSI/10-Derivadas.pdf",
      "documentos/1º BACHILLERATO CCSSI/11-Aplicación de Derivadas.pdf",
      "documentos/1º BACHILLERATO CCSSI/12-Combinatoria Teoria.pdf"
    ],
    themes: [
      "Estadistica unidimensional y bidimensional",
      "Probabilidad",
      "Distribucion binomial",
      "Distribucion normal",
      "Numeros reales",
      "Numeros complejos",
      "Ecuaciones y sistemas",
      "Inecuaciones y sistemas",
      "Funciones",
      "Derivadas",
      "Aplicacion de derivadas",
      "Combinatoria"
    ]
  },
  {
    id: "1bach-mates",
    name: "1º Bachillerato Matematicas I",
    label: "Matematicas I",
    folder: "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I",
    resources: [
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/1-Nº Reales.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/2-Nº Complejos.docx",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/3- Ecuaciones, Sistemas e inecuaciones.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/4-Trigonometría.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/5-Geometría analítica.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/6-Cónicas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/7-Funciones.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/8-Límite de Sucesiones y Funciones.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/9-Derivadas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/1ª BACHILLERATO MATES I/10-Aplicación de Derivadas.doc",
      "documentos/1ª BACHILLERATO MATES I/11-Probabilidad teoria.pdf"
    ],
    themes: [
      "Numeros reales",
      "Numeros complejos",
      "Ecuaciones, sistemas e inecuaciones",
      "Trigonometria",
      "Geometria analitica",
      "Conicas",
      "Funciones",
      "Limite de sucesiones y funciones",
      "Derivadas",
      "Aplicacion de derivadas",
      "Probabilidad"
    ]
  },
  {
    id: "2bach-ccss",
    name: "2º Bachillerato CCSS II",
    label: "Matematicas aplicadas CCSS II",
    folder: "documentos/2º Bachillerato CCSS II",
    resources: [
      "book-resources/theory-pdfs/2bach-ccss/Tema 1.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 2.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 3.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 4.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 5.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 6.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 7.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 8.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 9.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 10.pdf",
      "book-resources/theory-pdfs/2bach-ccss/Tema 11.pdf"
    ],
    themes: [
      "Matrices",
      "Determinantes",
      "Sistemas con determinantes",
      "Programación lineal",
      "Límites y continuidad",
      "Derivadas y aplicaciones",
      "Integrales indefinidas",
      "Integrales definidas",
      "Probabilidad",
      "Distribución binomial y normal",
      "Muestreo e inferencia estadística"
    ]
  },
  {
    id: "2bach-mates",
    name: "2º Bachillerato Matematicas II",
    label: "Matematicas II",
    folder: "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II",
    resources: [
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/1-Matrices.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/2-Determinantes.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/3- Resolución de sistemas mediante determinantes.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/4-Vectores en el Espacio.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/5-Planos y rectas en el espacio.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/6-Propiedades métricas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/7-Límite de Sucesiones y Funciones.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/8-Continuidad.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/9-Derivadas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/10-Aplicación de Derivadas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/11-Integrales indefinidas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/12-Integrales definidas.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/13-Probabilidad.doc",
      "C:/Users/aherr/OneDrive/Escritorio/2º Bachillerato Mates II/14-Distribución de probabilidad. Distribución Binomial.doc"
    ],
    themes: [
      "Matrices",
      "Determinantes",
      "Sistemas con determinantes",
      "Vectores en el espacio",
      "Planos y rectas en el espacio",
      "Propiedades métricas",
      "Límite de sucesiones y funciones",
      "Continuidad",
      "Derivadas",
      "Aplicación de derivadas",
      "Integrales indefinidas",
      "Integrales definidas",
      "Probabilidad",
      "Distribución binomial y normal"
    ]
  }
];

const groupRules = {
  "1eso": ["A", "B", "C", "D", "E"],
  "2eso": ["A", "B", "C", "D", "E"],
  "3eso": ["A", "B", "C", "D", "E"],
  "4eso-a": ["A", "B", "C", "D", "E"],
  "4eso-b": ["A", "B", "C", "D", "E"],
  "1bach-ccss": ["A", "B", "C", "D"],
  "1bach-mates": ["A", "B", "C", "D"],
  "2bach-ccss": ["A", "B", "C", "D"],
  "2bach-mates": ["A", "B", "C", "D"]
};

const academicYearGroups = ACADEMIC_YEARS.reduce((years, year) => {
  years[year] = groupRules;
  return years;
}, {});

const sampleNames = [
  "Alba Martin", "Bruno Garcia", "Clara Sanchez", "Daniel Lopez", "Elena Ruiz", "Felix Moreno",
  "Gema Torres", "Hugo Navarro", "Irene Molina", "Javier Romero", "Laura Diaz", "Marcos Vega",
  "Nuria Ortega", "Oscar Prieto", "Paula Cano", "Raul Serrano", "Sara Medina", "Tomas Gil"
];

const COURSE_DISPLAY_ORDER = ["1eso", "2eso", "3eso", "4eso-a", "4eso-b", "1bach-mates", "1bach-ccss", "2bach-mates", "2bach-ccss"];

const COURSE_DISPLAY_NAMES = {
  "1eso": "1\u00ba ESO",
  "2eso": "2\u00ba ESO",
  "3eso": "3\u00ba ESO",
  "4eso-a": "4\u00ba ESO Opci\u00f3n A",
  "4eso-b": "4\u00ba ESO Opci\u00f3n B",
  "1bach-mates": "1\u00ba Bachillerato Matem\u00e1ticas I",
  "1bach-ccss": "1\u00ba Bachillerato CCSS I",
  "2bach-mates": "2\u00ba Bachillerato Matem\u00e1ticas II",
  "2bach-ccss": "2\u00ba Bachillerato CCSS II"
};

function courseDisplayName(courseOrId) {
  const id = typeof courseOrId === "string" ? courseOrId : courseOrId?.id;
  return COURSE_DISPLAY_NAMES[id] || courseOrId?.name || id || "";
}

function courseDisplayLabel(courseOrId) {
  return courseDisplayName(courseOrId);
}

function orderedCourses() {
  return COURSE_DISPLAY_ORDER
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);
}

const students = ACADEMIC_YEARS.flatMap((academicYear, yearIndex) =>
  courses.flatMap((course, courseIndex) =>
    (academicYearGroups[academicYear]?.[course.id] || []).map((group, groupIndex) => ({
      academicYear,
      name: sampleNames[(courseIndex * 5 + groupIndex + yearIndex * 3) % sampleNames.length],
      group,
      groupLabel: `${courseDisplayName(course)} ${group}`,
      courseId: course.id,
      password: `MS${academicYear.slice(2, 4)}${course.id.replace(/[^0-9ab]/g, "").toUpperCase()}${group}`
    }))
  )
);

const adventureWorlds = {
  "1eso": {
    world: "Reino de los Números",
    boss: "Guardián de los Números",
    guide: "Mati",
    accent: "numbers",
    zones: ["Aldea de los Naturales", "Muralla de los Enteros", "Forja de Potencias", "Puente de Fracciones", "Taller Algebraico", "Valle de la Proporcionalidad", "Mirador de Medidas", "Ruta de Pitágoras", "Ciudad de Cuerpos", "Observatorio de Funciones"]
  },
  "2eso": {
    world: "Reino del Álgebra",
    boss: "Maestro del Álgebra",
    guide: "Delta",
    accent: "algebra",
    zones: ["Muralla de Enteros", "Forja de Potencias", "Mercado de Fracciones", "Ruta Proporcional", "Biblioteca Algebraica", "Puente de Sistemas", "Plaza de Figuras", "Ciudad de Cuerpos", "Observatorio de Funciones"]
  },
  "3eso": {
    world: "Reino del Razonamiento",
    boss: "Sabio de las Funciones",
    guide: "Sigma",
    accent: "reasoning",
    zones: ["Ciudad de los Reales", "Forja de Potencias", "Taller Algebraico", "Distrito de Ecuaciones", "Ruta Proporcional", "Camino de Sucesiones", "Ciudad de Cuerpos", "Observatorio de Funciones", "Archivo Estadístico", "Casa del Azar"]
  },
  "4eso-a": {
    world: "Reino de las Aplicaciones",
    boss: "Arquitecto de los Modelos",
    guide: "Pi",
    accent: "applications",
    zones: ["Ciudad de los Reales", "Cristales Radicales", "Mercado Proporcional", "Taller Algebraico", "Sala de Ecuaciones", "Puente de Sistemas", "Mirador de Semejanza", "Ciudad de Cuerpos", "Observatorio de Funciones"]
  },
  "4eso-b": {
    world: "Reino del Pensamiento Matemático",
    boss: "Maestro Supremo",
    guide: "Euler",
    accent: "thinking",
    zones: ["Umbral Real", "Cristales y Logaritmos", "Taller Algebraico", "Sala de Ecuaciones", "Muralla de Inecuaciones", "Mercado Proporcional", "Mirador de Semejanza", "Cima Trigonométrica", "Plano Analítico", "Observatorio de Funciones", "Frontera del Límite", "Taller de Derivadas", "Camino de Sucesiones", "Cámara Combinatoria"]
  }
};

const firstEsoAdventureCopy = [
  "Los números naturales dan vida a la aldea. Ayuda a ordenar sus caminos.",
  "La muralla cambia de dirección con los signos. Avanza con cuidado.",
  "Enciende la forja dominando potencias y raíces cuadradas.",
  "Reconstruye el puente uniendo fracciones equivalentes.",
  "Convierte palabras y operaciones en lenguaje algebraico.",
  "Devuelve el equilibrio al valle usando proporciones.",
  "Ajusta ángulos y medidas para activar el mirador.",
  "Encuentra la ruta correcta con áreas, semejanza y Pitágoras.",
  "Levanta la ciudad calculando cuerpos y volúmenes.",
  "Activa el observatorio y descubre cómo cambian las funciones."
];

const firstEsoMissionPresentation = {
  learn: { icon: "📖", detail: "Guía visual · pasos esenciales", action: "Abrir guía" },
  train: { icon: "🎯", detail: "10 retos · dificultad a elegir", action: "Elegir nivel" },
  boss: { icon: "🛡️", detail: "Desafío final · energía y racha", action: "Preparar combate" }
};

const adventureMapLayouts = {
  "1eso": [
    [12, 14], [38, 21], [69, 13], [82, 31], [62, 42],
    [31, 38], [13, 56], [36, 68], [67, 61], [82, 79]
  ],
  "2eso": [
    [15, 16], [43, 12], [73, 22], [82, 43], [57, 48],
    [29, 39], [13, 64], [43, 75], [76, 68]
  ],
  "3eso": [
    [12, 18], [34, 10], [63, 17], [82, 34], [63, 44],
    [34, 36], [14, 55], [31, 72], [61, 65], [82, 82]
  ],
  "4eso-a": [
    [14, 14], [43, 10], [74, 21], [81, 45],
    [56, 54], [27, 43], [14, 69], [54, 78], [84, 78]
  ],
  "4eso-b": [
    [13, 9], [39, 14], [69, 8], [82, 22], [65, 31], [35, 27], [13, 40],
    [32, 50], [63, 45], [82, 58], [64, 68], [35, 64], [15, 78], [52, 86]
  ]
};

function adventureMapBackdrop(courseId) {
  const common = `<path class="map-land-horizon" d="M0 82 C18 68 28 75 43 65 C58 56 74 66 100 52 V100 H0 Z" />`;
  const scenes = {
    "1eso": `
      ${common}
      <defs>
        <linearGradient id="first-eso-river" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#61c9ee"/><stop offset=".5" stop-color="#d8f7ff"/><stop offset="1" stop-color="#46aee2"/></linearGradient>
      </defs>
      <path class="map-river map-river-live" d="M3 87 C18 72 31 85 47 68 C62 53 73 70 99 52" />
      <path class="map-mountain first-eso-mountains" d="M2 42 17 17l14 25 11-16 13 18M67 38 82 11l16 27" />
      <circle class="map-sun first-eso-sun" cx="56" cy="13" r="6" />
      <g class="first-eso-cloud cloud-one"><path d="M8 20c1-5 8-6 11-2 3-3 10-1 10 4H8z"/></g>
      <g class="first-eso-cloud cloud-two"><path d="M68 23c1-4 6-5 9-2 3-3 9-1 9 4H68z"/></g>
      <g class="first-eso-village">
        <path d="M7 70v-10l6-6 6 6v10zM21 69v-8l5-5 5 5v8z" />
        <path class="village-roofs" d="M5 61l8-9 8 9M19 62l7-8 7 8" />
      </g>
      <g class="first-eso-windmill" transform="translate(87 72)">
        <path class="windmill-tower" d="M-3 12h6L2-2h-4z" />
        <g class="windmill-blades"><path d="M0 0V-9M0 0l8 4M0 0l-8 4"/><circle cx="0" cy="0" r="1.6"/></g>
      </g>
      <g class="first-eso-trees"><path d="M35 75v8M57 76v8M75 82v7"/><circle cx="35" cy="72" r="5"/><circle cx="57" cy="73" r="5"/><circle cx="75" cy="79" r="5"/></g>
      <g class="first-eso-castle"><path d="M88 47v-14h3v4h4v-4h3v14z"/><path d="M91 47v-7h4v7"/></g>
      <g class="first-eso-sparkles"><circle cx="42" cy="17" r=".7"/><circle cx="62" cy="29" r=".6"/><circle cx="31" cy="33" r=".7"/><circle cx="78" cy="43" r=".6"/></g>
    `,
    "2eso": `
      ${common}
      <path class="map-canal" d="M4 72 C24 61 34 74 52 61 C68 49 79 59 98 47" />
      <path class="map-city" d="M8 49v-12h8v12h6V29h10v20h8V35h9v14M70 39V23h9v16h8V31h8v8" />
      <path class="map-bridge-mark" d="M39 66 C45 54 53 54 59 66" />
    `,
    "3eso": `
      ${common}
      <path class="map-hill-line" d="M2 60 C17 42 31 43 45 59 C57 42 72 39 98 56" />
      <path class="map-tree-line" d="M8 49 13 36l5 13M24 51l6-18 7 18M75 48l6-17 7 17" />
      <circle class="map-moon" cx="57" cy="15" r="6" />
      <path class="map-stars" d="M23 17h.1M34 11h.1M76 16h.1M88 10h.1" />
    `,
    "4eso-a": `
      ${common}
      <path class="map-coast" d="M0 73 C18 63 29 78 44 67 C60 55 72 68 100 49 V100 H0 Z" />
      <path class="map-geometry-mark" d="M14 39 28 16l14 23zM65 18h20v20H65z" />
      <circle class="map-sun" cx="52" cy="14" r="6" />
    `,
    "4eso-b": `
      ${common}
      <path class="map-ridge" d="M0 54 13 36l10 10 16-29 17 28 13-20 13 18 18-24" />
      <path class="map-academy" d="M38 55V37l12-10 12 10v18M34 55h32M44 55V43h12v12" />
      <path class="map-stars" d="M12 17h.1M27 9h.1M70 13h.1M90 8h.1" />
    `
  };
  return `<svg class="map-world-backdrop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${scenes[courseId] || common}</svg>`;
}


let state = {
  view: "login",
  student: null,
  academicYear: DEFAULT_ACADEMIC_YEAR,
  courseId: "3eso",
  topicIndex: 0,
  questionIndex: 0,
  score: 0,
  streak: 0,
  practiceRound: 0,
  topicChallengeLevel: "apprentice",
  blockKey: "",
  pauCommunity: "clm",
  trainingQuestionHistory: {},
  answered: false,
  multipartResponses: [],
  blockChallengeSeed: 0,
  adminYear: DEFAULT_ACADEMIC_YEAR,
  adminMode: "all",
  adminGroup: "",
  adminStudentQuery: "",
  sessionAnswers: []
};

const app = document.getElementById("app");
let timerId = null;
let summaryUtterance = null;
let topicVideoState = null;
let topicPodcastAudio = null;

function courseById(id) {
  return courses.find((course) => course.id === id) || courses[0];
}

function questionsPerChallengeFor(courseOrId) {
  const courseId = typeof courseOrId === "string" ? courseOrId : courseOrId?.id || "";
  if (courseId === "1bach-mates" || courseId === "1bach-ccss") return 8;
  if (courseId === "2bach-mates") return 5;
  if (courseId === "2bach-ccss") return 4;
  return DEFAULT_QUESTIONS_PER_CHALLENGE;
}

function questionSecondsFor(courseOrId) {
  const courseId = typeof courseOrId === "string" ? courseOrId : courseOrId?.id || "";
  if (courseId === "1bach-mates" || courseId === "1bach-ccss") return 4 * 60;
  if (courseId === "2bach-mates" || courseId === "2bach-ccss") return 10 * 60;
  return DEFAULT_QUESTION_SECONDS;
}

function formatTimer(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function fileUrl(path) {
  return encodeURI(`file:///${path.replaceAll("\\", "/")}`);
}

function topicKey(course, topicIndex = state.topicIndex) {
  return `${course.id}-${topicIndex}`;
}

function semanticTopicId(course, topicIndex = state.topicIndex) {
  const esoId = window.ESO_TOPIC_IDS?.[course?.id]?.[topicIndex];
  return esoId ? `${course.id}:${esoId}` : `${course?.id || ""}:topic-${topicIndex}`;
}

function bookExplanationFor(course, topicIndex = state.topicIndex) {
  return window.TOPIC_BOOK_EXPLANATIONS?.[topicKey(course, topicIndex)] || "";
}

function esoTopicInfo(course, topicIndex = state.topicIndex) {
  if (!isEsoCourse(course)) return null;
  return window.ESO_TOPIC_CONTENT_BY_ID?.[semanticTopicId(course, topicIndex)] || null;
}

function isEsoCourse(course) {
  return Boolean(course?.id && course.id.includes("eso"));
}

function isEsoCourseId(courseId) {
  return ESO_COURSE_IDS.includes(courseId);
}

function availableGroupsFor(academicYear, courseId) {
  return academicYearGroups[academicYear]?.[courseId] || groupRules[courseId] || [];
}

function studentsForSelection(academicYear, courseId, group) {
  return students.filter((student) =>
    student.academicYear === academicYear && student.courseId === courseId && student.group === group
  );
}

function currentStudentKey() {
  if (!state.student) return "";
  return [
    state.academicYear || state.student.academicYear || DEFAULT_ACADEMIC_YEAR,
    state.student.courseId || state.courseId || "sin-curso",
    state.student.group || state.student.groupLabel || "sin-grupo",
    state.student.name || state.student.displayName || "sin-nombre"
  ].join("__");
}

function normalizeBachPauCommunity(value) {
  return Object.prototype.hasOwnProperty.call(BACH_II_PAU_COMMUNITIES, value) ? value : "clm";
}

function bachPauCommunityPreferenceKey(courseId = state.courseId, student = state.student) {
  const studentIdentity = student?.id || student?.userId || student?.username || student?.email || student?.name || "alumno";
  return [state.academicYear || DEFAULT_ACADEMIC_YEAR, courseId || "sin-curso", student?.group || student?.groupLabel || "sin-grupo", studentIdentity].join("|");
}

function readBachPauCommunity(courseId = state.courseId, student = state.student) {
  try {
    const preferences = JSON.parse(localStorage.getItem(BACH_II_PAU_COMMUNITY_KEY) || "{}") || {};
    return normalizeBachPauCommunity(preferences[bachPauCommunityPreferenceKey(courseId, student)]);
  } catch (_) {
    return "clm";
  }
}

function currentBachPauCommunity() {
  return normalizeBachPauCommunity(state.pauCommunity);
}

function setBachPauCommunity(value) {
  if (!BACH_II_COURSE_IDS.includes(state.courseId)) return;
  const community = normalizeBachPauCommunity(value);
  state.pauCommunity = community;
  state.blockKey = "";
  state.blockTopicIndexes = [];
  state.challengeQuestionHistory = {};
  state.challengeRoundCache = {};
  try {
    const preferences = JSON.parse(localStorage.getItem(BACH_II_PAU_COMMUNITY_KEY) || "{}") || {};
    preferences[bachPauCommunityPreferenceKey()] = community;
    localStorage.setItem(BACH_II_PAU_COMMUNITY_KEY, JSON.stringify(preferences));
  } catch (_) {
    // La selección sigue activa durante la sesión aunque el almacenamiento local no esté disponible.
  }
  renderBachIIHome();
}

function bachPauCommunityControl(label = "Elegir la comunidad autónoma") {
  const selected = currentBachPauCommunity();
  return `
    <label class="bach-pau-community-control">
      <span>${escapeHtml(label)}</span>
      <select onchange="setBachPauCommunity(this.value)" aria-label="${escapeHtml(label)}">
        ${Object.entries(BACH_II_PAU_COMMUNITIES).map(([value, name]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
      </select>
    </label>
  `;
}

function bachPauRawBanks(courseId = state.courseId) {
  if (currentBachPauCommunity() === "madrid") {
    const excluded = window.MADRID_PAU_AUTHORED?.exclusions?.[courseId] || {};
    return (window.MADRID_PAU_BANK?.[courseId] || []).reduce((banks, exercise) => {
      if (excluded[exercise.id]) return banks;
      const authored = window.MADRID_PAU_AUTHORED?.[courseId]?.[exercise.id]?.exercise;
      const completeExercise = { ...exercise, ...(authored || {}), community: "madrid" };
      if (!banks[completeExercise.blockId]) banks[completeExercise.blockId] = [];
      banks[completeExercise.blockId].push(completeExercise);
      return banks;
    }, {});
  }
  const banks = courseId === "2bach-mates"
    ? window.MATES_II_BLOCK_EXERCISES || {}
    : window.CCSS_II_BLOCK_EXERCISES || {};
  return Object.fromEntries(Object.entries(banks).map(([blockId, exercises]) => [
    blockId,
    (exercises || []).filter((exercise) => !/\bmadrid\b/i.test([
      exercise?.community,
      exercise?.source,
      exercise?.text,
      ...(Array.isArray(exercise?.statement) ? exercise.statement : [])
    ].filter(Boolean).join(" ")))
  ]));
}

window.currentBachPauCommunity = currentBachPauCommunity;

const localPdfResources = {};

const bachInfographics = {
  "1eso": [
    "Infografías 1º ESO/1-Números naturales - Infografía.pdf",
    "Infografías 1º ESO/2-Números enteros - Infografía.pdf",
    "Infografías 1º ESO/3-Potencias y raíces cuadradas - Infografía.pdf",
    "Infografías 1º ESO/4-Fracciones - Infografía.pdf",
    "Infografías 1º ESO/5-Expresiones algebraicas - Infografía.pdf",
    "Infografías 1º ESO/6-Proporcionalidad - Infografía.pdf",
    "Infografías 1º ESO/7-Medida, ángulos, rectas y circunferencias - Infografía.pdf",
    "Infografías 1º ESO/8-Semejanza, Pitágoras y áreas - Infografía.pdf",
    "Infografías 1º ESO/9-Cuerpos geométricos - Infografía.pdf",
    "Infografías 1º ESO/10-Funciones - Infografía.pdf"
  ],
  "2eso": [
    "Infografías 2º ESO/1-Números enteros - Infografía.pdf",
    "Infografías 2º ESO/2-Potencias y raíces cuadradas - Infografía.pdf",
    "Infografías 2º ESO/3-Fracciones - Infografía.pdf",
    "Infografías 2º ESO/4-Proporcionalidad - Infografía.pdf",
    "Infografías 2º ESO/5-Expresiones algebraicas - Infografía.pdf",
    "Infografías 2º ESO/6-Sistemas de ecuaciones - Infografía.pdf",
    "Infografías 2º ESO/7-Figuras planas - Infografía.pdf",
    "Infografías 2º ESO/8-Cuerpos geométricos - Infografía.pdf",
    "Infografías 2º ESO/9-Funciones - Infografía.pdf"
  ],
  "3eso": [
    "Infografías 3º ESO/1-Números reales - Infografía.pdf",
    "Infografías 3º ESO/2-Potencias y raíces - Infografía.pdf",
    "Infografías 3º ESO/3-Expresiones algebraicas - Infografía.pdf",
    "Infografías 3º ESO/4-Ecuaciones y sistemas de ecuaciones - Infografía.pdf",
    "Infografías 3º ESO/5-Proporcionalidad - Infografía.pdf",
    "Infografías 3º ESO/6-Sucesiones - Infografía.pdf",
    "Infografías 3º ESO/7-Cuerpos geométricos - Infografía.pdf",
    "Infografías 3º ESO/8-Funciones - Infografía.pdf",
    "Infografías 3º ESO/9-Estadística - Infografía.pdf",
    "Infografías 3º ESO/10-Probabilidad - Infografía.pdf"
  ],
  "4eso-a": [
    "Infografías 4 ESO A/1-Números reales - Infografía.pdf",
    "Infografías 4 ESO A/2-Radicales - Infografía.pdf",
    "Infografías 4 ESO A/3-Proporcionalidad - Infografía.pdf",
    "Infografías 4 ESO A/4-Expresiones algebraicas - Infografía.pdf",
    "Infografías 4 ESO A/5-Ecuaciones e inecuaciones - Infografía.pdf",
    "Infografías 4 ESO A/6-Sistemas de ecuaciones e inecuaciones - Infografía.pdf",
    "Infografías 4 ESO A/7-Semejanza y trigonometría - Infografía.pdf",
    "Infografías 4 ESO A/8-Áreas y cuerpos geométricos - Infografía.pdf",
    "Infografías 4 ESO A/9-Funciones - Infografía.pdf"
  ],
  "4eso-b": [
    "Infografías 4º ESO B/1-Números reales - Infografía.pdf",
    "Infografías 4º ESO B/2-Radicales y logaritmos - Infografía.pdf",
    "Infografías 4º ESO B/3-Expresiones algebraicas - Infografía.pdf",
    "Infografías 4º ESO B/4-Ecuaciones y sistemas de ecuaciones - Infografía.pdf",
    "Infografías 4º ESO B/5-Inecuaciones y sistemas de inecuaciones - Infografía.pdf",
    "Infografías 4º ESO B/6-Proporcionalidad - Infografía.pdf",
    "Infografías 4º ESO B/7-Semejanza - Infografía.pdf",
    "Infografías 4º ESO B/8-Trigonometría - Infografía.pdf",
    "Infografías 4º ESO B/9-Geometría analítica - Infografía.pdf",
    "Infografías 4º ESO B/10-Funciones - Infografía.pdf",
    "Infografías 4º ESO B/11-Límite de funciones - Infografía.pdf",
    "Infografías 4º ESO B/12-Derivadas - Infografía.pdf",
    "Infografías 4º ESO B/13-Límite de sucesiones - Infografía.pdf",
    "Infografías 4º ESO B/14-Combinatoria - Infografía.pdf"
  ],
  "1bach-mates": [
    "Infografías 1º Bachillerato Mates I/1-Números reales - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/2-Números complejos - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/3-Ecuaciones, sistemas e inecuaciones - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/4-Trigonometría - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/5-Geometría analítica - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/6-Cónicas - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/7-Funciones - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/8-Límite de sucesiones y funciones - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/9-Derivadas - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/10-Aplicación de derivadas - Infografía.pdf",
    "Infografías 1º Bachillerato Mates I/11-Probabilidad - Infografía.pdf"
  ],
  "1bach-ccss": [
    "Infografías 1º Bachillerato CCSSI/1-Estadística unidimensional y bidimensional - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/2-Probabilidad - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/3-Distribución binomial - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/4-Distribuciones continuas y normal - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/5-Números reales - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/6-Números complejos - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/7-Ecuaciones y sistemas - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/8-Inecuaciones y sistemas - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/9-Funciones - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/10-Derivadas - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/11-Aplicación de derivadas - Infografía.pdf",
    "Infografías 1º Bachillerato CCSSI/12-Combinatoria - Infografía.pdf"
  ],
  "2bach-mates": [
    "Infografías 2º Bachillerato Mates II/1-Matrices - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/2-Determinantes - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/3-Resolución de sistemas mediante determinantes - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/4-Vectores en el espacio - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/5-Planos y rectas en el espacio - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/6-Propiedades métricas - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/7-Límite de sucesiones y funciones - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/8-Continuidad - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/9-Derivadas - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/10-Aplicación de derivadas - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/11-Integrales indefinidas - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/12-Integrales definidas - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/13-Probabilidad - Infografía.pdf",
    "Infografías 2º Bachillerato Mates II/14-Distribución de probabilidad y binomial - Infografía.pdf"
  ],
  "2bach-ccss": [
    "Infografías 2º Bachillerato CCSS II/1-Matrices - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/2-Determinantes - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/3-Resolución de sistemas mediante determinantes - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/4-Programación lineal - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/5-Límite de funciones y continuidad - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/6-Derivadas y aplicación de derivadas - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/7-Integrales indefinidas - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/8-Integrales definidas - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/9-Probabilidad - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/10-Distribución de probabilidad, binomial y continuas - Infografía.pdf",
    "Infografías 2º Bachillerato CCSS II/11-Muestreo e inferencia estadística - Infografía.pdf"
  ]
};

function bachInfographicFor(course, topicIndex = state.topicIndex) {
  const mappedInfographic = bachInfographics[course?.id]?.[topicIndex];
  if (mappedInfographic) return mappedInfographic;

  // Mantiene el visor disponible si se incorpora un tema nuevo y su
  // infografía ya está declarada como recurso del curso.
  const courseResource = course?.resources?.[topicIndex];
  return typeof courseResource === "string"
    && /infograf[ií]as?/i.test(courseResource)
    && /\.pdf$/i.test(courseResource)
    ? courseResource
    : "";
}

function infographicViewerUrl(course, topicIndex = state.topicIndex) {
  const infographicPath = bachInfographicFor(course, topicIndex);
  if (!infographicPath) return "";
  const baseUrl = resourceUrl({
    path: infographicPath,
    webPath: infographicPath,
    type: "pdf"
  });
  return `${baseUrl}#view=FitH&toolbar=1&navpanes=0`;
}

function localPdfFor(course, topicIndex = state.topicIndex) {
  if (course?.id === "1bach-ccss") {
    return course.resources?.[topicIndex] || bachInfographicFor(course, topicIndex);
  }
  if (course?.id?.includes("bach")) {
    return `book-resources/theory-pdfs/${course.id}/Tema ${topicIndex + 1}.pdf`;
  }
  const infographic = bachInfographicFor(course, topicIndex);
  if (infographic) return infographic;
  return localPdfResources[topicKey(course, topicIndex)] || localPdfResources[course.id] || "";
}

const pdfTopicPages = {
  "1eso": [6, 22, 36, 66, 52, 82, 108, 116, 118, 130],
  "2eso": [6, 14, 36, 86, 100, 102, 204, 118, 138, 234],
  "3eso": [6, 12, 28, 42, 170, 152, 170, 90, 90, 210],
  "4eso-a": [3, 5, 40, 64, 76, 162, 184, 216, 128, 114],
  "4eso-b": [6, 22, 36, 50, 50, 74, 104, 116, 184, 200]
};

function topicResource(course, topicIndex = state.topicIndex) {
  const esoInfo = esoTopicInfo(course, topicIndex);
  const localPdf = localPdfFor(course, topicIndex);
  const resourcePath = localPdf || esoInfo?.pdfPath || course.resources?.[topicIndex] || course.pdf || course.folder || "";
  // Las infografías propias ya corresponden exactamente al tema completo.
  // No deben heredar la página aproximada del libro general del curso.
  const page = localPdf ? null : (esoInfo?.page || pdfTopicPages[course.id]?.[topicIndex] || null);
  const isPdf = /\.pdf$/i.test(resourcePath);
  const isDocument = /\.(doc|docx)$/i.test(resourcePath);
  return {
    path: resourcePath,
    page: isPdf ? page : null,
    type: isPdf ? "pdf" : isDocument ? "document" : "folder",
    webPath: localPdf || "",
    error: esoInfo?.error || ""
  };
}

function topicBookStatus(course, topicIndex = state.topicIndex) {
  const resource = topicResource(course, topicIndex);
  const esoInfo = esoTopicInfo(course, topicIndex);
  if (esoInfo?.error) return esoInfo.error;
  if (resource.type === "pdf" && esoInfo?.page) {
    return `Libro PDF localizado. El tema empieza en la pagina ${esoInfo.page} del PDF y la teoria se ha extraido de las paginas ${esoInfo.sourcePages}.`;
  }
  if (!resource.path) return "Sin recurso asociado todavía.";
  if (resource.type === "pdf" && resource.page) return `Libro PDF asociado. Apertura aproximada en la página ${resource.page}.`;
  if (resource.type === "pdf") return "Libro PDF asociado. Página exacta pendiente de revisar.";
  if (resource.type === "document") return "Documento del tema asociado. Se abre directamente en Word.";
  return "Carpeta de recursos asociada al curso.";
}

function formattedBookExplanation(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function formattedBookSummary(text) {
  const stopMarkers = ["Ejercicios", "Actividades", "PAEG", "EVAU", "Autoevaluación"];
  const cleanText = stopMarkers.reduce((current, marker) => {
    const index = current.indexOf(marker);
    return index > 400 ? current.slice(0, index) : current;
  }, text);

  return cleanText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 2)
    .slice(0, 9)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function formattedEsoSummary(info) {
  if (!info || info.error) {
    return `<div class="source-error">${escapeHtml(info?.error || "No se ha encontrado teoria suficiente para este tema en el PDF.")}</div>`;
  }

  const items = String(info.summary || "")
    .split(/\n+/)
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);

  if (!items.length) {
    return `<div class="source-error">No se ha podido extraer teoria suficiente de este tramo del PDF.</div>`;
  }

  return `
    <div class="book-summary-lead eso-summary">
      <strong>Resumen extraido del libro</strong>
      <p class="small">Basado solo en la teoria del PDF: paginas ${escapeHtml(info.sourcePages)}. El libro completo se abre en la pagina ${escapeHtml(info.page)}.</p>
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function resourceUrl(resource, theme = "") {
  const baseUrl = resource.webPath ? encodeURI(resource.webPath) : fileUrl(resource.path);
  if (resource.type !== "pdf") return baseUrl;
  const params = [];
  if (resource.page) params.push(`page=${resource.page}`);
  if (theme) params.push(`search=${encodeURIComponent(theme)}`);
  return params.length ? `${baseUrl}#${params.join("&")}` : baseUrl;
}

function openTopicResource() {
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const resource = topicResource(course);
  const resourcePath = resource.path;
  if (!resourcePath) {
    alert("No hay recurso asociado a este tema.");
    return;
  }
  if (resource.error) {
    alert(`${resource.error}\n\nCurso: ${courseDisplayName(course)}\nTema: ${theme}`);
    return;
  }

  const note = document.getElementById("resource-note");
  if (note) {
    note.textContent = `Recurso del tema: ${resourcePath}`;
    note.style.display = "block";
  }

  const url = resourceUrl(resource, theme);
  if (resource.type === "document") {
    alert("Este tema todavía está asociado a un documento de Word. Para evitar el error de Word, necesito que me pases su PDF de teoría como hiciste con los primeros temas.");
    return;
  }

  const targetUrl = url;
  const opened = window.open(targetUrl, "_blank");
  if (!opened) {
    alert(`No se ha podido abrir automáticamente. Ruta del tema:\n${resourcePath}`);
  }
}

function openInfographicSummary() {
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const infographicPath = bachInfographicFor(course, state.topicIndex);
  if (!infographicPath) {
    alert("Todavía no hay infografía asociada a este tema.");
    return;
  }
  const opened = window.open(resourceUrl({ path: infographicPath, webPath: infographicPath, type: "pdf" }, theme), "_blank");
  if (!opened) alert(`No se ha podido abrir automáticamente. Ruta de la infografía:\n${infographicPath}`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function normalizeDisplayText(value) {
  return String(value ?? "")
    .replace(/¿/g, "¿")
    .replace(/¡/g, "¡")
    .replace(/º/g, "º")
    .replace(/ª/g, "ª")
    .replace(/Â±/g, "±")
    .replace(/·/g, "·")
    .replace(/Â/g, "")
    .replace(/Á|Ã�/g, "Á")
    .replace(/á/g, "á")
    .replace(/É/g, "É")
    .replace(/é/g, "é")
    .replace(/Í/g, "Í")
    .replace(/í/g, "í")
    .replace(/Ó/g, "Ó")
    .replace(/ó/g, "ó")
    .replace(/Ú/g, "Ú")
    .replace(/ú/g, "ú")
    .replace(/Ñ/g, "Ñ")
    .replace(/ñ/g, "ñ")
    .replace(/≤/g, "≤")
    .replace(/≥/g, "≥")
    .replace(/≠/g, "≠")
    .replace(/∞/g, "∞")
    .replace(/∩/g, "∩")
    .replace(/∪/g, "∪")
    .replace(/€/g, "€")
    .replace(/σ/g, "σ")
    .replace(/μ/g, "μ")
    .replace(/λ/g, "λ")
    .replace(/t\?rmino/g, "término")
    .replace(/funci\?n/g, "función")
    .replace(/n\?mero/g, "número")
    .replace(/ra\?z/g, "raíz")
    .replace(/par\?bola/g, "parábola")
    .replace(/cuadr\?tica/g, "cuadrática")
    .replace(/notaci\?n cient\?fica/g, "notación científica")
    .replace(/l\?mite/g, "límite")
    .replace(/par\?metro/g, "parámetro")
    .replace(/\?rea/g, "área")
    .replace(/\?D\?nde/g, "¿Dónde")
    .replace(/Resoluci\?n/g, "Resolución")
    .replace(/resoluci\?n/g, "resolución")
    .replace(/ecuaci\?n/g, "ecuación")
    .replace(/Ecuaci\?n/g, "Ecuación")
    .replace(/Solucion guiada:/g, "Resolución paso a paso:")
    .replace(/Solucion:/g, "Resolución:")
    .replace(/Solucion\b/g, "Resolución")
    .replace(/\b([A-Za-z])'(?=\s*(?:=|\(|\)|,|\.|$))/g, "$1′")
    .replace(/(\d(?:[.,]\d+)?)\s+[xX]\s+(?=\d)/g, "$1 · ")
    .replace(/x->/g, "x → ")
    .replace(/\+infinito/g, "+∞")
    .replace(/-infinito/g, "-∞");
}

function normalizeMathNotation(value) {
  return normalizeDisplayText(value)
    .replace(/\\mathbb\{([RNZQC])\}/g, (_, set) => ({ R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" })[set])
    .replace(/\\emptyset\b|\\varnothing\b/g, "∅")
    .replace(/\\(?:subseteq)\b/g, "⊆")
    .replace(/\\(?:supseteq)\b/g, "⊇")
    .replace(/\\(?:subset)\b/g, "⊂")
    .replace(/\\(?:supset)\b/g, "⊃")
    .replace(/\\notin\b/g, "∉")
    .replace(/\\in\b/g, "∈")
    .replace(/\\(?:parallel)\b/g, "∥")
    .replace(/\\(?:perp)\b/g, "⟂")
    .replace(/\\(?:equiv)\b/g, "≡")
    .replace(/\\(?:approx|simeq)\b/g, "≈")
    .replace(/\\(?:propto)\b/g, "∝")
    .replace(/\\(?:pm)\b/g, "±")
    .replace(/\\(?:mp)\b/g, "∓")
    .replace(/\\(?:times)\b/g, "×")
    .replace(/\\(?:cdot)\b/g, "·")
    .replace(/\\(?:div)\b/g, "÷")
    .replace(/\\(?:forall)\b/g, "∀")
    .replace(/\\(?:exists)\b/g, "∃")
    .replace(/\\(?:therefore)\b/g, "∴")
    .replace(/\\(?:Longleftrightarrow|iff)\b/g, " ⇔ ")
    .replace(/\\(?:Leftrightarrow|leftrightarrow)\b/g, " ↔ ")
    .replace(/\\(?:Rightarrow|implies)\b/g, " ⇒ ")
    .replace(/\\(?:rightarrow|to)\b/g, " → ")
    .replace(/\\(?:geqslant|geq|ge)\b/g, " ≥ ")
    .replace(/\\(?:leqslant|leq|le)\b/g, " ≤ ")
    .replace(/\\(?:neq|ne)\b/g, " ≠ ")
    .replace(/\\(?:cup|union)\b/g, " ∪ ")
    .replace(/\\(?:cap|intersection)\b/g, " ∩ ")
    .replace(/\\infty\b/g, "∞")
    .replace(/\s*<\s*=\s*>\s*/g, " ⇔ ")
    .replace(/\s*<\s*-\s*>\s*/g, " ↔ ")
    .replace(/\s*=\s*>\s*/g, " ⇒ ")
    .replace(/\s*-\s*>\s*/g, " → ")
    .replace(/\s*<\s*>\s*/g, " ≠ ")
    .replace(/\s*~\s*=\s*/g, " ≈ ")
    .replace(/\s*>\s*=\s*/g, " ≥ ")
    .replace(/\s*<\s*=\s*/g, " ≤ ")
    .replace(/\s*!\s*=\s*/g, " ≠ ")
    .replace(/\s*=\s*=\s*/g, " = ")
    .replace(/([A-Za-z0-9)\]}])\s*\*\*\s*(-?\d+|\([^()]+\)|[A-Za-z][A-Za-z0-9]*)/g, "$1^$2")
    .replace(/([A-Za-z0-9)\]}])\s*\*\s*(?=[A-Za-z0-9(])/g, "$1 · ")
    .replace(/\bunion\b/gi, "∪")
    .replace(/\bintersecci[oó]n\b/gi, "∩")
    .replace(/\binfinito\b/gi, "∞")
    .replace(/\+\s*\/\s*-/g, "±")
    .replace(/(\d(?:[.,]\d+)?)\s*[xX]\s*(?=\d)/g, "$1 · ")
    .replace(/\b(base|ancho|largo)\s+x\s+(altura|alto|ancho|largo)\b/gi, "$1 · $2")
    .replace(/(\d)\s+grados\b/gi, "$1°")
    .replace(/\b(Calcula(?:r)?)(?:\s+la)?\s+integral\s+de\s+/gi, "$1 ∫ ")
    .replace(/\bintegral\s+de\s+([^\s]+)\s+a\s+([^\s]+)\s+de\s+/gi, "∫_$1^$2 ")
    .replace(/\bx\s*(?:->|→)\s*/gi, "x → ");
}

function renderMatrixMarkup(content, determinant = false) {
  const rows = content
    .split(/\]\s*,\s*\[/)
    .map((row) => row.replace(/^\[|\]$/g, "").split(",").map((cell) => cell.trim()).filter(Boolean))
    .filter((row) => row.length);
  if (!rows.length) return `[[${content}]]`;
  const leftBracket = determinant ? "|" : "(";
  const rightBracket = determinant ? "|" : ")";
  return `<span class="math-matrix ${determinant ? "math-determinant" : ""}" role="img" aria-label="${determinant ? "determinante" : "matriz"}"><span class="matrix-bracket">${leftBracket}</span><span class="matrix-grid">${rows
    .map((row) => `<span class="matrix-row">${row.map((cell) => `<span>${cell}</span>`).join("")}</span>`)
    .join("")}</span><span class="matrix-bracket">${rightBracket}</span></span>`;
}

function replaceBalancedRoots(value) {
  const text = String(value);
  const rootPattern = /(?:sqrt|sqr|raiz|√)\(/gi;
  let result = "";
  let cursor = 0;
  let match;
  while ((match = rootPattern.exec(text)) !== null) {
    result += text.slice(cursor, match.index);
    const contentStart = rootPattern.lastIndex;
    let depth = 1;
    let end = contentStart;
    while (end < text.length && depth > 0) {
      if (text[end] === "(") depth += 1;
      if (text[end] === ")") depth -= 1;
      end += 1;
    }
    if (depth !== 0) {
      result += text.slice(match.index);
      return result;
    }
    const content = text.slice(contentStart, end - 1);
    result += `<span class="math-root"><span class="radicand">${replaceBalancedRoots(content)}</span></span>`;
    cursor = end;
    rootPattern.lastIndex = end;
  }
  return result + text.slice(cursor);
}

function replaceBalancedFractions(value) {
  const text = String(value);
  const fractionPattern = /\\?frac\{/g;
  let result = "";
  let cursor = 0;
  let match;

  const readGroup = (start) => {
    let depth = 1;
    let end = start;
    while (end < text.length && depth > 0) {
      if (text[end] === "{") depth += 1;
      if (text[end] === "}") depth -= 1;
      end += 1;
    }
    return depth === 0 ? end : -1;
  };

  while ((match = fractionPattern.exec(text)) !== null) {
    result += text.slice(cursor, match.index);
    const numeratorStart = fractionPattern.lastIndex;
    const numeratorEnd = readGroup(numeratorStart);
    if (numeratorEnd < 0 || text[numeratorEnd] !== "{") {
      result += text.slice(match.index, fractionPattern.lastIndex);
      cursor = fractionPattern.lastIndex;
      continue;
    }

    const denominatorStart = numeratorEnd + 1;
    const denominatorEnd = readGroup(denominatorStart);
    if (denominatorEnd < 0) {
      result += text.slice(match.index, numeratorEnd + 1);
      cursor = numeratorEnd + 1;
      fractionPattern.lastIndex = cursor;
      continue;
    }

    const numerator = text.slice(numeratorStart, numeratorEnd - 1);
    const denominator = text.slice(denominatorStart, denominatorEnd - 1);
    result += `<span class="math-fraction"><span>${replaceBalancedFractions(numerator)}</span><span>${replaceBalancedFractions(denominator)}</span></span>`;
    cursor = denominatorEnd;
    fractionPattern.lastIndex = cursor;
  }

  return result + text.slice(cursor);
}

function replaceBalancedDelimiters(value) {
  const text = String(value);
  const delimiterPattern = /\b(paren|bracket)\{/g;
  let result = "";
  let cursor = 0;
  let match;

  while ((match = delimiterPattern.exec(text)) !== null) {
    result += text.slice(cursor, match.index);
    const contentStart = delimiterPattern.lastIndex;
    let depth = 1;
    let end = contentStart;
    while (end < text.length && depth > 0) {
      if (text[end] === "{") depth += 1;
      if (text[end] === "}") depth -= 1;
      end += 1;
    }
    if (depth !== 0) {
      result += text.slice(match.index);
      return result;
    }
    const content = replaceBalancedDelimiters(text.slice(contentStart, end - 1));
    const [left, right] = match[1] === "bracket" ? ["[", "]"] : ["(", ")"];
    result += `<span class="math-delimited"><span class="math-delimiter">${left}</span><span class="math-delimited-content">${content}</span><span class="math-delimiter">${right}</span></span>`;
    cursor = end;
    delimiterPattern.lastIndex = end;
  }
  return result + text.slice(cursor);
}

function normalizeCoordinateFractionNotation(value) {
  return String(value).replace(/\b([APQ])([′']?)\(\s*([^()]+)\s*\)/g, (full, point, prime, content) => {
    const coordinates = content.split(/\s*,\s*/);
    if (coordinates.length < 2 || coordinates.some((coordinate) => !/^[+−-]?\d+(?:\/\d+)?$/.test(coordinate))) return full;
    const formatted = coordinates.map((coordinate) => {
      const match = coordinate.match(/^([+−-]?\d+)\/(\d+)$/);
      return match ? `frac{${match[1]}}{${match[2]}}` : coordinate;
    });
    return `${point}${prime}(${formatted.join(", ")})`;
  });
}

function formatMathFragment(value) {
  const exponent = String.raw`(?:-?\d+|\([^()]+\)|[A-Za-zα-ωΑ-Ω][A-Za-z0-9α-ωΑ-Ω]*|[²³⁴⁵⁶⁷⁸⁹⁰⁻]+)`;
  const fractionAtom = String.raw`(?:\b(?:sqrt|sqr|raiz)\([^()]+\)|√[A-Za-z0-9]+|\b(?:P|sen|cos|tg|ln|log)\([^()]+\)(?:\^${exponent})?|\([^()]+\)(?:\^${exponent})?|\b(?:\d+(?:[.,]\d+)?)?[A-Za-zπ]{1,4}(?:\^${exponent}|[²³⁴⁵⁶⁷⁸⁹⁰⁻]+)?(?![A-Za-z0-9])|\b\d+(?:[.,]\d+)?\b)`;
  const fractionPattern = new RegExp(`(${fractionAtom})\\s*\\/\\s*(-?${fractionAtom})`, "g");
  const escapedWithStructures = escapeHtml(normalizeCoordinateFractionNotation(value))
    .replace(/\bdet\s*\[\[([\s\S]*?)\]\]/gi, (_, content) => renderMatrixMarkup(content, true))
    .replace(/\[\[([\s\S]*?)\]\]/g, (_, content) => renderMatrixMarkup(content))
    .replace(/castle\{([^{}]+)\}\{([^{}]+)\}\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="math-fraction math-fraction-castle"><span><span class="math-fraction"><span>$1</span><span>$2</span></span></span><span><span class="math-fraction"><span>$3</span><span>$4</span></span></span></span>');
  const escaped = replaceBalancedFractions(replaceBalancedDelimiters(escapedWithStructures))
    .replace(fractionPattern, '<span class="math-fraction"><span>$1</span><span>$2</span></span>');
  return replaceBalancedRoots(escaped)
    .replace(/√([A-Za-z0-9]+(?:\^[0-9]+)?)/g, (_, content) => `<span class="math-root"><span class="radicand">${content}</span></span>`)
    .replace(/∫_\{([^}]+)\}\^\{([^}]+)\}\s*/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span> ')
    .replace(/∫_([^\s^]+)\^([^\s]+)\s*/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span> ')
    .replace(/∫([₀₁₂₃₄₅₆₇₈₉₋]+)\^([^\s]+)/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span>')
    .replace(/([)\]])_\{([^}]+)\}\^\{([^}]+)\}/g, '$1<span class="math-evaluation"><sup>$3</sup><sub>$2</sub></span>')
    .replace(/([)\]])([₀₁₂₃₄₅₆₇₈₉₋]+)\^([A-Za-zα-ωΑ-Ωπ∞0-9+\-]+)/g, '$1<span class="math-evaluation"><sup>$3</sup><sub>$2</sub></span>')
    .replace(/\blim\s+(x\s*→\s*[^\s<]+)(?:\s+de)?/gi, '<span class="math-limit"><span>lim</span><sub>$1</sub></span>')
    .replace(/\b(sen|cos|tg|tan|ln|log)\^(-?\d+)\(([^)]+)\)/gi, "$1<sup>$2</sup>($3)")
    .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^\{([^{}]+)\}/g, "$1<sup>$2</sup>")
    .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^\(([^()]+)\)/g, "$1<sup>$2</sup>")
    .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^(-?\d+)/g, "$1<sup>$2</sup>")
    .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^([A-Za-zα-ωΑ-Ωπ][A-Za-z0-9α-ωΑ-Ωπ²³]*)/g, "$1<sup>$2</sup>")
    .replace(/([A-Za-z)\]}])_\{([^{}]+)\}/g, "$1<sub>$2</sub>")
    .replace(/([A-Za-z])_([A-Za-z0-9]+)/g, "$1<sub>$2</sub>")
    .replace(/\\overline\{([^}]+)\}/g, '<span class="math-overline">$1</span>')
    .replace(/\bpi\b/g, "π")
    .replace(/\balpha\b/gi, "α")
    .replace(/\bbeta\b/gi, "β")
    .replace(/\bsigma\b/gi, "σ")
    .replace(/\bmu\b/gi, "μ")
    .replace(/\bDelta\b/g, "Δ")
    .replace(/\bR\b/g, "ℝ");
}

function systemEquationLine(value) {
  const text = String(value || "").trim().replace(/[.;]$/, "");
  return text.length > 2 && text.length < 180 && /(?:=|≤|≥|<|>)/.test(text) && !/^\d+[.)]\s/.test(text);
}

function renderSystemMarkup(equations) {
  return `<span class="math-system" role="img" aria-label="sistema de ecuaciones"><span class="math-system-brace">{</span><span class="math-system-lines">${equations
    .map((equation) => `<span>${formatMathFragment(equation.trim().replace(/[.;]$/, ""))}</span>`)
    .join("")}</span></span>`;
}

function formatPiecewise(line) {
  const match = line.match(/^(.*?=)\s*\{\s*(.+?)\s*\}\s*([.,]?)$/i);
  if (!match) return null;
  const branches = match[2].split(/\s*;\s*/).map((branch) => {
    const parts = branch.split(/\s+si\s+/i);
    return parts.length >= 2 ? [parts.shift(), parts.join(" si ")] : null;
  }).filter(Boolean);
  if (branches.length < 2) return null;
  return `${formatMathFragment(match[1])} <span class="math-piecewise" role="img" aria-label="función definida a trozos"><span class="math-system-brace">{</span><span class="math-piecewise-lines">${branches
    .map(([expression, condition]) => `<span><span>${formatMathFragment(expression)}</span><small>si ${formatMathFragment(condition)}</small></span>`)
    .join("")}</span></span>${match[3]}`;
}

function formatInlineSystem(line) {
  const match = line.match(/^(.*?\bsistema\b(?:\s+de\s+ecuaciones(?:\s+\w+)*)?\s*:?)\s*(.+)$/i);
  if (!match) return null;
  const equations = match[2]
    .replace(/[.]$/, "")
    .split(/\s*(?:;|,(?=\s*[^,;]*(?:=|≤|≥|<|>)))\s*/)
    .filter(systemEquationLine);
  if (equations.length < 2) return null;
  return `${formatMathFragment(match[1])} ${renderSystemMarkup(equations)}`;
}

function formatMathText(value) {
  const lines = normalizeMathNotation(value).split(/\\n|\r?\n/);
  const rendered = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const piecewise = formatPiecewise(line);
    if (piecewise) {
      rendered.push(piecewise);
      continue;
    }
    if (/\bsistema\b/i.test(line)) {
      const followingEquations = [];
      let cursor = index + 1;
      while (cursor < lines.length && systemEquationLine(lines[cursor])) {
        followingEquations.push(lines[cursor]);
        cursor += 1;
      }
      if (followingEquations.length >= 2) {
        rendered.push(`${formatMathFragment(line)} ${renderSystemMarkup(followingEquations)}`);
        index = cursor - 1;
        continue;
      }
      const inlineSystem = formatInlineSystem(line);
      if (inlineSystem) {
        rendered.push(inlineSystem);
        continue;
      }
    }
    rendered.push(formatMathFragment(line));
  }
  return rendered.join("<br>");
}

const mathNotationRenderer = window.MargaritaMathRenderer;
if (!mathNotationRenderer) {
  throw new Error("No se ha cargado el renderizador matemático común de Margarita Salas.");
}

normalizeMathNotation = function normalizeMathNotationWithCommonRenderer(value, options = {}) {
  return mathNotationRenderer.normalize(value, options);
};

formatMathFragment = function formatMathFragmentWithCommonRenderer(value, options = {}) {
  return mathNotationRenderer.fragment(value, options);
};

formatMathText = function formatMathTextWithCommonRenderer(value, options = {}) {
  return mathNotationRenderer.text(value, options);
};

renderMatrixMarkup = function renderMatrixMarkupWithCommonRenderer(content, determinant = false, options = {}) {
  return mathNotationRenderer.matrix(content, determinant, options);
};

renderSystemMarkup = function renderSystemMarkupWithCommonRenderer(equations, options = {}) {
  return mathNotationRenderer.system(equations, options);
};

function formatMathHtml(value, options = {}) {
  return mathNotationRenderer.html(value, options);
}

function renderPlaneReflectionDiagram({ plane, pointA, pointQ, pointAprime }) {
  return `
    <figure class="plane-reflection-diagram">
      <svg viewBox="0 0 720 350" role="img" aria-label="Esquema del punto simétrico respecto de un plano">
        <polygon class="reflection-plane-shape" points="105,170 555,112 665,205 215,267"></polygon>
        <text class="reflection-plane-label" x="145" y="225">${escapeHtml(plane)}</text>
        <line class="reflection-perpendicular-line" x1="365" y1="38" x2="398" y2="318"></line>
        <path class="reflection-right-angle" d="M379 184 l18 -2 l2 18"></path>
        <circle class="reflection-point reflection-point-a" cx="365" cy="38" r="8"></circle>
        <circle class="reflection-point reflection-point-q" cx="382" cy="184" r="8"></circle>
        <circle class="reflection-point reflection-point-aprime" cx="398" cy="318" r="8"></circle>
        <text class="reflection-point-label" x="390" y="42">${escapeHtml(pointA)}</text>
        <text class="reflection-point-label" x="405" y="177">${escapeHtml(pointQ)}</text>
        <text class="reflection-point-label" x="423" y="323">${escapeHtml(pointAprime)}</text>
        <text class="reflection-line-label" x="420" y="91">r ⟂ π</text>
      </svg>
      <figcaption>Q es el punto medio de AA′ y la recta r es perpendicular al plano π.</figcaption>
    </figure>
  `;
}

function renderPointPlaneDistanceDiagram({ plane, pointP, pointQ }) {
  return `
    <figure class="point-plane-distance-diagram">
      <svg viewBox="0 0 720 350" role="img" aria-label="Esquema de la distancia perpendicular de un punto a un plano">
        <defs>
          <linearGradient id="distance-plane-fill" x1="0" x2="1">
            <stop offset="0" stop-color="#2a81d2" stop-opacity="0.18"></stop>
            <stop offset="1" stop-color="#14b8a6" stop-opacity="0.28"></stop>
          </linearGradient>
        </defs>
        <polygon class="distance-plane-shape" points="92,192 548,118 665,214 208,288"></polygon>
        <line class="distance-perpendicular-line" x1="432" y1="40" x2="397" y2="217"></line>
        <path class="distance-right-angle" d="M397 217 l20 -3 l3 20"></path>
        <line class="distance-normal-arrow" x1="520" y1="208" x2="543" y2="88"></line>
        <polygon class="distance-normal-arrow-head" points="543,88 532,104 550,107"></polygon>
        <circle class="distance-point distance-point-p" cx="432" cy="40" r="9"></circle>
        <circle class="distance-point distance-point-q" cx="397" cy="217" r="9"></circle>
        <text class="distance-point-label" x="458" y="45">${escapeHtml(pointP)}</text>
        <text class="distance-point-label" x="350" y="207">${escapeHtml(pointQ)}</text>
        <text class="distance-plane-label" x="128" y="253">${escapeHtml(plane)}</text>
        <text class="distance-segment-label" x="444" y="132">d(P,π)=2</text>
        <text class="distance-normal-label" x="550" y="100">n⃗=(3,4,12)</text>
      </svg>
      <figcaption>Q es el pie de la perpendicular desde P al plano π; PQ es paralelo al vector normal n⃗ y su longitud es la distancia.</figcaption>
    </figure>
  `;
}

function renderCofactorMatrixB() {
  const entries = [
    [
      { exponent: 2, minor: "[0,0],[0,1]" },
      { exponent: 3, minor: "[2,0],[-1,1]" },
      { exponent: 4, minor: "[2,0],[-1,0]" }
    ],
    [
      { exponent: 3, minor: "[1,0],[0,1]" },
      { exponent: 4, minor: "[-1,0],[-1,1]" },
      { exponent: 5, minor: "[-1,1],[-1,0]" }
    ],
    [
      { exponent: 4, minor: "[1,0],[0,0]" },
      { exponent: 5, minor: "[-1,0],[2,0]" },
      { exponent: 6, minor: "[-1,1],[2,0]" }
    ]
  ];
  const symbolicMatrix = `
    <span class="math-matrix cofactor-symbolic-matrix" role="img" aria-label="matriz de adjuntos con sus menores">
      <span class="matrix-bracket">(</span>
      <span class="matrix-grid">${entries.map((row) => `
        <span class="matrix-row">${row.map((entry) => `
          <span class="cofactor-entry"><span>(−1)<sup>${entry.exponent}</sup>·</span>${renderMatrixMarkup(entry.minor, true)}</span>
        `).join("")}</span>
      `).join("")}</span>
      <span class="matrix-bracket">)</span>
    </span>
  `;
  return `
    <div class="cofactor-matrix-work">
      <div class="cofactor-matrix-equation"><strong>Adj(B)=</strong>${symbolicMatrix}<strong>=</strong>${renderMatrixMarkup("[0,-2,0],[-1,-1,-1],[0,0,-2]")}</div>
      <div class="cofactor-matrix-equation"><strong>Adj(B<sup>T</sup>)=Adj(B)<sup>T</sup>=</strong>${renderMatrixMarkup("[0,-1,0],[-2,-1,0],[0,-1,-2]")}</div>
    </div>
  `;
}

function renderCramerSystem2000() {
  const items = [
    { determinant: "D", matrix: "[1,-1,0],[0,1,1],[1,0,-2]", value: "−3", variable: "" },
    { determinant: "D_x", matrix: "[5,-1,0],[10,1,1],[3,0,-2]", value: "−33", variable: "x=frac{D_x}{D}=frac{−33}{−3}=11" },
    { determinant: "D_y", matrix: "[1,5,0],[0,10,1],[1,3,-2]", value: "−18", variable: "y=frac{D_y}{D}=frac{−18}{−3}=6" },
    { determinant: "D_z", matrix: "[1,-1,5],[0,1,10],[1,0,3]", value: "−12", variable: "z=frac{D_z}{D}=frac{−12}{−3}=4" }
  ];
  return `<div class="cramer-compact-work">${items.map((item) => `<div class="cramer-compact-item"><div class="cramer-determinant-line"><strong>${formatMathFragment(item.determinant)}=</strong>${renderMatrixMarkup(item.matrix, true)}<strong>=${item.value}</strong></div>${item.variable ? `<div class="cramer-variable-line">${formatMathFragment(item.variable)}</div>` : '<div class="cramer-variable-line">Determinante del sistema</div>'}</div>`).join("")}</div>`;
}

function renderGaussSystem2000() {
  const matrices = [
    { matrix: "[1,-1,0,5],[0,1,1,10],[1,0,-2,3]", operation: "" },
    { matrix: "[1,-1,0,5],[0,1,1,10],[0,1,-2,-2]", operation: "F₃←F₃−F₁" },
    { matrix: "[1,-1,0,5],[0,1,1,10],[0,0,-3,-12]", operation: "F₃←F₃−F₂" }
  ];
  return `<div class="gauss-compact-work">${matrices.map((item, index) => `${index ? `<span class="gauss-operation"><b>→</b><small>${escapeHtml(item.operation)}</small></span>` : ""}${renderMatrixMarkup(item.matrix)}`).join("")}</div><div class="gauss-final-values">${formatMathFragment("z=4; y=6; x=11")}</div>`;
}

function renderAbsParabolaAreaGraph() {
  const plotX = (x) => 360 + 190 * x;
  const plotY = (y) => 300 - 130 * y;
  const parabolaPoints = [];
  for (let index = 0; index <= 58; index += 1) {
    const x = -1.45 + (2.9 * index) / 58;
    parabolaPoints.push(`${plotX(x).toFixed(1)},${plotY(x * x).toFixed(1)}`);
  }
  const areaPath = (start, end, steps = 40) => {
    const path = [];
    for (let index = 0; index <= steps; index += 1) {
      const x = start + ((end - start) * index) / steps;
      path.push(`${index ? "L" : "M"} ${plotX(x).toFixed(1)} ${plotY(Math.abs(x)).toFixed(1)}`);
    }
    for (let index = steps; index >= 0; index -= 1) {
      const x = start + ((end - start) * index) / steps;
      path.push(`L ${plotX(x).toFixed(1)} ${plotY(x * x).toFixed(1)}`);
    }
    path.push("Z");
    return path.join(" ");
  };
  return `
    <figure class="defined-area-diagram">
      <svg viewBox="0 0 720 360" role="img" aria-label="Gráfica de y igual a valor absoluto de x y de y igual a x al cuadrado, con el recinto entre x igual a menos uno y x igual a uno coloreado">
        <rect class="area-graph-background" x="20" y="16" width="680" height="326" rx="18"></rect>
        <line class="area-graph-grid" x1="170" y1="28" x2="170" y2="315"></line>
        <line class="area-graph-grid" x1="550" y1="28" x2="550" y2="315"></line>
        <line class="area-graph-axis" x1="52" y1="300" x2="678" y2="300"></line>
        <line class="area-graph-axis" x1="360" y1="326" x2="360" y2="30"></line>
        <path class="area-region-fill abs-parabola-region abs-parabola-region-left" d="${areaPath(-1, 0)}"></path>
        <path class="area-region-fill abs-parabola-region abs-parabola-region-right" d="${areaPath(0, 1)}"></path>
        <polyline class="area-curve area-curve-parabola" points="${parabolaPoints.join(" ")}"></polyline>
        <polyline class="area-curve area-curve-absolute" points="84.5,26.7 360,300 635.5,26.7"></polyline>
        <g class="area-intersection-points">
          <circle cx="170" cy="170" r="7"></circle>
          <circle cx="360" cy="300" r="7"></circle>
          <circle cx="550" cy="170" r="7"></circle>
        </g>
        <g class="area-axis-labels">
          <text x="154" y="326">x=−1</text>
          <text x="347" y="326">0</text>
          <text x="538" y="326">x=1</text>
          <text x="668" y="294">x</text>
          <text x="370" y="42">y</text>
        </g>
        <text class="area-curve-label area-absolute-label" x="548" y="84">y=|x|</text>
        <text class="area-curve-label area-parabola-label" x="566" y="239">y=x²</text>
        <text class="area-region-label" x="360" y="205">Área</text>
      </svg>
      <figcaption>La región coloreada está exclusivamente entre la función superior y=|x| (roja) y la función inferior y=x² (azul), desde x=−1 hasta x=1.</figcaption>
    </figure>
  `;
}

function renderDefiniteIntegral(lower, upper, integrand) {
  return `<span class="math-integral area-integral" aria-label="integral desde ${escapeHtml(lower)} hasta ${escapeHtml(upper)}"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>${escapeHtml(upper)}</sup><sub>${escapeHtml(lower)}</sub></span></span><span class="area-integrand">${integrand}</span><span class="area-differential">dx</span>`;
}

function renderAbsParabolaSymmetryEquation() {
  return `
    <div class="area-symmetry-equation" role="img" aria-label="A igual a la integral desde menos uno hasta uno de valor absoluto de x menos x al cuadrado, igual a dos por la integral desde cero hasta uno de x menos x al cuadrado">
      <span class="area-equation-symbol">A=</span>
      ${renderDefiniteIntegral("−1", "1", "(|x|−x<sup>2</sup>)")}
      <span class="area-equation-equals">=</span>
      <span>2·</span>${renderDefiniteIntegral("0", "1", "(x−x<sup>2</sup>)")}
    </div>
  `;
}

function renderReciprocalAreaGraph() {
  const plotX = (x) => 64 + x * 230;
  const plotY = (y) => 340 - y * 132;
  const curvePoints = (fn, start, end, steps = 64) => {
    const points = [];
    for (let index = 0; index <= steps; index += 1) {
      const x = start + ((end - start) * index) / steps;
      points.push(`${plotX(x).toFixed(1)},${plotY(fn(x)).toFixed(1)}`);
    }
    return points.join(" ");
  };
  const region = [];
  for (let index = 0; index <= 36; index += 1) {
    const x = 1 + index / 36;
    region.push(`${index ? "L" : "M"} ${plotX(x).toFixed(1)} ${plotY(1 / x).toFixed(1)}`);
  }
  for (let index = 36; index >= 0; index -= 1) {
    const x = 1 + index / 36;
    region.push(`L ${plotX(x).toFixed(1)} ${plotY(1 / (x * x)).toFixed(1)}`);
  }
  region.push("Z");
  const p = { x: plotX(1), y: plotY(1) };
  const q = { x: plotX(2), y: plotY(0.5) };
  const r = { x: plotX(2), y: plotY(0.25) };
  return `
    <figure class="defined-area-diagram reciprocal-area-diagram">
      <svg viewBox="0 0 720 390" role="img" aria-label="Región del primer cuadrante limitada por y igual a uno partido por x, y igual a uno partido por x al cuadrado y la recta x igual a dos">
        <defs><linearGradient id="reciprocal-area-fill" x1="0" x2="1"><stop offset="0" stop-color="#f2b84b" stop-opacity="0.5"></stop><stop offset="1" stop-color="#22b8a7" stop-opacity="0.5"></stop></linearGradient></defs>
        <rect class="area-graph-background" x="18" y="14" width="684" height="360" rx="18"></rect>
        <line class="area-graph-axis" x1="45" y1="340" x2="688" y2="340"></line>
        <line class="area-graph-axis" x1="64" y1="365" x2="64" y2="24"></line>
        <path class="area-region-fill reciprocal-region" d="${region.join(" ")}"></path>
        <line class="area-boundary-guide" x1="${r.x}" y1="${r.y}" x2="${r.x}" y2="340"></line>
        <line class="area-boundary-line" x1="${q.x}" y1="${q.y}" x2="${r.x}" y2="${r.y}"></line>
        <polyline class="area-curve area-curve-reciprocal" points="${curvePoints((x) => 1 / x, 0.46, 2.65)}"></polyline>
        <polyline class="area-curve area-curve-reciprocal-square" points="${curvePoints((x) => 1 / (x * x), 0.67, 2.65)}"></polyline>
        <g class="area-intersection-points"><circle cx="${p.x}" cy="${p.y}" r="6"></circle><circle cx="${q.x}" cy="${q.y}" r="6"></circle><circle cx="${r.x}" cy="${r.y}" r="6"></circle></g>
        <g class="area-axis-labels"><text x="${plotX(1) - 14}" y="367">x=1</text><text x="${plotX(2) - 14}" y="367">x=2</text><text x="677" y="332">x</text><text x="75" y="36">y</text></g>
        <g class="reciprocal-point-labels"><text x="${p.x - 82}" y="${p.y - 14}">P=(1,1)</text><text x="${q.x + 16}" y="${q.y - 10}">Q=(2,½)</text><text x="${r.x + 16}" y="${r.y + 24}">R=(2,¼)</text></g>
        <text class="area-curve-label area-reciprocal-label" x="608" y="254">y=1/x</text>
        <text class="area-curve-label area-reciprocal-square-label" x="608" y="309">y=1/x²</text>
        <text class="area-region-label" x="392" y="242">Área</text>
      </svg>
      <figcaption>El recinto queda entre x=1 y x=2: la curva superior es f(x)=1/x y la inferior es g(x)=1/x². La recta x=2 une Q=(2,½) con R=(2,¼).</figcaption>
    </figure>`;
}

function renderReciprocalAreaIntegral() {
  return `
    <div class="area-display-equation reciprocal-integral-equation" role="img" aria-label="A igual a la integral desde uno hasta dos de uno partido por x menos uno partido por x al cuadrado, diferencial de x">
      <span>A=</span>
      <span class="display-integral"><span class="display-integral-sign">∫</span><span class="display-integral-upper">2</span><span class="display-integral-lower">1</span></span>
      <span class="display-integrand">(${formatMathFragment("frac{1}{x}-frac{1}{x²}")})</span><span>dx</span>
    </div>`;
}

function renderReciprocalBarrowEquation() {
  return `
    <div class="area-display-equation reciprocal-barrow-equation" role="img" aria-label="Aplicación de la regla de Barrow desde uno hasta dos">
      <span>A=</span>
      <span class="barrow-evaluation"><span class="barrow-bracket">[</span><span class="barrow-expression">ln x+${formatMathFragment("frac{1}{x}")}</span><span class="barrow-bracket">]</span><span class="barrow-upper">2</span><span class="barrow-lower">1</span></span>
      <span>=</span><span>(ln 2+${formatMathFragment("frac{1}{2}")})−(ln 1+1)</span><span>=ln 2−${formatMathFragment("frac{1}{2}")}.</span>
    </div>`;
}

function renderDisplayIntegralTerm(lower, upper, integrand, className = "") {
  return `
    <span class="display-integral-term ${className}">
      <span class="display-integral"><span class="display-integral-sign">∫</span><span class="display-integral-upper">${upper}</span><span class="display-integral-lower">${lower}</span></span>
      <span class="display-integrand">${formatMathFragment(integrand)}</span><span class="area-differential">dx</span>
    </span>`;
}

function renderParabolaLineAreaIntegral() {
  return `
    <div class="area-display-equation parabola-line-integral-equation" role="img" aria-label="Área igual a la integral desde uno hasta tres de x al cuadrado menos uno, más la integral desde tres hasta once de once menos x">
      <span>A=</span>
      ${renderDisplayIntegralTerm("1", "3", "(x²−1)", "parabola-integral-term")}
      <span class="area-equation-plus">+</span>
      ${renderDisplayIntegralTerm("3", "11", "(11−x)", "line-integral-term")}
    </div>`;
}

function renderParabolaBarrowEquation() {
  return `
    <div class="area-display-equation parabola-line-barrow-equation" role="img" aria-label="Primera integral evaluada entre uno y tres mediante la regla de Barrow">
      ${renderDisplayIntegralTerm("1", "3", "(x²−1)", "parabola-integral-term")}
      <span>=</span>
      <span class="barrow-evaluation"><span class="barrow-bracket">[</span><span class="barrow-expression">${formatMathFragment("frac{x³}{3}−x")}</span><span class="barrow-bracket">]</span><span class="barrow-upper">3</span><span class="barrow-lower">1</span></span>
      <span>=</span><span>(9−3)−(${formatMathFragment("frac{1}{3}−1")})</span>
      <span>=${formatMathFragment("frac{20}{3}")}.</span>
    </div>`;
}

function renderLineBarrowEquation() {
  return `
    <div class="area-display-equation parabola-line-barrow-equation" role="img" aria-label="Segunda integral evaluada entre tres y once mediante la regla de Barrow">
      ${renderDisplayIntegralTerm("3", "11", "(11−x)", "line-integral-term")}
      <span>=</span>
      <span class="barrow-evaluation"><span class="barrow-bracket">[</span><span class="barrow-expression">${formatMathFragment("11x−frac{x²}{2}")}</span><span class="barrow-bracket">]</span><span class="barrow-upper">11</span><span class="barrow-lower">3</span></span>
      <span>=${formatMathFragment("frac{121}{2}−frac{57}{2}=32")}.</span>
    </div>`;
}

function renderParabolaLineAreaGraph() {
  const plotX = (x) => 64 + x * 52;
  const plotY = (y) => 338 - y * 31;
  const parabola = [];
  const line = [];
  const parabolaRegion = [];
  const lineRegion = [];
  for (let index = 0; index <= 48; index += 1) {
    const x = index * (3.15 / 48);
    parabola.push(`${plotX(x).toFixed(1)},${plotY(x * x - 1).toFixed(1)}`);
  }
  for (let index = 0; index <= 55; index += 1) {
    const x = index * (11 / 55);
    line.push(`${plotX(x).toFixed(1)},${plotY(11 - x).toFixed(1)}`);
  }
  parabolaRegion.push(`M ${plotX(1)} ${plotY(0)}`);
  for (let index = 0; index <= 32; index += 1) {
    const x = 1 + index * (2 / 32);
    parabolaRegion.push(`L ${plotX(x).toFixed(1)} ${plotY(x * x - 1).toFixed(1)}`);
  }
  parabolaRegion.push(`L ${plotX(3)} ${plotY(0)}`, "Z");
  lineRegion.push(`M ${plotX(3)} ${plotY(0)}`, `L ${plotX(3)} ${plotY(8)}`);
  for (let index = 1; index <= 48; index += 1) {
    const x = 3 + index * (8 / 48);
    lineRegion.push(`L ${plotX(x).toFixed(1)} ${plotY(11 - x).toFixed(1)}`);
  }
  lineRegion.push(`L ${plotX(3)} ${plotY(0)}`, "Z");
  return `
    <figure class="defined-area-diagram">
      <svg viewBox="0 0 720 395" role="img" aria-label="Recinto limitado por la parábola y igual a x al cuadrado menos uno, la recta y igual a once menos x y el eje OX">
        <rect class="area-graph-background" x="18" y="14" width="684" height="365" rx="18"></rect>
        <line class="area-graph-axis" x1="38" y1="338" x2="688" y2="338"></line>
        <line class="area-graph-axis" x1="64" y1="365" x2="64" y2="24"></line>
        <path class="area-region-fill parabola-area-region" d="${parabolaRegion.join(" ")}"></path>
        <path class="area-region-fill line-area-region" d="${lineRegion.join(" ")}"></path>
        <polyline class="area-curve area-curve-parabola" points="${parabola.join(" ")}"></polyline>
        <polyline class="area-curve area-curve-line" points="${line.join(" ")}"></polyline>
        <g class="area-intersection-points"><circle cx="${plotX(1)}" cy="${plotY(0)}" r="7"></circle><circle cx="${plotX(3)}" cy="${plotY(8)}" r="7"></circle><circle cx="${plotX(11)}" cy="${plotY(0)}" r="7"></circle></g>
        <g class="area-axis-labels"><text x="${plotX(1) - 14}" y="365">x=1</text><text x="${plotX(3) - 15}" y="365">x=3</text><text x="${plotX(11) - 21}" y="365">x=11</text><text x="677" y="331">x</text><text x="75" y="36">y</text></g>
        <text class="area-curve-label area-parabola-label" x="205" y="72">y=x²−1</text><text class="area-curve-label area-line-label" x="456" y="111">y=11−x</text>
        <text class="area-region-label parabola-area-label" x="148" y="305">Área 1</text><text class="area-region-label line-area-region-label" x="425" y="285">Área 2</text>
      </svg>
      <figcaption>En azul, el área bajo la parábola entre x=1 y x=3. En verde, el área bajo la recta entre x=3 y x=11.</figcaption>
    </figure>`;
}

function renderDerivativeCycle2008() {
  const columns = [
    {
      title: "Función y derivadas 1.ª–3.ª",
      entries: [
        { cycle: 1, expression: "f(x)=7·sen(x)−5·cos(x)" },
        { cycle: 2, expression: "f′(x)=7·cos(x)+5·sen(x)" },
        { cycle: 3, expression: "f″(x)=−7·sen(x)+5·cos(x)" },
        { cycle: 4, expression: "f‴(x)=−7·cos(x)−5·sen(x)" }
      ]
    },
    {
      title: "Derivadas IV–VII",
      entries: [
        { cycle: 1, expression: "f^{IV}(x)=7·sen(x)−5·cos(x)=f(x)" },
        { cycle: 2, expression: "f^{V}(x)=7·cos(x)+5·sen(x)=f′(x)" },
        { cycle: 3, expression: "f^{VI}(x)=−7·sen(x)+5·cos(x)=f″(x)" },
        { cycle: 4, expression: "f^{VII}(x)=−7·cos(x)−5·sen(x)=f‴(x)" }
      ]
    }
  ];
  return `
    <div class="derivative-cycle-grid" role="img" aria-label="La función y sus siete primeras derivadas, distribuidas en dos columnas, muestran que las expresiones se repiten cada cuatro órdenes">
      ${columns.map((column) => `
        <section class="derivative-cycle-column">
          <h4>${column.title}</h4>
          ${column.entries.map((entry) => `<div class="derivative-cycle-row cycle-${entry.cycle}">${formatMathFragment(entry.expression)}</div>`).join("")}
        </section>
      `).join("")}
    </div>
  `;
}

function formatSolutionText(value) {
  const officialSolutionImages = [];
  const signCharts = [];
  const reflectionDiagrams = [];
  const pointPlaneDiagrams = [];
  const cofactorMatrices = [];
  const cramerWorks = [];
  const gaussWorks = [];
  const areaGraphs = [];
  const areaEquations = [];
  const derivativeCycles = [];
  const proportionTables = [];
  const source = String(value || "Lee el enunciado, ordena los datos y comprueba la opcion elegida.")
    .replace(/\[\[official-solution-image\s+src="([^"]+)"\s*\]\]/gi, (_, rawSource) => {
      const imageIndex = officialSolutionImages.length;
      officialSolutionImages.push(`
        <figure class="pau-official-solution-figure">
          <img src="${escapeHtml(rawSource)}" alt="Desarrollo matemático completo de la solución oficial">
        </figure>
      `);
      return `@@OSI${imageIndex}@@`;
    })
    .replace(/\[\[proportion-table\s+headers="([^"]+)"\s+row1="([^"]+)"\s+row2="([^"]+)"\]\]/gi, (_, rawHeaders, rawRow1, rawRow2) => {
      const rows = [rawHeaders, rawRow1, rawRow2].map((row) => row.split("|").map((cell) => cell.trim()));
      if (rows.some((row) => row.length !== 3)) return _;
      const tableIndex = proportionTables.length;
      proportionTables.push(`
        <div class="proportion-table-wrap">
          <table class="proportion-table">
            <thead><tr>${rows[0].map((cell) => `<th>${formatMathFragment(cell)}</th>`).join("")}</tr></thead>
            <tbody>
              <tr>${rows[1].map((cell) => `<td>${formatMathFragment(cell)}</td>`).join("")}</tr>
              <tr>${rows[2].map((cell) => `<td>${formatMathFragment(cell)}</td>`).join("")}</tr>
            </tbody>
          </table>
        </div>
      `);
      return `@@PT${tableIndex}@@`;
    })
    .replace(/\[\[derivative-cycle-2008\]\]/gi, () => {
      const cycleIndex = derivativeCycles.length;
      derivativeCycles.push(renderDerivativeCycle2008());
      return `@@DC${cycleIndex}@@`;
    })
    .replace(/\[\[area-graph-abs-parabola\]\]/gi, () => {
      const graphIndex = areaGraphs.length;
      areaGraphs.push(renderAbsParabolaAreaGraph());
      return `@@AG${graphIndex}@@`;
    })
    .replace(/\[\[area-graph-parabola-line\]\]/gi, () => {
      const graphIndex = areaGraphs.length;
      areaGraphs.push(renderParabolaLineAreaGraph());
      return `@@AG${graphIndex}@@`;
    })
    .replace(/\[\[area-graph-reciprocal\]\]/gi, () => {
      const graphIndex = areaGraphs.length;
      areaGraphs.push(renderReciprocalAreaGraph());
      return `@@AG${graphIndex}@@`;
    })
    .replace(/\[\[area-equation-abs-parabola\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderAbsParabolaSymmetryEquation());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[area-equation-reciprocal\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderReciprocalAreaIntegral());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[barrow-equation-reciprocal\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderReciprocalBarrowEquation());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[area-equation-parabola-line\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderParabolaLineAreaIntegral());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[barrow-equation-parabola\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderParabolaBarrowEquation());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[barrow-equation-line\]\]/gi, () => {
      const equationIndex = areaEquations.length;
      areaEquations.push(renderLineBarrowEquation());
      return `@@AE${equationIndex}@@`;
    })
    .replace(/\[\[point-plane-distance\s+plane="([^"]+)"\s+p="([^"]+)"\s+q="([^"]+)"\]\]/gi, (_, plane, pointP, pointQ) => {
      const diagramIndex = pointPlaneDiagrams.length;
      pointPlaneDiagrams.push(renderPointPlaneDistanceDiagram({ plane, pointP, pointQ }));
      return `@@PD${diagramIndex}@@`;
    })
    .replace(/\[\[cofactor-matrix-b\]\]/gi, () => {
      const matrixIndex = cofactorMatrices.length;
      cofactorMatrices.push(renderCofactorMatrixB());
      return `@@CM${matrixIndex}@@`;
    })
    .replace(/\[\[cramer-system-2000\]\]/gi, () => {
      const workIndex = cramerWorks.length;
      cramerWorks.push(renderCramerSystem2000());
      return `@@CR${workIndex}@@`;
    })
    .replace(/\[\[gauss-system-2000\]\]/gi, () => {
      const workIndex = gaussWorks.length;
      gaussWorks.push(renderGaussSystem2000());
      return `@@GW${workIndex}@@`;
    })
    .replace(/\[\[reflection-plane\s+plane="([^"]+)"\s+a="([^"]+)"\s+q="([^"]+)"\s+ap="([^"]+)"\]\]/gi, (_, plane, pointA, pointQ, pointAprime) => {
      const diagramIndex = reflectionDiagrams.length;
      reflectionDiagrams.push(renderPlaneReflectionDiagram({ plane, pointA, pointQ, pointAprime }));
      return `@@RD${diagramIndex}@@`;
    })
    .replace(/-∞\s+──\s+\(\+\)\s+──\s+-\\frac\{3\}\{2\}\s+──\s+\(-\)\s+──\s+1\s+──\s+\(-\)\s+──\s+2\s+──\s+\(\+\)\s+──\s+\+∞/g, '[[signchart points="-∞|-\\frac{3}{2}|1|2|+∞" signs="+|-|-|+" arrows="↑|↓|↓|↑"]]')
    .replace(/\[\[signchart\s+points="([^"]+)"\s+signs="([^"]+)"\s+arrows="([^"]+)"\]\]/gi, (_, rawPoints, rawSigns, rawArrows) => {
      const points = rawPoints.split("|").map((item) => item.trim());
      const signs = rawSigns.split("|").map((item) => item.trim());
      const arrows = rawArrows.split("|").map((item) => item.trim());
      if (points.length !== signs.length + 1 || arrows.length !== signs.length) return _;
      const chartIndex = signCharts.length;
      signCharts.push(`
        <div class="derivative-sign-chart" role="img" aria-label="Recta real de signos de la derivada">
          <div class="sign-chart-intervals" style="--interval-count:${signs.length}">
            ${signs.map((sign, index) => `
              <span class="sign-chart-interval ${sign === "+" ? "is-positive" : "is-negative"}">
                <strong>${escapeHtml(sign)}</strong><span aria-hidden="true">${escapeHtml(arrows[index])}</span>
              </span>
            `).join("")}
          </div>
          <div class="sign-chart-axis">
            ${points.map((point) => `<span class="sign-chart-point"><i aria-hidden="true"></i><b>${formatMathFragment(point)}</b></span>`).join("")}
          </div>
        </div>
      `);
      return `@@SC${chartIndex}@@`;
    });
  let rendered = formatMathText(source)
    .replace(/(Resolución|Planteamiento|Desarrollo paso a paso|Desarrollo|Resultado final|Comprobación|Conclusión):<br>/g, '<span class="solution-section-title">$1</span><br>');
  signCharts.forEach((chart, index) => {
    rendered = rendered.replace(`@@SC${index}@@`, chart);
  });
  reflectionDiagrams.forEach((diagram, index) => {
    rendered = rendered.replace(`@@RD${index}@@`, diagram);
  });
  pointPlaneDiagrams.forEach((diagram, index) => {
    rendered = rendered.replace(`@@PD${index}@@`, diagram);
  });
  cofactorMatrices.forEach((matrix, index) => {
    rendered = rendered.replace(`@@CM${index}@@`, matrix);
  });
  cramerWorks.forEach((work, index) => {
    rendered = rendered.replace(`@@CR${index}@@`, work);
  });
  gaussWorks.forEach((work, index) => {
    rendered = rendered.replace(`@@GW${index}@@`, work);
  });
  areaGraphs.forEach((graph, index) => {
    rendered = rendered.replace(`@@AG${index}@@`, graph);
  });
  areaEquations.forEach((equation, index) => {
    rendered = rendered.replace(`@@AE${index}@@`, equation);
  });
  derivativeCycles.forEach((cycle, index) => {
    rendered = rendered.replace(`@@DC${index}@@`, cycle);
  });
  proportionTables.forEach((table, index) => {
    rendered = rendered.replace(`@@PT${index}@@`, table);
  });
  officialSolutionImages.forEach((figure, index) => {
    rendered = rendered.replace(`@@OSI${index}@@`, figure);
  });
  return rendered;
}

function solutionApproach(question) {
  const text = normalizeDisplayText(question?.text || "").toLowerCase();
  if (/sistema|ecuaciones matriciales/.test(text)) return "Escribimos las ecuaciones de forma ordenada, eliminamos una incógnita y sustituimos el resultado para obtener la otra. Al final comprobamos ambas ecuaciones.";
  if (/ecuaci[oó]n|resuelve/.test(text)) return "El objetivo es dejar la incógnita sola. Realizamos la misma operación en los dos miembros y anotamos cada transformación para no perder signos.";
  if (/inecuaci[oó]n|[<>≤≥]/.test(text)) return "Aislamos la incógnita como en una ecuación. Si dividimos o multiplicamos por un número negativo, cambiamos el sentido de la desigualdad.";
  if (/l[ií]m|limite|límite/.test(text)) return "Primero sustituimos y clasificamos el resultado. Si aparece 0/0 o ∞/∞, aplicamos la regla de L'Hôpital derivando por separado numerador y denominador, y la repetimos si continúa la misma indeterminación. Si aparece 1^∞, escribimos la base como 1+u(x) y usamos lim (1+u(x))^v(x)=e^[lim u(x)·v(x)].";
  if (/continui/.test(text)) return "Para que la función sea continua deben coincidir el límite por la izquierda, el valor de la función y el límite por la derecha.";
  if (/deriva|tangente|m[aá]ximo|m[ií]nimo/.test(text)) return "Aplicamos la regla de derivación correspondiente término a término y simplificamos. Después usamos el valor de la derivada que pide el enunciado.";
  if (/integral|primitiva|[∫]/.test(text)) return "Buscamos una primitiva usando la regla adecuada. En una integral indefinida añadimos la constante C; en una integral definida evaluamos en el extremo superior y restamos el valor del inferior.";
  if (/matriz|matrices|determinante|det /.test(text)) return "Trabajamos por filas y columnas, conservando la posición de cada elemento. Escribimos la operación matricial completa antes de calcular cada entrada.";
  if (/probabilidad|binomial|normal|suceso|muestra/.test(text)) return "Identificamos los datos y el suceso que se pide, elegimos la fórmula apropiada y sustituimos mostrando numerador, denominador y operaciones intermedias.";
  if (/tri[aá]ngulo|[aá]rea|volumen|per[ií]metro|distancia|pendiente|recta|semejanza|pit[aá]goras/.test(text)) return "Anotamos los datos con sus unidades, escribimos la fórmula antes de sustituir y comprobamos que la unidad del resultado corresponde a la magnitud calculada.";
  if (/ra[ií]z|radical|sqrt|√/.test(text)) return "Descomponemos el radicando buscando factores que sean cuadrados perfectos. Extraemos esos factores y dejamos dentro de la raíz solo lo que no puede simplificarse.";
  if (/potencia|exponente|\^/.test(text)) return "Aplicamos la propiedad de las potencias que corresponda y mostramos cómo cambian la base o el exponente en cada paso.";
  if (/fracci[oó]n|racionaliza/.test(text)) return "Trabajamos numerador y denominador por separado, usamos denominador común cuando sea necesario y simplificamos al final.";
  if (/funci[oó]n|dominio|recorrido|f\(/.test(text)) return "Identificamos qué información de la función se pide y sustituimos o imponemos la condición correspondiente antes de simplificar.";
  if (/calcula|operaci[oó]n|simplifica/.test(text)) return "Respetamos la jerarquía de operaciones: primero paréntesis y potencias, después multiplicaciones y divisiones de izquierda a derecha y, por último, sumas y restas.";
  return "Ordenamos los datos del enunciado, elegimos la operación o propiedad adecuada y desarrollamos el cálculo sin saltarnos pasos.";
}

function didacticSolutionText(question) {
  const raw = normalizeDisplayText(question?.solution || "").trim();
  const correctOption = Array.isArray(question?.options) && question.options.length
    ? question.options[Number(question.correct) || 0]
    : "";
  const fallback = correctOption
    ? `Resolución:\n1. El resultado correcto es ${correctOption}.`
    : "Resolución no disponible para este ejercicio.";
  if (!raw) return fallback;

  // Los ejercicios PAU abiertos de Madrid ya llegan estructurados según la
  // política didáctica. Se conservan tal cual para no duplicar el encabezado
  // "Resolución" que aporta la propia interfaz.
  if (/^Planteamiento:\s*[\s\S]*Desarrollo paso a paso:\s*[\s\S]*Resultado final:\s*[\s\S]*Comprobaci[oó]n:/i.test(raw)) {
    return raw;
  }

  const alreadyStructured = /(?:^|\n)\s*(?:paso\s*)?\d+[.)]/i.test(raw)
    || /resultado final|comprobaci[oó]n|conclusi[oó]n/i.test(raw);
  let solution = raw
    .replace(/^soluci[oó]n guiada:\s*/i, "")
    .replace(/^soluci[oó]n:\s*/i, "")
    .replace(/^resoluci[oó]n paso a paso:\s*/i, "")
    .replace(/^resoluci[oó]n:\s*/i, "")
    .trim();

  if (!alreadyStructured) {
    const steps = solution
      .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ0-9(])/)
      .map((step) => step.trim())
      .filter(Boolean);
    solution = `Resolución:\n${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`;
  } else if (!/^resoluci[oó]n/i.test(raw)) {
    solution = `Resolución:\n${solution}`;
  } else {
    solution = `Resolución:\n${solution}`;
  }

  if (correctOption && !/resultado final/i.test(solution)) {
    solution += `\n\nResultado final:\n${correctOption}.`;
  }
  return solution;
}

let fitScreenFrame = 0;
let fitScreenTimer = 0;

function fitStudentScreen() {
  const shell = document.querySelector(".shell-student-fit");
  const viewport = shell?.querySelector(":scope > .shell-stage-viewport");
  const stage = viewport?.querySelector(":scope > .shell-stage");
  if (!shell || !viewport || !stage) return;

  stage.style.width = "100%";
  if (window.innerWidth < 821 || window.innerHeight < 501) {
    stage.style.transform = "none";
    viewport.style.overflowY = "visible";
    return;
  }
  stage.style.transform = "translateX(-50%) scale(1)";
  viewport.style.overflowY = "hidden";

  if (shell.classList.contains("shell-scroll-if-needed")) {
    viewport.style.overflowY = stage.scrollHeight > viewport.clientHeight ? "auto" : "hidden";
    return;
  }

  const availableWidth = viewport.clientWidth;
  const availableHeight = viewport.clientHeight;
  const minimumReadableScale = 0.78;
  let scale = 1;
  for (let pass = 0; pass < 3; pass += 1) {
    stage.style.width = `${100 / scale}%`;
    const naturalWidth = stage.scrollWidth;
    const naturalHeight = stage.scrollHeight;
    const nextScale = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight);
    if (Math.abs(nextScale - scale) < 0.004) {
      scale = nextScale;
      break;
    }
    scale = nextScale;
  }
  if (scale < minimumReadableScale) {
    scale = minimumReadableScale;
    viewport.style.overflowY = "auto";
  }
  stage.style.width = `${100 / scale}%`;
  stage.style.transform = `translateX(-50%) scale(${scale})`;
}

function scheduleFitStudentScreen() {
  cancelAnimationFrame(fitScreenFrame);
  clearTimeout(fitScreenTimer);
  fitScreenFrame = requestAnimationFrame(() => {
    fitScreenFrame = requestAnimationFrame(fitStudentScreen);
  });
  // Recheck after fonts, PDF previews and late layout changes have settled.
  fitScreenTimer = setTimeout(fitStudentScreen, 180);
}

window.addEventListener("resize", scheduleFitStudentScreen);

function renderShell(content, compact = false) {
  closeTopicVideo();
  stopSummarySpeech();
  const fitScreen = !compact || content.includes("avatar-editor");
  const useCompactHeader = compact || fitScreen;
  app.innerHTML = `
    <main class="shell ${useCompactHeader ? "shell-compact" : ""} ${fitScreen ? "shell-student-fit" : ""}">
      <header class="top-strip top-strip-centered mathup-header ${useCompactHeader ? "top-strip-compact" : ""}">
        <div class="mathup-header-layout" aria-label="+MathUp · Aula de retos, estudio y aventuras">
          <span class="mathup-crop mathup-crop-icon"><img src="${MATHUP_HEADER_SRC}" alt="" aria-hidden="true" /></span>
          <span class="mathup-crop mathup-crop-wordmark"><img src="${MATHUP_HEADER_SRC}" alt="" aria-hidden="true" /></span>
          <span class="mathup-crop mathup-crop-tagline"><img src="${MATHUP_HEADER_SRC}" alt="" aria-hidden="true" /></span>
        </div>
      </header>
      <div class="shell-stage-viewport"><div class="shell-stage">${content}</div></div>
    </main>
  `;
  if (fitScreen) scheduleFitStudentScreen();
}

function renderLegacyLogin() {
  clearQuestionTimer();
  const yearOptions = ACADEMIC_YEARS
    .map((year) => `<option value="${year}" ${year === DEFAULT_ACADEMIC_YEAR ? "selected" : ""}>${year}</option>`)
    .join("");
  const courseOptions = orderedCourses()
    .map((course) => `<option value="${course.id}">${escapeHtml(courseDisplayName(course))}</option>`)
    .join("");
  const firstYear = DEFAULT_ACADEMIC_YEAR;
  const firstCourse = courses[0];
  const firstGroups = availableGroupsFor(firstYear, firstCourse.id);
  const groupOptions = firstGroups
    .map((group) => `<option value="${group}">${group}</option>`)
    .join("");
  const firstStudents = studentsForSelection(firstYear, firstCourse.id, firstGroups[0]);
  const studentOptions = firstStudents
    .map((student) => `<option value="${student.name}">${escapeHtml(student.name)}</option>`)
    .join("");

  renderShell(`
    <section class="login-layout login-layout-simple">
      <div class="login-card">
        <h1 class="headline">Acceso del alumnado</h1>
        <p class="subhead">Selecciona año académico, curso, grupo, alumno y contraseña.</p>
        <div class="field">
          <label for="academic-year">Año académico</label>
          <select id="academic-year">${yearOptions}</select>
        </div>
        <div class="field">
          <label for="course">Curso</label>
          <select id="course">${courseOptions}</select>
        </div>
        <div class="field">
          <label for="group">Grupo</label>
          <select id="group">${groupOptions}</select>
        </div>
        <div class="field">
          <label for="student">Alumno/a</label>
          <select id="student">${studentOptions}</select>
        </div>
        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" type="password" placeholder="Contraseña" />
        </div>
        <button class="primary" onclick="login()">Entrar</button>
        <button class="ghost public-auth-preview-entry" onclick="showPublicRegistrationPreview()">Vista previa del nuevo registro</button>
        ${DEVELOPER_MODE ? `<button class="developer-entry-button" onclick="renderDeveloperLogin()">Acceso de desarrollo</button>` : ""}
        <p class="public-auth-preview-note">No sustituye el acceso actual ni crea todavía una cuenta.</p>
        <p class="error" id="login-error"></p>
      </div>
    </section>
  `, true);

  const yearSelect = document.getElementById("academic-year");
  const courseSelect = document.getElementById("course");
  const groupSelect = document.getElementById("group");

  yearSelect.addEventListener("change", updateLoginGroups);
  courseSelect.addEventListener("change", updateLoginGroups);
  groupSelect.addEventListener("change", updateLoginStudents);
  updateLoginGroups();
}

function updateLoginGroups() {
  const yearSelect = document.getElementById("academic-year");
  const courseSelect = document.getElementById("course");
  const groupSelect = document.getElementById("group");
  const groups = availableGroupsFor(yearSelect.value, courseSelect.value);
  groupSelect.innerHTML = groups
    .map((group) => `<option value="${group}">${group}</option>`)
    .join("");
  updateLoginStudents();
}

function updateLoginStudents() {
  const academicYear = document.getElementById("academic-year").value;
  const courseId = document.getElementById("course").value;
  const group = document.getElementById("group").value;
  const filteredStudents = studentsForSelection(academicYear, courseId, group);
  document.getElementById("student").innerHTML = filteredStudents
    .map((student) => `<option value="${student.name}">${escapeHtml(student.name)}</option>`)
    .join("");
}

function login() {
  const password = document.getElementById("password").value.trim();
  const academicYear = document.getElementById("academic-year").value;
  const studentName = document.getElementById("student").value;
  const courseId = document.getElementById("course").value;
  const group = document.getElementById("group").value;
  const student = students.find((candidate) =>
    candidate.academicYear === academicYear && candidate.name === studentName && candidate.courseId === courseId && candidate.group === group
  );

  if (password !== student?.password && password !== STUDENT_PASSWORD) {
    document.getElementById("login-error").textContent = "Contraseña incorrecta.";
    return;
  }

  if (!student) {
    document.getElementById("login-error").textContent = "Selecciona un alumno válido.";
    return;
  }

  state = {
    ...state,
    view: isEsoCourseId(courseId) || FIRST_BACH_COURSE_IDS.includes(courseId) || BACH_II_COURSE_IDS.includes(courseId) ? "home" : "dashboard",
    student,
    academicYear,
    courseId,
    topicIndex: 0,
    questionIndex: 0,
    score: 0,
    streak: 0,
    practiceRound: 0,
    topicChallengeLevel: "apprentice",
    blockKey: "",
    pauCommunity: BACH_II_COURSE_IDS.includes(courseId) ? readBachPauCommunity(courseId, student) : "clm",
    trainingQuestionHistory: {},
    answered: false,
    sessionAnswers: []
  };
  if (isEsoCourseId(courseId)) renderStudentGateway();
  else if (FIRST_BACH_COURSE_IDS.includes(courseId)) renderFirstBachGateway();
  else if (BACH_II_COURSE_IDS.includes(courseId)) renderBachIIHome();
  else renderDashboard();
}

function renderAdminLogin() {
  clearQuestionTimer();
  state = { ...state, student: null, view: "admin-login" };
  renderShell(`
    <section class="login-layout login-layout-simple">
      <div class="login-card">
        <h1 class="headline">Panel del profesor</h1>
        <div class="field">
          <label for="admin-password">Contraseña de administrador</label>
          <input id="admin-password" type="password" placeholder="Contraseña" />
        </div>
        <button class="primary" onclick="adminLogin()">Entrar</button>
        <button class="ghost" style="width:100%;margin-top:10px" onclick="renderPublicAccess()">Volver</button>
        <p class="error" id="admin-error"></p>
      </div>
    </section>
  `, true);
}

function adminLogin() {
  const password = document.getElementById("admin-password").value.trim();
  if (password !== ADMIN_PASSWORD) {
    document.getElementById("admin-error").textContent = "Contraseña de administrador incorrecta.";
    return;
  }
  state.view = "admin";
  renderAdmin();
}

function readGameProgressStore() {
  try {
    const store = JSON.parse(localStorage.getItem(GAME_PROGRESS_KEY) || "{}");
    const migration = window.MargaritaCcssIProgressMigration;
    if (!migration?.migrateStore) return store;
    const readStoredJson = (key, fallback) => {
      try {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
      } catch (_) {
        return fallback;
      }
    };
    const result = migration.migrateStore(store, {
      challengeHistory: readStoredJson("margarita-challenge-answer-history-v2", {}),
      coachStore: readStoredJson("margaritaSalasCoachV1", {}),
      reports: readStoredJson(REPORT_KEY, [])
    });
    if (result.changed) localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(result.store));
    return result.store;
  } catch {
    return {};
  }
}

function saveGameProgressStore(store) {
  localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(store));
}

function defaultGameProgress() {
  return {
    ...(state.courseId === "1bach-ccss"
      ? { ccssITopicSchemaVersion: window.MargaritaCcssIProgressMigration?.TOPIC_SCHEMA_VERSION || 2 }
      : {}),
    unlockedTopics: [0],
    completedTopics: [],
    defeatedBosses: [],
    xp: 0,
    coins: 0,
    bestStreak: 0,
    correct: 0,
    errors: 0,
    totalTime: 0,
    titles: ["Explorador matemático"],
    avatar: {
      name: "Mati",
      type: "explorer",
      color: "blue",
      background: "Aula-laboratorio",
      hairStyle: "short",
      hairColor: "brown",
      outfit: "pants",
      glasses: "no",
      skinTone: "medium",
      mouth: "happy"
    }
  };
}

function getGameProgress() {
  const store = readGameProgressStore();
  const key = currentStudentKey();
  if (!store[key]) {
    store[key] = defaultGameProgress();
    saveGameProgressStore(store);
  }
  return store[key];
}

function updateGameProgress(mutator) {
  const store = readGameProgressStore();
  const key = currentStudentKey();
  const progress = store[key] || defaultGameProgress();
  mutator(progress);
  progress.unlockedTopics = [...new Set(progress.unlockedTopics)].sort((a, b) => a - b);
  progress.completedTopics = [...new Set(progress.completedTopics)].sort((a, b) => a - b);
  progress.defeatedBosses = [...new Set(progress.defeatedBosses)].sort((a, b) => a - b);
  progress.titles = [...new Set(progress.titles)];
  store[key] = progress;
  saveGameProgressStore(store);
  return progress;
}

function phaseLabel(phase) {
  return {
    learn: "Aprender",
    train: "Entrenar",
    boss: "Jefe final"
  }[phase] || "Aprender";
}

function recommendedReviewTopic(progress, course) {
  const reports = readReports().filter((report) =>
    reportAcademicYear(report) === state.academicYear &&
    report.student === state.student.name &&
    report.group === (state.student.groupLabel || state.student.group)
  );
  const weak = reports
    .filter((report) => Number(report.correct) < Math.ceil(Number(report.total || DEFAULT_QUESTIONS_PER_CHALLENGE) * 0.7))
    .at(-1);
  if (weak?.theme) return weak.theme;
  if (progress.errors > progress.correct) return course.themes[progress.unlockedTopics.at(-1) || 0];
  return course.themes[progress.completedTopics.length] || course.themes[0];
}

function avatarTypeLabel(type) {
  return {
    explorer: "Explorador matemático",
    cat: "Gato matemático",
    owl: "Búho de fórmulas",
    robot: "Robot ayudante"
  }[type] || "Explorador matemático";
}

const avatarCustomizationProfiles = {
  explorer: {
    colorLabel: "Color de la ropa",
    colors: [["blue", "Azul"], ["green", "Verde"], ["red", "Rojo"], ["gold", "Dorado"], ["violet", "Violeta"]],
    styleLabel: "Pelo",
    styles: [["mane", "Melena"], ["long", "Largo"], ["short", "Corto"], ["braids", "Trenzas"], ["wavy", "Ondulado"], ["curly", "Rizado"], ["afro", "Afro"]],
    detailLabel: "Color de pelo",
    details: [["blonde", "Rubio"], ["brown", "Castaño"], ["dark-brown", "Moreno"], ["black-hair", "Negro"], ["redhead", "Pelirrojo"]],
    outfitLabel: "Atuendo",
    outfits: [["pants", "Conjunto deportivo"], ["dress", "Vestido"], ["tunic", "Traje de camuflaje"]]
  },
  cat: {
    colorLabel: "Color del pelaje",
    colors: [["ginger", "Naranja"], ["gray", "Gris"], ["cream", "Crema"], ["black", "Negro"]],
    styleLabel: "Dibujo del pelaje",
    styles: [["plain", "Liso"], ["stripes", "Rayas"], ["spots", "Manchas"], ["tuxedo", "Pecho blanco"]],
    detailLabel: "Color de ojos",
    details: [["amber-eyes", "Ámbar"], ["green-eyes", "Verdes"], ["blue-eyes", "Azules"]],
    outfitLabel: "Atuendo",
    outfits: [["scarf", "Pañuelo"], ["vest", "Chaleco"], ["cape", "Capa"]]
  },
  owl: {
    colorLabel: "Color del plumaje",
    colors: [["tawny", "Pardo"], ["snow", "Blanco nival"], ["night", "Azul nocturno"], ["copper", "Cobrizo"]],
    styleLabel: "Forma de los penachos",
    styles: [["round", "Cabeza redonda"], ["tufts", "Penachos grandes"], ["horned", "Penachos altos"]],
    detailLabel: "Color de ojos",
    details: [["gold-eyes", "Dorados"], ["blue-eyes", "Azules"], ["green-eyes", "Verdes"]],
    outfitLabel: "Atuendo",
    outfits: [["scholar", "Banda de sabio"], ["vest", "Chaleco"], ["cape", "Capa"]]
  },
  robot: {
    colorLabel: "Metal de la carcasa",
    colors: [["steel", "Acero"], ["blue", "Azul"], ["red", "Rojo"], ["gold", "Dorado"]],
    styleLabel: "Forma de la cabeza",
    styles: [["antenna", "Antena"], ["dome", "Cúpula"], ["visor", "Visor"]],
    detailLabel: "Color de las luces",
    details: [["cyan-light", "Cian"], ["green-light", "Verde"], ["amber-light", "Ámbar"]],
    outfitLabel: "Atuendo",
    outfits: [["classic", "Clásico"], ["utility", "Explorador"], ["armored", "Armadura"]]
  }
};

const avatarTypeOptions = [
  ["explorer", "Explorador"],
  ["cat", "Gato"],
  ["owl", "Búho"],
  ["robot", "Robot"]
];

const avatarSkinToneOptions = [
  ["fair", "Claro"],
  ["medium", "Medio"],
  ["tan", "Moreno claro"],
  ["dark", "Moreno"],
  ["deep", "Oscuro"]
];

const avatarGlassesOptions = [["no", "Sin gafas"], ["round", "Redondas"], ["square", "Cuadradas"]];
const avatarMouthOptions = [["happy", "Alegre"], ["sad", "Triste"], ["angry", "Enfadado"], ["surprised", "Sorprendido"]];
const avatarBackgroundOptions = ["Aula-laboratorio", "Bosque algebraico", "Torre de potencias", "Observatorio", "Castillo final"].map((item) => [item, item]);

function avatarProfile(type) {
  return avatarCustomizationProfiles[type] || avatarCustomizationProfiles.explorer;
}

function avatarProfileValue(type, group, value) {
  const options = avatarProfile(type)[group] || [];
  return options.find(([key]) => key === value)?.[1] || options[0]?.[1] || "";
}

function avatarOptionsMarkup(options, selected) {
  return options
    .map(([value, label]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`)
    .join("");
}

function normalizeAvatar(avatar = {}) {
  const normalized = {
    ...defaultGameProgress().avatar,
    ...avatar
  };
  if (!avatarCustomizationProfiles[normalized.type]) normalized.type = "explorer";
  const profile = avatarProfile(normalized.type);
  [["color", "colors"], ["hairStyle", "styles"], ["hairColor", "details"], ["outfit", "outfits"]]
    .forEach(([property, group]) => {
      if (!profile[group].some(([value]) => value === normalized[property])) {
        normalized[property] = profile[group][0][0];
      }
    });
  if (!avatarSkinToneOptions.some(([value]) => value === normalized.skinTone)) normalized.skinTone = "medium";
  if (!avatarGlassesOptions.some(([value]) => value === normalized.glasses)) normalized.glasses = "no";
  if (!avatarMouthOptions.some(([value]) => value === normalized.mouth)) normalized.mouth = "happy";
  return normalized;
}

function avatarMouthLabel(mouth) {
  return {
    happy: "Alegre",
    sad: "Triste",
    angry: "Enfadado",
    surprised: "Sorprendido"
  }[mouth] || "Alegre";
}

function avatarBackgroundKey(background) {
  return {
    "Aula-laboratorio": "lab",
    "Bosque algebraico": "forest",
    "Torre de potencias": "tower",
    Observatorio: "observatory",
    "Castillo final": "castle"
  }[background] || "lab";
}

function renderAvatarFigure(avatar, large = false, variant = "") {
  const item = normalizeAvatar(avatar);
  const backgroundKey = avatarBackgroundKey(item.background);
  return `
    <div class="avatar-figure avatar-${escapeHtml(item.type)} avatar-color-${escapeHtml(item.color)} avatar-hair-${escapeHtml(item.hairStyle)} avatar-hair-color-${escapeHtml(item.hairColor)} avatar-outfit-${escapeHtml(item.outfit)} avatar-variant-${escapeHtml(item.hairStyle)} avatar-detail-${escapeHtml(item.hairColor)} avatar-gear-${escapeHtml(item.outfit)} avatar-mouth-${escapeHtml(item.mouth)} avatar-skin-${escapeHtml(item.skinTone)} avatar-glasses-${escapeHtml(item.glasses)} avatar-bg-${escapeHtml(backgroundKey)} ${large ? "avatar-large" : ""} ${variant ? `avatar-${escapeHtml(variant)}` : ""}" aria-label="${escapeHtml(item.name || "Avatar")}">
      <span class="avatar-scene" aria-hidden="true">
        <span class="scene-object scene-object-a"></span>
        <span class="scene-object scene-object-b"></span>
        <span class="scene-object scene-object-c"></span>
      </span>
      <span class="avatar-tail"></span>
      <span class="avatar-ear avatar-ear-left"></span>
      <span class="avatar-ear avatar-ear-right"></span>
      <span class="avatar-hair"></span>
      <span class="avatar-face">
        <span class="avatar-brow avatar-brow-left"></span>
        <span class="avatar-brow avatar-brow-right"></span>
        <i></i><i></i><span class="avatar-nose"></span><b></b>
        <span class="avatar-glasses" aria-hidden="true"><em></em><em></em></span>
      </span>
      <span class="avatar-neck"></span>
      <span class="avatar-outfit-piece" aria-hidden="true">
        <span class="scarf-knot"></span>
        <span class="scarf-tail scarf-tail-left"></span>
        <span class="scarf-tail scarf-tail-right"></span>
      </span>
      <span class="avatar-shoulders"></span>
      <span class="avatar-body"></span>
      <span class="avatar-arm avatar-arm-left"><i class="avatar-forearm"><b class="avatar-hand"></b></i></span>
      <span class="avatar-arm avatar-arm-right"><i class="avatar-forearm"><b class="avatar-hand"></b></i></span>
      <span class="avatar-legs"></span>
      <span class="avatar-species-detail"></span>
    </div>
  `;
}

function avatarChoiceGlyph(group, value) {
  const glyphs = {
    style: { mane: "〰", long: "⌇", short: "✂", braids: "⋈", wavy: "≈", curly: "➰", afro: "●" },
    outfit: { pants: "👟", dress: "◇", tunic: "▦", scarf: "〰", vest: "▣", cape: "◢", scholar: "✦", classic: "▢", utility: "▦", armored: "⬟" },
    glasses: { no: "—", round: "○○", square: "□□" },
    mouth: { happy: "😊", sad: "😟", angry: "😠", surprised: "😮" },
    background: { "Aula-laboratorio": "⚗", "Bosque algebraico": "🌳", "Torre de potencias": "🏰", Observatorio: "🔭", "Castillo final": "🏆" }
  };
  return glyphs[group]?.[value] || "◆";
}

function avatarChoiceVisual(group, value, avatar) {
  if (group === "type") {
    return `<span class="avatar-type-thumbnail">${renderAvatarFigure({ ...avatar, type: value }, false, "choice")}</span>`;
  }
  if (["color", "detail", "skin"].includes(group)) {
    return `<span class="avatar-choice-swatch avatar-swatch-${escapeHtml(value)}"></span>`;
  }
  return `<span class="avatar-choice-glyph" aria-hidden="true">${avatarChoiceGlyph(group, value)}</span>`;
}

function renderAvatarChoiceCards(selectId, options, selected, group, avatar) {
  return `
    <div class="avatar-choice-cards avatar-choice-${escapeHtml(group)}" data-avatar-choice-for="${escapeHtml(selectId)}" role="listbox">
      ${options.map(([value, label]) => {
        const active = selected === value;
        const preview = avatarChoiceVisual(group, value, avatar);
        return `<button type="button" class="avatar-choice-card ${active ? "is-selected" : ""}" data-value="${escapeHtml(value)}" role="option" aria-selected="${active}" onclick="chooseAvatarOption('${escapeHtml(selectId)}','${escapeHtml(value)}')">${preview}<span>${escapeHtml(label)}</span></button>`;
      }).join("")}
    </div>
  `;
}

function renderAvatarChoiceDropdown(selectId, options, selected, group, avatar) {
  const selectedLabel = options.find(([value]) => value === selected)?.[1] || options[0]?.[1] || "Seleccionar";
  return `
    <div class="avatar-visual-select" data-avatar-dropdown-for="${escapeHtml(selectId)}" data-avatar-group="${escapeHtml(group)}">
      <button type="button" class="avatar-visual-select-trigger" aria-haspopup="listbox" aria-expanded="false" onclick="toggleAvatarDropdown('${escapeHtml(selectId)}', event)">
        <span class="avatar-selected-visual">${avatarChoiceVisual(group, selected, avatar)}</span>
        <strong>${escapeHtml(selectedLabel)}</strong>
        <span class="avatar-dropdown-arrow" aria-hidden="true">⌄</span>
      </button>
      <div class="avatar-visual-select-menu">
        ${renderAvatarChoiceCards(selectId, options, selected, group, avatar)}
      </div>
    </div>
  `;
}

function avatarChoiceField(selectId, labelId, label, options, selected, group, avatar, extraClass = "") {
  return `
    <div class="field avatar-choice-field ${extraClass}">
      <label id="${escapeHtml(labelId)}">${escapeHtml(label)}</label>
      <select id="${escapeHtml(selectId)}" class="avatar-choice-select" aria-labelledby="${escapeHtml(labelId)}" onchange="updateAvatarPreview()">${avatarOptionsMarkup(options, selected)}</select>
      ${renderAvatarChoiceDropdown(selectId, options, selected, group, avatar)}
    </div>
  `;
}

function renderAvatarCustomizer() {
  const progress = getGameProgress();
  const avatar = normalizeAvatar(progress.avatar);
  const profile = avatarProfile(avatar.type);

  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel avatar-editor">
        <div class="workspace-head">
          <div>
            <h1>Personalizar avatar</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(state.student.name)}</span>
              <span class="badge">${escapeHtml(courseById(state.courseId).name)}</span>
            </div>
          </div>
          <button class="ghost" onclick="renderAdventureMap()">Volver al mapa</button>
        </div>
        <div class="avatar-editor-grid">
          <div class="avatar-preview-card">
            <div id="avatar-live-preview">${renderAvatarFigure(avatar, true)}</div>
            <h2 id="avatar-preview-name">${escapeHtml(avatar.name || "Mati")}</h2>
            <p id="avatar-preview-summary">${avatarTypeLabel(avatar.type)} · ${avatarProfileValue(avatar.type, "styles", avatar.hairStyle)} · ${avatarProfileValue(avatar.type, "details", avatar.hairColor)} · ${avatarProfileValue(avatar.type, "outfits", avatar.outfit)}</p>
          </div>
          <div class="avatar-form ${avatar.type === "explorer" ? "avatar-is-explorer" : ""}" data-avatar-type="${escapeHtml(avatar.type)}">
            <div class="field">
              <label for="avatar-name">Nombre del avatar</label>
              <input id="avatar-name" value="${escapeHtml(avatar.name || "Mati")}" maxlength="18" oninput="updateAvatarPreview()" />
            </div>
            <div class="avatar-options-grid">
              ${avatarChoiceField("avatar-type", "avatar-type-label", "Personaje", avatarTypeOptions, avatar.type, "type", avatar)}
              ${avatarChoiceField("avatar-color", "avatar-color-label", profile.colorLabel, profile.colors, avatar.color, "color", avatar)}
              ${avatarChoiceField("avatar-hair-style", "avatar-style-label", profile.styleLabel, profile.styles, avatar.hairStyle, "style", avatar)}
              ${avatarChoiceField("avatar-hair-color", "avatar-detail-label", profile.detailLabel, profile.details, avatar.hairColor, "detail", avatar)}
              ${avatarChoiceField("avatar-outfit", "avatar-outfit-label", profile.outfitLabel, profile.outfits, avatar.outfit, "outfit", avatar)}
              ${avatarChoiceField("avatar-skin-tone", "avatar-skin-label", "Tono de piel", avatarSkinToneOptions, avatar.skinTone, "skin", avatar, "avatar-explorer-only")}
              ${avatarChoiceField("avatar-glasses", "avatar-glasses-label", "Gafas", avatarGlassesOptions, avatar.glasses, "glasses", avatar, "avatar-explorer-only")}
              ${avatarChoiceField("avatar-mouth", "avatar-mouth-label", "Expresión", avatarMouthOptions, avatar.mouth, "mouth", avatar)}
              ${avatarChoiceField("avatar-background", "avatar-background-label", "Escenario", avatarBackgroundOptions, avatar.background, "background", avatar)}
            </div>
            <p class="avatar-access-note">Todas las opciones están disponibles desde el principio.</p>
            <button class="primary avatar-save-button" onclick="saveAvatarCustomization()">Guardar avatar</button>
          </div>
        </div>
      </section>
    </section>
  `, true);
  updateAvatarPreview();
}

function openAvatarCustomizerModal() {
  document.getElementById("avatar-customizer-modal")?.remove();
  const avatar = normalizeAvatar(getGameProgress().avatar);
  const profile = avatarProfile(avatar.type);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="avatar-modal-backdrop" id="avatar-customizer-modal" role="dialog" aria-modal="true" aria-labelledby="avatar-modal-title" onclick="if(event.target===this) closeAvatarCustomizerModal()">
      <section class="screen-panel avatar-editor avatar-editor-modal">
        <div class="workspace-head">
          <div>
            <h1 id="avatar-modal-title">Editar avatar</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(state.student.name)}</span>
              <span class="badge">${escapeHtml(courseById(state.courseId).name)}</span>
            </div>
          </div>
          <button class="ghost" onclick="closeAvatarCustomizerModal()">Cerrar</button>
        </div>
        <div class="avatar-editor-grid">
          <div class="avatar-preview-card">
            <div id="avatar-live-preview">${renderAvatarFigure(avatar, true)}</div>
            <h2 id="avatar-preview-name">${escapeHtml(avatar.name || "Mati")}</h2>
            <p id="avatar-preview-summary">${avatarTypeLabel(avatar.type)} · ${avatarProfileValue(avatar.type, "styles", avatar.hairStyle)} · ${avatarProfileValue(avatar.type, "details", avatar.hairColor)} · ${avatarProfileValue(avatar.type, "outfits", avatar.outfit)}</p>
          </div>
          <div class="avatar-form ${avatar.type === "explorer" ? "avatar-is-explorer" : ""}" data-avatar-type="${escapeHtml(avatar.type)}">
            <div class="field">
              <label for="avatar-name">Nombre del avatar</label>
              <input id="avatar-name" value="${escapeHtml(avatar.name || "Mati")}" maxlength="18" oninput="updateAvatarPreview()" />
            </div>
            <div class="avatar-options-grid">
              ${avatarChoiceField("avatar-type", "avatar-type-label", "Personaje", avatarTypeOptions, avatar.type, "type", avatar)}
              ${avatarChoiceField("avatar-color", "avatar-color-label", profile.colorLabel, profile.colors, avatar.color, "color", avatar)}
              ${avatarChoiceField("avatar-hair-style", "avatar-style-label", profile.styleLabel, profile.styles, avatar.hairStyle, "style", avatar)}
              ${avatarChoiceField("avatar-hair-color", "avatar-detail-label", profile.detailLabel, profile.details, avatar.hairColor, "detail", avatar)}
              ${avatarChoiceField("avatar-outfit", "avatar-outfit-label", profile.outfitLabel, profile.outfits, avatar.outfit, "outfit", avatar)}
              ${avatarChoiceField("avatar-skin-tone", "avatar-skin-label", "Tono de piel", avatarSkinToneOptions, avatar.skinTone, "skin", avatar, "avatar-explorer-only")}
              ${avatarChoiceField("avatar-glasses", "avatar-glasses-label", "Gafas", avatarGlassesOptions, avatar.glasses, "glasses", avatar, "avatar-explorer-only")}
              ${avatarChoiceField("avatar-mouth", "avatar-mouth-label", "Expresión", avatarMouthOptions, avatar.mouth, "mouth", avatar)}
              ${avatarChoiceField("avatar-background", "avatar-background-label", "Escenario", avatarBackgroundOptions, avatar.background, "background", avatar)}
            </div>
            <p class="avatar-access-note">Todas las opciones están disponibles desde el principio.</p>
            <button class="primary avatar-save-button" onclick="saveAvatarCustomization()">Guardar avatar</button>
          </div>
        </div>
      </section>
    </div>
  `);
  updateAvatarPreview();
}

function closeAvatarCustomizerModal() {
  closeAvatarDropdowns();
  document.getElementById("avatar-customizer-modal")?.remove();
}

function avatarFromCustomizerForm() {
  return {
    name: document.getElementById("avatar-name").value.trim() || "Mati",
    type: document.getElementById("avatar-type").value,
    color: document.getElementById("avatar-color").value,
    hairStyle: document.getElementById("avatar-hair-style").value,
    hairColor: document.getElementById("avatar-hair-color").value,
    outfit: document.getElementById("avatar-outfit").value,
    glasses: document.getElementById("avatar-glasses")?.value || "no",
    skinTone: document.getElementById("avatar-skin-tone")?.value || "medium",
    mouth: document.getElementById("avatar-mouth").value,
    background: document.getElementById("avatar-background").value
  };
}

function refreshAvatarChoiceCards(selectId, options, group, avatar) {
  const select = document.getElementById(selectId);
  const oldDropdown = document.querySelector(`[data-avatar-dropdown-for="${selectId}"]`);
  if (!select || !oldDropdown) return;
  oldDropdown.outerHTML = renderAvatarChoiceDropdown(selectId, options, select.value, group, avatar || avatarFromCustomizerForm());
}

function closeAvatarDropdowns(exceptId = "") {
  document.querySelectorAll(".avatar-visual-select.is-open").forEach((dropdown) => {
    if (dropdown.dataset.avatarDropdownFor === exceptId) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector(".avatar-visual-select-trigger")?.setAttribute("aria-expanded", "false");
  });
}

function toggleAvatarDropdown(selectId, event) {
  event?.stopPropagation();
  const dropdown = document.querySelector(`[data-avatar-dropdown-for="${selectId}"]`);
  if (!dropdown) return;
  const shouldOpen = !dropdown.classList.contains("is-open");
  closeAvatarDropdowns();
  dropdown.classList.toggle("is-open", shouldOpen);
  dropdown.querySelector(".avatar-visual-select-trigger")?.setAttribute("aria-expanded", String(shouldOpen));
}

function chooseAvatarOption(selectId, value) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.value = value;
  const dropdown = document.querySelector(`[data-avatar-dropdown-for="${selectId}"]`);
  const group = dropdown?.dataset.avatarGroup || "style";
  const options = [...select.options].map((option) => [option.value, option.textContent]);
  refreshAvatarChoiceCards(selectId, options, group);
  if (selectId === "avatar-type") updateAvatarTypeControls();
  else updateAvatarPreview();
}

function setAvatarSelectOptions(selectId, options, keepCurrent, group) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const selected = keepCurrent && options.some(([value]) => value === select.value)
    ? select.value
    : options[0][0];
  select.innerHTML = avatarOptionsMarkup(options, selected);
  select.value = selected;
  refreshAvatarChoiceCards(selectId, options, group);
}

function updateAvatarTypeControls() {
  const form = document.querySelector(".avatar-form");
  const type = document.getElementById("avatar-type")?.value || "explorer";
  const profile = avatarProfile(type);
  const keepCurrent = form?.dataset.avatarType === type;
  setAvatarSelectOptions("avatar-color", profile.colors, keepCurrent, "color");
  setAvatarSelectOptions("avatar-hair-style", profile.styles, keepCurrent, "style");
  setAvatarSelectOptions("avatar-hair-color", profile.details, keepCurrent, "detail");
  setAvatarSelectOptions("avatar-outfit", profile.outfits, keepCurrent, "outfit");
  document.getElementById("avatar-color-label").textContent = profile.colorLabel;
  document.getElementById("avatar-style-label").textContent = profile.styleLabel;
  document.getElementById("avatar-detail-label").textContent = profile.detailLabel;
  document.getElementById("avatar-outfit-label").textContent = profile.outfitLabel;
  form?.classList.toggle("avatar-is-explorer", type === "explorer");
  if (form) form.dataset.avatarType = type;
  updateAvatarPreview();
}

function updateAvatarPreview() {
  const preview = document.getElementById("avatar-live-preview");
  if (!preview) return;
  const avatar = normalizeAvatar(avatarFromCustomizerForm());
  preview.innerHTML = renderAvatarFigure(avatar, true);
  document.getElementById("avatar-preview-name").textContent = avatar.name;
  document.getElementById("avatar-preview-summary").textContent = `${avatarTypeLabel(avatar.type)} · ${avatarProfileValue(avatar.type, "styles", avatar.hairStyle)} · ${avatarProfileValue(avatar.type, "details", avatar.hairColor)} · ${avatarProfileValue(avatar.type, "outfits", avatar.outfit)} · ${avatarMouthLabel(avatar.mouth)} · ${avatar.background}`;
}

function saveAvatarCustomization() {
  const openedFromChallenge = Boolean(document.getElementById("avatar-customizer-modal"));
  updateGameProgress((progress) => {
    progress.avatar = normalizeAvatar(avatarFromCustomizerForm());
  });
  if (openedFromChallenge) {
    closeAvatarCustomizerModal();
    renderStudy();
    return;
  }
  renderAdventureMap();
}

function zoneIllustrationKind(zoneName, theme) {
  const text = `${zoneName} ${theme}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (text.includes("umbral")) return "gateway";
  if (text.includes("ciudad de los reales")) return "city";
  if ((text.includes("distrito") || text.includes("sala")) && text.includes("ecuacion")) return "equations";
  if (text.includes("frontera") && text.includes("limite")) return "limit";
  if (text.includes("camara") && text.includes("combinatoria")) return "combinatorics";
  if (text.includes("plaza")) return "plaza";
  if (text.includes("aldea") || text.includes("mercado")) return "village";
  if (text.includes("camino") || text.includes("ruta") || text.includes("puerto")) return "road";
  if (text.includes("muralla") || text.includes("sala") || text.includes("camara")) return "wall";
  if (text.includes("puente")) return "bridge";
  if (text.includes("torre") || text.includes("faro") || text.includes("cima")) return "tower";
  if (text.includes("valle") || text.includes("jardin")) return "valley";
  if (text.includes("bosque")) return "forest";
  if (text.includes("templo") || text.includes("castillo")) return "temple";
  if (text.includes("observatorio") || text.includes("mirador")) return "observatory";
  if (text.includes("forja") || text.includes("cristal") || text.includes("laboratorio")) return "crystals";
  if (text.includes("biblioteca") || text.includes("archivo")) return "library";
  if (text.includes("taller")) return "workshop";
  if (text.includes("geometr") || text.includes("poligono") || text.includes("plano")) return "geometry";
  if (text.includes("funcion") || text.includes("lineal")) return "graph";
  if (text.includes("probabilidad") || text.includes("azar")) return "chest";
  return "numbers";
}

function renderZoneIllustration(kind) {
  const illustrations = {
    city: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-ground" d="M8 55h80" />
        <rect class="zone-house" x="12" y="28" width="18" height="25" rx="3" />
        <rect class="zone-house is-main" x="34" y="17" width="28" height="36" rx="4" />
        <rect class="zone-house" x="66" y="25" width="18" height="28" rx="3" />
        <path class="zone-roof" d="M10 28 21 18l11 10M31 17 48 6l17 11M64 25 75 14l11 11" />
        <text x="42" y="41">&#8477;</text><text x="17" y="45">-2</text><text x="71" y="44">&pi;</text>
      </svg>
    `,
    gateway: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-ground" d="M13 55h70" />
        <path class="zone-bridge-arch" d="M24 54V30 C24 8,72 8,72 30V54" />
        <path class="zone-column" d="M24 29v25M72 29v25" />
        <path class="zone-temple-roof" d="M18 24 48 7l30 17z" />
        <text x="40" y="43">&#8477;</text>
      </svg>
    `,
    equations: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-axis" d="M22 12 C15 12,15 22,20 25 C15 28,15 50,22 50" />
        <rect class="zone-number-board" x="27" y="10" width="57" height="42" rx="8" />
        <text x="33" y="27">x + y = 7</text>
        <text x="33" y="44">x - y = 1</text>
      </svg>
    `,
    limit: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-axis" d="M16 51h67M21 56V11" />
        <path class="zone-curve" d="M23 47 C36 46,39 33,49 30 C59 27,62 19,79 16" />
        <circle class="zone-dot" cx="49" cy="30" r="4" />
        <text x="31" y="20">x &rarr; a</text>
      </svg>
    `,
    combinatorics: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-path" d="M48 12v12M48 24 26 38M48 24l22 14M26 38 17 52M26 38l17 14M70 38 55 52M70 38l15 14" />
        <circle class="zone-dot" cx="48" cy="12" r="4" /><circle class="zone-dot" cx="26" cy="38" r="4" /><circle class="zone-dot" cx="70" cy="38" r="4" />
        <circle class="zone-dot" cx="17" cy="52" r="3" /><circle class="zone-dot" cx="43" cy="52" r="3" /><circle class="zone-dot" cx="55" cy="52" r="3" /><circle class="zone-dot" cx="85" cy="52" r="3" />
        <text x="53" y="18">2<tspan dy="-5" font-size="8">n</tspan></text>
      </svg>
    `,
    village: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-ground" d="M10 54h76" />
        <path class="zone-roof" d="M12 34 27 21l15 13" />
        <rect class="zone-house" x="17" y="34" width="22" height="18" rx="3" />
        <path class="zone-roof" d="M36 30 52 17l16 13" />
        <rect class="zone-house is-main" x="42" y="30" width="24" height="22" rx="3" />
        <path class="zone-roof" d="M60 36 74 24l14 12" />
        <rect class="zone-house" x="65" y="36" width="20" height="16" rx="3" />
        <text x="50" y="45">1</text><text x="24" y="47">2</text><text x="72" y="49">3</text>
      </svg>
    `,
    road: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-path" d="M14 52 C30 42, 24 28, 43 25 C61 22, 58 39, 80 30" />
        <circle class="zone-dot" cx="18" cy="50" r="4" /><circle class="zone-dot" cx="43" cy="25" r="4" /><circle class="zone-dot" cx="80" cy="30" r="4" />
        <text x="28" y="42">Ã·</text><text x="54" y="22">%</text><text x="67" y="45">m.c.m.</text>
      </svg>
    `,
    wall: `
      <svg viewBox="0 0 96 64" role="img">
        <rect class="zone-block" x="14" y="28" width="20" height="18" rx="3" /><rect class="zone-block" x="36" y="28" width="20" height="18" rx="3" /><rect class="zone-block" x="58" y="28" width="20" height="18" rx="3" />
        <rect class="zone-block is-top" x="25" y="12" width="20" height="18" rx="3" /><rect class="zone-block is-top" x="47" y="12" width="20" height="18" rx="3" />
        <path class="zone-ground" d="M10 48h76" />
        <text x="20" y="41">-4</text><text x="42" y="41">+</text><text x="64" y="41">7</text><text x="31" y="25">0</text><text x="53" y="25">-</text>
      </svg>
    `,
    bridge: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-water" d="M9 54 C18 49, 26 59, 35 54 C44 49, 52 59, 61 54 C70 49, 78 59, 87 54" />
        <path class="zone-bridge-arch" d="M14 44 C25 20, 39 20, 50 44 C61 20, 75 20, 86 44" />
        <path class="zone-bridge-deck" d="M10 34h78" />
        <path class="zone-bridge-rail" d="M16 27h66" />
        <path class="zone-bridge-posts" d="M20 27v17M34 27v17M48 27v17M62 27v17M76 27v17" />
        <text x="27" y="20">1/2</text><text x="48" y="20">3/4</text><text x="69" y="20">2/3</text>
      </svg>
    `,
    tower: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-tower-roof" d="M34 18 48 7l14 11" />
        <rect class="zone-tower" x="33" y="18" width="30" height="36" rx="5" />
        <path class="zone-ground" d="M20 55h56" />
        <text x="41" y="33">10</text><text x="44" y="47">0,5</text>
      </svg>
    `,
    valley: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-hill is-back" d="M6 52 C22 20, 38 20, 52 52" />
        <path class="zone-hill" d="M34 52 C50 14, 74 18, 90 52" />
        <path class="zone-arrow" d="M24 36h30m0 0-7-6m7 6-7 6" />
        <text x="56" y="38">k</text>
      </svg>
    `,
    forest: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-tree" d="M18 52 30 18l12 34z" /><path class="zone-tree is-main" d="M38 54 52 12l14 42z" /><path class="zone-tree" d="M58 52 70 20l12 32z" />
        <path class="zone-trunk" d="M30 52v7M52 54v7M70 52v7" />
        <text x="47" y="38">x</text><text x="66" y="42">y</text>
      </svg>
    `,
    temple: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-temple-roof" d="M18 24 48 8l30 16z" />
        <path class="zone-column" d="M25 26v26M40 26v26M56 26v26M71 26v26" />
        <path class="zone-ground" d="M18 54h60" />
        <text x="41" y="22">π</text>
      </svg>
    `,
    observatory: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-dome" d="M28 44 C29 24, 67 24, 68 44z" />
        <rect class="zone-base" x="26" y="42" width="44" height="12" rx="3" />
        <path class="zone-scope" d="M58 28 82 18" />
        <circle class="zone-star" cx="78" cy="14" r="4" />
        <text x="38" y="40">∠</text>
      </svg>
    `,
    crystals: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-crystal" d="M24 12 38 22 34 54 16 54 10 22z" />
        <path class="zone-crystal is-main" d="M48 8 64 22 58 56 38 56 32 22z" />
        <path class="zone-crystal" d="M72 16 84 26 80 52 62 52 58 26z" />
        <text x="40" y="38">x²</text>
      </svg>
    `,
    library: `
      <svg viewBox="0 0 96 64" role="img">
        <rect class="zone-book" x="18" y="15" width="14" height="38" rx="3" /><rect class="zone-book is-main" x="34" y="10" width="16" height="43" rx="3" /><rect class="zone-book" x="52" y="18" width="14" height="35" rx="3" /><rect class="zone-book is-alt" x="68" y="13" width="12" height="40" rx="3" />
        <path class="zone-ground" d="M14 55h70" />
        <text x="38" y="34">a</text><text x="56" y="40">b</text>
      </svg>
    `,
    workshop: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-balance" d="M48 16v34M28 28h40M28 28l-10 18h20zM68 28l-10 18h20z" />
        <circle class="zone-dot" cx="48" cy="16" r="5" />
        <text x="22" y="43">x</text><text x="62" y="43">5</text>
      </svg>
    `,
    geometry: `
      <svg viewBox="0 0 96 64" role="img">
        <rect class="zone-shape" x="12" y="28" width="24" height="24" rx="4" />
        <path class="zone-shape is-main" d="M48 12 68 52H28z" />
        <circle class="zone-shape is-alt" cx="74" cy="39" r="15" />
      </svg>
    `,
    plaza: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-plaza-floor" d="M14 48 48 16l34 32-34 10z" />
        <path class="zone-plaza-tile" d="M48 16v42M31 32l34 19M65 32 31 51" />
        <path class="zone-plaza-center" d="M48 28 60 35l-5 13H41l-5-13z" />
        <path class="zone-plaza-poly is-left" d="M20 42 27 34l8 7-4 9H22z" />
        <path class="zone-plaza-poly is-right" d="M69 41 76 34l7 7-3 9h-9z" />
        <text x="48" y="39">5</text>
      </svg>
    `,
    graph: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-axis" d="M18 52h62M22 56V12" />
        <path class="zone-curve" d="M22 48 C34 45, 35 18, 48 22 C62 27, 60 48, 78 18" />
        <circle class="zone-dot" cx="48" cy="22" r="4" />
        <text x="75" y="28">f</text>
      </svg>
    `,
    chest: `
      <svg viewBox="0 0 96 64" role="img">
        <path class="zone-chest-lid" d="M22 31 C24 17, 72 17, 74 31z" />
        <rect class="zone-chest" x="20" y="30" width="56" height="24" rx="5" />
        <rect class="zone-lock" x="43" y="34" width="10" height="13" rx="2" />
        <text x="44" y="27">?</text>
      </svg>
    `,
    numbers: `
      <svg viewBox="0 0 96 64" role="img">
        <rect class="zone-number-board" x="14" y="12" width="68" height="40" rx="12" />
        <text x="25" y="38">1</text><text x="43" y="38">2</text><text x="61" y="38">3</text>
      </svg>
    `
  };
  return `<span class="zone-visual zone-visual-${kind}" aria-hidden="true">${illustrations[kind] || illustrations.numbers}</span>`;
}

function renderAdventureMap() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  if (!isEsoCourse(course)) {
    renderDashboard();
    return;
  }
  const meta = adventureWorlds[course.id];
  const progress = getGameProgress();
  progress.avatar = progress.avatar || defaultGameProgress().avatar;
  const reviewTopic = recommendedReviewTopic(progress, course);
  const currentTopic = progress.completedTopics.length
    ? Math.min(Math.max(...progress.completedTopics) + 1, course.themes.length - 1)
    : 0;
  const mapLayout = adventureMapLayouts[course.id] || adventureMapLayouts["1eso"];
  const routePoints = course.themes
    .map((_, index) => mapLayout[index] || mapLayout[mapLayout.length - 1])
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
  const isFirstEsoAdventure = course.id === "1eso";
  const routeProgressEnd = Math.max(currentTopic, ...(progress.completedTopics.length ? progress.completedTopics : [0]));
  const routeProgressPoints = course.themes
    .slice(0, routeProgressEnd + 1)
    .map((_, index) => mapLayout[index] || mapLayout[mapLayout.length - 1])
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
  const mapProgressPercent = Math.round((progress.completedTopics.length / course.themes.length) * 100);
  const mapHeight = course.themes.length > 12 ? 900 : course.themes.length > 9 ? 720 : 650;
  const zones = course.themes.map((theme, index) => {
    const unlocked = progress.unlockedTopics.includes(index);
    const completed = progress.completedTopics.includes(index);
    const bossDone = progress.defeatedBosses.includes(index);
    const current = index === currentTopic && unlocked && !completed;
    const zoneName = meta.zones[index] || theme;
    const visualKind = zoneIllustrationKind(zoneName, theme);
    const [nodeX, nodeY] = mapLayout[index] || mapLayout[mapLayout.length - 1];
    return `
      <button class="map-node zone-${index + 1} ${unlocked ? "is-unlocked" : "is-locked"} ${completed ? "is-complete" : ""} ${current ? "is-current" : ""}" style="--node-x:${nodeX}%;--node-y:${nodeY}%" onclick="renderAdventureZone(${index})" ${unlocked ? "" : "disabled"} aria-label="${unlocked ? `Entrar en ${escapeHtml(zoneName)}` : `${escapeHtml(zoneName)} bloqueada`}">
        ${renderZoneIllustration(visualKind)}
        <span class="zone-orb">${index + 1}</span>
        <span class="map-node-label">
          <strong>${escapeHtml(zoneName)}</strong>
          <small>${escapeHtml(theme)}</small>
        </span>
        ${current ? `<span class="current-avatar-marker">${renderAvatarFigure(progress.avatar, false, "portrait")}</span>` : ""}
        ${isFirstEsoAdventure && completed ? `<span class="first-eso-zone-star" aria-label="Zona completada">★</span>` : ""}
        ${current ? `<em>Estás aquí</em>` : ""}
        ${bossDone ? `<em>Jefe derrotado</em>` : ""}
      </button>
    `;
  }).join("");
  renderShell(`
    <section class="adventure-shell world-${meta.accent}">
      <aside class="screen-panel avatar-panel">
        <button class="ghost" onclick="renderStudentHome()">Volver al inicio</button>
        <div class="avatar-core">
          ${renderAvatarFigure(progress.avatar, true)}
          <span class="avatar-name">${escapeHtml(progress.avatar.name || meta.guide)}</span>
          <h2>${escapeHtml(meta.world)}</h2>
          <p>${escapeHtml(progress.avatar.name || meta.guide)} te acompaña: estudia primero si una zona se atasca y vuelve al mapa cuando estés listo.</p>
          <button class="secondary" onclick="renderAvatarCustomizer()">Personalizar avatar</button>
        </div>
        <div class="reward-list">
          <span>Puntuación <strong>${progress.xp}</strong></span>
          <span>Monedas <strong>${progress.coins}</strong></span>
          <span>Mejor racha <strong>${progress.bestStreak}</strong></span>
          <span>Título <strong>${escapeHtml(progress.titles.at(-1))}</strong></span>
        </div>
        <div class="smart-review">
          <strong>Repaso recomendado</strong>
          <p>${escapeHtml(reviewTopic)}</p>
          <button class="secondary" onclick="startTopic(${Math.max(0, course.themes.indexOf(reviewTopic))})">Volver a estudiar</button>
        </div>
      </aside>
      <section class="screen-panel map-panel">
        <div class="workspace-head">
          <div>
            <h1>Mapa de aventura</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(courseDisplayName(course))}</span>
              <span class="badge">${escapeHtml(meta.boss)}</span>
              <span class="badge">${progress.completedTopics.length}/${course.themes.length} zonas</span>
            </div>
          </div>
          <button class="ghost" onclick="renderDashboard()">Ir a estudio</button>
        </div>
        ${isFirstEsoAdventure ? `
          <div class="first-eso-map-intro">
            <div class="first-eso-map-copy">
              <span class="first-eso-chapter">Capítulo ${Math.min(currentTopic + 1, course.themes.length)} de ${course.themes.length}</span>
              <strong>${escapeHtml(meta.zones[currentTopic] || course.themes[currentTopic])}</strong>
              <small>${escapeHtml(firstEsoAdventureCopy[currentTopic] || "Continúa el camino y devuelve la energía al reino.")}</small>
            </div>
            <div class="first-eso-map-progress" aria-label="${mapProgressPercent}% del reino completado">
              <span><b style="width:${mapProgressPercent}%"></b></span><strong>${mapProgressPercent}%</strong>
            </div>
          </div>
        ` : ""}
        <div class="adventure-map-board map-course-${escapeHtml(course.id)} ${isFirstEsoAdventure ? "first-eso-live-map" : ""}" style="--map-height:${mapHeight}px">
          ${adventureMapBackdrop(course.id)}
          ${isFirstEsoAdventure ? `<div class="first-eso-atmosphere" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>` : ""}
          <svg class="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="${routePoints}"></polyline>
            ${isFirstEsoAdventure && routeProgressPoints.split(" ").length > 1 ? `<polyline class="map-route-progress" points="${routeProgressPoints}"></polyline>` : ""}
            ${isFirstEsoAdventure ? `<circle class="map-route-beacon" cx="${mapLayout[currentTopic][0]}" cy="${mapLayout[currentTopic][1]}" r="1.25"></circle>` : ""}
          </svg>
          ${zones}
        </div>
      </section>
    </section>
  `);
  document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
}

function renderAdventureZone(topicIndex) {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  if (!isEsoCourse(course)) {
    renderDashboard();
    return;
  }
  const progress = getGameProgress();
  if (!progress.unlockedTopics.includes(topicIndex)) {
    renderAdventureMap();
    return;
  }
  const meta = adventureWorlds[course.id];
  const theme = course.themes[topicIndex];
  const zoneName = meta.zones[topicIndex] || theme;
  const visualKind = zoneIllustrationKind(zoneName, theme);
  const completed = progress.completedTopics.includes(topicIndex);
  const bossDone = progress.defeatedBosses.includes(topicIndex);
  const isFirstEsoAdventure = course.id === "1eso";
  const modes = [
    ["learn", "Aprender", "Repasa la explicación y los pasos esenciales del tema."],
    ["train", "Entrenar", "Elige nivel fácil, medio o difícil y practica con ejercicios."],
    ["boss", "Jefe final", `Enfréntate a ${meta.boss} y desbloquea el siguiente camino.`]
  ].map(([phase, label, description]) => {
    const presentation = firstEsoMissionPresentation[phase];
    if (!isFirstEsoAdventure) {
      return `
        <button class="zone-mode-button mode-${phase}" onclick="renderAdventurePhase(${topicIndex}, '${phase}')">
          <span>${escapeHtml(label)}</span>
          <small>${escapeHtml(description)}</small>
        </button>
      `;
    }
    return `
      <button class="zone-mode-button mode-${phase} first-eso-mission" onclick="renderAdventurePhase(${topicIndex}, '${phase}')">
        <span class="zone-mode-icon" aria-hidden="true">${presentation.icon}</span>
        <span class="zone-mode-copy-block">
          <strong>${escapeHtml(label)}</strong>
          <small>${escapeHtml(description)}</small>
          <em>${escapeHtml(presentation.detail)} · ${escapeHtml(presentation.action)}</em>
        </span>
      </button>
    `;
  }).join("");

  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel adventure-zone-entry world-${escapeHtml(meta.accent)}">
        <div class="workspace-head zone-entry-head">
          <div>
            <h1>${escapeHtml(zoneName)}</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(courseDisplayName(course))}</span>
              <span class="badge">Tema ${topicIndex + 1} de ${course.themes.length}</span>
              <span class="badge">${completed ? "Zona completada" : "Zona disponible"}</span>
              ${bossDone ? `<span class="badge zone-status-complete">Jefe derrotado</span>` : ""}
            </div>
          </div>
          <div class="topic-actions">
            <button class="ghost" onclick="renderAdventureMap()">Volver al mapa</button>
            <button class="ghost" onclick="renderDashboard()">Ir a estudio</button>
          </div>
        </div>
        <div class="zone-entry-layout">
          <section class="zone-entry-scene scene-kind-${escapeHtml(visualKind)} map-course-${escapeHtml(course.id)}" aria-label="Escena de ${escapeHtml(zoneName)}">
            ${adventureMapBackdrop(course.id)}
            <div class="zone-scene-landmark">${renderZoneIllustration(visualKind)}</div>
            <div class="zone-scene-avatar">${renderAvatarFigure(progress.avatar || defaultGameProgress().avatar, true)}</div>
            ${isFirstEsoAdventure ? `
              <div class="first-eso-guide-bubble">
                <strong>Mati</strong>
                <span>${escapeHtml(firstEsoAdventureCopy[topicIndex] || "Elige una misión para continuar la aventura.")}</span>
              </div>
            ` : ""}
            <div class="zone-scene-copy">
              <span>${escapeHtml(meta.world)}</span>
              <h2>${escapeHtml(theme)}</h2>
              <p>Has llegado a ${escapeHtml(zoneName)}. Elige cómo quieres trabajar este tema.</p>
            </div>
          </section>
          <section class="zone-mission-panel">
            <div>
              <h2>Elige tu misión</h2>
              <p>Cada modo trabaja el mismo tema de una forma diferente.</p>
            </div>
            <div class="zone-mode-grid">${modes}</div>
            <button class="secondary zone-study-link" onclick="startTopic(${topicIndex})">Estudiar este tema fuera de la aventura</button>
          </section>
        </div>
      </section>
    </section>
  `);
}

function renderAdventurePhase(topicIndex, phase = "learn") {
  const course = courseById(state.courseId);
  if (!isEsoCourse(course)) {
    renderDashboard();
    return;
  }
  const progress = getGameProgress();
  if (!progress.unlockedTopics.includes(topicIndex)) {
    renderAdventureMap();
    return;
  }
  const meta = adventureWorlds[course.id];
  const theme = course.themes[topicIndex];
  const zoneName = meta.zones[topicIndex] || theme;
  const isFirstEsoAdventure = course.id === "1eso";
  const explanation = topicExplanation(theme, course);
  const infographicPath = bachInfographicFor(course, topicIndex);
  const infographicUrl = infographicPath ? resourceUrl({ path: infographicPath, webPath: infographicPath, type: "pdf" }, theme) : "";
  const content = {
    learn: `
      <div class="phase-card">
        <h2>Aprender: ${escapeHtml(theme)}</h2>
        ${infographicUrl ? `
          <div class="book-content-panel infographic-panel adventure-infographic" style="display:grid">
            <div class="book-content-head">
              <strong>Infografía del tema</strong>
              <button class="ghost compact-btn" onclick="openTopicResource()">Abrir infografía</button>
            </div>
            <iframe class="pdf-preview" src="${infographicUrl}" title="Infografía: ${escapeHtml(theme)}"></iframe>
          </div>
        ` : `<p>${escapeHtml(explanation.intro)}</p>`}
        <div class="lesson-slides">
          ${explanation.steps.map((step, index) => `
            <article class="lesson-slide"><span>${index + 1}</span><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.body)}</p></article>
          `).join("")}
        </div>
        <div class="topic-actions">
          <button class="secondary" onclick="renderAdventurePhase(${topicIndex}, 'train')">Entrenar</button>
          <button class="ghost" onclick="startTopic(${topicIndex})">Estudiar con el libro</button>
        </div>
      </div>
    `,
    train: `
      <div class="phase-card">
        <h2>Entrenar</h2>
        <p>Elige una dificultad. Cada nivel inicia un entrenamiento nuevo del tema y adapta la exigencia para superar la misión.</p>
        <div class="training-lanes">
          <button class="training-lane difficulty-easy" onclick="startAdventureChallenge(${topicIndex}, 'train', 'easy')">
            <strong>Fácil</strong><span>Cálculos directos y una regla básica en cada ejercicio.</span><em>Comenzar</em>
          </button>
          <button class="training-lane difficulty-medium" onclick="startAdventureChallenge(${topicIndex}, 'train', 'medium')">
            <strong>Media</strong><span>Ejercicios de varios pasos basados en el banco del tema.</span><em>Comenzar</em>
          </button>
          <button class="training-lane difficulty-hard" onclick="startAdventureChallenge(${topicIndex}, 'train', 'hard')">
            <strong>Difícil</strong><span>Problemas, operaciones combinadas y aplicación de conceptos.</span><em>Comenzar</em>
          </button>
        </div>
      </div>
    `,
    boss: `
      <div class="phase-card boss-card">
        ${isFirstEsoAdventure ? `
          <div class="first-eso-boss-stage" aria-hidden="true">
            <span class="boss-number-rune rune-one">7</span>
            <span class="boss-number-rune rune-two">−3</span>
            <div class="number-guardian">
              <span class="guardian-crown">123</span>
              <span class="guardian-eye guardian-eye-left"></span>
              <span class="guardian-eye guardian-eye-right"></span>
              <span class="guardian-shield">∑</span>
            </div>
          </div>
        ` : ""}
        <h2>${escapeHtml(meta.boss)}</h2>
        <p>El jefe tiene vida. Cada acierto le quita energía; cada error reduce la tuya.</p>
        <button class="primary" onclick="startAdventureChallenge(${topicIndex}, 'boss')">Enfrentarse al jefe</button>
      </div>
    `
  }[phase];

  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel adventure-phase">
        <div class="workspace-head">
          <div>
            <h1>${escapeHtml(phaseLabel(phase))} · ${escapeHtml(theme)}</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(zoneName)}</span>
              <span class="badge">${escapeHtml(meta.world)}</span>
            </div>
          </div>
          <div class="topic-actions">
            <button class="ghost" onclick="renderAdventureZone(${topicIndex})">Volver a la zona</button>
            <button class="ghost" onclick="renderAdventureMap()">Mapa</button>
          </div>
        </div>
        ${isFirstEsoAdventure ? `<div class="first-eso-phase-banner"><span>Zona ${topicIndex + 1}</span><strong>${escapeHtml(zoneName)}</strong><small>${escapeHtml(firstEsoAdventureCopy[topicIndex] || "Completa la misión para seguir avanzando.")}</small></div>` : ""}
        ${content}
      </section>
    </section>
  `);
}

function adventureDifficultyLabel(difficulty) {
  return {
    easy: "Nivel fácil",
    medium: "Nivel medio",
    hard: "Nivel difícil"
  }[difficulty] || "";
}

function startAdventureChallenge(topicIndex, mode, difficulty = "medium") {
  const course = courseById(state.courseId);
  const theme = course.themes[topicIndex];
  const trainingDifficulty = mode === "train" ? difficulty : "";
  const difficultyRound = { easy: 1, medium: 2, hard: 3 }[trainingDifficulty] || 1;
  const startingEnergy = { easy: 120, medium: 100, hard: 80 }[trainingDifficulty] || 100;
  state.adventure = {
    topicIndex,
    mode,
    difficulty: trainingDifficulty,
    questionIndex: 0,
    answers: [],
    score: 0,
    streak: 0,
    bossHp: mode === "boss" ? 100 : 0,
    energy: startingEnergy,
    startedAt: Date.now()
  };
  state.topicIndex = topicIndex;
  state.practiceRound += mode === "boss" ? 2 : difficultyRound;
  if (mode === "train") {
    state.adventure.questions = buildAdventureTrainingQuestions(theme, course, trainingDifficulty, state.practiceRound);
  } else {
    const previousSelectionContext = state.exerciseSelectionContext;
    state.exerciseSelectionContext = "boss";
    try {
      state.adventure.questions = buildQuestions(theme, course);
    } finally {
      state.exerciseSelectionContext = previousSelectionContext;
    }
  }
  renderAdventureQuestion();
}

function currentAdventureQuestions() {
  const adventure = state.adventure;
  if (adventure?.questions?.length) return adventure.questions;
  const course = courseById(state.courseId);
  const theme = course.themes[adventure.topicIndex];
  const previousSelectionContext = state.exerciseSelectionContext;
  state.exerciseSelectionContext = adventure.mode === "boss" ? "boss" : "adventure";
  try {
    return buildQuestions(theme, course);
  } finally {
    state.exerciseSelectionContext = previousSelectionContext;
  }
}

function renderAdventureQuestion() {
  const course = courseById(state.courseId);
  const adventure = state.adventure;
  const theme = course.themes[adventure.topicIndex];
  const questions = currentAdventureQuestions();
  const question = questions[adventure.questionIndex];
  markChallengeQuestionShown(question);
  const meta = adventureWorlds[course.id];
  const progress = Math.round((adventure.questionIndex / questions.length) * 100);
  const modeTitle = adventure.mode === "boss"
    ? `Jefe final · ${theme}`
    : `Entrenar · ${theme}`;

  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel adventure-question">
        <div class="workspace-head">
          <div>
            <h1>${escapeHtml(modeTitle)}</h1>
            <div class="badge-row">
              ${adventure.mode === "boss" ? `<span class="badge">${escapeHtml(meta.boss)}</span>` : ""}
              <span class="badge">${escapeHtml(theme)}</span>
              ${adventure.difficulty ? `<span class="badge">${adventureDifficultyLabel(adventure.difficulty)}</span>` : ""}
              <span class="badge">Pregunta ${adventure.questionIndex + 1}/${questions.length}</span>
              <span class="badge">Racha ${adventure.streak}</span>
            </div>
          </div>
          <button class="ghost" onclick="renderAdventureZone(${adventure.topicIndex})">Salir a la zona</button>
        </div>
        <div class="duel-bars">
          ${adventure.mode === "boss" ? `<div><span>Vida jefe</span><div class="progress boss-progress"><span style="width:${adventure.bossHp}%"></span></div></div>` : ""}
          <div><span>Energia</span><div class="progress energy-progress"><span style="width:${adventure.energy}%"></span></div></div>
          <div><span>Avance</span><div class="progress"><span style="width:${progress}%"></span></div></div>
        </div>
        <div class="question-box">
          <div class="adventure-avatar-reaction" id="adventure-avatar-reaction" aria-live="polite">
            ${renderAvatarFigure({ ...getGameProgress().avatar, mouth: "happy" }, false, "reaction")}
            <span id="adventure-avatar-message">¡Vamos a por ella!</span>
          </div>
          <p class="question-text">${formatMathText(question.text)}</p>
          ${handwritingAnswerHtml(question, {
            topicIndex: adventure.topicIndex,
            topicLabel: theme,
            questionIndex: adventure.questionIndex,
            difficulty: adventure.difficulty || "boss",
            mode: adventure.mode === "boss" ? "adventureBoss" : "adventureTraining",
            resultChannel: "adventure",
            statementHtml: `<p class="question-text">${formatMathText(question.text)}</p>`,
            scoreState: {
              score: adventure.score,
              streak: adventure.streak,
              energy: adventure.energy,
              bossHp: adventure.bossHp,
              progressIndex: adventure.questionIndex
            },
            attemptContext: { adventureMode: adventure.mode, difficulty: adventure.difficulty }
          })}
          <div class="answers">
            ${question.options.map((option, index) => `
              <button class="answer-btn" id="answer-${index}" onclick="answerAdventureQuestion(${index})"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-content">${formatMathText(option)}</span></button>
            `).join("")}
          </div>
          <button class="ghost" id="help-btn" style="display:none" onclick="showAdventureHelp()">Ver resolución paso a paso</button>
          <div class="solution-help" id="solution-help"></div>
          <div class="feedback" id="feedback"></div>
          <button class="primary" id="next-btn" style="display:none" onclick="nextAdventureQuestion()">Siguiente</button>
        </div>
      </section>
    </section>
  `);
}

function answerAdventureQuestion(index) {
  const course = courseById(state.courseId);
  const adventure = state.adventure;
  if (!adventure || adventure.answered) return;
  const theme = course.themes[adventure.topicIndex];
  const questions = currentAdventureQuestions();
  const question = questions[adventure.questionIndex];
  const isCorrect = index === question.correct;
  const difficultyMultiplier = { easy: 1, medium: 1.2, hard: 1.5 }[adventure.difficulty] || 1;
  const energyLoss = { easy: 12, medium: 18, hard: 24 }[adventure.difficulty] || 18;
  adventure.answered = true;
  markChallengeQuestionAnswered(question);
  adventure.answers.push({ question: question.text, correct: isCorrect, solution: question.solution || "" });
  adventure.score += isCorrect ? Math.round((120 + adventure.streak * 15) * difficultyMultiplier) : 0;
  adventure.streak = isCorrect ? adventure.streak + 1 : 0;
  if (adventure.mode === "boss") adventure.bossHp = Math.max(0, adventure.bossHp - (isCorrect ? 20 : 0));
  if (!isCorrect) adventure.energy = Math.max(0, adventure.energy - energyLoss);
  document.getElementById(`answer-${question.correct}`).classList.add("correct");
  if (!isCorrect) {
    document.getElementById(`answer-${index}`).classList.add("wrong");
  }
  document.getElementById("help-btn").style.display = "block";
  document.getElementById("feedback").textContent = isCorrect
    ? "Acierto registrado. El mapa avanza contigo."
    : "Error registrado. Revisa la resolución completa antes de repetir.";
  document.getElementById("next-btn").style.display = "block";
  setAdventureAvatarMood(isCorrect ? "happy" : "sad", isCorrect ? "¡Muy bien!" : "Lo revisamos y seguimos.");
  if (isCorrect) burstSparkles();
  scheduleFitStudentScreen();
}

function setAdventureAvatarMood(mouth, message) {
  const reaction = document.getElementById("adventure-avatar-reaction");
  if (!reaction) return;
  reaction.innerHTML = `${renderAvatarFigure({ ...getGameProgress().avatar, mouth }, false, "reaction")}<span id="adventure-avatar-message">${escapeHtml(message)}</span>`;
  reaction.classList.remove("is-happy", "is-sad", "is-surprised");
  reaction.classList.add(`is-${mouth}`);
}

function showAdventureHelp() {
  const course = courseById(state.courseId);
  const adventure = state.adventure;
  const theme = course.themes[adventure.topicIndex];
  const question = currentAdventureQuestions()[adventure.questionIndex];
  const help = document.getElementById("solution-help");
  help.innerHTML = `<div class="solution-help-body">${formatSolutionText(didacticSolutionText(question))}</div>`;
  help.style.display = "block";
  document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  fitStudentScreen();
  requestAnimationFrame(() => help.scrollIntoView({ behavior: "smooth", block: "start" }));
  scheduleFitStudentScreen();
}

function nextAdventureQuestion() {
  const course = courseById(state.courseId);
  const adventure = state.adventure;
  const theme = course.themes[adventure.topicIndex];
  const questions = currentAdventureQuestions();
  const bossDefeated = adventure.mode === "boss" && adventure.bossHp <= 0;
  if (bossDefeated || adventure.energy <= 0 || adventure.questionIndex >= questions.length - 1) {
    renderAdventureResult();
    return;
  }
  adventure.questionIndex += 1;
  adventure.answered = false;
  renderAdventureQuestion();
}

function renderAdventureResult() {
  const course = courseById(state.courseId);
  const adventure = state.adventure;
  const theme = course.themes[adventure.topicIndex];
  const correct = adventure.answers.filter((answer) => answer.correct).length;
  const total = adventure.answers.length;
  const passed = adventure.mode === "boss" ? adventure.bossHp <= 0 && adventure.energy > 0 : correct >= Math.ceil(total * 0.7);
  const elapsed = Math.round((Date.now() - adventure.startedAt) / 1000);
  const nextTopic = Math.min(adventure.topicIndex + 1, course.themes.length - 1);
  const progress = updateGameProgress((item) => {
    item.correct += correct;
    item.errors += total - correct;
    item.totalTime += elapsed;
    item.bestStreak = Math.max(item.bestStreak, adventure.streak);
    if (passed) {
      item.xp += adventure.mode === "boss" ? 160 : 90;
      item.coins += adventure.mode === "boss" ? 35 : 18;
      if (adventure.mode === "boss") {
        item.completedTopics.push(adventure.topicIndex);
        item.unlockedTopics.push(nextTopic);
        item.defeatedBosses.push(adventure.topicIndex);
      }
      if (correct === total) item.titles.push(`Maestro de ${theme}`);
    }
  });
  saveAdventureReport(correct, total, passed);
  const reviewItems = adventure.answers
    .filter((answer) => !answer.correct)
    .map((answer) => `<article class="review-item"><strong>Repaso</strong><p>${escapeHtml(answer.question)}</p><small>${escapeHtml(answer.solution)}</small></article>`)
    .join("");

  renderShell(`
    <section class="screen-panel result-panel">
      <div class="result-avatar-reaction">
        ${renderAvatarFigure({ ...progress.avatar, mouth: passed ? "surprised" : "sad" }, false, "reaction")}
        <span>${passed ? "¡Recompensa conseguida!" : "Volvemos a intentarlo cuando quieras."}</span>
      </div>
      <h1 class="headline">${passed ? (adventure.mode === "boss" ? "Victoria de aventura" : "Entrenamiento superado") : "Intento registrado"}</h1>
      <p class="subhead">${passed ? (adventure.mode === "boss" ? `Has superado ${theme} y desbloqueado la siguiente zona.` : `Has completado el entrenamiento de ${theme}. Para desbloquear la siguiente zona debes derrotar al jefe.`) : `${adventureWorlds[course.id].guide} recomienda volver a estudiar ${theme} antes de repetir.`}</p>
      <div class="badge-row" style="justify-content:center">
        <span class="badge">Aciertos ${correct}/${total}</span>
        <span class="badge">Puntuación ${progress.xp}</span>
        <span class="badge">Monedas ${progress.coins}</span>
        <span class="badge">Tiempo ${elapsed}s</span>
      </div>
      <div class="topic-actions" style="justify-content:center;margin-top:18px">
        <button class="primary" style="max-width:320px" onclick="renderAdventureZone(${adventure.topicIndex})">Volver a la zona</button>
        <button class="ghost" onclick="renderAdventureMap()">Volver al mapa</button>
        <button class="secondary" onclick="startTopic(${adventure.topicIndex})">Volver a estudiar ${escapeHtml(theme)}</button>
        <button class="ghost" onclick="renderAdventurePhase(${adventure.topicIndex}, '${adventure.mode}')">Repetir fase</button>
      </div>
      ${reviewItems ? `<div class="result-review"><h2>Errores para repasar</h2>${reviewItems}</div>` : ""}
    </section>
  `);
  if (passed) burstSparkles(36);
}

function saveAdventureReport(correct, total, passed) {
  const reports = readReports();
  const course = courseById(state.courseId);
  const theme = course.themes[state.adventure.topicIndex];
  reports.push({
    date: new Date().toLocaleString("es-ES"),
    academicYear: state.academicYear,
    student: state.student.name,
    group: state.student.groupLabel || state.student.group,
    course: courseDisplayName(course),
    theme: `${theme} · Aventura ${phaseLabel(state.adventure.mode)}`,
    score: state.adventure.score,
    correct,
    total,
    mode: "adventure",
    passed
  });
  localStorage.setItem(REPORT_KEY, JSON.stringify(reports));
}

function renderStudentHome() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const meta = adventureWorlds[course.id];
  const progress = getGameProgress();
  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel home-panel">
        <div class="workspace-head">
          <div>
            <h1>${escapeHtml(courseDisplayName(course))}: elige tu zona</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(state.academicYear)}</span>
              <span class="badge">${escapeHtml(state.student.groupLabel || state.student.group)}</span>
              <span class="badge">${escapeHtml(state.student.name)}</span>
            </div>
          </div>
          <div class="dashboard-exit">
            <button class="ghost" onclick="renderStudentGateway()">Inicio principal</button>
            <button class="ghost" onclick="publicLogout()">Salir</button>
          </div>
        </div>
        <div class="path-choice-grid">
          <article class="path-choice path-choice-study">
            <span class="path-icon">Libro</span>
            <h2>Estudiar temas y hacer retos</h2>
            <p>Consulta la explicacion, el contenido del libro, ejemplos guiados y retos de 10 preguntas.</p>
            <button class="primary" onclick="renderDashboard()">Entrar a estudiar</button>
          </article>
          <article class="path-choice path-choice-adventure">
            <span class="path-icon">Mapa</span>
            <h2>Aventura matemática</h2>
            <p>${escapeHtml(meta.world)} con aprendizaje, entrenamientos, recompensas y el jefe final ${escapeHtml(meta.boss)}.</p>
            <div class="mini-stats">
              <span>Puntuación ${progress.xp}</span>
              <span>Monedas ${progress.coins}</span>
              <span>Zonas ${progress.completedTopics.length}/${course.themes.length}</span>
            </div>
            <button class="secondary" onclick="renderAdventureMap()">Ver mapa</button>
          </article>
        </div>
      </section>
    </section>
  `);
}

function renderBachIIHome() {
  clearQuestionTimer();
  state.blockKey = "";
  state.blockTopicIndexes = [];
  const course = courseById(state.courseId);
  const questionCount = questionsPerChallengeFor(course);
  const examQuestionCount = course.id === "2bach-ccss" ? 4 : 5;
  const communityName = BACH_II_PAU_COMMUNITIES[currentBachPauCommunity()];
  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel home-panel">
        <div class="workspace-head">
          <div>
            <h1>${escapeHtml(courseDisplayName(course))}: elige cómo estudiar</h1>
            <div class="badge-row">
              <span class="badge">${escapeHtml(state.academicYear)}</span>
              <span class="badge">${escapeHtml(state.student.groupLabel || state.student.group)}</span>
              <span class="badge">${escapeHtml(state.student.name)}</span>
              <span class="badge bach-pau-community-badge">PAU · ${escapeHtml(communityName)}</span>
            </div>
          </div>
          <div class="dashboard-exit">
            <button class="ghost" onclick="publicLogout()">Salir</button>
          </div>
        </div>
        <div class="path-choice-grid bach-ii-home-grid">
          <article class="path-choice path-choice-study bach-home-topics">
            <span class="path-icon">Temas</span>
            <h2>Estudiar temas y hacer retos</h2>
            <p>Accede a las infografías y a los retos PAU organizados por cada tema del curso.</p>
            <div class="bach-pau-card-actions">
              ${bachPauCommunityControl()}
              <button class="primary" onclick="renderDashboard()">Entrar por temas</button>
            </div>
          </article>
          <article class="path-choice path-choice-adventure bach-home-blocks">
            <span class="path-icon">Bloques</span>
            <h2>Estudiar por bloques y hacer retos</h2>
            <p>Repasa los contenidos agrupados por bloques PAU, con ${questionCount} ejercicios por reto.</p>
            <div class="bach-pau-card-actions">
              ${bachPauCommunityControl()}
              <button class="secondary" onclick="renderBachBlockSelector()">Ver bloques</button>
            </div>
          </article>
          <article class="path-choice path-choice-exam bach-home-exam">
            <span class="path-icon">Examen</span>
            <h2>Hacer examen</h2>
            <p>Realiza ${examQuestionCount} ejercicios elegidos de los bancos corregidos y consulta después su resolución completa.</p>
            <div class="bach-pau-card-actions">
              ${bachPauCommunityControl()}
              <button class="secondary" onclick="startBachExam()">Comenzar examen</button>
            </div>
          </article>
        </div>
      </section>
    </section>
  `);
  document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
}

function renderBachBlockSelector() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const blocks = BACH_II_BLOCKS[course.id] || [];
  const cards = blocks.map((block) => {
    const pending = !(bachPauRawBanks(course.id)?.[block.id]?.length);
    return `
    <article class="path-choice path-choice-adventure block-choice-card ${escapeHtml(block.slot)}">
      <div>
        <h2>${escapeHtml(block.label)}</h2>
      </div>
      <p>${escapeHtml(block.description)}</p>
      <button class="secondary" ${pending ? "disabled" : `onclick="startBachBlockChallenge('${escapeHtml(block.id)}')"`}>${pending ? "Pendiente de ejercicios" : "Comenzar reto"}</button>
    </article>
  `;
  }).join("");

  renderShell(`
    <section class="student-dashboard bach-block-selector">
      <section class="screen-panel bach-block-selector-panel">
        <div class="workspace-head">
          <div>
            <h1>Estudiar por bloques y hacer retos</h1>
            <div class="badge-row"><span class="badge">${escapeHtml(courseDisplayName(course))}</span><span class="badge">PAU · ${escapeHtml(BACH_II_PAU_COMMUNITIES[currentBachPauCommunity()])}</span></div>
          </div>
          <div class="dashboard-exit">
            <button class="ghost" onclick="renderBachIIHome()">Volver</button>
            <button class="ghost" onclick="publicLogout()">Salir</button>
          </div>
        </div>
        <div class="topics-grid block-choice-grid">${cards}</div>
      </section>
    </section>
  `);
}

function renderBachBlockDashboard(blockId) {
  startBachBlockChallenge(blockId);
}

function startBachBlockChallenge(blockId, selectedTopicIndexes = null) {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId);
  if (!block) {
    renderBachBlockSelector();
    return;
  }
  const requestedTopics = Array.isArray(selectedTopicIndexes) ? selectedTopicIndexes : block.topics;
  const availability = window.MargaritaContentAvailability;
  const partition = availability?.partition
    ? availability.partition(course.id, requestedTopics, "examByBlocks")
    : { valid: requestedTopics, excluded: [] };
  if (partition.excluded.length) {
    alert(availability.warning(course.id, partition.excluded, "examByBlocks"));
  }
  if (!partition.valid.length) {
    renderBachBlockSelector();
    return;
  }
  state.blockKey = block.id;
  state.blockTopicIndexes = partition.valid;
  state.topicIndex = partition.valid[0];
  state.questionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.practiceRound = 0;
  state.answered = false;
  state.multipartResponses = [];
  state.blockChallengeSeed = Date.now();
  state.challengeQuestionHistory = {};
  state.challengeRoundCache = {};
  state.timeLeft = questionSecondsFor(course);
  state.sessionAnswers = [];
  if (course.id === "2bach-ccss") {
    const preview = buildCcssIIBlockQuestions(block.id);
    const requestedCount = questionsPerChallengeFor(course);
    if (preview.length < requestedCount) {
      alert(`Solo existen ${preview.length} ejercicios PAU CCSS II revisados y no repetidos para este filtro. Se mostrarán únicamente esos ejercicios, sin rellenar con otros temas ni con Matemáticas II.`);
    }
  }
  renderStudy();
}

function renderDashboard() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const eso = isEsoCourse(course);
  const questionCount = questionsPerChallengeFor(course);
  const topics = course.themes
    .map((theme, index) => {
      const visualKey = topicVisualKey(theme);
      return `
      <article class="topic-card topic-visual-${escapeHtml(visualKey)}">
        <div>
          <h3>${index + 1}. ${escapeHtml(theme)}</h3>
        </div>
        <span class="topic-illustration" aria-hidden="true">
          <span class="topic-symbol topic-visual-${escapeHtml(visualKey)}"></span>
        </span>
        ${eso ? `
          <div class="topic-level-picker">
            <span class="topic-level-label">Elige el nivel del reto</span>
            <div class="topic-actions topic-level-actions">
              <button class="topic-level-btn level-apprentice" onclick="startTopic(${index}, 'apprentice')">
                <strong>Aprendiz</strong><small>Tu curso · progresivo</small>
              </button>
              <button class="topic-level-btn level-master" onclick="startTopic(${index}, 'master')">
                <strong>Maestro</strong><small>Reto de nivel superior</small>
              </button>
            </div>
          </div>
        ` : `
          <div class="topic-actions">
            <button class="secondary" onclick="startTopic(${index})">Estudiar y hacer reto</button>
          </div>
        `}
      </article>
    `;
    }).join("");

  renderShell(`
    <section class="student-dashboard">
      <section class="screen-panel">
        <div class="workspace-head">
          <div>
            <h1>${escapeHtml(courseDisplayLabel(course))}</h1>
            <div class="badge-row">
              <span class="badge">${course.themes.length} temas</span>
              <span class="badge">${questionCount} preguntas por reto</span>
              <span class="badge">Modo estudio</span>
            </div>
          </div>
          <div class="dashboard-exit">
            <div class="dashboard-student">${escapeHtml(state.student.name)}<span>${escapeHtml(state.academicYear)} · ${escapeHtml(state.student.groupLabel || state.student.group)}</span></div>
            ${eso ? `<button class="ghost" onclick="renderStudentGateway()">Inicio</button>` : ""}
            ${FIRST_BACH_COURSE_IDS.includes(course.id) ? `<button class="ghost" onclick="renderFirstBachGateway()">Inicio</button>` : ""}
            ${BACH_II_COURSE_IDS.includes(course.id) ? `<button class="ghost" onclick="renderBachIIHome()">Inicio</button>` : ""}
            <button class="ghost" onclick="publicLogout()">Salir</button>
          </div>
        </div>
        <div class="stat-row">
          <span class="stat">Medallas: ${medalCount()}</span>
          <span class="stat">Sesiones: ${readReports().length}</span>
          ${eso ? `<span class="stat">ESO: estudio + aventura</span>` : `<span class="stat">Bachillerato: estudio y retos</span>`}
        </div>
        <div class="topic-grid">${topics}</div>
      </section>
    </section>
  `);
}

function topicVisualKey(theme) {
  const lower = normalizeDisplayText(theme)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (lower.includes("matrice")) return "matrix";
  if (lower.includes("determinante")) return lower.includes("sistema") ? "cramer" : "sarrus";
  if (lower.includes("programacion lineal")) return "linear-programming";
  if (lower.includes("limite") || lower.includes("continuidad") || lower.includes("sucesiones")) return "limit";
  if (lower.includes("aplicacion de derivada")) return "optimization";
  if (lower.includes("derivada")) return "derivative";
  if (lower.includes("integral")) return lower.includes("definida") ? "definite-integral" : "integral";
  if (lower.includes("probabilidad")) return "probability";
  if (lower.includes("distribucion") || lower.includes("binomial") || lower.includes("normal")) return "distribution";
  if (lower.includes("muestreo") || lower.includes("inferencia")) return "inference";
  if (lower.includes("estadistica")) return "statistics";
  if (lower.includes("combinatoria")) return "combinatorics";
  if (lower.includes("complejo")) return "complex";
  if (lower.includes("real") || lower.includes("racional")) return "real";
  if (lower.includes("natural")) return "natural";
  if (lower.includes("divisibilidad")) return "divisibility";
  if (lower.includes("entero")) return "integer";
  if (lower.includes("fraccion")) return "fraction";
  if (lower.includes("decimal")) return "decimal";
  if (lower.includes("proporcional")) return "ratio";
  if (lower.includes("potencia") || lower.includes("radical") || lower.includes("raice") || lower.includes("logaritmo")) return "powers";
  if (lower.includes("inecuacion")) return "inequality";
  if (lower.includes("ecuacion") || lower.includes("sistema")) return "equation";
  if (lower.includes("polinomio") || lower.includes("algebra")) return "algebra";
  if (lower.includes("trigonometr")) return "trigonometry";
  if (lower.includes("geometria analitica") || lower.includes("vector")) return "vectors";
  if (lower.includes("planos") || lower.includes("rectas")) return "planes";
  if (lower.includes("metrica")) return "metrics";
  if (lower.includes("conica")) return "conics";
  if (lower.includes("medida")) return "angles";
  if (lower.includes("cuerpos geometricos")) return "solids";
  if (lower.includes("figuras planas")) return "polygon";
  if (lower.includes("geometria")) return "polygon";
  if (lower.includes("funcion")) return lower.includes("lineal") ? "linear-function" : "function";
  if (lower.includes("pitagoras")) return "pythagoras";
  if (lower.includes("poligono") || lower.includes("circunferencia") || lower.includes("geometria plana")) return "polygon";
  if (lower.includes("area") || lower.includes("volumen")) return "area-volume";
  if (lower.includes("rectas") || lower.includes("angulos")) return "angles";
  if (lower.includes("movimientos") || lower.includes("semejanza")) return "similarity";
  return "math";
}

function startTopic(index, challengeLevel = "apprentice") {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  state.topicIndex = index;
  state.topicChallengeLevel = isEsoCourse(course) && challengeLevel === "master" ? "master" : "apprentice";
  state.questionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.practiceRound = 0;
  state.challengeQuestionHistory = {};
  state.challengeRoundCache = {};
  state.answered = false;
  state.timeLeft = questionSecondsFor(course);
  state.sessionAnswers = [];
  renderStudy();
}

function repeatTopic() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  state.practiceRound += 1;
  state.questionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.answered = false;
  state.multipartResponses = [];
  state.timeLeft = questionSecondsFor(course);
  state.sessionAnswers = [];
  renderStudy();
}

function officialExerciseSource(question) {
  const explicitSource = String(question?.source || "").trim();
  if (explicitSource) return explicitSource;
  const firstLine = String(question?.text || "").split(/\r?\n/)[0].trim();
  return /\b(?:19|20)\d{2}\b/.test(firstLine)
    && /\b(?:junio|julio|septiembre|reserva\s*\d*)\b/i.test(firstLine)
    ? firstLine
    : "";
}

function hasOfficialConvocation(question) {
  const source = officialExerciseSource(question);
  const hasYear = /\b(?:19|20)\d{2}\b/.test(source);
  if ((question?.community === "madrid" || currentBachPauCommunity() === "madrid") && hasYear) return true;
  return hasYear
    && /\b(?:junio|julio|septiembre|reserva\s*\d*|modelo|ordinaria(?:-coincidente)?|extraordinaria(?:-coincidente)?)\b/i.test(source);
}

function officialConvocationLabel(question) {
  const source = officialExerciseSource(question);
  if (!source) return "";
  const year = source.match(/\b((?:19|20)\d{2})\b/)?.[1] || "";
  const session = source.match(/\b(junio|julio|septiembre|reserva\s*\d*|modelo|ordinaria(?:-coincidente)?|extraordinaria(?:-coincidente)?)\b/i)?.[1] || "";
  if (!year) return source;
  if (question?.community === "madrid" || currentBachPauCommunity() === "madrid") {
    const sessionLabel = session ? session.charAt(0).toUpperCase() + session.slice(1).toLowerCase() : "";
    return ["Problema", sessionLabel, year].filter(Boolean).join(" · ");
  }
  if (!session) return source;
  const sessionLabel = session.charAt(0).toUpperCase() + session.slice(1).toLowerCase();
  return `${sessionLabel} ${year}`;
}

function renderOfficialSourceCallout(question, courseId = state.courseId) {
  if (!BACH_II_COURSE_IDS.includes(courseId)) return "";
  const label = officialConvocationLabel(question);
  const sourceCourse = String(question?.sourceCourseLabel || "").trim();
  const origin = sourceCourse ? `${sourceCourse} · ` : "";
  if (!label) return "";
  return question?.community === "madrid" || currentBachPauCommunity() === "madrid"
    ? `<div class="official-source">${escapeHtml(label)}</div>`
    : `<div class="official-source">Enunciado original · ${escapeHtml(origin)}Convocatoria: ${escapeHtml(label)}</div>`;
}

function renderPauReferenceTable(question) {
  const table = String(question?.referenceTable || "").toLowerCase();
  if (table !== "binomial" && table !== "normal") return "";
  const page = table === "binomial" ? 1 : 2;
  const label = table === "binomial" ? "Tabla de la distribución binomial" : "Tabla de la distribución normal";
  const source = `documentos/PAU Comunidades/MADRID/Tablas de la distribución binomial y normal.pdf#page=${page}&view=FitH`;
  return `
    <details class="pau-reference-table">
      <summary>Consultar ${escapeHtml(label.toLowerCase())}</summary>
      <div class="pau-reference-table-frame">
        <object data="${encodeURI(source)}" type="application/pdf" aria-label="${escapeHtml(label)}">
          <a href="${encodeURI(source)}" target="_blank" rel="noopener">Abrir ${escapeHtml(label.toLowerCase())}</a>
        </object>
      </div>
    </details>
  `;
}

window.renderPauReferenceTable = renderPauReferenceTable;

function officialQuestionStatementHtml(question, courseId = state.courseId) {
  if (!BACH_II_COURSE_IDS.includes(courseId)) {
    const preserveTrigNotation = Boolean(officialExerciseSource(question));
    return question.statementHtml
      ? formatMathHtml(question.statementHtml, { preserveTrigNotation })
      : formatMathText(question.text, { preserveTrigNotation });
  }
  if (question.statementHtml) {
    const statement = String(question.statementHtml).replace(/^\s*<div class="official-source">[\s\S]*?<\/div>\s*/i, "");
    // Official matrix cells can contain typographic tags such as <i>. Those
    // tags split [[...]] across several text nodes, so the HTML renderer can
    // no longer see a complete matrix. Render the equivalent plain source in
    // those cases; the stored corpus and its mathematical meaning stay intact.
    if (statement.includes("[[") && question.text) {
      return formatMathText(question.text, { preserveTrigNotation: true });
    }
    return formatMathHtml(statement, { preserveTrigNotation: true });
  }
  const source = officialExerciseSource(question);
  const text = source && !question.source && String(question.text || "").split(/\r?\n/)[0].trim() === source
    ? String(question.text || "").split(/\r?\n/).slice(1).join("\n").trim()
    : question.text;
  return formatMathText(text, { preserveTrigNotation: true });
}

function renderStudy() {
  const course = courseById(state.courseId);
  const eso = isEsoCourse(course);
  const challengeLevel = topicChallengeLevelLabel();
  const backToTopicsAction = BACH_II_COURSE_IDS.includes(course.id) && state.blockKey
    ? "renderBachBlockSelector()"
    : "renderDashboard()";
  const activeBlock = state.blockKey
    ? (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === state.blockKey)
    : null;
  const theme = activeBlock?.label || course.themes[state.topicIndex];
  const isBachCourse = course.id.includes("bach");
  const infographicUrl = infographicViewerUrl(course, state.topicIndex);
  const questions = buildQuestions(theme, course);
  const question = questions[state.questionIndex];
  if (!question) {
    renderShell(`
      <section class="student-dashboard">
        <section class="screen-panel empty-topic-bank">
          <span class="topic-kicker">Banco del tema agotado o no disponible</span>
          <h1>${escapeHtml(theme)}</h1>
          <p>No existen ahora suficientes ejercicios válidos, no repetidos y correctamente clasificados para este tema.</p>
          <p>No se ha utilizado ningún ejercicio de otro tema para completar el reto.</p>
          <button class="primary" onclick="renderDashboard()">Volver a los temas</button>
        </section>
      </section>
    `);
    return;
  }
  markChallengeQuestionShown(question);
  const progress = Math.round((state.questionIndex / questions.length) * 100);
  const questionSeconds = questionSecondsFor(course);
  const minutesPerQuestion = Math.round(questionSeconds / 60);
  const resource = topicResource(course);
  const resourcePath = resource.path;
  const explanation = topicExplanation(theme, course);
  const bookExplanation = bookExplanationFor(course, state.topicIndex);
  const esoInfo = esoTopicInfo(course, state.topicIndex);
  const bookStatus = topicBookStatus(course, state.topicIndex);
  const resourcePreviewUrl = resource.type === "pdf" && !resource.error ? resourceUrl(resource, theme) : "";
  const challengeAvatar = getGameProgress().avatar || defaultGameProgress().avatar;
  const challengeStudentName = state.student?.name || "Alumno";
  const isOpenPauQuestion = question.type === "pau-open";
  const isPauWithoutOptions = isOpenPauQuestion && !question.options?.length;
  const isMultipartQuestion = Array.isArray(question.parts) && question.parts.length > 0;
  const officialSourceHtml = renderOfficialSourceCallout(question, course.id);
  const displayedStatementHtml = officialQuestionStatementHtml(question, course.id);
  const referenceTableHtml = renderPauReferenceTable(question);
  const answersHtml = isMultipartQuestion ? `
    <div class="multipart-exercise-options">
      ${question.parts.map((part, partIndex) => `
        <section class="exercise-part" id="exercise-part-${partIndex}">
          <div class="exercise-part-heading"><strong>${escapeHtml(part.label)}</strong><div class="exercise-part-prompt">${part.html ? formatMathHtml(part.html, { preserveTrigNotation: Boolean(officialExerciseSource(question)) }) : formatMathText(part.text, { preserveTrigNotation: Boolean(officialExerciseSource(question)) })}</div></div>
          ${handwritingAnswerHtml(question, {
            answerSource: part,
            partId: part.id || part.label || partIndex,
            mode: activeBlock ? "blockChallenge" : "topicChallenge",
            resultChannel: "challengePart",
            statementHtml: `${officialSourceHtml}<div class="question-text official-exercise-statement">${displayedStatementHtml}</div>${referenceTableHtml}<div class="exercise-part-heading"><strong>${escapeHtml(part.label)}</strong><div class="exercise-part-prompt">${part.html ? formatMathHtml(part.html, { preserveTrigNotation: Boolean(officialExerciseSource(question)) }) : formatMathText(part.text, { preserveTrigNotation: Boolean(officialExerciseSource(question)) })}</div></div>`
          })}
          <div class="answers compact-part-answers">
            ${part.options.map((option, optionIndex) => `
              <button class="answer-btn" id="part-${partIndex}-answer-${optionIndex}" onclick="answerMultipartPart(${partIndex},${optionIndex})"><span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-content">${formatMathText(option)}</span></button>
            `).join("")}
          </div>
          <div class="part-feedback" id="part-feedback-${partIndex}"></div>
        </section>
      `).join("")}
    </div>
    <button class="ghost" id="help-btn" style="display:none" onclick="showSolutionHelp()">Ver soluciones paso a paso</button>
    <button class="primary" id="next-btn" style="display:none" onclick="nextQuestion()">Siguiente ejercicio</button>
  ` : isPauWithoutOptions ? `
    <div class="pau-open-actions">
      <button class="secondary" id="help-btn" onclick="showSolutionHelp()">Ver resolución paso a paso</button>
      <button class="primary" id="next-btn" onclick="completeOpenPauQuestion()">Marcar como trabajado</button>
    </div>
  ` : `
    <div class="answers">
      ${question.options.map((option, index) => `
        <button class="answer-btn" id="answer-${index}" onclick="answerQuestion(${index})"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-content">${formatMathText(option)}</span></button>
      `).join("")}
    </div>
    <button class="ghost" id="help-btn" style="display:none" onclick="showSolutionHelp()">Ver ayuda paso a paso</button>
    <button class="primary" id="next-btn" style="display:none" onclick="nextQuestion()">Siguiente</button>
  `;
  const bookContentHtml = esoInfo ? `
    <div class="book-explanation book-explanation-inline">
      ${esoInfo.error ? `<div class="source-error">${escapeHtml(esoInfo.error)}</div>` : `
        <iframe class="pdf-preview" src="${resourcePreviewUrl}" title="Contenido del libro: ${escapeHtml(theme)}"></iframe>
      `}
    </div>
  ` : resourcePreviewUrl ? `
    <div class="book-explanation book-explanation-inline">
      <iframe class="pdf-preview" src="${resourcePreviewUrl}" title="Contenido del tema: ${escapeHtml(theme)}"></iframe>
    </div>
  ` : bookExplanation ? `
    <div class="book-explanation book-explanation-inline">
      ${formattedBookExplanation(bookExplanation)}
    </div>
  ` : `
    <div class="book-explanation book-explanation-inline">
      <p>Este curso está asociado a un libro PDF completo. Pulsa "Abrir documento original" para consultar el tema en el libro.</p>
      <p>${escapeHtml(bookStatus)}</p>
      <p>Recurso asociado: ${escapeHtml(resourcePath)}</p>
    </div>
  `;
  const explanationDetailHtml = infographicUrl ? `
    <div class="book-content-panel infographic-panel infographic-fullscreen-panel" style="display:grid">
      <div class="book-content-head">
        <strong>Infografía: ${escapeHtml(theme)}</strong>
        <div class="book-content-actions">
          <button class="primary compact-btn infographic-close-btn" onclick="closeLessonPanels()">Cerrar</button>
        </div>
      </div>
      <iframe class="pdf-preview infographic-fullscreen-frame" src="${infographicUrl}" title="Infografía del tema: ${escapeHtml(theme)}"></iframe>
    </div>
  ` : esoInfo ? `
    ${formattedEsoSummary(esoInfo)}
  ` : `
    ${bookExplanation ? `
      <div class="book-summary-lead">
        <strong>Resumen inicial del libro</strong>
        ${formattedBookSummary(bookExplanation)}
      </div>
    ` : ""}
    <strong>${escapeHtml(explanation.title)}</strong>
    <p>${escapeHtml(explanation.intro)}</p>
    <div class="lesson-slides">
      ${explanation.steps.map((slide, index) => `
        <article class="lesson-slide">
          <span>${index + 1}</span>
          <strong>${escapeHtml(slide.title)}</strong>
          <p>${escapeHtml(slide.body)}</p>
        </article>
      `).join("")}
    </div>
    <div class="worked-example">
      <strong>Antes del reto</strong>
      <p>${escapeHtml(explanation.check)}</p>
    </div>
    ${bookExplanation ? `
      <div class="book-explanation">
        <strong>Explicación del libro</strong>
        ${formattedBookExplanation(bookExplanation)}
      </div>
    ` : ""}
  `;

  renderShell(`
    <section class="app-grid ${activeBlock ? "block-challenge-layout" : "topic-challenge-layout"}">
      <aside class="screen-panel challenge-sidebar">
        <button class="ghost" onclick="${backToTopicsAction}">${activeBlock ? "Volver a bloques" : "Volver a temas"}</button>
        <section class="challenge-student-card" aria-label="Datos del alumno y del curso">
          <div class="challenge-student-top">
            <div class="challenge-course-summary">
              <small>Curso</small>
              <strong>${escapeHtml(courseDisplayName(course))}</strong>
            </div>
            <div class="challenge-student-identity">
              <div class="challenge-student-avatar">${renderAvatarFigure(challengeAvatar, false, "portrait")}</div>
              <strong>${escapeHtml(challengeStudentName)}</strong>
              <button class="challenge-edit-avatar" onclick="openAvatarCustomizerModal()">Editar avatar</button>
            </div>
          </div>
          <div class="challenge-score-row">
            <span><small>Puntuación</small><strong>${state.score}</strong></span>
            <span><small>Racha</small><strong>${state.streak}</strong></span>
            <span><small>Progreso</small><strong>${state.questionIndex + 1}/${questions.length}</strong></span>
          </div>
        </section>
        <div class="progress challenge-sidebar-progress" aria-label="Progreso del reto">
          <span style="width:${progress}%"></span>
        </div>
        ${activeBlock ? "" : `
          <div class="sidebar-actions">
            <button class="secondary" onclick="showTopicExplanation()">Leer explicación del tema</button>
            ${topicPodcastControlsHtml(course)}
          </div>
          <div class="resource-note" id="resource-note"></div>
        `}
      </aside>
      <section class="study-layout challenge-only challenge-workspace">
        ${activeBlock ? "" : `
          <div class="screen-panel explain-panel lesson-modal" id="lesson-modal">
            <h2>Tema elegido</h2>
            <div class="topic-summary-card">
              <span class="topic-kicker">${escapeHtml(courseDisplayName(course))}</span>
              <h3>${escapeHtml(theme)}</h3>
              <p>${escapeHtml(explanation.summary)}</p>
            </div>
            <div class="book-content-panel" id="book-content-panel">
              <div class="book-content-head">
                <strong>Contenido del libro</strong>
                <button class="ghost compact-btn" onclick="openTopicResource()">Abrir documento original</button>
              </div>
              ${bookContentHtml}
            </div>
            <div class="topic-explanation-detail" id="topic-explanation-detail" data-infographic="${infographicUrl ? "true" : "false"}">
              ${explanationDetailHtml}
            </div>
          </div>
        `}
        <div class="screen-panel game-panel">
          <div class="challenge-titlebar">
            <h2>
              <span>${activeBlock ? "Reto del bloque" : "Reto del tema"}</span>
              <span class="challenge-title-topic">· ${escapeHtml(theme)}</span>
              ${eso ? `<span class="challenge-title-level">· ${challengeLevel}</span>` : ""}
            </h2>
            <span class="stat timer-stat challenge-header-timer" id="timer">${formatTimer(questionSeconds)}</span>
          </div>
          <p class="challenge-intro">${questions.length} preguntas ${activeBlock ? "del bloque seleccionado" : "del tema seleccionado"}.${eso ? ` Nivel ${challengeLevel}: ${state.topicChallengeLevel === "master" ? "ejercicios avanzados, cercanos al curso siguiente" : "ejercicios del curso ordenados de menor a mayor dificultad"}.` : ""} Tienes ${minutesPerQuestion} minutos por pregunta y solución paso a paso si la necesitas.</p>
          <div class="question-box">
            <div class="question-meta">
              <span>Pregunta ${state.questionIndex + 1} de ${questions.length}</span>
            </div>
            ${officialSourceHtml}
            <div class="question-text ${isOpenPauQuestion ? "pau-open-statement" : ""} ${isMultipartQuestion ? "official-exercise-statement" : ""}">${displayedStatementHtml}</div>
            ${referenceTableHtml}
            ${!isPauWithoutOptions && !isMultipartQuestion ? handwritingAnswerHtml(question, {
              mode: activeBlock ? "blockChallenge" : "topicChallenge",
              resultChannel: "challenge",
              statementHtml: `${officialSourceHtml}<div class="question-text ${isOpenPauQuestion ? "pau-open-statement" : ""}">${displayedStatementHtml}</div>${referenceTableHtml}`
            }) : ""}
            ${answersHtml}
            <div class="solution-help" id="solution-help"></div>
            <div class="feedback" id="feedback"></div>
          </div>
        </div>
      </section>
    </section>
  `);
  applyStudyModeChrome();
  startQuestionTimer();
}

function applyStudyModeChrome() {
  const course = courseById(state.courseId);
  if (!course.id.includes("bach")) return;
  const explanationButton = document.querySelector('.sidebar-actions button[onclick="showTopicExplanation()"]');
  if (explanationButton) explanationButton.textContent = "Resumen del tema";
  document.querySelectorAll('.sidebar-actions button[onclick="speakSummary()"], .sidebar-actions button[onclick="stopSummarySpeech()"], .sidebar-actions button[onclick="showBookContent()"]').forEach((button) => {
    button.remove();
  });
  const bookPanel = document.getElementById("book-content-panel");
  if (bookPanel) bookPanel.remove();
}

function studyBullets(theme) {
  return [
    `Identifica que tipo de objeto matematico aparece en ${theme.toLowerCase()}.`,
    "Anota los datos, la pregunta y la condición que limita el problema.",
    "Haz un ejemplo pequeño antes de elegir una respuesta.",
    "Comprueba si la solución tiene sentido numérico y unidades cuando proceda."
  ];
}

function topicExplanation(theme, course) {
  const lower = theme.toLowerCase();
  const stage = course.id.includes("bach")
    ? "Bachillerato"
    : course.id.includes("4eso")
      ? "4º ESO"
      : course.id.includes("3eso")
        ? "3º ESO"
        : course.id.includes("2eso")
          ? "2º ESO"
          : "1º ESO";

  const make = (title, summary, intro, steps, check) => ({
    title,
    summary,
    intro: `${intro} Este resumen está ajustado al nivel de ${stage} y sirve para preparar el reto del tema.`,
    steps,
    check
  });

  if (lower.includes("matrices")) {
    return make(
      "Matrices: ordenar datos y operar con filas y columnas",
      "Una matriz organiza números en filas y columnas. Para el reto conviene dominar dimensiones, suma, producto por un número, producto de matrices y matriz inversa cuando exista.",
      "En Castilla-La Mancha, en Matemáticas de Bachillerato este bloque se usa para modelizar situaciones, resolver sistemas y trabajar con determinantes.",
      [
        { title: "Dimensiones", body: "Comprueba primero cuántas filas y columnas tiene cada matriz; eso decide si una suma o producto se puede hacer." },
        { title: "Operaciones", body: "En la suma se opera elemento a elemento. En el producto, cada elemento sale de combinar una fila con una columna." },
        { title: "Inversa", body: "Solo existe si la matriz es cuadrada y su determinante no es cero." },
        { title: "Aplicación", body: "Traduce el enunciado a una tabla o sistema antes de calcular." }
      ],
      "Antes de responder, revisa dimensiones y signos. Muchos errores vienen de multiplicar matrices como si fueran números normales."
    );
  }

  if (lower.includes("determinante") || lower.includes("sistemas con determinantes")) {
    return make(
      "Determinantes y sistemas: decidir si hay solución",
      "Los determinantes permiten estudiar matrices cuadradas y resolver sistemas lineales, especialmente con la regla de Cramer en sistemas compatibles determinados.",
      "Este contenido conecta álgebra, matrices y resolución de problemas con varias incógnitas.",
      [
        { title: "Calcula", body: "Empieza por el determinante principal. Si no es cero, el sistema suele tener solución única." },
        { title: "Interpreta", body: "Si el determinante es cero, hay que estudiar si el sistema no tiene solución o tiene infinitas." },
        { title: "Cramer", body: "Sustituye una columna por los términos independientes y divide por el determinante principal." },
        { title: "Comprueba", body: "Sustituye los valores en las ecuaciones originales." }
      ],
      "No apliques Cramer si el determinante principal vale cero; primero clasifica el sistema."
    );
  }

  if (lower.includes("integral")) {
    const definite = lower.includes("definida");
    return make(
      definite ? "Integrales definidas: área acumulada" : "Integrales indefinidas: encontrar primitivas",
      definite
        ? "Una integral definida calcula acumulación o área con signo entre dos valores. Hay que hallar una primitiva y aplicar la regla de Barrow."
        : "Una integral indefinida busca una función cuya derivada sea la función dada. Hay que reconocer reglas básicas y añadir la constante de integración.",
      "Las integrales se trabajan como herramienta de cálculo y como interpretación geométrica de áreas.",
      [
        { title: "Reconoce", body: "Mira si aparece potencia, suma de funciones, exponencial, trigonométrica sencilla o una regla inmediata." },
        { title: "Primitiva", body: "Aplica la regla adecuada y simplifica antes de sustituir límites si los hay." },
        { title: "Constante o límites", body: definite ? "En definida no se añade +C; se evalúa F(b)-F(a)." : "En indefinida se añade +C porque hay infinitas primitivas." },
        { title: "Sentido", body: "Si se pide área, separa intervalos cuando la función cambie de signo." }
      ],
      definite ? "Comprueba que has restado F(límite superior) menos F(límite inferior)." : "Comprueba derivando mentalmente tu respuesta: debe volver a aparecer el integrando."
    );
  }

  if (lower.includes("derivada") || lower.includes("aplicacion de derivadas")) {
    return make(
      "Derivadas: cambio, pendiente y optimización",
      "La derivada mide cómo cambia una función. En ejercicios sirve para calcular pendientes, estudiar crecimiento, localizar máximos y mínimos y resolver problemas de optimización.",
      "En Bachillerato se usa tanto para cálculo formal como para interpretar gráficas y situaciones reales.",
      [
        { title: "Deriva", body: "Aplica las reglas de potencias, suma, producto, cociente o cadena según aparezcan." },
        { title: "Estudia signo", body: "El signo de la derivada indica si la función crece o decrece." },
        { title: "Extremos", body: "Los candidatos a máximo o mínimo suelen salir de f'(x)=0 o de puntos donde no existe la derivada." },
        { title: "Interpreta", body: "Relaciona el resultado con la pregunta: pendiente, velocidad, beneficio, coste o forma de la gráfica." }
      ],
      "Después de derivar, revisa paréntesis y signos: un signo mal puesto cambia todo el estudio."
    );
  }

  if (lower.includes("limite") || lower.includes("continuidad") || lower.includes("sucesiones")) {
    return make(
      "Límites y continuidad: comportamiento cerca de un punto",
      "Un límite describe a qué valor se acerca una función o sucesión. La continuidad exige que el valor de la función coincida con el límite en el punto.",
      "Este bloque prepara el estudio de funciones, derivadas y gráficas.",
      [
        { title: "Sustituye", body: "Prueba primero sustitución directa. Si no hay indeterminación, ya tienes el límite." },
        { title: "L'Hôpital", body: "Si aparece 0/0 o ∞/∞, deriva por separado el numerador y el denominador. Repite la regla si continúa la misma indeterminación." },
        { title: "Número e", body: "Si aparece 1^∞, escribe la base como 1+u(x) y usa lim (1+u(x))^v(x)=e^[lim u(x)·v(x)]." },
        { title: "Laterales", body: "En funciones a trozos, compara límite por la izquierda y por la derecha." },
        { title: "Continuidad", body: "Comprueba existencia del límite, valor de la función y coincidencia entre ambos." }
      ],
      "En funciones a trozos mira siempre desde qué lado se llega al punto conflictivo."
    );
  }

  if (lower.includes("funcion")) {
    return make(
      "Funciones: relacionar variables y leer gráficas",
      "Una función asigna a cada valor de x un único valor de y. Para el reto hay que reconocer dominio, imagen, crecimiento, cortes, pendiente y tipo de gráfica.",
      "El trabajo con funciones es común en ESO y Bachillerato porque conecta tablas, fórmulas, gráficas y problemas.",
      [
        { title: "Identifica", body: "Distingue si te dan fórmula, tabla, gráfica o situación verbal." },
        { title: "Dominio", body: "Pregunta qué valores puede tomar x sin romper la expresión o el contexto." },
        { title: "Rasgos", body: "Busca cortes con ejes, crecimiento, decrecimiento, máximos, mínimos y simetrías si procede." },
        { title: "Calcula", body: "Para f(a), sustituye x por a y respeta el orden de operaciones." }
      ],
      "Si hay gráfica, no respondas solo con cálculo: mira qué información visual te está dando."
    );
  }

  if (lower.includes("programacion lineal")) {
    return make(
      "Programación lineal: optimizar con restricciones",
      "La programación lineal traduce un problema real a inecuaciones, dibuja una región factible y busca el máximo o mínimo de una función objetivo.",
      "En Bachillerato se trabaja con problemas de producción, beneficio, coste o recursos limitados.",
      [
        { title: "Variables", body: "Define qué representa cada incógnita y añade condiciones como x>=0, y>=0 si son cantidades reales." },
        { title: "Restricciones", body: "Convierte cada condición del enunciado en una inecuación lineal." },
        { title: "Región", body: "Dibuja las rectas frontera y conserva el semiplano que cumple cada restricción." },
        { title: "Óptimo", body: "Evalúa la función objetivo en los vértices de la región factible." }
      ],
      "Antes de responder, comprueba que el punto elegido cumple todas las restricciones, no solo una."
    );
  }

  if (lower.includes("combinatoria")) {
    return make(
      "Combinatoria: contar sin repetir trabajo",
      "La combinatoria estudia cuántas formas hay de ordenar o elegir elementos. La clave es decidir si importa el orden y si se permite repetir.",
      "En 1º de Bachillerato se usa como base para probabilidad y recuento de casos.",
      [
        { title: "Orden", body: "Si cambiar el orden cambia el resultado, usa permutaciones o variaciones." },
        { title: "Selección", body: "Si solo importa el grupo elegido, usa combinaciones." },
        { title: "Repetición", body: "Decide si un elemento puede aparecer más de una vez." },
        { title: "Factorial", body: "Recuerda que n! multiplica n por todos los enteros positivos anteriores." }
      ],
      "La pregunta más importante es: ¿AB y BA cuentan como lo mismo o como casos distintos?"
    );
  }

  if (lower.includes("complejo")) {
    return make(
      "Números complejos: operar con parte real e imaginaria",
      "Los números complejos amplían los reales usando la unidad imaginaria i, con i^2 = -1. En el reto trabajarás forma binómica a+bi, conjugado, módulo, operaciones y representación en el plano complejo.",
      "En 1º de Bachillerato se usan para resolver ecuaciones que no tienen solución real y para operar con cantidades que tienen dos componentes.",
      [
        { title: "Identifica", body: "Separa siempre parte real y parte imaginaria: en a+bi, a es la parte real y b la parte imaginaria." },
        { title: "Opera", body: "Suma y resta agrupando reales con reales e imaginarios con imaginarios. Para multiplicar, desarrolla y sustituye i^2 por -1." },
        { title: "Conjugado", body: "El conjugado de a+bi es a-bi. Sirve para dividir complejos y para calcular el módulo." },
        { title: "Módulo", body: "El módulo de a+bi es sqrt(a^2+b^2), que representa la distancia al origen en el plano complejo." }
      ],
      "Antes de marcar, comprueba si has cambiado i^2 por -1 y si el signo de la parte imaginaria es correcto."
    );
  }

  if (lower.includes("divisibilidad")) {
    return make(
      "Divisibilidad: múltiplos, divisores y números primos",
      "La divisibilidad permite saber si una división es exacta, encontrar múltiplos y divisores, descomponer en factores primos y calcular m.c.d. y m.c.m.",
      "En ESO es una base importante para fracciones, proporcionalidad y cálculo con números enteros.",
      [
        { title: "Criterios", body: "Usa reglas rápidas: por 2 si acaba en cifra par, por 3 si la suma de cifras es múltiplo de 3, por 5 si acaba en 0 o 5." },
        { title: "Primos", body: "Un número primo tiene exactamente dos divisores positivos: 1 y él mismo." },
        { title: "Descompón", body: "Factoriza en primos para calcular m.c.d. y m.c.m. con seguridad." },
        { title: "Interpreta", body: "m.c.d. sirve para repartir en grupos iguales; m.c.m. para coincidencias o ciclos." }
      ],
      "Comprueba siempre si te piden divisor, múltiplo, m.c.d. o m.c.m.; no son lo mismo."
    );
  }

  if (lower.includes("decimal")) {
    return make(
      "Números decimales: colocar la coma y estimar",
      "Los decimales representan partes de la unidad. Para operar bien hay que alinear comas en sumas y restas, y controlar cifras decimales en productos y divisiones.",
      "En ESO se usan en medidas, dinero, porcentajes y problemas de proporcionalidad.",
      [
        { title: "Posición", body: "Distingue décimas, centésimas y milésimas según la posición de la cifra." },
        { title: "Suma y resta", body: "Alinea las comas y completa con ceros si hace falta." },
        { title: "Multiplica", body: "Multiplica como enteros y coloca tantas cifras decimales como haya en total." },
        { title: "Divide", body: "Si el divisor tiene coma, multiplica ambos números por 10, 100, etc. para quitarla." }
      ],
      "Haz una estimación antes de marcar para detectar comas mal colocadas."
    );
  }

  if (lower.includes("trigonometr")) {
    return make(
      "Trigonometría: razones en triángulos y ángulos",
      "La trigonometría relaciona ángulos y lados. En ESO se centra en triángulos rectángulos; en Bachillerato se amplía con identidades, radianes y circunferencia goniométrica.",
      "Este bloque conecta geometría, funciones y resolución de problemas de medida.",
      [
        { title: "Razones", body: "Seno es opuesto/hipotenusa, coseno es contiguo/hipotenusa y tangente es opuesto/contiguo." },
        { title: "Cuadrante", body: "En Bachillerato revisa el signo de seno, coseno y tangente según el cuadrante." },
        { title: "Identidades", body: "La identidad fundamental es sen²(x)+cos²(x)=1." },
        { title: "Unidades", body: "Comprueba si el ángulo está en grados o radianes antes de calcular." }
      ],
      "Dibuja el triángulo o la circunferencia; evita aplicar una razón sin saber qué lado es cada uno."
    );
  }

  if (lower.includes("probabilidad") || lower.includes("estadistica") || lower.includes("distribucion") || lower.includes("muestreo") || lower.includes("inferencia") || lower.includes("normal") || lower.includes("binomial")) {
    return make(
      "Estadística y probabilidad: datos, azar e interpretación",
      "Este bloque trabaja recogida de datos, medidas, gráficos, probabilidad y distribuciones. La clave es distinguir qué se cuenta y cómo se interpreta el resultado.",
      "En Castilla-La Mancha aparece en ESO y Bachillerato con problemas contextualizados y lectura crítica de resultados.",
      [
        { title: "Datos", body: "Ordena la información: variable, frecuencias, total de datos y unidad de medida." },
        { title: "Medidas", body: "Para media suma y divide; para mediana ordena; para dispersión mira cuánto se separan los datos." },
        { title: "Probabilidad", body: "Cuenta casos favorables y casos posibles cuando todos son equiprobables." },
        { title: "Distribuciones", body: "En binomial revisa n, p y q; en normal identifica media, desviación típica y tipificación si hace falta." }
      ],
      "Expresa la respuesta como fracción, decimal o porcentaje según pida el enunciado, y revisa que una probabilidad esté entre 0 y 1."
    );
  }

  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion") || lower.includes("algebra") || lower.includes("polinomio")) {
    return make(
      "Álgebra: transformar sin perder equivalencia",
      "El álgebra permite resolver incógnitas, trabajar con expresiones, polinomios, ecuaciones, sistemas e inecuaciones. Lo importante es operar igual en ambos lados y controlar los signos.",
      "Este contenido aparece de forma progresiva desde ESO hasta Bachillerato, aumentando la dificultad de los métodos.",
      [
        { title: "Ordena", body: "Quita paréntesis, reduce términos semejantes y coloca incógnitas y números donde convenga." },
        { title: "Despeja", body: "Usa operaciones inversas para dejar la incógnita sola." },
        { title: "Sistemas", body: "Elige sustitución, igualación, reducción o matrices según el nivel y el enunciado." },
        { title: "Inecuaciones", body: "Si multiplicas o divides por un número negativo, cambia el sentido de la desigualdad." }
      ],
      "Sustituye la solución en el enunciado original; es la forma más rápida de detectar errores."
    );
  }

  if (lower.includes("trigonometr") || lower.includes("geometria") || lower.includes("vectores") || lower.includes("planos") || lower.includes("rectas") || lower.includes("poligonos") || lower.includes("circunferencia") || lower.includes("areas") || lower.includes("volumen") || lower.includes("pitagoras") || lower.includes("semejanza") || lower.includes("conicas") || lower.includes("metricas")) {
    return make(
      "Geometría: dibujar, medir y justificar",
      "La geometría estudia formas, posiciones, medidas y relaciones. Para resolver bien hay que hacer un dibujo, marcar datos y elegir el teorema o fórmula adecuada.",
      "En ESO se centra en figuras, áreas, volúmenes y semejanza; en Bachillerato se amplía con trigonometría, vectores, rectas y planos.",
      [
        { title: "Dibuja", body: "Haz un esquema y marca longitudes, ángulos, coordenadas o vectores." },
        { title: "Elige herramienta", body: "Puede ser Pitágoras, semejanza, razones trigonométricas, distancia, producto escalar o ecuaciones de rectas y planos." },
        { title: "Calcula", body: "Usa unidades correctas: longitud, área, volumen o grados/radianes según proceda." },
        { title: "Comprueba", body: "Mira si el resultado encaja con el dibujo y con el tamaño esperado." }
      ],
      "No empieces con fórmulas sueltas: el dibujo suele decir qué fórmula toca."
    );
  }

  if (lower.includes("numero") || lower.includes("natural") || lower.includes("entero") || lower.includes("decimal") || lower.includes("fraccion") || lower.includes("racional") || lower.includes("real") || lower.includes("complejo") || lower.includes("potencia") || lower.includes("raiz") || lower.includes("radical") || lower.includes("logaritmo") || lower.includes("divisibilidad") || lower.includes("proporcionalidad")) {
    return make(
      "Números y proporcionalidad: calcular con sentido",
      "Este bloque reúne tipos de números, operaciones, divisibilidad, fracciones, decimales, porcentajes, potencias, raíces y proporcionalidad.",
      "Es la base para casi todos los temas posteriores, por eso el reto mezcla cálculo, interpretación y comprobación.",
      [
        { title: "Clasifica", body: "Reconoce si trabajas con naturales, enteros, racionales, reales, complejos, potencias o porcentajes." },
        { title: "Orden de operaciones", body: "Resuelve paréntesis, potencias y raíces antes de multiplicar, dividir, sumar o restar." },
        { title: "Equivalencias", body: "Pasa entre fracción, decimal y porcentaje cuando facilite el ejercicio." },
        { title: "Proporción", body: "En problemas de proporcionalidad, localiza magnitudes y decide si crecen juntas o una crece cuando la otra baja." }
      ],
      "Haz una estimación rápida antes de marcar: si el resultado es absurdo, probablemente hay un error de operación."
    );
  }

  return make(
    "Plan de trabajo del tema",
    "Este tema se resuelve leyendo el enunciado, localizando los datos importantes, eligiendo el método adecuado y comprobando que la respuesta tiene sentido.",
    "La explicación resume lo necesario para afrontar el reto sin depender de memoria mecánica.",
    [
      { title: "Lee", body: "Identifica qué pide exactamente el enunciado." },
      { title: "Ordena", body: "Separa datos, incógnitas, unidades y condiciones." },
      { title: "Resuelve", body: "Aplica el método paso a paso, sin saltos grandes." },
      { title: "Comprueba", body: "Revisa que la solución responde a la pregunta." }
    ],
    "Si dudas entre dos respuestas, vuelve al enunciado: suele indicar qué dato o unidad falta."
  );
}

function presentationCards(theme) {
  const lower = theme.toLowerCase();
  if (lower.includes("potencia") || lower.includes("raices") || lower.includes("radical")) {
    return {
      title: "Potencias: mira la base y el exponente",
      subtitle: "La base se repite tantas veces como diga el exponente. El orden evita errores.",
      slides: [
        { title: "Base", body: "Es el número que se multiplica repetidamente." },
        { title: "Exponente", body: "Indica cuántas veces aparece la base como factor." },
        { title: "Prioridad", body: "Si hay paréntesis, se resuelven antes de operar la potencia." },
        { title: "Signos", body: "Una base negativa con exponente par termina en positivo." }
      ],
      example: "Para calcular (-2)^4 hacemos (-2) x (-2) x (-2) x (-2). Los signos se compensan y el resultado es 16."
    };
  }
  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) {
    return {
      title: "Ecuaciones: mantén el equilibrio",
      subtitle: "Lo que haces en un lado debe hacerse en el otro. El objetivo es dejar la x sola.",
      slides: [
        { title: "Ordena", body: "Primero quita paréntesis y reduce términos semejantes." },
        { title: "Separa", body: "Pasa las x a un lado y los números al otro." },
        { title: "Despeja", body: "Divide por el coeficiente de la x." },
        { title: "Comprueba", body: "Sustituye la solución para ver si la igualdad se cumple." }
      ],
      example: "En 2x + 5 = 17, restamos 5 y queda 2x = 12. Dividimos entre 2 y obtenemos x = 6."
    };
  }
  if (lower.includes("fraccion") || lower.includes("racional")) {
    return {
      title: "Fracciones: busca un denominador común",
      subtitle: "Antes de sumar o restar, las partes deben tener el mismo tamaño.",
      slides: [
        { title: "Mismo tamaño", body: "Para sumar o restar fracciones, usa denominador común." },
        { title: "Equivalentes", body: "Cambia la forma de la fracción sin cambiar su valor." },
        { title: "Opera", body: "Suma o resta numeradores y conserva el denominador." },
        { title: "Simplifica", body: "Divide numerador y denominador por el mismo número si se puede." }
      ],
      example: "Para 1/2 + 1/4, convertimos 1/2 en 2/4. Entonces 2/4 + 1/4 = 3/4."
    };
  }
  if (lower.includes("probabilidad") || lower.includes("estadistica")) {
    return {
      title: "Datos: cuenta casos y compara",
      subtitle: "En estadística y probabilidad conviene ordenar la información antes de calcular.",
      slides: [
        { title: "Pregunta", body: "Distingue si te piden media, porcentaje, probabilidad o interpretación." },
        { title: "Cuenta", body: "En probabilidad, separa casos favorables y casos posibles." },
        { title: "Calcula", body: "En medias, suma los datos y divide entre cuántos datos hay." },
        { title: "Formato", body: "Decide si la respuesta debe ir como fracción, decimal o porcentaje." }
      ],
      example: "Si hay 2 bolas azules de 5 bolas totales, la probabilidad de azul es 2/5."
    };
  }
  return {
    title: "Plan de ataque matemático",
    subtitle: "Leer, ordenar, operar y comprobar. Ese ritmo funciona en casi todos los ejercicios.",
    slides: [
      { title: "Lee", body: `Identifica qué se pide en ${theme.toLowerCase()}.` },
      { title: "Ordena", body: "Anota datos, incógnitas y condiciones." },
      { title: "Opera", body: "Haz los cálculos paso a paso, sin saltos grandes." },
      { title: "Comprueba", body: "Revisa si el resultado tiene sentido." }
    ],
    example: "Si el ejercicio combina operaciones, resuelve primero paréntesis, después potencias, luego multiplicaciones y divisiones, y finalmente sumas y restas."
  };
}

function questionHasCoherentOptions(question) {
  if (!question.options?.length) {
    return Array.isArray(question.parts)
      && question.parts.length > 0
      && question.parts.every((part) => questionHasCoherentOptions(part));
  }

  const text = normalizeMathNotation(question.text).replace(/\s+/g, " ").trim();
  const options = question.options.map((option) => normalizeMathNotation(option).replace(/\s+/g, " ").trim());
  const distinctOptions = new Set(options);
  const genericResponse = /planteamiento correcto|elegir el dato mayor|sustituir directamente|operaci[oó]n parcial|resolver paso a paso con las condiciones/i;

  if (options.length !== 4 || distinctOptions.size !== 4) return false;
  if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= options.length) return false;
  if (options.some((option) => !option || genericResponse.test(option))) return false;
  if (solutionIsInstructionOnly(question.solution)) return false;

  const sameBasePower = !/[√]/.test(text) && /simplifica/i.test(text)
    && (/([A-Za-z0-9]+)\^[-\d()]+\s*[·x×:*÷/]\s*\1\^/i.test(text)
      || /\([^)]*\^[-\d()]+\)\^[-\d()]+/.test(text));
  if (sameBasePower) {
    const base = (text.match(/([A-Za-z0-9]+)\^/) || [])[1];
    if (base && options.some((option) => !new RegExp(`(?:^|[^A-Za-z0-9])${base}\\^`).test(option))) return false;
  }

  if (/resolver el sistema de ecuaciones matriciales/i.test(text)) {
    if (options.some((option) => !/\bX\s*=/.test(option) || !/\bY\s*=/.test(option) || !/\[\[/.test(option))) return false;
  }

  return true;
}

function solutionIsInstructionOnly(solution) {
  const text = normalizeDisplayText(solution || "").trim();
  if (!text) return true;
  return /^soluci[oó]n guiada:/i.test(text)
    && !/resultado final|respuesta correcta|conclusi[oó]n/i.test(text);
}

function stableExerciseHash(value) {
  let hash = 2166136261;
  String(value || "").split("").forEach((character) => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(36);
}

function exerciseVisibleText(question) {
  return normalizeDisplayText([
    question?.text || "",
    question?.statementHtml || "",
    ...(question?.parts || []).map((part) => `${part?.label || ""} ${part?.text || part?.html || ""}`)
  ].join(" "))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function exerciseStructureText(question) {
  return exerciseVisibleText(question)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-?\d+(?:[.,]\d+)?/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

function topicMetadata(course, topicIndex) {
  const safeIndex = Number.isInteger(topicIndex) ? topicIndex : -1;
  return {
    courseId: course?.id || "",
    topicId: safeIndex >= 0 ? semanticTopicId(course, safeIndex) : "",
    topicIndex: safeIndex,
    topicName: safeIndex >= 0 ? course?.themes?.[safeIndex] || "" : ""
  };
}

function decorateExerciseForTopic(question, course, topicIndex, sourceType = "bank", historyScopeKey = "") {
  if (!question || !course || !Number.isInteger(topicIndex) || !course.themes?.[topicIndex]) return null;
  const metadata = topicMetadata(course, topicIndex);
  const visibleText = exerciseVisibleText(question);
  if (!visibleText) return null;
  const originalIdentity = question.exerciseId || question.rawBaseId || question.id || "";
  const exerciseId = String(originalIdentity || `${metadata.topicId}:exercise-${stableExerciseHash(visibleText)}`);
  const official = BACH_II_COURSE_IDS.includes(course.id) || /^pau|official/i.test(String(sourceType));
  const templateBasis = official
    ? exerciseId
    : exerciseStructureText(question) || visibleText;
  const templateId = String(question.templateId || `${metadata.topicId}:template-${stableExerciseHash(templateBasis)}`);
  return {
    ...question,
    ...metadata,
    exerciseId,
    templateId,
    sourceType: question.sourceType || sourceType,
    _historyScopeKey: historyScopeKey || question._historyScopeKey || sharedTopicHistoryScope(course, topicIndex),
    _historyIdentity: question._historyIdentity || `exercise:${exerciseId}`
  };
}

function exerciseMatchesTopic(question, courseId, topicIndex) {
  const course = courseById(courseId);
  return Boolean(question
    && question.courseId === courseId
    && question.topicId === semanticTopicId(course, topicIndex)
    && question.topicIndex === topicIndex);
}

function exerciseContentMatchesTopic(question, courseId, topicIndex) {
  const course = courseById(courseId);
  const expectedTopicId = semanticTopicId(course, topicIndex);
  const declaredCourseId = question?.courseId || question?.course || "";
  const declaredTopicIndex = Number.isInteger(question?.topicIndex) ? question.topicIndex : null;
  const declaredTopicId = question?.topicId || question?.declaredTopicId || "";
  if (declaredCourseId && declaredCourseId !== courseId) return false;
  if (declaredTopicIndex !== null && declaredTopicIndex !== topicIndex) return false;
  if (declaredTopicId && ![expectedTopicId, `${courseId}:topic-${topicIndex}`].includes(declaredTopicId)) return false;

  const rawId = String(question?.rawBaseId || question?.exerciseId || question?.id || "");
  const idCourse = rawId.match(/^(1eso|2eso|3eso|4eso-a|4eso-b)-/)?.[1];
  if (idCourse && idCourse !== courseId) return false;

  const statement = `${question?.text || ""} ${question?.statementHtml || ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/<[^>]+>/g, " ")
    .toLowerCase();
  if (!statement.trim()) return false;

  if (isEsoCourse(course)) {
    const topicSlug = expectedTopicId.split(":").slice(1).join(":");
    const asksStandaloneAlgebra = /\bresuelve\b[^.]{0,100}\b(?:el\s+)?(?:sistema|ecuacion)\b/.test(statement);
    const hasGeometryContext = /triang|recta|angulo|polig|circunfer|area|perimetr|volumen|prisma|piramide|cono|cilindro|esfera|semejan|pitagor|vector|punto|coordenad/.test(statement);
    const geometryTopic = /figuras|geometric|semejanza|trigonometria|areas|geometria-analitica/.test(topicSlug);
    if (geometryTopic && asksStandaloneAlgebra && !hasGeometryContext) return false;
    if (courseId === "4eso-a" && topicIndex === 4 && /plantea[^.]{0,80}\bsistema\b|\bdos\s+incognitas\b/.test(statement)) return false;
    if (topicSlug === "estadistica" && /bayes|laplace|espacio muestral|suceso/.test(statement)) return false;
    if (topicSlug === "probabilidad" && /media aritmetica|mediana|moda|desviacion tipica|tabla de frecuencias/.test(statement)) return false;
    if (/limite-funciones/.test(topicSlug) && /limite de (?:la )?sucesion|a_n|aₙ/.test(statement)) return false;
    if (/limite-sucesiones/.test(topicSlug) && /limite de (?:la )?funcion|f\s*\(\s*x\s*\)/.test(statement)) return false;
    if (courseId === "2eso" && topicIndex === 8) {
      const exceedsSecondEsoFunctions = /funcion inversa|composicion de funciones|f\s*[o∘]\s*g|g\s*[o∘]\s*f|\bderivad|dominio[^.]{0,100}(?:raiz|sqrt|√)/.test(statement);
      if (exceedsSecondEsoFunctions) return false;
    }
  }

  if (courseId !== "1bach-ccss") return true;
  if (topicIndex === 0) {
    return !/\bbinomial\b|x\s*~?\s*b\s*\(|distribucion normal|normal tipica|x\s*~?\s*n\s*\(|tipific|intervalo de confianza|estimacion|error tipico/.test(statement);
  }
  if (topicIndex === 2) {
    return !/distribucion normal|normal tipica|x\s*~?\s*n\s*\(|tipific|intervalo de confianza|estimacion|error tipico/.test(statement);
  }
  if (topicIndex === 3) {
    return !/\bbinomial\b|x\s*~?\s*b\s*\(|intervalo de confianza|estimacion|error tipico/.test(statement);
  }
  if (topicIndex === 7) {
    return /inecuaci|[<>≤≥]/.test(statement);
  }
  return true;
}

function stableTopicHistoryId(course, topicIndex) {
  if (isEsoCourse(course)) return semanticTopicId(course, topicIndex).split(":").slice(1).join(":");
  if (course?.id === "1bach-ccss") {
    if (topicIndex === 9) return "derivadas";
    if (topicIndex === 10) return "aplicacion-derivadas";
    // Combinatoria era el tema 9 (índice 9). Conservamos su clave histórica
    // aunque visualmente pase a ser el tema 12.
    if (topicIndex === 11) return "9";
  }
  return String(topicIndex);
}

function sharedTopicHistoryScope(course, topicIndex) {
  return `${course.id}|topic-${stableTopicHistoryId(course, topicIndex)}|todos-los-modos`;
}

function topicHistoryScope(course, topicIndex, mode = "topicPractice", detail = "") {
  const normalizedMode = ["topicPractice", "adventure", "coach", "exam", "boss"].includes(mode) ? mode : "topicPractice";
  const suffix = detail ? `|${detail}` : "";
  return `${course.id}|topic-${stableTopicHistoryId(course, topicIndex)}|modo-${normalizedMode}${suffix}`;
}

function currentExerciseHistoryMode() {
  return ["adventure", "coach", "exam", "boss"].includes(state.exerciseSelectionContext)
    ? state.exerciseSelectionContext
    : "topicPractice";
}

function strictTopicSelection({ course, topicIndex, questions, count, sourceType = "bank", scopeKey = "", historyMode = "", historyDetail = "", roundToken = state.practiceRound }) {
  if (!course || !Number.isInteger(topicIndex) || !course.themes?.[topicIndex] || count <= 0) return [];
  const scope = scopeKey || topicHistoryScope(course, topicIndex, historyMode || currentExerciseHistoryMode(), historyDetail);
  const decorated = (questions || [])
    .filter((question) => exerciseContentMatchesTopic(question, course.id, topicIndex))
    .map((question) => decorateExerciseForTopic(question, course, topicIndex, sourceType, scope))
    .filter((question) => exerciseMatchesTopic(question, course.id, topicIndex))
    .filter((question) => question?.type === "pau-open" || questionHasCoherentOptions(question));
  return selectNoRepeatQuestionRound(
    decorated,
    count,
    scope,
    roundToken
  );
}

function availableTopicQuestions({ course, topicIndex, questions, sourceType = "bank", scopeKey = "", historyMode = "coach", historyDetail = "" }) {
  if (!course || !Number.isInteger(topicIndex) || !course.themes?.[topicIndex]) return [];
  const scope = scopeKey || topicHistoryScope(course, topicIndex, historyMode, historyDetail);
  const unique = [];
  const identities = new Set();
  (questions || [])
    .filter((question) => exerciseContentMatchesTopic(question, course.id, topicIndex))
    .map((question) => decorateExerciseForTopic(question, course, topicIndex, sourceType, scope))
    .filter((question) => exerciseMatchesTopic(question, course.id, topicIndex))
    .filter(questionHasCoherentOptions)
    .forEach((question) => {
      const identity = challengeHistoryIdentity(question);
      if (!identity || identities.has(identity)) return;
      identities.add(identity);
      unique.push(question);
    });
  const history = new Set([
    ...(state.challengeQuestionHistory?.[scope] || []),
    ...readChallengeAnswerHistory(scope)
  ]);
  const available = unique.filter((question) => !history.has(challengeHistoryIdentity(question)));
  if (available.length) return available;
  if (!unique.length) return [];
  const lastIdentity = [...history].at(-1);
  const nextCycle = unique.filter((question) => challengeHistoryIdentity(question) !== lastIdentity);
  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  state.challengeQuestionHistory[scope] = lastIdentity ? [lastIdentity] : [];
  writeChallengeAnswerHistory(scope, state.challengeQuestionHistory[scope]);
  return nextCycle.length ? nextCycle : unique;
}

function distributeBalancedTopicQuestions(poolsByTopic, selectedTopicIndexes, count) {
  const selected = [...new Set(selectedTopicIndexes || [])].filter(Number.isInteger);
  if (!selected.length || count <= 0) return [];
  const queues = new Map(selected.map((topicIndex) => [topicIndex, [...(poolsByTopic.get(topicIndex) || [])]]));
  const used = new Map(selected.map((topicIndex) => [topicIndex, 0]));
  const result = [];
  while (result.length < count) {
    const availableTopics = selected.filter((topicIndex) => queues.get(topicIndex)?.length);
    if (!availableTopics.length) break;
    availableTopics.sort((left, right) => (used.get(left) || 0) - (used.get(right) || 0));
    const topicIndex = availableTopics[0];
    const question = queues.get(topicIndex).shift();
    if (!exerciseMatchesTopic(question, question.courseId, topicIndex)) continue;
    result.push(question);
    used.set(topicIndex, (used.get(topicIndex) || 0) + 1);
  }
  return result;
}

window.MargaritaExerciseSelector = {
  decorateExerciseForTopic,
  exerciseMatchesTopic,
  exerciseContentMatchesTopic,
  strictTopicSelection,
  availableTopicQuestions,
  distributeBalancedTopicQuestions,
  sharedTopicHistoryScope,
  topicHistoryScope,
  semanticTopicId,
  markShown: markChallengeQuestionShown
};

function buildAdventureTrainingQuestions(theme, course, difficulty, roundSeed, requestedCount = questionsPerChallengeFor(course)) {
  if (!ESO_COURSE_IDS.includes(course.id)) {
    return buildQuestions(theme, course, requestedCount);
  }

  const lower = normalizeMathNotation(theme).toLowerCase();
  const count = requestedCount;
  const verifiedExamPool = difficulty === "hard"
    ? (window.MargaritaEsoExamVerified?.build?.(course.id, theme) || [])
    : [];
  const originalPracticePool = window.MargaritaEsoOriginalPractice?.build?.(
    course.id,
    theme,
    difficulty === "hard" ? "master" : "apprentice"
  )?.filter((question) => question.adventureEligible !== false) || [];
  const approvedABAdventurePool = window.MargaritaEso3ApprovedABPractice?.buildAdventure?.(
    course.id,
    theme,
    difficulty === "hard" ? "master" : "apprentice"
  ) || [];
  const generatedPool = Array.from({ length: Math.max(160, count * 20) }, (_, index) => {
    const seed = state.topicIndex * 100003 + parseInt(stableExerciseHash(`${course.id}|${difficulty}`), 36) + index * 101;
    const progression = index % 10;
    return generatedEsoDifficultyQuestion(lower, course.id, difficulty, seed, progression, progression);
  });
  const questions = strictTopicSelection({
    course,
    topicIndex: state.topicIndex,
    questions: [...verifiedExamPool, ...originalPracticePool, ...approvedABAdventurePool, ...generatedPool]
      .filter((question) => !isForbiddenIntroLimitQuestion(question, course.id, lower)),
    count,
    sourceType: verifiedExamPool.length ? "verified-and-generated" : "generated",
    historyMode: "adventure",
    historyDetail: difficulty,
    roundToken: `${state.practiceRound}|aventura-${roundSeed}`
  });
  return questions.map((question, index) => {
    const amount = (roundSeed + state.topicIndex + index) % question.options.length;
    return {
      ...question,
      difficulty,
      options: rotate(question.options, amount),
      correct: (question.correct - amount + question.options.length) % question.options.length
    };
  });
}

function topicChallengeLevelLabel(level = state.topicChallengeLevel) {
  return level === "master" ? "Maestro" : "Aprendiz";
}

function buildEsoTopicLevelQuestions(theme, course, requestedCount = questionsPerChallengeFor(course)) {
  const selectionMode = currentExerciseHistoryMode();
  const isExam = selectionMode === "exam";
  const level = isExam ? "exam" : (state.topicChallengeLevel === "master" ? "master" : "apprentice");
  const count = requestedCount;
  const lower = normalizeMathNotation(theme).toLowerCase();
  const rawVerifiedExamPool = level === "master" || isExam
    ? (window.MargaritaEsoExamVerified?.build?.(course.id, theme) || [])
    : [];
  const approvedABExamPool = isExam
    ? (window.MargaritaEso3ApprovedABPractice?.buildExam?.(course.id, theme) || [])
    : [];
  const isThirdEsoSolidsPractice = !isExam
    && course.id === "3eso"
    && (lower.includes("cuerpo") || lower.includes("geometrico"));
  const verifiedExamPool = isExam
    ? rawVerifiedExamPool
    : rawVerifiedExamPool.filter((question) => question.practiceEligible !== false);
  const originalPracticePool = isExam
    ? []
    : (window.MargaritaEsoOriginalPractice?.build?.(course.id, theme, level) || [])
      .filter((question) => question.practiceEligible !== false);
  // Banco A+B aprobado en 3.º ESO. En la práctica temática se respeta el
  // nivel elegido; Aventura y Examen lo consumen mediante rutas separadas.
  const approvedABPracticePool = isExam
    ? []
    : (window.MargaritaEso3ApprovedABPractice?.buildChallenge?.(course.id, theme, level) || []);
  const roundSeed = state.topicIndex * 137 + (isExam ? 9001 : level === "master" ? 5003 : 101);
  const generatedPool = Array.from({ length: Math.max(240, count * 24) }, (_, index) => {
    const difficulty = isExam
      ? (index % 3 === 0 ? "medium" : "hard")
      : level === "master" ? (index % 3 === 0 ? "medium" : "hard") : (index % 3 === 0 ? "medium" : "easy");
    const progression = isExam || level === "master" ? 4 + (index % 6) : index % 10;
    return generatedEsoDifficultyQuestion(lower, course.id, difficulty, roundSeed + index * 7919, progression, progression);
  }).filter((question) => !isThirdEsoSolidsPractice || question.geometryDomain === "solid");
  return strictTopicSelection({
    course,
    topicIndex: state.topicIndex,
    questions: [...verifiedExamPool, ...approvedABExamPool, ...originalPracticePool, ...approvedABPracticePool, ...generatedPool]
      .filter((question) => !isForbiddenIntroLimitQuestion(question, course.id, lower)),
    count,
    sourceType: verifiedExamPool.length ? "verified-and-generated" : "generated",
    historyMode: selectionMode,
    historyDetail: isExam ? "independiente" : level
  }).map((question) => ({ ...question, challengeLevel: level }));
}

function generatedQuestion(text, correct, distractors, solution) {
  const correctText = String(correct);
  const options = [correctText, ...distractors.map(String)];
  const unique = [...new Set(options)];
  let fallback = 1;
  while (unique.length < 4) {
    const numericCorrect = Number(correctText.replace(",", "."));
    const candidate = Number.isFinite(numericCorrect)
      ? decimalAnswer(numericCorrect + fallback)
      : `${correctText} ${fallback % 2 ? "+" : "-"} ${Math.ceil(fallback / 2)}`;
    if (!unique.includes(candidate)) unique.push(candidate);
    fallback += 1;
  }
  return { text, options: unique.slice(0, 4), correct: 0, solution };
}

function isForbiddenIntroLimitQuestion(question, courseId, normalizedTheme = "") {
  if (courseId !== "4eso-b" && courseId !== "1bach-mates") return false;
  if (!String(normalizedTheme).includes("limite")) return false;
  const content = normalizeMathNotation(`${question?.text || ""} ${question?.solution || ""}`).toLowerCase();
  const sineRatio = /sen\s*\(?\s*(?:\d+\s*)?x\s*\)?\s*\/\s*(?:\d+\s*)?x/.test(content);
  const lhopital = content.includes("l'hopital") || content.includes("lhopital");
  return sineRatio || lhopital;
}

function greatestCommonDivisor(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

function reducedFraction(numerator, denominator) {
  const sign = denominator < 0 ? -1 : 1;
  const divisor = greatestCommonDivisor(numerator, denominator);
  const top = (sign * numerator) / divisor;
  const bottom = Math.abs(denominator) / divisor;
  return bottom === 1 ? String(top) : `${top}/${bottom}`;
}

function decimalAnswer(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
}

function generatedEsoDifficultyQuestion(lower, courseId, difficulty, seed, progressionIndex = seed, sequenceIndex = progressionIndex) {
  if (courseId === "1eso" && (lower.includes("expresion") || lower.includes("algebra"))) {
    return generatedFirstEsoAlgebraQuestion(difficulty, seed, progressionIndex);
  }
  if (courseId === "2eso" && (lower.includes("expresion") || lower.includes("algebra") || lower.includes("polinomio"))) {
    return generatedSecondEsoPolynomialQuestion(difficulty, seed, progressionIndex);
  }
  if (courseId === "2eso" && lower.includes("ecuacion")) {
    return generatedSecondEsoEquationQuestion(difficulty, seed, progressionIndex);
  }
  if (courseId === "2eso" && lower.includes("funcion")) {
    return generatedSecondEsoFunctionQuestion(difficulty, seed, progressionIndex);
  }
  if (courseId === "3eso" && (lower.includes("ecuacion") || lower.includes("sistema"))) {
    const ownTopic = progressionIndex % 2 === 0 ? "ecuacion" : "sistema";
    return generatedEquationLevelQuestion(ownTopic, difficulty, seed);
  }
  if (courseId === "3eso" && lower.includes("funcion")) {
    // La rama avanzada del generador común incluye composición, inversa y
    // dominios radicales. En 3.º ESO se mantienen funciones lineales/afines;
    // las parábolas y la interpretación cualitativa proceden del banco propio.
    return generatedFunctionLevelQuestion("easy", seed);
  }
  if (courseId === "3eso" && lower.includes("sucesion")) {
    return generatedThirdEsoSequenceQuestion(difficulty, seed, progressionIndex);
  }
  if (courseId === "3eso" && (lower.includes("cuerpo") || lower.includes("geometrico"))) {
    return generatedThirdEsoGeometryQuestion(difficulty, seed, sequenceIndex);
  }
  if (lower.includes("potencia")) {
    return generatedPowerLevelQuestion(lower, difficulty, seed, progressionIndex);
  }
  if (lower.includes("numero") || lower.includes("natural") || lower.includes("entero") || lower.includes("decimal") || lower.includes("racional") || lower.includes("real")) {
    return generatedNumberLevelQuestion(lower, courseId, difficulty, seed, progressionIndex);
  }
  if (lower.includes("fraccion")) {
    return generatedFractionLevelQuestion(courseId, difficulty, seed, progressionIndex);
  }
  if (lower.includes("cuerpo") || lower.includes("figura") || lower.includes("medida") || lower.includes("angulo") || lower.includes("recta") || lower.includes("circunferencia") || lower.includes("semejanza") || lower.includes("pitagoras") || lower.includes("area")) {
    return generatedGeometryLevelQuestion(lower, difficulty, seed, sequenceIndex, courseId);
  }
  // Estos temas necesitan conservar su propia variedad también en dificultad
  // media; si pasan por el generador genérico se repiten demasiados modelos.
  if (lower.includes("combinatoria")) {
    const supplied = window.MargaritaCombinatoricsSupplied?.pick?.(courseId, lower, difficulty, seed);
    // Alternamos los enunciados aportados por la usuaria con los modelos
    // generativos para conservar la progresión y ampliar el ciclo completo.
    if (supplied && Math.abs(seed) % 2 === 0) return supplied;
    return generatedCombinatoricsLevelQuestion(difficulty, seed);
  }
  if (lower.includes("estadistica")) return generatedStatisticsLevelQuestion(difficulty, seed);
  if (lower.includes("probabilidad")) return generatedProbabilityLevelQuestion(difficulty, seed);
  if (lower.includes("raiz") || lower.includes("radical") || lower.includes("logaritmo")) {
    return generatedPowerLevelQuestion(lower, difficulty, seed, progressionIndex);
  }
  // Los generadores especializados se usan también en dificultad media. De
  // este modo el mazo conserva todas sus estructuras y no queda reducido a
  // unas pocas plantillas genéricas al repetir un reto.
  if (lower.includes("derivada")) return generatedDerivativeLevelQuestion(difficulty, seed);
  if (lower.includes("limite")) return generatedLimitLevelQuestion(lower, difficulty, seed);
  if (lower.includes("sucesion")) return generatedSequenceLevelQuestion(difficulty, seed);
  if (lower.includes("trigonometr")) return generatedTrigonometryLevelQuestion(difficulty, seed);
  if (lower.includes("geometria analitica")) return generatedAnalyticGeometryLevelQuestion(difficulty, seed);
  if (courseId === "4eso-a" && lower.includes("funcion")) {
    return generatedFourthEsoAFunctionQuestion(difficulty, seed);
  }
  if (lower.includes("funcion")) return generatedFunctionLevelQuestion(difficulty, seed);
  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) return generatedEquationLevelQuestion(lower, difficulty, seed);
  if (lower.includes("expresion") || lower.includes("algebra")) return generatedAlgebraLevelQuestion(difficulty, seed);
  if (lower.includes("proporcional")) return generatedProportionLevelQuestion(difficulty, seed);
  if (difficulty === "medium") return generatedEsoMediumQuestion(lower, courseId, seed);
  if (lower.includes("fraccion")) return generatedFractionLevelQuestion(courseId, difficulty, seed, progressionIndex);
  if (lower.includes("potencia") || lower.includes("raiz") || lower.includes("radical") || lower.includes("logaritmo")) {
    return generatedPowerLevelQuestion(lower, difficulty, seed, progressionIndex);
  }
  return generatedNumberLevelQuestion(lower, courseId, difficulty, seed, progressionIndex);
}

function generatedEsoMediumQuestion(lower, courseId, seed) {
  const a = 2 + (seed % 7);
  const b = 3 + ((seed * 3) % 8);
  const c = 2 + ((seed * 5) % 6);
  const operation = seed % 4;

  if (lower.includes("derivada")) {
    return generatedQuestion(
      `Deriva: f(x)=${a}x^2+${b}x-${c}`,
      `${2 * a}x + ${b}`,
      [`${a}x + ${b}`, `${2 * a}x - ${c}`, `${2 * a}x^2 + ${b}`],
      `Resolución:\n1. Derivamos término a término.\n2. (${a}x²)'=${2 * a}x, (${b}x)'=${b} y la derivada de -${c} es 0.\nResultado final: f'(x)=${2 * a}x+${b}.`
    );
  }

  if (lower.includes("limite")) {
    if (lower.includes("sucesion")) {
      return generatedQuestion(
        `Calcula: lim n→∞ (${a}n+${c})/(${b}n-1)`,
        `${a}/${b}`,
        [`${b}/${a}`, "0", "∞"],
        `Resolución:\n1. Numerador y denominador tienen grado 1.\n2. Dividimos los coeficientes de n.\nResultado final: ${a}/${b}.`
      );
    }
    return generatedQuestion(
      `Calcula: lim x→${a} (x^2+${b})`,
      a * a + b,
      [2 * a + b, a + b, a * a],
      `Resolución:\n1. Es una función continua.\n2. Sustituimos x=${a}: ${a}²+${b}.\nResultado final: ${a * a + b}.`
    );
  }

  if (lower.includes("combinatoria")) {
    const digits = 5 + (seed % 5);
    const result = digits * (digits - 1);
    return generatedQuestion(
      `Con ${digits} cifras distintas, ¿cuántos códigos de dos cifras sin repetición se pueden formar?`,
      result,
      [digits * digits, result / 2, digits + (digits - 1)],
      `Resolución:\n1. Para la primera posición hay ${digits} opciones.\n2. Para la segunda quedan ${digits - 1}.\n3. Multiplicamos: ${digits}·${digits - 1}=${result}.\nResultado final: ${result}.`
    );
  }

  if (lower.includes("estadistica")) {
    if (operation === 1) {
      const values = [a, a + 1, a + 5, a + 6];
      const mean = (values.reduce((sum, value) => sum + value, 0)) / values.length;
      return generatedQuestion(
        `Calcula la media de los datos: ${values.join(", ")}.`,
        decimalAnswer(mean),
        [a + 1, a + 5, decimalAnswer(mean + 1)],
        `Resolución:\n1. Sumamos los cuatro datos: ${values.join("+")}=${values.reduce((sum, value) => sum + value, 0)}.\n2. Dividimos entre 4.\nResultado final: ${decimalAnswer(mean)}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Calcula el rango de los datos: ${a}, ${a + 3}, ${a + 7}, ${a + 10}.`,
        10,
        [a + 10, 7, 13],
        `Resolución:\n1. El rango es máximo menos mínimo.\n2. (${a + 10})-${a}=10.\nResultado final: 10.`
      );
    }
    if (operation === 3) {
      const repeated = a + 2;
      return generatedQuestion(
        `Calcula la moda de los datos: ${a}, ${repeated}, ${repeated}, ${a + 5}, ${a + 7}.`,
        repeated,
        [a, a + 5, a + 7],
        `Resolución:\n1. Contamos cuántas veces aparece cada dato.\n2. ${repeated} aparece dos veces y los demás una sola vez.\nResultado final: la moda es ${repeated}.`
      );
    }
    const values = [a, a + 2, a + 4, a + 6, a + 8];
    return generatedQuestion(
      `Calcula la mediana de los datos: ${values.join(", ")}.`,
      a + 4,
      [a + 2, a + 6, a + 8],
      `Resolución:\n1. Los cinco datos ya están ordenados.\n2. La mediana es el dato que ocupa la posición central, la tercera.\nResultado final: ${a + 4}.`
    );
  }

  if (lower.includes("probabilidad")) {
    if (operation === 1) {
      const red = 3 + (seed % 7);
      const blue = 4 + ((seed * 2) % 9);
      const total = red + blue;
      const result = reducedFraction(red, total);
      return generatedQuestion(
        `Una bolsa contiene ${red} bolas rojas y ${blue} azules. Calcula P(roja).`,
        result,
        [reducedFraction(blue, total), `${red}/${blue}`, `${total}/${red}`],
        `Resolución:\n1. Hay ${red} casos favorables.\n2. En total hay ${red}+${blue}=${total} bolas.\n3. P(roja)=${red}/${total}.\nResultado final: ${result}.`
      );
    }
    const total = 10 + (seed % 9);
    const favorable = 2 + (seed % 5);
    const result = reducedFraction(total - favorable, total);
    return generatedQuestion(
      `La probabilidad de un suceso A es ${favorable}/${total}. Calcula la probabilidad de que A no ocurra.`,
      result,
      [reducedFraction(favorable, total), reducedFraction(total, favorable), reducedFraction(total - favorable, favorable)],
      `Resolución:\n1. Un suceso y su contrario suman 1.\n2. P(no A)=1-${favorable}/${total}=(${total}-${favorable})/${total}.\n3. Simplificamos.\nResultado final: ${result}.`
    );
  }

  if (lower.includes("sucesion")) {
    const first = 1 + (seed % 8);
    const difference = 2 + (seed % 5);
    return generatedQuestion(
      `Halla el término general de la sucesión aritmética ${first}, ${first + difference}, ${first + 2 * difference}, ...`,
      `a_n = ${first} + (n-1)·${difference}`,
      [`a_n = ${first} + n·${difference}`, `a_n = ${first}·${difference}^(n-1)`, `a_n = n + ${difference}`],
      `Resolución:\n1. La diferencia entre términos es ${difference}.\n2. En una progresión aritmética aₙ=a₁+(n-1)d.\n3. Sustituimos a₁=${first} y d=${difference}.\nResultado final: aₙ=${first}+(n-1)·${difference}.`
    );
  }

  if (lower.includes("trigonometr")) {
    const scale = 1 + (seed % 5);
    if (operation === 1) {
      return generatedQuestion(
        `En un triángulo rectángulo, el cateto adyacente a α mide ${4 * scale} y la hipotenusa ${5 * scale}. Calcula cos(α).`,
        `${4 * scale}/${5 * scale}`,
        [`${3 * scale}/${5 * scale}`, `${4 * scale}/${3 * scale}`, `${5 * scale}/${4 * scale}`],
        `Resolución:\n1. cos(α)=cateto adyacente/hipotenusa.\n2. Sustituimos las medidas.\nResultado final: cos(α)=${4 * scale}/${5 * scale}.`
      );
    }
    return generatedQuestion(
      `En un triángulo rectángulo, el cateto opuesto a α mide ${3 * scale} y el adyacente ${4 * scale}. Calcula tg(α).`,
      `${3 * scale}/${4 * scale}`,
      [`${4 * scale}/${3 * scale}`, `${3 * scale}/${5 * scale}`, `${4 * scale}/${5 * scale}`],
      `Resolución:\n1. tg(α)=cateto opuesto/cateto adyacente.\n2. Sustituimos las medidas.\nResultado final: tg(α)=${3 * scale}/${4 * scale}.`
    );
  }

  if (lower.includes("geometria analitica")) {
    const x1 = 1 + (seed % 5);
    const y1 = 2 + (seed % 6);
    const x2 = x1 + 2;
    const y2 = y1 + 2 * a;
    return generatedQuestion(
      `Calcula la pendiente de la recta que pasa por A(${x1},${y1}) y B(${x2},${y2}).`,
      a,
      [2 * a, a + 1, reducedFraction(1, a)],
      `Resolución:\n1. m=(y₂-y₁)/(x₂-x₁).\n2. m=(${y2}-${y1})/(${x2}-${x1})=${2 * a}/2.\nResultado final: m=${a}.`
    );
  }

  if (lower.includes("funcion")) {
    if (operation === 1) {
      const value = 1 + (seed % 9);
      const result = a * value - b;
      return generatedQuestion(
        `Sea f(x)=${a}x-${b}. Calcula f(${value}).`,
        result,
        [a + value - b, a * value, result + b],
        `Resolución:\n1. Sustituimos x por ${value}.\n2. f(${value})=${a}·${value}-${b}=${result}.\nResultado final: ${result}.`
      );
    }
    const root = 2 + (seed % 8);
    return generatedQuestion(
      `Halla el corte con el eje X de f(x)=${a}x-${a * root}.`,
      `(${root}, 0)`,
      [`(0, ${root})`, `(${-root}, 0)`, `(${a * root}, 0)`],
      `Resolución:\n1. En el eje X se cumple f(x)=0.\n2. ${a}x-${a * root}=0, luego ${a}x=${a * root}.\n3. Dividimos entre ${a}: x=${root}.\nResultado final: (${root},0).`
    );
  }

  if (lower.includes("cuerpo")) {
    const radius = 2 + (seed % 6);
    return generatedQuestion(
      `Calcula el área de la base circular de un cilindro de radio ${radius} cm.`,
      `${radius * radius}π cm^2`,
      [`${2 * radius}π cm^2`, `${radius}π cm^2`, `${2 * radius * radius}π cm^2`],
      `Resolución:\n1. La base es un círculo.\n2. A=πr²=π·${radius}².\nResultado final: ${radius * radius}π cm².`
    );
  }

  if (lower.includes("figura") || lower.includes("medida") || lower.includes("angulo") || lower.includes("recta") || lower.includes("circunferencia") || lower.includes("semejanza") || lower.includes("pitagoras") || lower.includes("area")) {
    const base = 5 + (seed % 8);
    const height = 3 + (seed % 7);
    const area = base * height / 2;
    return generatedQuestion(
      `Calcula el área de un triángulo de base ${base} cm y altura ${height} cm.`,
      `${decimalAnswer(area)} cm^2`,
      [`${base * height} cm^2`, `${base + height} cm^2`, `${2 * (base + height)} cm^2`],
      `Resolución:\n1. Usamos A=base·altura/2.\n2. A=${base}·${height}/2=${decimalAnswer(area)}.\nResultado final: ${decimalAnswer(area)} cm².`
    );
  }

  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) {
    const solution = 2 + (seed % 9);
    const right = a * solution + b;
    if (operation === 1) {
      const rightWithParenthesis = a * (solution + 2) - b;
      return generatedQuestion(
        `Resuelve: ${a}(x+2)-${b}=${rightWithParenthesis}`,
        `x = ${solution}`,
        [`x = ${solution + 2}`, `x = ${rightWithParenthesis}`, `x = ${solution - 2}`],
        `Resolución:\n1. Sumamos ${b}: ${a}(x+2)=${rightWithParenthesis + b}.\n2. Dividimos entre ${a}: x+2=${solution + 2}.\n3. Restamos 2.\nResultado final: x=${solution}.`
      );
    }
    return generatedQuestion(
      `Resuelve: ${a}x + ${b} = ${right}`,
      `x = ${solution}`,
      [`x = ${right}`, `x = ${right - b}`, `x = ${solution + b}`],
      `Resolución:\n1. Restamos ${b}: ${a}x=${right - b}.\n2. Dividimos entre ${a}: x=${right - b}/${a}.\nResultado final: x=${solution}.`
    );
  }

  if (lower.includes("expresion") || lower.includes("algebra")) {
    if (operation === 1) {
      return generatedQuestion(
        `Desarrolla y reduce: ${a}(x+${c})-${b}x.`,
        `${a - b}x + ${a * c}`,
        [`${a + b}x + ${a * c}`, `${a - b}x + ${c}`, `${a}x + ${a * c - b}`],
        `Resolución:\n1. Aplicamos la distributiva: ${a}(x+${c})=${a}x+${a * c}.\n2. Restamos ${b}x.\n3. Reducimos términos semejantes: ${a}x-${b}x=${a - b}x.\nResultado final: ${a - b}x+${a * c}.`
      );
    }
    return generatedQuestion(
      `Reduce términos semejantes: ${a}x + ${b} - ${c}x + ${c + 2}`,
      `${a - c}x + ${b + c + 2}`,
      [`${a + c}x + ${b + c + 2}`, `${a - c}x + ${b - c - 2}`, `${a + b - c + c + 2}x`],
      `Resolución:\n1. Agrupamos términos con x: ${a}x-${c}x=${a - c}x.\n2. Sumamos los términos independientes: ${b}+${c + 2}=${b + c + 2}.\nResultado final: ${a - c}x+${b + c + 2}.`
    );
  }

  if (lower.includes("proporcional")) {
    const firstAmount = 3 + (seed % 6);
    const firstCost = firstAmount * a;
    const secondAmount = firstAmount + 2 + (seed % 4);
    const result = secondAmount * a;
    return generatedQuestion(
      `Si ${firstAmount} kg de fruta cuestan ${firstCost} €, ¿cuánto cuestan ${secondAmount} kg al mismo precio?`,
      `${result} €`,
      [`${firstCost + secondAmount} €`, `${secondAmount * firstAmount} €`, `${result - a} €`],
      `Resolución:\n1. Precio de 1 kg: ${firstCost}/${firstAmount}=${a} €.\n2. Multiplicamos por ${secondAmount}: ${secondAmount}·${a}=${result}.\nResultado final: ${result} €.`
    );
  }

  if (lower.includes("fraccion")) {
    const numerator1 = 1 + (seed % 5);
    const numerator2 = 2 + (seed % 4);
    const denominator1 = numerator1 + 3;
    const denominator2 = numerator2 + 4;
    if (operation === 1) {
      const result = reducedFraction(numerator1 * denominator2 + numerator2 * denominator1, denominator1 * denominator2);
      return generatedQuestion(
        `Calcula y simplifica: ${numerator1}/${denominator1} + ${numerator2}/${denominator2}`,
        result,
        [reducedFraction(numerator1 + numerator2, denominator1 + denominator2), reducedFraction(numerator1 * numerator2, denominator1 * denominator2), reducedFraction(numerator1 * denominator2 - numerator2 * denominator1, denominator1 * denominator2)],
        `Resolución:\n1. Usamos el denominador común ${denominator1 * denominator2}.\n2. Sumamos los numeradores equivalentes: ${numerator1 * denominator2}+${numerator2 * denominator1}.\n3. Simplificamos.\nResultado final: ${result}.`
      );
    }
    const result = reducedFraction(numerator1 * numerator2, denominator1 * denominator2);
    return generatedQuestion(
      `Calcula y simplifica: ${numerator1}/${denominator1} · ${numerator2}/${denominator2}`,
      result,
      [reducedFraction(numerator1 + numerator2, denominator1 + denominator2), reducedFraction(numerator1 * denominator2, denominator1 * numerator2), reducedFraction(numerator1 * numerator2, denominator1 + denominator2)],
      `Resolución:\n1. Multiplicamos numeradores: ${numerator1}·${numerator2}=${numerator1 * numerator2}.\n2. Multiplicamos denominadores: ${denominator1}·${denominator2}=${denominator1 * denominator2}.\n3. Simplificamos la fracción.\nResultado final: ${result}.`
    );
  }

  if (lower.includes("potencia") || lower.includes("raiz") || lower.includes("radical") || lower.includes("logaritmo")) {
    if (lower.includes("logaritmo") && seed % 2 === 0) {
      const exponent = 2 + (seed % 4);
      return generatedQuestion(
        `Calcula: log(10^${exponent})`,
        exponent,
        [10 ** exponent, exponent + 1, exponent - 1],
        `Resolución:\n1. log(10^k)=k en base 10.\n2. Aquí k=${exponent}.\nResultado final: ${exponent}.`
      );
    }
    const base = 2 + (seed % 5);
    const exponent1 = 2 + (seed % 3);
    const exponent2 = 3 + ((seed * 2) % 4);
    if (operation === 1) {
      return generatedQuestion(
        `Simplifica: ${base}^${exponent1 + exponent2} : ${base}^${exponent1}`,
        `${base}^${exponent2}`,
        [`${base}^${exponent1}`, `${base}^${exponent1 + exponent2}`, `${base}^${Math.abs(exponent2 - exponent1)}`],
        `Resolución:\n1. Las potencias tienen la misma base.\n2. En una división restamos exponentes: ${exponent1 + exponent2}-${exponent1}=${exponent2}.\nResultado final: ${base}^${exponent2}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Simplifica: (${base}^${exponent1})^${exponent2}`,
        `${base}^${exponent1 * exponent2}`,
        [`${base}^${exponent1 + exponent2}`, `${base * base}^${exponent1 * exponent2}`, `${base}^${Math.abs(exponent2 - exponent1)}`],
        `Resolución:\n1. En una potencia de otra potencia multiplicamos los exponentes.\n2. ${exponent1}·${exponent2}=${exponent1 * exponent2}.\nResultado final: ${base}^${exponent1 * exponent2}.`
      );
    }
    return generatedQuestion(
      `Simplifica: ${base}^${exponent1} · ${base}^${exponent2}`,
      `${base}^${exponent1 + exponent2}`,
      [`${base}^${exponent1 * exponent2}`, `${base}^${Math.abs(exponent1 - exponent2)}`, `${base}^${exponent1 + exponent2 + 1}`],
      `Resolución:\n1. Las potencias tienen la misma base.\n2. Sumamos exponentes: ${exponent1}+${exponent2}=${exponent1 + exponent2}.\nResultado final: ${base}^${exponent1 + exponent2}.`
    );
  }

  const first = 5 + (seed % 12);
  const second = 2 + ((seed * 2) % 8);
  const result = first * second - a;
  return generatedQuestion(
    `Calcula: ${first} · ${second} - ${a}`,
    result,
    [first * (second - a), first + second - a, result + a],
    `Resolución:\n1. Primero multiplicamos: ${first}·${second}=${first * second}.\n2. Después restamos ${a}.\nResultado final: ${result}.`
  );
}

function generatedIntegerOperationsLevelQuestion(seed, progressionStage, a, b, c) {
  const d = 1 + (Math.floor(seed / 7) % 4);

  if (progressionStage === 0) {
    const result = a - c + b;
    return generatedQuestion(
      `Calcula: ${a} + (-${c}) + ${b}`,
      result,
      [a + c + b, a - c - b, -a - c + b],
      `Resolución:\nOperamos de izquierda a derecha y conservamos escrita la operación completa en cada línea:\n${a}+(-${c})+${b}\n=${a - c}+${b}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 1) {
    const result = a - b - c;
    return generatedQuestion(
      `Calcula: ${a} - ${b} + (-${c})`,
      result,
      [a + b - c, a - b + c, -a - b - c],
      `Resolución:\nLa suma de un número negativo equivale a una resta. Después operamos de izquierda a derecha:\n${a}-${b}+(-${c})\n=${a}-${b}-${c}\n=${a - b}-${c}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 2) {
    const result = a * c - b;
    return generatedQuestion(
      `Calcula: ${a} · ${c} + (-${b})`,
      result,
      [(a + c) - b, a * (c - b), a * c + b],
      `Resolución:\nLa multiplicación tiene prioridad. Mantenemos la operación completa:\n${a}·${c}+(-${b})\n=${a * c}+(-${b})\n=${a * c}-${b}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 3) {
    const dividend = b * c;
    const result = -b + a;
    return generatedQuestion(
      `Calcula: ${dividend} : (-${c}) + ${a}`,
      result,
      [b + a, -b - a, dividend / c + a + c],
      `Resolución:\nPrimero hacemos la división; positivo entre negativo da negativo:\n${dividend}:(-${c})+${a}\n=-${b}+${a}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 4) {
    const result = b - c;
    return generatedQuestion(
      `Calcula: (${a} + ${b}) - (${c} + ${a})`,
      result,
      [a + b - c + a, a + b + c + a, b + c],
      `Resolución:\nResolvemos un paréntesis en cada paso sin borrar el resto de la operación:\nparen{${a}+${b}}-paren{${c}+${a}}\n=${a + b}-paren{${c}+${a}}\n=${a + b}-${c + a}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 5) {
    const difference = 2 + (seed % 5);
    const result = a - c * difference;
    return generatedQuestion(
      `Calcula: ${a} - ${c} · (${d + difference} - ${d})`,
      result,
      [(a - c) * difference, a - c * (d + difference) - d, a + c * difference],
      `Resolución:\nSeguimos la jerarquía de operaciones y mantenemos la expresión completa:\n${a}-${c}·paren{${d + difference}-${d}}\n=${a}-${c}·${difference}\n=${a}-${c * difference}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 6) {
    const innerProduct = c * (d + 1);
    const result = a - (b - innerProduct);
    return generatedQuestion(
      `Calcula: ${a} - [${b} - ${c} · (${d} + 1)]`,
      result,
      [a - b - innerProduct, a + b - innerProduct, a - b + c + d + 1],
      `Resolución:\nResolvemos de dentro hacia fuera y conservamos toda la operación:\n${a}-bracket{${b}-${c}·paren{${d}+1}}\n=${a}-bracket{${b}-${c}·${d + 1}}\n=${a}-bracket{${b}-${innerProduct}}\n=${a}-paren{${b - innerProduct}}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 7) {
    const large = d + 2 + (seed % 4);
    const result = (a - b) * (large - d);
    return generatedQuestion(
      `Calcula: [${a} + (-${b})] · (${large} - ${d})`,
      result,
      [a - b * (large - d), (a + b) * (large - d), a - b + large - d],
      `Resolución:\nResolvemos una sola operación en cada línea y mantenemos visible la expresión completa:\nbracket{${a}+(-${b})}·paren{${large}-${d}}\n=bracket{${a}-${b}}·paren{${large}-${d}}\n=paren{${a - b}}·paren{${large}-${d}}\n=paren{${a - b}}·${large - d}\n=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 8) {
    const large = d + 2 + (seed % 4);
    const result = c ** 2 + a * (large - d) - b;
    return generatedQuestion(
      `Calcula: (-${c})^2 + ${a} · (${large} - ${d}) - ${b}`,
      result,
      [-(c ** 2) + a * (large - d) - b, (c ** 2 + a) * (large - d) - b, c ** 2 + a * large - d - b],
      `Resolución:\nCalculamos una operación en cada línea y mantenemos toda la expresión:\nparen{-${c}}²+${a}·paren{${large}-${d}}−${b}\n=${c ** 2}+${a}·paren{${large}-${d}}−${b}\n=${c ** 2}+${a}·${large - d}−${b}\n=${c ** 2}+${a * (large - d)}−${b}\n=${result}.\nResultado final: ${result}.`
    );
  }
  const divisor = 2 + (seed % 3);
  const factor = 2 + (Math.floor(seed / 5) % 4);
  const multiplier = divisor * factor;
  const innerSum = c + d;
  const firstTerm = divisor * (a + factor * innerSum);
  const result = a + c ** 2;
  return generatedQuestion(
    `Calcula: [${firstTerm} + (-${multiplier}) · (${c} + ${d})] : ${divisor} + (-${c})^2`,
    result,
    [a - c ** 2, a + factor * innerSum + c ** 2, firstTerm - multiplier * innerSum / divisor + c ** 2],
    `Resolución:\nResolvemos una operación en cada línea y mantenemos escrita la expresión completa:\nbracket{${firstTerm}+(-${multiplier})·paren{${c}+${d}}}:${divisor}+paren{-${c}}^2\n=bracket{${firstTerm}+(-${multiplier})·${innerSum}}:${divisor}+paren{-${c}}^2\n=bracket{${firstTerm}-${multiplier * innerSum}}:${divisor}+${c ** 2}\n=${divisor * a}:${divisor}+${c ** 2}\n=${a}+${c ** 2}\n=${result}.\nResultado final: ${result}.`
  );
}

function generatedNumberLevelQuestion(lower, courseId, difficulty, seed, progressionIndex = seed) {
  const levelOffset = difficulty === "hard" ? 8 : difficulty === "medium" ? 4 : 0;
  const a = 4 + levelOffset + (seed % 7);
  const b = 6 + levelOffset + ((seed * 3) % 9);
  const c = 2 + (seed % 5);
  const rawProgressionStage = ((progressionIndex % 10) + 10) % 10;
  const easyProgression = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5];
  const progressionStage = difficulty === "easy"
    ? easyProgression[rawProgressionStage]
    : rawProgressionStage;

  if (lower.includes("entero")) {
    return generatedIntegerOperationsLevelQuestion(seed, progressionStage, a, b, c);
  }

  if (progressionStage === 0) {
    const result = a + b - c;
    return generatedQuestion(
      `Calcula de izquierda a derecha: ${a} + ${b} - ${c}`,
      result,
      [a + b + c, a + (b - c * 2), b - a - c],
      `Resolución:\n1. Solo hay sumas y restas, que tienen la misma prioridad. Operamos de izquierda a derecha.\n2. ${a}+${b}=${a + b}.\n3. ${a + b}-${c}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 1) {
    const result = a * c + b;
    return generatedQuestion(
      `Calcula: ${a} · ${c} + ${b}`,
      result,
      [(a + c) * b, a * (c + b), a + c + b],
      `Resolución:\n1. La multiplicación se realiza antes que la suma.\n2. ${a}·${c}=${a * c}.\n3. ${a * c}+${b}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 2) {
    const dividend = b * c;
    const result = b + a;
    return generatedQuestion(
      `Calcula: ${dividend} : ${c} + ${a}`,
      result,
      [dividend + c + a, b - a, b + a + c],
      `Resolución:\n1. La división se realiza antes que la suma.\n2. ${dividend}:${c}=${b}.\n3. ${b}+${a}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 3) {
    const result = (a + b) * c;
    return generatedQuestion(
      `Calcula: (${a} + ${b}) · ${c}`,
      result,
      [a + b * c, a + b + c, (a + b) * (c - 1)],
      `Resolución:\n1. Primero resolvemos el paréntesis: ${a}+${b}=${a + b}.\n2. Después multiplicamos: ${a + b}·${c}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 4) {
    const factor = 2 + (seed % 4);
    const divisor = 2 + (Math.floor(seed / 5) % 5);
    const divisibleFactor = divisor * factor;
    const result = a * factor + c;
    return generatedQuestion(
      `Calcula: ${a} · ${divisibleFactor} : ${divisor} + ${c}`,
      result,
      [a * factor + c * divisor, a * (factor + c), a + factor + c],
      `Resolución:\n1. Multiplicaciones y divisiones tienen la misma prioridad y se hacen de izquierda a derecha.\n2. ${a}·${divisibleFactor}=${a * divisibleFactor}.\n3. ${a * divisibleFactor}:${divisor}=${a * factor}.\n4. ${a * factor}+${c}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 5) {
    const addend = 2 + ((seed * 7) % 6);
    const result = a + b * (c + addend);
    return generatedQuestion(
      `Calcula: ${a} + ${b} · (${c} + ${addend})`,
      result,
      [(a + b) * (c + addend), a + b * c + addend, a + b + c + addend],
      `Resolución:\n1. Primero resolvemos el paréntesis: ${c}+${addend}=${c + addend}.\n2. Después hacemos la multiplicación: ${b}·${c + addend}=${b * (c + addend)}.\n3. Por último sumamos ${a}: ${a}+${b * (c + addend)}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 6) {
    const small = 1 + (seed % 4);
    const large = small + 2 + ((seed * 3) % 5);
    const result = (a + c) * (large - small);
    return generatedQuestion(
      `Calcula: (${a} + ${c}) · (${large} - ${small})`,
      result,
      [a + c * (large - small), (a + c) * large - small, a + c + large - small],
      `Resolución:\n1. Resolvemos los dos paréntesis: ${a}+${c}=${a + c} y ${large}-${small}=${large - small}.\n2. Multiplicamos los resultados: ${a + c}·${large - small}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 7) {
    const small = 1 + (seed % 3);
    const large = small + 2 + ((seed * 5) % 4);
    const result = c ** 2 + a * (large - small);
    return generatedQuestion(
      `Calcula: ${c}^2 + ${a} · (${large} - ${small})`,
      result,
      [(c + 2) + a * (large - small), (c ** 2 + a) * (large - small), c ** 2 + a * large - small],
      `Resolución:\n1. Calculamos la potencia: ${c}²=${c ** 2}.\n2. Resolvemos el paréntesis: ${large}-${small}=${large - small}.\n3. Multiplicamos: ${a}·${large - small}=${a * (large - small)}.\n4. Sumamos: ${c ** 2}+${a * (large - small)}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 8) {
    const left = 2 + (seed % 5);
    const right = 2 + ((seed * 3) % 5);
    const divisor = left + right;
    const result = a + c;
    return generatedQuestion(
      `Calcula: (${a} + ${c}) · (${left} + ${right}) : ${divisor}`,
      result,
      [(a + c) * divisor, a + c + divisor, a + c * divisor / divisor],
      `Resolución:\n1. Resolvemos los paréntesis: ${a}+${c}=${a + c} y ${left}+${right}=${divisor}.\n2. Multiplicamos y dividimos de izquierda a derecha: ${a + c}·${divisor}:${divisor}.\n3. Como multiplicamos y dividimos por ${divisor}, queda ${result}.\nResultado final: ${result}.`
    );
  }
  const divisor = 2 + (seed % 3);
  const addend = 2 + ((seed * 3) % 4);
  const factor = 2 + (Math.floor(seed / 5) % 4);
  const multiplier = divisor * factor;
  const shiftedTerm = a + c ** 2;
  const firstTerm = shiftedTerm * divisor;
  const targetAfterDivision = shiftedTerm + factor * (c + addend);
  const result = a + factor * (c + addend);
  return generatedQuestion(
    `Calcula: (${firstTerm} + ${multiplier} · (${c} + ${addend})) : ${divisor} - ${c}^2`,
    result,
    [targetAfterDivision, result + c ** 2, firstTerm + multiplier * (c + addend) - divisor - c ** 2],
    `Resolución:\n1. Resolvemos el paréntesis interior: ${c}+${addend}=${c + addend}.\n2. Calculamos la potencia: ${c}²=${c ** 2}.\n3. Multiplicamos: ${multiplier}·${c + addend}=${multiplier * (c + addend)}.\n4. Resolvemos el paréntesis exterior: ${firstTerm}+${multiplier * (c + addend)}=${divisor * targetAfterDivision}.\n5. Dividimos: ${divisor * targetAfterDivision}:${divisor}=${targetAfterDivision}.\n6. Restamos la potencia: ${targetAfterDivision}-${c ** 2}=${result}.\nResultado final: ${result}.`
  );
}

function generatedPowerLevelQuestion(lower, difficulty, seed, progressionIndex = seed) {
  const levelExtra = difficulty === "hard" ? 2 : difficulty === "medium" ? 1 : 0;
  const positiveSeed = Math.abs(seed);
  const a = 2 + ((positiveSeed + Math.floor(positiveSeed / 17)) % 19);
  const m = 2 + levelExtra + (Math.floor(positiveSeed / 19) % 7);
  const n = 2 + levelExtra + (Math.floor(positiveSeed / 131) % 7);
  const p = 1 + (Math.floor(positiveSeed / 29) % 5);
  const outer = 2 + (Math.floor(positiveSeed / 43) % 3);
  const radicand = [2, 3, 5, 7, 11, 13][positiveSeed % 6];
  const rawProgressionStage = ((progressionIndex % 10) + 10) % 10;
  const easyProgression = [10, 10, 0, 0, 1, 1, 2, 3, 7, 8];
  const progressionStage = difficulty === "easy"
    ? easyProgression[rawProgressionStage]
    : rawProgressionStage;
  const hasRoots = lower.includes("raiz") || lower.includes("raic") || lower.includes("radical");

  const powerQuestion = (text, exponent, candidateExponents, solution) => {
    const used = new Set([exponent]);
    const distractorExponents = [];
    candidateExponents.forEach((candidate) => {
      const normalized = Math.max(0, Math.round(Math.abs(candidate)));
      if (!used.has(normalized) && distractorExponents.length < 3) {
        used.add(normalized);
        distractorExponents.push(normalized);
      }
    });
    let distance = 1;
    while (distractorExponents.length < 3) {
      const candidate = exponent + distance;
      if (!used.has(candidate)) {
        used.add(candidate);
        distractorExponents.push(candidate);
      }
      distance += 1;
    }
    return generatedQuestion(
      text,
      `${a}^${exponent}`,
      distractorExponents.map((candidate) => `${a}^${candidate}`),
      solution
    );
  };

  if (!lower.includes("potencia")) {
    if (lower.includes("logaritmo")) {
      const logarithmVariant = seed % 4;
      if (logarithmVariant === 0) {
        return generatedQuestion(
          `Calcula: log(10^${m}) - log(10)`,
          m - 1,
          [m, m + 1, 10 ** (m - 1)],
          `Resolución:\n1. Aplicamos log(10^k)=k: log(10^${m})=${m}.\n2. Como log(10)=1, restamos: ${m}-1=${m - 1}.\nResultado final: ${m - 1}.`
        );
      }
      if (logarithmVariant === 1) {
        return generatedQuestion(
          `Resuelve: log_${a}(x)=${m}.`,
          `x=${a ** m}`,
          [`x=${a * m}`, `x=${m ** a}`, `x=${m}`],
          `Resolución:\n1. Pasamos de forma logarítmica a exponencial: x=${a}^${m}.\n2. Calculamos la potencia.\nResultado final: x=${a ** m}.`
        );
      }
      if (logarithmVariant === 2) {
        return generatedQuestion(
          `Calcula: log(10^${m}·10^${n}).`,
          m + n,
          [m * n, Math.abs(m - n), 10 ** Math.min(5, m + n)],
          `Resolución:\n1. Multiplicamos potencias de base 10: 10^${m}·10^${n}=10^${m + n}.\n2. log(10^${m + n})=${m + n}.\nResultado final: ${m + n}.`
        );
      }
      return generatedQuestion(
        `Calcula: log_${a}paren{frac{${a ** (m + 1)}}{${a}}}.`,
        m,
        [m + 1, m - 1, a * m],
        `Resolución:\n1. Dividimos potencias de igual base: frac{${a}^${m + 1}}{${a}}=${a}^${m}.\n2. log_${a}(${a}^${m})=${m}.\nResultado final: ${m}.`
      );
    }
    if (difficulty === "easy") {
      const root = 4 + (seed % 31);
      return generatedQuestion(
        `Calcula: √${root * root}`,
        root,
        [root * root, root + 2, Math.max(1, root - 2)],
        `Resolución:\n1. Buscamos el número positivo cuyo cuadrado es ${root * root}.\n2. ${root}²=${root * root}.\nResultado final: √${root * root}=${root}.`
      );
    }
    const radicalVariant = seed % 4;
    if (radicalVariant === 1) {
      return generatedQuestion(
        `Racionaliza: frac{${a}}{√${radicand}}.`,
        `frac{${a}√${radicand}}{${radicand}}`,
        [`frac{√${radicand}}{${a}}`, `${a}√${radicand}`, `frac{${radicand}}{${a}√${radicand}}`],
        `Resolución:\n1. Multiplicamos numerador y denominador por √${radicand}.\n2. El denominador queda ${radicand}.\nResultado final: frac{${a}√${radicand}}{${radicand}}.`
      );
    }
    if (radicalVariant === 2) {
      const other = 2 + (Math.floor(seed / 5) % 6);
      return generatedQuestion(
        `Reduce: √${a * a * radicand}+√${other * other * radicand}.`,
        `${a + other}√${radicand}`,
        [`${a * other}√${radicand}`, `${a + other}√${2 * radicand}`, `${a + other + radicand}`],
        `Resolución:\n1. Extraemos cuadrados perfectos: √${a * a * radicand}=${a}√${radicand} y √${other * other * radicand}=${other}√${radicand}.\n2. Sumamos radicales semejantes.\nResultado final: ${a + other}√${radicand}.`
      );
    }
    if (radicalVariant === 3) {
      return generatedQuestion(
        `Calcula y simplifica: √${radicand}·√${a * a * radicand}.`,
        a * radicand,
        [a * a * radicand, a * Math.sqrt(radicand), a + radicand],
        `Resolución:\n1. Unimos los radicales: √${radicand}·√${a * a * radicand}=√${a * a * radicand * radicand}.\n2. El radicando es (${a}·${radicand})².\nResultado final: ${a * radicand}.`
      );
    }
    return generatedQuestion(
      `Simplifica: √${a * a * radicand}`,
      `${a}√${radicand}`,
      [`${a * a}√${radicand}`, `${a}√${a * radicand}`, `√${a * radicand}`],
      `Resolución:\n1. Descomponemos el radicando: ${a * a * radicand}=${a * a}·${radicand}.\n2. Separamos el producto: √(${a * a}·${radicand})=√${a * a}·√${radicand}.\n3. Como √${a * a}=${a}, obtenemos ${a}√${radicand}.\nResultado final: ${a}√${radicand}.`
    );
  }

  if (progressionStage === 10) {
    const result = a ** Math.min(m, 5);
    const directExponent = Math.min(m, 5);
    return generatedQuestion(
      `Calcula: ${a}^${directExponent}`,
      result,
      [a * directExponent, a ** Math.max(1, directExponent - 1), result + a],
      `Resolución:\n1. Una potencia indica una multiplicación repetida: ${a}^${directExponent} significa multiplicar ${a} por sí mismo ${directExponent} veces.\n2. Realizamos el producto y obtenemos ${result}.\nResultado final: ${a}^${directExponent}=${result}.`
    );
  }

  if (progressionStage === 0) {
    const exponent = m + n;
    return powerQuestion(
      `Simplifica: ${a}^${m} · ${a}^${n}`,
      exponent,
      [m * n, Math.abs(m - n), m + n + 1],
      `Resolución:\n1. Es un producto de potencias con la misma base.\n2. Conservamos la base y sumamos los exponentes: ${a}^${m}·${a}^${n}=${a}^(${m}+${n}).\n3. ${m}+${n}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 1) {
    const numeratorExponent = m + n;
    return powerQuestion(
      `Simplifica: ${a}^${numeratorExponent} : ${a}^${m}`,
      n,
      [numeratorExponent + m, numeratorExponent, Math.abs(numeratorExponent - n)],
      `Resolución:\n1. Es una división de dos potencias con la misma base.\n2. Conservamos la base y restamos los exponentes: ${a}^${numeratorExponent}:${a}^${m}=${a}^(${numeratorExponent}-${m}).\n3. ${numeratorExponent}-${m}=${n}.\nResultado final: ${a}^${n}.`
    );
  }
  if (progressionStage === 2) {
    const exponent = m + n + p;
    return powerQuestion(
      `Simplifica: ${a}^${m} · ${a}^${n} · ${a}^${p}`,
      exponent,
      [m * n * p, m + n - p, m * n + p],
      `Resolución:\n1. Las tres potencias tienen la misma base.\n2. En un producto sumamos todos los exponentes: ${m}+${n}+${p}.\n3. ${m}+${n}+${p}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 3) {
    const exponent = m * outer;
    return powerQuestion(
      `Simplifica: (${a}^${m})^${outer}`,
      exponent,
      [m + outer, m ** outer, Math.abs(m - outer)],
      `Resolución:\n1. Es una potencia de otra potencia.\n2. Conservamos la base y multiplicamos los exponentes: (${a}^${m})^${outer}=${a}^(${m}·${outer}).\n3. ${m}·${outer}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 4) {
    const exponent = m + n - p;
    return powerQuestion(
      `Simplifica: ${a}^${m} · ${a}^${n} : ${a}^${p}`,
      exponent,
      [m + n + p, m * n - p, Math.abs(m - n) + p],
      `Resolución:\n1. Multiplicamos potencias de la misma base y sumamos exponentes: ${m}+${n}=${m + n}.\n2. Después dividimos por ${a}^${p} y restamos su exponente: ${m + n}-${p}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 5) {
    const innerExponent = m + n;
    const exponent = innerExponent * outer;
    return powerQuestion(
      `Simplifica: (${a}^${m} · ${a}^${n})^${outer}`,
      exponent,
      [m + n + outer, m * n * outer, innerExponent + outer],
      `Resolución:\n1. Dentro del paréntesis multiplicamos potencias de la misma base: ${a}^${m}·${a}^${n}=${a}^(${m}+${n})=${a}^${innerExponent}.\n2. Aplicamos la potencia de una potencia y multiplicamos exponentes: (${a}^${innerExponent})^${outer}=${a}^(${innerExponent}·${outer}).\n3. ${innerExponent}·${outer}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 6) {
    const numeratorExponent = m + n;
    const innerExponent = numeratorExponent - n;
    const exponent = innerExponent * outer;
    return powerQuestion(
      `Simplifica: (${a}^${numeratorExponent} : ${a}^${n})^${outer}`,
      exponent,
      [numeratorExponent - n + outer, numeratorExponent + n * outer, numeratorExponent * outer - n],
      `Resolución:\n1. Dentro del paréntesis dividimos potencias de la misma base: ${a}^${numeratorExponent}:${a}^${n}=${a}^(${numeratorExponent}-${n})=${a}^${innerExponent}.\n2. En la potencia de una potencia multiplicamos los exponentes: (${a}^${innerExponent})^${outer}=${a}^(${innerExponent}·${outer}).\n3. ${innerExponent}·${outer}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 7) {
    if (hasRoots) {
      const root = 5 + (seed % 24);
      return generatedQuestion(
        `Calcula: √${root * root}`,
        root,
        [root * root, root + 1, Math.max(1, root - 2)],
        `Resolución:\n1. La raíz cuadrada principal es el número positivo cuyo cuadrado da el radicando.\n2. Como ${root}²=${root * root}, la raíz buscada es ${root}.\nResultado final: √${root * root}=${root}.`
      );
    }
    const exponent = m * outer + n - p;
    return powerQuestion(
      `Simplifica: (${a}^${m})^${outer} · ${a}^${n} : ${a}^${p}`,
      exponent,
      [m + outer + n - p, m * outer + n + p, (m + n) * outer - p],
      `Resolución:\n1. Potencia de una potencia: (${a}^${m})^${outer}=${a}^(${m}·${outer})=${a}^${m * outer}.\n2. En el producto sumamos exponentes: ${m * outer}+${n}=${m * outer + n}.\n3. En la división restamos ${p}: ${m * outer + n}-${p}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }
  if (progressionStage === 8) {
    if (hasRoots) {
      return generatedQuestion(
        `Simplifica: √${a * a * radicand}`,
        `${a}√${radicand}`,
        [`${a * a}√${radicand}`, `${a}√${a * radicand}`, `√${a * radicand}`],
        `Resolución:\n1. Buscamos un cuadrado perfecto dentro del radicando: ${a * a * radicand}=${a * a}·${radicand}.\n2. Separamos la raíz del producto: √(${a * a}·${radicand})=√${a * a}·√${radicand}.\n3. Como √${a * a}=${a}, extraemos ese factor.\nResultado final: ${a}√${radicand}.`
      );
    }
    const innerExponent = m + n;
    const exponent = innerExponent * outer - p;
    return powerQuestion(
      `Simplifica: (${a}^${m} · ${a}^${n})^${outer} : ${a}^${p}`,
      exponent,
      [m + n + outer - p, innerExponent * outer + p, m * n * outer - p],
      `Resolución:\n1. Dentro del paréntesis sumamos exponentes: ${m}+${n}=${innerExponent}.\n2. Al elevar el paréntesis, multiplicamos exponentes: ${innerExponent}·${outer}=${innerExponent * outer}.\n3. En la división restamos ${p}: ${innerExponent * outer}-${p}=${exponent}.\nResultado final: ${a}^${exponent}.`
    );
  }

  const rightM = 1 + (Math.floor(seed / 5) % 3);
  const rightN = 1 + (Math.floor(seed / 17) % 3);
  const rightOuter = 2;
  const rightExponent = (rightM + rightN) * rightOuter;
  let leftM = m;
  let leftExponent = (leftM + n) * outer;
  if (leftExponent <= rightExponent) {
    leftM += Math.ceil((rightExponent - leftExponent + 1) / outer);
    leftExponent = (leftM + n) * outer;
  }
  const exponent = leftExponent - rightExponent;
  return powerQuestion(
    `Simplifica: (${a}^${leftM} · ${a}^${n})^${outer} : (${a}^${rightM} · ${a}^${rightN})^${rightOuter}`,
    exponent,
    [leftExponent + rightExponent, leftM + n + outer - rightM - rightN - rightOuter, (leftM + n - rightM - rightN) * (outer + rightOuter)],
    `Resolución:\n1. Primer paréntesis: ${a}^${leftM}·${a}^${n}=${a}^(${leftM}+${n})=${a}^${leftM + n}. Al elevarlo, queda ${a}^(${leftM + n}·${outer})=${a}^${leftExponent}.\n2. Segundo paréntesis: ${a}^${rightM}·${a}^${rightN}=${a}^(${rightM}+${rightN})=${a}^${rightM + rightN}. Al elevarlo, queda ${a}^(${rightM + rightN}·${rightOuter})=${a}^${rightExponent}.\n3. Dividimos potencias de la misma base y restamos exponentes: ${leftExponent}-${rightExponent}=${exponent}.\nResultado final: ${a}^${exponent}.`
  );
}

function generatedFractionLevelQuestion(courseId, difficulty, seed, progressionIndex = seed) {
  const levelOffset = difficulty === "hard" ? 4 : difficulty === "medium" ? 2 : 0;
  const denominator1 = 3 + levelOffset + (seed % 4);
  const denominator2 = denominator1 + 1 + (Math.floor(seed / 5) % 3);
  const denominator3 = 2 + (Math.floor(seed / 7) % 5);
  const numerator1 = 1 + (Math.floor(seed / 3) % (denominator1 - 1));
  const numerator2 = 1 + (Math.floor(seed / 11) % (denominator2 - 1));
  const numerator3 = 1 + (Math.floor(seed / 13) % Math.max(1, denominator3 - 1));
  const whole = 1 + (seed % 4);
  const rawProgressionStage = ((progressionIndex % 10) + 10) % 10;
  const firstEsoProgressions = {
    easy: [0, 0, 1, 1, 2, 2, 4, 5, 6, 8],
    medium: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    hard: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  };
  const secondEsoProgressions = {
    easy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    medium: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    hard: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  };
  const upperEsoProgressions = {
    easy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    medium: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    hard: [4, 5, 6, 7, 8, 9, 10, 10, 11, 11]
  };
  const courseProgressions = courseId === "1eso"
    ? firstEsoProgressions
    : courseId === "2eso"
      ? secondEsoProgressions
      : upperEsoProgressions;
  const progressionStage = courseProgressions[difficulty][rawProgressionStage];

  if (progressionStage === 0) {
    const addLeft = 1 + (seed % Math.max(1, denominator1 - 2));
    const addRight = 1 + (Math.floor(seed / 5) % Math.max(1, denominator1 - addLeft - 1));
    const result = reducedFraction(addLeft + addRight, denominator1);
    return generatedQuestion(
      `Calcula y simplifica: ${addLeft}/${denominator1} + ${addRight}/${denominator1}`,
      result,
      [reducedFraction(addLeft + addRight, denominator1 * 2), reducedFraction(addLeft * addRight, denominator1), reducedFraction(addLeft + addRight, denominator1 + denominator1)],
      `Resolución:\n1. Las fracciones tienen el mismo denominador, así que conservamos ${denominator1}.\n2. Sumamos los numeradores: ${addLeft}+${addRight}=${addLeft + addRight}.\n3. Simplificamos ${addLeft + addRight}/${denominator1}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 1) {
    const larger = 2 + (seed % Math.max(1, denominator1 - 2));
    const smaller = 1 + (Math.floor(seed / 7) % Math.max(1, larger - 1));
    const result = reducedFraction(larger - smaller, denominator1);
    return generatedQuestion(
      `Calcula y simplifica: ${larger}/${denominator1} - ${smaller}/${denominator1}`,
      result,
      [reducedFraction(larger + smaller, denominator1), reducedFraction(larger - smaller, denominator1 * 2), reducedFraction(larger, denominator1 - smaller || 1)],
      `Resolución:\n1. Los denominadores son iguales, por lo que conservamos ${denominator1}.\n2. Restamos los numeradores: ${larger}-${smaller}=${larger - smaller}.\n3. Simplificamos ${larger - smaller}/${denominator1}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 2) {
    const commonDenominator = denominator1 * denominator2;
    const numerator = numerator1 * denominator2 + numerator2 * denominator1;
    const result = reducedFraction(numerator, commonDenominator);
    return generatedQuestion(
      `Calcula y simplifica: ${numerator1}/${denominator1} + ${numerator2}/${denominator2}`,
      result,
      [reducedFraction(numerator1 + numerator2, denominator1 + denominator2), reducedFraction(numerator1 + numerator2, commonDenominator), reducedFraction(numerator1 * denominator1 + numerator2 * denominator2, commonDenominator)],
      `Resolución:\n1. Buscamos denominador común: ${denominator1}·${denominator2}=${commonDenominator}.\n2. Transformamos: ${numerator1}/${denominator1}=${numerator1 * denominator2}/${commonDenominator} y ${numerator2}/${denominator2}=${numerator2 * denominator1}/${commonDenominator}.\n3. Sumamos los numeradores: ${numerator1 * denominator2}+${numerator2 * denominator1}=${numerator}.\n4. Simplificamos ${numerator}/${commonDenominator}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 3) {
    const firstIsLarger = numerator1 * denominator2 >= numerator2 * denominator1;
    const leftNumerator = firstIsLarger ? numerator1 : numerator2;
    const leftDenominator = firstIsLarger ? denominator1 : denominator2;
    const rightNumerator = firstIsLarger ? numerator2 : numerator1;
    const rightDenominator = firstIsLarger ? denominator2 : denominator1;
    const commonDenominator = leftDenominator * rightDenominator;
    const numerator = leftNumerator * rightDenominator - rightNumerator * leftDenominator;
    const result = reducedFraction(numerator, commonDenominator);
    return generatedQuestion(
      `Calcula y simplifica: ${leftNumerator}/${leftDenominator} - ${rightNumerator}/${rightDenominator}`,
      result,
      [reducedFraction(leftNumerator - rightNumerator, leftDenominator + rightDenominator), reducedFraction(leftNumerator * rightDenominator + rightNumerator * leftDenominator, commonDenominator), reducedFraction(leftNumerator - rightNumerator, commonDenominator)],
      `Resolución:\n1. Tomamos denominador común: ${leftDenominator}·${rightDenominator}=${commonDenominator}.\n2. Los numeradores equivalentes son ${leftNumerator * rightDenominator} y ${rightNumerator * leftDenominator}.\n3. Restamos: ${leftNumerator * rightDenominator}-${rightNumerator * leftDenominator}=${numerator}.\n4. Simplificamos ${numerator}/${commonDenominator}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 4) {
    const result = reducedFraction(numerator1 * numerator2, denominator1 * denominator2);
    return generatedQuestion(
      `Calcula y simplifica: ${numerator1}/${denominator1} · ${numerator2}/${denominator2}`,
      result,
      [reducedFraction(numerator1 + numerator2, denominator1 + denominator2), reducedFraction(numerator1 * denominator2, denominator1 * numerator2), reducedFraction(numerator1 * numerator2, denominator1 + denominator2)],
      `Resolución:\n1. Multiplicamos los numeradores: ${numerator1}·${numerator2}=${numerator1 * numerator2}.\n2. Multiplicamos los denominadores: ${denominator1}·${denominator2}=${denominator1 * denominator2}.\n3. Simplificamos ${numerator1 * numerator2}/${denominator1 * denominator2}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 5) {
    const result = reducedFraction(numerator1 * denominator2, denominator1 * numerator2);
    return generatedQuestion(
      `Calcula y simplifica: ${numerator1}/${denominator1} : ${numerator2}/${denominator2}`,
      result,
      [reducedFraction(numerator1 * numerator2, denominator1 * denominator2), reducedFraction(numerator1 * denominator1, numerator2 * denominator2), reducedFraction(numerator1 + numerator2, denominator1 + denominator2)],
      `Resolución:\n1. Para dividir por una fracción, multiplicamos por su inversa.\n2. ${numerator1}/${denominator1}:${numerator2}/${denominator2}=${numerator1}/${denominator1}·${denominator2}/${numerator2}.\n3. Multiplicamos: ${numerator1 * denominator2}/${denominator1 * numerator2}.\n4. Simplificamos.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 6) {
    const commonDenominator = denominator1 * denominator2;
    const numerator = whole * commonDenominator + numerator1 * denominator2 - numerator2 * denominator1;
    const result = reducedFraction(numerator, commonDenominator);
    return generatedQuestion(
      `Calcula y simplifica: ${whole} + ${numerator1}/${denominator1} - ${numerator2}/${denominator2}`,
      result,
      [reducedFraction(whole + numerator1 - numerator2, commonDenominator), reducedFraction(whole * commonDenominator + numerator1 + numerator2, commonDenominator), reducedFraction(numerator1 * denominator2 - numerator2 * denominator1, commonDenominator)],
      `Resolución:\n1. Repetimos la operación completa y escribimos todos los términos con denominador ${commonDenominator}:\n${whole}+frac{${numerator1}}{${denominator1}}-frac{${numerator2}}{${denominator2}}=frac{${whole * commonDenominator}}{${commonDenominator}}+frac{${numerator1 * denominator2}}{${commonDenominator}}-frac{${numerator2 * denominator1}}{${commonDenominator}}.\n2. Mantenemos toda la igualdad y operamos los numeradores:\nfrac{${whole * commonDenominator}}{${commonDenominator}}+frac{${numerator1 * denominator2}}{${commonDenominator}}-frac{${numerator2 * denominator1}}{${commonDenominator}}=frac{${whole * commonDenominator}+${numerator1 * denominator2}-${numerator2 * denominator1}}{${commonDenominator}}=frac{${numerator}}{${commonDenominator}}.\n3. Simplificamos la fracción:\nfrac{${numerator}}{${commonDenominator}}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 7) {
    const productNumerator = numerator2 * numerator3;
    const productDenominator = denominator2 * denominator3;
    const numerator = numerator1 * productDenominator + productNumerator * denominator1;
    const commonDenominator = denominator1 * productDenominator;
    const result = reducedFraction(numerator, commonDenominator);
    return generatedQuestion(
      `Calcula y simplifica: ${numerator1}/${denominator1} + ${numerator2}/${denominator2} · ${numerator3}/${denominator3}`,
      result,
      [reducedFraction((numerator1 + numerator2) * numerator3, (denominator1 + denominator2) * denominator3), reducedFraction(numerator1 + productNumerator, denominator1 + productDenominator), reducedFraction(numerator1 * numerator2 * numerator3, denominator1 * denominator2 * denominator3)],
      `Resolución:\n1. Repetimos la operación completa y efectuamos primero la multiplicación:\nfrac{${numerator1}}{${denominator1}}+frac{${numerator2}}{${denominator2}}·frac{${numerator3}}{${denominator3}}=frac{${numerator1}}{${denominator1}}+frac{${productNumerator}}{${productDenominator}}.\n2. Conservamos toda la operación y pasamos a denominador común ${commonDenominator}:\nfrac{${numerator1}}{${denominator1}}+frac{${productNumerator}}{${productDenominator}}=frac{${numerator1 * productDenominator}}{${commonDenominator}}+frac{${productNumerator * denominator1}}{${commonDenominator}}.\n3. Sumamos y simplificamos:\nfrac{${numerator1 * productDenominator}}{${commonDenominator}}+frac{${productNumerator * denominator1}}{${commonDenominator}}=frac{${numerator}}{${commonDenominator}}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 8) {
    const sumNumerator = numerator1 * denominator2 + numerator2 * denominator1;
    const sumDenominator = denominator1 * denominator2;
    const result = reducedFraction(sumNumerator * numerator3, sumDenominator * denominator3);
    return generatedQuestion(
      `Calcula y simplifica: paren{frac{${numerator1}}{${denominator1}} + frac{${numerator2}}{${denominator2}}} · frac{${numerator3}}{${denominator3}}`,
      result,
      [reducedFraction(numerator1 * denominator2 + numerator2 * denominator1 * numerator3, sumDenominator * denominator3), reducedFraction((numerator1 + numerator2) * numerator3, (denominator1 + denominator2) * denominator3), reducedFraction(sumNumerator + numerator3, sumDenominator + denominator3)],
      `Resolución:\n1. Repetimos la operación completa y resolvemos el paréntesis:\nparen{frac{${numerator1}}{${denominator1}}+frac{${numerator2}}{${denominator2}}}·frac{${numerator3}}{${denominator3}}=paren{frac{${numerator1 * denominator2}}{${sumDenominator}}+frac{${numerator2 * denominator1}}{${sumDenominator}}}·frac{${numerator3}}{${denominator3}}=frac{${sumNumerator}}{${sumDenominator}}·frac{${numerator3}}{${denominator3}}.\n2. Multiplicamos numeradores y denominadores sin omitir la operación:\nfrac{${sumNumerator}}{${sumDenominator}}·frac{${numerator3}}{${denominator3}}=frac{${sumNumerator * numerator3}}{${sumDenominator * denominator3}}.\n3. Simplificamos:\nfrac{${sumNumerator * numerator3}}{${sumDenominator * denominator3}}=${result}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 10) {
    const result = reducedFraction(numerator1 * denominator2, denominator1 * numerator2);
    return generatedQuestion(
      `Calcula y simplifica el castillo de fracciones: castle{${numerator1}}{${denominator1}}{${numerator2}}{${denominator2}}`,
      result,
      [reducedFraction(numerator1 * numerator2, denominator1 * denominator2), reducedFraction(numerator1 * denominator1, numerator2 * denominator2), reducedFraction(numerator1 + numerator2, denominator1 + denominator2)],
      `Resolución:\n1. La fracción superior, ${numerator1}/${denominator1}, es el dividendo; la inferior, ${numerator2}/${denominator2}, es el divisor.\n2. Dividir por una fracción equivale a multiplicar por su inversa: ${numerator1}/${denominator1}:${numerator2}/${denominator2}=${numerator1}/${denominator1}·${denominator2}/${numerator2}.\n3. Multiplicamos numeradores y denominadores: ${numerator1 * denominator2}/${denominator1 * numerator2}.\n4. Simplificamos la fracción obtenida.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 11) {
    const base = 2 + (seed % 4);
    const rootValue = 2 + (Math.floor(seed / 7) % 4);
    const rootRadicand = rootValue ** 2;
    const commonDenominator = denominator1 * denominator2;
    const numerator = (base ** 2) * denominator2 + rootValue * denominator1;
    const result = reducedFraction(numerator, commonDenominator);
    return generatedQuestion(
      `Calcula y simplifica: frac{${base}^2}{${denominator1}} + frac{√${rootRadicand}}{${denominator2}}`,
      result,
      [reducedFraction(base + rootValue, denominator1 + denominator2), reducedFraction((base ** 2) * denominator2 + rootRadicand * denominator1, commonDenominator), reducedFraction((base ** 2) + rootValue, commonDenominator)],
      `Resolución:\n1. Antes de operar las fracciones, calculamos la potencia y la raíz: ${base}^2=${base ** 2} y √${rootRadicand}=${rootValue}.\n2. La operación queda ${base ** 2}/${denominator1}+${rootValue}/${denominator2}.\n3. Tomamos denominador común ${denominator1}·${denominator2}=${commonDenominator}.\n4. Sumamos los numeradores equivalentes: ${base ** 2}·${denominator2}+${rootValue}·${denominator1}=${numerator}.\n5. Simplificamos ${numerator}/${commonDenominator}.\nResultado final: ${result}.`
    );
  }
  const quotientNumerator = numerator2 * denominator3;
  const quotientDenominator = denominator2 * numerator3;
  const bracketNumerator = numerator1 * quotientDenominator + quotientNumerator * denominator1;
  const bracketDenominator = denominator1 * quotientDenominator;
  const wholeNumerator = whole * bracketDenominator;
  const differenceNumerator = wholeNumerator - bracketNumerator;
  const result = reducedFraction(differenceNumerator, bracketDenominator);
  return generatedQuestion(
    `Calcula y simplifica: ${whole} - bracket{frac{${numerator1}}{${denominator1}} + paren{frac{${numerator2}}{${denominator2}} : frac{${numerator3}}{${denominator3}}}}`,
    result,
    [reducedFraction(whole * bracketDenominator + bracketNumerator, bracketDenominator), reducedFraction(whole - numerator1 - quotientNumerator, bracketDenominator), reducedFraction(whole * denominator1 - numerator1, denominator1)],
    `Resolución:\n1. Empezamos por el paréntesis interior y mantenemos escrita la operación completa:\n${whole}-bracket{frac{${numerator1}}{${denominator1}}+paren{frac{${numerator2}}{${denominator2}}:frac{${numerator3}}{${denominator3}}}}=${whole}-bracket{frac{${numerator1}}{${denominator1}}+paren{frac{${numerator2}}{${denominator2}}·frac{${denominator3}}{${numerator3}}}}=${whole}-bracket{frac{${numerator1}}{${denominator1}}+frac{${quotientNumerator}}{${quotientDenominator}}}.\n2. Sumamos dentro del corchete mostrando las fracciones equivalentes:\n${whole}-bracket{frac{${numerator1 * quotientDenominator}}{${bracketDenominator}}+frac{${quotientNumerator * denominator1}}{${bracketDenominator}}}=${whole}-bracket{frac{${numerator1 * quotientDenominator}+${quotientNumerator * denominator1}}{${bracketDenominator}}}=${whole}-frac{${bracketNumerator}}{${bracketDenominator}}.\n3. Escribimos el entero con el mismo denominador y restamos:\n${whole}-frac{${bracketNumerator}}{${bracketDenominator}}=frac{${wholeNumerator}}{${bracketDenominator}}-frac{${bracketNumerator}}{${bracketDenominator}}=frac{${wholeNumerator}-${bracketNumerator}}{${bracketDenominator}}=frac{${differenceNumerator}}{${bracketDenominator}}.\n4. Simplificamos:\nfrac{${differenceNumerator}}{${bracketDenominator}}=${result}.\nResultado final: ${result}.`
  );
}

function generatedProportionLevelQuestion(difficulty, seed) {
  const units = 2 + (seed % 7);
  const price = 3 + ((seed * 2) % 8);
  const requested = units + 3 + (seed % 4);
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      const servings = 3 + (seed % 5);
      const newServings = servings * 2;
      const flour = 100 + (seed % 6) * 25;
      return generatedQuestion(
        `Una receta para ${servings} personas necesita ${flour} g de harina. ¿Cuánta harina se necesita para ${newServings} personas?`,
        `${flour * 2} g`,
        [`${flour + newServings} g`, `${flour / 2} g`, `${flour * servings} g`],
        `Resolución:\n1. ${newServings} es el doble de ${servings}.\n2. La harina también debe duplicarse: ${flour}·2=${flour * 2}.\nResultado final: ${flour * 2} g.`
      );
    }
    if (operation === 2) {
      const total = 100 + (seed % 9) * 20;
      const percentage = [10, 20, 25, 50][seed % 4];
      const result = total * percentage / 100;
      return generatedQuestion(
        `Calcula el ${percentage}% de ${total}.`,
        result,
        [total - result, total * percentage, result + percentage],
        `Resolución:\n1. Escribimos ${percentage}% como ${percentage}/100.\n2. Multiplicamos: ${total}·${percentage}/100=${result}.\nResultado final: ${result}.`
      );
    }
    if (operation === 3) {
      const mapDistance = 2 + (seed % 7);
      const scale = 50000;
      const realKm = mapDistance * scale / 100000;
      return generatedQuestion(
        `En un mapa a escala 1:${scale}, dos lugares están separados ${mapDistance} cm. ¿Qué distancia real hay entre ellos?`,
        `${decimalAnswer(realKm)} km`,
        [`${mapDistance * scale} km`, `${mapDistance / 2} km`, `${mapDistance * 5} km`],
        `Resolución:\n1. La distancia real en centímetros es ${mapDistance}·${scale}=${mapDistance * scale} cm.\n2. Pasamos de centímetros a kilómetros dividiendo entre 100000.\nResultado final: ${decimalAnswer(realKm)} km.`
      );
    }
    const result = requested * price;
    return generatedQuestion(
      `Cada cuaderno cuesta ${price} €. ¿Cuánto cuestan ${requested} cuadernos?`,
      `${result} €`,
      [`${requested + price} €`, `${result - price} €`, `${result + requested} €`],
      `Resolución:\n1. Es una proporcionalidad directa: más cuadernos, mayor coste.\n2. Multiplicamos cantidad por precio: ${requested}·${price}=${result}.\nResultado final: ${result} €.`
    );
  }

  const original = 100 + (seed % 6) * 20;
  const discount = [10, 15, 20, 25][seed % 4];
  const increase = [5, 10][seed % 2];
  if (operation === 1) {
    const workers = 2 + (seed % 5);
    const days = 12 + (seed % 6) * 2;
    const newWorkers = workers * 2;
    const result = days / 2;
    return generatedQuestion(
      `Si ${workers} personas realizan un trabajo en ${days} días, ¿cuántos días tardarán ${newWorkers} personas al mismo ritmo?`,
      `${result} días`,
      [`${days * 2} días`, `${days} días`, `${days - workers} días`],
      `Resolución:
1. Ordenamos los datos en una tabla:
[[proportion-table headers="Magnitud|Situación inicial|Situación nueva" row1="Personas|${workers}|${newWorkers}" row2="Días|${days}|x"]]
2. A más personas, menos días se necesitan para realizar el mismo trabajo. Por tanto, es una proporcionalidad inversa.
3. En una proporcionalidad inversa igualamos los productos:
${workers}·${days}=${newWorkers}·x.
4. Despejamos x:
x=frac{${workers}·${days}}{${newWorkers}}=frac{${workers * days}}{${newWorkers}}=${result}.
Resultado final: ${result} días.`
    );
  }
  if (operation === 2) {
    const speed = 40 + (seed % 7) * 5;
    const hours = 2 + (seed % 4);
    const distance = speed * hours;
    return generatedQuestion(
      `Un vehículo circula a ${speed} km/h durante ${hours} horas. ¿Qué distancia recorre?`,
      `${distance} km`,
      [`${speed + hours} km`, `${distance / hours} km`, `${distance + speed} km`],
      `Resolución:\n1. Usamos distancia=velocidad·tiempo.\n2. d=${speed}·${hours}=${distance}.\nResultado final: ${distance} km.`
      );
  }
  if (operation === 3) {
    const kilograms = 2 + (seed % 6);
    const unitPrice = 3 + (seed % 8);
    const paid = kilograms * unitPrice;
    const requestedKg = kilograms + 3;
    const result = requestedKg * unitPrice;
    return generatedQuestion(
      `${kilograms} kg de fruta cuestan ${paid} €. Al mismo precio por kilogramo, ¿cuánto cuestan ${requestedKg} kg?`,
      `${result} €`,
      [`${paid + requestedKg} €`, `${unitPrice * kilograms * requestedKg} €`, `${result - unitPrice} €`],
      `Resolución:\n1. Calculamos el precio de 1 kg: ${paid}/${kilograms}=${unitPrice} €.\n2. Multiplicamos por ${requestedKg}: ${unitPrice}·${requestedKg}=${result}.\nResultado final: ${result} €.`
    );
  }
  const afterDiscount = original * (1 - discount / 100);
  const result = afterDiscount * (1 + increase / 100);
  return generatedQuestion(
    `Un artículo de ${original} € baja un ${discount}% y después sube un ${increase}%. ¿Cuál es su precio final?`,
    `${decimalAnswer(result)} €`,
    [`${decimalAnswer(original * (1 + (increase - discount) / 100))} €`, `${decimalAnswer(afterDiscount)} €`, `${decimalAnswer(original * (1 + increase / 100))} €`],
    `Resolución:
1. Convertimos el descuento en el factor que permanece:
100%−${discount}%=${100 - discount}%=frac{${100 - discount}}{100}=${decimalAnswer((100 - discount) / 100)}.
2. Convertimos el aumento en el factor por el que se multiplica:
100%+${increase}%=${100 + increase}%=frac{${100 + increase}}{100}=${decimalAnswer((100 + increase) / 100)}.
3. Aplicamos ambos factores, en ese orden, al precio inicial:
${original}·${decimalAnswer((100 - discount) / 100)}·${decimalAnswer((100 + increase) / 100)}
=${decimalAnswer(afterDiscount)}·${decimalAnswer((100 + increase) / 100)}
=${decimalAnswer(result)} €.
Resultado final: ${decimalAnswer(result)} €.`
  );
}

function generatedAlgebraLevelQuestion(difficulty, seed) {
  const a = 2 + (seed % 7);
  const b = 3 + ((seed * 2) % 8);
  const value = 1 + (seed % 5);
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Reduce términos semejantes: ${a}x + ${b}x - ${value}x`,
        `${a + b - value}x`,
        [`${a + b + value}x`, `${a * b - value}x`, `${a + b - value}`],
        `Resolución:\n1. Todos los términos tienen la misma parte literal x.\n2. Operamos sus coeficientes: ${a}+${b}-${value}=${a + b - value}.\nResultado final: ${a + b - value}x.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Aplica la propiedad distributiva: ${a}(x+${value}).`,
        `${a}x + ${a * value}`,
        [`${a}x + ${value}`, `${a + value}x`, `${a}x + ${a + value}`],
        `Resolución:\n1. Multiplicamos ${a} por cada término del paréntesis.\n2. ${a}·x=${a}x y ${a}·${value}=${a * value}.\nResultado final: ${a}x+${a * value}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Multiplica los monomios: (${a}x^2)·(${value}x^3).`,
        `${a * value}x^5`,
        [`${a * value}x^6`, `${a + value}x^5`, `${a * value}x`],
        `Resolución:\n1. Multiplicamos los coeficientes: ${a}·${value}=${a * value}.\n2. Sumamos los exponentes de la misma base: x²·x³=x⁵.\nResultado final: ${a * value}x⁵.`
      );
    }
    const result = a * value + b;
    return generatedQuestion(
      `Calcula el valor de ${a}x + ${b} para x=${value}.`,
      result,
      [a + value + b, a * (value + b), result - b],
      `Resolución:\n1. Sustituimos x por ${value}: ${a}·${value}+${b}.\n2. Multiplicamos: ${a}·${value}=${a * value}.\n3. Sumamos ${b}.\nResultado final: ${result}.`
    );
  }

  if (operation === 1) {
    return generatedQuestion(
      `Extrae factor común: ${a * b}x^2 + ${a * value}x.`,
      `${a}x(${b}x + ${value})`,
      [`${a}(${b}x + ${value})`, `x(${a + b}x + ${value})`, `${a}x(${b}x - ${value})`],
      `Resolución:\n1. Los dos términos contienen ${a}x.\n2. Dividimos cada término entre ${a}x: ${a * b}x²/(${a}x)=${b}x y ${a * value}x/(${a}x)=${value}.\nResultado final: ${a}x(${b}x+${value}).`
    );
  }
  if (operation === 2) {
    return generatedQuestion(
      `Desarrolla y reduce: (${a}x+${value})(x+${b}).`,
      `${a}x^2 + ${a * b + value}x + ${value * b}`,
      [`${a}x^2 + ${a + b + value}x + ${value * b}`, `${a}x^2 + ${a * b - value}x + ${value * b}`, `${a}x^2 + ${a * b + value}x - ${value * b}`],
      `Resolución:\n1. Multiplicamos cada término del primer paréntesis por cada término del segundo.\n2. Obtenemos ${a}x²+${a * b}x+${value}x+${value * b}.\n3. Sumamos términos semejantes: ${a * b}x+${value}x=${a * b + value}x.\nResultado final: ${a}x²+${a * b + value}x+${value * b}.`
      );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Desarrolla la identidad notable: (${a}x+${value})^2.`,
      `${a * a}x^2 + ${2 * a * value}x + ${value * value}`,
      [`${a * a}x^2 + ${value * value}`, `${a * a}x^2 - ${2 * a * value}x + ${value * value}`, `${a}x^2 + ${2 * value}x + ${value * value}`],
      `Resolución:\n1. Usamos (u+v)²=u²+2uv+v².\n2. Tomamos u=${a}x y v=${value}.\n3. Sustituimos: (${a}x)²+2·${a}x·${value}+${value}².\nResultado final: ${a * a}x²+${2 * a * value}x+${value * value}.`
    );
  }
  return generatedQuestion(
    `Desarrolla y reduce: (x+${a})(x-${a}) + ${b}x`,
    `x^2 + ${b}x - ${a * a}`,
    [`x^2 - ${b}x - ${a * a}`, `x^2 + ${b}x + ${a * a}`, `2x^2 + ${b}x - ${a * a}`],
    `Resolución:\n1. Aplicamos suma por diferencia: (x+${a})(x-${a})=x²-${a * a}.\n2. Sumamos el término ${b}x.\n3. No hay más términos semejantes.\nResultado final: x²+${b}x-${a * a}.`
  );
}

function generatedFirstEsoAlgebraQuestion(difficulty, seed, progressionIndex = seed) {
  const position = ((progressionIndex % 10) + 10) % 10;
  const progressions = {
    easy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    medium: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    hard: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    topic: [0, 1, 2, 4, 6, 8, 10, 13, 15, 17]
  };
  const progressionStage = (progressions[difficulty] || progressions.topic)[position];
  const variant = Math.floor(seed / 3) % 2;
  const variable = ["x", "y", "a"][seed % 3];
  const a = 2 + (seed % 5);
  const b = 3 + (Math.floor(seed / 5) % 6);
  const c = 2 + (Math.floor(seed / 11) % 5);
  const exponent1 = 2 + (seed % 3);
  const exponent2 = 1 + (Math.floor(seed / 7) % 2);
  const secondLiteral = exponent2 === 1 ? "z" : `z^${exponent2}`;
  const solution = 2 + (seed % 8);

  const polynomialText = (terms) => {
    const visibleTerms = terms.filter(([coefficient]) => coefficient !== 0);
    if (!visibleTerms.length) return "0";
    return visibleTerms.map(([coefficient, literal], index) => {
      const absolute = Math.abs(coefficient);
      const numericPart = literal && absolute === 1 ? "" : String(absolute);
      const term = `${numericPart}${literal}` || "0";
      if (index === 0) return coefficient < 0 ? `-${term}` : term;
      return coefficient < 0 ? ` - ${term}` : ` + ${term}`;
    }).join("");
  };

  if (progressionStage === 0) {
    const coefficient = variant ? -a : a;
    const monomial = `${coefficient}${variable}^${exponent1}`;
    return generatedQuestion(
      `En el monomio ${monomial}, ¿cuál es el coeficiente?`,
      coefficient,
      [-coefficient, exponent1, `${variable}^${exponent1}`],
      `Resolución:\n1. El coeficiente es el número que multiplica a la parte literal.\n2. En ${monomial}, el número que multiplica a ${variable}^${exponent1} es ${coefficient}; el signo también forma parte del coeficiente.\nResultado final: el coeficiente es ${coefficient}.`
    );
  }
  if (progressionStage === 1) {
    const literal = `${variable}^${exponent1}${secondLiteral}`;
    return generatedQuestion(
      `En el monomio ${variant ? "-" : ""}${a}${literal}, ¿cuál es la parte literal?`,
      literal,
      [`${a}${literal}`, `${variable}^${exponent1 + exponent2}`, `${variable}z`],
      `Resolución:\n1. La parte literal está formada por las letras y sus exponentes.\n2. Separamos el coeficiente ${variant ? `-${a}` : a} de las letras.\nResultado final: la parte literal es ${literal}.`
    );
  }
  if (progressionStage === 2) {
    const degree = exponent1 + exponent2;
    const monomial = `${a}${variable}^${exponent1}${secondLiteral}`;
    return generatedQuestion(
      `¿Cuál es el grado del monomio ${monomial}?`,
      degree,
      [exponent1, exponent2, a + degree],
      `Resolución:\n1. El grado de un monomio es la suma de los exponentes de su parte literal.\n2. En ${monomial}, sumamos ${exponent1}+${exponent2}=${degree}.\nResultado final: el grado es ${degree}.`
    );
  }
  if (progressionStage === 3) {
    const literal = `${variable}^${exponent1}z`;
    return generatedQuestion(
      `¿Cuál de estos monomios es semejante a ${a}${literal}?`,
      `${variant ? "-" : ""}${b}${literal}`,
      [`${b}${variable}^${exponent1 + 1}z`, `${b}${variable}^${exponent1}z^2`, `${b}${variable}z^${exponent1}`],
      `Resolución:\n1. Dos monomios son semejantes cuando tienen exactamente la misma parte literal, con las mismas letras y exponentes.\n2. El coeficiente puede cambiar, pero la parte literal debe seguir siendo ${literal}.\nResultado final: ${variant ? "-" : ""}${b}${literal}.`
    );
  }
  if (progressionStage === 4) {
    const third = 1 + (seed % 4);
    const resultCoefficient = variant ? a + b - third : a + b + third;
    const sign = variant ? "-" : "+";
    return generatedQuestion(
      `Reduce los monomios semejantes: ${a}${variable} + ${b}${variable} ${sign} ${third}${variable}`,
      `${resultCoefficient}${variable}`,
      [`${a + b + (variant ? third : -third)}${variable}`, `${resultCoefficient}${variable}^2`, `${resultCoefficient}`],
      `Resolución:\n1. Los tres monomios tienen la misma parte literal ${variable}.\n2. Conservamos esa parte literal y operamos los coeficientes: ${a}+${b}${variant ? `-${third}` : `+${third}`}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${variable}.`
    );
  }
  if (progressionStage === 5) {
    const minuend = a + b + c;
    const resultCoefficient = minuend - b - (variant ? c : 0);
    const text = variant
      ? `${minuend}${variable} - (${b}${variable} + ${c}${variable})`
      : `${minuend}${variable} - ${b}${variable}`;
    return generatedQuestion(
      `Resta y reduce: ${text}`,
      `${resultCoefficient}${variable}`,
      [`${minuend + b + (variant ? c : 0)}${variable}`, `${minuend - b + (variant ? c : 0)}${variable}`, `${resultCoefficient}${variable}^2`],
      variant
        ? `Resolución:\n1. El signo menos afecta a los dos monomios del paréntesis: ${minuend}${variable}-${b}${variable}-${c}${variable}.\n2. Operamos los coeficientes: ${minuend}-${b}-${c}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${variable}.`
        : `Resolución:\n1. Los monomios son semejantes porque tienen la misma parte literal ${variable}.\n2. Restamos los coeficientes: ${minuend}-${b}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${variable}.`
    );
  }
  if (progressionStage === 6) {
    const coefficient = a * b;
    const degree = exponent1 + exponent2;
    return generatedQuestion(
      `Multiplica los monomios: (${variant ? "-" : ""}${a}${variable}^${exponent1}) · (${b}${variable}^${exponent2})`,
      `${variant ? "-" : ""}${coefficient}${variable}^${degree}`,
      [`${variant ? "-" : ""}${a + b}${variable}^${degree}`, `${coefficient}${variable}^${exponent1 * exponent2}`, `${variant ? "-" : ""}${coefficient}${variable}^${Math.abs(exponent1 - exponent2)}`],
      `Resolución:\n1. Multiplicamos los coeficientes: ${variant ? `(-${a})·${b}=-${coefficient}` : `${a}·${b}=${coefficient}`}.\n2. Al multiplicar potencias de la misma base, sumamos los exponentes: ${exponent1}+${exponent2}=${degree}.\nResultado final: ${variant ? "-" : ""}${coefficient}${variable}^${degree}.`
    );
  }
  if (progressionStage === 7) {
    const quotient = 2 + (seed % 4);
    const numeratorCoefficient = b * quotient;
    const numeratorExponent = exponent1 + exponent2;
    return generatedQuestion(
      `Divide los monomios: ${numeratorCoefficient}${variable}^${numeratorExponent} : ${b}${variable}^${exponent2}`,
      `${quotient}${variable}^${exponent1}`,
      [`${numeratorCoefficient + b}${variable}^${exponent1}`, `${quotient}${variable}^${numeratorExponent + exponent2}`, `${quotient}${variable}^${exponent2}`],
      `Resolución:\n1. Dividimos los coeficientes: ${numeratorCoefficient}:${b}=${quotient}.\n2. Al dividir potencias de la misma base, restamos los exponentes: ${numeratorExponent}-${exponent2}=${exponent1}.\nResultado final: ${quotient}${variable}^${exponent1}.`
    );
  }
  if (progressionStage === 8) {
    const polynomial = `${a}${variable}^2 - ${b}${variable} + ${c}`;
    return generatedQuestion(
      "¿Cuál de las siguientes expresiones es un polinomio?",
      polynomial,
      [`frac{${a}}{${variable}} + ${b}`, `√${variable} + ${c}`, `${a}^${variable} + ${b}`],
      `Resolución:\n1. Un polinomio es una suma o resta de monomios cuyos exponentes de las letras son números enteros no negativos.\n2. ${polynomial} cumple esa condición.\n3. Las otras expresiones tienen la variable en un denominador, dentro de una raíz o como exponente.\nResultado final: ${polynomial}.`
    );
  }
  if (progressionStage === 9) {
    const polynomial = `${a}${variable}^${exponent1} - ${b}${variable} + ${c}`;
    if (variant) {
      return generatedQuestion(
        `¿Cuál es el término independiente del polinomio ${polynomial}?`,
        c,
        [a, b, exponent1],
        `Resolución:\n1. El término independiente es el que no contiene ninguna letra.\n2. En ${polynomial}, ese término es ${c}.\nResultado final: el término independiente es ${c}.`
      );
    }
    return generatedQuestion(
      `¿Cuál es el grado del polinomio ${polynomial}?`,
      exponent1,
      [a, b, exponent1 + 1],
      `Resolución:\n1. El grado de un polinomio es el mayor grado de sus monomios.\n2. El término de mayor grado es ${a}${variable}^${exponent1}.\nResultado final: el grado es ${exponent1}.`
    );
  }
  if (progressionStage === 10) {
    const p = [[a, `${variable}^2`], [b, variable], [c, ""]];
    const q = [[c, `${variable}^2`], [variant ? -a : a, variable], [b, ""]];
    const result = [[a + c, `${variable}^2`], [b + (variant ? -a : a), variable], [b + c, ""]];
    return generatedQuestion(
      `Suma los polinomios: (${polynomialText(p)}) + (${polynomialText(q)})`,
      polynomialText(result),
      [polynomialText([[a - c, `${variable}^2`], [b + a, variable], [b - c, ""]]), polynomialText([[a + c, `${variable}^2`], [b, variable], [b + c, ""]]), polynomialText([[a + c, `${variable}^3`], [b + a, `${variable}^2`], [b + c, ""]])],
      `Resolución:\n1. Agrupamos los términos del mismo grado.\n2. Términos de grado 2: ${a}${variable}^2+${c}${variable}^2=${a + c}${variable}^2.\n3. Términos de grado 1: ${b}${variable}${variant ? `-${a}${variable}=${b - a}${variable}` : `+${a}${variable}=${b + a}${variable}`}.\n4. Términos independientes: ${c}+${b}=${b + c}.\nResultado final: ${polynomialText(result)}.`
    );
  }
  if (progressionStage === 11) {
    const p = [[a + c, `${variable}^2`], [b + c, variable], [a + b, ""]];
    const q = [[c, `${variable}^2`], [b, variable], [a, ""]];
    const result = [[a, `${variable}^2`], [c, variable], [b, ""]];
    return generatedQuestion(
      `Resta los polinomios: (${polynomialText(p)}) - (${polynomialText(q)})`,
      polynomialText(result),
      [polynomialText([[a + 2 * c, `${variable}^2`], [2 * b + c, variable], [2 * a + b, ""]]), polynomialText([[a, `${variable}^2`], [b + 2 * c, variable], [b, ""]]), polynomialText([[a, `${variable}^2`], [c, variable], [2 * a + b, ""]])],
      `Resolución:\n1. Quitamos el segundo paréntesis cambiando el signo de todos sus términos.\n2. Restamos los coeficientes de los términos semejantes: (${a + c}-${c})${variable}^2=${a}${variable}^2, (${b + c}-${b})${variable}=${c}${variable} y ${a + b}-${a}=${b}.\nResultado final: ${polynomialText(result)}.`
    );
  }
  if (progressionStage === 12) {
    if (variant) {
      const result = polynomialText([[a, `${variable}^2`], [a * b, variable], [-a * c, ""]]);
      return generatedQuestion(
        `Multiplica y reduce: ${a}(${variable}^2 + ${b}${variable} - ${c})`,
        result,
        [polynomialText([[a, `${variable}^2`], [b, variable], [-c, ""]]), polynomialText([[a, `${variable}^2`], [a + b, variable], [-a - c, ""]]), polynomialText([[a, `${variable}^3`], [a * b, `${variable}^2`], [-a * c, variable]])],
        `Resolución:\n1. Aplicamos la propiedad distributiva: multiplicamos ${a} por cada término.\n2. ${a}·${variable}^2=${a}${variable}^2, ${a}·${b}${variable}=${a * b}${variable} y ${a}·(-${c})=-${a * c}.\nResultado final: ${result}.`
      );
    }
    const result = polynomialText([[a * b, `${variable}^2`], [a * c, variable]]);
    return generatedQuestion(
      `Multiplica y reduce: ${a}${variable}(${b}${variable} + ${c})`,
      result,
      [polynomialText([[a + b, `${variable}^2`], [a + c, variable]]), polynomialText([[a * b, `${variable}^2`], [c, variable]]), polynomialText([[a * b, variable], [a * c, ""]])],
      `Resolución:\n1. Aplicamos la propiedad distributiva.\n2. ${a}${variable}·${b}${variable}=${a * b}${variable}^2.\n3. ${a}${variable}·${c}=${a * c}${variable}.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 13) {
    const term = 2 + (seed % 7);
    const right = variant ? solution - term : solution + term;
    const operator = variant ? "-" : "+";
    return generatedQuestion(
      `Resuelve la ecuación: ${variable} ${operator} ${term} = ${right}`,
      `${variable} = ${solution}`,
      [`${variable} = ${right}`, `${variable} = ${variant ? right - term : right + term}`, `${variable} = ${term}`],
      variant
        ? `Resolución:\n1. Sumamos ${term} en los dos miembros: ${variable}=${right}+${term}.\n2. Calculamos ${right}+${term}=${solution}.\n3. Comprobación: ${solution}-${term}=${right}.\nResultado final: ${variable}=${solution}.`
        : `Resolución:\n1. Restamos ${term} en los dos miembros: ${variable}=${right}-${term}.\n2. Calculamos ${right}-${term}=${solution}.\n3. Comprobación: ${solution}+${term}=${right}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 14) {
    const leftCoefficient = 4 + (seed % 4);
    const rightCoefficient = 1 + (Math.floor(seed / 5) % 3);
    const leftConstant = b;
    const rightConstant = (leftCoefficient - rightCoefficient) * solution + leftConstant;
    return generatedQuestion(
      `Resuelve la ecuación: ${leftCoefficient}${variable} + ${leftConstant} = ${rightCoefficient}${variable} + ${rightConstant}`,
      `${variable} = ${solution}`,
      [`${variable} = ${rightConstant - leftConstant}`, `${variable} = ${solution + leftConstant}`, `${variable} = ${leftCoefficient - rightCoefficient}`],
      `Resolución:\n1. Pasamos los términos con ${variable} al primer miembro y los números al segundo: ${leftCoefficient}${variable}-${rightCoefficient}${variable}=${rightConstant}-${leftConstant}.\n2. Reducimos: ${leftCoefficient - rightCoefficient}${variable}=${rightConstant - leftConstant}.\n3. Dividimos entre ${leftCoefficient - rightCoefficient}: ${variable}=${solution}.\n4. Comprobación: los dos miembros valen ${leftCoefficient * solution + leftConstant}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 15) {
    const shift = 1 + (seed % 5);
    const extra = 2 + (Math.floor(seed / 7) % 5);
    const right = a * (solution + shift) + extra;
    return generatedQuestion(
      `Resuelve la ecuación: ${a}(${variable} + ${shift}) + ${extra} = ${right}`,
      `${variable} = ${solution}`,
      [`${variable} = ${solution + shift}`, `${variable} = ${right - extra}`, `${variable} = ${solution - shift}`],
      `Resolución:\nAplicamos una transformación en cada línea y conservamos los dos miembros de la ecuación:\n${a}paren{${variable}+${shift}}+${extra}=${right}\n${a}${variable}+${a * shift}+${extra}=${right}\n${a}${variable}+${a * shift + extra}=${right}\n${a}${variable}=${right}-${a * shift + extra}\n${a}${variable}=${a * solution}\n${variable}=frac{${a * solution}}{${a}}=${solution}.\nComprobación: ${a}·paren{${solution}+${shift}}+${extra}=${right}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 16) {
    const leftCoefficient = a + 2;
    const rightCoefficient = a;
    const leftShift = 1 + (seed % 3);
    const rightShift = 1 + (Math.floor(seed / 5) % 3);
    const leftExtra = c;
    const leftValue = leftCoefficient * (solution - leftShift) + leftExtra;
    const rightExtra = leftValue - rightCoefficient * (solution + rightShift);
    const rightExtraText = rightExtra === 0 ? "" : rightExtra < 0 ? ` - ${Math.abs(rightExtra)}` : ` + ${rightExtra}`;
    return generatedQuestion(
      `Resuelve la ecuación: ${leftCoefficient}(${variable} - ${leftShift}) + ${leftExtra} = ${rightCoefficient}(${variable} + ${rightShift})${rightExtraText}`,
      `${variable} = ${solution}`,
      [`${variable} = ${solution + leftShift}`, `${variable} = ${solution - rightShift}`, `${variable} = ${leftCoefficient + rightCoefficient}`],
      `Resolución:\nAplicamos una transformación en cada línea y mantenemos completos ambos miembros:\n${leftCoefficient}paren{${variable}-${leftShift}}+${leftExtra}=${rightCoefficient}paren{${variable}+${rightShift}}${rightExtraText}\n${leftCoefficient}${variable}-${leftCoefficient * leftShift}+${leftExtra}=${rightCoefficient}${variable}+${rightCoefficient * rightShift}${rightExtraText}\n${leftCoefficient}${variable}${leftExtra - leftCoefficient * leftShift < 0 ? `-${Math.abs(leftExtra - leftCoefficient * leftShift)}` : `+${leftExtra - leftCoefficient * leftShift}`}=${rightCoefficient}${variable}${rightCoefficient * rightShift + rightExtra < 0 ? `-${Math.abs(rightCoefficient * rightShift + rightExtra)}` : `+${rightCoefficient * rightShift + rightExtra}`}\n${leftCoefficient}${variable}-${rightCoefficient}${variable}=${rightCoefficient * rightShift + rightExtra}-${leftExtra - leftCoefficient * leftShift}\n${leftCoefficient - rightCoefficient}${variable}=${(leftCoefficient - rightCoefficient) * solution}\n${variable}=frac{${(leftCoefficient - rightCoefficient) * solution}}{${leftCoefficient - rightCoefficient}}=${solution}.\nComprobación: al sustituir ${variable}=${solution}, ambos miembros valen ${leftValue}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 17) {
    const denominator = 2 + (seed % 5);
    const quotient = 2 + (Math.floor(seed / 7) % 6);
    const equationSolution = denominator * quotient;
    const extra = 1 + (seed % 4);
    const right = quotient + extra;
    return generatedQuestion(
      `Resuelve la ecuación: frac{${variable}}{${denominator}} + ${extra} = ${right}`,
      `${variable} = ${equationSolution}`,
      [`${variable} = ${quotient}`, `${variable} = ${right * denominator}`, `${variable} = ${equationSolution + extra}`],
      `Resolución:\nEscribimos la ecuación completa después de cada transformación:\nfrac{${variable}}{${denominator}}+${extra}=${right}\nfrac{${variable}}{${denominator}}=${right}-${extra}\nfrac{${variable}}{${denominator}}=${quotient}\n${variable}=${quotient}·${denominator}\n${variable}=${equationSolution}.\nComprobación: frac{${equationSolution}}{${denominator}}+${extra}=${quotient}+${extra}=${right}.\nResultado final: ${variable}=${equationSolution}.`
    );
  }
  if (progressionStage === 18) {
    const denominator1 = 2 + (seed % 3);
    const denominator2 = denominator1 + 1;
    const leastCommonMultiple = denominator1 * denominator2;
    const multiplier = 1 + (Math.floor(seed / 5) % 3);
    const equationSolution = leastCommonMultiple * multiplier;
    const right = equationSolution / denominator1 + equationSolution / denominator2;
    return generatedQuestion(
      `Resuelve la ecuación: frac{${variable}}{${denominator1}} + frac{${variable}}{${denominator2}} = ${right}`,
      `${variable} = ${equationSolution}`,
      [`${variable} = ${right}`, `${variable} = ${right * (denominator1 + denominator2)}`, `${variable} = ${leastCommonMultiple}`],
      `Resolución:\nEl m.c.m.(${denominator1},${denominator2}) es ${leastCommonMultiple}. Multiplicamos todos los términos y escribimos cada ecuación completa:\nfrac{${variable}}{${denominator1}}+frac{${variable}}{${denominator2}}=${right}\n${leastCommonMultiple}·frac{${variable}}{${denominator1}}+${leastCommonMultiple}·frac{${variable}}{${denominator2}}=${leastCommonMultiple}·${right}\n${denominator2}${variable}+${denominator1}${variable}=${right * leastCommonMultiple}\n${denominator1 + denominator2}${variable}=${right * leastCommonMultiple}\n${variable}=frac{${right * leastCommonMultiple}}{${denominator1 + denominator2}}=${equationSolution}.\nComprobación: frac{${equationSolution}}{${denominator1}}+frac{${equationSolution}}{${denominator2}}=${right}.\nResultado final: ${variable}=${equationSolution}.`
    );
  }
  const denominator1 = 2 + (seed % 3);
  const denominator2 = denominator1 + 1;
  const multiplier = 1 + (Math.floor(seed / 5) % 3);
  const equationSolution = denominator1 * denominator2 * multiplier;
  return generatedQuestion(
    `Resuelve la ecuación: frac{${variable}-${denominator1}}{${denominator1}} - frac{${variable}-${denominator2}}{${denominator2}} = ${multiplier}`,
    `${variable} = ${equationSolution}`,
    [`${variable} = ${multiplier}`, `${variable} = ${denominator1 * denominator2}`, `${variable} = ${equationSolution + denominator1 + denominator2}`],
    `Resolución:\nEl m.c.m.(${denominator1},${denominator2}) es ${denominator1 * denominator2}. Conservamos la ecuación completa en cada línea:\nfrac{${variable}-${denominator1}}{${denominator1}}-frac{${variable}-${denominator2}}{${denominator2}}=${multiplier}\n${denominator1 * denominator2}·frac{${variable}-${denominator1}}{${denominator1}}-${denominator1 * denominator2}·frac{${variable}-${denominator2}}{${denominator2}}=${denominator1 * denominator2}·${multiplier}\n${denominator2}paren{${variable}-${denominator1}}-${denominator1}paren{${variable}-${denominator2}}=${multiplier * denominator1 * denominator2}\n${denominator2}${variable}-${denominator1 * denominator2}-${denominator1}${variable}+${denominator1 * denominator2}=${multiplier * denominator1 * denominator2}\n${denominator2 - denominator1}${variable}=${multiplier * denominator1 * denominator2}\n${variable}=${equationSolution}.\nComprobación: frac{${equationSolution}-${denominator1}}{${denominator1}}-frac{${equationSolution}-${denominator2}}{${denominator2}}=${multiplier}.\nResultado final: ${variable}=${equationSolution}.`
  );
}

function generatedSecondEsoPolynomialQuestion(difficulty, seed, progressionIndex = seed) {
  const position = ((progressionIndex % 10) + 10) % 10;
  const progressions = {
    easy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    medium: [0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
    hard: [5, 6, 7, 8, 9, 10, 11, 12, 14, 15],
    topic: [17, 2, 3, 4, 16, 7, 8, 9, 12, 15]
  };
  const progressionStage = (progressions[difficulty] || progressions.topic)[position];
  const variant = Math.floor(seed / 3) % 2;
  const variable = ["x", "y", "a"][seed % 3];
  const a = 2 + (seed % 4);
  const b = 3 + (Math.floor(seed / 5) % 5);
  const c = 1 + (Math.floor(seed / 11) % 4);
  const d = 2 + (Math.floor(seed / 17) % 4);
  const exponent1 = 1 + (seed % 3);
  const exponent2 = 1 + (Math.floor(seed / 7) % 2);
  const powerText = (symbol, exponent) => exponent === 1 ? symbol : `${symbol}^${exponent}`;

  const polynomialText = (terms) => {
    const visibleTerms = terms.filter(([coefficient]) => coefficient !== 0);
    if (!visibleTerms.length) return "0";
    return visibleTerms.map(([coefficient, literal], index) => {
      const absolute = Math.abs(coefficient);
      const numericPart = literal && absolute === 1 ? "" : String(absolute);
      const term = `${numericPart}${literal}` || "0";
      if (index === 0) return coefficient < 0 ? `-${term}` : term;
      return coefficient < 0 ? ` - ${term}` : ` + ${term}`;
    }).join("");
  };

  if (progressionStage === 0) {
    const thirdSign = variant ? -1 : 1;
    const resultCoefficient = a + b + thirdSign * c;
    const literal = powerText(variable, exponent1);
    return generatedQuestion(
      `Suma y reduce los monomios: ${a}${literal} + ${b}${literal}${variant ? ` - ${c}${literal}` : ` + ${c}${literal}`}`,
      `${resultCoefficient}${literal}`,
      [`${a + b - thirdSign * c}${literal}`, `${resultCoefficient}${powerText(variable, exponent1 + 1)}`, `${a * b + c}${literal}`],
      `Resolución:\n1. Los monomios son semejantes porque tienen la misma parte literal ${literal}.\n2. Conservamos la parte literal y operamos los coeficientes: ${a}+${b}${variant ? `-${c}` : `+${c}`}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${literal}.`
    );
  }
  if (progressionStage === 1) {
    const minuend = a + b + c;
    const resultCoefficient = variant ? minuend - b + c : minuend - b - c;
    const literal = powerText(variable, exponent1);
    const expression = variant
      ? `${minuend}${literal} - (${b}${literal} - ${c}${literal})`
      : `${minuend}${literal} - ${b}${literal} - ${c}${literal}`;
    return generatedQuestion(
      `Resta y reduce los monomios: ${expression}`,
      `${resultCoefficient}${literal}`,
      [`${minuend + b + c}${literal}`, `${minuend - b + (variant ? -c : c)}${literal}`, `${resultCoefficient}${powerText(variable, exponent1 + 1)}`],
      variant
        ? `Resolución:\n1. El signo menos cambia los signos del paréntesis: ${minuend}${literal}-${b}${literal}+${c}${literal}.\n2. Operamos los coeficientes: ${minuend}-${b}+${c}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${literal}.`
        : `Resolución:\n1. Todos los monomios tienen la misma parte literal.\n2. Restamos sus coeficientes: ${minuend}-${b}-${c}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${literal}.`
    );
  }
  if (progressionStage === 2) {
    const coefficient = a * b;
    const exponent = exponent1 + exponent2;
    const sign = variant ? "-" : "";
    return generatedQuestion(
      `Multiplica los monomios: (${sign}${a}${powerText(variable, exponent1)}) · (${b}${powerText(variable, exponent2)})`,
      `${sign}${coefficient}${powerText(variable, exponent)}`,
      [`${sign}${a + b}${powerText(variable, exponent)}`, `${coefficient}${powerText(variable, exponent1 * exponent2)}`, `${sign}${coefficient}${powerText(variable, Math.abs(exponent1 - exponent2))}`],
      `Resolución:\n1. Multiplicamos los coeficientes: ${sign}${a}·${b}=${sign}${coefficient}.\n2. Sumamos los exponentes de la misma letra: ${exponent1}+${exponent2}=${exponent}.\nResultado final: ${sign}${coefficient}${powerText(variable, exponent)}.`
    );
  }
  if (progressionStage === 3) {
    const quotient = 2 + (seed % 4);
    const numeratorCoefficient = b * quotient;
    const numeratorExponent = exponent1 + exponent2;
    return generatedQuestion(
      `Divide los monomios: ${numeratorCoefficient}${powerText(variable, numeratorExponent)} : ${b}${powerText(variable, exponent2)}`,
      `${quotient}${powerText(variable, exponent1)}`,
      [`${numeratorCoefficient - b}${powerText(variable, exponent1)}`, `${quotient}${powerText(variable, numeratorExponent + exponent2)}`, `${quotient}${powerText(variable, exponent2)}`],
      `Resolución:\n1. Dividimos los coeficientes: ${numeratorCoefficient}:${b}=${quotient}.\n2. Restamos los exponentes de la misma letra: ${numeratorExponent}-${exponent2}=${exponent1}.\nResultado final: ${quotient}${powerText(variable, exponent1)}.`
    );
  }
  if (progressionStage === 4) {
    const outerExponent = 2 + (seed % 2);
    const signedCoefficient = variant ? -a : a;
    const resultCoefficient = signedCoefficient ** outerExponent;
    const resultLiteral = `${variable}^${exponent1 * outerExponent}z^${outerExponent}`;
    return generatedQuestion(
      `Calcula la potencia del monomio: (${signedCoefficient}${powerText(variable, exponent1)}z)^${outerExponent}`,
      `${resultCoefficient}${resultLiteral}`,
      [`${signedCoefficient * outerExponent}${resultLiteral}`, `${resultCoefficient}${variable}^${exponent1 + outerExponent}z^${outerExponent}`, `${resultCoefficient}${variable}^${exponent1 * outerExponent}z`],
      `Resolución:\n1. Elevamos el coeficiente: (${signedCoefficient})^${outerExponent}=${resultCoefficient}.\n2. Multiplicamos cada exponente de la parte literal por ${outerExponent}: (${variable}^${exponent1})^${outerExponent}=${variable}^${exponent1 * outerExponent} y z^${outerExponent}.\nResultado final: ${resultCoefficient}${resultLiteral}.`
    );
  }
  if (progressionStage === 5) {
    const p = [[a, `${variable}^2`], [b, variable], [c, ""]];
    const q = [[d, `${variable}^2`], [variant ? -c : c, variable], [b, ""]];
    const result = [[a + d, `${variable}^2`], [b + (variant ? -c : c), variable], [b + c, ""]];
    return generatedQuestion(
      `Suma los polinomios: (${polynomialText(p)}) + (${polynomialText(q)})`,
      polynomialText(result),
      [polynomialText([[a - d, `${variable}^2`], [b + c, variable], [b - c, ""]]), polynomialText([[a + d, `${variable}^2`], [b, variable], [b + c, ""]]), polynomialText([[a + d, `${variable}^3`], [b + c, `${variable}^2`], [b + c, ""]])],
      `Resolución:\n1. Agrupamos términos semejantes, es decir, los que tienen el mismo grado.\n2. Grado 2: ${a}+${d}=${a + d}. Grado 1: ${b}${variant ? `-${c}=${b - c}` : `+${c}=${b + c}`}. Términos independientes: ${c}+${b}=${b + c}.\nResultado final: ${polynomialText(result)}.`
    );
  }
  if (progressionStage === 6) {
    const p = [[a + d, `${variable}^2`], [b + c, variable], [a + b, ""]];
    const q = [[d, `${variable}^2`], [b, variable], [a, ""]];
    const result = [[a, `${variable}^2`], [c, variable], [b, ""]];
    return generatedQuestion(
      `Resta los polinomios: (${polynomialText(p)}) - (${polynomialText(q)})`,
      polynomialText(result),
      [polynomialText([[a + 2 * d, `${variable}^2`], [2 * b + c, variable], [2 * a + b, ""]]), polynomialText([[a, `${variable}^2`], [b + 2 * c, variable], [b, ""]]), polynomialText([[a, `${variable}^2`], [c, variable], [2 * a + b, ""]])],
      `Resolución:\n1. Quitamos el segundo paréntesis cambiando el signo de todos sus términos.\n2. Restamos los coeficientes de cada grado: ${a + d}-${d}=${a}, ${b + c}-${b}=${c} y ${a + b}-${a}=${b}.\nResultado final: ${polynomialText(result)}.`
    );
  }
  if (progressionStage === 7) {
    const quotientTerms = [[b, `${variable}^2`], [variant ? -c : c, variable], [d, ""]];
    const result = [[a * b, `${variable}^3`], [a * (variant ? -c : c), `${variable}^2`], [a * d, variable]];
    return generatedQuestion(
      `Multiplica el polinomio por el monomio: ${a}${variable} · (${polynomialText(quotientTerms)})`,
      polynomialText(result),
      [polynomialText([[a + b, `${variable}^3`], [a + c, `${variable}^2`], [a + d, variable]]), polynomialText([[a * b, `${variable}^2`], [a * (variant ? -c : c), variable], [a * d, ""]]), polynomialText([[a * b, `${variable}^3`], [a * c, `${variable}^2`], [d, variable]])],
      `Resolución:\n1. Aplicamos la propiedad distributiva: multiplicamos ${a}${variable} por cada término del polinomio.\n2. Multiplicamos coeficientes y sumamos los exponentes de ${variable}.\n3. Los productos son ${a * b}${variable}^3, ${a * (variant ? -c : c)}${variable}^2 y ${a * d}${variable}.\nResultado final: ${polynomialText(result)}.`
    );
  }
  if (progressionStage === 8) {
    const quotient = [[b, `${variable}^2`], [variant ? -c : c, variable], [d, ""]];
    const dividend = [[a * b, `${variable}^3`], [a * (variant ? -c : c), `${variable}^2`], [a * d, variable]];
    return generatedQuestion(
      `Divide el polinomio entre el monomio: (${polynomialText(dividend)}) : (${a}${variable})`,
      polynomialText(quotient),
      [polynomialText([[a * b, `${variable}^2`], [a * c, variable], [a * d, ""]]), polynomialText([[b, `${variable}^3`], [variant ? -c : c, `${variable}^2`], [d, variable]]), polynomialText([[b, `${variable}^2`], [c, variable], [a * d, ""]])],
      `Resolución:\n1. Dividimos cada término del polinomio entre ${a}${variable}.\n2. Dividimos los coeficientes y restamos un exponente a ${variable}.\n3. Obtenemos ${polynomialText(quotient)}.\n4. Comprobación: al multiplicar el cociente por ${a}${variable}, recuperamos ${polynomialText(dividend)}.\nResultado final: ${polynomialText(quotient)}.`
    );
  }
  if (progressionStage === 9) {
    const result = polynomialText([[1, `${variable}^2`], [2 * a, variable], [a ** 2, ""]]);
    return generatedQuestion(
      `Desarrolla la identidad notable: (${variable} + ${a})^2`,
      result,
      [polynomialText([[1, `${variable}^2`], [a, variable], [a ** 2, ""]]), polynomialText([[1, `${variable}^2`], [-2 * a, variable], [a ** 2, ""]]), `${variable}^2 + ${a ** 2}`],
      `Resolución:\n1. Usamos (u+v)^2=u^2+2uv+v^2.\n2. Tomamos u=${variable} y v=${a}.\n3. (${variable}+${a})^2=${variable}^2+2·${variable}·${a}+${a}^2.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 10) {
    const result = polynomialText([[1, `${variable}^2`], [-2 * a, variable], [a ** 2, ""]]);
    return generatedQuestion(
      `Desarrolla la identidad notable: (${variable} - ${a})^2`,
      result,
      [polynomialText([[1, `${variable}^2`], [2 * a, variable], [a ** 2, ""]]), polynomialText([[1, `${variable}^2`], [-a, variable], [a ** 2, ""]]), `${variable}^2 - ${a ** 2}`],
      `Resolución:\n1. Usamos (u-v)^2=u^2-2uv+v^2.\n2. Tomamos u=${variable} y v=${a}.\n3. (${variable}-${a})^2=${variable}^2-2·${variable}·${a}+${a}^2.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 11) {
    const result = `${variable}^2 - ${a ** 2}`;
    return generatedQuestion(
      `Desarrolla la identidad notable: (${variable} + ${a})(${variable} - ${a})`,
      result,
      [`${variable}^2 + ${a ** 2}`, polynomialText([[1, `${variable}^2`], [-2 * a, variable], [a ** 2, ""]]), polynomialText([[1, `${variable}^2`], [2 * a, variable], [a ** 2, ""]])],
      `Resolución:\n1. Usamos (u+v)(u-v)=u^2-v^2.\n2. Tomamos u=${variable} y v=${a}.\n3. Los términos centrales se anulan.\nResultado final: ${result}.`
    );
  }
  if (progressionStage === 12) {
    const sign = variant ? -1 : 1;
    const development = polynomialText([[1, `${variable}^2`], [sign * 2 * a, variable], [a ** 2, ""]]);
    const identity = `(${variable} ${variant ? "-" : "+"} ${a})^2`;
    return generatedQuestion(
      `¿De qué identidad notable procede el desarrollo ${development}?`,
      identity,
      [`(${variable} ${variant ? "+" : "-"} ${a})^2`, `(${variable}+${a})(${variable}-${a})`, `${variable}^2 ${variant ? "-" : "+"} ${a}^2`],
      `Resolución:\n1. Comparamos con u^2±2uv+v^2=(u±v)^2.\n2. El primer término es ${variable}^2, el último es ${a}^2 y el término central es ${sign * 2 * a}${variable}=2·${variable}·(${variant ? `-${a}` : a}).\nResultado final: procede de ${identity}.`
    );
  }
  if (progressionStage === 13) {
    const development = polynomialText([[a ** 2, `${variable}^2`], [2 * a * b, variable], [b ** 2, ""]]);
    return generatedQuestion(
      `Identifica la identidad notable que origina ${development}.`,
      `(${a}${variable} + ${b})^2`,
      [`(${a}${variable} - ${b})^2`, `(${a}${variable}+${b})(${a}${variable}-${b})`, `${a}${variable}^2 + ${b}^2`],
      `Resolución:\n1. Reconocemos u^2+2uv+v^2=(u+v)^2.\n2. Aquí u=${a}${variable} y v=${b}: u^2=${a ** 2}${variable}^2, 2uv=${2 * a * b}${variable} y v^2=${b ** 2}.\nResultado final: (${a}${variable}+${b})^2.`
    );
  }
  if (progressionStage === 14) {
    const development = `${a ** 2}${variable}^2 - ${b ** 2}`;
    return generatedQuestion(
      `¿De qué identidad notable procede ${development}?`,
      `(${a}${variable} + ${b})(${a}${variable} - ${b})`,
      [`(${a}${variable} - ${b})^2`, `(${a}${variable} + ${b})^2`, `(${a}${variable} - ${b})(${a}${variable} - ${b})`],
      `Resolución:\n1. Es una diferencia de cuadrados: u^2-v^2.\n2. Aplicamos u^2-v^2=(u+v)(u-v), con u=${a}${variable} y v=${b}.\nResultado final: (${a}${variable}+${b})(${a}${variable}-${b}).`
    );
  }
  if (progressionStage === 16) {
    const p = [[a, `${variable}^2`], [b, variable], [c, ""]];
    const q = [[d, `${variable}^2`], [-c, variable], [b, ""]];
    const sum = polynomialText([[a + d, `${variable}^2`], [b - c, variable], [b + c, ""]]);
    const difference = polynomialText([[a - d, `${variable}^2`], [b + c, variable], [c - b, ""]]);
    return generatedQuestion(
      `Dados P(${variable})=${polynomialText(p)} y Q(${variable})=${polynomialText(q)}, calcula P(${variable})+Q(${variable}) y P(${variable})-Q(${variable}).`,
      `P+Q = ${sum}; P-Q = ${difference}`,
      [`P+Q = ${difference}; P-Q = ${sum}`, `P+Q = ${polynomialText([[a + d, `${variable}^2`], [b + c, variable], [b + c, ""]])}; P-Q = ${difference}`, `P+Q = ${sum}; P-Q = ${polynomialText([[a - d, `${variable}^2`], [b - c, variable], [c + b, ""]])}`],
      `Resolución:\n1. Para sumar, agrupamos términos semejantes: P+Q=${sum}.\n2. Para restar, cambiamos primero el signo de todos los términos de Q y reducimos: P-Q=${difference}.\n3. Comprobamos cada grado por separado.\nResultado final: P+Q=${sum}; P-Q=${difference}.`
    );
  }
  if (progressionStage === 17) {
    const literal = powerText(variable, exponent1);
    const resultCoefficient = a + b - c + d;
    return generatedQuestion(
      `Suma, resta y reduce los monomios: ${a}${literal} + ${b}${literal} - (${c}${literal} - ${d}${literal})`,
      `${resultCoefficient}${literal}`,
      [`${a + b - c - d}${literal}`, `${a + b + c - d}${literal}`, `${resultCoefficient}${powerText(variable, exponent1 + 1)}`],
      `Resolución:\n1. El signo menos cambia los signos del paréntesis: ${a}${literal}+${b}${literal}-${c}${literal}+${d}${literal}.\n2. Como todos son semejantes, operamos los coeficientes: ${a}+${b}-${c}+${d}=${resultCoefficient}.\nResultado final: ${resultCoefficient}${literal}.`
    );
  }
  const commonFactor = `${a}${variable}`;
  const inside = variant
    ? [[b, `${variable}^2`], [-c, variable], [d, ""]]
    : [[b, variable], [c, ""]];
  const expanded = variant
    ? [[a * b, `${variable}^3`], [-a * c, `${variable}^2`], [a * d, variable]]
    : [[a * b, `${variable}^2`], [a * c, variable]];
  return generatedQuestion(
    `Extrae el factor común de ${polynomialText(expanded)}.`,
    `${commonFactor}(${polynomialText(inside)})`,
    [`${a}(${polynomialText(inside)})`, `${variable}(${polynomialText(expanded)})`, `${commonFactor}(${polynomialText(inside.map(([coefficient, literal]) => [coefficient + 1, literal]))})`],
    `Resolución:\n1. Buscamos el máximo factor que aparece en todos los términos: ${commonFactor}.\n2. Dividimos cada término entre ${commonFactor}; dentro del paréntesis queda ${polynomialText(inside)}.\n3. Comprobación: distribuimos ${commonFactor} y recuperamos ${polynomialText(expanded)}.\nResultado final: ${commonFactor}(${polynomialText(inside)}).`
  );
}

function generatedSecondEsoEquationQuestion(difficulty, seed, progressionIndex = seed) {
  const position = ((progressionIndex % 10) + 10) % 10;
  const progressions = {
    easy: [0, 0, 1, 1, 2, 2, 3, 3, 4, 5],
    medium: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10],
    hard: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    topic: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10]
  };
  const progressionStage = (progressions[difficulty] || progressions.topic)[position];
  const variant = Math.floor(seed / 3) % 2;
  const variable = ["x", "y"][seed % 2];
  const a = 2 + (seed % 4);
  const b = 2 + (Math.floor(seed / 5) % 6);
  const c = 1 + (Math.floor(seed / 11) % 5);
  const solution = 2 + (seed % 7);

  const polynomialText = (coefficient2, coefficient1, constant) => {
    const terms = [[coefficient2, `${variable}^2`], [coefficient1, variable], [constant, ""]].filter(([coefficient]) => coefficient !== 0);
    return terms.map(([coefficient, literal], index) => {
      const absolute = Math.abs(coefficient);
      const numeric = literal && absolute === 1 ? "" : String(absolute);
      const term = `${numeric}${literal}`;
      if (index === 0) return coefficient < 0 ? `-${term}` : term;
      return coefficient < 0 ? ` - ${term}` : ` + ${term}`;
    }).join("") || "0";
  };
  const solutionPair = (first, second) => first === second
    ? `${variable} = ${first}`
    : `${variable}_1 = ${first}, ${variable}_2 = ${second}`;

  if (progressionStage === 0) {
    const term = 2 + (seed % 6);
    const right = variant ? solution - term : solution + term;
    return generatedQuestion(
      `Resuelve la ecuación: ${variable} ${variant ? "-" : "+"} ${term} = ${right}`,
      `${variable} = ${solution}`,
      [`${variable} = ${right}`, `${variable} = ${variant ? right - term : right + term}`, `${variable} = ${term}`],
      variant
        ? `Resolución:\n1. Sumamos ${term} en los dos miembros: ${variable}=${right}+${term}.\n2. Calculamos ${right}+${term}=${solution}.\n3. Comprobación: ${solution}-${term}=${right}.\nResultado final: ${variable}=${solution}.`
        : `Resolución:\n1. Restamos ${term} en los dos miembros: ${variable}=${right}-${term}.\n2. Calculamos ${right}-${term}=${solution}.\n3. Comprobación: ${solution}+${term}=${right}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 1) {
    const right = a * solution + (variant ? -b : b);
    return generatedQuestion(
      `Resuelve la ecuación: ${a}${variable} ${variant ? "-" : "+"} ${b} = ${right}`,
      `${variable} = ${solution}`,
      [`${variable} = ${right}`, `${variable} = ${right - b}`, `${variable} = ${solution + a}`],
      `Resolución:\n1. Dejamos el término con ${variable} solo: ${a}${variable}=${right}${variant ? `+${b}` : `-${b}`}=${a * solution}.\n2. Dividimos los dos miembros entre ${a}: ${variable}=${solution}.\n3. Comprobamos sustituyendo ${variable}=${solution} en la ecuación inicial.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 2) {
    const leftCoefficient = a + 2;
    const rightCoefficient = 1 + (seed % 2);
    const leftConstant = c;
    const rightConstant = (leftCoefficient - rightCoefficient) * solution + leftConstant;
    return generatedQuestion(
      `Resuelve la ecuación: ${leftCoefficient}${variable} + ${leftConstant} = ${rightCoefficient}${variable} + ${rightConstant}`,
      `${variable} = ${solution}`,
      [`${variable} = ${rightConstant - leftConstant}`, `${variable} = ${solution + leftConstant}`, `${variable} = ${leftCoefficient - rightCoefficient}`],
      `Resolución:\n1. Pasamos los términos con ${variable} al primer miembro y los números al segundo: ${leftCoefficient}${variable}-${rightCoefficient}${variable}=${rightConstant}-${leftConstant}.\n2. Reducimos: ${leftCoefficient - rightCoefficient}${variable}=${rightConstant - leftConstant}.\n3. Dividimos entre ${leftCoefficient - rightCoefficient}: ${variable}=${solution}.\n4. Comprobación: ambos miembros valen ${leftCoefficient * solution + leftConstant}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 3) {
    const shift = 1 + (seed % 4);
    const extra = 1 + (Math.floor(seed / 7) % 5);
    const right = a * (solution + (variant ? -shift : shift)) + extra;
    return generatedQuestion(
      `Resuelve la ecuación: ${a}(${variable} ${variant ? "-" : "+"} ${shift}) + ${extra} = ${right}`,
      `${variable} = ${solution}`,
      [`${variable} = ${solution + shift}`, `${variable} = ${right - extra}`, `${variable} = ${solution - shift}`],
      `Resolución:\nAplicamos una transformación en cada línea y mantenemos completa la ecuación:\n${a}paren{${variable}${variant ? `-${shift}` : `+${shift}`}}+${extra}=${right}\n${a}${variable}${variant ? `-${a * shift}` : `+${a * shift}`}+${extra}=${right}\n${a}${variable}${(variant ? -a * shift : a * shift) + extra < 0 ? `-${Math.abs((variant ? -a * shift : a * shift) + extra)}` : `+${(variant ? -a * shift : a * shift) + extra}`}=${right}\n${a}${variable}=${a * solution}\n${variable}=frac{${a * solution}}{${a}}=${solution}.\nComprobamos sustituyendo ${variable}=${solution} en la ecuación original.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 4) {
    const leftCoefficient = a + 2;
    const rightCoefficient = a;
    const leftShift = 1 + (seed % 3);
    const rightShift = 1 + (Math.floor(seed / 5) % 3);
    const leftExtra = c;
    const leftValue = leftCoefficient * (solution - leftShift) + leftExtra;
    const rightExtra = leftValue - rightCoefficient * (solution + rightShift);
    const rightExtraText = rightExtra === 0 ? "" : rightExtra < 0 ? ` - ${Math.abs(rightExtra)}` : ` + ${rightExtra}`;
    return generatedQuestion(
      `Resuelve la ecuación: ${leftCoefficient}(${variable} - ${leftShift}) + ${leftExtra} = ${rightCoefficient}(${variable} + ${rightShift})${rightExtraText}`,
      `${variable} = ${solution}`,
      [`${variable} = ${solution + leftShift}`, `${variable} = ${solution - rightShift}`, `${variable} = ${leftCoefficient + rightCoefficient}`],
      `Resolución:\nSuprimimos un paréntesis y hacemos una transformación en cada línea:\n${leftCoefficient}paren{${variable}-${leftShift}}+${leftExtra}=${rightCoefficient}paren{${variable}+${rightShift}}${rightExtraText}\n${leftCoefficient}${variable}-${leftCoefficient * leftShift}+${leftExtra}=${rightCoefficient}${variable}+${rightCoefficient * rightShift}${rightExtraText}\n${leftCoefficient}${variable}${leftExtra - leftCoefficient * leftShift < 0 ? `-${Math.abs(leftExtra - leftCoefficient * leftShift)}` : `+${leftExtra - leftCoefficient * leftShift}`}=${rightCoefficient}${variable}${rightCoefficient * rightShift + rightExtra < 0 ? `-${Math.abs(rightCoefficient * rightShift + rightExtra)}` : `+${rightCoefficient * rightShift + rightExtra}`}\n${leftCoefficient}${variable}-${rightCoefficient}${variable}=${rightCoefficient * rightShift + rightExtra}-${leftExtra - leftCoefficient * leftShift}\n${leftCoefficient - rightCoefficient}${variable}=${(leftCoefficient - rightCoefficient) * solution}\n${variable}=frac{${(leftCoefficient - rightCoefficient) * solution}}{${leftCoefficient - rightCoefficient}}=${solution}.\nComprobación: ambos miembros valen ${leftValue}.\nResultado final: ${variable}=${solution}.`
    );
  }
  if (progressionStage === 5) {
    const denominator = 2 + (seed % 5);
    const quotient = 2 + (Math.floor(seed / 7) % 6);
    const equationSolution = denominator * quotient;
    const extra = 1 + (seed % 4);
    const right = quotient + extra;
    return generatedQuestion(
      `Resuelve la ecuación: frac{${variable}}{${denominator}} + ${extra} = ${right}`,
      `${variable} = ${equationSolution}`,
      [`${variable} = ${quotient}`, `${variable} = ${right * denominator}`, `${variable} = ${equationSolution + extra}`],
      `Resolución:\nConservamos completa la ecuación en cada línea:\nfrac{${variable}}{${denominator}}+${extra}=${right}\nfrac{${variable}}{${denominator}}=${right}-${extra}\nfrac{${variable}}{${denominator}}=${quotient}\n${variable}=${quotient}·${denominator}\n${variable}=${equationSolution}.\nComprobación: frac{${equationSolution}}{${denominator}}+${extra}=${right}.\nResultado final: ${variable}=${equationSolution}.`
    );
  }
  if (progressionStage === 6) {
    const denominator1 = 2 + (seed % 3);
    const denominator2 = denominator1 + 1;
    const leastCommonMultiple = denominator1 * denominator2;
    const multiplier = 1 + (Math.floor(seed / 5) % 3);
    const equationSolution = leastCommonMultiple * multiplier;
    const right = equationSolution / denominator1 + equationSolution / denominator2;
    return generatedQuestion(
      `Resuelve la ecuación: frac{${variable}}{${denominator1}} + frac{${variable}}{${denominator2}} = ${right}`,
      `${variable} = ${equationSolution}`,
      [`${variable} = ${right}`, `${variable} = ${right * leastCommonMultiple}`, `${variable} = ${leastCommonMultiple}`],
      `Resolución:\nEl m.c.m.(${denominator1},${denominator2}) es ${leastCommonMultiple}. Multiplicamos todos los términos y mostramos cada ecuación completa:\nfrac{${variable}}{${denominator1}}+frac{${variable}}{${denominator2}}=${right}\n${leastCommonMultiple}·frac{${variable}}{${denominator1}}+${leastCommonMultiple}·frac{${variable}}{${denominator2}}=${leastCommonMultiple}·${right}\n${denominator2}${variable}+${denominator1}${variable}=${right * leastCommonMultiple}\n${denominator1 + denominator2}${variable}=${right * leastCommonMultiple}\n${variable}=frac{${right * leastCommonMultiple}}{${denominator1 + denominator2}}=${equationSolution}.\nComprobamos sustituyendo en la ecuación original.\nResultado final: ${variable}=${equationSolution}.`
    );
  }
  if (progressionStage === 7 || progressionStage === 8) {
    const leading = progressionStage === 8 ? 2 + (seed % 3) : 1;
    const root1 = 2 + (seed % 4);
    let root2 = 1 + (Math.floor(seed / 7) % 4);
    if (root2 === root1) root2 += 1;
    if (variant) root2 = -root2;
    const coefficient1 = -leading * (root1 + root2);
    const constant = leading * root1 * root2;
    const discriminant = coefficient1 ** 2 - 4 * leading * constant;
    const squareRoot = Math.sqrt(discriminant);
    const equation = polynomialText(leading, coefficient1, constant);
    const correct = solutionPair(root1, root2);
    return generatedQuestion(
      `Resuelve mediante la fórmula general: ${equation} = 0`,
      correct,
      [solutionPair(-root1, -root2), solutionPair(root1 + 1, root2 - 1), `${variable} = ${-coefficient1}/${2 * leading}`],
      `Resolución:\n1. Identificamos los coeficientes de A${variable}^2+B${variable}+C=0: A=${leading}, B=${coefficient1} y C=${constant}.\n2. Aplicamos ${variable}=frac{-B±√(B^2-4AC)}{2A}.\n3. Calculamos el discriminante: Δ=(${coefficient1})^2-4·${leading}·(${constant})=${discriminant}; por tanto √Δ=${squareRoot}.\n4. Sustituimos: ${variable}=frac{${-coefficient1}±${squareRoot}}{${2 * leading}}.\n5. Obtenemos las dos soluciones y comprobamos que ambas anulan la ecuación.\nResultado final: ${correct}.`
    );
  }
  if (progressionStage === 9) {
    const root = 2 + (seed % 6);
    const coefficient = a;
    const constant = coefficient * root ** 2;
    return generatedQuestion(
      `Resuelve la ecuación incompleta despejando ${variable}^2: ${coefficient}${variable}^2 - ${constant} = 0`,
      `${variable} = ±${root}`,
      [`${variable} = ${root}`, `${variable} = ±${constant}`, `${variable} = ±${root ** 2}`],
      `Resolución:\n1. Pasamos ${constant} al segundo miembro: ${coefficient}${variable}^2=${constant}.\n2. Dividimos entre ${coefficient}: ${variable}^2=${root ** 2}.\n3. Tomamos las dos raíces cuadradas: ${variable}=±√${root ** 2}=±${root}.\n4. Comprobación: tanto ${root} como -${root} verifican la ecuación.\nResultado final: ${variable}=±${root}.`
    );
  }
  if (progressionStage === 10) {
    const otherRoot = 2 + (seed % 6);
    const linearCoefficient = variant ? -a * otherRoot : a * otherRoot;
    const secondRoot = -linearCoefficient / a;
    const equation = polynomialText(a, linearCoefficient, 0);
    return generatedQuestion(
      `Resuelve la ecuación incompleta sacando factor común: ${equation} = 0`,
      solutionPair(0, secondRoot),
      [solutionPair(0, -secondRoot), `${variable} = ${secondRoot}`, `${variable} = ${-linearCoefficient}`],
      `Resolución:\n1. Los dos términos contienen ${variable}; sacamos factor común: ${equation}=${variable}(${a}${variable}${linearCoefficient < 0 ? `-${Math.abs(linearCoefficient)}` : `+${linearCoefficient}`}).\n2. Aplicamos la propiedad del producto nulo: ${variable}=0 o ${a}${variable}${linearCoefficient < 0 ? `-${Math.abs(linearCoefficient)}` : `+${linearCoefficient}`}=0.\n3. De la segunda ecuación obtenemos ${variable}=${secondRoot}.\n4. Comprobamos las dos soluciones en la ecuación original.\nResultado final: ${solutionPair(0, secondRoot)}.`
    );
  }
  return generatedQuestion(
    `Resuelve la ecuación incompleta: ${a}${variable}^2 = 0`,
    `${variable} = 0`,
    [`${variable} = ${a}`, `${variable} = ±${a}`, `${variable} = 1`],
    `Resolución:\n1. Dividimos entre ${a}: ${variable}^2=0.\n2. La única raíz cuadrada de 0 es 0.\n3. Comprobación: ${a}·0^2=0.\nResultado final: ${variable}=0.`
  );
}

function generatedEquationLevelQuestion(lower, difficulty, seed) {
  const a = 2 + (seed % 7);
  const solution = 3 + ((seed * 2) % 9);
  const b = 4 + (seed % 8);
  const operation = seed % 4;

  if (lower.includes("sistema")) {
    const x = solution;
    const y = 1 + (seed % 6);
    const systems = [
      { text: `{ 2x + y = ${2 * x + y} ; x - y = ${x - y} }`, step: "Sumamos las ecuaciones después de multiplicar la segunda cuando sea necesario." },
      { text: `{ x + y = ${x + y} ; x - 2y = ${x - 2 * y} }`, step: "Restamos la segunda ecuación de la primera para eliminar x." },
      { text: `{ 3x - y = ${3 * x - y} ; 2x + y = ${2 * x + y} }`, step: "Sumamos las dos ecuaciones para eliminar y." },
      { text: `{ x + 2y = ${x + 2 * y} ; 3x - y = ${3 * x - y} }`, step: "Multiplicamos la segunda ecuación por 2 y la sumamos con la primera para eliminar y." }
    ];
    const selected = systems[operation];
    return generatedQuestion(
      `Resuelve el sistema: ${selected.text}`,
      `x = ${x}, y = ${y}`,
      [`x = ${y}, y = ${x}`, `x = ${x + 1}, y = ${y - 1}`, `x = ${x - 1}, y = ${y + 1}`],
      `Resolución:\n1. Escribimos juntas las dos ecuaciones del sistema.\n2. ${selected.step}\n3. Obtenemos una ecuación con una sola incógnita y hallamos x=${x}.\n4. Sustituimos ese valor en una de las ecuaciones y obtenemos y=${y}.\n5. Comprobamos ambos valores en las dos ecuaciones.\nResultado final: x=${x}, y=${y}.`
    );
  }

  if (lower.includes("inecuacion")) {
    if (operation === 1) {
      return generatedQuestion(
        `Resuelve la inecuación: ${a}x + ${b} < ${a * solution + b}`,
        `x < ${solution}`,
        [`x > ${solution}`, `x < ${a * solution + b}`, `x ≤ ${solution - 1}`],
        `Resolución:\n1. Restamos ${b} en los dos miembros.\n2. Dividimos entre ${a}, que es positivo, y el signo no cambia.\nResultado final: x<${solution}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Resuelve la inecuación: -${a}x + ${b} ≤ ${-a * solution + b}`,
        `x ≥ ${solution}`,
        [`x ≤ ${solution}`, `x ≥ ${-a * solution + b}`, `x > ${solution + 1}`],
        `Resolución:\n1. Restamos ${b}: -${a}x≤${-a * solution}.\n2. Dividimos entre -${a}. Como es negativo, invertimos el signo de la desigualdad.\nResultado final: x≥${solution}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Resuelve la inecuación: ${a}(x+1) > ${a * (solution + 1)}`,
        `x > ${solution}`,
        [`x < ${solution}`, `x > ${solution + 1}`, `x ≥ ${a * solution}`],
        `Resolución:\n1. Dividimos entre ${a}, que es positivo: x+1>${solution + 1}.\n2. Restamos 1.\nResultado final: x>${solution}.`
      );
    }
    const right = a * solution - b;
    return generatedQuestion(
      `Resuelve la inecuación: ${a}x - ${b} ≥ ${right}`,
      `x ≥ ${solution}`,
      [`x ≤ ${solution}`, `x ≥ ${right}`, `x > ${solution + 1}`],
      `Resolución:\n1. Sumamos ${b}: ${a}x≥${right + b}.\n2. Dividimos entre ${a}, que es positivo, por lo que no cambia el signo.\nResultado final: x≥${solution}.`
    );
  }

  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Resuelve: ${a}x = ${a * solution}`,
        `x = ${solution}`,
        [`x = ${a * solution}`, `x = ${solution + a}`, `x = ${a}`],
        `Resolución:\n1. Dividimos los dos miembros entre ${a}.\n2. x=${a * solution}/${a}.\nResultado final: x=${solution}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Resuelve: x - ${a} = ${solution - a}`,
        `x = ${solution}`,
        [`x = ${solution - a}`, `x = ${solution - 2 * a}`, `x = ${solution + a}`],
        `Resolución:\n1. Sumamos ${a} en los dos miembros.\n2. x=${solution - a}+${a}.\nResultado final: x=${solution}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Resuelve: 2x + ${a} = ${2 * solution + a}`,
        `x = ${solution}`,
        [`x = ${2 * solution}`, `x = ${solution + a}`, `x = ${solution - a}`],
        `Resolución:\n1. Restamos ${a}: 2x=${2 * solution}.\n2. Dividimos entre 2.\nResultado final: x=${solution}.`
      );
    }
    return generatedQuestion(
      `Resuelve: x + ${a} = ${solution + a}`,
      `x = ${solution}`,
      [`x = ${solution + a}`, `x = ${a}`, `x = ${solution - a}`],
      `Resolución:\n1. Restamos ${a} en los dos miembros.\n2. x=${solution + a}-${a}.\nResultado final: x=${solution}.`
    );
  }

  if (operation === 1) {
    const right = a * (solution + 1) + b;
    return generatedQuestion(
      `Resuelve: ${a}(x+1)+${b}=${right}`,
      `x = ${solution}`,
      [`x = ${solution + 1}`, `x = ${right - b}`, `x = ${solution - 1}`],
      `Resolución:\n1. Restamos ${b}: ${a}(x+1)=${right - b}.\n2. Dividimos entre ${a}: x+1=${solution + 1}.\n3. Restamos 1.\nResultado final: x=${solution}.`
    );
  }
  if (operation === 2) {
    const right = a * solution - b * (solution - 1);
    return generatedQuestion(
      `Resuelve: ${a}x-${b}(x-1)=${right}`,
      `x = ${solution}`,
      [`x = ${solution - 1}`, `x = ${right}`, `x = ${solution + b}`],
      `Resolución:\n1. Quitamos el paréntesis: ${a}x-${b}x+${b}=${right}.\n2. Reducimos términos semejantes y dejamos los términos con x en un miembro.\n3. Dividimos entre su coeficiente.\nResultado final: x=${solution}.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Resuelve la ecuación con fracciones: frac{x}{${a}}+1=frac{${solution}}{${a}}+1`,
      `x = ${solution}`,
      [`x = ${solution + a}`, `x = ${solution * a}`, `x = ${solution - a}`],
      `Resolución:\n1. Restamos 1 en los dos miembros: frac{x}{${a}}=frac{${solution}}{${a}}.\n2. Multiplicamos toda la igualdad por ${a}.\nResultado final: x=${solution}.`
    );
  }
  return generatedQuestion(
    `Resuelve: ${a}x-${b}=${a * solution - b}`,
    `x = ${solution}`,
    [`x = ${solution + 1}`, `x = ${a * solution - b}`, `x = ${solution - 1}`],
    `Resolución:\n1. Sumamos ${b} en los dos miembros.\n2. Dividimos toda la igualdad entre ${a}.\nResultado final: x=${solution}.`
  );
}

function geometryDiagramSvg(kind, labels = {}, caption = "Figura del ejercicio") {
  const value = (key, fallback = "") => escapeHtml(String(labels[key] ?? fallback));
  const diagrams = {
    rectangle: `<rect class="geo-fill" x="42" y="32" width="176" height="86" rx="3"/><text x="130" y="140">${value("base")}</text><text x="24" y="80">${value("height")}</text>`,
    square: `<rect class="geo-fill" x="70" y="24" width="116" height="106" rx="3"/><text x="128" y="148">${value("side")}</text><text x="48" y="78">${value("side")}</text>`,
    triangle: `<path class="geo-fill" d="M38 126 132 22 226 126Z"/><path class="geo-aux" d="M132 22V126"/><text x="128" y="145">${value("base")}</text><text x="139" y="78">${value("height")}</text>`,
    parallelogram: `<path class="geo-fill" d="M62 124 104 34H224L182 124Z"/><path class="geo-aux" d="M104 34V124"/><text x="133" y="145">${value("base")}</text><text x="109" y="82">${value("height")}</text>`,
    trapezoid: `<path class="geo-fill" d="M38 124 78 38H190L226 124Z"/><path class="geo-aux" d="M78 38V124"/><text x="128" y="145">${value("largeBase")}</text><text x="132" y="29">${value("smallBase")}</text><text x="83" y="82">${value("height")}</text>`,
    circle: `<circle class="geo-fill" cx="130" cy="78" r="54"/><path class="geo-line" d="M130 78H184"/><circle class="geo-point" cx="130" cy="78" r="3"/><text x="151" y="69">${value("radius")}</text>`,
    rhombus: `<path class="geo-fill" d="M130 18 222 78 130 138 38 78Z"/><path class="geo-aux" d="M38 78H222M130 18V138"/><text x="126" y="153">${value("smallDiagonal")}</text><text x="149" y="69">${value("largeDiagonal")}</text>`,
    pentagon: `<path class="geo-fill" d="M130 18 218 70 184 136H76L42 70Z"/><text x="130" y="151">${value("side")}</text>`,
    lshape: `<path class="geo-fill" d="M42 24H218V72H142V132H42Z"/><path class="geo-aux" d="M142 72H218V132H142"/><text x="126" y="151">${value("width")}</text><text x="17" y="80">${value("height")}</text><text x="167" y="105">${value("cut")}</text>`,
    cube: `<path class="geo-fill" d="M62 48 144 48 144 128 62 128Z"/><path class="geo-fill" d="M100 20 182 20 182 100 144 128 144 48Z"/><path class="geo-line" d="M62 48 100 20M144 48 182 20M144 128 182 100"/><text x="91" y="145">${value("side")}</text>`,
    box: `<path class="geo-fill" d="M38 58 150 58 150 128 38 128Z"/><path class="geo-fill" d="M92 24 218 24 218 92 150 128 150 58Z"/><path class="geo-line" d="M38 58 92 24M150 58 218 24M150 128 218 92"/><text x="91" y="146">${value("length")}</text><text x="181" y="118">${value("width")}</text><text x="18" y="94">${value("height")}</text>`,
    cylinder: `<ellipse class="geo-fill" cx="130" cy="36" rx="60" ry="18"/><path class="geo-fill" d="M70 36V118C70 142 190 142 190 118V36"/><ellipse class="geo-line" cx="130" cy="118" rx="60" ry="18"/><path class="geo-aux" d="M130 36H190M196 36V118"/><text x="157" y="29">${value("radius")}</text><text x="201" y="82">${value("height")}</text>`,
    cone: `<ellipse class="geo-fill" cx="130" cy="124" rx="70" ry="18"/><path class="geo-line" d="M60 124 130 20 200 124"/><path class="geo-aux" d="M130 20V124M130 124H200"/><text x="137" y="76">${value("height")}</text><text x="161" y="116">${value("radius")}</text>`,
    pyramid: `<path class="geo-fill" d="M48 116 138 92 216 120 122 142Z"/><path class="geo-line" d="M132 18 48 116M132 18 138 92M132 18 216 120M132 18 122 142"/><path class="geo-aux" d="M132 18V108"/><text x="139" y="66">${value("height")}</text><text x="72" y="138">${value("side")}</text>`,
    sphere: `<circle class="geo-fill" cx="130" cy="78" r="62"/><ellipse class="geo-aux" cx="130" cy="78" rx="62" ry="20"/><path class="geo-line" d="M130 78H192"/><text x="156" y="69">${value("radius")}</text>`,
    "triangular-prism": `<path class="geo-fill" d="M34 122 82 42 130 122Z"/><path class="geo-fill" d="M120 94 168 14 226 94Z"/><path class="geo-line" d="M34 122 120 94M82 42 168 14M130 122 226 94"/><path class="geo-aux" d="M82 42V122"/><text x="62" y="143">${value("base")}</text><text x="88" y="83">${value("height")}</text><text x="174" y="120">${value("length")}</text>`,
    "cylinder-net": `<rect class="geo-fill" x="42" y="42" width="132" height="82"/><circle class="geo-fill" cx="208" cy="54" r="28"/><circle class="geo-fill" cx="208" cy="116" r="28"/><text x="105" y="140">${value("circumference")}</text><text x="24" y="86">${value("height")}</text><text x="198" y="58">${value("radius")}</text>`,
    "hex-prism": `<path class="geo-fill" d="M54 48 94 24 136 48 136 94 94 118 54 94Z"/><path class="geo-fill" d="M126 28 166 8 210 30 210 76 168 100 126 76Z"/><path class="geo-line" d="M54 48 126 28M94 24 166 8M136 48 210 30M136 94 210 76M94 118 168 100M54 94 126 76"/><text x="169" y="122">${value("height")}</text><text x="46" y="140">Aᵦ=${value("baseArea")}</text>`,
    ladder: `<path class="geo-line geo-strong" d="M52 130 188 32"/><path class="geo-line" d="M52 130H188V32"/><path class="geo-right" d="M174 130V116H188"/><text x="112" y="70">${value("hypotenuse")}</text><text x="104" y="148">${value("base")}</text><text x="194" y="86">${value("height")}</text>`,
    "right-triangle": `<path class="geo-fill" d="M42 128H220L42 28Z"/><path class="geo-right" d="M42 112H58V128"/><text x="126" y="147">${value("base")}</text><text x="18" y="83">${value("height")}</text><text x="139" y="67">${value("hypotenuse")}</text>`,
    "rectangle-diagonal": `<rect class="geo-fill" x="42" y="32" width="176" height="96"/><path class="geo-strong" d="M42 128 218 32"/><text x="130" y="148">${value("base")}</text><text x="20" y="83">${value("height")}</text><text x="132" y="70">${value("diagonal")}</text>`,
    "isosceles-height": `<path class="geo-fill" d="M38 128 130 20 222 128Z"/><path class="geo-aux" d="M130 20V128"/><text x="79" y="70">${value("side")}</text><text x="137" y="82">${value("height")}</text><text x="78" y="147">${value("halfBase")}</text>`,
    "point-grid": `<path class="geo-grid" d="M30 20V138M70 20V138M110 20V138M150 20V138M190 20V138M230 20V138M30 28H230M30 68H230M30 108H230"/><path class="geo-strong" d="M50 118 210 38"/><circle class="geo-point" cx="50" cy="118" r="5"/><circle class="geo-point" cx="210" cy="38" r="5"/><text x="35" y="137">A</text><text x="216" y="31">B</text><text x="120" y="69">${value("distance")}</text>`,
    similarity: `<path class="geo-fill" d="M32 126 78 62 124 126Z"/><path class="geo-fill" d="M132 126 198 28 238 126Z"/><text x="52" y="143">${value("smallBase")}</text><text x="176" y="145">${value("largeBase")}</text><text x="78" y="74">${value("smallHeight")}</text><text x="202" y="63">${value("largeHeight")}</text>`
  };
  const safeCaption = escapeHtml(caption);
  return `<figure class="geometry-question-figure"><svg class="geometry-question-svg" viewBox="0 0 260 160" role="img" aria-label="${safeCaption}">${diagrams[kind] || diagrams.triangle}</svg><figcaption>${safeCaption}</figcaption></figure>`;
}

function withGeometryDiagram(question, kind, labels, caption) {
  return {
    ...question,
    statementHtml: `<div class="geometry-question-statement"><div class="geometry-question-copy">${formatMathText(question.text)}</div>${geometryDiagramSvg(kind, labels, caption)}</div>`
  };
}

function generatedSolidGeometryQuestion(difficulty, seed, variant) {
  const extra = difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 0;
  const a = 2 + extra + (seed % 5);
  const b = 3 + extra + (Math.floor(seed / 3) % 5);
  const c = 2 + extra + (Math.floor(seed / 7) % 4);
  let question;

  if (variant === 0) {
    const volume = a ** 3;
    question = generatedQuestion(`Calcula el volumen de un cubo de arista ${a} cm.`, `${volume} cm^3`, [`${a ** 2} cm^3`, `${6 * a ** 2} cm^3`, `${3 * a} cm^3`], `Resolución:\n1. El volumen de un cubo es V=a³.\n2. V=${a}³=${volume}.\nResultado final: ${volume} cm³.`);
    return withGeometryDiagram(question, "cube", { side: `${a} cm` }, "Cubo de arista conocida");
  }
  if (variant === 1) {
    const volume = a * b * c;
    question = generatedQuestion(`Calcula el volumen de un ortoedro de ${a} cm, ${b} cm y ${c} cm.`, `${volume} cm^3`, [`${2 * (a + b + c)} cm^3`, `${a * b} cm^3`, `${volume + c} cm^3`], `Resolución:\n1. El volumen de un ortoedro es V=largo·ancho·alto.\n2. V=${a}·${b}·${c}=${volume}.\nResultado final: ${volume} cm³.`);
    return withGeometryDiagram(question, "box", { length: `${a} cm`, width: `${b} cm`, height: `${c} cm` }, "Ortoedro con sus tres dimensiones");
  }
  if (variant === 2) {
    const coefficient = a ** 2 * b;
    question = generatedQuestion(`Calcula el volumen de un cilindro de radio ${a} cm y altura ${b} cm.`, `${coefficient}π cm^3`, [`${2 * a * b}π cm^3`, `${a ** 2}π cm^3`, `${coefficient * 2}π cm^3`], `Resolución:\n1. El volumen de un cilindro es V=πr²h.\n2. V=π·${a}²·${b}=${coefficient}π.\nResultado final: ${coefficient}π cm³.`);
    return withGeometryDiagram(question, "cylinder", { radius: `r=${a} cm`, height: `h=${b} cm` }, "Cilindro con radio y altura");
  }
  if (variant === 3) {
    const height = 3 * c;
    const coefficient = a ** 2 * c;
    question = generatedQuestion(`Calcula el volumen de un cono de radio ${a} cm y altura ${height} cm.`, `${coefficient}π cm^3`, [`${a ** 2 * height}π cm^3`, `${2 * a * height}π cm^3`, `${coefficient * 2}π cm^3`], `Resolución:\n1. El volumen de un cono es V=πr²h/3.\n2. V=π·${a}²·${height}/3=${coefficient}π.\nResultado final: ${coefficient}π cm³.`);
    return withGeometryDiagram(question, "cone", { radius: `r=${a} cm`, height: `h=${height} cm` }, "Cono con radio y altura");
  }
  if (variant === 4) {
    const height = 3 * c;
    const volume = a ** 2 * c;
    question = generatedQuestion(`Una pirámide de base cuadrada tiene lado ${a} cm y altura ${height} cm. Calcula su volumen.`, `${volume} cm^3`, [`${a ** 2 * height} cm^3`, `${4 * a * height} cm^3`, `${a * height} cm^3`], `Resolución:\n1. V=Aᵦ·h/3 y la base cuadrada tiene área Aᵦ=${a}²=${a ** 2}.\n2. V=${a ** 2}·${height}/3=${volume}.\nResultado final: ${volume} cm³.`);
    return withGeometryDiagram(question, "pyramid", { side: `${a} cm`, height: `h=${height} cm` }, "Pirámide de base cuadrada");
  }
  if (variant === 5) {
    const radius = 3 * (1 + (seed % 3));
    const coefficient = 4 * radius ** 3 / 3;
    question = generatedQuestion(`Calcula el volumen de una esfera de radio ${radius} cm.`, `${coefficient}π cm^3`, [`${4 * radius ** 2}π cm^3`, `${radius ** 3}π cm^3`, `${coefficient / 2}π cm^3`], `Resolución:\n1. El volumen de una esfera es V=4πr³/3.\n2. V=4π·${radius}³/3=${coefficient}π.\nResultado final: ${coefficient}π cm³.`);
    return withGeometryDiagram(question, "sphere", { radius: `r=${radius} cm` }, "Esfera con su radio");
  }
  if (variant === 6) {
    const triangleBase = 2 * a;
    const baseArea = triangleBase * b / 2;
    const volume = baseArea * c;
    question = generatedQuestion(`Un prisma triangular tiene una base triangular de base ${triangleBase} cm y altura ${b} cm. La longitud del prisma es ${c} cm. Calcula su volumen.`, `${volume} cm^3`, [`${triangleBase * b * c} cm^3`, `${baseArea} cm^3`, `${2 * baseArea + c} cm^3`], `Resolución:\n1. Área de la base triangular: Aᵦ=${triangleBase}·${b}/2=${baseArea} cm².\n2. Volumen del prisma: V=Aᵦ·L=${baseArea}·${c}=${volume}.\nResultado final: ${volume} cm³.`);
    return withGeometryDiagram(question, "triangular-prism", { base: `${triangleBase} cm`, height: `${b} cm`, length: `${c} cm` }, "Prisma triangular y medidas de su base");
  }
  if (variant === 7) {
    const lateralArea = 2 * a * b;
    question = generatedQuestion(`Calcula el área lateral de un cilindro de radio ${a} cm y altura ${b} cm.`, `${lateralArea}π cm^2`, [`${a ** 2 * b}π cm^2`, `${2 * a * (a + b)}π cm^2`, `${a * b}π cm^2`], `Resolución:\n1. Al desplegar la superficie lateral aparece un rectángulo de base 2πr y altura h.\n2. Aₗ=2πrh=2π·${a}·${b}=${lateralArea}π.\nResultado final: ${lateralArea}π cm².`);
    return withGeometryDiagram(question, "cylinder-net", { radius: `r=${a}`, height: `h=${b} cm`, circumference: `2πr` }, "Desarrollo lateral de un cilindro");
  }
  if (variant === 8) {
    const area = 6 * a ** 2;
    question = generatedQuestion(`Calcula el área total de un cubo de arista ${a} cm.`, `${area} cm^2`, [`${a ** 3} cm^2`, `${4 * a ** 2} cm^2`, `${6 * a} cm^2`], `Resolución:\n1. Un cubo tiene seis caras cuadradas.\n2. Cada cara mide ${a}²=${a ** 2} cm².\n3. Aₜ=6·${a ** 2}=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "cube", { side: `${a} cm` }, "Cubo para calcular el área de sus seis caras");
  }
  const baseArea = 12 + 2 * (seed % 10);
  const height = 4 + (seed % 7);
  const volume = baseArea * height;
  question = generatedQuestion(`Un prisma hexagonal tiene un área de base de ${baseArea} cm^2 y una altura de ${height} cm. Calcula su volumen.`, `${volume} cm^3`, [`${baseArea + height} cm^3`, `${2 * baseArea + height} cm^3`, `${baseArea * 2} cm^3`], `Resolución:\n1. En cualquier prisma, V=Aᵦ·h.\n2. V=${baseArea}·${height}=${volume}.\nResultado final: ${volume} cm³.`);
  return withGeometryDiagram(question, "hex-prism", { baseArea: `${baseArea} cm²`, height: `h=${height} cm` }, "Prisma hexagonal con área de base conocida");
}

function generatedPlaneGeometryQuestion(difficulty, seed, variant) {
  const extra = difficulty === "hard" ? 4 : difficulty === "medium" ? 2 : 0;
  const a = 3 + extra + (seed % 7);
  const b = 4 + extra + (Math.floor(seed / 3) % 7);
  let question;

  if (variant === 0) {
    const perimeter = 2 * (a + b);
    question = generatedQuestion(`Calcula el perímetro de un rectángulo de ${a} cm por ${b} cm.`, `${perimeter} cm`, [`${a * b} cm`, `${a + b} cm`, `${perimeter + 2} cm`], `Resolución:\n1. Un rectángulo tiene dos lados de cada medida.\n2. P=2·(${a}+${b})=${perimeter}.\nResultado final: ${perimeter} cm.`);
    return withGeometryDiagram(question, "rectangle", { base: `${b} cm`, height: `${a} cm` }, "Rectángulo con base y altura");
  }
  if (variant === 1) {
    const area = a ** 2;
    question = generatedQuestion(`Calcula el área de un cuadrado de lado ${a} cm.`, `${area} cm^2`, [`${4 * a} cm^2`, `${2 * a} cm^2`, `${a ** 3} cm^2`], `Resolución:\n1. El área de un cuadrado es A=l².\n2. A=${a}²=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "square", { side: `${a} cm` }, "Cuadrado con la medida de su lado");
  }
  if (variant === 2) {
    const base = 2 * a;
    const area = base * b / 2;
    question = generatedQuestion(`Calcula el área de un triángulo de base ${base} cm y altura ${b} cm.`, `${area} cm^2`, [`${base * b} cm^2`, `${base + b} cm^2`, `${2 * (base + b)} cm^2`], `Resolución:\n1. A=b·h/2.\n2. A=${base}·${b}/2=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "triangle", { base: `${base} cm`, height: `${b} cm` }, "Triángulo con base y altura perpendicular");
  }
  if (variant === 3) {
    const area = a * b;
    question = generatedQuestion(`Calcula el área de un paralelogramo de base ${b} cm y altura ${a} cm.`, `${area} cm^2`, [`${2 * (a + b)} cm^2`, `${area / 2} cm^2`, `${a + b} cm^2`], `Resolución:\n1. El área de un paralelogramo es A=b·h.\n2. A=${b}·${a}=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "parallelogram", { base: `${b} cm`, height: `${a} cm` }, "Paralelogramo con altura perpendicular");
  }
  if (variant === 4) {
    const smallBase = a;
    const largeBase = a + 4;
    const height = 2 * (2 + (seed % 4));
    const area = (smallBase + largeBase) * height / 2;
    question = generatedQuestion(`Calcula el área de un trapecio de bases ${smallBase} cm y ${largeBase} cm y altura ${height} cm.`, `${area} cm^2`, [`${(smallBase + largeBase) * height} cm^2`, `${largeBase * height} cm^2`, `${smallBase + largeBase + height} cm^2`], `Resolución:\n1. A=(B+b)·h/2.\n2. A=(${largeBase}+${smallBase})·${height}/2=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "trapezoid", { smallBase: `${smallBase} cm`, largeBase: `${largeBase} cm`, height: `${height} cm` }, "Trapecio con sus dos bases y altura");
  }
  if (variant === 5) {
    const area = a ** 2;
    question = generatedQuestion(`Calcula el área de un círculo de radio ${a} cm.`, `${area}π cm^2`, [`${2 * a}π cm^2`, `${a}π cm^2`, `${2 * area}π cm^2`], `Resolución:\n1. El área del círculo es A=πr².\n2. A=π·${a}²=${area}π.\nResultado final: ${area}π cm².`);
    return withGeometryDiagram(question, "circle", { radius: `r=${a} cm` }, "Círculo con su radio");
  }
  if (variant === 6) {
    const length = 2 * a;
    question = generatedQuestion(`Calcula la longitud de una circunferencia de radio ${a} cm.`, `${length}π cm`, [`${a ** 2}π cm`, `${a}π cm`, `${4 * a}π cm`], `Resolución:\n1. La longitud de una circunferencia es L=2πr.\n2. L=2π·${a}=${length}π.\nResultado final: ${length}π cm.`);
    return withGeometryDiagram(question, "circle", { radius: `r=${a} cm` }, "Circunferencia con radio conocido");
  }
  if (variant === 7) {
    const largeDiagonal = 2 * a;
    const smallDiagonal = b;
    const area = largeDiagonal * smallDiagonal / 2;
    question = generatedQuestion(`Calcula el área de un rombo cuyas diagonales miden ${largeDiagonal} cm y ${smallDiagonal} cm.`, `${decimalAnswer(area)} cm^2`, [`${largeDiagonal * smallDiagonal} cm^2`, `${largeDiagonal + smallDiagonal} cm^2`, `${2 * (largeDiagonal + smallDiagonal)} cm^2`], `Resolución:\n1. El área de un rombo es A=D·d/2.\n2. A=${largeDiagonal}·${smallDiagonal}/2=${decimalAnswer(area)}.\nResultado final: ${decimalAnswer(area)} cm².`);
    return withGeometryDiagram(question, "rhombus", { largeDiagonal: `D=${largeDiagonal} cm`, smallDiagonal: `d=${smallDiagonal} cm` }, "Rombo con sus dos diagonales");
  }
  if (variant === 8) {
    const perimeter = 5 * a;
    question = generatedQuestion(`Un pentágono regular tiene lado ${a} cm. Calcula su perímetro.`, `${perimeter} cm`, [`${a ** 2} cm`, `${4 * a} cm`, `${6 * a} cm`], `Resolución:\n1. Un pentágono regular tiene cinco lados iguales.\n2. P=5·l=5·${a}=${perimeter}.\nResultado final: ${perimeter} cm.`);
    return withGeometryDiagram(question, "pentagon", { side: `${a} cm` }, "Pentágono regular");
  }
  const width = a + b;
  const height = b;
  const cut = Math.min(a, b - 1);
  const area = width * height - cut ** 2;
  question = generatedQuestion(`Una figura en L se obtiene quitando un cuadrado de ${cut} cm de lado a un rectángulo de ${width} cm por ${height} cm. Calcula su área.`, `${area} cm^2`, [`${width * height} cm^2`, `${width * height - cut} cm^2`, `${(width - cut) * height} cm^2`], `Resolución:\n1. Área del rectángulo completo: ${width}·${height}=${width * height} cm².\n2. Área del cuadrado retirado: ${cut}²=${cut ** 2} cm².\n3. Restamos: ${width * height}-${cut ** 2}=${area}.\nResultado final: ${area} cm².`);
  return withGeometryDiagram(question, "lshape", { width: `${width} cm`, height: `${height} cm`, cut: `${cut} cm` }, "Figura compuesta en forma de L");
}

function generatedPythagorasGeometryQuestion(difficulty, seed, variant) {
  const extra = difficulty === "hard" ? 2 : difficulty === "medium" ? 1 : 0;
  const scale = 1 + extra + (seed % 11);
  const legA = 3 * scale;
  const legB = 4 * scale;
  const hypotenuse = 5 * scale;
  let question;

  if (variant === 0) {
    const area = legA * legB / 2;
    question = generatedQuestion(`Calcula el área de un triángulo rectángulo cuyos catetos miden ${legA} cm y ${legB} cm.`, `${area} cm^2`, [`${legA * legB} cm^2`, `${legA + legB} cm^2`, `${hypotenuse} cm^2`], `Resolución:\n1. Los catetos son base y altura.\n2. A=${legA}·${legB}/2=${area}.\nResultado final: ${area} cm².`);
    return withGeometryDiagram(question, "right-triangle", { base: `${legB} cm`, height: `${legA} cm`, hypotenuse: "" }, "Triángulo rectángulo para calcular su área");
  }
  if (variant === 1) {
    question = generatedQuestion(`En un triángulo rectángulo los catetos miden ${legA} cm y ${legB} cm. Calcula la hipotenusa.`, `${hypotenuse} cm`, [`${legA + legB} cm`, `${hypotenuse + scale} cm`, `${legB - legA} cm`], `Resolución:\n1. Por Pitágoras, h²=${legA}²+${legB}².\n2. h²=${legA ** 2}+${legB ** 2}=${hypotenuse ** 2}.\n3. h=√${hypotenuse ** 2}=${hypotenuse}.\nResultado final: ${hypotenuse} cm.`);
    return withGeometryDiagram(question, "right-triangle", { base: `${legB} cm`, height: `${legA} cm`, hypotenuse: "h" }, "Triángulo rectángulo con hipotenusa desconocida");
  }
  if (variant === 2) {
    question = generatedQuestion(`La hipotenusa de un triángulo rectángulo mide ${hypotenuse} cm y uno de sus catetos ${legA} cm. Calcula el otro cateto.`, `${legB} cm`, [`${hypotenuse - legA} cm`, `${hypotenuse + legA} cm`, `${legA + legB} cm`], `Resolución:\n1. Por Pitágoras, b²=h²−a².\n2. b²=${hypotenuse}²−${legA}²=${hypotenuse ** 2}-${legA ** 2}=${legB ** 2}.\n3. b=√${legB ** 2}=${legB}.\nResultado final: ${legB} cm.`);
    return withGeometryDiagram(question, "right-triangle", { base: "b", height: `${legA} cm`, hypotenuse: `${hypotenuse} cm` }, "Triángulo rectángulo con un cateto desconocido");
  }
  if (variant === 3) {
    question = generatedQuestion(`Una escalera se apoya en una pared. Su base está a ${legA} m de la pared y alcanza ${legB} m de altura. ¿Cuánto mide la escalera?`, `${hypotenuse} m`, [`${legA + legB} m`, `${hypotenuse - scale} m`, `${legB} m`], `Resolución:\n1. Pared, suelo y escalera forman un triángulo rectángulo; la escalera es la hipotenusa.\n2. L²=${legA}²+${legB}²=${hypotenuse ** 2}.\n3. L=${hypotenuse}.\nResultado final: ${hypotenuse} m.`);
    return withGeometryDiagram(question, "ladder", { base: `${legA} m`, height: `${legB} m`, hypotenuse: "L" }, "Escalera apoyada en una pared");
  }
  if (variant === 4) {
    question = generatedQuestion(`Un rectángulo mide ${legA} cm de alto y ${legB} cm de ancho. Calcula su diagonal.`, `${hypotenuse} cm`, [`${legA + legB} cm`, `${legB - legA} cm`, `${hypotenuse + scale} cm`], `Resolución:\n1. La diagonal es la hipotenusa del triángulo formado por los lados.\n2. d²=${legA}²+${legB}²=${hypotenuse ** 2}.\n3. d=${hypotenuse}.\nResultado final: ${hypotenuse} cm.`);
    return withGeometryDiagram(question, "rectangle-diagonal", { base: `${legB} cm`, height: `${legA} cm`, diagonal: "d" }, "Diagonal de un rectángulo");
  }
  if (variant === 5) {
    const side = 4 + scale;
    question = generatedQuestion(`Calcula la diagonal de un cuadrado de lado ${side} cm.`, `${side}√2 cm`, [`${2 * side} cm`, `${side ** 2} cm`, `√${2 * side} cm`], `Resolución:\n1. La diagonal forma un triángulo rectángulo con dos catetos de ${side} cm.\n2. d²=${side}²+${side}²=2·${side}².\n3. d=√(2·${side}²)=${side}√2.\nResultado final: ${side}√2 cm.`);
    return withGeometryDiagram(question, "rectangle-diagonal", { base: `${side} cm`, height: `${side} cm`, diagonal: "d" }, "Diagonal de un cuadrado");
  }
  if (variant === 6) {
    question = generatedQuestion(`Un triángulo isósceles tiene lados iguales de ${hypotenuse} cm y semibase de ${legA} cm. Calcula su altura.`, `${legB} cm`, [`${hypotenuse - legA} cm`, `${hypotenuse + legA} cm`, `${legA} cm`], `Resolución:\n1. La altura divide el triángulo en dos triángulos rectángulos.\n2. h²=${hypotenuse}²−${legA}²=${legB ** 2}.\n3. h=${legB}.\nResultado final: ${legB} cm.`);
    return withGeometryDiagram(question, "isosceles-height", { side: `${hypotenuse} cm`, halfBase: `${legA} cm`, height: "h" }, "Altura de un triángulo isósceles");
  }
  if (variant === 7) {
    const distance = 10 * scale;
    question = generatedQuestion(`Los desplazamientos entre dos puntos son ${6 * scale} m en horizontal y ${8 * scale} m en vertical. Calcula la distancia en línea recta.`, `${distance} m`, [`${14 * scale} m`, `${2 * scale} m`, `${distance + scale} m`], `Resolución:\n1. Los desplazamientos forman los catetos de un triángulo rectángulo.\n2. d²=(${6 * scale})²+(${8 * scale})²=${distance ** 2}.\n3. d=${distance}.\nResultado final: ${distance} m.`);
    return withGeometryDiagram(question, "point-grid", { distance: "d" }, "Distancia entre dos puntos en una cuadrícula");
  }
  if (variant === 8) {
    const width = 8 * scale;
    const height = 15 * scale;
    const diagonal = 17 * scale;
    question = generatedQuestion(`Una pantalla rectangular mide ${width} cm de alto y ${height} cm de ancho. Calcula la longitud de su diagonal.`, `${diagonal} cm`, [`${width + height} cm`, `${7 * scale} cm`, `${diagonal + scale} cm`], `Resolución:\n1. La diagonal es la hipotenusa.\n2. d²=${width}²+${height}²=${diagonal ** 2}.\n3. d=${diagonal}.\nResultado final: ${diagonal} cm.`);
    return withGeometryDiagram(question, "rectangle-diagonal", { base: `${height} cm`, height: `${width} cm`, diagonal: "d" }, "Diagonal de una pantalla rectangular");
  }
  const smallBase = 2 + scale;
  const smallHeight = 3 + scale;
  const largeBase = 3 * smallBase;
  const largeHeight = 3 * smallHeight;
  question = generatedQuestion(`Un poste de ${smallHeight} m proyecta una sombra de ${smallBase} m. A la misma hora, un edificio proyecta una sombra de ${largeBase} m. Calcula la altura del edificio.`, `${largeHeight} m`, [`${smallHeight + largeBase} m`, `${largeBase / smallBase} m`, `${smallHeight * smallBase} m`], `Resolución:\n1. Los triángulos formados por las alturas y las sombras son semejantes.\n2. h/${largeBase}=${smallHeight}/${smallBase}.\n3. h=${largeBase}·${smallHeight}/${smallBase}=${largeHeight}.\nResultado final: ${largeHeight} m.`);
  return withGeometryDiagram(question, "similarity", { smallBase: `${smallBase} m`, largeBase: `${largeBase} m`, smallHeight: `${smallHeight} m`, largeHeight: "h" }, "Triángulos semejantes formados por alturas y sombras");
}

function generatedGeometryLevelQuestion(lower, difficulty, seed, sequenceIndex = seed) {
  const variant = ((sequenceIndex % 10) + 10) % 10;
  const mixedAreasAndSolids = lower.includes("area") && lower.includes("cuerpo");
  if (mixedAreasAndSolids) {
    return variant % 2 === 0
      ? generatedPlaneGeometryQuestion(difficulty, seed, Math.floor(variant / 2))
      : generatedSolidGeometryQuestion(difficulty, seed, Math.floor(variant / 2));
  }
  if (lower.includes("pitagoras") || lower.includes("semejanza")) {
    return generatedPythagorasGeometryQuestion(difficulty, seed, variant);
  }
  if (lower.includes("cuerpo")) {
    return generatedSolidGeometryQuestion(difficulty, seed, variant);
  }
  return generatedPlaneGeometryQuestion(difficulty, seed, variant);
}

function generatedThirdEsoGeometryQuestion(difficulty, seed, sequenceIndex = seed) {
  const classified = (question, geometryDomain) => ({ ...question, geometryDomain });
  const variant = ((sequenceIndex % 10) + 10) % 10;
  return classified(generatedSolidGeometryQuestion(difficulty, seed, variant), "solid");
}

function generatedTrigonometryLevelQuestion(difficulty, seed) {
  const scale = 1 + (seed % 31);
  const opposite = 3 * scale;
  const adjacent = 4 * scale;
  const hypotenuse = 5 * scale;
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `En un triángulo rectángulo, respecto del ángulo α, el cateto adyacente mide ${adjacent} y la hipotenusa ${hypotenuse}. Calcula cos(α).`,
        `${adjacent}/${hypotenuse}`,
        [`${opposite}/${hypotenuse}`, `${adjacent}/${opposite}`, `${hypotenuse}/${adjacent}`],
        `Resolución:\n1. cos(α)=cateto adyacente/hipotenusa.\n2. Sustituimos las medidas.\nResultado final: cos(α)=${adjacent}/${hypotenuse}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `En un triángulo rectángulo, respecto del ángulo α, el cateto opuesto mide ${opposite} y el adyacente ${adjacent}. Calcula tg(α).`,
        `${opposite}/${adjacent}`,
        [`${adjacent}/${opposite}`, `${opposite}/${hypotenuse}`, `${hypotenuse}/${adjacent}`],
        `Resolución:\n1. tg(α)=cateto opuesto/cateto adyacente.\n2. Sustituimos las medidas.\nResultado final: tg(α)=${opposite}/${adjacent}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Un triángulo rectángulo tiene catetos ${opposite} y ${adjacent}. Calcula la hipotenusa.`,
        hypotenuse,
        [opposite + adjacent, hypotenuse + scale, adjacent],
        `Resolución:\n1. Aplicamos Pitágoras: h²=${opposite}²+${adjacent}².\n2. h=√(${opposite ** 2}+${adjacent ** 2})=√${hypotenuse ** 2}.\nResultado final: h=${hypotenuse}.`
      );
    }
    return generatedQuestion(
      `En un triángulo rectángulo, respecto del ángulo α, el cateto opuesto mide ${opposite} y la hipotenusa ${hypotenuse}. Calcula sen(α).`,
      `${opposite}/${hypotenuse}`,
      [`${adjacent}/${hypotenuse}`, `${opposite}/${adjacent}`, `${hypotenuse}/${opposite}`],
      `Resolución:\n1. sen(α)=cateto opuesto/hipotenusa.\n2. Sustituimos las medidas.\nResultado final: sen(α)=${opposite}/${hypotenuse}.`
    );
  }

  const distance = 6 + seed % 31;
  if (operation === 1) {
    const height = 5 + (seed % 23);
    return generatedQuestion(
      `Una escalera de ${height * 2} m forma un ángulo de 30° con el suelo. ¿Qué altura alcanza?`,
      `${height} m`,
      [`${height * 2} m`, `${decimalAnswer(height * Math.sqrt(3))} m`, `${decimalAnswer(height / 2)} m`],
      `Resolución:\n1. La escalera es la hipotenusa y la altura es el cateto opuesto.\n2. sen(30°)=altura/${height * 2}.\n3. Como sen(30°)=1/2, altura=${height * 2}·1/2=${height}.\nResultado final: ${height} m.`
      );
  }
  if (operation === 2) {
    const shadow = 5 + (seed % 23);
    return generatedQuestion(
      `Un poste proyecta una sombra de ${shadow} m cuando el ángulo de elevación del Sol es 45°. ¿Cuánto mide el poste?`,
      `${shadow} m`,
      [`${shadow * 2} m`, `${decimalAnswer(shadow / 2)} m`, `${decimalAnswer(shadow * Math.sqrt(2))} m`],
      `Resolución:\n1. tg(45°)=altura/sombra.\n2. Como tg(45°)=1, h/${shadow}=1.\nResultado final: h=${shadow} m.`
    );
  }
  if (operation === 3) {
    const cable = 2 * (6 + seed % 18);
    const height = cable / 2;
    return generatedQuestion(
      `Un cable de ${cable} m forma 30° con el suelo. ¿Qué altura alcanza su extremo?`,
      `${height} m`,
      [`${cable} m`, `${decimalAnswer(cable * Math.sqrt(3) / 2)} m`, `${decimalAnswer(height / 2)} m`],
      `Resolución:\n1. El cable es la hipotenusa.\n2. sen(30°)=h/${cable}=1/2.\n3. h=${cable}·1/2=${height}.\nResultado final: ${height} m.`
    );
  }
  return generatedQuestion(
    `Desde un punto situado a ${distance} m de una torre se observa su parte más alta con un ángulo de 45°. ¿Cuál es la altura de la torre?`,
    `${distance} m`,
    [`${distance * 2} m`, `${decimalAnswer(distance / 2)} m`, `${decimalAnswer(distance * Math.sqrt(2))} m`],
    `Resolución:\n1. tan(45°)=altura/distancia.\n2. Como tan(45°)=1, tenemos 1=h/${distance}.\n3. Despejamos h=${distance}.\nResultado final: ${distance} m.`
  );
}

function generatedAnalyticGeometryLevelQuestion(difficulty, seed) {
  const x1 = 1 + (seed % 6);
  const y1 = 2 + ((seed * 2) % 7);
  const x2 = x1 + 2;
  const y2 = y1 + 4;
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Halla el vector AB si A(${x1},${y1}) y B(${x2},${y2}).`,
        `(2, 4)`,
        [`(${x1 + x2}, ${y1 + y2})`, `(-2, -4)`, `(4, 2)`],
        `Resolución:\n1. Restamos las coordenadas del origen a las del extremo.\n2. AB=(${x2}-${x1},${y2}-${y1})=(2,4).\nResultado final: AB=(2,4).`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Calcula la pendiente de la recta que pasa por A(${x1},${y1}) y B(${x2},${y2}).`,
        2,
        [1, 4, -2],
        `Resolución:\n1. Usamos m=(y₂-y₁)/(x₂-x₁).\n2. m=(${y2}-${y1})/(${x2}-${x1})=4/2.\nResultado final: m=2.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Calcula la distancia entre A(${x1},${y1}) y B(${x2},${y2}).`,
        `2sqrt(5)`,
        [`sqrt(6)`, `6`, `4sqrt(2)`],
        `Resolución:\n1. d(A,B)=√((x₂-x₁)²+(y₂-y₁)²).\n2. d=√(2²+4²)=√20.\n3. Simplificamos √20=2√5.\nResultado final: 2√5.`
      );
    }
    return generatedQuestion(
      `Calcula el punto medio de A(${x1},${y1}) y B(${x2},${y2}).`,
      `(${x1 + 1}, ${y1 + 2})`,
      [`(${x1 + x2}, ${y1 + y2})`, `(${x1 + 2}, ${y1 + 1})`, `(${x1}, ${y2})`],
      `Resolución:\n1. Promediamos las coordenadas: M=((x₁+x₂)/2,(y₁+y₂)/2).\n2. M=((${x1}+${x2})/2,(${y1}+${y2})/2).\nResultado final: (${x1 + 1},${y1 + 2}).`
    );
  }

  const intercept = y1 - 2 * x1;
  if (operation === 1) {
    return generatedQuestion(
      `Halla la recta paralela a y=2x+1 que pasa por P(${x1},${y1}).`,
      `y = 2x ${intercept >= 0 ? "+" : "-"} ${Math.abs(intercept)}`,
      [`y = -2x + ${y1}`, `y = ${x1}x + 1`, `y = 2x + ${y1}`],
      `Resolución:\n1. Las rectas paralelas tienen la misma pendiente, m=2.\n2. Usamos y-y₁=m(x-x₁).\n3. y-${y1}=2(x-${x1}) y despejamos.\nResultado final: y=2x${intercept >= 0 ? "+" : ""}${intercept}.`
    );
  }
  if (operation === 2) {
    const perpendicularSlope = "-1/2";
    return generatedQuestion(
      `Halla la pendiente de una recta perpendicular a y=2x+1.`,
      perpendicularSlope,
      [`2`, `1/2`, `-2`],
      `Resolución:\n1. Las pendientes de dos rectas perpendiculares cumplen m·m'=-1.\n2. 2·m'=-1.\n3. Despejamos m'=-1/2.\nResultado final: -1/2.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `¿Cuál es la ecuación de la recta vertical que pasa por P(${x1},${y1})?`,
      `x = ${x1}`,
      [`y = ${y1}`, `y = ${x1}`, `x = ${y1}`],
      `Resolución:\n1. En una recta vertical todos los puntos tienen la misma abscisa.\n2. La abscisa de P es ${x1}.\nResultado final: x=${x1}.`
    );
  }
  return generatedQuestion(
    `Halla la ecuación de la recta de pendiente 2 que pasa por P(${x1},${y1}).`,
    `y = 2x ${intercept >= 0 ? "+" : "-"} ${Math.abs(intercept)}`,
    [`y = ${x1}x + ${y1}`, `y = -2x + ${Math.abs(intercept)}`, `y = 2x + ${y1}`],
    `Resolución:\n1. Usamos y=mx+n con m=2.\n2. Sustituimos P(${x1},${y1}): ${y1}=2·${x1}+n.\n3. n=${intercept}.\nResultado final: y=2x${intercept >= 0 ? "+" : ""}${intercept}.`
  );
}

function generatedFunctionLevelQuestion(difficulty, seed) {
  const a = 2 + (seed % 5);
  const b = 1 + ((seed * 3) % 8);
  const value = 1 + (seed % 6);
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      const zero = 1 + (seed % 6);
      return generatedQuestion(
        `Halla el cero de la función f(x)=${a}x-${a * zero}.`,
        `x = ${zero}`,
        [`x = ${a * zero}`, `x = -${zero}`, `x = ${a}`],
        `Resolución:\n1. Igualamos la función a cero: ${a}x-${a * zero}=0.\n2. Despejamos ${a}x=${a * zero}.\nResultado final: x=${zero}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `¿Cuál es la ordenada en el origen de f(x)=${a}x+${b}?`,
        b,
        [a, a + b, 0],
        `Resolución:\n1. La ordenada en el origen es f(0).\n2. f(0)=${a}·0+${b}=${b}.\nResultado final: ${b}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Indica la pendiente de la función afín f(x)=${a}x+${b}.`,
        a,
        [b, -a, a + b],
        `Resolución:\n1. Una función afín tiene la forma f(x)=mx+n.\n2. La pendiente es el coeficiente de x.\nResultado final: m=${a}.`
      );
    }
    const result = a * value + b;
    return generatedQuestion(
      `Sea f(x)=${a}x+${b}. Calcula f(${value}).`,
      result,
      [a + value + b, a * value, result + b],
      `Resolución:\n1. Sustituimos x por ${value}.\n2. f(${value})=${a}·${value}+${b}=${result}.\nResultado final: ${result}.`
    );
  }

  const h = 1 + (seed % 5);
  const k = -1 - (seed % 6);
  if (operation === 1) {
    return generatedQuestion(
      `Sea f(x)=${a}x+${b}. Halla f^(-1)(x).`,
      `frac{x-${b}}{${a}}`,
      [`frac{x+${b}}{${a}}`, `${a}x-${b}`, `frac{${a}}{x-${b}}`],
      `Resolución:\n1. Escribimos y=${a}x+${b}.\n2. Intercambiamos x e y: x=${a}y+${b}.\n3. Despejamos y=(x-${b})/${a}.\nResultado final: f⁻¹(x)=frac{x-${b}}{${a}}.`
    );
  }
  if (operation === 2) {
    const composed = a * (value + 1) + b;
    return generatedQuestion(
      `Sean f(x)=${a}x+${b} y g(x)=x+1. Calcula (f∘g)(${value}).`,
      composed,
      [a * value + b, value + 1 + b, composed + a],
      `Resolución:\n1. Calculamos primero g(${value})=${value + 1}.\n2. Sustituimos en f: f(${value + 1})=${a}·${value + 1}+${b}.\nResultado final: ${composed}.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Determina el dominio de f(x)=sqrt(x-${h}).`,
      `x ≥ ${h}`,
      [`x ≤ ${h}`, `x > ${-h}`, `Todos los números reales`],
      `Resolución:\n1. El radicando de una raíz cuadrada debe ser no negativo.\n2. x-${h}≥0.\nResultado final: Dom(f)=[${h},∞).`
    );
  }
  return generatedQuestion(
    `Determina el vértice de f(x)=(x-${h})^2 ${k < 0 ? "-" : "+"} ${Math.abs(k)}.`,
    `(${h}, ${k})`,
    [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${k}, ${h})`],
    `Resolución:\n1. La forma de vértice es f(x)=(x-h)²+k.\n2. El vértice es V(h,k).\n3. Aquí h=${h} y k=${k}.\nResultado final: V(${h},${k}).`
  );
}

// 2.º ESO trabaja lectura, representación e interpretación de funciones
// lineales y afines. Mantiene un generador propio para que la dificultad
// media no herede composición, inversa, radicales ni vértices de parábolas
// del generador común de cursos posteriores.
function generatedSecondEsoFunctionQuestion(difficulty, seed, progressionIndex = seed) {
  const safeSeed = Math.abs(seed);
  const operation = ((progressionIndex % 10) + 10) % 10;
  const slope = 1 + (safeSeed % 6);
  const intercept = 1 + (Math.floor(safeSeed / 7) % 9);
  const x = 1 + (Math.floor(safeSeed / 11) % 8);
  const value = slope * x + intercept;

  if (operation === 0) {
    return generatedQuestion(
      `Sea f(x)=${slope}x+${intercept}. Calcula f(${x}).`,
      value,
      [slope + x + intercept, slope * x, value + slope],
      `Resolución:\n1. Sustituimos x por ${x}.\n2. f(${x})=${slope}·${x}+${intercept}=${value}.\nResultado final: ${value}.`
    );
  }
  if (operation === 1) {
    const root = 1 + (safeSeed % 8);
    return generatedQuestion(
      `Halla el corte con el eje X de y=${slope}x-${slope * root}.`,
      `(${root}, 0)`,
      [`(0, ${root})`, `(${-root}, 0)`, `(0, ${-slope * root})`],
      `Resolución:\n1. En el eje X se cumple y=0.\n2. 0=${slope}x-${slope * root}, luego ${slope}x=${slope * root}.\n3. x=${root}.\nResultado final: (${root},0).`
    );
  }
  if (operation === 2) {
    return generatedQuestion(
      `Indica la pendiente de la recta y=${slope}x+${intercept}.`,
      slope,
      [intercept, -slope, slope + intercept],
      `Resolución:\n1. Una función afín se escribe y=mx+n.\n2. La pendiente es el coeficiente m de x.\nResultado final: m=${slope}.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Indica la ordenada en el origen de y=${slope}x-${intercept}.`,
      -intercept,
      [intercept, slope, -slope],
      `Resolución:\n1. La ordenada en el origen es el valor de y cuando x=0.\n2. y=${slope}·0-${intercept}=-${intercept}.\nResultado final: n=-${intercept}.`
    );
  }
  if (operation === 4) {
    const y0 = intercept;
    const y1 = slope + intercept;
    const y2 = 2 * slope + intercept;
    return generatedQuestion(
      `La tabla contiene los puntos (0,${y0}), (1,${y1}) y (2,${y2}). ¿Qué expresión los relaciona?`,
      `y=${slope}x+${intercept}`,
      [`y=${intercept}x+${slope}`, `y=${slope}x-${intercept}`, `y=${slope + intercept}x`],
      `Resolución:\n1. Al aumentar x una unidad, y aumenta ${slope}; esa es la pendiente.\n2. Cuando x=0, y=${intercept}; esa es la ordenada en el origen.\nResultado final: y=${slope}x+${intercept}.`
    );
  }
  if (operation === 5) {
    return generatedQuestion(
      `¿La función y=${slope}x+${intercept} es lineal o afín?`,
      "Afín, porque su ordenada en el origen no es 0",
      ["Lineal, porque contiene x", "Constante, porque tiene dos términos", "No es una función"],
      `Resolución:\n1. Una función lineal tiene la forma y=mx y pasa por el origen.\n2. Aquí aparece el término independiente ${intercept}≠0.\nResultado final: es una función afín.`
    );
  }
  if (operation === 6) {
    const negativeSlope = -slope;
    return generatedQuestion(
      `Sin dibujarla, indica si y=${negativeSlope}x+${intercept} es creciente o decreciente.`,
      "Decreciente",
      ["Creciente", "Constante", "No puede saberse"],
      `Resolución:\n1. Observamos el signo de la pendiente.\n2. Como m=${negativeSlope}<0, y disminuye cuando x aumenta.\nResultado final: decreciente.`
    );
  }
  if (operation === 7) {
    return generatedQuestion(
      `Escribe la función afín de pendiente ${slope} y ordenada en el origen ${intercept}.`,
      `y=${slope}x+${intercept}`,
      [`y=${intercept}x+${slope}`, `y=${slope + intercept}x`, `y=${slope}x-${intercept}`],
      `Resolución:\n1. Usamos la forma y=mx+n.\n2. Sustituimos m=${slope} y n=${intercept}.\nResultado final: y=${slope}x+${intercept}.`
    );
  }
  if (operation === 8) {
    return generatedQuestion(
      `Comprueba si el punto P(${x},${value}) pertenece a la recta y=${slope}x+${intercept}.`,
      "Sí pertenece",
      ["No pertenece", "Solo pertenece si x=0", "Solo pertenece si y=0"],
      `Resolución:\n1. Sustituimos las coordenadas de P en la ecuación.\n2. ${slope}·${x}+${intercept}=${value}.\n3. Coincide con la ordenada del punto.\nResultado final: P sí pertenece a la recta.`
    );
  }
  const fixedCost = 2 + (safeSeed % 8);
  const unitCost = 1 + (Math.floor(safeSeed / 13) % 5);
  const units = 2 + (Math.floor(safeSeed / 17) % 7);
  const total = fixedCost + unitCost * units;
  return generatedQuestion(
    `Un servicio cobra ${fixedCost} € fijos y ${unitCost} € por cada hora. ¿Cuánto cuesta utilizarlo ${units} horas?`,
    `${total} €`,
    [`${fixedCost * units + unitCost} €`, `${unitCost * units} €`, `${fixedCost + unitCost + units} €`],
    `Resolución:\n1. La relación es C(h)=${fixedCost}+${unitCost}h.\n2. C(${units})=${fixedCost}+${unitCost}·${units}=${total}.\nResultado final: ${total} €.`
  );
}

// Tema 9 de 4.º ESO A. Las estructuras proceden del documento
// "9-Funciones Ejercicio.pdf": dominio y recorrido, simetría, continuidad,
// representación, tasa de variación, operaciones, composición e inversa.
// Se generan variantes numéricas para que el alumno pueda repetir el reto sin
// recibir únicamente el mismo enunciado con el mismo resultado.
function generatedFourthEsoAFunctionQuestion(difficulty, seed) {
  const safeSeed = Math.abs(seed);
  const operation = safeSeed % 10;
  const a = 2 + (safeSeed % 5);
  const b = 1 + (Math.floor(safeSeed / 5) % 7);
  const h = 1 + (Math.floor(safeSeed / 11) % 5);
  const k = 1 + (Math.floor(safeSeed / 17) % 6);

  if (operation === 0) {
    const x = 1 + (safeSeed % 6);
    const result = a * x - b;
    return generatedQuestion(
      `Sea f(x)=${a}x-${b}. Calcula f(${x}).`,
      result,
      [a * x + b, a + x - b, result + a],
      `Resolución:\n1. Sustituimos x por ${x} en la expresión de la función.\n2. f(${x})=${a}·${x}-${b}=${a * x}-${b}=${result}.\nResultado final: f(${x})=${result}.`
    );
  }

  if (operation === 1) {
    return generatedQuestion(
      `Calcula el dominio y el recorrido de la función f(x)=${a}x-${b}.`,
      "Dom(f)=ℝ y Rec(f)=ℝ",
      ["Dom(f)=ℝ−{0} y Rec(f)=ℝ", "Dom(f)=[0,∞) y Rec(f)=[0,∞)", `Dom(f)=ℝ y Rec(f)=[-${b},∞)`],
      `Resolución:\n1. Es una función afín y no contiene denominadores, raíces pares ni logaritmos que restrinjan x. Por tanto, Dom(f)=ℝ.\n2. Como su pendiente ${a} es distinta de cero, puede tomar cualquier valor real. Por tanto, Rec(f)=ℝ.\nResultado final: Dom(f)=ℝ y Rec(f)=ℝ.`
    );
  }

  if (operation === 2) {
    const vertexY = -k;
    return generatedQuestion(
      `Calcula el dominio y el recorrido de f(x)=(x-${h})^2-${k}.`,
      `Dom(f)=ℝ y Rec(f)=[-${k},∞)`,
      [`Dom(f)=[${h},∞) y Rec(f)=ℝ`, `Dom(f)=ℝ y Rec(f)=(-∞,-${k}]`, `Dom(f)=ℝ−{${h}} y Rec(f)=ℝ`],
      `Resolución:\n1. La expresión cuadrática está definida para todo número real: Dom(f)=ℝ.\n2. Está escrita en forma de vértice f(x)=(x-h)²+k. Su vértice es V(${h},${vertexY}).\n3. El coeficiente de (x-${h})² es positivo, así que la parábola abre hacia arriba y su valor mínimo es -${k}.\nResultado final: Dom(f)=ℝ y Rec(f)=[-${k},∞).`
    );
  }

  if (operation === 3) {
    return generatedQuestion(
      `Calcula el dominio de f(x)=frac{${a}x+${b}}{x-${h}}.`,
      `ℝ−{${h}}`,
      ["ℝ", `ℝ−{-${h}}`, `[${h},∞)`],
      `Resolución:\n1. En una función racional, el denominador no puede ser cero.\n2. x-${h}=0 ⇒ x=${h}.\n3. Excluimos ese valor del dominio.\nResultado final: Dom(f)=ℝ−{${h}}.`
    );
  }

  if (operation === 4) {
    const oddPower = difficulty === "hard" ? 3 : 1;
    return generatedQuestion(
      `Estudia la simetría de f(x)=${a}x^${oddPower}.`,
      "Es impar: simétrica respecto del origen",
      ["Es par: simétrica respecto del eje Y", "No presenta simetría", "Es periódica"],
      `Resolución:\n1. Sustituimos x por -x.\n2. f(-x)=${a}·(-x)^${oddPower}=-${a}x^${oddPower}=-f(x).\n3. Como f(-x)=-f(x), la función es impar.\nResultado final: es simétrica respecto del origen de coordenadas.`
    );
  }

  if (operation === 5) {
    return generatedQuestion(
      `Estudia la continuidad de f(x)=frac{${a}x+${b}}{x-${h}}.`,
      `Es continua en ℝ−{${h}} y discontinua en x=${h}`,
      ["Es continua en ℝ", `Es discontinua en x=-${h}`, `Solo es continua en [${h},∞)`],
      `Resolución:\n1. Una función racional es continua en todos los puntos en los que está definida.\n2. El denominador se anula cuando x-${h}=0, es decir, en x=${h}.\n3. En ese punto la función no está definida y presenta una discontinuidad.\nResultado final: es continua en ℝ−{${h}} y discontinua en x=${h}.`
    );
  }

  if (operation === 6) {
    return generatedQuestion(
      `Calcula la función inversa de f(x)=${a}x-${b}.`,
      `f^(-1)(x)=frac{x+${b}}{${a}}`,
      [`f^(-1)(x)=frac{x-${b}}{${a}}`, `f^(-1)(x)=${a}x+${b}`, `f^(-1)(x)=frac{${a}}{x+${b}}`],
      `Resolución:\n1. Escribimos y=${a}x-${b}.\n2. Intercambiamos las variables: x=${a}y-${b}.\n3. Despejamos y: x+${b}=${a}y ⇒ y=frac{x+${b}}{${a}}.\nResultado final: f⁻¹(x)=frac{x+${b}}{${a}}.`
    );
  }

  if (operation === 7) {
    const x = 1 + (safeSeed % 4);
    const result = a * (x * x - b) + k;
    return generatedQuestion(
      `Sean f(x)=${a}x+${k} y g(x)=x^2-${b}. Calcula (f∘g)(${x}).`,
      result,
      [a * x * x - b + k, x * x - b + k, result + a],
      `Resolución:\n1. Calculamos primero la función interior: g(${x})=${x}²-${b}=${x * x - b}.\n2. Sustituimos ese resultado en f: f(g(${x}))=${a}·(${x * x - b})+${k}=${result}.\nResultado final: (f∘g)(${x})=${result}.`
    );
  }

  if (operation === 8) {
    const left = 1 + (safeSeed % 3);
    const right = left + 4;
    const leftValue = (left - h) ** 2;
    const rightValue = (right - h) ** 2;
    const rate = (rightValue - leftValue) / (right - left);
    return generatedQuestion(
      `Dada g(x)=(x-${h})^2, calcula la tasa de variación media en [${left},${right}].`,
      rate,
      [rightValue - leftValue, rate + 2, -rate],
      `Resolución:\n1. Usamos TVM=frac{g(${right})-g(${left})}{${right}-${left}}.\n2. g(${right})=(${right}-${h})²=${rightValue} y g(${left})=(${left}-${h})²=${leftValue}.\n3. TVM=frac{${rightValue}-${leftValue}}{${right - left}}=${rate}.\nResultado final: ${rate}.`
    );
  }

  const base = 2 + (safeSeed % 4);
  return generatedQuestion(
    `Calcula el dominio y el recorrido de f(x)=${base}^x.`,
    "Dom(f)=ℝ y Rec(f)=(0,∞)",
    ["Dom(f)=(0,∞) y Rec(f)=ℝ", "Dom(f)=ℝ y Rec(f)=[0,∞)", "Dom(f)=ℝ−{0} y Rec(f)=ℝ"],
    `Resolución:\n1. Una función exponencial de base positiva distinta de 1 está definida para cualquier exponente real: Dom(f)=ℝ.\n2. Sus valores son siempre positivos y nunca alcanza 0.\nResultado final: Dom(f)=ℝ y Rec(f)=(0,∞).`
  );
}

function generatedSequenceLevelQuestion(difficulty, seed) {
  // Separar cada parámetro en una "cifra" distinta de la semilla evita que
  // primer término, diferencia y tipo de pregunta repitan siempre el mismo
  // ciclo corto. Así el alumno recorre más de 30 variantes reales antes de
  // volver a ver una sucesión ya resuelta.
  const safeSeed = Math.abs(seed);
  const operation = safeSeed % 4;
  const first = 2 + (Math.floor(safeSeed / 4) % 11);
  const difference = 2 + (Math.floor(safeSeed / 44) % 7);

  if (difficulty === "easy") {
    if (operation === 1) {
      const ratio = 2 + (Math.floor(safeSeed / 13) % 4);
      return generatedQuestion(
        `Completa la sucesión geométrica: ${first}, ${first * ratio}, ${first * ratio ** 2}, ${first * ratio ** 3}, ...`,
        first * ratio ** 4,
        [first * ratio ** 3 + ratio, first * ratio ** 5, first + 4 * ratio],
        `Resolución:\n1. Cada término se obtiene multiplicando por ${ratio}.\n2. Multiplicamos el último término por ${ratio}.\nResultado final: ${first * ratio ** 4}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Halla la diferencia de la progresión: ${first}, ${first + difference}, ${first + 2 * difference}, ...`,
        difference,
        [first, first + difference, 2 * difference],
        `Resolución:\n1. Restamos dos términos consecutivos.\n2. (${first + difference})-${first}=${difference}.\nResultado final: d=${difference}.`
      );
    }
    if (operation === 3) {
      const fifth = first + 4 * difference;
      return generatedQuestion(
        `Si a_n=${first}+(n-1)·${difference}, calcula a_5.`,
        fifth,
        [first + 5 * difference, 5 * difference, fifth - difference],
        `Resolución:\n1. Sustituimos n=5.\n2. a₅=${first}+(5-1)·${difference}=${first}+${4 * difference}.\nResultado final: ${fifth}.`
      );
    }
    return generatedQuestion(
      `Completa la sucesión: ${first}, ${first + difference}, ${first + 2 * difference}, ${first + 3 * difference}, ...`,
      first + 4 * difference,
      [first + 3 * difference + 1, first + 5 * difference, first + 4 * difference + 2],
      `Resolución:\n1. Restamos términos consecutivos y vemos que la diferencia es ${difference}.\n2. Sumamos ${difference} al último término: ${first + 3 * difference}+${difference}.\nResultado final: ${first + 4 * difference}.`
    );
  }

  const position = 8 + (Math.floor(safeSeed / 7) % 10);
  const result = first + (position - 1) * difference;
  if (operation === 1) {
    const ratio = 2 + (Math.floor(safeSeed / 13) % 4);
    const geometricResult = first * ratio ** (position - 1);
    return generatedQuestion(
      `En la progresión geométrica a₁=${first} y r=${ratio}, calcula a_${position}.`,
      geometricResult,
      [first * ratio ** position, first + (position - 1) * ratio, geometricResult / ratio],
      `Resolución:\n1. Usamos aₙ=a₁·r^(n-1).\n2. a_${position}=${first}·${ratio}^${position - 1}.\nResultado final: ${geometricResult}.`
    );
  }
  if (operation === 2) {
    const terms = 6 + (Math.floor(safeSeed / 17) % 7);
    const last = first + (terms - 1) * difference;
    const sum = terms * (first + last) / 2;
    return generatedQuestion(
      `Calcula la suma de los ${terms} primeros términos de una progresión aritmética con a₁=${first} y d=${difference}.`,
      sum,
      [terms * first, first + last, sum + difference],
      `Resolución:\n1. Hallamos a_${terms}=${first}+(${terms}-1)·${difference}=${last}.\n2. Aplicamos Sₙ=n(a₁+aₙ)/2.\n3. S_${terms}=${terms}(${first}+${last})/2=${sum}.\nResultado final: ${sum}.`
    );
  }
  if (operation === 3) {
    const ratio = 2 + (Math.floor(safeSeed / 13) % 5);
    return generatedQuestion(
      `Determina la razón de la progresión geométrica ${first}, ${first * ratio}, ${first * ratio ** 2}, ${first * ratio ** 3}, ...`,
      ratio,
      [difference, first, ratio + 1],
      `Resolución:\n1. Dividimos un término entre el anterior.\n2. ${first * ratio}/${first}=${ratio}.\nResultado final: r=${ratio}.`
    );
  }
  return generatedQuestion(
    `En la progresión aritmética a₁=${first} y d=${difference}, calcula a_${position}.`,
    result,
    [first + position * difference, position * difference, result - difference],
    `Resolución:\n1. Usamos aₙ=a₁+(n-1)d.\n2. a_${position}=${first}+(${position}-1)·${difference}.\n3. a_${position}=${first}+${(position - 1) * difference}.\nResultado final: ${result}.`
  );
}

function generatedThirdEsoSequenceQuestion(difficulty, seed, progressionIndex = seed) {
  const stage = ((progressionIndex % 6) + 6) % 6;
  if (stage < 4) return generatedSequenceLevelQuestion(difficulty, seed);

  if (stage === 4) {
    const capital = 1200 + (Math.abs(seed) % 5) * 300;
    const rate = 3 + (Math.abs(seed) % 4);
    const months = 2 + (Math.abs(seed) % 9);
    const interest = capital * rate * months / (12 * 100);
    const finalCapital = capital + interest;
    return generatedQuestion(
      `Se depositan ${capital} € a interés simple del ${rate} % anual durante ${months} meses. Calcula el interés producido y el capital final.`,
      `I=${decimalAnswer(interest)} €; C_F=${decimalAnswer(finalCapital)} €`,
      [`I=${decimalAnswer(capital * rate * months / 100)} €`, `I=${decimalAnswer(interest)} €; C_F=${decimalAnswer(capital)} €`, `I=${rate * months} €; C_F=${decimalAnswer(capital + rate * months)} €`],
      `Resolución:\n1. Como T está en meses, n=12.\n2. I=C₀·R·T/(n·100)=${capital}·${rate}·${months}/(12·100)=${decimalAnswer(interest)} €.\n3. C_F=C₀+I=${capital}+${decimalAnswer(interest)}=${decimalAnswer(finalCapital)} €.\nResultado final: I=${decimalAnswer(interest)} € y C_F=${decimalAnswer(finalCapital)} €.`
    );
  }

  const capital = 1000 + (Math.abs(seed) % 4) * 500;
  const rate = 4 + (Math.abs(seed) % 3);
  const years = 2 + (Math.abs(seed) % 3);
  const finalCapital = capital * (1 + rate / 100) ** years;
  return generatedQuestion(
    `Se invierten ${capital} € al ${rate} % anual con capitalización anual durante ${years} años. Calcula el capital final mediante interés compuesto.`,
    `${decimalAnswer(finalCapital)} €`,
    [`${decimalAnswer(capital + capital * rate * years / 100)} €`, `${decimalAnswer(capital * (1 + rate / 100))} €`, `${decimalAnswer(capital + rate * years)} €`],
    `Resolución:\n1. Usamos C_F=C₀(1+R/(100n))^(nt), con n=1.\n2. C_F=${capital}(1+${rate}/100)^${years}.\n3. C_F=${decimalAnswer(finalCapital)} €.\nResultado final: ${decimalAnswer(finalCapital)} €.`
  );
}

function generatedStatisticsLevelQuestion(difficulty, seed) {
  const a = 2 + (seed % 31);
  const b = a + 3;
  const c = a + 6;
  const operation = seed % 3;

  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Calcula la mediana de ${a}, ${a + 2}, ${a + 5}, ${a + 8}, ${a + 12}.`,
        a + 5,
        [a + 2, a + 8, a + 12],
        `Resolución:\n1. Los cinco datos están ordenados.\n2. La mediana es el dato central, que ocupa la tercera posición.\nResultado final: ${a + 5}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Calcula el rango de ${a}, ${a + 4}, ${a + 9}, ${a + 13}.`,
        13,
        [a + 13, 9, 17],
        `Resolución:\n1. El rango es el valor máximo menos el mínimo.\n2. ${a + 13}-${a}=13.\nResultado final: 13.`
      );
    }
    return generatedQuestion(
      `Calcula la media de ${a}, ${b} y ${c}.`,
      b,
      [a + b + c, a, c],
      `Resolución:\n1. Sumamos los datos: ${a}+${b}+${c}=${a + b + c}.\n2. Dividimos entre 3: ${a + b + c}/3=${b}.\nResultado final: ${b}.`
    );
  }

  const advancedOperation = seed % 4;
  const value1 = 4 + (seed % 17);
  const value2 = value1 + 2 + (Math.floor(seed / 17) % 5);
  const frequency1 = 2 + (Math.floor(seed / 7) % 5);
  const frequency2 = 3 + (Math.floor(seed / 11) % 6);
  if (advancedOperation === 1) {
    const total = frequency1 + frequency2;
    return generatedQuestion(
      `En una tabla, el valor ${value1} tiene frecuencia ${frequency1} y el valor ${value2} frecuencia ${frequency2}. ¿Cuántos datos hay en total?`,
      total,
      [frequency1 * frequency2, value1 + value2, total + 1],
      `Resolución:\n1. El número total de datos es la suma de las frecuencias.\n2. N=${frequency1}+${frequency2}=${total}.\nResultado final: ${total}.`
    );
  }
  if (advancedOperation === 2) {
    const mode = frequency1 > frequency2 ? value1 : value2;
    return generatedQuestion(
      `El valor ${value1} aparece ${frequency1} veces y el valor ${value2} aparece ${frequency2} veces. Determina la moda.`,
      mode,
      [mode === value1 ? value2 : value1, frequency1, frequency2],
      `Resolución:\n1. La moda es el valor con mayor frecuencia.\n2. Comparamos ${frequency1} y ${frequency2}; la frecuencia mayor corresponde a ${mode}.\nResultado final: ${mode}.`
    );
  }
  if (advancedOperation === 3) {
    const range = value2 - value1;
    return generatedQuestion(
      `Una distribución solo toma los valores ${value1} y ${value2}. Calcula su recorrido o rango.`,
      range,
      [value2, value1, value1 + value2],
      `Resolución:\n1. El rango es máximo menos mínimo.\n2. R=${value2}-${value1}=${range}.\nResultado final: ${range}.`
    );
  }
  const mean = (value1 * frequency1 + value2 * frequency2) / (frequency1 + frequency2);
  return generatedQuestion(
    `El valor ${value1} aparece ${frequency1} veces y el valor ${value2} aparece ${frequency2} veces. Calcula la media.`,
    decimalAnswer(mean),
    [decimalAnswer((value1 + value2) / 2), String(value1 + value2), decimalAnswer(mean + 1)],
    `Resolución:\n1. Multiplicamos cada valor por su frecuencia: ${value1}·${frequency1}+${value2}·${frequency2}=${value1 * frequency1 + value2 * frequency2}.\n2. Hay ${frequency1 + frequency2} datos.\n3. Dividimos: ${value1 * frequency1 + value2 * frequency2}/${frequency1 + frequency2}=${decimalAnswer(mean)}.\nResultado final: ${decimalAnswer(mean)}.`
  );
}

function generatedProbabilityLevelQuestion(difficulty, seed) {
  const red = 2 + (seed % 11);
  const blue = 3 + (Math.floor(seed / 11) % 13);
  const total = red + blue;
  const operation = seed % 4;

  if (difficulty === "easy") {
    if (operation === 1) {
      const result = reducedFraction(blue, total);
      return generatedQuestion(
        `Una bolsa contiene ${red} bolas rojas y ${blue} azules. ¿Cuál es la probabilidad de sacar una azul?`,
        result,
        [reducedFraction(red, total), `${blue}/${red}`, `${total}/${blue}`],
        `Resolución:\n1. Casos favorables: ${blue} bolas azules.\n2. Casos posibles: ${total}.\n3. P(azul)=${blue}/${total}.\nResultado final: ${result}.`
      );
    }
    if (operation === 2) {
      const result = reducedFraction(total - red, total);
      return generatedQuestion(
        `Una bolsa contiene ${red} bolas rojas y ${blue} azules. ¿Cuál es la probabilidad de no sacar una roja?`,
        result,
        [reducedFraction(red, total), `${total - red}/${red}`, `${total}/${blue}`],
        `Resolución:\n1. No sacar roja significa sacar azul.\n2. Hay ${blue} bolas azules de ${total} bolas.\n3. P(no roja)=${blue}/${total}.\nResultado final: ${result}.`
      );
    }
    const result = reducedFraction(red, total);
    return generatedQuestion(
      `Una bolsa contiene ${red} bolas rojas y ${blue} azules. ¿Cuál es la probabilidad de sacar una roja?`,
      result,
      [reducedFraction(blue, total), `${red}/${blue}`, `${total}/${red}`],
      `Resolución:\n1. Casos favorables: ${red} bolas rojas.\n2. Casos posibles: ${red}+${blue}=${total}.\n3. P(roja)=${red}/${total}.\nResultado final: ${result}.`
    );
  }

  if (operation === 1) {
    const result = reducedFraction(red * red, total * total);
    return generatedQuestion(
      `Una bolsa contiene ${red} bolas rojas y ${blue} azules. Se extraen dos bolas devolviendo la primera. ¿Cuál es la probabilidad de que ambas sean rojas?`,
      result,
      [reducedFraction(red * (red - 1), total * (total - 1)), reducedFraction(red * blue, total * total), reducedFraction(2 * red, total)],
      `Resolución:\n1. Al devolver la primera bola, las dos extracciones tienen la misma probabilidad: ${red}/${total}.\n2. Multiplicamos: ${red}/${total}·${red}/${total}.\n3. Simplificamos.\nResultado final: ${result}.`
    );
  }
  if (operation === 2) {
    const result = reducedFraction(2 * red * blue, total * total);
    return generatedQuestion(
      `Una bolsa contiene ${red} bolas rojas y ${blue} azules. Se extraen dos bolas con reemplazamiento. ¿Cuál es la probabilidad de obtener una de cada color?`,
      result,
      [reducedFraction(red * blue, total * total), reducedFraction(red + blue, total * total), reducedFraction(2 * red, total)],
      `Resolución:\n1. Puede salir roja-azul o azul-roja.\n2. P=frac{${red}}{${total}}·frac{${blue}}{${total}}+frac{${blue}}{${total}}·frac{${red}}{${total}}.\n3. Sumamos y simplificamos.\nResultado final: ${result}.`
    );
  }
  if (operation === 3) {
    const result = reducedFraction(blue, total);
    return generatedQuestion(
      `En una bolsa hay ${red} bolas rojas y ${blue} azules. Si A es «sacar roja», calcula P(A^c).`,
      result,
      [reducedFraction(red, total), reducedFraction(blue, red), reducedFraction(total, blue)],
      `Resolución:\n1. El complementario de sacar roja es sacar azul.\n2. P(A^c)=1-P(A)=1-frac{${red}}{${total}}=frac{${blue}}{${total}}.\nResultado final: ${result}.`
    );
  }
  const result = reducedFraction(red * (red - 1), total * (total - 1));
  return generatedQuestion(
    `Una bolsa contiene ${red} bolas rojas y ${blue} azules. Se extraen dos sin reemplazamiento. ¿Cuál es la probabilidad de que ambas sean rojas?`,
    result,
    [reducedFraction(red * red, total * total), reducedFraction(red * blue, total * (total - 1)), reducedFraction(2 * red, total)],
    `Resolución:\n1. En la primera extracción P(roja)=${red}/${total}.\n2. Sin devolverla, quedan ${red - 1} rojas entre ${total - 1} bolas.\n3. Multiplicamos: ${red}/${total}·${red - 1}/${total - 1}.\n4. Simplificamos.\nResultado final: ${result}.`
  );
}

function generatedCombinatoricsLevelQuestion(difficulty, seed) {
  const n = 4 + (seed % 23);
  const operation = seed % 4;
  if (difficulty === "easy") {
    if (operation === 1) {
      const result = n * (n - 1);
      return generatedQuestion(
        `Con ${n} símbolos distintos, ¿cuántos códigos de dos símbolos sin repetición se pueden formar?`,
        result,
        [n * n, n + (n - 1), result / 2],
        `Resolución:\n1. Para la primera posición hay ${n} opciones.\n2. Para la segunda quedan ${n - 1}.\n3. Multiplicamos: ${n}·${n - 1}=${result}.\nResultado final: ${result}.`
      );
    }
    if (operation === 2) {
      const result = n * (n - 1) / 2;
      return generatedQuestion(
        `De ${n} personas se elige una pareja sin distinguir el orden. ¿Cuántas parejas distintas hay?`,
        result,
        [n * (n - 1), n * 2, result + n],
        `Resolución:\n1. No importa el orden, así que usamos combinaciones.\n2. C(${n},2)=${n}·${n - 1}/2=${result}.\nResultado final: ${result}.`
      );
    }
    if (operation === 3) {
      const result = n ** 2;
      return generatedQuestion(
        `Con ${n} símbolos se forman códigos de dos posiciones permitiendo repetición. ¿Cuántos códigos hay?`,
        result,
        [n * (n - 1), 2 * n, result / 2],
        `Resolución:\n1. En cada una de las dos posiciones hay ${n} posibilidades.\n2. Por el principio multiplicativo: ${n}·${n}=${result}.\nResultado final: ${result}.`
      );
    }
    let factorial = 1;
    for (let value = 2; value <= n; value += 1) factorial *= value;
    return generatedQuestion(
      `¿De cuántas formas se pueden ordenar ${n} objetos distintos?`,
      factorial,
      [n * n, n * (n - 1), factorial / n],
      `Resolución:\n1. Al ordenar todos los objetos usamos una permutación.\n2. P_${n}=${n}!.\n3. ${n}!=${factorial}.\nResultado final: ${factorial}.`
    );
  }

  const people = 6 + (seed % 31);
  if (operation === 1) {
    const result = people * (people - 1);
    return generatedQuestion(
      `Entre ${people} estudiantes se eligen un delegado y un subdelegado. ¿De cuántas formas puede hacerse?`,
      result,
      [result / 2, people * people, people + (people - 1)],
      `Resolución:\n1. Los cargos son distintos, por lo que importa el orden.\n2. Hay ${people} opciones para delegado y ${people - 1} para subdelegado.\n3. ${people}·${people - 1}=${result}.\nResultado final: ${result}.`
    );
  }
  if (operation === 2) {
    const result = people * (people - 1) * (people - 2);
    return generatedQuestion(
      `Con ${people} personas se asignan tres cargos distintos. ¿De cuántas formas puede hacerse?`,
      result,
      [result / 6, people ** 3, people * (people - 1)],
      `Resolución:\n1. Los cargos son distintos y no se repite persona.\n2. Hay ${people}, ${people - 1} y ${people - 2} opciones sucesivas.\n3. Multiplicamos: ${people}·${people - 1}·${people - 2}=${result}.\nResultado final: ${result}.`
    );
  }
  if (operation === 3) {
    const result = people * (people - 1) * (people - 2) / 6;
    return generatedQuestion(
      `De ${people} estudiantes se forma un equipo de 3 sin asignar cargos. ¿Cuántos equipos distintos hay?`,
      result,
      [result * 6, people * 3, people * (people - 1)],
      `Resolución:\n1. No importa el orden, por lo que usamos C(${people},3).\n2. C(${people},3)=frac{${people}·${people - 1}·${people - 2}}{3·2·1}.\n3. Calculamos y obtenemos ${result}.\nResultado final: ${result}.`
    );
  }
  const combinations = people * (people - 1) / 2;
  return generatedQuestion(
    `De un grupo de ${people} estudiantes se eligen 2 representantes sin importar el orden. ¿Cuántas parejas son posibles?`,
    combinations,
    [people * (people - 1), people * 2, combinations + people],
    `Resolución:\n1. No importa el orden, así que usamos combinaciones.\n2. C(${people},2)=${people}·${people - 1}/2.\n3. Calculamos ${people * (people - 1)}/2=${combinations}.\nResultado final: ${combinations}.`
  );
}

function generatedLimitLevelQuestion(lower, difficulty, seed) {
  const a = 2 + (seed % 31);
  const b = 3 + (Math.floor(seed / 7) % 19);
  const operation = seed % 4;
  if (lower.includes("sucesion")) {
    if (difficulty === "easy") {
      if (operation === 1) {
        return generatedQuestion(
          `Calcula: lim n→∞ (${a}n+1)/n`,
          a,
          [0, 1, "∞"],
          `Resolución:\n1. Dividimos todos los términos entre n.\n2. Obtenemos ${a}+1/n.\n3. Como 1/n→0, el límite vale ${a}.\nResultado final: ${a}.`
        );
      }
      if (operation === 2) {
        return generatedQuestion(
          `Calcula: lim n→∞ 1/n^${a}`,
          0,
          [1, a, "∞"],
          `Resolución:\n1. n^${a} crece sin límite.\n2. Su inverso se aproxima a cero.\nResultado final: 0.`
        );
      }
      if (operation === 3) {
        return generatedQuestion(
          `Calcula: lim n→∞ (${a}n+${b})/(${a}n)`,
          1,
          [0, a, `${a}/${b}`],
          `Resolución:\n1. Dividimos numerador y denominador entre n.\n2. (${a}+${b}/n)/${a}.\n3. Como ${b}/n→0, queda ${a}/${a}=1.\nResultado final: 1.`
        );
      }
      return generatedQuestion(
        `Calcula: lim n→∞ ${a}/n`,
        0,
        [a, 1, "∞"],
        `Resolución:\n1. El numerador es constante.\n2. El denominador crece sin límite.\nResultado final: 0.`
      );
    }
    if (operation === 1) {
      return generatedQuestion(
        `Calcula: lim n→∞ (${a}n^3+${b}n)/(2n^3-1)`,
        `${a}/2`,
        [`2/${a}`, 0, "∞"],
        `Resolución:\n1. Numerador y denominador tienen grado 3.\n2. El límite es el cociente de los coeficientes principales.\nResultado final: ${a}/2.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Calcula: lim n→∞ (${a}n+1)/(n^2+${b})`,
        0,
        [a, 1, "∞"],
        `Resolución:\n1. El grado del denominador es mayor.\n2. Dividimos entre n² y todos los términos del numerador tienden a 0.\nResultado final: 0.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Calcula: lim n→∞ (n^2+${a})/(${b}n+1)`,
        "∞",
        [0, `${a}/${b}`, 1],
        `Resolución:\n1. El grado del numerador es mayor que el del denominador.\n2. El cociente se comporta como n/${b}, que crece sin límite.\nResultado final: +∞.`
      );
    }
    return generatedQuestion(
      `Calcula: lim n→∞ (${a}n^2+1)/(${b}n^2-2)`,
      `${a}/${b}`,
      [`${b}/${a}`, "0", "∞"],
      `Resolución:\n1. Numerador y denominador tienen el mismo grado.\n2. Dividimos los coeficientes principales.\nResultado final: ${a}/${b}.`
    );
  }
  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Calcula: lim x→${a} (x^2+${b})`,
        a * a + b,
        [a + b, a * a, b],
        `Resolución:\n1. El polinomio es continuo.\n2. Sustituimos x=${a}: ${a}²+${b}.\nResultado final: ${a * a + b}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Calcula: lim x→${a} frac{x+${b}}{2}.`,
        reducedFraction(a + b, 2),
        [a + b, reducedFraction(a, 2), b],
        `Resolución:\n1. La función es continua en x=${a}.\n2. Sustituimos: frac{${a}+${b}}{2}.\nResultado final: ${reducedFraction(a + b, 2)}.`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Calcula: lim x→${a} (${b}-x).`,
        b - a,
        [a - b, b, a],
        `Resolución:\n1. La función es continua.\n2. Sustituimos x=${a}: ${b}-${a}.\nResultado final: ${b - a}.`
      );
    }
    return generatedQuestion(
      `Calcula: lim x→${a} (2x+${b})`,
      2 * a + b,
      [a + b, 2 * a, b],
      `Resolución:\n1. La función es continua.\n2. Sustituimos x=${a}: 2·${a}+${b}.\nResultado final: ${2 * a + b}.`
    );
  }
  if (operation === 1) {
    return generatedQuestion(
      `Calcula: lim x→0 frac{sen(${a}x)}{x}.`,
      a,
      [0, 1, `${a}x`],
      `Resolución:\n1. Multiplicamos y dividimos por ${a}.\n2. frac{sen(${a}x)}{x}=${a}·frac{sen(${a}x)}{${a}x}.\n3. El límite notable vale 1.\nResultado final: ${a}.`
    );
  }
  if (operation === 2) {
    return generatedQuestion(
      `Calcula: lim x→∞ (${a}x^2+${b})/(x^2+1).`,
      a,
      [0, 1, "∞"],
      `Resolución:\n1. Es una indeterminación ∞/∞.\n2. Dividimos numerador y denominador entre x².\n3. Los términos con 1/x² tienden a 0.\nResultado final: ${a}.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Calcula: lim x→0 frac{e^(${a}x)-1}{x}.`,
      a,
      [0, 1, Math.E],
      `Resolución:\n1. La sustitución produce 0/0.\n2. Aplicamos L'Hôpital: la derivada del numerador es ${a}e^(${a}x) y la del denominador es 1.\n3. Sustituimos x=0.\nResultado final: ${a}.`
    );
  }
  return generatedQuestion(
    `Calcula: lim x→${a} (x^2-${a * a})/(x-${a})`,
    2 * a,
    [a, a * a, 0],
    `Resolución:\n1. La sustitución directa produce 0/0.\n2. Factorizamos x²-${a * a}=(x-${a})(x+${a}).\n3. Simplificamos x-${a}.\n4. Sustituimos en x+${a}: ${a}+${a}=${2 * a}.\nResultado final: ${2 * a}.`
  );
}

function generatedDerivativeLevelQuestion(difficulty, seed) {
  // Los parámetros se obtienen de posiciones independientes de la semilla.
  // Antes estaban acoplados por módulos pequeños y el nivel fácil solo
  // producía 22 identidades distintas aunque se probaran cientos de semillas.
  const safeSeed = Math.abs(seed);
  const operation = safeSeed % 4;
  const coefficient = 2 + (Math.floor(safeSeed / 4) % 11);
  const exponent = 2 + (Math.floor(safeSeed / 44) % 5);
  if (difficulty === "easy") {
    if (operation === 1) {
      return generatedQuestion(
        `Deriva: f(x)=${coefficient}x^2+${exponent}x-${coefficient}.`,
        `${2 * coefficient}x+${exponent}`,
        [`${coefficient}x+${exponent}`, `${2 * coefficient}x-${exponent}`, `${2 * coefficient}x^2+${exponent}`],
        `Resolución:\n1. Derivamos término a término.\n2. (${coefficient}x²)'=${2 * coefficient}x, (${exponent}x)'=${exponent} y la constante deriva 0.\nResultado final: ${2 * coefficient}x+${exponent}.`
      );
    }
    if (operation === 2) {
      return generatedQuestion(
        `Deriva: f(x)=frac{1}{x^${exponent}}.`,
        `-${exponent}x^-${exponent + 1}`,
        [`${exponent}x^${exponent - 1}`, `-x^-${exponent}`, `${exponent}x^-${exponent + 1}`],
        `Resolución:\n1. Escribimos f(x)=x^(-${exponent}).\n2. Aplicamos la regla de la potencia.\nResultado final: f'(x)=-${exponent}x^(-${exponent + 1}).`
      );
    }
    if (operation === 3) {
      return generatedQuestion(
        `Deriva: f(x)=sen x+${coefficient}cos x.`,
        `cos x-${coefficient}sen x`,
        [`sen x+${coefficient}cos x`, `cos x+${coefficient}sen x`, `-sen x-${coefficient}cos x`],
        `Resolución:\n1. (sen x)'=cos x.\n2. (${coefficient}cos x)'=-${coefficient}sen x.\nResultado final: cos x-${coefficient}sen x.`
      );
    }
    return generatedQuestion(
      `Deriva: f(x)=${coefficient}x^${exponent}`,
      `${coefficient * exponent}x^${exponent - 1}`,
      [`${coefficient}x^${exponent - 1}`, `${coefficient * exponent}x^${exponent}`, `${exponent}x^${coefficient - 1}`],
      `Resolución:\n1. Aplicamos (xⁿ)'=n·xⁿ⁻¹.\n2. Multiplicamos ${coefficient}·${exponent}=${coefficient * exponent}.\n3. Restamos 1 al exponente.\nResultado final: f'(x)=${coefficient * exponent}x^${exponent - 1}.`
    );
  }
  const point = 1 + (Math.floor(safeSeed / 9) % 7);
  const linear = 1 + (Math.floor(safeSeed / 17) % 8);
  const slope = 2 * coefficient * point + linear;
  if (operation === 1) {
    return generatedQuestion(
      `Deriva el producto f(x)=(x^2+${coefficient})(x+${linear}).`,
      `2x(x+${linear})+(x^2+${coefficient})`,
      [`2x(x+${linear})`, `(x^2+${coefficient})`, `2x+1`],
      `Resolución:\n1. Aplicamos (uv)'=u'v+uv'.\n2. u=x²+${coefficient}, u'=2x; v=x+${linear}, v'=1.\nResultado final: f'(x)=2x(x+${linear})+(x²+${coefficient}).`
    );
  }
  if (operation === 2) {
    return generatedQuestion(
      `Deriva el cociente f(x)=frac{x^2+${coefficient}}{x+1}.`,
      `frac{2x(x+1)-(x^2+${coefficient})}{(x+1)^2}`,
      [`frac{2x}{1}`, `frac{2x(x+1)+(x^2+${coefficient})}{(x+1)^2}`, `frac{x^2+${coefficient}}{(x+1)^2}`],
      `Resolución:\n1. Aplicamos la regla del cociente: (u/v)'=frac{u'v-uv'}{v²}.\n2. u=x²+${coefficient}, u'=2x; v=x+1, v'=1.\nResultado final: frac{2x(x+1)-(x²+${coefficient})}{(x+1)²}.`
    );
  }
  if (operation === 3) {
    return generatedQuestion(
      `Deriva la función compuesta f(x)=(${coefficient}x+1)^${exponent}.`,
      `${coefficient * exponent}(${coefficient}x+1)^${exponent - 1}`,
      [`${exponent}(${coefficient}x+1)^${exponent - 1}`, `${coefficient}(${coefficient}x+1)^${exponent}`, `${coefficient * exponent}(${coefficient}x+1)^${exponent}`],
      `Resolución:\n1. Aplicamos la regla de la cadena.\n2. La derivada exterior aporta ${exponent}(${coefficient}x+1)^${exponent - 1}.\n3. Multiplicamos por la derivada interior, ${coefficient}.\nResultado final: ${coefficient * exponent}(${coefficient}x+1)^${exponent - 1}.`
    );
  }
  return generatedQuestion(
    `Calcula la pendiente de la tangente a f(x)=${coefficient}x^2+${linear}x-1 en x=${point}.`,
    slope,
    [coefficient * point + linear, 2 * coefficient + linear, slope - linear],
    `Resolución:\n1. Derivamos: f'(x)=${2 * coefficient}x+${linear}.\n2. Evaluamos en x=${point}: f'(${point})=${2 * coefficient}·${point}+${linear}.\n3. Calculamos ${2 * coefficient * point}+${linear}=${slope}.\nResultado final: la pendiente es ${slope}.`
  );
}

function buildFirstEsoAlgebraTopicQuestions(theme, course) {
  const questionCount = questionsPerChallengeFor(course);
  const scopeKey = `${course.id}|tema-algebra-progresivo`;
  const roundKey = `${scopeKey}|ronda-${state.practiceRound}`;
  state.challengeRoundCache = state.challengeRoundCache || {};
  if (state.challengeRoundCache[roundKey]) return state.challengeRoundCache[roundKey];

  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  const previousIdentities = new Set(state.challengeQuestionHistory[scopeKey] || []);
  const currentIdentities = new Set();
  const questions = [];

  for (let index = 0; index < questionCount; index += 1) {
    let attempt = 0;
    let question;
    let identity;
    do {
      const seed = state.practiceRound * 211 + state.topicIndex * 37 + index * 19 + attempt * 97;
      question = generatedFirstEsoAlgebraQuestion("topic", seed, index);
      identity = challengeQuestionIdentity(question);
      attempt += 1;
    } while (
      attempt < 80
      && (currentIdentities.has(identity) || previousIdentities.has(identity))
    );

    currentIdentities.add(identity);
    const rotation = (state.practiceRound + index) % question.options.length;
    questions.push({
      ...question,
      options: rotate(question.options, rotation),
      correct: (question.correct - rotation + question.options.length) % question.options.length
    });
  }

  state.challengeQuestionHistory[scopeKey] = [...new Set([...previousIdentities, ...currentIdentities])];
  state.challengeRoundCache[roundKey] = questions;
  return questions;
}

function buildSecondEsoPolynomialTopicQuestions(theme, course) {
  const questionCount = questionsPerChallengeFor(course);
  const scopeKey = `${course.id}|tema-polinomios-progresivo`;
  const roundKey = `${scopeKey}|ronda-${state.practiceRound}`;
  state.challengeRoundCache = state.challengeRoundCache || {};
  if (state.challengeRoundCache[roundKey]) return state.challengeRoundCache[roundKey];

  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  const previousIdentities = new Set(state.challengeQuestionHistory[scopeKey] || []);
  const currentIdentities = new Set();
  const questions = [];

  for (let index = 0; index < questionCount; index += 1) {
    let attempt = 0;
    let question;
    let identity;
    do {
      const seed = state.practiceRound * 223 + state.topicIndex * 41 + index * 23 + attempt * 101;
      question = generatedSecondEsoPolynomialQuestion("topic", seed, index);
      identity = challengeQuestionIdentity(question);
      attempt += 1;
    } while (
      attempt < 80
      && (currentIdentities.has(identity) || previousIdentities.has(identity))
    );

    currentIdentities.add(identity);
    const rotation = (state.practiceRound + state.topicIndex + index) % question.options.length;
    questions.push({
      ...question,
      options: rotate(question.options, rotation),
      correct: (question.correct - rotation + question.options.length) % question.options.length
    });
  }

  state.challengeQuestionHistory[scopeKey] = [...new Set([...previousIdentities, ...currentIdentities])];
  state.challengeRoundCache[roundKey] = questions;
  return questions;
}

function buildSecondEsoEquationTopicQuestions(theme, course) {
  const questionCount = questionsPerChallengeFor(course);
  const scopeKey = `${course.id}|tema-ecuaciones-progresivo`;
  const roundKey = `${scopeKey}|ronda-${state.practiceRound}`;
  state.challengeRoundCache = state.challengeRoundCache || {};
  if (state.challengeRoundCache[roundKey]) return state.challengeRoundCache[roundKey];

  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  const previousIdentities = new Set(state.challengeQuestionHistory[scopeKey] || []);
  const currentIdentities = new Set();
  const questions = [];

  for (let index = 0; index < questionCount; index += 1) {
    let attempt = 0;
    let question;
    let identity;
    do {
      const seed = state.practiceRound * 227 + state.topicIndex * 43 + index * 29 + attempt * 103;
      question = generatedSecondEsoEquationQuestion("topic", seed, index);
      identity = challengeQuestionIdentity(question);
      attempt += 1;
    } while (
      attempt < 80
      && (currentIdentities.has(identity) || previousIdentities.has(identity))
    );

    currentIdentities.add(identity);
    const rotation = (state.practiceRound + state.topicIndex + index) % question.options.length;
    questions.push({
      ...question,
      options: rotate(question.options, rotation),
      correct: (question.correct - rotation + question.options.length) % question.options.length
    });
  }

  state.challengeQuestionHistory[scopeKey] = [...new Set([...previousIdentities, ...currentIdentities])];
  state.challengeRoundCache[roundKey] = questions;
  return questions;
}

function firstBachBankByTopic(courseId, topicIndex) {
  const keys = courseId === "1bach-mates"
    ? ["matesIReales", "matesIComplejos", "matesIEcuaciones", "matesITrigonometria", "matesIGeometriaAnalitica", "matesIConicas", "matesIFunciones", "matesILimites", "matesIDerivadas", "matesIAplicacionDerivadas", "matesIProbabilidad"]
    : courseId === "1bach-ccss"
      ? ["ccssIEstadistica", "ccssIProbabilidad", "ccssIBinomial", "ccssINormal", "ccssIReales", "ccssIComplejos", "ccssIEcuaciones", "ccssIInecuaciones", "ccssIFunciones", "matesIDerivadas", "matesIAplicacionDerivadas", "ccssICombinatoria"]
      : [];
  return [...(exerciseBanks[keys[topicIndex]] || [])];
}

function firstBachExtensionBankByTopic(courseId, topicIndex) {
  if (courseId === "1bach-mates") {
    const suppliedLimits = Array.isArray(window.MATES_I_LIMITS_BANK) ? window.MATES_I_LIMITS_BANK : [];
    const suppliedDerivatives = Array.isArray(window.MATES_I_DERIVATIVES_BANK) ? window.MATES_I_DERIVATIVES_BANK : [];
    const suppliedApplications = Array.isArray(window.MATES_I_DERIVATIVE_APPLICATIONS_BANK) ? window.MATES_I_DERIVATIVE_APPLICATIONS_BANK : [];
    const extensions = [exerciseBanks.realesBach, exerciseBanks.complejos, exerciseBanks.ecuacionesBach, exerciseBanks.trigonometriaBach, exerciseBanks.geometriaAnalitica, exerciseBanks.conicas, exerciseBanks.funciones, [...exerciseBanks.limites, ...suppliedLimits], [...exerciseBanks.derivadas, ...suppliedDerivatives], [...exerciseBanks.derivadas, ...suppliedApplications], exerciseBanks.probabilidadBach];
    return [...(extensions[topicIndex] || [])];
  }
  if (courseId === "1bach-ccss") {
    const suppliedDerivatives = Array.isArray(window.MATES_I_DERIVATIVES_BANK) ? window.MATES_I_DERIVATIVES_BANK : [];
    const suppliedApplications = Array.isArray(window.MATES_I_DERIVATIVE_APPLICATIONS_BANK) ? window.MATES_I_DERIVATIVE_APPLICATIONS_BANK : [];
    const originalCombinatorics = Array.isArray(window.CCSS_I_ORIGINAL_COMBINATORICS_BANK) ? window.CCSS_I_ORIGINAL_COMBINATORICS_BANK : [];
    const originalByTopic = Array.isArray(window.CCSS_I_ORIGINAL_EXERCISE_BANKS?.[topicIndex])
      ? window.CCSS_I_ORIGINAL_EXERCISE_BANKS[topicIndex]
      : [];
    const safeForCcssI = (question) => {
      const searchable = `${question?.text || ""} ${question?.solution || ""} ${question?.source || ""}`.toLowerCase();
      return !/l['’]?h[oô]pital/.test(searchable)
        && !/matem[aá]ticas ii|ccss ii|2[.ºº]\s*bach/.test(searchable);
    };
    // CCSS I usa extensiones asociadas explícitamente a cada tema. Los temas
    // 0, 2, 3 y 7 quedan sin extensión genérica para impedir que una etiqueta
    // posterior convierta ejercicios de otro contenido en preguntas válidas.
    const extensions = [[], exerciseBanks.probabilidadBach, [], [], exerciseBanks.realesBach, exerciseBanks.complejos, exerciseBanks.ecuacionesBach, [], exerciseBanks.funciones, suppliedDerivatives.filter(safeForCcssI), suppliedApplications.filter(safeForCcssI), [...exerciseBanks.combinatoria, ...originalCombinatorics]];
    return [...(extensions[topicIndex] || []), ...originalByTopic];
  }
  return [];
}

function buildQuestions(theme, course = courseById(state.courseId), requestedCount = questionsPerChallengeFor(course)) {
  const questionCount = Math.max(1, Number(requestedCount) || questionsPerChallengeFor(course));
  if (!state.blockKey && ESO_COURSE_IDS.includes(course.id)) {
    return buildEsoTopicLevelQuestions(theme, course, questionCount);
  }
  if (!state.blockKey && BACH_II_COURSE_IDS.includes(course.id) && window.MargaritaBachExam?.buildTopicQuestions) {
    const availabilityRule = window.MargaritaContentAvailability?.get?.(course.id, state.topicIndex);
    if (availabilityRule?.availableForTopicPractice === false) return [];
    if (availabilityRule?.practiceBank && window.MargaritaTopicPracticeBanks?.build) {
      const practiceQuestions = window.MargaritaTopicPracticeBanks.build(availabilityRule.practiceBank);
      return strictTopicSelection({
        course,
        topicIndex: state.topicIndex,
        questions: practiceQuestions,
        count: questionCount,
        sourceType: "topic-practice"
      });
    }
    const topicQuestions = window.MargaritaBachExam.buildTopicQuestions(course, state.topicIndex);
    const correctedQuestions = [];
    const correctedIdentities = new Set();
    topicQuestions.forEach((question) => {
      const identity = challengeQuestionIdentity(question);
      if (!identity || correctedIdentities.has(identity)) return;
      correctedIdentities.add(identity);
      correctedQuestions.push(question);
    });
    if (correctedQuestions.length) {
      return strictTopicSelection({ course, topicIndex: state.topicIndex, questions: correctedQuestions, count: questionCount, sourceType: "official-pau" });
    }
    return [];
  }
  if (state.blockKey && course.id === "2bach-mates") {
    return buildMatesIIBlockQuestions(course, state.blockKey);
  }
  if (state.blockKey && course.id === "2bach-ccss") {
    return buildCcssIIBlockQuestions(state.blockKey);
  }
  const lower = theme.toLowerCase();
  if (course.id === "1eso" && (lower.includes("expresion") || lower.includes("algebra"))) {
    return strictTopicSelection({ course, topicIndex: state.topicIndex, questions: buildFirstEsoAlgebraTopicQuestions(theme, course), count: questionCount, sourceType: "generated" });
  }
  if (course.id === "2eso" && (lower.includes("expresion") || lower.includes("algebra") || lower.includes("polinomio"))) {
    return strictTopicSelection({ course, topicIndex: state.topicIndex, questions: buildSecondEsoPolynomialTopicQuestions(theme, course), count: questionCount, sourceType: "generated" });
  }
  if (course.id === "2eso" && lower.includes("ecuacion")) {
    return strictTopicSelection({ course, topicIndex: state.topicIndex, questions: buildSecondEsoEquationTopicQuestions(theme, course), count: questionCount, sourceType: "generated" });
  }
  const selectedBank = course.id === "1bach-mates" || course.id === "1bach-ccss"
    ? firstBachBankByTopic(course.id, state.topicIndex)
    : pickExerciseBank(lower, course.id);
  const supplements = supplementalExercisesFor(lower, course.id);
  const generatedSeed = state.practiceRound * 101 + state.topicIndex * 17;
  const generated = [
    ...generatedExercisesFor(lower, course.id, generatedSeed),
    ...(ESO_COURSE_IDS.includes(course.id)
      ? Array.from({ length: questionCount * 2 }, (_, index) =>
        generatedEsoDifficultyQuestion(lower, course.id, "medium", generatedSeed * 37 + index * 13, index % questionCount)
      )
      : [])
  ];
  const sourceVerified = window.MargaritaSourceVerified?.build?.(course.id, theme) || [];
  const esoExamVerified = window.MargaritaEsoExamVerified?.build?.(course.id, theme) || [];
  const approvedABBlockPool = ESO_COURSE_IDS.includes(course.id) && state.blockKey
    ? (currentExerciseHistoryMode() === "exam"
      ? (window.MargaritaEso3ApprovedABPractice?.buildExamByBlocks?.(course.id, theme) || [])
      : (window.MargaritaEso3ApprovedABPractice?.buildChallenge?.(
          course.id,
          theme,
          state.topicChallengeLevel === "master" ? "master" : "apprentice"
        ) || []))
    : [];
  const modelPool = (course.id === "1bach-mates" || course.id === "1bach-ccss") && selectedBank.length
    ? [
      ...selectedBank,
      ...firstBachExtensionBankByTopic(course.id, state.topicIndex),
      ...(window.MargaritaFirstBachVariety?.build?.(course.id, theme) || []),
      ...(window.MargaritaCombinatoricsSupplied?.build?.(course.id, theme) || []),
      ...sourceVerified
    ]
    : null;
  const isOfficialPauBank = (course.id === "2bach-mates" || course.id === "2bach-ccss")
    && selectedBank.every((question) => question.type === "pau-open");
  const officialPauPool = isOfficialPauBank
    ? selectedBank
      .map((question) => question.options?.length ? question : withPauTestOptions(question))
      .filter(hasOfficialConvocation)
      .filter(questionHasCoherentOptions)
    : null;
  const unfilteredCandidatePool = (officialPauPool || modelPool || [...selectedBank, ...supplements, ...sourceVerified, ...esoExamVerified, ...approvedABBlockPool, ...generated])
    .filter((question) => !isForbiddenIntroLimitQuestion(question, course.id, lower));
  const candidatePool = BACH_II_COURSE_IDS.includes(course.id)
    ? unfilteredCandidatePool.filter(hasOfficialConvocation)
    : unfilteredCandidatePool;
  const coherentPool = candidatePool.filter(questionHasCoherentOptions);
  const orderedRound = strictTopicSelection({
    course,
    topicIndex: state.topicIndex,
    questions: coherentPool,
    count: questionCount,
    sourceType: BACH_II_COURSE_IDS.includes(course.id) ? "official-pau" : "bank"
  });

  return orderedRound.map((question, index) => {
    const preparedQuestion = question.type === "pau-open" && !question.options?.length ? withPauTestOptions(question) : question;
    if (!preparedQuestion.options?.length) return { ...preparedQuestion };
    const amount = (state.topicIndex + state.practiceRound + index) % preparedQuestion.options.length;
    const rotatedQuestion = {
      ...preparedQuestion,
      options: rotate(preparedQuestion.options, amount),
      correct: (preparedQuestion.correct - amount + preparedQuestion.options.length) % preparedQuestion.options.length
    };
    return BACH_II_COURSE_IDS.includes(course.id)
      ? expandCompositeQuestionParts(rotatedQuestion)
      : rotatedQuestion;
  });
}

function ensureQuestionCount(questions, target) {
  const source = questions || [];
  const seen = new Set();
  const unique = source.filter((question) => {
    const identity = String(question.text || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (!identity || seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
  return unique;
}

function challengeQuestionIdentity(question) {
  if (question?.exerciseId) return `exercise:${question.exerciseId}`;
  if (question?.rawBaseId) return `raw:${question.rawBaseId}`;
  if (question?.id) return `id:${question.id}`;
  const statement = question?.statementHtml || question?.text || "";
  const parts = (question?.parts || []).map((part) => `${part.label}:${part.text || part.html || ""}`).join("|");
  return normalizeDisplayText(`${question?.source || ""}|${statement}|${parts}`)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function handwritingAnswerHtml(question, overrides = {}) {
  if (!window.MargaritaHandwriting || !question) return "";
  const course = courseById(overrides.courseId || state.courseId);
  const answerSource = overrides.answerSource || question;
  const correctIndex = Number.isInteger(overrides.correctIndex) ? overrides.correctIndex : answerSource.correct;
  const topicIndex = Number.isInteger(overrides.topicIndex) ? overrides.topicIndex : state.topicIndex;
  const topicLabel = overrides.topicLabel || course?.themes?.[topicIndex] || "";
  const mode = overrides.mode || (state.blockKey ? "blockChallenge" : "topicChallenge");
  const partId = overrides.partId ?? answerSource.partId ?? answerSource.label ?? "";
  const questionIndex = Number.isInteger(overrides.questionIndex) ? overrides.questionIndex : state.questionIndex;
  const identity = challengeQuestionIdentity(question);
  const exerciseKey = [
    currentStudentKey(),
    course?.id || state.courseId || "sin-curso",
    mode,
    overrides.blockId ?? state.blockKey ?? "",
    identity,
    partId
  ].join("|");
  const correctAnswer = Array.isArray(answerSource.options) && Number.isInteger(correctIndex)
    ? answerSource.options[correctIndex]
    : answerSource.answer ?? question.answer ?? "";
  const statementHtml = overrides.statementHtml || `
    ${renderOfficialSourceCallout(question, course?.id || state.courseId)}
    <div class="question-text official-exercise-statement">${officialQuestionStatementHtml(question, course?.id || state.courseId)}</div>
  `;
  return window.MargaritaHandwriting.render({
    exerciseKey,
    statementHtml,
    context: {
      courseId: course?.id || state.courseId,
      subject: course?.label || course?.name || "Matemáticas",
      topicId: overrides.topicId ?? topicIndex,
      topicLabel,
      blockId: overrides.blockId ?? state.blockKey ?? "",
      exerciseId: question.exerciseId || question.rawBaseId || question.id || identity,
      partId,
      questionIndex,
      difficulty: overrides.difficulty ?? question.difficulty ?? state.topicChallengeLevel ?? "",
      mode,
      answerMethod: "handwriting",
      resultChannel: overrides.resultChannel || mode,
      correctAnswer,
      correctIndex,
      solution: overrides.solution ?? answerSource.solution ?? question.solution ?? "",
      didacticPolicy: overrides.didacticPolicy ?? answerSource.didacticSpec ?? question.didacticSpec ?? null,
      scoreState: overrides.scoreState || {
        score: state.score,
        streak: state.streak,
        progressIndex: questionIndex
      },
      attemptContext: overrides.attemptContext || null
    },
    onValidated: overrides.onValidated || null
  });
}

function legacyOfficialQuestionDedupKey(question) {
  // Los apartados oficiales que se han dividido expresamente en preguntas
  // independientes conservan su propia identidad. Así no se eliminan entre sí
  // dos apartados distintos del mismo ejercicio PAU.
  if (/\bextra\b/i.test(String(question?.id || ""))) {
    return challengeQuestionIdentity(question);
  }
  const searchable = normalizeDisplayText([
    question?.source || "",
    question?.text || "",
    question?.statementHtml || ""
  ].join(" "))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  const year = searchable.match(/\b(20\d{2})\b/)?.[1];
  const session = searchable.match(/\b(junio|julio|septiembre|reserva\s*\d*)\b/)?.[1]?.replace(/\s+/g, "-");
  const exerciseMatch = searchable.match(/\b(\d+)\s*[º°]?\s*-\s*([a-d])\b/)
    || searchable.match(/\bejercicio\s+(\d+)[^a-z0-9]+apartado\s+([a-d])\b/);
  const exercise = exerciseMatch?.slice(1).join("-");
  if (year && session && exercise) return `oficial:${year}:${session}:${exercise}`;
  if (year && session) {
    const statementIdentity = normalizeDisplayText(question?.text || question?.statementHtml || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\b(?:enunciado\s+original|convocatoria|pregunta|ejercicio|apartado)\b/gi, " ")
      .replace(/\b20\d{2}\b/g, " ")
      .replace(/\b(?:junio|julio|septiembre|reserva\s*\d*)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    if (statementIdentity) return `oficial:${year}:${session}:enunciado:${statementIdentity}`;
  }
  return challengeQuestionIdentity(question);
}

function officialExerciseReference(searchable) {
  const normalized = String(searchable || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  if (!normalized) return "";

  const numberedPart = normalized.match(/\b(\d+)\s*[º°]?\s*-\s*([a-d])\b/)
    || normalized.match(/\bejercicio\s+(\d+)[^a-z0-9]+apartado\s+([a-d])\b/)
    || normalized.match(/\bejercicio\s+(\d+)\s*[,.;:-]*\s*(?:apartado\s*)?([a-d])\b/);
  if (numberedPart) return `ejercicio-${numberedPart[1]}-${numberedPart[2]}`;

  const decimalQuestion = normalized.match(/\b(?:pregunta|ejercicio)\s+(\d+)\s*[.,]\s*(\d+)\b/);
  if (decimalQuestion) return `pregunta-${decimalQuestion[1]}-${decimalQuestion[2]}`;

  const blockPart = normalized.match(/\b(primer|segundo|tercer|cuarto)\s+bloque\s+([a-d])\b/);
  if (blockPart) {
    const blockNumbers = { primer: 1, segundo: 2, tercer: 3, cuarto: 4 };
    return `bloque-${blockNumbers[blockPart[1]]}-${blockPart[2]}`;
  }

  const ordinalQuestion = normalized.match(/\b(\d+)\s*[º°]\s*\)\s*([a-d])?/);
  if (ordinalQuestion) return `pregunta-${ordinalQuestion[1]}${ordinalQuestion[2] ? `-${ordinalQuestion[2]}` : ""}`;

  const numberedExercise = normalized.match(/\bejercicio\s+(\d+)\b/);
  if (numberedExercise) return `ejercicio-${numberedExercise[1]}`;
  return "";
}

function officialQuestionDedupKey(question) {
  // Los apartados añadidos expresamente son preguntas distintas incluso si
  // comparten convocatoria y enunciado base.
  if (/\bextra\b/i.test(String(question?.id || ""))) {
    return challengeQuestionIdentity(question);
  }
  // Los bancos oficiales completos ya asignan un identificador estable a cada
  // ejercicio. Lo usamos para no confundir ejercicios distintos de una misma
  // convocatoria y, al mismo tiempo, unificar sus copias de tema, bloque y examen.
  const officialId = String(question?.rawBaseId || question?.id || "").match(
    /\b(?:mates2|ccss2)-[a-z0-9-]+/
  )?.[0];
  if (officialId) return `oficial-id:${officialId}`;
  const searchable = normalizeDisplayText([
    question?.source || "",
    question?.sourceLabel || "",
    question?.text || "",
    question?.statementHtml || ""
  ].join(" "))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  const year = searchable.match(/\b(20\d{2})\b/)?.[1];
  const session = searchable.match(/\b(junio|julio|septiembre|reserva\s*\d*)\b/)?.[1]?.replace(/\s+/g, "-");
  const reference = officialExerciseReference(searchable);
  if (year && session && reference) return `oficial:${year}:${session}:${reference}`;
  return legacyOfficialQuestionDedupKey(question);
}

function challengeHistoryIdentity(question) {
  // En 2.º de Bachillerato una misma pregunta oficial puede llegar desde el
  // catálogo corregido, el banco del bloque o el banco del tema con ids
  // distintos. Para el historial usamos la identidad oficial común y no el id
  // interno de cada copia.
  return BACH_II_COURSE_IDS.includes(question?.courseId || state.courseId)
    ? officialQuestionDedupKey(question)
    : challengeQuestionIdentity(question);
}

const CHALLENGE_ANSWER_HISTORY_KEY = "margarita-challenge-answer-history-v2";
const LEGACY_BACH_II_CHALLENGE_HISTORY_KEY = "margarita-bach-ii-challenge-history-v1";

function challengeStudentScopeKey(scopeKey) {
  const studentKey = currentStudentKey() || [state.academicYear, state.courseId, "sin-alumno"].join("__");
  const communityScope = BACH_II_COURSE_IDS.includes(state.courseId) ? `|pau-${currentBachPauCommunity()}` : "";
  return `${studentKey}${communityScope}|${scopeKey}`;
}

function legacyChallengeStudentScopeKey(scopeKey) {
  const studentKey = currentStudentKey() || [state.academicYear, state.courseId, "sin-alumno"].join("__");
  return `${studentKey}|${scopeKey}`;
}

function readChallengeAnswerHistory(scopeKey) {
  try {
    const history = JSON.parse(localStorage.getItem(CHALLENGE_ANSWER_HISTORY_KEY) || "{}") || {};
    const storageKey = challengeStudentScopeKey(scopeKey);
    const stored = Array.isArray(history[storageKey]) ? history[storageKey] : [];
    if (Object.prototype.hasOwnProperty.call(history, storageKey) || !BACH_II_COURSE_IDS.includes(state.courseId)) return stored;
    if (currentBachPauCommunity() === "clm") {
      const previousKey = legacyChallengeStudentScopeKey(scopeKey);
      const previousStored = Array.isArray(history[previousKey]) ? history[previousKey] : [];
      if (previousStored.length || Object.prototype.hasOwnProperty.call(history, previousKey)) return [...new Set(previousStored)];
    }
    const legacy = JSON.parse(localStorage.getItem(LEGACY_BACH_II_CHALLENGE_HISTORY_KEY) || "{}") || {};
    const legacyKey = currentBachPauCommunity() === "clm" ? legacyChallengeStudentScopeKey(scopeKey) : storageKey;
    const legacyStored = Array.isArray(legacy[legacyKey]) ? legacy[legacyKey] : [];
    return [...new Set(legacyStored)];
  } catch (_) {
    return [];
  }
}

function writeChallengeAnswerHistory(scopeKey, identities) {
  try {
    const history = JSON.parse(localStorage.getItem(CHALLENGE_ANSWER_HISTORY_KEY) || "{}") || {};
    history[challengeStudentScopeKey(scopeKey)] = [...new Set(identities)];
    localStorage.setItem(CHALLENGE_ANSWER_HISTORY_KEY, JSON.stringify(history));
  } catch (_) {
    // Si el almacenamiento no está disponible, se mantiene el historial de la sesión.
  }
}

function markChallengeQuestionAnswered(question) {
  if (!question) return;
  const scopeKey = question._historyScopeKey;
  const identity = question._historyIdentity || challengeHistoryIdentity(question);
  if (!scopeKey || !identity) return;

  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  const mustResetBefore = Boolean(question._historyResetBefore && !question._historyResetApplied);
  if (mustResetBefore) question._historyResetApplied = true;
  const previous = mustResetBefore
    ? []
    : [
      ...(state.challengeQuestionHistory[scopeKey] || []),
      ...readChallengeAnswerHistory(scopeKey)
    ];
  // Volvemos a colocar la identidad al final para conservar cuál fue el
  // último ejercicio respondido y evitar repetirlo al abrir un ciclo nuevo.
  const answered = [...new Set(previous)].filter((item) => item !== identity);
  answered.push(identity);
  state.challengeQuestionHistory[scopeKey] = answered;
  writeChallengeAnswerHistory(scopeKey, answered);
}

function markChallengeQuestionShown(question) {
  // Un ejercicio cuenta como visto cuando llega realmente a la pantalla, no
  // cuando forma parte de una preselección interna que quizá nunca se muestre.
  markChallengeQuestionAnswered(question);
}

function selectNoRepeatQuestionRound(questions, target, scopeKey, roundToken = state.practiceRound) {
  const unique = [];
  const identities = new Set();
  const identityAliases = new Map();
  (questions || []).forEach((question) => {
    const identity = challengeHistoryIdentity(question);
    if (!identity) return;
    identityAliases.set(challengeQuestionIdentity(question), identity);
    identityAliases.set(legacyOfficialQuestionDedupKey(question), identity);
    if (question?.id) identityAliases.set(String(question.id), identity);
    if (question?.rawBaseId) identityAliases.set(String(question.rawBaseId), identity);
    if (identities.has(identity)) return;
    identities.add(identity);
    unique.push(question);
  });
  if (!unique.length) return [];

  state.challengeQuestionHistory = state.challengeQuestionHistory || {};
  state.challengeRoundCache = state.challengeRoundCache || {};
  const roundKey = `${scopeKey}|ronda-${roundToken}`;
  if (state.challengeRoundCache[roundKey]) return state.challengeRoundCache[roundKey];

  const availableIdentities = new Set(unique.map(challengeHistoryIdentity));
  const canonicalizeHistory = (items) => (items || []).map((identity) => identityAliases.get(identity) || identity);
  const sessionHistory = canonicalizeHistory(state.challengeQuestionHistory[scopeKey] || []);
  const persistentHistory = canonicalizeHistory(readChallengeAnswerHistory(scopeKey));
  let used = new Set([...sessionHistory, ...persistentHistory].filter((identity) => availableIdentities.has(identity)));
  let available = unique.filter((question) => !used.has(challengeHistoryIdentity(question)));

  // Solo se reinicia el mazo cuando todos los ejercicios de este banco ya han sido respondidos.
  if (!available.length) {
    const lastIdentity = [...used].at(-1);
    used = lastIdentity && unique.length > 1 ? new Set([lastIdentity]) : new Set();
    state.challengeQuestionHistory[scopeKey] = [...used];
    writeChallengeAnswerHistory(scopeKey, [...used]);
    available = unique.filter((question) => !used.has(challengeHistoryIdentity(question)));
  }

  const seed = `${scopeKey}|${state.blockChallengeSeed || 0}|${roundToken}`;
  const shuffled = seededShuffle(available, seed);
  const templateBuckets = new Map();
  shuffled.forEach((question) => {
    const template = question.templateId || challengeHistoryIdentity(question);
    if (!templateBuckets.has(template)) templateBuckets.set(template, []);
    templateBuckets.get(template).push(question);
  });
  const ordered = [];
  while (ordered.length < shuffled.length) {
    templateBuckets.forEach((bucket) => {
      if (bucket.length) ordered.push(bucket.shift());
    });
  }
  const selected = ordered.slice(0, Math.min(target, ordered.length));
  let resetBeforeIdentity = "";

  // Si el reto cruza el final del banco, primero se muestran todos los ejercicios
  // inéditos. Después comienza un ciclo nuevo, sin repetir ninguno dentro de esta
  // misma ronda, para conservar las 5 preguntas de Matemáticas II o las 4 de CCSS II.
  if (selected.length < target && unique.length >= target) {
    const selectedIdentities = new Set(selected.map(challengeHistoryIdentity));
    used = new Set(selectedIdentities);
    const refillPool = unique.filter((question) => !selectedIdentities.has(challengeHistoryIdentity(question)));
    const refill = seededShuffle(refillPool, `${seed}|nuevo-ciclo`).slice(0, target - selected.length);
    resetBeforeIdentity = refill.length ? challengeHistoryIdentity(refill[0]) : "";
    selected.push(...refill);
  }

  const preparedSelection = selected.map((question) => ({
    ...question,
    _historyScopeKey: scopeKey,
    _historyIdentity: challengeHistoryIdentity(question),
    _historyResetBefore: Boolean(resetBeforeIdentity && challengeHistoryIdentity(question) === resetBeforeIdentity)
  }));
  state.challengeRoundCache[roundKey] = preparedSelection;
  return preparedSelection;
}

function joinExerciseParagraphs(paragraphs, html = false) {
  return (paragraphs || [])
    .map((paragraph) => html ? `<p>${normalizeOfficialMathHtml(paragraph.html)}</p>` : paragraph.plain)
    .filter((value) => String(value || "").trim())
    .join(html ? "" : "\n");
}

function normalizeOfficialMathHtml(value) {
  return String(value || "")
    .replace(/<msup><mrow><mi>([A-Za-z])<\/mi><\/mrow><mrow><mi>'<\/mi><\/mrow><\/msup>/g, '<mi class="math-point-prime">$1′</mi>')
    .replace(/<mi>f<\/mi><mo>\(<\/mo><mi>x<\/mi><mo>\)<\/mo>/g, '<mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo>');
}

function exercisePartPrompt(part, html = false) {
  const joined = joinExerciseParagraphs(part?.paragraphs, html) || (html ? "<p>Selecciona el resultado correcto.</p>" : "Selecciona el resultado correcto.");
  const escapedLabel = String(part?.label || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!escapedLabel) return joined;
  return html
    ? joined.replace(new RegExp(`^(<p[^>]*>)\\s*${escapedLabel}\\s*`, "i"), "$1")
    : joined.replace(new RegExp(`^\\s*${escapedLabel}\\s*`, "i"), "");
}

function officialPartAnswer(authored, parts, part, partIndex) {
  const answer = authored?.[part?.label] || authored?.Resultado;
  if (!Array.isArray(answer)) return answer;
  const occurrence = (parts || [])
    .slice(0, partIndex + 1)
    .filter((candidate) => candidate?.label === part?.label)
    .length - 1;
  return answer[occurrence] || null;
}

function buildCcssIIBlockQuestions(blockId) {
  const course = courseById("2bach-ccss");
  const correctedPool = window.MargaritaBachExam?.buildBlockQuestions?.(course, blockId) || [];
  const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId);
  const selectedTopics = [...new Set(
    Array.isArray(state.blockTopicIndexes) && state.blockTopicIndexes.length
      ? state.blockTopicIndexes
      : block?.topics || []
  )];
  if (!correctedPool.length || !selectedTopics.length) return [];
  const questionCount = questionsPerChallengeFor("2bach-ccss");
  const baseQuota = Math.floor(questionCount / selectedTopics.length);
  const remainder = questionCount % selectedTopics.length;
  const bonusOrder = seededShuffle(
    selectedTopics,
    `${state.courseId}|bloque-${blockId}|reparto|${state.blockChallengeSeed || 0}|${state.practiceRound}`
  );
  const quotas = new Map(selectedTopics.map((topicIndex) => [topicIndex, baseQuota]));
  bonusOrder.slice(0, remainder).forEach((topicIndex) => quotas.set(topicIndex, quotas.get(topicIndex) + 1));

  const selected = [];
  const selectedIdentities = new Set();
  const poolsByTopic = new Map(selectedTopics.map((topicIndex) => [topicIndex, correctedPool.filter((question) => {
    const indexes = Array.isArray(question.topicIndexes) ? question.topicIndexes : [];
    if (Number.isInteger(question.primaryTopicIndex)) return question.primaryTopicIndex === topicIndex;
    return indexes.includes(topicIndex);
  })]));
  // Se asignan primero los temas con menos PAU disponibles. Así un ejercicio
  // mixto Matrices/Determinantes se reserva para Determinantes cuando sea el
  // único compatible, sin duplicarlo después como ejercicio de Matrices.
  const topicOrder = [...selectedTopics].sort((left, right) =>
    (poolsByTopic.get(left)?.length || 0) - (poolsByTopic.get(right)?.length || 0));
  topicOrder.forEach((topicIndex) => {
    const topicPool = (poolsByTopic.get(topicIndex) || [])
      .filter((question) => !selectedIdentities.has(officialQuestionDedupKey(question)));
    const topicSelection = selectNoRepeatQuestionRound(
      topicPool,
      quotas.get(topicIndex) || 0,
      `${state.courseId}|bloque-${blockId}|tema-${topicIndex}`
    ).map((question) => ({ ...question, selectedBlockTopicIndex: topicIndex }));
    topicSelection.forEach((question) => selectedIdentities.add(officialQuestionDedupKey(question)));
    selected.push(...topicSelection);
  });
  return seededShuffle(
    selected,
    `${state.courseId}|bloque-${blockId}|orden|${state.blockChallengeSeed || 0}|${state.practiceRound}`
  );
}

function splitCompositeSegments(value) {
  const text = String(value || "");
  const matches = [...text.matchAll(/(?:^|\n)\s*([a-d](?:\.\d+)?\))\s*/gi)];
  if (matches.length < 2) return null;
  return matches.map((match, index) => ({
    label: match[1].toLowerCase(),
    text: text.slice(match.index + match[0].length, matches[index + 1]?.index ?? text.length).trim()
  }));
}

function splitOrderedCompositeOption(value, partCount) {
  if (partCount < 2) return null;
  const semicolonParts = String(value || "").split(/\s*;\s*/).map((part) => part.trim()).filter(Boolean);
  if (semicolonParts.length >= partCount) {
    return [
      ...semicolonParts.slice(0, partCount - 1),
      semicolonParts.slice(partCount - 1).join("; ")
    ];
  }
  if (partCount === 3 && semicolonParts.length === 2) {
    const finalPair = semicolonParts[1].split(/,\s*(?=(?:crece|decrece|aumenta|disminuye)\b)/i);
    if (finalPair.length >= 2) {
      return [semicolonParts[0], finalPair[0].trim(), finalPair.slice(1).join(", ").trim()];
    }
  }
  return null;
}

function expandCompositeQuestionParts(question) {
  const statementParts = splitCompositeSegments(question.text);
  if (!statementParts) return question;
  const labelledOptionParts = question.options?.map(splitCompositeSegments);
  const orderedOptionParts = question.options?.map((option) => splitOrderedCompositeOption(option, statementParts.length));
  const optionParts = labelledOptionParts?.every((parts) => parts?.length === statementParts.length)
    ? labelledOptionParts.map((parts) => parts.map((part) => part.text))
    : orderedOptionParts?.every((parts) => parts?.length === statementParts.length)
      ? orderedOptionParts
      : null;
  if (!optionParts) return question;
  const statementStart = question.text.search(/(?:^|\n)\s*[a-d](?:\.\d+)?\)\s*/i);
  return {
    ...question,
    text: statementStart > 0 ? question.text.slice(0, statementStart).trim() : "",
    parts: statementParts.map((part, partIndex) => ({
      label: part.label,
      text: part.text,
      options: optionParts.map((parts) => parts[partIndex]),
      correct: question.correct,
      solution: question.partSolutions?.[partIndex] || question.solution
    }))
  };
}

function buildMatesIIBlockQuestions(course, blockId) {
  const questionCount = 5;
  const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId);
  if (!block) return [];

  const correctedPool = window.MargaritaBachExam?.buildBlockQuestions?.(course, blockId) || [];
  const madridOnly = currentBachPauCommunity() === "madrid";
  const extraOfficialPool = madridOnly ? [] : window.MATES_II_EXTRA_BLOCK_QUESTIONS?.[blockId] || [];

  const seen = new Set();
  const pool = madridOnly ? [] : block.topics.flatMap((topicIndex) => {
    const theme = course.themes[topicIndex] || "";
    return pickExerciseBank(theme.toLowerCase(), course.id)
      .map((question) => question.options?.length ? question : withPauTestOptions(question))
      .filter(hasOfficialConvocation)
      .filter(questionHasCoherentOptions)
      .filter((question) => !/\bccss\b|ciencias\s+sociales/i.test(normalizeDisplayText(question.text || "")));
  }).filter((question) => {
    const identity = officialQuestionDedupKey(question);
    if (!identity || seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });

  const combinedPool = [];
  const combinedIdentities = new Set();
  [...correctedPool, ...extraOfficialPool, ...pool].filter(hasOfficialConvocation).forEach((question) => {
    const identity = officialQuestionDedupKey(question);
    if (!identity || combinedIdentities.has(identity)) return;
    combinedIdentities.add(identity);
    combinedPool.push(question);
  });
  const usablePool = combinedPool;
  return selectNoRepeatQuestionRound(
    usablePool,
    questionCount,
    `${course.id}|bloque-oficial-${blockId}`
  ).map((question, index) => {
    if (question.parts?.length) return { ...question, blockId };
    // Los registros oficiales de Madrid se incorporan de forma progresiva.
    // Mientras un problema no tenga todavía cuatro alternativas validadas,
    // conserva el flujo abierto de trabajo manual en lugar de intentar rotar
    // un array inexistente y dejar todo el bloque sin ejercicios.
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      return { ...question, blockId };
    }
    const amount = (state.practiceRound + index) % question.options.length;
    return expandCompositeQuestionParts({
      ...question,
      blockId,
      options: rotate(question.options, amount),
      correct: (question.correct - amount + question.options.length) % question.options.length
    });
  });
}

function seededShuffle(items, seedText) {
  const result = [...items];
  let seed = 0;
  for (let i = 0; i < seedText.length; i += 1) seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
  for (let i = result.length - 1; i > 0; i -= 1) {
    seed = (1664525 * seed + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function supplementalExercisesFor(lower, courseId) {
  if (lower.includes("funcion")) {
    return [
      { text: "El dominio de una función es...", options: ["Los valores posibles de x", "Los valores posibles de y", "La pendiente", "La ordenada en el origen"], correct: 0, solution: "El dominio indica qué valores puede tomar la variable independiente." },
      { text: "La imagen o recorrido de una función es...", options: ["Los valores posibles de y", "Los valores prohibidos", "La fórmula", "El eje X"], correct: 0, solution: "La imagen recoge los valores de salida de la función." },
      { text: "Si f(x)=2x+1, f(3) vale...", options: ["7", "6", "5", "9"], correct: 0, solution: "Sustituimos x por 3: 2 x 3 + 1 = 7." },
      { text: "El corte con el eje X se calcula haciendo...", options: ["y = 0", "x = 0", "x = 1", "La pendiente igual a 0 siempre"], correct: 0, solution: "En el eje X la coordenada y vale 0." },
      { text: "Una función creciente, al aumentar x, hace que y...", options: ["Aumente", "Disminuya", "Sea siempre 0", "No exista"], correct: 0, solution: "Creciente significa que los valores de la función suben al avanzar en x." }
    ];
  }
  if (lower.includes("matrice")) {
    return [
      { text: "Para multiplicar A·B debe cumplirse...", options: ["Columnas de A = filas de B", "Misma dimensión siempre", "Ambas con determinante", "Misma diagonal"], correct: 0, solution: "El producto existe si coinciden columnas de la primera y filas de la segunda." },
      { text: "La traspuesta se obtiene...", options: ["Cambiando filas por columnas", "Cambiando signos", "Sumando la diagonal", "Multiplicando por cero"], correct: 0, solution: "La traspuesta intercambia filas y columnas." },
      { text: "La matriz identidad tiene...", options: ["Unos en la diagonal y ceros fuera", "Todos ceros", "Todos unos", "Determinante cero siempre"], correct: 0, solution: "La identidad conserva una matriz al multiplicar." },
      { text: "Si A tiene inversa, A·A^-1 es...", options: ["La identidad", "La nula", "A", "-A"], correct: 0, solution: "Una matriz por su inversa da la identidad." },
      { text: "Dos matrices se suman cuando tienen...", options: ["La misma dimensión", "El mismo determinante", "Una sola fila", "Elementos positivos"], correct: 0, solution: "La suma se hace elemento a elemento en matrices de la misma dimensión." }
    ];
  }
  if (lower.includes("determinante") || lower.includes("sistemas con determinantes")) {
    return [
      { text: "Si dos filas son iguales, el determinante vale...", options: ["0", "1", "-1", "2"], correct: 0, solution: "Dos filas iguales hacen dependientes las filas." },
      { text: "Intercambiar dos filas hace que el determinante...", options: ["Cambie de signo", "No cambie", "Sea 0 siempre", "Se eleve al cuadrado"], correct: 0, solution: "El intercambio de filas cambia el signo." },
      { text: "Una matriz con determinante distinto de 0 es...", options: ["Invertible", "Nula", "No cuadrada", "Imposible"], correct: 0, solution: "Una matriz cuadrada con determinante no nulo tiene inversa." },
      { text: "Cramer se usa directamente si el determinante principal es...", options: ["Distinto de 0", "Igual a 0", "Negativo siempre", "Mayor que 100"], correct: 0, solution: "Con determinante principal no nulo hay solución única." },
      { text: "En una matriz triangular, el determinante es...", options: ["Producto de la diagonal", "Suma de filas", "La traza", "Siempre 1"], correct: 0, solution: "En matrices triangulares se multiplican los elementos diagonales." }
    ];
  }
  if (lower.includes("derivada")) {
    return [
      { text: "Deriva sen(x).", options: ["cos(x)", "-cos(x)", "sen(x)", "-sen(x)"], correct: 0, solution: "La derivada del seno es el coseno." },
      { text: "Deriva e^x.", options: ["e^x", "xe^(x-1)", "ln(x)", "1/e^x"], correct: 0, solution: "e^x coincide con su derivada." },
      { text: "Si f'(x)>0 en un intervalo, la función es...", options: ["Creciente", "Decreciente", "Constante siempre", "Discontinua"], correct: 0, solution: "Derivada positiva indica crecimiento." },
      { text: "La pendiente de la tangente en x=a es...", options: ["f'(a)", "f(a)", "a", "f''(a) siempre"], correct: 0, solution: "La derivada en el punto da la pendiente de la tangente." },
      { text: "Los candidatos a extremo suelen cumplir...", options: ["f'(x)=0", "f(x)=0 siempre", "x=0 siempre", "f(x)=1"], correct: 0, solution: "Los puntos críticos suelen salir de anular la primera derivada." }
    ];
  }
  if (lower.includes("integral")) {
    return [
      { text: "Una integral indefinida debe llevar...", options: ["+ C", "Solo límites", "Una matriz", "Un porcentaje"], correct: 0, solution: "La constante aparece porque hay infinitas primitivas." },
      { text: "Integral de cos(x) dx.", options: ["sen(x) + C", "-sen(x) + C", "cos(x) + C", "tg(x) + C"], correct: 0, solution: "La derivada de sen(x) es cos(x)." },
      { text: "Por Barrow, integral de a a b de f(x) dx es...", options: ["F(b)-F(a)", "F(a)-F(b)", "f(b)-f(a)", "F(a)+F(b)"], correct: 0, solution: "Se evalúa una primitiva en el extremo superior menos el inferior." },
      { text: "Si f es positiva, la integral definida representa...", options: ["Área bajo la curva", "Pendiente", "Módulo", "Mediana"], correct: 0, solution: "Con función positiva, integral y área coinciden." },
      { text: "Integral de e^x dx.", options: ["e^x + C", "xe^x + C", "ln(x)+C", "1/x+C"], correct: 0, solution: "e^x es su propia primitiva." }
    ];
  }
  if (lower.includes("limite") || lower.includes("continuidad")) {
    return [
      { text: "Si los límites laterales son distintos, el límite...", options: ["No existe", "Vale 0", "Vale 1", "Es la suma"], correct: 0, solution: "Para existir, los límites laterales deben coincidir." },
      { text: "Para que f sea continua en a se necesita...", options: ["lim f(x)=f(a)", "f'(a)=0", "f(a)=0", "a=0"], correct: 0, solution: "La continuidad exige que el límite coincida con el valor." },
      { text: "lim x->infinito de 3x/(x+1) es...", options: ["3", "0", "1", "infinito"], correct: 0, solution: "Dominan los términos de grado 1: 3x/x = 3." },
      { text: "Una discontinuidad de salto aparece si...", options: ["Los límites laterales son finitos y distintos", "La función es constante", "El límite coincide con f(a)", "No hay fórmula"], correct: 0, solution: "El salto se ve cuando los laterales no coinciden." },
      { text: "Ante una indeterminación 0/0 conviene...", options: ["Transformar la expresión", "Responder 0 siempre", "Responder 1 siempre", "No calcular"], correct: 0, solution: "Hay que factorizar, simplificar o racionalizar según el caso." }
    ];
  }
  if (lower.includes("probabilidad")) {
    return [
      { text: "La regla de Laplace usa...", options: ["Casos favorables / casos posibles", "Media / desviación", "Derivada / función", "Área / base"], correct: 0, solution: "Se usa con casos equiprobables." },
      { text: "Si A y B son incompatibles, P(A∩B) vale...", options: ["0", "1", "P(A)P(B)", "P(A)+P(B)"], correct: 0, solution: "No pueden ocurrir a la vez." },
      { text: "P(A|B) significa...", options: ["Probabilidad de A sabiendo B", "Probabilidad de B sabiendo A", "Unión", "Contrario"], correct: 0, solution: "La barra vertical expresa condición." },
      { text: "P(A contrario) es...", options: ["1 - P(A)", "P(A)-1", "P(A)/2", "P(A)^2"], correct: 0, solution: "Un suceso y su contrario completan el total." },
      { text: "Un diagrama de árbol ayuda a calcular...", options: ["Probabilidades compuestas", "Derivadas", "Determinantes", "Áreas de triángulos"], correct: 0, solution: "Organiza etapas y ramas con sus probabilidades." }
    ];
  }
  if (lower.includes("estadistica") || lower.includes("binomial") || lower.includes("normal") || lower.includes("muestreo") || lower.includes("inferencia")) {
    return [
      { text: "En B(n,p), la varianza es...", options: ["npq", "np", "p/n", "n+p"], correct: 0, solution: "En binomial, varianza = npq, con q=1-p." },
      { text: "En una normal N(mu,sigma), mu es...", options: ["La media", "La desviación típica", "La varianza", "El tamaño muestral"], correct: 0, solution: "mu representa el centro de la distribución." },
      { text: "Tipificar transforma una normal en...", options: ["N(0,1)", "B(n,p)", "Una matriz", "Una recta"], correct: 0, solution: "La normal típica tiene media 0 y desviación típica 1." },
      { text: "Una muestra debe ser...", options: ["Representativa", "Toda la población siempre", "Vacía", "De un solo dato"], correct: 0, solution: "Debe reflejar razonablemente la población." },
      { text: "La desviación típica mide...", options: ["Dispersión", "Centro", "Probabilidad segura", "Número de clases"], correct: 0, solution: "Indica cuánto se separan los datos de la media." }
    ];
  }
  return [];
}

function generatedExercisesFor(lower, courseId, seed) {
  if (lower.includes("complejo")) return generatedComplexExercises(seed);
  return [];
}

const PAU_SYSTEM_2000_OPTIONS = [
  "Si a = 10, el sistema es compatible determinado y (x, y, z) = (11, 6, 4). Si a ≠ 10, es incompatible.",
  "Si a = 10, el sistema es compatible indeterminado. Si a ≠ 10, es compatible determinado.",
  "Para todo a, el sistema es compatible determinado y (x, y, z) = (11, 6, 4).",
  "Si a = 10, el sistema es incompatible. Si a ≠ 10, es compatible determinado."
];

const PAU_SYSTEM_2000_SOLUTION = `Aplicamos el teorema de Rouché-Frobenius.
1. Escribimos la matriz de coeficientes A y la matriz ampliada A*:
A = [[1, -1, 0], [0, 1, 1], [1, 0, -2], [2, 0, -3]],
A* = [[1, -1, 0, 5], [0, 1, 1, a], [1, 0, -2, 3], [2, 0, -3, a]].

2. Calculamos el rango de A. Elegimos el menor de orden 3 formado por las tres primeras filas:
D = det [[1, -1, 0], [0, 1, 1], [1, 0, -2]].
Aplicamos la regla de Sarrus:
D = 1·1·(-2)+(-1)·1·1+0·0·0-[0·1·1+(-1)·0·(-2)+1·1·0] = -3 ≠ 0.
Como A tiene tres columnas y existe un menor de orden 3 no nulo, rango(A)=3 para cualquier valor de a.

3. Estudiamos el rango de A* mediante su determinante:
Δ(a) = det [[1, -1, 0, 5], [0, 1, 1, a], [1, 0, -2, 3], [2, 0, -3, a]].
Para hacer cero el elemento a₂₂ realizamos la operación elemental F₂ ← F₂+F₁. Sumar a una fila otra fila no cambia el determinante:
Δ(a) = det [[1, -1, 0, 5], [1, 0, 1, a+5], [1, 0, -2, 3], [2, 0, -3, a]].
Desarrollamos por la segunda columna. Su único elemento no nulo es -1, situado en la posición (1,2):
Δ(a) = (-1)·(-1)^(1+2)·det [[1, 1, a+5], [1, -2, 3], [2, -3, a]]
= det [[1, 1, a+5], [1, -2, 3], [2, -3, a]].
Calculamos este determinante de orden 3 mediante Sarrus:
Δ(a)=(-2a+6-3a-15)-(-4a-20+a-9)=-2a+20=-2(a-10).
Por tanto, Δ(a)=0 únicamente cuando a=10.

4. Aplicamos el teorema de Rouché-Frobenius:
- Si a≠10, Δ(a)≠0 y rango(A*)=4, mientras que rango(A)=3. Como rango(A)≠rango(A*), el sistema es incompatible y no tiene solución.
- Si a=10, Δ(10)=0. Entonces rango(A*)≤3; además, el menor D=-3 también está contenido en A*, por lo que rango(A*)≥3. En consecuencia, rango(A*)=rango(A)=3. Como hay tres incógnitas, el sistema es compatible determinado (SCD) y tiene una única solución.

5. Identificamos la ecuación que es combinación lineal cuando a=10. Si F₁, F₂, F₃ y F₄ son las filas de la matriz ampliada, se cumple:
F₁+F₂+5F₃=(6,0,-9 | 30)=3(2,0,-3 | 10)=3F₄.
Por tanto, 3F₄=F₁+F₂+5F₃ y la cuarta ecuación es combinación lineal de las tres primeras. Resolvemos el sistema equivalente:
x-y=5,
y+z=10,
x-2z=3.

6. Resolución por la regla de Cramer. El determinante principal es D=-3≠0. Sustituimos sucesivamente cada columna por los términos independientes:
Dₓ = det [[5, -1, 0], [10, 1, 1], [3, 0, -2]]
=5·1·(-2)+(-1)·1·3+0·10·0-[0·1·3+(-1)·10·(-2)+5·1·0]=-33.
Dᵧ = det [[1, 5, 0], [0, 10, 1], [1, 3, -2]]
=1·10·(-2)+5·1·1+0·0·3-[0·10·1+5·0·(-2)+1·1·3]=-18.
D_z = det [[1, -1, 5], [0, 1, 10], [1, 0, 3]]
=1·1·3+(-1)·10·1+5·0·0-[5·1·1+(-1)·0·3+1·10·0]=-12.
Así:
x=frac{Dₓ}{D}=frac{-33}{-3}=11,
y=frac{Dᵧ}{D}=frac{-18}{-3}=6,
z=frac{D_z}{D}=frac{-12}{-3}=4.

7. También puede resolverse por Gauss. Partimos de la matriz ampliada del sistema de tres ecuaciones:
[[1, -1, 0, 5], [0, 1, 1, 10], [1, 0, -2, 3]].
Primero hacemos F₃ ← F₃-F₁:
[[1, -1, 0, 5], [0, 1, 1, 10], [0, 1, -2, -2]].
Después hacemos F₃ ← F₃-F₂:
[[1, -1, 0, 5], [0, 1, 1, 10], [0, 0, -3, -12]].
La última fila da -3z=-12, luego z=4. Sustituyendo hacia atrás, y+4=10 y por tanto y=6; finalmente, x-6=5 y x=11.

8. Comprobamos la solución en las cuatro ecuaciones:
11-6=5,
6+4=10,
11-2·4=3,
2·11-3·4=22-12=10.

Resultado final:
Si a=10, el sistema es SCD y su única solución es (x,y,z)=(11,6,4). Si a≠10, el sistema es incompatible.`;

const PAU_CONTINUITY_2000_OPTIONS = [
  "a=0 y b=3; es continua en todo ℝ y no es derivable en x=0 ni en x=1",
  "a=0 y b=3; es derivable en x=0 y en x=1",
  "a=3 y b=0; no es derivable en x=0",
  "a=1 y b=2; no es continua en x=1"
];

const PAU_CONTINUITY_2000_SOLUTION = `Resolución:
1. Cada una de las tres ramas es continua en el interior de su intervalo. Solo debemos estudiar los puntos donde cambia la expresión: x=0 y x=1.

2. Continuidad en x=0.
Límite por la izquierda, usando la primera rama:
lim x→0- f(x)=lim x→0- x^2=0.
Valor de la función, porque la primera rama incluye x=0:
f(0)=0^2=0.
Límite por la derecha, usando la segunda rama:
lim x→0+ f(x)=lim x→0+ (a+bx)=a.
Imponemos la condición de continuidad:
lim x→0- f(x)=f(0)=lim x→0+ f(x).
Sustituimos:
0=0=a ⇒ a=0.

3. Continuidad en x=1.
Límite por la izquierda, usando la segunda rama:
lim x→1- f(x)=lim x→1- (a+bx)=a+b.
Valor de la función, porque la segunda rama incluye x=1:
f(1)=a+b.
Límite por la derecha, usando la tercera rama:
lim x→1+ f(x)=lim x→1+ 3=3.
Imponemos la condición de continuidad:
lim x→1- f(x)=f(1)=lim x→1+ f(x).
Sustituimos:
a+b=a+b=3 ⇒ a+b=3.
Como a=0:
0+b=3 ⇒ b=3.

4. Sustituimos a=0 y b=3. La función continua queda:
f(x)={x^2 si x≤0; 3x si 0<x≤1; 3 si x>1}.

5. Derivamos cada rama y escribimos la función derivada completa:
(x^2)'=2x,
(3x)'=3,
(3)'=0.
f'(x)={2x si x<0; 3 si 0<x<1; 0 si x>1}.

6. Derivabilidad en x=0. Sustituimos en la rama derivada de cada lado:
f'(0-)=lim x→0- 2x=0,
f'(0+)=lim x→0+ 3=3.
Como f'(0-)≠f'(0+), f no es derivable en x=0.

7. Derivabilidad en x=1. Sustituimos de la misma forma:
f'(1-)=lim x→1- 3=3,
f'(1+)=lim x→1+ 0=0.
Como f'(1-)≠f'(1+), f no es derivable en x=1.

Resultado final:
a=0 y b=3. La función es continua en todo ℝ y derivable en ℝ excepto en {0, 1}; no es derivable ni en x=0 ni en x=1.`;

function withPauTestOptions(question) {
  const text = question.text.toLowerCase();
  const add = (options, solutionExtra = "") => ({
    ...question,
    options,
    correct: 0,
    // La resolución calculada sustituye a cualquier antigua plantilla de pistas.
    solution: solutionExtra || question.solution
  });

  if (text.includes("resolver el sistema de ecuaciones matriciales") && text.includes("3x - 2y") && text.includes("x + 3y")) {
    return add([
      "X = [[3, 3], [4, 6]]\nY = [[1, 3], [-2, 7]]",
      "X = [[1, 3], [-2, 7]]\nY = [[3, 3], [4, 6]]",
      "X = [[3, 9], [-6, 21]]\nY = [[1, 3], [-2, 7]]",
      "X = [[6, 12], [-2, 27]]\nY = [[7, 3], [16, 4]]"
    ], "Resolución paso a paso:\n1. Llamamos A = [[7, 3], [16, 4]] y B = [[6, 12], [-2, 27]].\n2. El sistema queda:\n3X - 2Y = A\nX + 3Y = B\n3. De la segunda ecuación despejamos X:\nX = B - 3Y.\n4. Sustituimos en la primera:\n3(B - 3Y) - 2Y = A.\n5. Desarrollamos:\n3B - 9Y - 2Y = A, luego 3B - 11Y = A.\n6. Despejamos Y:\n11Y = 3B - A, por tanto Y = (3B - A)/11.\n7. Calculamos 3B:\n3B = [[18, 36], [-6, 81]].\n8. Restamos A:\n3B - A = [[18-7, 36-3], [-6-16, 81-4]] = [[11, 33], [-22, 77]].\n9. Dividimos entre 11:\nY = [[1, 3], [-2, 7]].\n10. Ahora usamos X = B - 3Y:\n3Y = [[3, 9], [-6, 21]].\n11. Restamos:\nX = [[6, 12], [-2, 27]] - [[3, 9], [-6, 21]] = [[3, 3], [4, 6]].\nResultado final:\nX = [[3, 3], [4, 6]] e Y = [[1, 3], [-2, 7]].");
  }

  if (text.includes("10 cajas") && text.includes("390 camisetas")) {
    return add([
      "5 grandes, 3 medianas y 2 pequeñas",
      "4 grandes, 2 medianas y 4 pequeñas",
      "3 grandes, 5 medianas y 2 pequeñas",
      "5 grandes, 2 medianas y 3 pequeñas"
    ], `Resolución:
1. Llamamos G, M y P al número de cajas grandes, medianas y pequeñas.
2. El número total de cajas da la ecuación:
G+M+P=10.
3. La capacidad total da:
50G+30M+25P=390.
4. Si una caja grande pasa a ser mediana, quedan G-1 grandes y M+1 medianas. Como entonces habría el mismo número:
G-1=M+1 ⇒ G=M+2.
5. Sustituimos G=M+2 en la ecuación del total:
(M+2)+M+P=10 ⇒ P=8-2M.
6. Sustituimos en la ecuación de las camisetas:
50(M+2)+30M+25(8-2M)=390.
7. Desarrollamos y resolvemos:
50M+100+30M+200-50M=390
30M=90 ⇒ M=3.
8. Calculamos las otras cantidades:
G=M+2=5, y P=8-2M=2.
9. Comprobación:
5+3+2=10 y 50·5+30·3+25·2=250+90+50=390.
Resultado final:
Hay 5 cajas grandes, 3 medianas y 2 pequeñas.`);
  }
  if (text.includes("15 centimos") && text.includes("sms")) {
    return add([
      "4 SMS y 7 llamadas; beneficio maximo 235 centimos",
      "5 SMS y 2 llamadas; beneficio maximo 125 centimos",
      "3 SMS y 0 llamadas; beneficio maximo 45 centimos",
      "0 SMS y 3 llamadas; beneficio maximo 75 centimos"
    ], `Resolución:
1. Sea x el número de SMS e y el número de llamadas de un minuto.
2. Las restricciones son:
y≤x+3, y≥x-3, 5x+y≤27, x≥0, y≥0.
3. La función que debemos maximizar es:
B(x,y)=15x+25y.
4. Los vértices de la región factible son (0,0), (0,3), (4,7), (5,2) y (3,0).
5. Evaluamos el beneficio en cada vértice:
B(0,0)=0,
B(0,3)=75,
B(4,7)=15·4+25·7=60+175=235,
B(5,2)=125,
B(3,0)=45.
6. El mayor valor es 235 y se alcanza en (4,7).
Resultado final:
Se deben enviar 4 SMS y realizar 7 llamadas. El beneficio máximo es 235 céntimos.`);
  }
  if (text.includes("tres monedas") && text.includes("probabilidad de que salga cara")) {
    return add([
      "P(cara)=11/18 y P(una cara y una cruz)=4/9",
      "P(cara)=1/2 y P(una cara y una cruz)=2/9",
      "P(cara)=5/9 y P(una cara y una cruz)=1/3",
      "P(cara)=2/3 y P(una cara y una cruz)=5/9"
    ], `Resolución:
1. Las tres monedas se eligen con probabilidad 1/3. Sus probabilidades de cara son 1/2, 1 y 1/3.
2. Aplicamos la fórmula de la probabilidad total:
P(cara)=(1/3)·(1/2)+(1/3)·1+(1/3)·(1/3).
3. Calculamos con denominador común 18:
P(cara)=3/18+6/18+2/18=11/18.
4. Con la moneda trucada, P(cara)=1/3 y P(cruz)=2/3.
5. Una cara y una cruz puede aparecer como cara-cruz o cruz-cara:
P=2·(1/3)·(2/3)=4/9.
Resultado final:
P(cara)=11/18 y P(una cara y una cruz)=4/9.`);
  }
  if (text.includes("55% presenta obesidad") && text.includes("hipertension")) {
    return add([
      "P(H∪O)=0,60 y P(O|H)=0,75",
      "P(H∪O)=0,75 y P(O|H)=0,60",
      "P(H∪O)=0,90 y P(O|H)=0,15",
      "P(H∪O)=0,35 y P(O|H)=0,20"
    ], `Resolución:
1. Denotamos por O el suceso “tener obesidad” y por H el suceso “tener hipertensión”.
2. Para la unión usamos:
P(H∪O)=P(H)+P(O)-P(H∩O).
3. Sustituimos:
P(H∪O)=0,20+0,55-0,15=0,60.
4. Para la probabilidad condicionada usamos:
P(O|H)=P(O∩H)/P(H).
5. Sustituimos:
P(O|H)=0,15/0,20=0,75.
Resultado final:
P(H∪O)=0,60 y P(O|H)=0,75.`);
  }
  if (text.includes("36 juguetes") && text.includes("97 horas")) {
    return add([
      "IC aproximado: (92,58 ; 101,42)",
      "IC aproximado: (95,37 ; 98,63)",
      "IC aproximado: (87,00 ; 107,00)",
      "IC aproximado: (93,73 ; 100,27)"
    ], `Resolución:
1. Como se conoce la desviación típica poblacional, usamos:
IC = x̄ ± z·σ/√n.
2. Los datos son x̄=97, σ=10 y n=36. Para un nivel de confianza del 99,2 %, z≈2,65.
3. Calculamos el error máximo:
E=2,65·10/√36=26,5/6≈4,42.
4. Calculamos los extremos:
97-4,42=92,58,
97+4,42=101,42.
5. Interpretación: con este procedimiento, el 99,2 % de los intervalos construidos de la misma forma contendrían la media poblacional.
Resultado final:
IC≈(92,58; 101,42) horas.`);
  }
  if (text.includes("2·x - b = a·x")) {
    return add([
      "X = (2I-A)^(-1)B = [[1, -1], [-1, 1], [0, 1]]",
      "X = (2I-A)^(-1)B = [[1, 1], [-1, -1], [0, 1]]",
      "X = B(2I-A)^(-1) = [[1, -1], [1, -1], [0, 1]]",
      "X = (A-2I)^(-1)B = [[-1, 1], [1, -1], [0, -1]]"
    ], "Resolución:\n1. Agrupamos los términos que contienen X: 2X-AX=B.\n2. Sacamos X como factor por la derecha: (2I-A)X=B.\n3. Calculamos 2I-A = [[1, 0, -1], [-2, 1, 0], [1, -3, 1]].\n4. Como det(2I-A)=-4 distinto de 0, la matriz es invertible.\n5. Multiplicamos por su inversa a la izquierda: X=(2I-A)^(-1)B.\n6. Al efectuar el producto obtenemos X=[[1, -1], [-1, 1], [0, 1]].\nResultado final:\nX = [[1, -1], [-1, 1], [0, 1]].");
  }
  if (text.includes("x - y = 5") && text.includes("2x - 3z = a")) {
    return add([
      "Compatible determinado si a=10, con (x,y,z)=(11,6,4); incompatible si a≠10",
      "Compatible determinado para todo a",
      "Compatible indeterminado si a=10",
      "Incompatible si a=10 y compatible si a≠10"
    ], PAU_SYSTEM_2000_SOLUTION);
  }
  if (text.includes("p(2, 4, 1)") && text.includes("3x + 4y + 12z - 8")) {
    return add([
      "Distancia 2 y punto mas cercano (20/13, 44/13, -11/13)",
      "Distancia 13 y punto mas cercano (2,4,1)",
      "Distancia 26 y punto mas cercano (3,4,12)",
      "Distancia 1/2 y punto mas cercano (13,13,13)"
    ], `Resolución:
1. Aplicamos la fórmula de la distancia de un punto P(x₀,y₀,z₀) al plano Ax+By+Cz+D=0:
d(P,π)=|Ax₀+By₀+Cz₀+D|/√(A²+B²+C²).
2. Sustituimos P(2,4,1) y π: 3x+4y+12z-8=0:
d=|3·2+4·4+12·1-8|/√(3²+4²+12²)
=|26|/√169=26/13=2.
3. El vector normal del plano es n=(3,4,12). La recta perpendicular al plano que pasa por P es:
(x,y,z)=(2,4,1)+t(3,4,12).
4. Sustituimos esta recta en el plano:
3(2+3t)+4(4+4t)+12(1+12t)-8=0.
5. Simplificamos:
26+169t=0 ⇒ t=-2/13.
6. Sustituimos el valor de t en la recta:
H=(2,4,1)-(2/13)(3,4,12)
=(20/13, 44/13, -11/13).
Resultado final:
La distancia es 2 y el punto del plano más cercano es H=(20/13, 44/13, -11/13).`);
  }
  if (text.includes("simetrico de a(1, 2, 3)") && text.includes("x - y + 1")) {
    return add([
      "P=(7/3, 10/3, 5/3)",
      "P=(5/3, 8/3, 7/3)",
      "P=(-1/3, 2/3, -1/3)",
      "P=(3, 4, 1)"
    ], `Resolución:
1. Escribimos la recta en forma paramétrica. De x-y+1=0 obtenemos y=x+1, y de 2x-z-1=0 obtenemos z=2x-1.
Tomando x=t:
r: (x,y,z)=(t,t+1,2t-1).
2. Un vector director de la recta es v=(1,1,2).
3. Sea H=(t,t+1,2t-1) el punto de la recta que es la proyección ortogonal de A=(1,2,3). Entonces AH es perpendicular a v:
(A-H)·v=0.
4. Sustituimos:
(1-t)+(2-t-1)+2(3-2t+1)=0.
5. Simplificamos:
10-6t=0 ⇒ t=5/3.
6. Por tanto:
H=(5/3,8/3,7/3).
7. Como H es el punto medio de A y su simétrico P:
P=2H-A.
8. Calculamos:
P=2(5/3,8/3,7/3)-(1,2,3)
=(7/3,10/3,5/3).
Resultado final:
El punto simétrico es P=(7/3, 10/3, 5/3).`);
  }
  if (text.includes("f(x) = { x^2") && text.includes("a+bx")) {
    return {
      ...question,
      options: PAU_CONTINUITY_2000_OPTIONS,
      correct: 0,
      solution: PAU_CONTINUITY_2000_SOLUTION
    };
  }
  if (text.includes("|x+2|") && text.includes("(x-2)^2")) {
    return add([
      "k=1",
      "k=0",
      "k=2",
      "k=-1"
    ], `Resolución:
1. Para que f sea continua en x=-1 deben coincidir el valor de la primera rama y el límite de la rama central.
2. Calculamos la primera rama:
f(-1)=|-1+2|=1.
3. La rama central vale k, por tanto:
k=1.
Resultado final:
k=1.`);
  }
  if (text.includes("r(t)=300t(1-t)")) {
    return add([
      "Aumenta hasta t=1/2, maximo 75; se anula en t=0 y t=1",
      "Aumenta hasta t=1, maximo 300; se anula en t=1/2",
      "Disminuye siempre; maximo 0",
      "Maximo en t=0, con R=300"
    ], `Resolución:
1. Desarrollamos la función:
R(t)=300t(1-t)=300t-300t².
2. Es una parábola abierta hacia abajo porque el coeficiente de t² es negativo.
3. Se anula cuando:
300t(1-t)=0 ⇒ t=0 o t=1.
4. Derivamos para estudiar el crecimiento:
R'(t)=300-600t.
5. Igualamos a cero:
300-600t=0 ⇒ t=1/2.
R'(t)>0 si t<1/2 y R'(t)<0 si t>1/2. Por ello aumenta hasta t=1/2 y después disminuye.
6. Calculamos el valor máximo:
R(1/2)=300·(1/2)·(1-1/2)=75.
Resultado final:
El rendimiento aumenta hasta t=1/2, alcanza el máximo 75 y se anula en t=0 y t=1.`);
  }
  if (text.includes("c=x^2-300x+100") && text.includes("u=1000-x")) {
    return add([
      "325 unidades",
      "300 unidades",
      "500 unidades",
      "650 unidades"
    ], `Resolución:
1. Los ingresos por vender x unidades son:
I(x)=x(1000-x)=1000x-x².
2. El coste es:
C(x)=x²-300x+100.
3. El beneficio es la diferencia entre ingresos y costes:
B(x)=I(x)-C(x)
=1000x-x²-(x²-300x+100)
=-2x²+1300x-100.
4. Derivamos:
B'(x)=-4x+1300.
5. Buscamos el punto crítico:
-4x+1300=0 ⇒ x=325.
6. Comprobamos que es un máximo:
B''(x)=-4<0.
7. Calculamos el beneficio máximo:
B(325)=-2·325²+1300·325-100=211150.
Resultado final:
Deben venderse 325 unidades y el beneficio máximo es 211150 pesetas.`);
  }

  return question;
}

function generatedComplexExercises(seed) {
  const a = 2 + (seed % 5);
  const b = 1 + ((seed + 2) % 6);
  const c = 1 + ((seed + 4) % 5);
  return [
    { text: `Si z = ${a} + ${b}i, ¿cuál es Re(z)?`, options: optionSet(a, [`${b}`, `${a}i`, `${a + b}`]), correct: 0, solution: "La parte real es el número que no multiplica a i." },
    { text: `Si z = ${a} - ${b}i, ¿cuál es Im(z)?`, options: optionSet(-b, [`${b}`, `${a}`, `-${a}`]), correct: 0, solution: "La parte imaginaria es el coeficiente de i, con su signo." },
    { text: `El conjugado de ${a} + ${b}i es...`, options: [`${a} - ${b}i`, `-${a} + ${b}i`, `${b} + ${a}i`, `${a + b}i`], correct: 0, solution: "El conjugado conserva la parte real y cambia el signo de la imaginaria." },
    { text: `El opuesto de ${a} - ${b}i es...`, options: [`-${a} + ${b}i`, `${a} + ${b}i`, `-${a} - ${b}i`, `${b} - ${a}i`], correct: 0, solution: "El opuesto cambia el signo de la parte real y de la parte imaginaria." },
    { text: `Calcula (${a}+${b}i)+(${c}-${b}i).`, options: [`${a + c}`, `${a + c}+${2 * b}i`, `${a - c}`, `${a + c}-${b}i`], correct: 0, solution: "Se suman partes reales y partes imaginarias: las imaginarias se anulan." },
    { text: `Calcula (${a}+${b}i)-(${c}+i).`, options: [`${a - c}+${b - 1}i`, `${a + c}+${b + 1}i`, `${a - c}+${b + 1}i`, `${a + c}+${b - 1}i`], correct: 0, solution: "Al restar, cambia el signo de todo el segundo complejo." },
    { text: `El módulo de ${a}+${b}i se calcula con...`, options: [`sqrt(${a * a}+${b * b})`, `${a}+${b}`, `${a * b}`, `sqrt(${a}+${b})`], correct: 0, solution: "El módulo es la longitud del vector: sqrt(a^2+b^2)." },
    { text: `Si z=${a}+${b}i, z·conj(z) vale...`, options: optionSet(a * a + b * b, [a + b, a * b, a * a - b * b]), correct: 0, solution: "Un complejo por su conjugado da a^2+b^2." },
    { text: `El punto que representa ${a}-${b}i es...`, options: [`(${a}, -${b})`, `(-${a}, ${b})`, `(${b}, ${a})`, `(${a}, ${b})`], correct: 0, solution: "La parte real va en el eje X y la imaginaria en el eje Y." },
    { text: `i^${4 + (seed % 4)} se reduce usando...`, options: ["Ciclo de periodo 4", "Regla de Laplace", "Determinantes", "Teorema de Tales"], correct: 0, solution: "Las potencias de i repiten cada 4: i, -1, -i, 1." }
  ];
}

function optionSet(correct, distractors) {
  return [String(correct), ...distractors.map(String)];
}

function generatedBasicExercises(lower, seed) {
  const a = 2 + (seed % 5);
  const b = 6 + (seed % 7);
  const c = 3 + (seed % 4);
  const pct = [10, 20, 25, 50][seed % 4];
  const total = 40 + seed * 5;
  return [
    { text: `Calcula: ${b} + ${a} x (${c} + 4)`, options: optionSet(b + a * (c + 4), [b + a + c + 4, (b + a) * (c + 4), b * a + c + 4]), correct: 0, solution: `Primero el paréntesis: ${c} + 4 = ${c + 4}. Luego multiplicamos: ${a} x ${c + 4} = ${a * (c + 4)}. Sumamos ${b}: ${b + a * (c + 4)}.` },
    { text: `Calcula: ${a}^3`, options: optionSet(a ** 3, [a * 3, a ** 2, a + 3]), correct: 0, solution: `${a}^3 = ${a} x ${a} x ${a} = ${a ** 3}.` },
    { text: `Calcula ${pct}% de ${total}.`, options: optionSet((pct * total) / 100, [pct, total - pct, (pct * total) / 10]), correct: 0, solution: `${pct}% de ${total} es ${total} x ${pct}/100 = ${(pct * total) / 100}.` },
    { text: `Resuelve: x + ${b} = ${b + c}`, options: optionSet(c, [b, b + c, c - b]), correct: 0, solution: `Restamos ${b} en ambos lados: x = ${b + c} - ${b} = ${c}.` },
    { text: `Calcula: ${a}/${c} de ${c * b}`, options: optionSet(a * b, [b, c * b - a, a + b]), correct: 0, solution: `Dividimos ${c * b} entre ${c}: ${b}. Multiplicamos por ${a}: ${a * b}.` },
    { text: `Ordena de menor a mayor: ${a}, -${b}, 0, ${c}`, options: [`-${b}, 0, ${a}, ${c}`, `0, -${b}, ${a}, ${c}`, `${c}, ${a}, 0, -${b}`, `-${b}, ${a}, 0, ${c}`], correct: 0, solution: `Los negativos van antes que 0. Después van los positivos de menor a mayor.` },
    { text: `Simplifica la fracción ${a * 2}/${a * 4}.`, options: ["1/2", "2/4", "1/4", "2/8"], correct: 0, solution: `Dividimos numerador y denominador entre ${a * 2}: queda 1/2.` },
    { text: `Si un producto cuesta ${total} euros y baja un 10%, ¿cuánto baja?`, options: optionSet(total / 10, [10, total - 10, total + 10]), correct: 0, solution: `El 10% es dividir entre 10: ${total} : 10 = ${total / 10}.` },
    { text: `Calcula: ${b * c} : ${c} + ${a}`, options: optionSet(b + a, [b * c + a, b, a]), correct: 0, solution: `Primero la división: ${b * c} : ${c} = ${b}. Luego sumamos ${a}: ${b + a}.` },
    { text: `¿Cuál es el doble de ${total / 5}?`, options: optionSet((total / 5) * 2, [total / 5, total, (total / 5) + 2]), correct: 0, solution: `Doble significa multiplicar por 2: ${total / 5} x 2 = ${(total / 5) * 2}.` },
    { text: `Calcula: (${a} + ${c})^2`, options: optionSet((a + c) ** 2, [a ** 2 + c ** 2, a + c * 2, (a + c) * 2]), correct: 0, solution: `Primero ${a} + ${c} = ${a + c}. Luego elevamos al cuadrado: ${(a + c) ** 2}.` },
    { text: `Resuelve: ${a}x = ${a * b}`, options: optionSet(b, [a, a * b, b - a]), correct: 0, solution: `Dividimos entre ${a}: x = ${a * b} : ${a} = ${b}.` },
    { text: `Media de ${a}, ${b} y ${c}.`, options: optionSet(((a + b + c) / 3).toFixed(2), [a + b + c, b, c]), correct: 0, solution: `Sumamos ${a}+${b}+${c}=${a + b + c} y dividimos entre 3.` },
    { text: `En una bolsa hay ${a} rojas y ${c} azules. Probabilidad de azul.`, options: [`${c}/${a + c}`, `${a}/${a + c}`, `${a + c}/${c}`, "1/2"], correct: 0, solution: `Hay ${c} azules de ${a + c} bolas en total: ${c}/${a + c}.` },
    { text: `Calcula: ${total} - ${b} x ${a}`, options: optionSet(total - b * a, [total - b - a, (total - b) * a, total + b * a]), correct: 0, solution: `Primero multiplicamos ${b} x ${a} = ${b * a}. Luego restamos: ${total - b * a}.` }
  ];
}

function generatedUpperEsoExercises(lower, seed) {
  const a = 2 + (seed % 4);
  const b = 3 + (seed % 6);
  return [
    ...generatedBasicExercises(lower, seed).slice(0, 5),
    { text: `Resuelve: ${a}x + ${b} = ${a * b + b}`, options: optionSet(b, [a, a + b, b + 1]), correct: 0, solution: `Restamos ${b}: ${a}x = ${a * b}. Dividimos entre ${a}: x = ${b}.` },
    { text: `Simplifica: x^${a + 3} : x^${a}`, options: [`x^3`, `x^${2 * a + 3}`, `x^${a}`, "x^1"], correct: 0, solution: `Al dividir potencias de la misma base restamos exponentes: ${a + 3} - ${a} = 3. Resultado final: x^3.` },
    { text: `Si f(x)=${a}x-${b}, calcula f(${b}).`, options: optionSet(a * b - b, [a + b, a * b, b - a]), correct: 0, solution: `Sustituimos x por ${b}: ${a} x ${b} - ${b} = ${a * b - b}.` },
    { text: `Resuelve: x^2 = ${b ** 2}`, options: [`x = ${b} o x = -${b}`, `x = ${b}`, `x = ${b ** 2}`, `x = -${b ** 2}`], correct: 0, solution: `Dos números tienen cuadrado ${b ** 2}: ${b} y -${b}.` },
    { text: `Pendiente de y = ${a}x + ${b}.`, options: optionSet(a, [b, a + b, -b]), correct: 0, solution: `En y=mx+n, la pendiente es m. Aquí m=${a}.` },
    { text: `Factoriza: x^2 - ${b ** 2}`, options: [`(x - ${b})(x + ${b})`, `(x - ${b})^2`, `x(x - ${b})`, `(x + ${b})^2`], correct: 0, solution: `Es diferencia de cuadrados: x^2 - ${b}^2.` },
    { text: `Calcula sqrt(${(a * b) ** 2}).`, options: optionSet(a * b, [a + b, (a * b) ** 2, b]), correct: 0, solution: `La raíz cuadrada de ${(a * b) ** 2} es ${a * b}.` },
    { text: `Resuelve el sistema: x+y=${a + b}, x-y=${b - a}`, options: [`x = ${b}, y = ${a}`, `x = ${a}, y = ${b}`, `x = ${a + b}, y = 0`, `x = ${b - a}, y = ${a}`], correct: 0, solution: `Sumamos ecuaciones: 2x=${2 * b}, x=${b}. Luego y=${a}.` },
    { text: `Calcula el ${a * 10}% de ${b * 20}.`, options: optionSet((a * 10 * b * 20) / 100, [a * b, b * 20 - a, a * 10]), correct: 0, solution: `${a * 10}% de ${b * 20} es ${(a * 10 * b * 20) / 100}.` },
    { text: `Valor de f(0) si f(x)=x^2+${b}.`, options: optionSet(b, [0, b ** 2, 1]), correct: 0, solution: `Sustituimos x=0: 0^2 + ${b} = ${b}.` }
  ];
}

function generatedBachExercises(lower, seed) {
  const a = 2 + (seed % 4);
  const b = 3 + (seed % 5);
  return [
    ...generatedUpperEsoExercises(lower, seed).slice(5, 10),
    { text: `Deriva f(x)=${a}x^2 + ${b}x.`, options: [`${2 * a}x + ${b}`, `${a}x + ${b}`, `${2 * a}x`, `${a}x^2`], correct: 0, solution: `Derivada de ${a}x^2 es ${2 * a}x y derivada de ${b}x es ${b}.` },
    { text: `Calcula integral de ${a}x^${b} dx.`, options: [`${a}/${b + 1} x^${b + 1} + C`, `${a * b}x^${b - 1} + C`, `${a}x^${b} + C`, `x^${b + 1} + C`], correct: 0, solution: `Subimos el exponente a ${b + 1} y dividimos entre ${b + 1}.` },
    { text: `lim x->${a} de (x + ${b})`, options: optionSet(a + b, [a, b, a * b]), correct: 0, solution: `Es continua, sustituimos: ${a}+${b}=${a + b}.` },
    { text: `det [[${a},0],[0,${b}]]`, options: optionSet(a * b, [a + b, 0, a - b]), correct: 0, solution: `En una diagonal, el determinante es el producto: ${a} x ${b} = ${a * b}.` },
    { text: `Si A y B son independientes, P(A)=${a}/10 y P(B)=${b}/10. P(A∩B)=`, options: [`${a * b}/100`, `${a + b}/10`, `${a}/${b}`, `${b}/${a}`], correct: 0, solution: `Independientes: multiplicamos probabilidades, (${a}/10)(${b}/10)=${a * b}/100.` },
    { text: `En B(${b + 5}, ${a}/10), la media es...`, options: [`${((b + 5) * a / 10).toFixed(1)}`, `${b + 5 + a / 10}`, `${a}/10`, `${b + 5}`], correct: 0, solution: `En una binomial, media = np = ${b + 5} x ${a}/10.` },
    { text: `Traza de [[${a},1],[0,${b}]]`, options: optionSet(a + b, [a * b, a, b]), correct: 0, solution: `La traza suma la diagonal principal: ${a}+${b}=${a + b}.` },
    { text: `Resuelve e^x = e^${a}.`, options: [`x = ${a}`, `x = e`, `x = ${a ** 2}`, "x = 0"], correct: 0, solution: `Si las bases son iguales, igualamos exponentes: x=${a}.` },
    { text: `Deriva f(x)=1/x en x=${a}.`, options: [`-${(1 / (a * a)).toFixed(3)}`, `${(1 / a).toFixed(3)}`, `${a}`, `-${a}`], correct: 0, solution: `f'(x)=-1/x^2. En x=${a}: -1/${a ** 2}.` },
    { text: `Integral de ${b} dx entre 0 y ${a}.`, options: optionSet(a * b, [a + b, b, a]), correct: 0, solution: `Área de un rectángulo: base ${a} por altura ${b}, resultado ${a * b}.` }
  ];
}

function matesIModelBank(lower) {
  if (lower.includes("complejo")) return exerciseBanks.matesIComplejos;
  if (lower.includes("numero") || lower.includes("real")) return exerciseBanks.matesIReales;
  if (lower.includes("trigonometr")) return exerciseBanks.matesITrigonometria;
  if (lower.includes("geometria analitica")) return exerciseBanks.matesIGeometriaAnalitica;
  if (lower.includes("conica")) return exerciseBanks.matesIConicas;
  if (lower.includes("limite")) return exerciseBanks.matesILimites;
  if (lower.includes("aplicacion de derivada")) return exerciseBanks.matesIAplicacionDerivadas;
  if (lower.includes("derivada")) return exerciseBanks.matesIDerivadas;
  if (lower.includes("funcion")) return exerciseBanks.matesIFunciones;
  if (lower.includes("probabilidad")) return exerciseBanks.matesIProbabilidad;
  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) return exerciseBanks.matesIEcuaciones;
  return null;
}

function matesIExtensionBank(lower) {
  const suppliedLimits = Array.isArray(window.MATES_I_LIMITS_BANK) ? window.MATES_I_LIMITS_BANK : [];
  const suppliedDerivatives = Array.isArray(window.MATES_I_DERIVATIVES_BANK) ? window.MATES_I_DERIVATIVES_BANK : [];
  const suppliedDerivativeApplications = Array.isArray(window.MATES_I_DERIVATIVE_APPLICATIONS_BANK)
    ? window.MATES_I_DERIVATIVE_APPLICATIONS_BANK
    : [];
  if (lower.includes("complejo")) return exerciseBanks.complejos;
  if (lower.includes("numero") || lower.includes("real")) return exerciseBanks.realesBach;
  if (lower.includes("trigonometr")) return exerciseBanks.trigonometriaBach;
  if (lower.includes("geometria analitica")) return exerciseBanks.geometriaAnalitica;
  if (lower.includes("conica")) return exerciseBanks.conicas;
  if (lower.includes("limite")) {
    return [...exerciseBanks.limites, ...suppliedLimits]
      .filter((question) => !isForbiddenIntroLimitQuestion(question, "1bach-mates", lower));
  }
  if (lower.includes("aplicacion de derivada")) {
    return [...exerciseBanks.derivadas, ...suppliedDerivativeApplications];
  }
  if (lower.includes("derivada")) return [...exerciseBanks.derivadas, ...suppliedDerivatives];
  if (lower.includes("funcion")) return exerciseBanks.funciones;
  if (lower.includes("probabilidad")) return exerciseBanks.probabilidadBach;
  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) return exerciseBanks.ecuacionesBach;
  return [];
}

function matesIRepeatBank(lower) {
  if (lower.includes("numero") || lower.includes("real")) {
    return [
      { text: "Simplifica √(98).", options: ["7√(2)", "49√(2)", "2√(7)", "14√(7)"], correct: 0, solution: "Solucion:\n1. Descomponemos 98=49x2.\n2. Entonces √(98)=√(49)√(2)=7√(2).\nResultado final: 7√(2)." },
      { text: "Simplifica √(12)+√(27).", options: ["5√(3)", "39", "√(39)", "3√(5)"], correct: 0, solution: "Solucion:\n1. Simplificamos cada radical: √(12)=√(4x3)=2√(3) y √(27)=√(9x3)=3√(3).\n2. Sumamos radicales semejantes: 2√(3)+3√(3)=5√(3).\nResultado final: 5√(3)." },
      { text: "Racionaliza 2/√(3).", options: ["2√(3)/3", "√(3)/2", "2√(3)", "3√(2)/2"], correct: 0, solution: "Solucion:\n1. Multiplicamos numerador y denominador por √(3).\n2. 2/√(3)=2√(3)/(√(3)√(3))=2√(3)/3.\nResultado final: 2√(3)/3." },
      { text: "Calcula √(3) · √(12).", options: ["6", "√(15)", "3√(12)", "12"], correct: 0, solution: "Solucion:\n1. Multiplicamos dentro de una sola raiz: √(3)√(12)=√(36).\n2. √(36)=6.\nResultado final: 6." },
      { text: "Simplifica √(8)/√(2).", options: ["2", "4", "√(6)", "√(10)"], correct: 0, solution: "Solucion:\n1. Dividimos los radicandos: √(8)/√(2)=√(8/2).\n2. √(4)=2.\nResultado final: 2." },
      { text: "Expresa 1/√(5) sin raiz en el denominador.", options: ["√(5)/5", "5√(5)", "1/5", "√(5)"], correct: 0, solution: "Solucion:\n1. Multiplicamos por √(5)/√(5).\n2. 1/√(5)=√(5)/5.\nResultado final: √(5)/5." },
      { text: "Simplifica (√(5))^2.", options: ["5", "√(25)", "10", "√(10)"], correct: 0, solution: "Solucion:\n1. Una raiz cuadrada elevada al cuadrado devuelve el radicando.\n2. (√(5))^2=5.\nResultado final: 5." },
      { text: "Calcula √(18)-√(2).", options: ["2√(2)", "√(16)", "4", "3√(2)"], correct: 0, solution: "Solucion:\n1. Simplificamos √(18)=√(9x2)=3√(2).\n2. Restamos radicales semejantes: 3√(2)-√(2)=2√(2).\nResultado final: 2√(2)." }
    ];
  }
  return [];
}

function ccssIModelBank(lower) {
  if (lower.includes("estadistica")) return exerciseBanks.ccssIEstadistica;
  if (lower.includes("probabilidad") && !lower.includes("distribucion")) return exerciseBanks.ccssIProbabilidad;
  if (lower.includes("binomial")) return exerciseBanks.ccssIBinomial;
  if (lower.includes("normal")) return exerciseBanks.ccssINormal;
  if (lower.includes("complejo")) return exerciseBanks.ccssIComplejos;
  if (lower.includes("numero") || lower.includes("real")) return exerciseBanks.ccssIReales;
  if (lower.includes("inecuacion")) return exerciseBanks.ccssIInecuaciones;
  if (lower.includes("ecuacion") || lower.includes("sistema")) return exerciseBanks.ccssIEcuaciones;
  if (lower.includes("aplicacion") && lower.includes("derivada")) return exerciseBanks.matesIAplicacionDerivadas;
  if (lower.includes("derivada")) return exerciseBanks.matesIDerivadas;
  if (lower.includes("funcion")) return exerciseBanks.ccssIFunciones;
  if (lower.includes("combinatoria")) return exerciseBanks.ccssICombinatoria;
  return null;
}

function ccssIIModelBank(lower) {
  const legacy = (bank) => (bank || []).map((question) => ({
    ...question,
    sourceType: "legacy-unverified",
    officialStatus: "legacy-unverified"
  }));
  if (lower.includes("matrice")) return legacy(exerciseBanks.ccssIIPauMatrices);
  if (lower.includes("determinante") && !lower.includes("sistema")) return legacy(exerciseBanks.ccssIIPauMatrices);
  if (lower.includes("sistema")) return legacy(exerciseBanks.ccssIIPauSistemas);
  if (lower.includes("programacion lineal")) return legacy(exerciseBanks.ccssIIPauProgramacionLineal);
  if (lower.includes("limite") || lower.includes("continuidad")) return legacy(exerciseBanks.ccssIIPauFuncionesContinuidad);
  if (lower.includes("derivada")) return legacy(exerciseBanks.ccssIIPauFuncionesContinuidad);
  // Estos bancos heredados solo sirven para enlazar respuestas antiguas con
  // enunciados oficiales. La práctica visible usa MargaritaTopicPracticeBanks.
  if (lower.includes("integrales indefinidas")) return legacy(exerciseBanks.ccssIIIntegralesIndefinidas);
  if (lower.includes("integrales definidas")) return legacy(exerciseBanks.ccssIIIntegralesDefinidas);
  if (lower.includes("probabilidad") && !lower.includes("distribucion")) return legacy(exerciseBanks.ccssIIPauProbabilidad);
  // La práctica visible de los temas 10 y 11 usa exclusivamente la
  // clasificación limpia a nivel de apartado. El banco heredado no se emplea
  // para evitar que inferencia contamine Distribución binomial y normal.
  if (lower.includes("distribucion") || lower.includes("binomial") || lower.includes("normal")) return [];
  if (lower.includes("muestreo") || lower.includes("inferencia")) return legacy(exerciseBanks.ccssIIPauMuestreoInferencia);
  return null;
}

function matesIIModelBank(lower) {
  if (lower.includes("matrice")) return exerciseBanks.matesIIPauMatrices;
  if (lower.includes("determinante")) return exerciseBanks.matesIIPauDeterminantes;
  if (lower.includes("sistema")) return exerciseBanks.matesIIPauSistemas;
  if (lower.includes("vectores")) return exerciseBanks.matesIIPauGeometria;
  if (lower.includes("planos") || lower.includes("rectas")) return exerciseBanks.matesIIPauGeometria;
  if (lower.includes("metricas")) return exerciseBanks.matesIIPauGeometria;
  if (lower.includes("limite")) return exerciseBanks.matesIIPauLimites;
  if (lower.includes("continuidad")) return exerciseBanks.matesIIPauContinuidad;
  if (lower.includes("aplicacion de derivada")) return exerciseBanks.matesIIPauAplicacionDerivadas;
  if (lower.includes("derivada")) return exerciseBanks.matesIIPauDerivadas;
  if (lower.includes("integrales indefinidas")) return exerciseBanks.matesIIPauIntegrales;
  if (lower.includes("integrales definidas")) return exerciseBanks.matesIIPauIntegrales;
  if (lower.includes("probabilidad") || lower.includes("distribucion") || lower.includes("binomial")) return exerciseBanks.ccssIIPauProbabilidad;
  return null;
}

function pauPendingBank(lower, courseId) {
  const courseName = courseDisplayName(courseId) || "2º Bachillerato";
  return [{
    type: "pau-open",
    text: `${courseName}\nTema pendiente de seleccionar ejercicios PAU literales.\n\nEste reto no debe usar ejercicios genericos. Hay que cargar aqui enunciados reales de PAU del tema "${lower}".`,
    solution: "Aviso para el profesor: este tema necesita enunciados PAU reales antes de usarlo con alumnos."
  }];
}

function ccssIExtensionBank(lower) {
  if (lower.includes("estadistica") || lower.includes("normal") || lower.includes("binomial")) return [];
  if (lower.includes("probabilidad")) return exerciseBanks.probabilidadBach;
  if (lower.includes("complejo")) return exerciseBanks.complejos;
  if (lower.includes("numero") || lower.includes("real")) return exerciseBanks.realesBach;
  if (lower.includes("inecuacion")) return [];
  if (lower.includes("ecuacion") || lower.includes("sistema")) return exerciseBanks.ecuacionesBach;
  if (lower.includes("funcion")) return exerciseBanks.funciones;
  if (lower.includes("combinatoria")) return exerciseBanks.combinatoria;
  return [];
}

function fourEsoAModelBank(lower) {
  if (lower.includes("real")) return exerciseBanks.fourEsoAReales;
  if (lower.includes("radical")) return exerciseBanks.fourEsoARadicales;
  if (lower.includes("proporcional")) return exerciseBanks.fourEsoAProporcionalidad;
  if (lower.includes("expresion") || lower.includes("algebra")) return exerciseBanks.fourEsoAExpresiones;
  if (lower.includes("sistema")) return exerciseBanks.fourEsoASistemas;
  if (lower.includes("ecuacion") || lower.includes("inecuacion")) return exerciseBanks.fourEsoAEcuaciones;
  if (lower.includes("semejanza") || lower.includes("trigonometr")) return exerciseBanks.fourEsoASemejanzaTrigonometria;
  if (lower.includes("area") || lower.includes("cuerpo") || lower.includes("geometrico")) return exerciseBanks.fourEsoAAreasCuerpos;
  if (lower.includes("funcion")) return window.MargaritaFourEsoAOwnBanks?.model?.("funciones") || [];
  return null;
}

function fourEsoBModelBank(lower) {
  // Matemáticas B debe disponer de una capa propia. La capa combina sus
  // originales controlados, sus exámenes verificados y el banco específico
  // de combinatoria, sin heredar bancos ordinarios de Matemáticas A.
  return window.MargaritaFourEsoBOwnBanks?.model?.(lower) || [];
}

function threeEsoModelBank(lower) {
  // 3.º ESO dispone de bancos originales, exámenes verificados y generadores
  // propios. No debe heredar modelos de 4.º ESO ni bancos compartidos cuya
  // procedencia curricular no pueda garantizarse.
  return [];
}

function twoEsoModelBank(lower) {
  if (lower.includes("entero")) return exerciseBanks.operaciones;
  if (lower.includes("potencia") || lower.includes("raices")) return exerciseBanks.potencias;
  if (lower.includes("fraccion")) return exerciseBanks.fracciones;
  if (lower.includes("proporcional")) return exerciseBanks.fourEsoAProporcionalidad;
  if (lower.includes("expresion") || lower.includes("algebra")) return exerciseBanks.fourEsoAExpresiones;
  if (lower.includes("sistema") || lower.includes("ecuacion")) return exerciseBanks.fourEsoASistemas;
  if (lower.includes("figura") || lower.includes("plana")) return exerciseBanks.geometriaEso;
  if (lower.includes("cuerpo") || lower.includes("geometrico")) return exerciseBanks.fourEsoAAreasCuerpos;
  if (lower.includes("funcion")) return exerciseBanks.fourEsoBFunciones;
  return null;
}

function oneEsoModelBank(lower) {
  if (lower.includes("natural")) return exerciseBanks.operaciones;
  if (lower.includes("entero")) return exerciseBanks.operaciones;
  if (lower.includes("potencia") || lower.includes("raices")) return exerciseBanks.potencias;
  if (lower.includes("fraccion") && lower.includes("decimal")) return [...exerciseBanks.fracciones, ...exerciseBanks.decimales];
  if (lower.includes("fraccion")) return exerciseBanks.fracciones;
  if (lower.includes("expresion") || lower.includes("algebra")) return exerciseBanks.fourEsoAExpresiones;
  if (lower.includes("proporcional")) return exerciseBanks.fourEsoAProporcionalidad;
  if (lower.includes("medida") || lower.includes("angulo") || lower.includes("recta") || lower.includes("circunferencia")) return exerciseBanks.geometriaEso;
  if (lower.includes("semejanza") || lower.includes("pitagoras") || lower.includes("area")) return exerciseBanks.fourEsoASemejanzaTrigonometria;
  if (lower.includes("cuerpo") || lower.includes("geometrico")) return exerciseBanks.fourEsoAAreasCuerpos;
  if (lower.includes("funcion")) return exerciseBanks.fourEsoBFunciones;
  return null;
}

function pickExerciseBank(lower, courseId) {
  const isBach = courseId.includes("bach");
  const isUpperEso = courseId === "3eso" || courseId.includes("4eso");

  if (isBach) {
    if (courseId === "1bach-mates") {
      const bank = matesIModelBank(lower);
      if (bank?.length) return bank;
    }
    if (courseId === "1bach-ccss") {
      const bank = ccssIModelBank(lower);
      if (bank?.length) return bank;
    }
    if (courseId === "2bach-ccss") {
      const bank = ccssIIModelBank(lower);
      if (bank?.length) return bank;
      return pauPendingBank(lower, courseId);
    }
    if (courseId === "2bach-mates") {
      const bank = matesIIModelBank(lower);
      if (bank?.length) return bank;
      return pauPendingBank(lower, courseId);
    }
    if (lower.includes("complejo")) return exerciseBanks.complejos;
    if (lower.includes("numero") || lower.includes("real") || lower.includes("logaritmo")) return exerciseBanks.realesBach;
    if (lower.includes("trigonometr")) return exerciseBanks.trigonometriaBach;
    if (lower.includes("geometria analitica") || lower.includes("vectores") || lower.includes("planos") || lower.includes("rectas") || lower.includes("metricas")) return exerciseBanks.geometriaAnalitica;
    if (lower.includes("conica")) return exerciseBanks.conicas;
    if (lower.includes("programacion lineal")) return exerciseBanks.programacionLineal;
    if (lower.includes("combinatoria")) return exerciseBanks.combinatoria;
    if (lower.includes("matrice")) return exerciseBanks.matrices;
    if (lower.includes("determinante")) return exerciseBanks.determinantes;
    if (lower.includes("derivada")) return exerciseBanks.derivadas;
    if (lower.includes("integral")) return exerciseBanks.integrales;
    if (lower.includes("limite") || lower.includes("continuidad")) return exerciseBanks.limites;
    if (lower.includes("probabilidad")) return exerciseBanks.probabilidadBach;
    if (lower.includes("estadistica") || lower.includes("muestreo") || lower.includes("normal") || lower.includes("binomial")) return exerciseBanks.estadisticaBach;
    if (lower.includes("funcion")) return exerciseBanks.funciones;
    if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) return exerciseBanks.ecuacionesBach;
    return [];
  }

  if (isUpperEso) {
    if (courseId === "3eso") {
      const bank = threeEsoModelBank(lower);
      return bank;
    }
    if (courseId === "4eso-a") {
      const bank = fourEsoAModelBank(lower);
      if (bank?.length) return bank;
    }
    if (courseId === "4eso-b") {
      const bank = fourEsoBModelBank(lower);
      // No caer en los bancos genéricos ni en bancos de Matemáticas A cuando
      // un tema B todavía tenga originales pendientes de revisión visual.
      return bank;
    }
    if (lower.includes("potencia") || lower.includes("raices") || lower.includes("radical")) return exerciseBanks.potenciasUpper;
    if (lower.includes("polinomio")) return exerciseBanks.polinomios;
    if (lower.includes("trigonometr")) return exerciseBanks.trigonometriaEso;
    if (lower.includes("geometria analitica")) return exerciseBanks.geometriaAnalitica;
    if (lower.includes("geometria") || lower.includes("pitagoras") || lower.includes("movimientos") || lower.includes("semejanza")) return exerciseBanks.geometriaEso;
    if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) return exerciseBanks.ecuacionesUpper;
    if (lower.includes("funcion")) return exerciseBanks.funciones;
    if (lower.includes("probabilidad")) return exerciseBanks.probabilidad;
    if (lower.includes("estadistica")) return exerciseBanks.estadistica;
    if (lower.includes("proporcional") || lower.includes("porcentaje")) return exerciseBanks.porcentajes;
    if (lower.includes("real")) return exerciseBanks.realesBach;
    if (lower.includes("fraccion") || lower.includes("racional") || lower.includes("real")) return exerciseBanks.fracciones;
    return [];
  }

  if (courseId === "2eso") {
    const bank = twoEsoModelBank(lower);
    if (bank?.length) return bank;
  }

  if (courseId === "1eso") {
    const bank = oneEsoModelBank(lower);
    if (bank?.length) return bank;
  }

  if (lower.includes("divisibilidad")) return exerciseBanks.divisibilidad;
  if (lower.includes("decimal")) return exerciseBanks.decimales;
  if (lower.includes("rectas") || lower.includes("angulo") || lower.includes("poligono") || lower.includes("circunferencia") || lower.includes("area") || lower.includes("volumen") || lower.includes("cuerpos") || lower.includes("pitagoras")) return exerciseBanks.geometriaEso;
  if (lower.includes("potencia") || lower.includes("raices") || lower.includes("radical")) return exerciseBanks.potencias;
  if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion") || lower.includes("algebra")) return exerciseBanks.ecuaciones;
  if (lower.includes("fraccion") || lower.includes("racional")) return exerciseBanks.fracciones;
  if (lower.includes("funcion")) return exerciseBanks.funciones;
  if (lower.includes("probabilidad")) return exerciseBanks.probabilidad;
  if (lower.includes("estadistica")) return exerciseBanks.estadistica;
  if (lower.includes("proporcional") || lower.includes("porcentaje")) return exerciseBanks.porcentajes;
  if (lower.includes("natural") || lower.includes("operaciones") || lower.includes("entero")) return exerciseBanks.operaciones;
  return [];
}


const exerciseBanks = {
  fourEsoAReales: [
    { text: "Convierte 25,8888... en fraccion generatriz.", options: ["233/9", "258/10", "25/9", "232/9"], correct: 0, solution: "Solucion:\n1. Sea x=25,8888...\n2. Multiplicamos por 10: 10x=258,8888...\n3. Restamos: 10x-x=258,8888...-25,8888..., luego 9x=233.\n4. x=233/9." },
    { text: "Convierte 0,0666... en fraccion generatriz.", options: ["1/15", "1/6", "2/30", "6/100"], correct: 0, solution: "Solucion:\n1. 0,0666... = 0,0\\overline{6}.\n2. Sea x=0,0666... Entonces 10x=0,6666...\n3. 100x=6,6666...\n4. Restamos: 90x=6, luego x=6/90=1/15." },
    { text: "Ordena de menor a mayor: 2/5, 8/3 y 15/9.", options: ["2/5 < 15/9 < 8/3", "15/9 < 2/5 < 8/3", "8/3 < 15/9 < 2/5", "2/5 < 8/3 < 15/9"], correct: 0, solution: "Solucion:\n1. Pasamos a decimal: 2/5=0,4; 15/9=1,666...; 8/3=2,666...\n2. Orden: 2/5 < 15/9 < 8/3." },
    { text: "Que tipo de numero es √2?", options: ["Irracional", "Entero", "Natural", "Decimal exacto"], correct: 0, solution: "√2 no puede escribirse como fraccion exacta de enteros, por eso es irracional." },
    { text: "Simplifica la fraccion 84/126.", options: ["2/3", "3/2", "14/21", "42/63"], correct: 0, solution: "Solucion:\n1. m.c.d.(84,126)=42.\n2. 84/126 = (84:42)/(126:42)=2/3." },
    { text: "Calcula |−7| + |3−8|.", options: ["12", "2", "-12", "5"], correct: 0, solution: "|−7|=7 y |3−8|=|−5|=5. Sumamos 7+5=12." },
    { text: "Escribe 3,10823232... como decimal periodico.", options: ["3,108\\overline{23}", "3,\\overline{10823}", "3,10\\overline{823}", "3,10823"], correct: 0, solution: "La parte que se repite es 23 a partir de 3,10823232..., por eso se escribe 3,108\\overline{23}." },
    { text: "Entre que dos enteros esta √50?", options: ["7 y 8", "6 y 7", "5 y 6", "8 y 9"], correct: 0, solution: "Como 7^2=49 y 8^2=64, entonces √50 esta entre 7 y 8." },
    { text: "Calcula 2^3 · 2^4.", options: ["2^7", "2^12", "4^7", "2"], correct: 0, solution: "Con la misma base se suman exponentes: 2^3·2^4=2^(3+4)=2^7." },
    { text: "Calcula (3/4) : (9/8).", options: ["2/3", "27/32", "3/2", "12/9"], correct: 0, solution: "Dividir por una fraccion es multiplicar por su inversa: (3/4):(9/8)=(3/4)·(8/9)=24/36=2/3." }
  ],
  fourEsoARadicales: [
    { text: "Simplifica √50.", options: ["5√2", "25√2", "2√5", "10√5"], correct: 0, solution: "50=25·2, luego √50=√25·√2=5√2." },
    { text: "Simplifica √12 + √27.", options: ["5√3", "√39", "3√5", "39"], correct: 0, solution: "√12=2√3 y √27=3√3. Sumamos radicales semejantes: 2√3+3√3=5√3." },
    { text: "Calcula √18 − √2.", options: ["2√2", "√16", "4", "3√2"], correct: 0, solution: "√18=√(9·2)=3√2. Entonces 3√2−√2=2√2." },
    { text: "Multiplica √3 · √12.", options: ["6", "√15", "3√12", "12"], correct: 0, solution: "√3·√12=√36=6." },
    { text: "Racionaliza 3/√5.", options: ["3√5/5", "√5/3", "15/√5", "3/5"], correct: 0, solution: "Multiplicamos numerador y denominador por √5: 3/√5 = 3√5/5." },
    { text: "Que radical es semejante a 2√7?", options: ["5√7", "2√5", "√14", "7√2"], correct: 0, solution: "Son semejantes si tienen el mismo indice y el mismo radicando. 5√7 es semejante a 2√7." },
    { text: "Simplifica √75.", options: ["5√3", "3√5", "25√3", "15√5"], correct: 0, solution: "75=25·3, luego √75=5√3." },
    { text: "Calcula (√2)^2.", options: ["2", "√4", "4", "1"], correct: 0, solution: "Al elevar una raiz cuadrada al cuadrado se obtiene el radicando: (√2)^2=2." },
    { text: "Simplifica √8 + √18.", options: ["5√2", "√26", "10√2", "2√10"], correct: 0, solution: "√8=2√2 y √18=3√2. Sumamos: 5√2." },
    { text: "Si el indice es par y el radicando es negativo, en numeros reales...", options: ["No hay raiz real", "Hay dos raices reales", "La raiz es cero", "Siempre es positiva"], correct: 0, solution: "Una raiz de indice par de un numero negativo no existe dentro de los numeros reales." }
  ],
  fourEsoAProporcionalidad: [
    { text: "Si 6 cuadernos cuestan 18 euros, cuanto cuestan 10 cuadernos?", options: ["30 euros", "28 euros", "24 euros", "36 euros"], correct: 0, solution: "Precio por cuaderno: 18/6=3 euros. Para 10 cuadernos: 10·3=30 euros." },
    { text: "Un articulo de 80 euros baja un 15%. Precio final?", options: ["68 euros", "65 euros", "72 euros", "92 euros"], correct: 0, solution: "15% de 80 es 12. Precio final: 80−12=68 euros." },
    { text: "Aumenta 250 en un 20%.", options: ["300", "270", "280", "312,5"], correct: 0, solution: "20% de 250 es 50. Aumentado: 250+50=300." },
    { text: "Tres obreros tardan 12 dias. Cuanto tardan 6 obreros al mismo ritmo?", options: ["6 dias", "24 dias", "9 dias", "18 dias"], correct: 0, solution: "Es proporcionalidad inversa. Si se duplican los obreros, el tiempo se reduce a la mitad: 6 dias." },
    { text: "En un mapa 1:50000, 4 cm representan...", options: ["2 km", "200 m", "20 km", "0,2 km"], correct: 0, solution: "4 cm·50000=200000 cm=2000 m=2 km." },
    { text: "El 30% de una cantidad es 45. La cantidad es...", options: ["150", "135", "75", "15"], correct: 0, solution: "0,30·x=45, luego x=45/0,30=150." },
    { text: "Reparte 90 en proporcion 2:3:4. La parte mayor es...", options: ["40", "30", "20", "45"], correct: 0, solution: "Suma de partes: 2+3+4=9. Cada parte vale 90/9=10. La mayor: 4·10=40." },
    { text: "Si 5 kg cuestan 12 euros, 8 kg cuestan...", options: ["19,20 euros", "17 euros", "20 euros", "21,50 euros"], correct: 0, solution: "Precio por kg: 12/5=2,4. Para 8 kg: 8·2,4=19,20 euros." },
    { text: "Una cantidad pasa de 200 a 260. Porcentaje de aumento?", options: ["30%", "20%", "60%", "13%"], correct: 0, solution: "Aumento: 60. Porcentaje: 60/200=0,30=30%." },
    { text: "Si una receta para 4 personas usa 300 g de arroz, para 10 personas usa...", options: ["750 g", "600 g", "900 g", "1200 g"], correct: 0, solution: "Proporcionalidad directa: 300/4=75 g por persona. Para 10: 750 g." }
  ],
  fourEsoAExpresiones: [
    { text: "Reduce: 3x + 2x − 5x.", options: ["0", "10x", "x", "−x"], correct: 0, solution: "Sumamos coeficientes de terminos semejantes: 3+2−5=0." },
    { text: "Desarrolla: 2(x+3).", options: ["2x+6", "2x+3", "x+6", "5x"], correct: 0, solution: "Aplicamos la distributiva: 2·x+2·3=2x+6." },
    { text: "Desarrolla: (x+4)^2.", options: ["x^2+8x+16", "x^2+16", "x^2+4x+16", "2x+8"], correct: 0, solution: "(a+b)^2=a^2+2ab+b^2. Sale x^2+8x+16." },
    { text: "Factoriza: x^2−9.", options: ["(x−3)(x+3)", "(x−9)(x+1)", "(x−3)^2", "x(x−9)"], correct: 0, solution: "Es diferencia de cuadrados: x^2−3^2=(x−3)(x+3)." },
    { text: "Calcula el valor de 2a−3b para a=5, b=2.", options: ["4", "16", "7", "1"], correct: 0, solution: "Sustituimos: 2·5−3·2=10−6=4." },
    { text: "Reduce: 4x^2 − x^2 + 3x.", options: ["3x^2+3x", "6x^2", "3x", "4x^2+2x"], correct: 0, solution: "Solo se reducen terminos semejantes: 4x^2−x^2=3x^2. Queda 3x^2+3x." },
    { text: "Extrae factor comun: 6x+9.", options: ["3(2x+3)", "6(x+9)", "9(6x+1)", "x(6+9)"], correct: 0, solution: "El factor comun de 6 y 9 es 3. Queda 3(2x+3)." },
    { text: "Desarrolla: (x−5)(x+5).", options: ["x^2−25", "x^2+25", "x^2−10x+25", "2x−25"], correct: 0, solution: "Producto suma por diferencia: (x−5)(x+5)=x^2−25." },
    { text: "Reduce: 2(x−1)+3(x+2).", options: ["5x+4", "5x+1", "x+4", "5x−4"], correct: 0, solution: "2x−2+3x+6=5x+4." },
    { text: "Que expresion representa el doble de un numero aumentado en 7?", options: ["2x+7", "2(x+7)", "x^2+7", "x+14"], correct: 0, solution: "El doble de un numero es 2x. Aumentado en 7: 2x+7." }
  ],
  fourEsoAEcuaciones: [
    { text: "Resuelve: 5x + 24 = 4x + 18.", options: ["x=-6", "x=6", "x=42", "x=1"], correct: 0, solution: "5x−4x=18−24, luego x=-6." },
    { text: "Resuelve: 4x + 10 − 2 = 3x − 4 + 1.", options: ["x=-11", "x=11", "x=-5", "x=5"], correct: 0, solution: "4x+8=3x−3. Restamos 3x: x+8=-3. Luego x=-11." },
    { text: "Resuelve: 5(x−1)=4x−8.", options: ["x=-3", "x=3", "x=-13", "x=13"], correct: 0, solution: "5x−5=4x−8. Entonces x=-3." },
    { text: "Resuelve: −x+2=12−2(x−8).", options: ["x=26", "x=-26", "x=6", "x=14"], correct: 0, solution: "Derecha: 12−2x+16=28−2x. Entonces −x+2=28−2x. Sumamos 2x: x+2=28, luego x=26." },
    { text: "Resuelve: 3(x−10)=4(x−20).", options: ["x=50", "x=-50", "x=10", "x=20"], correct: 0, solution: "3x−30=4x−80. Pasamos: 50=x." },
    { text: "Resuelve: −3x + 2x − 28 = 50.", options: ["x=-78", "x=78", "x=-22", "x=22"], correct: 0, solution: "−x−28=50. Sumamos 28: −x=78. Luego x=-78." },
    { text: "Resuelve la inecuación: 2x−3 > 7.", options: ["x>5", "x<5", "x>2", "x<2"], correct: 0, solution: "Resolución:\n1. Sumamos 3 en ambos miembros: 2x−3+3>7+3.\n2. Simplificamos: 2x>10.\n3. Dividimos ambos miembros entre 2: x>10/2.\nResultado final: x>5." },
    { text: "Resuelve la inecuación: −3x ≤ 12.", options: ["x≥−4", "x≤−4", "x≥4", "x≤4"], correct: 0, solution: "Resolución:\n1. Partimos de −3x≤12.\n2. Dividimos ambos miembros entre −3. Al dividir una inecuación por un número negativo, el signo cambia de sentido: x≥12/(−3).\nResultado final: x≥−4." },
    { text: "Resuelve: x^2−9=0.", options: ["x=−3 y x=3", "x=9", "x=−9", "x=3"], correct: 0, solution: "x^2=9, luego x=±3." },
    { text: "Resuelve: x(x−5)=0.", options: ["x=0 y x=5", "x=5", "x=−5", "x=0 y x=−5"], correct: 0, solution: "Producto nulo: x=0 o x−5=0. Por tanto x=0 y x=5." }
  ],
  fourEsoASistemas: [
    { text: "Resuelve el sistema: x+y=7, x−y=1.", options: ["x=4, y=3", "x=3, y=4", "x=7, y=1", "x=1, y=7"], correct: 0, solution: "Sumamos ecuaciones: 2x=8, x=4. Sustituimos: 4+y=7, y=3." },
    { text: "Resuelve: 2x+y=9, x−y=3.", options: ["x=4, y=1", "x=3, y=3", "x=1, y=4", "x=5, y=-1"], correct: 0, solution: "De x−y=3 sale y=x−3. Sustituimos: 2x+x−3=9, 3x=12, x=4. Entonces y=1." },
    { text: "Resuelve: x+2y=8, 3x−2y=4.", options: ["x=3, y=5/2", "x=2, y=3", "x=4, y=2", "x=1, y=7/2"], correct: 0, solution: "Sumamos las ecuaciones: 4x=12, x=3. Sustituimos: 3+2y=8, 2y=5, y=5/2." },
    { text: "En un sistema compatible determinado hay...", options: ["Una unica solucion", "Infinitas soluciones", "Ninguna solucion", "Dos soluciones siempre"], correct: 0, solution: "Compatible determinado significa que existe solucion y es unica." },
    { text: "Si dos rectas son paralelas y distintas, el sistema es...", options: ["Incompatible", "Compatible determinado", "Compatible indeterminado", "Siempre x=0"], correct: 0, solution: "Rectas paralelas distintas no se cortan, por tanto no hay solucion." },
    { text: "Resuelve: 3x+y=11, x+y=5.", options: ["x=3, y=2", "x=2, y=3", "x=4, y=-1", "x=1, y=4"], correct: 0, solution: "Restamos la segunda a la primera: 2x=6, x=3. Luego 3+y=5, y=2." },
    { text: "Resuelve: y=2x+1, y=5.", options: ["x=2, y=5", "x=5, y=2", "x=3, y=5", "x=2, y=1"], correct: 0, solution: "Sustituimos y=5: 5=2x+1, 2x=4, x=2. Entonces y=5." },
    { text: "Un sistema con infinitas soluciones se llama...", options: ["Compatible indeterminado", "Compatible determinado", "Incompatible", "Sin resolver"], correct: 0, solution: "Si tiene infinitas soluciones, es compatible indeterminado." },
    { text: "Resuelve: 2x−3y=1, x+y=3.", options: ["x=2, y=1", "x=1, y=2", "x=3, y=0", "x=4, y=-1"], correct: 0, solution: "De x+y=3, x=3−y. Sustituimos: 2(3−y)−3y=1, 6−5y=1, y=1. Entonces x=2." },
    { text: "Que metodo consiste en sumar ecuaciones para eliminar una incognita?", options: ["Reduccion", "Sustitucion", "Igualacion", "Factorizacion"], correct: 0, solution: "En reduccion se combinan ecuaciones para eliminar una incognita." }
  ],
  fourEsoASemejanzaTrigonometria: [
    { text: "Dos triangulos semejantes tienen razon 3. Si un lado del pequeno mide 5, el correspondiente del grande mide...", options: ["15", "8", "10", "2"], correct: 0, solution: "En figuras semejantes los lados correspondientes se multiplican por la razon: 5·3=15." },
    { text: "Si sen(α)=cateto opuesto/hipotenusa, en un triangulo con opuesto 6 e hipotenusa 10, sen(α) vale...", options: ["3/5", "5/3", "4/5", "6/4"], correct: 0, solution: "sen(α)=6/10=3/5." },
    { text: "En un triangulo rectangulo, cos(α) es...", options: ["Cateto contiguo / hipotenusa", "Cateto opuesto / hipotenusa", "Opuesto / contiguo", "Hipotenusa / opuesto"], correct: 0, solution: "Por definicion, coseno es cateto contiguo dividido entre hipotenusa." },
    { text: "En un triangulo rectangulo con catetos 3 y 4, la hipotenusa mide...", options: ["5", "7", "√7", "6"], correct: 0, solution: "Por Pitagoras: h^2=3^2+4^2=9+16=25, luego h=5." },
    { text: "Una escala 1:200 significa que 1 cm en el dibujo son...", options: ["200 cm reales", "200 m reales", "2 cm reales", "1/200 cm reales"], correct: 0, solution: "La escala 1:200 indica que cada unidad del dibujo representa 200 unidades reales." },
    { text: "Si tg(α)=3/4, entonces en un triangulo rectangulo puede ser...", options: ["Opuesto 3 y contiguo 4", "Opuesto 4 y contiguo 3", "Hipotenusa 3 y opuesto 4", "Contiguo 3 e hipotenusa 4"], correct: 0, solution: "Tangente = cateto opuesto / cateto contiguo." },
    { text: "Dos poligonos semejantes tienen angulos correspondientes...", options: ["Iguales", "Proporcionales", "Dobles", "Complementarios"], correct: 0, solution: "En figuras semejantes, los angulos correspondientes son iguales y los lados son proporcionales." },
    { text: "Un edificio proyecta 12 m de sombra. Un palo de 2 m proyecta 3 m. Altura del edificio?", options: ["8 m", "18 m", "6 m", "12 m"], correct: 0, solution: "Por semejanza: h/12 = 2/3. Entonces h=12·2/3=8 m." },
    { text: "Si cos(α)=4/5 en un triangulo rectangulo, una hipotenusa posible es 10. El cateto contiguo mide...", options: ["8", "6", "5", "4"], correct: 0, solution: "cos(α)=contiguo/hipotenusa=4/5. Si la hipotenusa es 10, el contiguo es 8." },
    { text: "La razon de semejanza entre 4 cm y 10 cm es...", options: ["2,5", "6", "14", "0,4"], correct: 0, solution: "Razon grande/pequeno = 10/4=2,5." }
  ],
  fourEsoAAreasCuerpos: [
    { text: "Area de un rectangulo de base 8 cm y altura 5 cm.", options: ["40 cm^2", "26 cm^2", "13 cm^2", "80 cm^2"], correct: 0, solution: "Area del rectangulo = base·altura = 8·5=40 cm^2." },
    { text: "Area de un triangulo de base 10 cm y altura 6 cm.", options: ["30 cm^2", "60 cm^2", "16 cm^2", "40 cm^2"], correct: 0, solution: "Area del triangulo = base·altura/2 = 10·6/2=30 cm^2." },
    { text: "Longitud de una circunferencia de radio 4 cm.", options: ["8π cm", "16π cm", "4π cm", "π cm"], correct: 0, solution: "L=2πr=2π·4=8π cm." },
    { text: "Area de un circulo de radio 3 cm.", options: ["9π cm^2", "6π cm^2", "3π cm^2", "12π cm^2"], correct: 0, solution: "A=πr^2=π·3^2=9π cm^2." },
    { text: "Volumen de un prisma rectangular de 3 cm, 4 cm y 5 cm.", options: ["60 cm^3", "12 cm^3", "47 cm^3", "30 cm^3"], correct: 0, solution: "Volumen = largo·ancho·alto = 3·4·5=60 cm^3." },
    { text: "Volumen de un cilindro de radio 2 cm y altura 7 cm.", options: ["28π cm^3", "14π cm^3", "4π cm^3", "9π cm^3"], correct: 0, solution: "V=πr^2h=π·2^2·7=28π cm^3." },
    { text: "Area lateral de un cilindro de radio 3 cm y altura 5 cm.", options: ["30π cm^2", "15π cm^2", "45π cm^2", "9π cm^2"], correct: 0, solution: "Area lateral = 2πrh = 2π·3·5=30π cm^2." },
    { text: "Volumen de una piramide con area de base 24 cm^2 y altura 9 cm.", options: ["72 cm^3", "216 cm^3", "33 cm^3", "108 cm^3"], correct: 0, solution: "V=Ab·h/3=24·9/3=72 cm^3." },
    { text: "Area de un trapecio de bases 8 cm y 12 cm, altura 5 cm.", options: ["50 cm^2", "100 cm^2", "25 cm^2", "60 cm^2"], correct: 0, solution: "A=(B+b)·h/2=(12+8)·5/2=50 cm^2." },
    { text: "Si duplicas todas las longitudes de un cuerpo semejante, el volumen se multiplica por...", options: ["8", "2", "4", "6"], correct: 0, solution: "El volumen se multiplica por la razon al cubo. Si la razon es 2, 2^3=8." }
  ],
  fourEsoBRadicalesLogaritmos: [
    { text: "Simplifica √72.", options: ["6√2", "36√2", "3√8", "12√3"], correct: 0, solution: "Resolución:\n1. Descomponemos 72=36·2.\n2. √72=√36·√2.\n3. √36=6.\nResultado final: 6√2." },
    { text: "Simplifica 2√12 - √27.", options: ["√3", "5√3", "−√3", "4√3"], correct: 0, solution: "Resolución:\n1. √12=2√3, luego 2√12=4√3.\n2. √27=3√3.\n3. Restamos: 4√3-3√3=√3.\nResultado final: √3." },
    { text: "Racionaliza 5/√3.", options: ["5√3/3", "√3/5", "5/3", "15√3"], correct: 0, solution: "Resolución:\n1. Multiplicamos numerador y denominador por √3.\n2. 5/√3 = 5√3/(√3·√3).\n3. El denominador queda 3.\nResultado final: 5√3/3." },
    { text: "Calcula log₂(32).", options: ["5", "16", "4", "64"], correct: 0, solution: "Resolución:\n1. log₂(32)=x significa 2^x=32.\n2. Como 32=2^5, entonces x=5.\nResultado final: 5." },
    { text: "Calcula log₁₀(0,01).", options: ["-2", "2", "0,1", "-1"], correct: 0, solution: "Resolución:\n1. 0,01=1/100=10^(-2).\n2. Por tanto log₁₀(0,01)=-2.\nResultado final: -2." },
    { text: "Resuelve log₃(x)=4.", options: ["x=81", "x=12", "x=64", "x=7"], correct: 0, solution: "Resolución:\n1. log₃(x)=4 equivale a 3^4=x.\n2. 3^4=81.\nResultado final: x=81." },
    { text: "Aplica propiedades: log(1000) - log(10).", options: ["2", "990", "3", "log(10000)"], correct: 0, solution: "Resolución:\n1. log(1000)=3 y log(10)=1 en base 10.\n2. Restamos: 3-1=2.\nResultado final: 2." },
    { text: "Simplifica √(50) · √(2).", options: ["10", "5√2", "√52", "100"], correct: 0, solution: "Resolución:\n1. Multiplicamos dentro de una sola raíz: √50·√2=√100.\n2. √100=10.\nResultado final: 10." },
    { text: "Calcula (√5 + 2)(√5 - 2).", options: ["1", "9", "5-4√5", "√5"], correct: 0, solution: "Resolución:\n1. Es producto de suma por diferencia: a²-b².\n2. (√5)²-2²=5-4.\nResultado final: 1." },
    { text: "Si logₐ(1)=x, con a>0 y a≠1, entonces x vale...", options: ["0", "1", "a", "-1"], correct: 0, solution: "Resolución:\n1. logₐ(1)=x significa a^x=1.\n2. Para cualquier base válida, a^0=1.\nResultado final: x=0." }
  ],
  fourEsoBInecuaciones: [
    { text: "Resuelve 3x - 5 ≥ 10.", options: ["x ≥ 5", "x ≤ 5", "x ≥ 15", "x ≤ -5"], correct: 0, solution: "Resolución:\n1. Sumamos 5: 3x≥15.\n2. Dividimos entre 3, que es positivo.\nResultado final: x≥5." },
    { text: "Resuelve -2x + 7 < 15.", options: ["x > -4", "x < -4", "x > 4", "x < 11"], correct: 0, solution: "Resolución:\n1. Restamos 7: -2x<8.\n2. Dividimos entre -2 y cambia el sentido.\nResultado final: x>-4." },
    { text: "Resuelve 5 - 3x ≤ -4.", options: ["x ≥ 3", "x ≤ 3", "x ≥ -3", "x ≤ -3"], correct: 0, solution: "Resolución:\n1. Restamos 5: -3x≤-9.\n2. Dividimos entre -3 y cambia el sentido.\nResultado final: x≥3." },
    { text: "Resuelve x² - 9 > 0.", options: ["x<-3 o x>3", "-3<x<3", "x>3", "x<-3"], correct: 0, solution: "Resolución:\n1. Factorizamos x²-9=(x-3)(x+3).\n2. Las raíces son -3 y 3.\n3. La parábola abre hacia arriba, es positiva fuera de las raíces.\nResultado final: x<-3 o x>3." },
    { text: "Resuelve x² - 4x ≤ 0.", options: ["0≤x≤4", "x≤0 o x≥4", "x≥4", "x≤0"], correct: 0, solution: "Resolución:\n1. Factorizamos x²-4x=x(x-4).\n2. Las raíces son 0 y 4.\n3. La parábola abre hacia arriba; es negativa o cero entre las raíces.\nResultado final: 0≤x≤4." },
    { text: "Resuelve (x-1)(x+2) ≥ 0.", options: ["x≤-2 o x≥1", "-2≤x≤1", "x≥-2", "x≤1"], correct: 0, solution: "Resolución:\n1. Raíces: x=1 y x=-2.\n2. Producto positivo o cero fuera del intervalo entre raíces.\nResultado final: x≤-2 o x≥1." },
    { text: "Resuelve el sistema: x>2 y x≤6.", options: ["2<x≤6", "x≤2", "x>6", "x<2 o x≥6"], correct: 0, solution: "Resolución:\n1. Deben cumplirse las dos condiciones a la vez.\n2. La intersección de x>2 y x≤6 es 2<x≤6.\nResultado final: 2<x≤6." },
    { text: "Resuelve el sistema: x≤-1 o x>4.", options: ["(-∞,-1] ∪ (4,∞)", "[-1,4]", "(-1,4]", "R"], correct: 0, solution: "Resolución:\n1. La palabra 'o' indica unión.\n2. Tomamos todos los valores menores o iguales que -1 y los mayores que 4.\nResultado final: (-∞,-1] ∪ (4,∞)." },
    { text: "Resuelve 2(x-3) < x+1.", options: ["x<7", "x>7", "x<−7", "x>−7"], correct: 0, solution: "Resolución:\n1. Desarrollamos: 2x-6<x+1.\n2. Restamos x: x-6<1.\n3. Sumamos 6.\nResultado final: x<7." },
    { text: "Resuelve (x+3)/2 ≥ 5.", options: ["x≥7", "x≤7", "x≥10", "x≤-7"], correct: 0, solution: "Resolución:\n1. Multiplicamos por 2, positivo, y no cambia el sentido.\n2. x+3≥10.\n3. Restamos 3.\nResultado final: x≥7." }
  ],
  fourEsoBGeometriaAnalitica: [
    { text: "Calcula la pendiente de la recta que pasa por A(1,2) y B(3,6).", options: ["2", "1/2", "4", "-2"], correct: 0, solution: "Resolución:\n1. m=(y₂-y₁)/(x₂-x₁).\n2. m=(6-2)/(3-1)=4/2.\nResultado final: m=2." },
    { text: "Ecuación de la recta de pendiente 3 que pasa por (0,2).", options: ["y=3x+2", "y=2x+3", "y=3x-2", "y=x+2"], correct: 0, solution: "Resolución:\n1. Si pasa por (0,2), la ordenada en el origen es 2.\n2. Con pendiente 3: y=3x+2.\nResultado final: y=3x+2." },
    { text: "Distancia entre A(0,0) y B(6,8).", options: ["10", "14", "48", "√14"], correct: 0, solution: "Resolución:\n1. d=√((6-0)²+(8-0)²).\n2. d=√(36+64)=√100.\nResultado final: d=10." },
    { text: "Punto medio de A(2,4) y B(8,10).", options: ["(5,7)", "(6,6)", "(10,14)", "(3,7)"], correct: 0, solution: "Resolución:\n1. M=((x₁+x₂)/2,(y₁+y₂)/2).\n2. M=((2+8)/2,(4+10)/2).\nResultado final: (5,7)." },
    { text: "La recta y=-2x+5 tiene pendiente...", options: ["-2", "5", "2", "-5"], correct: 0, solution: "Resolución:\n1. En y=mx+n, m es la pendiente.\n2. Aquí m=-2.\nResultado final: -2." },
    { text: "Recta paralela a y=4x-1.", options: ["y=4x+7", "y=-4x+7", "y=(1/4)x+7", "y=x+4"], correct: 0, solution: "Resolución:\n1. Las rectas paralelas tienen la misma pendiente.\n2. y=4x-1 tiene pendiente 4.\n3. La opción con pendiente 4 es y=4x+7.\nResultado final: y=4x+7." },
    { text: "Recta perpendicular a y=2x+3.", options: ["y=-(1/2)x+1", "y=2x-1", "y=-2x+1", "y=(1/2)x+1"], correct: 0, solution: "Resolución:\n1. Pendientes perpendiculares cumplen m₁·m₂=-1.\n2. Si m₁=2, entonces m₂=-1/2.\nResultado final: y=-(1/2)x+1." },
    { text: "Corte con el eje Y de y=-3x+4.", options: ["(0,4)", "(4,0)", "(0,-3)", "(-3,4)"], correct: 0, solution: "Resolución:\n1. En el eje Y se cumple x=0.\n2. y=-3·0+4=4.\nResultado final: (0,4)." },
    { text: "Corte con el eje X de y=2x-6.", options: ["(3,0)", "(0,3)", "(-3,0)", "(0,-6)"], correct: 0, solution: "Resolución:\n1. En el eje X se cumple y=0.\n2. 0=2x-6, luego 2x=6 y x=3.\nResultado final: (3,0)." },
    { text: "Vector que va de A(1,5) a B(4,1).", options: ["(3,-4)", "(-3,4)", "(5,6)", "(4,1)"], correct: 0, solution: "Resolución:\n1. Restamos coordenadas: B-A.\n2. (4-1,1-5)=(3,-4).\nResultado final: (3,-4)." }
  ],
  fourEsoBFunciones: [
    { text: "Dominio de f(x)=1/(x-3).", options: ["R menos {3}", "R", "R menos {0}", "[3,∞)"], correct: 0, solution: "Resolución:\n1. El denominador no puede ser cero.\n2. x-3=0 da x=3.\nResultado final: R menos {3}." },
    { text: "Dominio de f(x)=√(x+2).", options: ["[-2,∞)", "(-∞,-2]", "R", "R menos {-2}"], correct: 0, solution: "Resolución:\n1. El radicando debe ser mayor o igual que cero.\n2. x+2≥0, luego x≥-2.\nResultado final: [-2,∞)." },
    { text: "Si f(x)=2x-5, calcula f(4).", options: ["3", "8", "-1", "13"], correct: 0, solution: "Resolución:\n1. Sustituimos x=4.\n2. f(4)=2·4-5=8-5.\nResultado final: 3." },
    { text: "Pendiente de f(x)=-3x+7.", options: ["-3", "7", "3", "-7"], correct: 0, solution: "Resolución:\n1. En y=mx+n, m es la pendiente.\n2. Aquí m=-3.\nResultado final: -3." },
    { text: "Vértice de f(x)=x²-4x+3.", options: ["(2,-1)", "(-2,-1)", "(2,1)", "(4,3)"], correct: 0, solution: "Resolución:\n1. Para ax²+bx+c, x del vértice es -b/(2a).\n2. Aquí a=1, b=-4, luego x=4/2=2.\n3. f(2)=4-8+3=-1.\nResultado final: (2,-1)." },
    { text: "Corte con el eje X de f(x)=x-6.", options: ["x=6", "x=-6", "x=0", "x=1"], correct: 0, solution: "Resolución:\n1. En el eje X, f(x)=0.\n2. x-6=0.\nResultado final: x=6." },
    { text: "Corte con el eje Y de f(x)=4x+1.", options: ["(0,1)", "(1,0)", "(0,4)", "(4,1)"], correct: 0, solution: "Resolución:\n1. En el eje Y, x=0.\n2. f(0)=1.\nResultado final: (0,1)." },
    { text: "Si f es creciente en un intervalo, al aumentar x...", options: ["f(x) aumenta", "f(x) disminuye", "f(x) vale cero", "f(x) no existe"], correct: 0, solution: "Resolución:\n1. Función creciente significa que al avanzar hacia la derecha, los valores de la función suben.\nResultado final: f(x) aumenta." },
    { text: "La función f(x)=x² abre hacia...", options: ["Arriba", "Abajo", "La derecha", "La izquierda"], correct: 0, solution: "Resolución:\n1. En ax²+bx+c, si a>0 la parábola abre hacia arriba.\n2. En f(x)=x², a=1>0.\nResultado final: arriba." },
    { text: "Dominio de f(x)=1/(x²-4).", options: ["R menos {-2,2}", "R menos {4}", "R", "[-2,2]"], correct: 0, solution: "Resolución:\n1. El denominador no puede anularse.\n2. x²-4=0, luego x=-2 o x=2.\nResultado final: R menos {-2,2}." }
  ],
  fourEsoBLimiteFunciones: [
    { text: "Calcula lim x→2 (x+5).", options: ["7", "5", "2", "0"], correct: 0, solution: "Resolución:\n1. Es una función continua.\n2. Sustituimos x=2.\nResultado final: 2+5=7." },
    { text: "Calcula lim x→1 (x²-1)/(x-1).", options: ["2", "0", "1", "No existe"], correct: 0, solution: "Resolución:\n1. Factorizamos x²-1=(x-1)(x+1).\n2. Simplificamos x-1.\n3. Queda x+1.\n4. Sustituimos x=1.\nResultado final: 2." },
    { text: "Calcula lim x→∞ (3x+1)/(x-2).", options: ["3", "0", "∞", "1/3"], correct: 0, solution: "Resolución:\n1. Numerador y denominador tienen grado 1.\n2. El límite es el cociente de coeficientes principales.\nResultado final: 3/1=3." },
    { text: "Calcula lim x→∞ 5/x.", options: ["0", "5", "∞", "1"], correct: 0, solution: "Resolución:\n1. Al crecer x, el denominador aumenta indefinidamente.\n2. 5/x se aproxima a 0.\nResultado final: 0." },
    { text: "Si lim x→a⁻ f(x)=2 y lim x→a⁺ f(x)=5, el límite en a...", options: ["No existe", "Vale 2", "Vale 5", "Vale 7"], correct: 0, solution: "Resolución:\n1. Para que exista el límite, los límites laterales deben coincidir.\n2. Como 2≠5, no existe.\nResultado final: no existe." },
    { text: "Calcula lim x→3 (x²-9)/(x-3).", options: ["6", "0", "3", "No existe"], correct: 0, solution: "Resolución:\n1. Factorizamos x²-9=(x-3)(x+3).\n2. Simplificamos x-3.\n3. Queda x+3.\n4. Sustituimos x=3.\nResultado final: 6." },
    { text: "La recta x=2 puede ser asíntota vertical de 1/(x-2) porque...", options: ["El denominador se anula", "El numerador se anula", "La función vale 2", "Es una recta horizontal"], correct: 0, solution: "Resolución:\n1. En x=2, el denominador x-2 vale 0.\n2. La función crece sin límite cerca de ese valor.\nResultado final: x=2 es asíntota vertical." },
    { text: "Si f es continua en a, entonces...", options: ["lim x→a f(x)=f(a)", "f'(a)=0", "f(a)=0", "No existe límite"], correct: 0, solution: "Resolución:\n1. La continuidad exige que el límite exista.\n2. Además debe coincidir con el valor de la función.\nResultado final: lim x→a f(x)=f(a)." },
    { text: "Calcula lim x→∞ (2x²-1)/(5x²+3).", options: ["2/5", "5/2", "0", "∞"], correct: 0, solution: "Resolución:\n1. Numerador y denominador tienen el mismo grado.\n2. Tomamos cociente de coeficientes principales.\nResultado final: 2/5." }
  ],
  fourEsoBDerivadas: [
    { text: "Deriva f(x)=x³.", options: ["3x²", "x²", "3x", "x⁴/4"], correct: 0, solution: "Resolución:\n1. Usamos la regla (x^n)'=n·x^(n-1).\n2. (x³)'=3x².\nResultado final: 3x²." },
    { text: "Deriva f(x)=5x²-3x+1.", options: ["10x-3", "5x-3", "10x+1", "5x²-3"], correct: 0, solution: "Resolución:\n1. Derivamos término a término.\n2. (5x²)'=10x, (-3x)'=-3 y 1'=0.\nResultado final: 10x-3." },
    { text: "Deriva f(x)=1/x.", options: ["-1/x²", "1/x²", "ln|x|", "1"], correct: 0, solution: "Resolución:\n1. Escribimos 1/x=x^(-1).\n2. Derivamos: -1·x^(-2).\nResultado final: -1/x²." },
    { text: "Deriva f(x)=√x.", options: ["1/(2√x)", "2√x", "1/√x", "√x/2"], correct: 0, solution: "Resolución:\n1. Escribimos √x=x^(1/2).\n2. Derivamos: (1/2)x^(-1/2).\nResultado final: 1/(2√x)." },
    { text: "Pendiente de la tangente a f(x)=x² en x=3.", options: ["6", "9", "3", "0"], correct: 0, solution: "Resolución:\n1. La pendiente es f'(3).\n2. f'(x)=2x.\n3. f'(3)=6.\nResultado final: 6." },
    { text: "Si f'(x)>0 en un intervalo, la función es...", options: ["Creciente", "Decreciente", "Constante", "Discontinua"], correct: 0, solution: "Resolución:\n1. Derivada positiva indica pendiente positiva.\nResultado final: la función es creciente." },
    { text: "Deriva f(x)=e^x.", options: ["e^x", "xe^(x-1)", "ln(x)", "1/e^x"], correct: 0, solution: "Resolución:\n1. La función e^x coincide con su derivada.\nResultado final: e^x." },
    { text: "Deriva f(x)=ln(x).", options: ["1/x", "ln(x)", "x", "e^x"], correct: 0, solution: "Resolución:\n1. La derivada del logaritmo neperiano es 1/x.\nResultado final: 1/x." },
    { text: "Puntos críticos de f(x)=x²-4x.", options: ["x=2", "x=0", "x=4", "x=-2"], correct: 0, solution: "Resolución:\n1. f'(x)=2x-4.\n2. Igualamos a cero: 2x-4=0.\n3. 2x=4.\nResultado final: x=2." },
    { text: "Deriva f(x)=(x+1)².", options: ["2(x+1)", "(x+1)", "2x", "(x+1)³"], correct: 0, solution: "Resolución:\n1. Regla de la cadena: si u=x+1, (u²)'=2u·u'.\n2. u'=1.\nResultado final: 2(x+1)." }
  ],
  fourEsoBLimiteSucesiones: [
    { text: "Calcula lim n→∞ 1/n.", options: ["0", "1", "∞", "No existe"], correct: 0, solution: "Resolución:\n1. Al crecer n, 1/n se hace cada vez más pequeño.\nResultado final: 0." },
    { text: "Calcula lim n→∞ (3n+1)/(n-2).", options: ["3", "0", "∞", "1/3"], correct: 0, solution: "Resolución:\n1. Numerador y denominador tienen grado 1.\n2. Cociente de coeficientes principales: 3/1.\nResultado final: 3." },
    { text: "Calcula lim n→∞ (2n²+n)/(5n²-1).", options: ["2/5", "5/2", "0", "∞"], correct: 0, solution: "Resolución:\n1. Dominan los términos de grado 2.\n2. Cociente de coeficientes principales: 2/5.\nResultado final: 2/5." },
    { text: "La sucesión aₙ=3n+1 cuando n→∞...", options: ["Tiende a ∞", "Tiende a 3", "Tiende a 1", "Tiende a 0"], correct: 0, solution: "Resolución:\n1. El término 3n crece indefinidamente.\n2. Sumar 1 no cambia ese comportamiento.\nResultado final: tiende a ∞." },
    { text: "Calcula lim n→∞ 5/(n²+1).", options: ["0", "5", "∞", "1"], correct: 0, solution: "Resolución:\n1. El denominador crece indefinidamente.\n2. El numerador es constante.\nResultado final: 0." },
    { text: "Calcula lim n→∞ (n²-4)/(n²+2).", options: ["1", "-2", "0", "∞"], correct: 0, solution: "Resolución:\n1. Mismo grado en numerador y denominador.\n2. Cociente de coeficientes principales: 1/1.\nResultado final: 1." },
    { text: "La sucesión aₙ=(-1)^n...", options: ["No tiene límite", "Tiende a 1", "Tiende a -1", "Tiende a 0"], correct: 0, solution: "Resolución:\n1. Sus términos alternan 1, -1, 1, -1...\n2. No se acercan a un único valor.\nResultado final: no tiene límite." },
    { text: "Calcula lim n→∞ (4n-7)/(2n+5).", options: ["2", "4", "0", "1/2"], correct: 0, solution: "Resolución:\n1. Grado 1 arriba y abajo.\n2. Cociente de coeficientes principales: 4/2.\nResultado final: 2." },
    { text: "Calcula lim n→∞ (n+1)/n.", options: ["1", "0", "∞", "2"], correct: 0, solution: "Resolución:\n1. (n+1)/n = n/n + 1/n = 1+1/n.\n2. 1/n tiende a 0.\nResultado final: 1." },
    { text: "Si una sucesión converge, entonces...", options: ["Tiene límite finito", "Siempre crece", "Siempre vale 0", "No tiene términos"], correct: 0, solution: "Resolución:\n1. Convergente significa que sus términos se aproximan a un número real.\nResultado final: tiene límite finito." }
  ],
  fourEsoBCombinatoria: [
    { text: "Calcula 5!.", options: ["120", "25", "10", "5"], correct: 0, solution: "Resolución:\n1. 5!=5·4·3·2·1.\n2. Multiplicamos: 120.\nResultado final: 120." },
    { text: "Ordenar 4 libros distintos se puede hacer de...", options: ["24 formas", "16 formas", "8 formas", "4 formas"], correct: 0, solution: "Resolución:\n1. Es una permutación de 4 elementos.\n2. 4!=24.\nResultado final: 24 formas." },
    { text: "Elegir 2 personas de un grupo de 5 sin importar el orden es...", options: ["C(5,2)=10", "5·2=10", "5!=120", "2^5=32"], correct: 0, solution: "Resolución:\n1. No importa el orden, usamos combinaciones.\n2. C(5,2)=5·4/2=10.\nResultado final: 10." },
    { text: "Si importa el orden al elegir 2 de 5 sin repetición, usamos...", options: ["Variaciones", "Combinaciones", "Media", "Moda"], correct: 0, solution: "Resolución:\n1. Si cambiar el orden cambia el resultado, no son combinaciones.\n2. Para elegir ordenadamente usamos variaciones.\nResultado final: variaciones." },
    { text: "Número de códigos de 3 cifras con dígitos 0-9 y repetición.", options: ["1000", "30", "720", "10"], correct: 0, solution: "Resolución:\n1. Hay 10 opciones para cada posición.\n2. Con repetición: 10·10·10.\nResultado final: 1000." },
    { text: "Calcula C(6,1).", options: ["6", "1", "0", "36"], correct: 0, solution: "Resolución:\n1. Elegir 1 elemento entre 6 puede hacerse de 6 formas.\nResultado final: 6." },
    { text: "Calcula C(6,6).", options: ["1", "6", "36", "720"], correct: 0, solution: "Resolución:\n1. Solo hay una forma de elegir todos los elementos.\nResultado final: 1." },
    { text: "Si no importa el orden y no se repite, hablamos de...", options: ["Combinaciones", "Permutaciones", "Variaciones", "Potencias"], correct: 0, solution: "Resolución:\n1. Elegir un grupo sin orden corresponde a combinaciones.\nResultado final: combinaciones." },
    { text: "Número de formas de sentar 3 personas en 3 sillas.", options: ["6", "3", "9", "1"], correct: 0, solution: "Resolución:\n1. Es una permutación de 3 personas.\n2. 3!=3·2·1.\nResultado final: 6." },
    { text: "Con las letras A, B, C, ¿cuántas palabras de 2 letras sin repetir se pueden formar?", options: ["6", "9", "3", "2"], correct: 0, solution: "Resolución:\n1. Para la primera letra hay 3 opciones.\n2. Para la segunda quedan 2.\n3. 3·2=6.\nResultado final: 6." }
  ],
  operaciones: [
    {
      text: "Calcula: 18 - 3 x 4 + 10 : 2",
      options: ["11", "65", "20", "17"],
      correct: 0,
      solution: "Primero multiplicaciones y divisiones: 3 x 4 = 12 y 10 : 2 = 5. Después 18 - 12 + 5 = 11."
    },
    {
      text: "Calcula: 6 + 2 x (15 - 9)",
      options: ["18", "48", "20", "14"],
      correct: 0,
      solution: "Primero paréntesis: 15 - 9 = 6. Luego multiplicación: 2 x 6 = 12. Por último 6 + 12 = 18."
    },
    {
      text: "¿Cuál es el resultado de (-7) + 12 - 5?",
      options: ["0", "-24", "10", "-10"],
      correct: 0,
      solution: "Suma con orden: -7 + 12 = 5. Después 5 - 5 = 0."
    },
    {
      text: "Un cuaderno cuesta 3 euros. ¿Cuánto cuestan 7 cuadernos?",
      options: ["21 euros", "10 euros", "24 euros", "17 euros"],
      correct: 0,
      solution: "Multiplicamos precio por cantidad: 3 x 7 = 21 euros."
    },
    {
      text: "Redondea 3.847 a las centenas.",
      options: ["3.800", "3.900", "4.000", "3.840"],
      correct: 1,
      solution: "Miramos la cifra de las decenas. En 3.847 es 4, menor que 5, así que las centenas se quedan en 8: 3.800."
    }
  ],
  potencias: [
    {
      text: "Calcula: 2^5",
      options: ["32", "10", "25", "16"],
      correct: 0,
      solution: "2^5 significa 2 x 2 x 2 x 2 x 2 = 32."
    },
    {
      text: "Simplifica: 3^2 x 3^4",
      options: ["3^6", "3^4", "3^8", "3^9"],
      correct: 0,
      solution: "Resolución:\n1. Las dos potencias tienen la misma base, 3.\n2. Al multiplicar potencias de la misma base, conservamos la base y sumamos los exponentes.\n3. 3^2 · 3^4 = 3^(2+4) = 3^6.\nResultado final: 3^6."
    },
    {
      text: "Calcula: (-2)^4",
      options: ["16", "-16", "8", "-8"],
      correct: 0,
      solution: "La base negativa está entre paréntesis y el exponente es par: (-2) x (-2) x (-2) x (-2) = 16."
    },
    {
      text: "Escribe 10.000 como potencia de 10.",
      options: ["10^4", "10^3", "4^10", "100^4"],
      correct: 0,
      solution: "10.000 tiene cuatro ceros, por tanto es 10^4."
    },
    {
      text: "Calcula: 5^0",
      options: ["1", "0", "5", "10"],
      correct: 0,
      solution: "Resolución:\n1. Aplicamos la propiedad a⁰=1, siempre que a≠0.\n2. Como la base es 5 y 5≠0, se cumple 5⁰=1.\nResultado final: 1."
    }
  ],
  ecuaciones: [
    {
      text: "Resuelve: x + 7 = 15",
      options: ["x = 8", "x = 22", "x = 7", "x = -8"],
      correct: 0,
      solution: "Restamos 7 en los dos lados: x = 15 - 7 = 8."
    },
    {
      text: "Resuelve: 3x = 21",
      options: ["x = 7", "x = 18", "x = 63", "x = 6"],
      correct: 0,
      solution: "Dividimos entre 3: x = 21 : 3 = 7."
    },
    {
      text: "Resuelve: 2x + 5 = 17",
      options: ["x = 6", "x = 11", "x = 12", "x = 4"],
      correct: 0,
      solution: "Restamos 5: 2x = 12. Dividimos entre 2: x = 6."
    },
    {
      text: "Comprueba qué valor cumple x - 4 = 9.",
      options: ["13", "5", "-13", "-5"],
      correct: 0,
      solution: "Sumamos 4 a los dos lados: x = 9 + 4 = 13. Comprobación: 13 - 4 = 9."
    },
    {
      text: "Resuelve: 5x - 10 = 0",
      options: ["x = 2", "x = -2", "x = 10", "x = 5"],
      correct: 0,
      solution: "Sumamos 10: 5x = 10. Dividimos entre 5: x = 2."
    }
  ],
  fracciones: [
    {
      text: "Calcula: 1/2 + 1/4",
      options: ["3/4", "2/6", "1/8", "1/6"],
      correct: 0,
      solution: "Pasamos 1/2 a cuartos: 1/2 = 2/4. Entonces 2/4 + 1/4 = 3/4."
    },
    {
      text: "Calcula: 2/3 de 18",
      options: ["12", "9", "27", "6"],
      correct: 0,
      solution: "Resolución:\n1. Calculamos dos tercios de 18: (2/3)·18.\n2. Dividimos 18 entre 3: 18/3=6.\n3. Multiplicamos por 2: 6·2=12.\nResultado final: 12."
    },
    {
      text: "Simplifica la fracción 12/18.",
      options: ["2/3", "3/2", "6/9", "4/8"],
      correct: 0,
      solution: "Dividimos numerador y denominador entre 6: 12/18 = 2/3."
    },
    {
      text: "¿Cuál es mayor?",
      options: ["3/4", "2/5", "1/2", "3/8"],
      correct: 0,
      solution: "En decimal: 3/4 = 0,75; 2/5 = 0,4; 1/2 = 0,5; 3/8 = 0,375. La mayor es 3/4."
    },
    {
      text: "Calcula: 5/6 - 1/3",
      options: ["1/2", "4/3", "4/6", "2/9"],
      correct: 0,
      solution: "Convertimos 1/3 en sextos: 1/3 = 2/6. Entonces 5/6 - 2/6 = 3/6 = 1/2."
    }
  ],
  porcentajes: [
    {
      text: "Calcula el 20% de 80.",
      options: ["16", "20", "8", "60"],
      correct: 0,
      solution: "20% es 20/100. Entonces 80 x 20/100 = 16."
    },
    {
      text: "Una camiseta de 30 euros tiene un descuento del 10%. ¿Cuánto se descuenta?",
      options: ["3 euros", "10 euros", "27 euros", "1 euro"],
      correct: 0,
      solution: "10% de 30 es 30 x 10/100 = 3 euros."
    },
    {
      text: "Si 4 lápices cuestan 2 euros, ¿cuánto cuestan 10 lápices al mismo precio?",
      options: ["5 euros", "8 euros", "6 euros", "20 euros"],
      correct: 0,
      solution: "Cada lápiz cuesta 2 : 4 = 0,5 euros. Diez lápices cuestan 10 x 0,5 = 5 euros."
    },
    {
      text: "Aumentar 50 en un 10% da...",
      options: ["55", "60", "45", "500"],
      correct: 0,
      solution: "El 10% de 50 es 5. Aumentar significa sumar: 50 + 5 = 55."
    },
    {
      text: "¿Qué porcentaje representa 25 de 100?",
      options: ["25%", "20%", "75%", "100%"],
      correct: 0,
      solution: "Si el total es 100, 25 partes equivalen directamente al 25%."
    }
  ],
  divisibilidad: [
    { text: "¿Cuál de estos números es múltiplo de 6?", options: ["42", "44", "49", "55"], correct: 0, solution: "Un múltiplo de 6 debe ser divisible entre 2 y entre 3. 42 cumple ambas condiciones." },
    { text: "¿Cuál es un divisor de 36?", options: ["9", "7", "5", "11"], correct: 0, solution: "36 : 9 = 4, por tanto 9 es divisor de 36." },
    { text: "El m.c.d. de 12 y 18 es...", options: ["6", "12", "18", "36"], correct: 0, solution: "Divisores comunes: 1,2,3,6. El mayor es 6." },
    { text: "El m.c.m. de 4 y 6 es...", options: ["12", "10", "24", "2"], correct: 0, solution: "Los múltiplos comunes son 12,24,... El menor es 12." },
    { text: "Un número divisible por 3 tiene...", options: ["Suma de cifras múltiplo de 3", "Última cifra par", "Última cifra 5", "Dos cifras siempre"], correct: 0, solution: "El criterio de divisibilidad por 3 usa la suma de sus cifras." },
    { text: "¿Cuál es primo?", options: ["13", "21", "27", "1"], correct: 0, solution: "13 solo tiene dos divisores positivos: 1 y 13." },
    { text: "Descompón 18 en factores primos.", options: ["2 x 3^2", "2^2 x 3", "3 x 6", "18 x 1"], correct: 0, solution: "18=2x9=2x3^2." },
    { text: "¿Cuál es divisible por 5?", options: ["125", "122", "118", "111"], correct: 0, solution: "Los números divisibles por 5 terminan en 0 o en 5." },
    { text: "El número 1 es...", options: ["Ni primo ni compuesto", "Primo", "Compuesto", "Múltiplo solo de 2"], correct: 0, solution: "El 1 no tiene exactamente dos divisores, por eso no es primo." },
    { text: "Si un número es divisible por 10, termina en...", options: ["0", "2", "5", "10 siempre con dos cifras"], correct: 0, solution: "Todo múltiplo de 10 termina en 0." }
  ],
  decimales: [
    { text: "Calcula 3,5 + 2,75.", options: ["6,25", "5,80", "6,10", "5,25"], correct: 0, solution: "Alineamos comas: 3,50+2,75=6,25." },
    { text: "Calcula 8,4 - 2,15.", options: ["6,25", "6,35", "5,25", "10,55"], correct: 0, solution: "8,40-2,15=6,25." },
    { text: "Calcula 0,6 x 0,2.", options: ["0,12", "1,2", "0,8", "0,03"], correct: 0, solution: "6x2=12 y hay dos cifras decimales en total: 0,12." },
    { text: "Calcula 4,8 : 0,6.", options: ["8", "0,8", "80", "2,88"], correct: 0, solution: "Multiplicamos divisor y dividendo por 10: 48:6=8." },
    { text: "Redondea 3,746 a las décimas.", options: ["3,7", "3,8", "3,75", "4"], correct: 0, solution: "La cifra de las centésimas es 4, menor que 5; queda 3,7." },
    { text: "Ordena de menor a mayor.", options: ["0,45 < 0,5 < 0,54", "0,5 < 0,45 < 0,54", "0,54 < 0,5 < 0,45", "0,45 < 0,54 < 0,5"], correct: 0, solution: "0,5 equivale a 0,50, así que 0,45 < 0,50 < 0,54." },
    { text: "1/4 en decimal es...", options: ["0,25", "0,4", "0,75", "0,14"], correct: 0, solution: "1 dividido entre 4 es 0,25." },
    { text: "El número 2,03 tiene...", options: ["3 centésimas", "3 décimas", "30 centésimas", "2 milésimas"], correct: 0, solution: "La cifra 3 está en la posición de las centésimas." },
    { text: "Calcula 10 x 0,37.", options: ["3,7", "0,037", "37", "0,47"], correct: 0, solution: "Multiplicar por 10 mueve la coma un lugar a la derecha." },
    { text: "Calcula 5,2 + 0,08.", options: ["5,28", "5,10", "5,208", "13,2"], correct: 0, solution: "5,20+0,08=5,28." }
  ],
  geometriaEso: [
    { text: "La suma de los ángulos de un triángulo es...", options: ["180º", "90º", "270º", "360º"], correct: 0, solution: "En cualquier triángulo, los ángulos interiores suman 180º." },
    { text: "Área de un rectángulo de base 6 y altura 4.", options: ["24", "20", "10", "12"], correct: 0, solution: "Área del rectángulo = base x altura = 6x4=24." },
    { text: "Perímetro de un cuadrado de lado 5.", options: ["20", "25", "10", "15"], correct: 0, solution: "Un cuadrado tiene 4 lados iguales: 4x5=20." },
    { text: "Área de un triángulo de base 8 y altura 3.", options: ["12", "24", "11", "6"], correct: 0, solution: "Área = base x altura / 2 = 8x3/2=12." },
    { text: "Si un círculo tiene radio r, su diámetro es...", options: ["2r", "r/2", "pi r", "r^2"], correct: 0, solution: "El diámetro mide el doble del radio." },
    { text: "Por Pitágoras, si los catetos son 3 y 4, la hipotenusa es...", options: ["5", "7", "12", "25"], correct: 0, solution: "h^2=3^2+4^2=25, luego h=5." },
    { text: "Un ángulo recto mide...", options: ["90º", "180º", "45º", "360º"], correct: 0, solution: "Por definición, un ángulo recto mide 90º." },
    { text: "Volumen de un prisma rectangular 2 x 3 x 4.", options: ["24", "9", "14", "20"], correct: 0, solution: "Volumen = largo x ancho x alto = 2x3x4=24." },
    { text: "Dos figuras semejantes tienen...", options: ["La misma forma", "La misma área siempre", "El mismo tamaño siempre", "Ángulos distintos siempre"], correct: 0, solution: "Las figuras semejantes conservan forma y ángulos, aunque cambie el tamaño." },
    { text: "Una circunferencia es...", options: ["La línea curva cerrada", "La región interior", "Un diámetro", "Un polígono"], correct: 0, solution: "Circunferencia es la línea; círculo es la región interior." }
  ],
  polinomios: [
    { text: "Reduce 3x + 2x.", options: ["5x", "5x^2", "6x", "x"], correct: 0, solution: "Son términos semejantes: 3x+2x=5x." },
    { text: "Calcula (x+2)+(3x-5).", options: ["4x - 3", "4x + 7", "3x - 3", "x - 3"], correct: 0, solution: "Sumamos términos semejantes: x+3x=4x y 2-5=-3." },
    { text: "Calcula (2x)(3x^2).", options: ["6x^3", "5x^2", "6x^2", "5x^3"], correct: 0, solution: "Multiplicamos coeficientes y sumamos exponentes: 2x3=6, x^(1+2)=x^3." },
    { text: "Factoriza x^2 - 9.", options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)^2", "x(x-9)"], correct: 0, solution: "Es diferencia de cuadrados: x^2-3^2." },
    { text: "El grado de 4x^3 - 2x + 1 es...", options: ["3", "4", "2", "1"], correct: 0, solution: "El grado es el mayor exponente de x." },
    { text: "Valor de P(x)=x^2+1 en x=3.", options: ["10", "7", "9", "4"], correct: 0, solution: "P(3)=3^2+1=10." },
    { text: "Producto notable (a+b)^2.", options: ["a^2+2ab+b^2", "a^2+b^2", "a^2-ab+b^2", "2a+2b"], correct: 0, solution: "Cuadrado de una suma: primero al cuadrado, doble producto, segundo al cuadrado." },
    { text: "Divide x^4 : x^2.", options: ["x^2", "x^6", "x^8", "x"], correct: 0, solution: "Al dividir potencias de la misma base, restamos exponentes." },
    { text: "El término independiente de 2x^2-5x+7 es...", options: ["7", "2", "-5", "x"], correct: 0, solution: "El término independiente no lleva x." },
    { text: "Si P(1)=0, entonces x-1 es...", options: ["Factor de P(x)", "Siempre el polinomio completo", "El grado", "El término independiente"], correct: 0, solution: "Por el teorema del factor, si P(a)=0, x-a es factor." }
  ],
  estadistica: [
    {
      text: "Calcula la media de 4, 6, 8 y 10.",
      options: ["7", "8", "6", "28"],
      correct: 0,
      solution: "Sumamos los datos: 4 + 6 + 8 + 10 = 28. Hay 4 datos. Media = 28 : 4 = 7."
    },
    {
      text: "En los datos 2, 3, 3, 5, 7, ¿cuál es la moda?",
      options: ["3", "5", "4", "7"],
      correct: 0,
      solution: "La moda es el dato que más se repite. El 3 aparece dos veces; los demás una."
    },
    {
      text: "¿Cuál es el rango de 5, 8, 12, 15?",
      options: ["10", "15", "5", "7"],
      correct: 0,
      solution: "Rango = valor mayor - valor menor = 15 - 5 = 10."
    },
    {
      text: "La mediana de 1, 4, 9 es...",
      options: ["4", "1", "9", "14"],
      correct: 0,
      solution: "Ordenados ya están: 1, 4, 9. El valor central es 4."
    },
    {
      text: "Si hay 6 aprobados de 10 alumnos, ¿qué porcentaje aprobó?",
      options: ["60%", "6%", "40%", "10%"],
      correct: 0,
      solution: "6 de 10 equivale a 60 de 100, es decir, 60%."
    }
  ],
  probabilidad: [
    {
      text: "En un dado normal, ¿cuál es la probabilidad de sacar un 6?",
      options: ["1/6", "1/2", "6/1", "5/6"],
      correct: 0,
      solution: "Hay 1 caso favorable y 6 posibles. Probabilidad = 1/6."
    },
    {
      text: "En una moneda, ¿cuál es la probabilidad de sacar cara?",
      options: ["1/2", "1/4", "2", "0"],
      correct: 0,
      solution: "Hay dos resultados posibles: cara o cruz. Cara es 1 de 2: 1/2."
    },
    {
      text: "En una bolsa hay 3 bolas rojas y 2 azules. ¿Probabilidad de azul?",
      options: ["2/5", "3/5", "1/2", "5/2"],
      correct: 0,
      solution: "Hay 2 azules y 5 bolas en total. Probabilidad = 2/5."
    },
    {
      text: "Al sacar una carta de 4 ases y 36 cartas no ases, ¿probabilidad de as?",
      options: ["1/10", "4/36", "36/40", "1/4"],
      correct: 0,
      solution: "Hay 4 ases de 40 cartas. 4/40 se simplifica dividiendo entre 4: 1/10."
    },
    {
      text: "Si un suceso es imposible, su probabilidad es...",
      options: ["0", "1", "1/2", "100"],
      correct: 0,
      solution: "Un suceso imposible no puede ocurrir. Su probabilidad es 0."
    }
  ],
  general: [
    {
      text: "Calcula: 4 x (7 + 3) - 12",
      options: ["28", "16", "40", "52"],
      correct: 0,
      solution: "Primero paréntesis: 7 + 3 = 10. Luego 4 x 10 = 40. Por último 40 - 12 = 28."
    },
    {
      text: "Resuelve: x/2 = 9",
      options: ["x = 18", "x = 7", "x = 11", "x = 4,5"],
      correct: 0,
      solution: "Si x está dividido entre 2, multiplicamos por 2: x = 9 x 2 = 18."
    },
    {
      text: "Calcula: 3^3",
      options: ["27", "9", "6", "33"],
      correct: 0,
      solution: "3^3 = 3 x 3 x 3 = 27."
    },
    {
      text: "Calcula: 25% de 40.",
      options: ["10", "25", "15", "20"],
      correct: 0,
      solution: "25% es la cuarta parte. La cuarta parte de 40 es 10."
    },
    {
      text: "Calcula: 2/5 de 30.",
      options: ["12", "15", "6", "20"],
      correct: 0,
      solution: "Dividimos 30 entre 5: 6. Multiplicamos por 2: 12."
    }
  ],
  upperEsoGeneral: [
    { text: "Calcula: 2(3x - 4) + 5x para x = 2", options: ["14", "10", "22", "6"], correct: 0, solution: "Sustituimos x por 2: 2(6 - 4) + 10 = 2 x 2 + 10 = 14." },
    { text: "Reduce: 4a + 3b - 2a + b", options: ["2a + 4b", "6a + 4b", "2a + 2b", "4ab"], correct: 0, solution: "Juntamos t?rminos semejantes: 4a - 2a = 2a y 3b + b = 4b." },
    { text: "Calcula: (3/5) : (6/10)", options: ["1", "9/50", "18/50", "3/10"], correct: 0, solution: "6/10 se simplifica a 3/5. Entonces (3/5) : (3/5) = 1." },
    { text: "Si f(x)=2x-3, calcula f(5).", options: ["7", "10", "-7", "13"], correct: 0, solution: "Sustituimos x por 5: f(5)=2 x 5 - 3 = 10 - 3 = 7." },
    { text: "Resuelve: 4x - 6 = 2x + 8", options: ["x = 7", "x = 1", "x = -7", "x = 14"], correct: 0, solution: "Pasamos 2x al lado izquierdo: 2x - 6 = 8. Sumamos 6: 2x = 14. Dividimos entre 2: x = 7." }
  ],
  potenciasUpper: [
    { text: "Simplifica: (2^3)^4", options: ["2^12", "2^7", "8^4", "2^1"], correct: 0, solution: "Potencia de una potencia: multiplicamos exponentes. (2^3)^4 = 2^(3 x 4) = 2^12." },
    { text: "Simplifica: a^5 : a^2", options: ["a^3", "a^7", "a^10", "a^2"], correct: 0, solution: "Misma base dividiendo: restamos exponentes. a^(5-2)=a^3." },
    { text: "Calcula: sqrt(81)", options: ["9", "8", "18", "40,5"], correct: 0, solution: "La ra?z cuadrada de 81 es el n?mero que multiplicado por s mismo da 81. Es 9." },
    { text: "Expresa 0,00032 en notaci?n cient?fica.", options: ["3,2 x 10^-4", "32 x 10^-4", "3,2 x 10^4", "0,32 x 10^-3"], correct: 0, solution: "Movemos la coma 4 lugares a la derecha para obtener 3,2. Por eso el exponente es -4." },
    { text: "Simplifica: sqrt(50)", options: ["5sqrt(2)", "25sqrt(2)", "2sqrt(5)", "10sqrt(5)"], correct: 0, solution: "50 = 25 x 2. Entonces sqrt(50)=sqrt(25)sqrt(2)=5sqrt(2)." }
  ],
  ecuacionesUpper: [
    { text: "Resuelve: 3(x - 2) = 12", options: ["x = 6", "x = 4", "x = 10", "x = -2"], correct: 0, solution: "Dividimos entre 3: x - 2 = 4. Sumamos 2: x = 6." },
    { text: "Resuelve: x^2 = 49", options: ["x = 7 o x = -7", "x = 7", "x = 24,5", "x = -49"], correct: 0, solution: "Los dos n?meros cuyo cuadrado es 49 son 7 y -7." },
    { text: "Resuelve el sistema: x + y = 7, x - y = 1", options: ["x = 4, y = 3", "x = 3, y = 4", "x = 8, y = -1", "x = 7, y = 1"], correct: 0, solution: "Sumamos las ecuaciones: 2x = 8, luego x = 4. Sustituimos: 4 + y = 7, luego y = 3." },
    { text: "Resuelve: 2x/3 = 10", options: ["x = 15", "x = 20/3", "x = 30", "x = 5"], correct: 0, solution: "Multiplicamos por 3: 2x = 30. Dividimos entre 2: x = 15." },
    { text: "Resuelve: x^2 - 5x = 0", options: ["x = 0 o x = 5", "x = 5", "x = -5", "x = 1 o x = 5"], correct: 0, solution: "Sacamos factor com?n: x(x - 5)=0. Por tanto x=0 o x=5." }
  ],
  funciones: [
    { text: "La pendiente de la recta y = 3x - 2 es...", options: ["3", "-2", "x", "2"], correct: 0, solution: "En y = mx + n, la pendiente es m. Aqu m = 3." },
    { text: "Si f(x)=x^2-1, calcula f(3).", options: ["8", "6", "9", "2"], correct: 0, solution: "Sustituimos x por 3: 3^2 - 1 = 9 - 1 = 8." },
    { text: "?D?nde corta y = 2x + 5 al eje Y?", options: ["En y = 5", "En x = 5", "En y = 2", "En x = -5"], correct: 0, solution: "El corte con el eje Y se obtiene en x=0. Entonces y=5." },
    { text: "La función y = x^2 es...", options: ["Una par?bola", "Una recta horizontal", "Una hip?rbola", "Una circunferencia"], correct: 0, solution: "Las funciones cuadráticas como y=x^2 se representan con parábolas." },
    { text: "Si una recta tiene pendiente negativa, al avanzar hacia la derecha...", options: ["Baja", "Sube", "No cambia", "Se hace vertical"], correct: 0, solution: "Pendiente negativa significa que cuando x aumenta, y disminuye." }
  ],
  complejos: [
    { text: "Si z = 3 + 2i, ¿cuál es su parte real?", options: ["3", "2", "i", "5"], correct: 0, solution: "En z=a+bi, la parte real es a. Aquí a=3." },
    { text: "Si z = 3 + 2i, ¿cuál es su parte imaginaria?", options: ["2", "3", "2i", "5"], correct: 0, solution: "En z=a+bi, la parte imaginaria es el coeficiente de i. Aquí es 2." },
    { text: "Calcula (2 + 3i) + (4 - i).", options: ["6 + 2i", "6 + 4i", "-2 + 2i", "6 - 3i"], correct: 0, solution: "Sumamos partes reales: 2+4=6. Sumamos partes imaginarias: 3i-i=2i." },
    { text: "Calcula (5 - i) - (2 + 3i).", options: ["3 - 4i", "3 + 2i", "7 + 2i", "-3 - 4i"], correct: 0, solution: "Restamos reales: 5-2=3. Restamos imaginarios: -i-3i=-4i." },
    { text: "Calcula i^2.", options: ["-1", "1", "i", "0"], correct: 0, solution: "Por definición de la unidad imaginaria, i^2=-1." },
    { text: "Calcula (2+i)(3-i).", options: ["7 + i", "6 - i", "5 + i", "7 - i"], correct: 0, solution: "Desarrollamos: 6-2i+3i-i^2 = 6+i+1 = 7+i." },
    { text: "El conjugado de 4 - 5i es...", options: ["4 + 5i", "-4 - 5i", "-4 + 5i", "5 - 4i"], correct: 0, solution: "El conjugado conserva la parte real y cambia el signo de la imaginaria." },
    { text: "Calcula el módulo de z = 3 + 4i.", options: ["5", "7", "25", "1"], correct: 0, solution: "|z|=sqrt(3^2+4^2)=sqrt(9+16)=sqrt(25)=5." },
    { text: "¿Qué complejo representa el punto (2,-3) en el plano complejo?", options: ["2 - 3i", "-3 + 2i", "2 + 3i", "-2 - 3i"], correct: 0, solution: "La coordenada x es la parte real y la y es la parte imaginaria: 2-3i." },
    { text: "Resuelve en complejos x^2 + 9 = 0.", options: ["x = 3i o x = -3i", "x = 3", "x = -3", "No tiene solución"], correct: 0, solution: "x^2=-9. Como i^2=-1, las soluciones son 3i y -3i." }
  ],
  realesBach: [
    { text: "Simplifica sqrt(50).", options: ["5sqrt(2)", "25sqrt(2)", "2sqrt(5)", "10sqrt(5)"], correct: 0, solution: "50=25x2, luego sqrt(50)=sqrt(25)sqrt(2)=5sqrt(2)." },
    { text: "Calcula log_10(1000).", options: ["3", "10", "100", "1/3"], correct: 0, solution: "10^3=1000, por tanto el logaritmo vale 3." },
    { text: "Expresa 0,00045 en notación científica.", options: ["4,5 x 10^-4", "45 x 10^-4", "4,5 x 10^4", "0,45 x 10^-3"], correct: 0, solution: "Movemos la coma 4 posiciones: 4,5 x 10^-4." },
    { text: "Calcula 2^-3.", options: ["1/8", "-8", "8", "-1/8"], correct: 0, solution: "Un exponente negativo invierte la potencia: 2^-3=1/2^3=1/8." },
    { text: "Simplifica a^5 : a^2.", options: ["a^3", "a^7", "a^10", "a^1"], correct: 0, solution: "Al dividir potencias de la misma base se restan exponentes: a^(5-2)=a^3. Resultado final: a^3." },
    { text: "Calcula |−7|.", options: ["7", "−7", "0", "1/7"], correct: 0, solution: "Resolución:\n1. El valor absoluto de un número es su distancia al 0 en la recta real.\n2. La distancia entre −7 y 0 es 7 unidades: |−7|=7.\nResultado final: 7." },
    { text: "¿Cuál es el intervalo solución de x > 2?", options: ["(2, +infinito)", "(-infinito, 2)", "[2, +infinito)", "(-2, 2)"], correct: 0, solution: "Los números mayores que 2 se escriben (2,+infinito), sin incluir el 2." },
    { text: "Simplifica (x^2)^3.", options: ["x^6", "x^5", "x^8", "x^1"], correct: 0, solution: "Potencia de una potencia: multiplicamos exponentes, 2·3=6. Resultado final: x^6." },
    { text: "Si log_a(1)=x, entonces x vale...", options: ["0", "1", "a", "-1"], correct: 0, solution: "Cualquier base positiva distinta de 1 elevada a 0 da 1." },
    { text: "Racionaliza 1/√2.", options: ["√2/2", "√2", "1/2", "2√2"], correct: 0, solution: "Resolución:\n1. Multiplicamos numerador y denominador por √2: (1/√2)·(√2/√2).\n2. En el numerador queda √2 y en el denominador √2·√2=2.\nResultado final: √2/2." }
  ],
  trigonometriaBach: [
    { text: "En un triángulo rectángulo, sen(alpha) es...", options: ["Cateto opuesto / hipotenusa", "Cateto contiguo / hipotenusa", "Opuesto / contiguo", "Hipotenusa / opuesto"], correct: 0, solution: "El seno relaciona cateto opuesto e hipotenusa." },
    { text: "cos(0) vale...", options: ["1", "0", "-1", "1/2"], correct: 0, solution: "En la circunferencia goniométrica, cos(0)=1." },
    { text: "sen(90º) vale...", options: ["1", "0", "-1", "1/2"], correct: 0, solution: "El seno de 90º es 1." },
    { text: "La identidad fundamental es...", options: ["sen²(x)+cos²(x)=1", "sen(x)+cos(x)=1", "tg(x)=sen(x)cos(x)", "cos²(x)-sen²(x)=1 siempre"], correct: 0, solution: "La identidad fundamental de trigonometría es sen²(x)+cos²(x)=1." },
    { text: "tg(x) se calcula como...", options: ["sen(x)/cos(x)", "cos(x)/sen(x)", "sen(x)+cos(x)", "1/cos(x)"], correct: 0, solution: "Resolución:\n1. Recordamos la identidad fundamental de la tangente.\n2. Siempre que cos(x)≠0, se cumple tg(x)=sen(x)/cos(x).\nResultado final: tg(x)=sen(x)/cos(x)." },
    { text: "180º equivalen a...", options: ["pi radianes", "2pi radianes", "pi/2 radianes", "1 radian"], correct: 0, solution: "La media circunferencia mide pi radianes." },
    { text: "Si sen(x)=3/5 y x es agudo, cos(x) vale...", options: ["4/5", "3/4", "5/4", "2/5"], correct: 0, solution: "Por sen²(x)+cos²(x)=1, cos²(x)=1-9/25=16/25. Al ser agudo, cos(x)=4/5." },
    { text: "En un triángulo rectángulo, si hipotenusa=10 y cateto opuesto=6, sen(alpha) es...", options: ["3/5", "5/3", "4/5", "6"], correct: 0, solution: "sen=opuesto/hipotenusa=6/10=3/5." },
    { text: "El coseno de un ángulo agudo siempre es...", options: ["Positivo", "Negativo", "Cero", "Mayor que 1"], correct: 0, solution: "En el primer cuadrante seno y coseno son positivos." },
    { text: "Si tg(x)=1 y x es agudo, x vale...", options: ["45º", "30º", "60º", "90º"], correct: 0, solution: "En 45º los catetos son iguales, por eso la tangente vale 1." }
  ],
  geometriaAnalitica: [
    { text: "El vector entre A(1,2) y B(4,6) es...", options: ["(3,4)", "(5,8)", "(-3,-4)", "(4,6)"], correct: 0, solution: "Restamos coordenadas: B-A=(4-1,6-2)=(3,4)." },
    { text: "El módulo del vector (3,4) es...", options: ["5", "7", "25", "1"], correct: 0, solution: "sqrt(3^2+4^2)=5." },
    { text: "Un vector director de la recta x=1+2t, y=3-t es...", options: ["(2,-1)", "(1,3)", "(2,3)", "(-1,2)"], correct: 0, solution: "Los coeficientes de t dan el vector director: (2,-1)." },
    { text: "La pendiente de la recta que pasa por (0,1) y (2,5) es...", options: ["2", "4", "1/2", "5"], correct: 0, solution: "m=(5-1)/(2-0)=4/2=2." },
    { text: "Dos vectores son perpendiculares si su producto escalar es...", options: ["0", "1", "-1", "Igual a sus módulos"], correct: 0, solution: "La perpendicularidad se caracteriza por producto escalar nulo." },
    { text: "Producto escalar de (1,2) y (3,4).", options: ["11", "10", "7", "(3,8)"], correct: 0, solution: "1x3+2x4=3+8=11." },
    { text: "Distancia entre (0,0) y (6,8).", options: ["10", "14", "48", "100"], correct: 0, solution: "sqrt(6^2+8^2)=sqrt(100)=10." },
    { text: "La recta y=2x+1 tiene pendiente...", options: ["2", "1", "-2", "0"], correct: 0, solution: "En y=mx+n, m es la pendiente." },
    { text: "Si dos rectas tienen la misma pendiente y distinto término independiente, son...", options: ["Paralelas", "Perpendiculares", "Coincidentes siempre", "Secantes no perpendiculares"], correct: 0, solution: "Misma pendiente y diferente corte con el eje Y significa rectas paralelas." },
    { text: "Punto medio de A(2,4) y B(6,10).", options: ["(4,7)", "(8,14)", "(2,3)", "(6,10)"], correct: 0, solution: "Promediamos coordenadas: ((2+6)/2,(4+10)/2)=(4,7)." }
  ],
  conicas: [
    { text: "La ecuación x^2 + y^2 = 9 representa...", options: ["Una circunferencia", "Una parábola", "Una elipse no circular", "Una hipérbola"], correct: 0, solution: "Tiene forma x^2+y^2=r^2, con radio 3." },
    { text: "El radio de x^2 + y^2 = 16 es...", options: ["4", "16", "8", "2"], correct: 0, solution: "r^2=16, luego r=4." },
    { text: "La parábola y = x^2 abre hacia...", options: ["Arriba", "Abajo", "La derecha", "La izquierda"], correct: 0, solution: "El coeficiente de x^2 es positivo, por eso abre hacia arriba." },
    { text: "Una elipse tiene la suma de distancias a dos focos...", options: ["Constante", "Nula", "Variable sin regla", "Igual a 1"], correct: 0, solution: "La definición de elipse usa suma constante de distancias a los focos." },
    { text: "Una hipérbola se define por...", options: ["Diferencia constante de distancias a dos focos", "Suma constante", "Distancia a un punto fija", "Pendiente constante"], correct: 0, solution: "En una hipérbola es constante la diferencia de distancias a los focos." },
    { text: "Centro de (x-2)^2 + (y+1)^2 = 25.", options: ["(2,-1)", "(-2,1)", "(2,1)", "(-2,-1)"], correct: 0, solution: "La forma es (x-a)^2+(y-b)^2=r^2. Centro (a,b)=(2,-1)." },
    { text: "Radio de (x-2)^2 + (y+1)^2 = 25.", options: ["5", "25", "10", "2"], correct: 0, solution: "r^2=25, luego r=5." },
    { text: "La directriz aparece de forma característica en...", options: ["La parábola", "La circunferencia", "El determinante", "La matriz identidad"], correct: 0, solution: "La parábola se define mediante foco y directriz." },
    { text: "En una circunferencia, todos sus puntos están...", options: ["A la misma distancia del centro", "En una recta", "A distinta distancia del centro", "Sobre dos focos"], correct: 0, solution: "La distancia común al centro es el radio." },
    { text: "x^2/9 + y^2/4 = 1 representa...", options: ["Una elipse", "Una hipérbola", "Una recta", "Una parábola"], correct: 0, solution: "La suma de dos cocientes cuadrados igual a 1 representa una elipse." }
  ],
  trigonometriaEso: [
    { text: "En un triángulo rectángulo, sen(alpha) es...", options: ["Cateto opuesto / hipotenusa", "Cateto contiguo / hipotenusa", "Hipotenusa / opuesto", "Opuesto / contiguo"], correct: 0, solution: "El seno se define como cateto opuesto dividido entre hipotenusa." },
    { text: "En un triángulo rectángulo, cos(alpha) es...", options: ["Cateto contiguo / hipotenusa", "Cateto opuesto / hipotenusa", "Opuesto / contiguo", "Hipotenusa / contiguo"], correct: 0, solution: "El coseno se define como cateto contiguo dividido entre hipotenusa." },
    { text: "En un triángulo rectángulo, tg(alpha) es...", options: ["Cateto opuesto / cateto contiguo", "Contiguo / hipotenusa", "Opuesto / hipotenusa", "Hipotenusa / opuesto"], correct: 0, solution: "La tangente relaciona los dos catetos." },
    { text: "Si hipotenusa=10 y cateto opuesto=6, sen(alpha) vale...", options: ["3/5", "4/5", "5/3", "6"], correct: 0, solution: "sen=6/10=3/5." },
    { text: "Si cos(alpha)=4/5 en un ángulo agudo, el coseno es...", options: ["Positivo", "Negativo", "Cero", "Mayor que 1"], correct: 0, solution: "En ángulos agudos las razones trigonométricas básicas son positivas." },
    { text: "Un ángulo de 30º es...", options: ["Agudo", "Recto", "Obtuso", "Llano"], correct: 0, solution: "Los ángulos menores de 90º son agudos." },
    { text: "La hipotenusa es siempre...", options: ["El lado mayor del triángulo rectángulo", "El cateto menor", "El lado opuesto a 30º siempre", "La altura"], correct: 0, solution: "La hipotenusa está frente al ángulo recto y es el lado mayor." },
    { text: "Si los catetos son 5 y 12, la hipotenusa es...", options: ["13", "17", "60", "7"], correct: 0, solution: "Por Pitágoras: h^2=25+144=169, h=13." },
    { text: "La razón trigonométrica que usa opuesto/contiguo es...", options: ["Tangente", "Seno", "Coseno", "Secante"], correct: 0, solution: "Tangente = cateto opuesto / cateto contiguo." },
    { text: "Para usar seno, coseno o tangente en ESO, normalmente necesitas...", options: ["Un triángulo rectángulo", "Un polinomio", "Una matriz", "Una tabla estadística"], correct: 0, solution: "Las razones trigonométricas básicas se definen en triángulos rectángulos." }
  ],
  programacionLineal: [
    { text: "En programación lineal, las restricciones suelen representarse como...", options: ["Inecuaciones", "Derivadas", "Integrales", "Logaritmos"], correct: 0, solution: "Las condiciones del problema se traducen a inecuaciones." },
    { text: "La región factible es...", options: ["La zona que cumple todas las restricciones", "Un punto fuera del dibujo", "La derivada de la función", "Siempre un círculo"], correct: 0, solution: "Solo los puntos que cumplen todas las restricciones pertenecen a la región factible." },
    { text: "La función objetivo sirve para...", options: ["Maximizar o minimizar una cantidad", "Calcular una raíz cuadrada", "Ordenar datos", "Hallar una probabilidad"], correct: 0, solution: "La función objetivo expresa lo que se quiere optimizar." },
    { text: "Si maximizas beneficio, buscas...", options: ["El mayor valor de la función objetivo", "El menor valor siempre", "Cualquier punto", "Una recta paralela al eje X"], correct: 0, solution: "Maximizar significa encontrar el valor más alto permitido." },
    { text: "En problemas lineales con región poligonal, el óptimo suele estar en...", options: ["Un vértice de la región factible", "El origen siempre", "Una asíntota", "Una raíz compleja"], correct: 0, solution: "Se evalúa la función objetivo en los vértices candidatos." },
    { text: "La restricción x >= 0 significa...", options: ["No se admiten valores negativos de x", "x debe ser menor que 0", "x vale 0 siempre", "x es cualquier número complejo"], correct: 0, solution: "En problemas reales, x>=0 suele indicar cantidad no negativa." },
    { text: "La recta 2x+y=10 se usa para dibujar...", options: ["La frontera de una restricción", "Una integral", "Una matriz", "Una distribución normal"], correct: 0, solution: "Primero se dibuja la recta frontera y luego se elige el semiplano." },
    { text: "Si un punto no cumple una restricción, entonces...", options: ["No pertenece a la región factible", "Es solución óptima siempre", "Debe derivarse", "Tiene probabilidad 1"], correct: 0, solution: "Todas las restricciones deben cumplirse a la vez." },
    { text: "Para elegir entre vértices, se debe...", options: ["Evaluar la función objetivo en cada uno", "Sumar sus coordenadas siempre", "Escoger el más cercano al origen siempre", "Calcular el módulo complejo"], correct: 0, solution: "El valor óptimo se decide comparando la función objetivo." },
    { text: "Una solución factible debe cumplir...", options: ["Todas las inecuaciones del problema", "Solo una restricción", "Ninguna condición", "Ser negativa siempre"], correct: 0, solution: "Factible significa compatible con todas las condiciones." }
  ],
  combinatoria: [
    { text: "El factorial 5! vale...", options: ["120", "25", "10", "5"], correct: 0, solution: "5!=5x4x3x2x1=120." },
    { text: "Si importa el orden y se usan todos los elementos, hablamos de...", options: ["Permutaciones", "Combinaciones", "Medias", "Derivadas"], correct: 0, solution: "Las permutaciones ordenan todos los elementos." },
    { text: "Si no importa el orden, hablamos de...", options: ["Combinaciones", "Permutaciones", "Variaciones siempre", "Matrices"], correct: 0, solution: "En combinaciones, elegir A y B es lo mismo que elegir B y A." },
    { text: "Número de formas de ordenar 3 libros distintos.", options: ["6", "3", "9", "1"], correct: 0, solution: "Son 3!=3x2x1=6." },
    { text: "¿Cuántas parejas se forman con 4 personas si no importa el orden?", options: ["6", "8", "12", "4"], correct: 0, solution: "C(4,2)=4x3/2=6." },
    { text: "En variaciones de 5 elementos tomados de 2 en 2, el orden...", options: ["Importa", "No importa", "Se ignora siempre", "Solo importa si hay repetición"], correct: 0, solution: "En variaciones sí importa el orden." },
    { text: "C(5,1) vale...", options: ["5", "1", "10", "0"], correct: 0, solution: "Elegir 1 elemento entre 5 puede hacerse de 5 formas." },
    { text: "C(5,5) vale...", options: ["1", "5", "25", "120"], correct: 0, solution: "Solo hay una forma de elegir todos los elementos." },
    { text: "Si hay repetición permitida en una contraseña, un símbolo puede...", options: ["Aparecer más de una vez", "Aparecer solo al final", "No aparecer", "Ser siempre distinto"], correct: 0, solution: "Con repetición, el mismo elemento puede reutilizarse." },
    { text: "La combinatoria sirve para...", options: ["Contar posibilidades de forma organizada", "Medir áreas", "Derivar funciones", "Resolver integrales"], correct: 0, solution: "Su objetivo es contar casos sin enumerarlos uno a uno cuando no conviene." }
  ],
  matesIReales: [
    { text: "Clasifica el numero √(50).", options: ["Irracional y real", "Natural", "Entero", "Racional no entero"], correct: 0, solution: "Solucion:\n1. Simplificamos la raiz: √(50)=√(25x2)=5√(2).\n2. Como √(2) no es racional, 5√(2) tampoco es racional.\nResultado final: √(50) es irracional y pertenece a los reales." },
    { text: "Resuelve la inecuacion 2x - 5 <= 7.", options: ["x <= 6", "x >= 6", "x <= 1", "x >= -6"], correct: 0, solution: "Solucion:\n1. Sumamos 5 en los dos miembros: 2x <= 12.\n2. Dividimos entre 2, que es positivo, y no cambia el sentido: x <= 6.\nResultado final: x <= 6." },
    { text: "Escribe en forma de intervalo: x >= -2 y x < 5.", options: ["[-2, 5)", "(-2, 5]", "[-2, 5]", "(-infinito, 5)"], correct: 0, solution: "Solucion:\n1. El -2 se incluye porque aparece x >= -2, por eso va corchete.\n2. El 5 no se incluye porque aparece x < 5, por eso va parentesis.\nResultado final: [-2, 5)." },
    { text: "Calcula log_2(32).", options: ["5", "16", "4", "64"], correct: 0, solution: "Solucion:\n1. Un logaritmo pregunta el exponente: log_2(32)=x significa 2^x=32.\n2. Como 2^5=32, el exponente es 5.\nResultado final: log_2(32)=5." },
    { text: "Simplifica √(72).", options: ["6√(2)", "12√(2)", "8√(3)", "36√(2)"], correct: 0, solution: "Solucion:\n1. Buscamos un cuadrado perfecto dentro de 72: 72=36x2.\n2. Entonces √(72)=√(36x2)=√(36)√(2)=6√(2).\nResultado final: 6√(2)." },
    { text: "Calcula | -7 + 3 |.", options: ["4", "-4", "10", "-10"], correct: 0, solution: "Solucion:\n1. Primero resolvemos dentro del valor absoluto: -7+3=-4.\n2. El valor absoluto mide distancia a 0, por eso |-4|=4.\nResultado final: 4." },
    { text: "Racionaliza 3/√(5).", options: ["3√(5)/5", "3√(5)", "√(5)/3", "15√(5)"], correct: 0, solution: "Solucion:\n1. Multiplicamos numerador y denominador por √(5).\n2. 3/√(5) = 3√(5)/(√(5)√(5)) = 3√(5)/5.\nResultado final: 3√(5)/5." },
    { text: "Calcula 2^3 x 2^5.", options: ["2^8", "2^15", "4^8", "2^2"], correct: 0, solution: "Solucion:\n1. Al multiplicar potencias de la misma base, sumamos exponentes.\n2. 2^3 x 2^5 = 2^(3+5)=2^8.\nResultado final: 2^8." }
  ],
  matesIComplejos: [
    { text: "Calcula (3 + 2i) + (1 - 5i).", options: ["4 - 3i", "4 + 7i", "2 - 3i", "3 - 10i"], correct: 0, solution: "Solucion:\n1. Sumamos partes reales: 3+1=4.\n2. Sumamos partes imaginarias: 2i-5i=-3i.\nResultado final: 4 - 3i." },
    { text: "Calcula (2 + 3i)(1 - i).", options: ["5 + i", "-1 + i", "5 - i", "2 - 3i"], correct: 0, solution: "Solucion:\n1. Distribuimos: (2+3i)(1-i)=2-2i+3i-3i^2.\n2. Como i^2=-1, queda 2+i+3=5+i.\nResultado final: 5 + i." },
    { text: "Halla el modulo de z = 3 - 4i.", options: ["5", "7", "sqrt(7)", "1"], correct: 0, solution: "Solucion:\n1. El modulo de a+bi es |z|=sqrt(a^2+b^2).\n2. Sustituimos: |z|=sqrt(3^2+(-4)^2)=sqrt(9+16)=sqrt(25)=5.\nResultado final: |z|=5." },
    { text: "El conjugado de -2 + 5i es...", options: ["-2 - 5i", "2 + 5i", "2 - 5i", "-5 + 2i"], correct: 0, solution: "Solucion:\n1. El conjugado conserva la parte real.\n2. Cambia solo el signo de la parte imaginaria.\nResultado final: conjugado(-2+5i)=-2-5i." },
    { text: "Calcula i^23.", options: ["-i", "i", "1", "-1"], correct: 0, solution: "Solucion:\n1. Las potencias de i se repiten cada 4: i, -1, -i, 1.\n2. Dividimos 23 entre 4: resto 3.\n3. Resto 3 corresponde a i^3=-i.\nResultado final: i^23=-i." },
    { text: "Calcula (4 - i) - (2 + 3i).", options: ["2 - 4i", "2 + 2i", "6 - 4i", "-2 - 4i"], correct: 0, solution: "Solucion:\n1. Restar un complejo significa cambiar el signo del segundo.\n2. (4-i)-(2+3i)=4-i-2-3i.\n3. Agrupamos: reales 4-2=2, imaginarias -i-3i=-4i.\nResultado final: 2-4i." },
    { text: "Si z=1+2i, calcula z + conjugado(z).", options: ["2", "4i", "2+4i", "0"], correct: 0, solution: "Solucion:\n1. El conjugado de 1+2i es 1-2i.\n2. Sumamos: (1+2i)+(1-2i)=2.\nResultado final: 2." },
    { text: "Resuelve x^2 + 4 = 0 en C.", options: ["x = 2i o x = -2i", "x = 2 o x = -2", "x = 4i", "No tiene solucion"], correct: 0, solution: "Solucion:\n1. Pasamos 4 al otro miembro: x^2=-4.\n2. Como i^2=-1, sqrt(-4)=2i.\nResultado final: x=2i o x=-2i." }
  ],
  matesIEcuaciones: [
    { text: "Resuelve x^2 - 5x + 6 = 0.", options: ["x = 2 o x = 3", "x = -2 o x = -3", "x = 1 o x = 6", "x = 5 o x = 6"], correct: 0, solution: "Solucion:\n1. Buscamos dos numeros que multiplican 6 y suman -5: -2 y -3.\n2. Factorizamos: x^2-5x+6=(x-2)(x-3).\n3. Igualamos cada factor a cero.\nResultado final: x=2 o x=3." },
    { text: "Resuelve el sistema x + y = 7, x - y = 1.", options: ["x = 4, y = 3", "x = 3, y = 4", "x = 7, y = 1", "x = 1, y = 6"], correct: 0, solution: "Solucion:\n1. Sumamos las dos ecuaciones para eliminar y: 2x=8.\n2. Dividimos entre 2: x=4.\n3. Sustituimos en x+y=7: 4+y=7, luego y=3.\nResultado final: x=4, y=3." },
    { text: "Resuelve mediante el método de Gauss el sistema:\nx + y + z = 6\n2x - y + z = 3\nx + 2y - z = 2", options: ["x = 1, y = 2, z = 3", "x = 2, y = 1, z = 3", "x = 1, y = 3, z = 2", "x = 3, y = 2, z = 1"], correct: 0, solution: "Resolución por el método de Gauss:\n1. Escribimos la matriz ampliada del sistema:\n[[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]].\n2. Hacemos ceros debajo del primer pivote:\nF2 → F2 - 2F1 y F3 → F3 - F1.\nObtenemos [[1, 1, 1, 6], [0, -3, -1, -9], [0, 1, -2, -4]].\n3. Intercambiamos F2 y F3 para trabajar con un pivote igual a 1:\n[[1, 1, 1, 6], [0, 1, -2, -4], [0, -3, -1, -9]].\n4. Hacemos cero debajo del segundo pivote: F3 → F3 + 3F2.\nQueda [[1, 1, 1, 6], [0, 1, -2, -4], [0, 0, -7, -21]].\n5. Resolvemos por sustitución hacia atrás. De la tercera fila: -7z=-21, luego z=3.\nDe la segunda: y-2z=-4, por tanto y-6=-4 y y=2.\nDe la primera: x+y+z=6, luego x+2+3=6 y x=1.\n6. Comprobación: 1+2+3=6; 2·1-2+3=3; 1+2·2-3=2.\nResultado final: x=1, y=2, z=3." },
    { text: "Resuelve x^2 - 9 >= 0.", options: ["(-infinito, -3] union [3, infinito)", "[-3, 3]", "(3, infinito)", "(-infinito, 3]"], correct: 0, solution: "Solucion:\n1. Factorizamos: x^2-9=(x-3)(x+3).\n2. Los puntos que separan intervalos son -3 y 3.\n3. La parabola abre hacia arriba, por eso es positiva fuera de las raices.\nResultado final: (-infinito, -3] union [3, infinito)." },
    { text: "Resuelve 2^x = 16.", options: ["x = 4", "x = 8", "x = 2", "x = 14"], correct: 0, solution: "Solucion:\n1. Escribimos 16 como potencia de 2: 16=2^4.\n2. Si 2^x=2^4, igualamos exponentes.\nResultado final: x=4." },
    { text: "Resuelve log_3(x) = 2.", options: ["x = 9", "x = 6", "x = 5", "x = 3"], correct: 0, solution: "Solucion:\n1. Pasamos de forma logaritmica a exponencial: log_3(x)=2 significa 3^2=x.\n2. Calculamos 3^2=9.\nResultado final: x=9." },
    { text: "Resuelve x^4 - 5x^2 + 4 = 0.", options: ["x = -2, -1, 1, 2", "x = 1, 4", "x = -4, 4", "x = 0, 1"], correct: 0, solution: "Solucion:\n1. Hacemos t=x^2. Queda t^2-5t+4=0.\n2. Factorizamos: (t-1)(t-4)=0, luego t=1 o t=4.\n3. Volvemos: x^2=1 da x=+-1; x^2=4 da x=+-2.\nResultado final: x=-2,-1,1,2." },
    { text: "Resuelve 3x - 2 > x + 6.", options: ["x > 4", "x < 4", "x > 2", "x < -4"], correct: 0, solution: "Solucion:\n1. Pasamos las x a la izquierda: 3x-x > 6+2.\n2. Queda 2x > 8.\n3. Dividimos entre 2, positivo, y no cambia el signo.\nResultado final: x>4." },
    { text: "Resuelve 1/(x-2) = 3.", options: ["x = 7/3", "x = 2", "x = 3", "x = -1"], correct: 0, solution: "Solucion:\n1. Primero indicamos dominio: x no puede ser 2.\n2. Multiplicamos por x-2: 1=3(x-2).\n3. 1=3x-6, luego 7=3x.\nResultado final: x=7/3." }
  ],
  matesITrigonometria: [
    { text: "Convierte 150 grados a radianes.", options: ["5pi/6", "2pi/3", "3pi/4", "pi/6"], correct: 0, solution: "Solucion:\n1. Usamos 180 grados = pi radianes.\n2. 150 grados = 150pi/180 = 5pi/6.\nResultado final: 5pi/6 radianes." },
    { text: "Calcula sen(30 grados).", options: ["1/2", "sqrt(3)/2", "1", "0"], correct: 0, solution: "Solucion:\n1. Recordamos los valores notables.\n2. En un triangulo 30-60-90, el seno de 30 grados es cateto opuesto / hipotenusa = 1/2.\nResultado final: sen(30 grados)=1/2." },
    { text: "Si cos(alpha)=3/5 y alpha es agudo, calcula sen(alpha).", options: ["4/5", "3/4", "5/4", "2/5"], correct: 0, solution: "Solucion:\n1. Usamos sen²(alpha)+cos²(alpha)=1.\n2. sen²(alpha)=1-(3/5)²=1-9/25=16/25.\n3. Como alpha es agudo, el seno es positivo: sen(alpha)=4/5.\nResultado final: 4/5." },
    { text: "Resuelve en [0, 2pi): sen(x)=0.", options: ["x = 0 o x = pi", "x = pi/2", "x = pi/2 o 3pi/2", "x = pi/4"], correct: 0, solution: "Solucion:\n1. El seno es la coordenada vertical en la circunferencia goniometrica.\n2. Vale 0 sobre el eje horizontal.\nResultado final: x=0 o x=pi en [0, 2pi)." },
    { text: "Simplifica 1 - cos²(x).", options: ["sen²(x)", "cos²(x)", "tg(x)", "1"], correct: 0, solution: "Solucion:\n1. Partimos de la identidad fundamental: sen²(x)+cos²(x)=1.\n2. Despejamos: 1-cos²(x)=sen²(x).\nResultado final: sen²(x)." },
    { text: "Calcula tg(45 grados).", options: ["1", "0", "sqrt(3)", "1/2"], correct: 0, solution: "Solucion:\n1. En los angulos notables, 45 grados tiene seno y coseno iguales.\n2. tg(45)=sen(45)/cos(45)=1.\nResultado final: 1." },
    { text: "En que cuadrante sen(x)>0 y cos(x)<0.", options: ["Segundo cuadrante", "Primer cuadrante", "Tercer cuadrante", "Cuarto cuadrante"], correct: 0, solution: "Solucion:\n1. Seno positivo significa parte superior de la circunferencia.\n2. Coseno negativo significa parte izquierda.\n3. Superior e izquierda corresponde al segundo cuadrante.\nResultado final: segundo cuadrante." },
    { text: "Si tg(alpha)=3/4, cateto opuesto 3 y contiguo 4, la hipotenusa es...", options: ["5", "7", "sqrt(12)", "1"], correct: 0, solution: "Solucion:\n1. Aplicamos Pitagoras: h^2=3^2+4^2.\n2. h^2=9+16=25.\n3. h=sqrt(25)=5.\nResultado final: 5." }
  ],
  matesIGeometriaAnalitica: [
    { text: "Vector AB si A(1, -2) y B(5, 3).", options: ["(4, 5)", "(6, 1)", "(-4, -5)", "(5, 3)"], correct: 0, solution: "Solucion:\n1. Restamos coordenadas finales menos iniciales: AB=(x_B-x_A, y_B-y_A).\n2. AB=(5-1, 3-(-2))=(4,5).\nResultado final: AB=(4,5)." },
    { text: "Punto medio de A(2, 6) y B(8, -2).", options: ["(5, 2)", "(10, 4)", "(3, 4)", "(6, -8)"], correct: 0, solution: "Solucion:\n1. Promediamos las coordenadas: M=((2+8)/2, (6+(-2))/2).\n2. M=(10/2, 4/2)=(5,2).\nResultado final: (5,2)." },
    { text: "Pendiente de la recta que pasa por (1,2) y (4,8).", options: ["2", "3", "6", "1/2"], correct: 0, solution: "Solucion:\n1. La pendiente es m=(y_2-y_1)/(x_2-x_1).\n2. m=(8-2)/(4-1)=6/3=2.\nResultado final: m=2." },
    { text: "Ecuacion de la recta de pendiente 3 que pasa por (0, -1).", options: ["y = 3x - 1", "y = -x + 3", "y = 3x + 1", "y = x - 3"], correct: 0, solution: "Solucion:\n1. Usamos la forma y=mx+n.\n2. La pendiente es m=3 y al pasar por (0,-1), la ordenada en el origen es n=-1.\nResultado final: y=3x-1." },
    { text: "Producto escalar de u=(2, -1) y v=(3, 4).", options: ["2", "10", "-2", "(6, -4)"], correct: 0, solution: "Solucion:\n1. Producto escalar: u dot v = u_1v_1 + u_2v_2.\n2. 2x3 + (-1)x4 = 6-4=2.\nResultado final: 2." },
    { text: "Distancia entre A(0,0) y B(6,8).", options: ["10", "14", "48", "sqrt(14)"], correct: 0, solution: "Solucion:\n1. Usamos d=sqrt((x_2-x_1)^2+(y_2-y_1)^2).\n2. d=sqrt(6^2+8^2)=sqrt(36+64)=sqrt(100).\nResultado final: d=10." },
    { text: "Una recta perpendicular a otra de pendiente 2 tiene pendiente...", options: ["-1/2", "2", "1/2", "-2"], correct: 0, solution: "Solucion:\n1. Dos rectas perpendiculares tienen pendientes cuyo producto es -1.\n2. Si una pendiente es 2, la otra debe cumplir 2m=-1.\nResultado final: m=-1/2." },
    { text: "Ecuacion de la recta que pasa por (1,2) y tiene pendiente -1.", options: ["y = -x + 3", "y = x + 1", "y = -x - 3", "y = 2x - 1"], correct: 0, solution: "Solucion:\n1. Usamos y-y_0=m(x-x_0).\n2. y-2=-1(x-1).\n3. Desarrollamos: y-2=-x+1, luego y=-x+3.\nResultado final: y=-x+3." }
  ],
  matesIConicas: [
    { text: "Centro y radio de (x-2)^2 + (y+3)^2 = 16.", options: ["Centro (2,-3), radio 4", "Centro (-2,3), radio 4", "Centro (2,3), radio 16", "Centro (-2,-3), radio 8"], correct: 0, solution: "Solucion:\n1. Comparamos con (x-a)^2+(y-b)^2=r^2.\n2. Aqui a=2, b=-3 y r^2=16.\n3. Por tanto r=4.\nResultado final: centro (2,-3), radio 4." },
    { text: "La conica y^2 = 8x es...", options: ["Parabola", "Circunferencia", "Elipse", "Hiperbola"], correct: 0, solution: "Solucion:\n1. Solo aparece una variable al cuadrado.\n2. Las ecuaciones del tipo y^2=2px representan parabolas horizontales.\nResultado final: es una parabola." },
    { text: "x^2/9 + y^2/4 = 1 representa...", options: ["Elipse", "Hiperbola", "Parabola", "Recta"], correct: 0, solution: "Solucion:\n1. Hay suma de cuadrados divididos por numeros positivos e igual a 1.\n2. Esa es la forma reducida de una elipse.\nResultado final: elipse." },
    { text: "x^2/4 - y^2/9 = 1 representa...", options: ["Hiperbola", "Elipse", "Circunferencia", "Parabola"], correct: 0, solution: "Solucion:\n1. Hay diferencia de dos terminos cuadrados.\n2. La forma x^2/a^2 - y^2/b^2 = 1 corresponde a una hiperbola.\nResultado final: hiperbola." },
    { text: "Radio de x^2 + y^2 - 6x + 4y - 3 = 0.", options: ["4", "3", "sqrt(3)", "16"], correct: 0, solution: "Solucion:\n1. Agrupamos y completamos cuadrados: x^2-6x=(x-3)^2-9; y^2+4y=(y+2)^2-4.\n2. Queda (x-3)^2+(y+2)^2-16=0.\n3. Entonces r^2=16.\nResultado final: r=4." },
    { text: "Foco principal de la parabola y^2 = 12x: valor de p si y^2=2px.", options: ["6", "12", "3", "24"], correct: 0, solution: "Solucion:\n1. Comparamos y^2=12x con y^2=2px.\n2. Entonces 2p=12.\n3. Dividimos entre 2: p=6.\nResultado final: p=6." },
    { text: "Semiejes de x^2/25 + y^2/9 = 1.", options: ["5 y 3", "25 y 9", "sqrt(5) y 3", "10 y 6"], correct: 0, solution: "Solucion:\n1. En la elipse x^2/a^2 + y^2/b^2 = 1, los denominadores son a^2 y b^2.\n2. a^2=25 y b^2=9.\n3. Por tanto a=5 y b=3.\nResultado final: semiejes 5 y 3." },
    { text: "Excentricidad de una circunferencia.", options: ["0", "1", "Mayor que 1", "Entre 0 y 1"], correct: 0, solution: "Solucion:\n1. En una circunferencia los dos focos coinciden con el centro.\n2. La distancia focal es cero.\nResultado final: la excentricidad es 0." }
  ],
  matesIFunciones: [
    { text: "Dominio de f(x)=1/(x-3).", options: ["R menos {3}", "R", "R menos {0}", "[3, infinito)"], correct: 0, solution: "Solucion:\n1. En una fraccion, el denominador no puede valer cero.\n2. x-3=0 da x=3.\nResultado final: Dom(f)=R menos {3}." },
    { text: "Si f(x)=2x-1, calcula f(4).", options: ["7", "8", "6", "9"], correct: 0, solution: "Solucion:\n1. Sustituimos x por 4.\n2. f(4)=2x4-1=8-1=7.\nResultado final: f(4)=7." },
    { text: "Si f(x)=x^2 y g(x)=x+1, calcula (f o g)(2).", options: ["9", "5", "6", "4"], correct: 0, solution: "Solucion:\n1. Primero aplicamos g: g(2)=2+1=3.\n2. Luego aplicamos f al resultado: f(3)=3^2=9.\nResultado final: (f o g)(2)=9." },
    { text: "La funcion f(x)=x^2-4 corta el eje X en...", options: ["x = -2 y x = 2", "x = 4", "x = -4", "x = 0"], correct: 0, solution: "Solucion:\n1. Para cortar el eje X hacemos f(x)=0.\n2. x^2-4=0 implica x^2=4.\n3. Por tanto x=-2 o x=2.\nResultado final: cortes en x=-2 y x=2." },
    { text: "La funcion f(x)=3x+2 es...", options: ["Lineal afin y creciente", "Cuadratica", "Decreciente", "Constante"], correct: 0, solution: "Solucion:\n1. Tiene forma f(x)=mx+n, por eso es una funcion afin.\n2. Su pendiente es m=3, positiva.\nResultado final: es afin y creciente." },
    { text: "Dominio de f(x)=sqrt(x-1).", options: ["[1, infinito)", "(-infinito, 1]", "R", "R menos {1}"], correct: 0, solution: "Solucion:\n1. En una raiz cuadrada, el radicando debe ser mayor o igual que cero.\n2. x-1 >= 0 implica x >= 1.\nResultado final: [1, infinito)." },
    { text: "Si f(x)=x+2, la funcion inversa es...", options: ["f^-1(x)=x-2", "f^-1(x)=x+2", "f^-1(x)=2-x", "f^-1(x)=1/(x+2)"], correct: 0, solution: "Solucion:\n1. Escribimos y=x+2.\n2. Despejamos x: x=y-2.\n3. Cambiamos y por x en la inversa.\nResultado final: f^-1(x)=x-2." },
    { text: "La parabola f(x)=x^2 tiene vertice en...", options: ["(0,0)", "(1,1)", "(0,1)", "(-1,0)"], correct: 0, solution: "Solucion:\n1. f(x)=x^2 es la parabola basica.\n2. Su valor minimo se alcanza cuando x=0.\n3. f(0)=0.\nResultado final: vertice (0,0)." }
  ],
  matesILimites: [
    { text: "Calcula lim x->2 de (x^2 + 1).", options: ["5", "3", "4", "No existe"], correct: 0, solution: "Solucion:\n1. Los polinomios son continuos.\n2. Sustituimos directamente x=2: 2^2+1=4+1=5.\nResultado final: 5." },
    { text: "Calcula lim x->1 de (x^2 - 1)/(x - 1).", options: ["2", "0", "1", "No existe"], correct: 0, solution: "Solucion:\n1. Al sustituir aparece 0/0, una indeterminacion.\n2. Factorizamos: x^2-1=(x-1)(x+1).\n3. Simplificamos x-1 y queda x+1.\n4. Sustituimos x=1: 2.\nResultado final: 2." },
    { text: "lim x->infinito de (3x^2 + 1)/(x^2 - 5) es...", options: ["3", "0", "infinito", "-3"], correct: 0, solution: "Solucion:\n1. En cocientes de polinomios de igual grado, mandan los coeficientes principales.\n2. Coeficiente principal del numerador: 3. Del denominador: 1.\nResultado final: 3/1=3." },
    { text: "Para que f sea continua en x=a debe cumplirse...", options: ["lim x->a f(x) = f(a)", "f'(a)=0", "f(a)=0", "a=0"], correct: 0, solution: "Solucion:\n1. La continuidad exige que no haya salto ni hueco en x=a.\n2. Por eso deben coincidir el limite y el valor de la funcion.\nResultado final: lim x->a f(x)=f(a)." },
    { text: "Calcula lim x->3 de (x^2 - 9)/(x - 3).", options: ["6", "3", "0", "No existe"], correct: 0, solution: "Solucion:\n1. Al sustituir sale 0/0, una indeterminacion.\n2. Factorizamos: x^2-9=(x-3)(x+3).\n3. Simplificamos x-3 y queda x+3.\n4. Sustituimos x=3.\nResultado final: 6." },
    { text: "lim x->infinito de 7/x es...", options: ["0", "7", "infinito", "1"], correct: 0, solution: "Solucion:\n1. El numerador queda fijo y el denominador crece sin limite.\n2. Una cantidad fija dividida entre algo cada vez mayor tiende a 0.\nResultado final: 0." },
    { text: "Si lim x->a- f(x)=2 y lim x->a+ f(x)=5, el limite en a...", options: ["No existe", "Vale 2", "Vale 5", "Vale 7"], correct: 0, solution: "Solucion:\n1. Para que exista el limite, los limites laterales deben coincidir.\n2. Aqui 2 no es igual a 5.\nResultado final: el limite no existe." }
  ],
  matesIDerivadas: [
    { text: "Deriva f(x)=4x^3 - 2x.", options: ["12x^2 - 2", "4x^2 - 2", "12x - 2", "x^4 - x^2"], correct: 0, solution: "Solucion:\n1. Usamos la regla de la potencia: (x^n)'=n x^(n-1).\n2. (4x^3)'=12x^2 y (-2x)'=-2.\nResultado final: f'(x)=12x^2-2." },
    { text: "Deriva f(x)=√x.", options: ["1/(2√x)", "2√x", "1/√x", "√x/2"], correct: 0, solution: "Solución:\n1. Escribimos √x=x^(1/2).\n2. Derivamos: (1/2)x^(-1/2).\n3. Volvemos a radicales: 1/(2√x).\nResultado final: f'(x)=1/(2√x)." },
    { text: "Deriva f(x)=e^x + ln(x).", options: ["e^x + 1/x", "e^x + x", "xe^(x-1) + 1", "ln(x)"], correct: 0, solution: "Solucion:\n1. La derivada de e^x es e^x.\n2. La derivada de ln(x) es 1/x.\nResultado final: f'(x)=e^x+1/x." },
    { text: "Deriva f(x)=sen(x).", options: ["cos(x)", "-cos(x)", "-sen(x)", "tg(x)"], correct: 0, solution: "Solucion:\n1. Usamos la tabla de derivadas elementales.\n2. La derivada del seno es el coseno.\nResultado final: f'(x)=cos(x)." },
    { text: "Pendiente de la tangente a f(x)=x^2 en x=3.", options: ["6", "9", "3", "12"], correct: 0, solution: "Solucion:\n1. La pendiente de la tangente en x=a es f'(a).\n2. Derivamos f(x)=x^2: f'(x)=2x.\n3. Evaluamos en x=3: f'(3)=6.\nResultado final: pendiente 6." },
    { text: "Deriva f(x)=ln(x^2).", options: ["2/x", "1/x^2", "2x", "ln(2x)"], correct: 0, solution: "Solucion:\n1. Usamos regla de la cadena: (ln(u))'=u'/u.\n2. Aqui u=x^2 y u'=2x.\n3. f'(x)=2x/x^2=2/x.\nResultado final: 2/x." },
    { text: "Deriva f(x)=cos(x).", options: ["-sen(x)", "sen(x)", "cos(x)", "-cos(x)"], correct: 0, solution: "Solucion:\n1. Usamos la tabla de derivadas trigonometricas.\n2. La derivada del coseno es menos seno.\nResultado final: f'(x)=-sen(x)." },
    { text: "Deriva f(x)=(x^2+1)^3.", options: ["6x(x^2+1)^2", "3(x^2+1)^2", "2x^3", "x^6+1"], correct: 0, solution: "Solucion:\n1. Aplicamos regla de la cadena.\n2. Si u=x^2+1, entonces f=u^3 y f'=3u^2u'.\n3. u'=2x.\nResultado final: f'(x)=6x(x^2+1)^2." }
  ],
  matesIAplicacionDerivadas: [
    { text: "Recta tangente a f(x)=x^2 en x=1.", options: ["y = 2x - 1", "y = x + 1", "y = 2x + 1", "y = x - 2"], correct: 0, solution: "Solucion:\n1. Punto: f(1)=1, luego pasa por (1,1).\n2. Pendiente: f'(x)=2x, asi que f'(1)=2.\n3. Recta: y-1=2(x-1).\nResultado final: y=2x-1." },
    { text: "Puntos criticos de f(x)=x^2 - 4x + 1.", options: ["x = 2", "x = -2", "x = 4", "x = 0"], correct: 0, solution: "Solucion:\n1. Los candidatos a extremo se obtienen con f'(x)=0.\n2. f'(x)=2x-4.\n3. Igualamos: 2x-4=0, luego x=2.\nResultado final: x=2." },
    { text: "Si f'(x)>0 en un intervalo, f es...", options: ["Creciente", "Decreciente", "Constante", "Discontinua"], correct: 0, solution: "Solucion:\n1. La derivada indica la pendiente de la funcion.\n2. Si f'(x)>0, las pendientes son positivas.\nResultado final: la funcion es creciente en ese intervalo." },
    { text: "Maximo o minimo de f(x)=x^2 en x=0.", options: ["Minimo", "Maximo", "No hay extremo", "Asintota"], correct: 0, solution: "Solucion:\n1. La parabola y=x^2 abre hacia arriba.\n2. Su vertice esta en (0,0).\n3. Al abrir hacia arriba, el vertice es minimo.\nResultado final: minimo en x=0." },
    { text: "Para optimizar un area con una condicion, el primer paso es...", options: ["Escribir una funcion de una variable", "Derivar sin formula", "Elegir siempre x=0", "Hacer una tabla de azar"], correct: 0, solution: "Solucion:\n1. En optimizacion necesitamos una funcion que represente lo que queremos maximizar o minimizar.\n2. Usamos la condicion del problema para dejarla con una sola variable.\n3. Luego se deriva y se buscan puntos criticos.\nResultado final: escribir la funcion objetivo en una variable." },
    { text: "Intervalo de crecimiento de f(x)=x^2 si x>0.", options: ["Creciente", "Decreciente", "Constante", "No definida"], correct: 0, solution: "Solucion:\n1. Derivamos: f'(x)=2x.\n2. Si x>0, entonces 2x>0.\n3. Derivada positiva indica crecimiento.\nResultado final: creciente para x>0." },
    { text: "Para f(x)=-x^2+4, el vertice es...", options: ["Maximo", "Minimo", "Punto de corte", "Asintota"], correct: 0, solution: "Solucion:\n1. Es una parabola con coeficiente de x^2 negativo.\n2. Por eso abre hacia abajo.\n3. El vertice queda arriba de la grafica.\nResultado final: el vertice es un maximo." },
    { text: "Si f'(2)=0 y f''(2)>0, en x=2 hay...", options: ["Minimo relativo", "Maximo relativo", "Punto de inflexion seguro", "Asintota"], correct: 0, solution: "Solucion:\n1. f'(2)=0 indica punto critico.\n2. La segunda derivada positiva indica concavidad hacia arriba.\nResultado final: minimo relativo en x=2." }
  ],
  matesIProbabilidad: [
    { text: "En una urna hay 3 bolas rojas y 5 azules. Probabilidad de sacar roja.", options: ["3/8", "5/8", "3/5", "1/3"], correct: 0, solution: "Solucion:\n1. Aplicamos Laplace: probabilidad = casos favorables / casos posibles.\n2. Favorables: 3 rojas. Posibles: 3+5=8.\nResultado final: P(roja)=3/8." },
    { text: "Si P(A)=0,7, calcula P(no A).", options: ["0,3", "0,7", "1,7", "-0,3"], correct: 0, solution: "Solucion:\n1. Un suceso y su contrario completan el total.\n2. P(no A)=1-P(A)=1-0,7=0,3.\nResultado final: 0,3." },
    { text: "Si A y B son incompatibles, P(A union B) es...", options: ["P(A)+P(B)", "P(A)P(B)", "P(A)-P(B)", "0"], correct: 0, solution: "Solucion:\n1. Incompatibles significa que no pueden ocurrir a la vez.\n2. Entonces P(A interseccion B)=0.\n3. Por tanto P(A union B)=P(A)+P(B).\nResultado final: P(A)+P(B)." },
    { text: "Si P(A)=0,4, P(B)=0,5 y son independientes, P(A interseccion B) vale...", options: ["0,2", "0,9", "0,1", "0,45"], correct: 0, solution: "Solucion:\n1. Para sucesos independientes: P(A interseccion B)=P(A)P(B).\n2. Multiplicamos: 0,4 x 0,5 = 0,2.\nResultado final: 0,2." },
    { text: "En un dado equilibrado, probabilidad de obtener un numero par.", options: ["1/2", "1/3", "2/3", "1/6"], correct: 0, solution: "Solucion:\n1. Casos posibles: 1,2,3,4,5,6, son 6.\n2. Casos favorables pares: 2,4,6, son 3.\n3. P(par)=3/6=1/2.\nResultado final: 1/2." },
    { text: "Si P(A)=0,6, P(B)=0,5 y P(A interseccion B)=0,2, calcula P(A union B).", options: ["0,9", "1,1", "0,3", "0,2"], correct: 0, solution: "Solucion:\n1. Usamos P(A union B)=P(A)+P(B)-P(A interseccion B).\n2. Sustituimos: 0,6+0,5-0,2=0,9.\nResultado final: 0,9." },
    { text: "En dos lanzamientos de moneda, probabilidad de dos caras.", options: ["1/4", "1/2", "3/4", "1"], correct: 0, solution: "Solucion:\n1. Hay 4 resultados equiprobables: CC, CX, XC, XX.\n2. Solo uno tiene dos caras.\nResultado final: 1/4." },
    { text: "Si P(A|B)=P(A), entonces A y B son...", options: ["Independientes", "Incompatibles", "Contrarios", "Imposibles"], correct: 0, solution: "Solucion:\n1. Si saber que ocurre B no cambia la probabilidad de A, no hay dependencia.\n2. Esa es la idea de independencia.\nResultado final: A y B son independientes." }
  ],
  ccssIEstadistica: [
    { text: "La variable 'color de pelo' es...", options: ["Cualitativa nominal", "Cuantitativa discreta", "Cuantitativa continua", "Cualitativa ordinal"], correct: 0, solution: "Solucion:\n1. No se mide con numeros, se clasifica por categorias.\n2. No hay un orden natural entre los colores.\nResultado final: cualitativa nominal." },
    { text: "La variable 'numero de hermanos' es...", options: ["Cuantitativa discreta", "Cuantitativa continua", "Cualitativa nominal", "Cualitativa ordinal"], correct: 0, solution: "Solucion:\n1. Es numerica porque se cuenta.\n2. Solo puede tomar valores enteros: 0, 1, 2...\nResultado final: cuantitativa discreta." },
    { text: "Calcula la media de 4, 6, 6, 8.", options: ["6", "5", "7", "24"], correct: 0, solution: "Solucion:\n1. Sumamos los datos: 4+6+6+8=24.\n2. Dividimos entre 4 datos: 24/4=6.\nResultado final: media 6." },
    { text: "Mediana de 2, 8, 4, 6, 6.", options: ["6", "4", "5", "8"], correct: 0, solution: "Solucion:\n1. Ordenamos: 2, 4, 6, 6, 8.\n2. Hay 5 datos, la mediana es el dato central.\nResultado final: 6." },
    { text: "Moda de 1, 2, 2, 4, 5, 5, 5.", options: ["5", "2", "1", "4"], correct: 0, solution: "Solucion:\n1. La moda es el dato que mas se repite.\n2. El 5 aparece tres veces.\nResultado final: moda 5." },
    { text: "Rango de 3, 7, 9, 11.", options: ["8", "14", "7", "11"], correct: 0, solution: "Solucion:\n1. Rango = maximo - minimo.\n2. Maximo 11 y minimo 3.\nResultado final: 11-3=8." },
    { text: "En la tabla x: 1,2,3 con frecuencias 2,5,3, el total de datos es...", options: ["10", "6", "11", "5"], correct: 0, solution: "Solucion:\n1. El total es la suma de frecuencias.\n2. 2+5+3=10.\nResultado final: 10 datos." },
    { text: "Si covarianza > 0 en una distribucion bidimensional, la relacion es...", options: ["Directa", "Inversa", "Nula siempre", "Imposible"], correct: 0, solution: "Solucion:\n1. Covarianza positiva indica que las variables tienden a crecer juntas.\n2. Por eso la relacion es directa.\nResultado final: relacion directa." }
  ],
  ccssIProbabilidad: [
    { text: "Se lanzan dos dados. Numero de resultados posibles.", options: ["36", "12", "6", "18"], correct: 0, solution: "Solucion:\n1. Cada dado tiene 6 resultados.\n2. Para dos dados: 6x6=36.\nResultado final: 36." },
    { text: "En una bolsa hay 4 verdes, 5 amarillas, 2 rojas y 8 azules. P(verde).", options: ["4/19", "4/15", "5/19", "15/19"], correct: 0, solution: "Solucion:\n1. Total de bolas: 4+5+2+8=19.\n2. Favorables verdes: 4.\nResultado final: P(verde)=4/19." },
    { text: "Con la misma bolsa, P(no verde).", options: ["15/19", "4/19", "1/4", "19/15"], correct: 0, solution: "Solucion:\n1. No verdes: 5+2+8=15.\n2. Total: 19.\nResultado final: P(no verde)=15/19." },
    { text: "Con la misma bolsa, P(roja o azul).", options: ["10/19", "2/19", "8/19", "6/19"], correct: 0, solution: "Solucion:\n1. Rojas o azules: 2+8=10.\n2. Total: 19.\nResultado final: 10/19." },
    { text: "Moneda lanzada dos veces. P(dos caras).", options: ["1/4", "1/2", "3/4", "1"], correct: 0, solution: "Solucion:\n1. Espacio muestral: CC, CX, XC, XX.\n2. Solo CC tiene dos caras.\nResultado final: 1/4." },
    { text: "Si P(A)=2/3, P(B)=3/4 y P(A∩B)=4/6, calcula P(A∪B).", options: ["3/4", "17/12", "1/6", "2/9"], correct: 0, solution: "Solucion:\n1. Usamos P(A∪B)=P(A)+P(B)-P(A∩B).\n2. 2/3+3/4-4/6 = 8/12+9/12-8/12 = 9/12.\nResultado final: 3/4." },
    { text: "En una baraja española de 40 cartas, P(sacar un oro).", options: ["1/4", "1/10", "10/30", "4/40"], correct: 0, solution: "Solucion:\n1. Hay 10 oros en 40 cartas.\n2. P(oro)=10/40=1/4.\nResultado final: 1/4." },
    { text: "Si A y B son independientes, P(A∩B) es...", options: ["P(A)P(B)", "P(A)+P(B)", "P(A)-P(B)", "P(A)/P(B)"], correct: 0, solution: "Solucion:\n1. En sucesos independientes, que ocurra uno no cambia el otro.\n2. La interseccion se calcula multiplicando.\nResultado final: P(A∩B)=P(A)P(B)." }
  ],
  ccssIBinomial: [
    { text: "En una binomial B(5, 0,2), la media es...", options: ["1", "5,2", "0,2", "4"], correct: 0, solution: "Solucion:\n1. En B(n,p), media = np.\n2. n=5 y p=0,2.\nResultado final: 5x0,2=1." },
    { text: "En B(10, 0,3), la varianza es...", options: ["2,1", "3", "0,21", "7"], correct: 0, solution: "Solucion:\n1. Varianza = npq, con q=1-p.\n2. q=0,7.\n3. 10x0,3x0,7=2,1.\nResultado final: 2,1." },
    { text: "En B(4, 0,5), P(X=2) vale...", options: ["6/16", "2/16", "4/16", "1/16"], correct: 0, solution: "Solucion:\n1. Formula: P(X=k)=C(n,k)p^kq^(n-k).\n2. C(4,2)(0,5)^2(0,5)^2 = 6(0,5)^4 = 6/16.\nResultado final: 6/16." },
    { text: "En B(3, 0,2), P(X=0) es...", options: ["0,512", "0,008", "0,2", "0,6"], correct: 0, solution: "Solucion:\n1. Si X=0, no hay exitos.\n2. P(X=0)=q^3=(0,8)^3=0,512.\nResultado final: 0,512." },
    { text: "Si X cuenta bolas rojas en 3 extracciones con reemplazamiento y P(roja)=3/4, entonces X sigue...", options: ["B(3, 3/4)", "B(4, 3)", "Normal", "Uniforme"], correct: 0, solution: "Solucion:\n1. Hay 3 ensayos iguales e independientes.\n2. La probabilidad de exito es 3/4.\nResultado final: X~B(3,3/4)." },
    { text: "En una distribucion de probabilidad, la suma de todas las probabilidades debe ser...", options: ["1", "0", "100", "n"], correct: 0, solution: "Solucion:\n1. Todos los valores posibles forman el espacio completo.\n2. La probabilidad total siempre es 1.\nResultado final: 1." },
    { text: "Juego: premios 5 € con p=0,1 y 0 € con p=0,9. Esperanza.", options: ["0,5 €", "5 €", "4,5 €", "0,9 €"], correct: 0, solution: "Solucion:\n1. Esperanza = suma de valor x probabilidad.\n2. E=5x0,1+0x0,9=0,5.\nResultado final: 0,5 €." },
    { text: "En B(n,p), la desviacion tipica es...", options: ["√(npq)", "np", "npq", "p/n"], correct: 0, solution: "Solucion:\n1. La varianza de una binomial es npq.\n2. La desviacion tipica es la raiz de la varianza.\nResultado final: σ=√(npq)." }
  ],
  ccssINormal: [
    { text: "En N(10, 2), la media es...", options: ["10", "2", "12", "8"], correct: 0, solution: "Solucion:\n1. En N(μ,σ), μ representa la media.\n2. Aqui μ=10.\nResultado final: media 10." },
    { text: "Para tipificar X~N(20, 5), si x=30, z es...", options: ["2", "10", "5", "0,5"], correct: 0, solution: "Solucion:\n1. Tipificamos con z=(x-μ)/σ.\n2. z=(30-20)/5=10/5=2.\nResultado final: z=2." },
    { text: "En una normal, P(X<μ) vale...", options: ["0,5", "1", "0", "0,95"], correct: 0, solution: "Solucion:\n1. La normal es simetrica respecto de la media.\n2. La mitad del area queda a la izquierda.\nResultado final: 0,5." },
    { text: "Si Z~N(0,1), P(Z<0) es...", options: ["0,5", "0", "1", "0,025"], correct: 0, solution: "Solucion:\n1. La normal tipica esta centrada en 0.\n2. Por simetria, la mitad queda por debajo de 0.\nResultado final: 0,5." },
    { text: "En N(50, 10), x=40 corresponde a z...", options: ["-1", "1", "-10", "0,4"], correct: 0, solution: "Solucion:\n1. z=(x-μ)/σ.\n2. z=(40-50)/10=-10/10=-1.\nResultado final: z=-1." },
    { text: "La normal tipica es...", options: ["N(0,1)", "N(1,0)", "B(n,p)", "N(0,0)"], correct: 0, solution: "Solucion:\n1. Tipica significa media 0 y desviacion tipica 1.\nResultado final: N(0,1)." },
    { text: "Si X~N(100,15), σ representa...", options: ["La desviacion tipica", "La media", "La varianza", "La probabilidad"], correct: 0, solution: "Solucion:\n1. En N(μ,σ), el segundo parametro es σ.\n2. σ mide dispersion.\nResultado final: desviacion tipica." },
    { text: "Al tipificar, una normal N(μ,σ) se transforma en...", options: ["N(0,1)", "B(n,p)", "Una recta", "Una tabla de frecuencias"], correct: 0, solution: "Solucion:\n1. Tipificar cambia la escala restando la media y dividiendo por σ.\n2. El resultado se compara con la normal tipica.\nResultado final: N(0,1)." }
  ],
  ccssIReales: [
    { text: "Simplifica √(50).", options: ["5√(2)", "25√(2)", "2√(5)", "10√(5)"], correct: 0, solution: "Solucion:\n1. 50=25x2.\n2. √(50)=√(25)√(2)=5√(2).\nResultado final: 5√(2)." },
    { text: "Racionaliza 1/√(3).", options: ["√(3)/3", "√(3)", "1/3", "3√(3)"], correct: 0, solution: "Solucion:\n1. Multiplicamos por √(3)/√(3).\n2. 1/√(3)=√(3)/3.\nResultado final: √(3)/3." },
    { text: "Calcula log_10(10000).", options: ["4", "3", "10", "1000"], correct: 0, solution: "Solucion:\n1. log_10(10000)=x significa 10^x=10000.\n2. 10000=10^4.\nResultado final: 4." },
    { text: "Resuelve |x|=5.", options: ["x=5 o x=-5", "x=5", "x=-5", "x=0"], correct: 0, solution: "Solucion:\n1. Valor absoluto es distancia a 0.\n2. Hay dos numeros a distancia 5.\nResultado final: x=5 o x=-5." },
    { text: "Intervalo de x<3.", options: ["(-∞,3)", "(-∞,3]", "(3,∞)", "[3,∞)"], correct: 0, solution: "Solucion:\n1. x<3 son todos los numeros menores que 3.\n2. El 3 no se incluye.\nResultado final: (-∞,3)." },
    { text: "Calcula 3^-2.", options: ["1/9", "-9", "9", "-1/9"], correct: 0, solution: "Solucion:\n1. Exponente negativo invierte la potencia.\n2. 3^-2=1/3²=1/9.\nResultado final: 1/9." },
    { text: "Simplifica √(18).", options: ["3√(2)", "9√(2)", "2√(3)", "6√(3)"], correct: 0, solution: "Solucion:\n1. 18=9x2.\n2. √(18)=√(9)√(2)=3√(2).\nResultado final: 3√(2)." },
    { text: "Calcula √(8)+√(18).", options: ["5√(2)", "√(26)", "10√(2)", "13"], correct: 0, solution: "Solucion:\n1. √(8)=2√(2) y √(18)=3√(2).\n2. Sumamos: 2√(2)+3√(2)=5√(2).\nResultado final: 5√(2)." }
  ],
  ccssIComplejos: [
    { text: "Calcula (2+3i)+(4-i).", options: ["6+2i", "6+4i", "-2+2i", "8+3i"], correct: 0, solution: "Solucion:\n1. Sumamos partes reales: 2+4=6.\n2. Sumamos imaginarias: 3i-i=2i.\nResultado final: 6+2i." },
    { text: "Calcula (3+i)(2-i).", options: ["7-i", "5-i", "6-3i", "7+i"], correct: 0, solution: "Solucion:\n1. Distribuimos: 6-3i+2i-i².\n2. Como i²=-1, queda 6-i+1=7-i.\nResultado final: 7-i." },
    { text: "Modulo de z=3+4i.", options: ["5", "7", "25", "1"], correct: 0, solution: "Solucion:\n1. |z|=√(a²+b²).\n2. |z|=√(3²+4²)=√(25)=5.\nResultado final: 5." },
    { text: "Conjugado de 5-2i.", options: ["5+2i", "-5+2i", "2-5i", "-5-2i"], correct: 0, solution: "Solucion:\n1. El conjugado conserva la parte real.\n2. Cambia el signo de la parte imaginaria.\nResultado final: 5+2i." },
    { text: "i^10 vale...", options: ["-1", "1", "i", "-i"], correct: 0, solution: "Solucion:\n1. Las potencias de i se repiten cada 4.\n2. 10 deja resto 2 al dividir entre 4.\n3. i²=-1.\nResultado final: -1." },
    { text: "Resuelve x²+16=0 en C.", options: ["x=4i o x=-4i", "x=4", "x=-4", "No tiene solucion"], correct: 0, solution: "Solucion:\n1. x²=-16.\n2. √(-16)=4i.\nResultado final: x=4i o x=-4i." },
    { text: "Parte real de z=-3+7i.", options: ["-3", "7", "7i", "3"], correct: 0, solution: "Solucion:\n1. La parte real es el numero que no multiplica a i.\nResultado final: Re(z)=-3." },
    { text: "Parte imaginaria de z=6-5i.", options: ["-5", "6", "5", "-5i"], correct: 0, solution: "Solucion:\n1. La parte imaginaria es el coeficiente de i, con signo.\nResultado final: Im(z)=-5." }
  ],
  ccssIEcuaciones: [
    { text: "Resuelve x²-5x+6=0.", options: ["x=2 o x=3", "x=-2 o x=-3", "x=1 o x=6", "x=0 o x=6"], correct: 0, solution: "Solucion:\n1. Factorizamos: x²-5x+6=(x-2)(x-3).\n2. Igualamos cada factor a cero.\nResultado final: x=2 o x=3." },
    { text: "Resuelve el sistema x+y=8, x-y=2.", options: ["x=5, y=3", "x=3, y=5", "x=8, y=2", "x=4, y=4"], correct: 0, solution: "Solucion:\n1. Sumamos ecuaciones: 2x=10.\n2. x=5.\n3. Sustituimos: 5+y=8, y=3.\nResultado final: x=5, y=3." },
    { text: "Resuelve mediante el método de Gauss el sistema:\nx + y + z = 9\n2x - y + z = 5\nx + 2y - z = 4", options: ["x = 2, y = 3, z = 4", "x = 3, y = 2, z = 4", "x = 2, y = 4, z = 3", "x = 4, y = 3, z = 2"], correct: 0, solution: "Resolución por el método de Gauss:\n1. Escribimos la matriz ampliada:\n[[1, 1, 1, 9], [2, -1, 1, 5], [1, 2, -1, 4]].\n2. Hacemos ceros debajo del primer pivote:\nF2 → F2 - 2F1 y F3 → F3 - F1.\nQueda [[1, 1, 1, 9], [0, -3, -1, -13], [0, 1, -2, -5]].\n3. Intercambiamos F2 y F3:\n[[1, 1, 1, 9], [0, 1, -2, -5], [0, -3, -1, -13]].\n4. Hacemos F3 → F3 + 3F2:\n[[1, 1, 1, 9], [0, 1, -2, -5], [0, 0, -7, -28]].\n5. Sustituimos hacia atrás. De la tercera fila: z=4. De la segunda: y-8=-5, luego y=3. De la primera: x+3+4=9, luego x=2.\n6. Comprobación: 2+3+4=9; 2·2-3+4=5; 2+2·3-4=4.\nResultado final: x=2, y=3, z=4." },
    { text: "Resuelve 2x+3=11.", options: ["x=4", "x=7", "x=5", "x=3"], correct: 0, solution: "Solucion:\n1. Restamos 3: 2x=8.\n2. Dividimos entre 2.\nResultado final: x=4." },
    { text: "Resuelve x²=49.", options: ["x=7 o x=-7", "x=7", "x=-7", "x=49"], correct: 0, solution: "Solucion:\n1. Dos numeros tienen cuadrado 49.\nResultado final: x=7 o x=-7." },
    { text: "Resuelve 3^x=27.", options: ["x=3", "x=9", "x=24", "x=2"], correct: 0, solution: "Solucion:\n1. 27=3³.\n2. Igualamos exponentes.\nResultado final: x=3." },
    { text: "Resuelve log_2(x)=4.", options: ["x=16", "x=8", "x=6", "x=2"], correct: 0, solution: "Solucion:\n1. log_2(x)=4 significa 2^4=x.\n2. 2^4=16.\nResultado final: x=16." },
    { text: "Resuelve x²−9=0.", options: ["x=3 o x=−3", "x=9", "x=−9", "x=0"], correct: 0, solution: "Solución:\n1. Sumamos 9 en ambos miembros: x²=9.\n2. Extraemos la raíz cuadrada teniendo en cuenta los dos signos: x=±√9.\n3. Como √9=3, obtenemos x=3 o x=−3.\nResultado final: x=±3." },
    { text: "Resuelve x+y=6, 2x+y=10.", options: ["x=4, y=2", "x=2, y=4", "x=6, y=0", "x=5, y=1"], correct: 0, solution: "Solucion:\n1. Restamos la primera ecuacion a la segunda: x=4.\n2. Sustituimos: 4+y=6, y=2.\nResultado final: x=4, y=2." }
  ],
  ccssIInecuaciones: [
    { text: "Resuelve 2x-1>5.", options: ["x>3", "x<3", "x>2", "x<-3"], correct: 0, solution: "Solucion:\n1. Sumamos 1: 2x>6.\n2. Dividimos entre 2.\nResultado final: x>3." },
    { text: "Resuelve -3x≤6.", options: ["x≥-2", "x≤-2", "x≥2", "x≤2"], correct: 0, solution: "Solucion:\n1. Dividimos entre -3.\n2. Al dividir por negativo cambia el sentido.\nResultado final: x≥-2." },
    { text: "Resuelve x²-4≥0.", options: ["(-∞,-2]∪[2,∞)", "[-2,2]", "(2,∞)", "(-∞,2]"], correct: 0, solution: "Solucion:\n1. Factorizamos: x²-4=(x-2)(x+2).\n2. La parabola abre hacia arriba.\n3. Es positiva fuera de las raices.\nResultado final: (-∞,-2]∪[2,∞)." },
    { text: "Resuelve x+1<4 y x≥0.", options: ["[0,3)", "(0,3]", "(-∞,3)", "[3,∞)"], correct: 0, solution: "Solucion:\n1. De x+1<4 sale x<3.\n2. Tambien debe cumplirse x≥0.\nResultado final: [0,3)." },
    { text: "Resuelve 5-2x≥1.", options: ["x≤2", "x≥2", "x≤-2", "x≥-2"], correct: 0, solution: "Solucion:\n1. Restamos 5: -2x≥-4.\n2. Dividimos por -2 y cambia el signo.\nResultado final: x≤2." },
    { text: "La solucion de x<2 o x>5 es...", options: ["(-∞,2)∪(5,∞)", "(2,5)", "[2,5]", "R"], correct: 0, solution: "Solucion:\n1. Es una union de dos intervalos separados.\n2. No incluye 2 ni 5.\nResultado final: (-∞,2)∪(5,∞)." },
    { text: "Resuelve (x-1)(x-3)>0.", options: ["(-∞,1)∪(3,∞)", "(1,3)", "[1,3]", "R"], correct: 0, solution: "Solucion:\n1. Las raices son 1 y 3.\n2. Producto positivo fuera del intervalo entre raices.\nResultado final: (-∞,1)∪(3,∞)." },
    { text: "Resuelve x/2≤4.", options: ["x≤8", "x≥8", "x≤2", "x≥2"], correct: 0, solution: "Solucion:\n1. Multiplicamos por 2, que es positivo.\n2. No cambia el sentido.\nResultado final: x≤8." }
  ],
  ccssIFunciones: [
    { text: "Dominio de f(x)=1/(x-2).", options: ["R menos {2}", "R", "R menos {0}", "[2,∞)"], correct: 0, solution: "Solucion:\n1. El denominador no puede ser cero.\n2. x-2=0 da x=2.\nResultado final: R menos {2}." },
    { text: "Dominio de f(x)=√(x+3).", options: ["[-3,∞)", "(-∞,-3]", "R", "R menos {-3}"], correct: 0, solution: "Solucion:\n1. En una raiz cuadrada, el radicando debe ser ≥0.\n2. x+3≥0, luego x≥-3.\nResultado final: [-3,∞)." },
    { text: "Si f(x)=2x+1, calcula f(5).", options: ["11", "10", "7", "12"], correct: 0, solution: "Solucion:\n1. Sustituimos x=5.\n2. f(5)=2x5+1=11.\nResultado final: 11." },
    { text: "Corte con el eje X de f(x)=x-4.", options: ["x=4", "x=-4", "x=0", "x=1"], correct: 0, solution: "Solucion:\n1. En el eje X se cumple f(x)=0.\n2. x-4=0.\nResultado final: x=4." },
    { text: "La pendiente de f(x)=3x-2 es...", options: ["3", "-2", "1", "0"], correct: 0, solution: "Solucion:\n1. En f(x)=mx+n, m es la pendiente.\nResultado final: 3." },
    { text: "Vertice de f(x)=x².", options: ["(0,0)", "(1,1)", "(-1,1)", "(0,1)"], correct: 0, solution: "Solucion:\n1. La parabola basica x² tiene minimo en x=0.\n2. f(0)=0.\nResultado final: (0,0)." },
    { text: "Si f es creciente, al aumentar x, f(x)...", options: ["Aumenta", "Disminuye", "Vale 0", "No existe"], correct: 0, solution: "Solucion:\n1. Creciente significa que la funcion sube al avanzar hacia la derecha.\nResultado final: f(x) aumenta." },
    { text: "Dominio de f(x)=√(5-x).", options: ["(-∞,5]", "[5,∞)", "R", "R menos {5}"], correct: 0, solution: "Solucion:\n1. 5-x≥0.\n2. -x≥-5, luego x≤5.\nResultado final: (-∞,5]." }
  ],
  ccssICombinatoria: [
    { text: "5! vale...", options: ["120", "25", "10", "5"], correct: 0, solution: "Solucion:\n1. 5!=5x4x3x2x1.\nResultado final: 120." },
    { text: "Ordenar 4 libros distintos se puede hacer de...", options: ["24 formas", "16 formas", "8 formas", "4 formas"], correct: 0, solution: "Solucion:\n1. Es una permutacion de 4 elementos.\n2. 4!=24.\nResultado final: 24 formas." },
    { text: "Elegir 2 personas de un grupo de 5 sin importar orden es...", options: ["C(5,2)=10", "5x2=10", "5!=120", "2^5=32"], correct: 0, solution: "Solucion:\n1. No importa el orden, usamos combinaciones.\n2. C(5,2)=5x4/2=10.\nResultado final: 10." },
    { text: "Si importa el orden al elegir 2 de 5, usamos...", options: ["Variaciones", "Combinaciones", "Media", "Moda"], correct: 0, solution: "Solucion:\n1. Cuando cambiar el orden cambia el resultado, usamos variaciones.\nResultado final: variaciones." },
    { text: "Numero de codigos de 3 cifras con digitos 0-9 y repeticion.", options: ["1000", "30", "720", "10"], correct: 0, solution: "Solucion:\n1. Hay 10 opciones para cada posicion.\n2. Con repeticion: 10x10x10=1000.\nResultado final: 1000." },
    { text: "C(6,1) vale...", options: ["6", "1", "0", "36"], correct: 0, solution: "Solucion:\n1. Elegir 1 elemento entre 6 puede hacerse de 6 formas.\nResultado final: 6." },
    { text: "C(6,6) vale...", options: ["1", "6", "36", "720"], correct: 0, solution: "Solucion:\n1. Solo hay una forma de elegir todos los elementos.\nResultado final: 1." },
    { text: "Si no importa el orden y no se repite, hablamos de...", options: ["Combinaciones", "Permutaciones", "Variaciones", "Potencias"], correct: 0, solution: "Solucion:\n1. Elegir un grupo sin orden corresponde a combinaciones.\nResultado final: combinaciones." }
  ],
  matesIIPauMatrices: [
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 4 - 4-B\nResolver el sistema de ecuaciones matriciales:\n3X - 2Y = [[7, 3], [16, 4]]\nX + 3Y = [[6, 12], [-2, 27]]", options: ["X = [[3, 3], [4, 6]]\nY = [[1, 3], [-2, 7]]", "X = [[1, 3], [-2, 7]]\nY = [[3, 3], [4, 6]]", "X = [[3, 9], [-6, 21]]\nY = [[1, 3], [-2, 7]]", "X = [[6, 12], [-2, 27]]\nY = [[7, 3], [16, 4]]"], correct: 0, solution: "Resolución paso a paso:\n1. Llamamos A = [[7, 3], [16, 4]] y B = [[6, 12], [-2, 27]].\n2. El sistema queda:\n3X - 2Y = A\nX + 3Y = B\n3. De la segunda ecuación despejamos X:\nX = B - 3Y.\n4. Sustituimos en la primera:\n3(B - 3Y) - 2Y = A.\n5. Desarrollamos:\n3B - 9Y - 2Y = A, luego 3B - 11Y = A.\n6. Despejamos Y:\n11Y = 3B - A, por tanto Y = (3B - A)/11.\n7. Calculamos 3B:\n3B = [[18, 36], [-6, 81]].\n8. Restamos A:\n3B - A = [[18-7, 36-3], [-6-16, 81-4]] = [[11, 33], [-22, 77]].\n9. Dividimos entre 11:\nY = [[1, 3], [-2, 7]].\n10. Ahora usamos X = B - 3Y:\n3Y = [[3, 9], [-6, 21]].\n11. Restamos:\nX = [[6, 12], [-2, 27]] - [[3, 9], [-6, 21]] = [[3, 3], [4, 6]].\nResultado final:\nX = [[3, 3], [4, 6]] e Y = [[1, 3], [-2, 7]]." },
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 1 - A\n1) Despeja la matriz X en la ecuacion: 2·X - B = A·X.\n2) Halla la matriz X de la ecuacion anterior sabiendo que\nA = [[1, 0, 1], [2, 1, 0], [-1, 3, 1]] y B = [[1, -2], [-3, 3], [4, -3]].", solution: "Solucion guiada:\n1. Agrupamos los terminos con X: 2X-A X = B.\n2. Sacamos factor comun por la derecha: (2I-A)X=B.\n3. Si 2I-A tiene inversa, X=(2I-A)^(-1)B.\n4. Sustituye A y B y calcula la inversa de 2I-A." },
    { type: "pau-open", text: "PAEG 2010 - reserva 1 - Matrices\nEncuentra el valor de X en una ecuacion matricial de la forma A·X=B, despejando mediante la matriz inversa cuando exista.", solution: "Solucion guiada:\n1. Comprueba que A sea cuadrada y que det(A) sea distinto de 0.\n2. Multiplica por A^(-1) a la izquierda.\n3. X=A^(-1)B.\n4. Revisa dimensiones para que el producto tenga sentido." },
    { type: "pau-open", text: "PAEG 2008 - reserva 2 - Matrices\nDada una matriz A, calcula A^2 y resuelve una ecuacion matricial asociada usando operaciones con matrices.", solution: "Solucion guiada:\n1. Calcula A^2 multiplicando A por A.\n2. Ordena la ecuacion matricial hasta dejar los terminos con X en un lado.\n3. Si aparece AX=B, usa X=A^(-1)B cuando A tenga inversa." },
    { type: "pau-open", text: "PAEG 2006 - junio - Castilla-La Mancha\nDespeja la matriz X en funcion de A e I2 en una ecuacion matricial con matrices cuadradas de orden dos. Despues resuelve la ecuacion para la matriz A dada.", solution: "Solucion guiada:\n1. Trata I2 como el numero 1 en el algebra matricial, respetando el orden de los productos.\n2. Agrupa X y factoriza si es posible.\n3. Usa inversa solo si el determinante de la matriz que multiplica a X no es cero." }
  ],
  matesIIPauDeterminantes: [
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 2 - 2-B\nEstudiar la compatibilidad del siguiente sistema de ecuaciones lineales, según los valores del parámetro a, y resolverlo cuando sea posible:\nx - y = 5\ny + z = a\nx - 2z = 3\n2x - 3z = a", options: PAU_SYSTEM_2000_OPTIONS, correct: 0, solution: PAU_SYSTEM_2000_SOLUTION },
    { type: "pau-open", text: "PAEG 2007 - junio - Castilla-La Mancha\nCalcula el rango de una matriz A en funcion del parametro λ. ¿Para que valores del parametro λ tiene inversa la matriz A? No se pide hallarla. Discute y resuelve, en funcion del parametro a, el sistema asociado.", solution: "Solucion guiada:\n1. Para estudiar inversa, calcula det(A).\n2. A tiene inversa exactamente cuando det(A)≠0.\n3. Para los valores que anulan el determinante, estudia rangos.\n4. Aplica Rouche-Frobenius para clasificar el sistema." },
    { type: "pau-open", text: "PAEG 2005 - septiembre - Castilla-La Mancha\nSe consideran dos matrices A y B, donde m es un numero real. Encuentra los valores de m para los que A·B tiene inversa.", solution: "Solucion guiada:\n1. A·B tiene inversa si det(A·B)≠0.\n2. Usa det(A·B)=det(A)·det(B).\n3. Calcula los valores de m que anulan alguno de los dos determinantes.\n4. Excluye esos valores." },
    { type: "pau-open", text: "PAEG 2007 - junio - Madrid\nEstudiar el rango de una matriz segun los valores del parametro m.", solution: "Solucion guiada:\n1. Calcula determinantes de orden maximo.\n2. Si algun determinante de orden maximo es no nulo, el rango es maximo.\n3. Si se anulan, baja al estudio de menores de orden inferior.\n4. Separa los casos segun los valores de m." },
    { type: "pau-open", text: "PAEG 2005 - septiembre - Madrid\nDada una matriz A dependiente de parametros, halla constantes para expresar una potencia de A, calcula A^5 usando la expresion obtenida y resuelve una ecuacion matricial.", solution: "Solucion guiada:\n1. Busca una relacion polinomica sencilla para A.\n2. Usa esa relacion para reducir potencias altas.\n3. En la ecuacion matricial, cuidado: en matrices no siempre se puede conmutar." }
  ],
  matesIIPauSistemas: [
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 2 - 2-B\nEstudiar la compatibilidad del sistema lineal, según los valores del parámetro a, y resolverlo cuando sea posible:\nx - y = 5\ny + z = a\nx - 2z = 3\n2x - 3z = a", options: PAU_SYSTEM_2000_OPTIONS, correct: 0, solution: PAU_SYSTEM_2000_SOLUTION },
    { type: "pau-open", text: "PAEG junio 2014 - Sistemas\nPlantea y resuelve un sistema lineal a partir de un problema contextual de tres variables.", solution: "Solucion guiada:\n1. Define claramente las tres incognitas.\n2. Traduce cada frase del enunciado en una ecuacion.\n3. Resuelve por Gauss, Cramer o matriz inversa.\n4. Comprueba que las soluciones tienen sentido en el contexto." },
    { type: "pau-open", text: "PAEG septiembre 2013 - Sistemas\nPlantea el sistema que permite obtener el numero de trabajadores de tres nacionalidades y resuelve el sistema planteado.", solution: "Solucion guiada:\n1. Llama x, y, z a las tres nacionalidades.\n2. Usa la ecuacion del total y las dos relaciones dadas.\n3. Sustituye o reduce el sistema.\n4. Da la solucion con unidades: trabajadores." },
    { type: "pau-open", text: "PAEG reserva 1 - 2013 - Sistemas\nTres amigos compran cuadernos, carpetas y boligrafos con distintos importes. Plantea el sistema que permita averiguar el precio de cada producto y resuelvelo.", solution: "Solucion guiada:\n1. Define x=precio del cuaderno, y=precio de la carpeta, z=precio del boligrafo.\n2. Cada compra da una ecuacion lineal.\n3. Resuelve el sistema y comprueba sustituyendo en las tres compras." },
    { type: "pau-open", text: "PAEG reserva 2 - 2013 - Sistemas\nUna empresa tiene delegaciones en Albacete, Cuenca y Toledo. Plantea el sistema de ecuaciones que permita calcular el numero de empleados de cada delegacion y resuelvelo.", solution: "Solucion guiada:\n1. Define una incognita para cada delegacion.\n2. Traduce el total y las relaciones entre delegaciones.\n3. Resuelve por sustitucion o reduccion.\n4. Comprueba que el total coincide." }
  ],
  matesIIPauGeometria: [
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 1 - 2-A\nHallar la distancia del punto P(2, 4, 1) al plano π = 3x + 4y + 12z - 8 = 0, y encontrar el punto del plano que da la minima distancia del punto P.", solution: "Solucion guiada:\n1. Usa la formula distancia punto-plano: d=|Ax0+By0+Cz0+D|/sqrt(A^2+B^2+C^2).\n2. La recta perpendicular al plano por P tiene direccion normal n=(3,4,12).\n3. Interseca esa recta con el plano para obtener el punto mas cercano." },
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 3 - 3-B\nHallar el punto P simetrico de A(1, 2, 3) respecto a la recta r dada por el sistema:\nx - y + 1 = 0\n2x - z - 1 = 0", solution: "Solucion guiada:\n1. Escribe la recta como interseccion de dos planos y halla un punto y un vector director.\n2. Proyecta A sobre la recta para obtener el pie H.\n3. El simetrico P cumple H=(A+P)/2.\n4. Despeja las coordenadas de P." },
    { type: "pau-open", text: "PAEG septiembre 2013 - Geometria\nDados P(4,2,3) y Q(2,0,-5), da la ecuacion implicita del plano de modo que el punto simetrico de P respecto a ese plano es Q.", solution: "Solucion guiada:\n1. Si Q es simetrico de P respecto al plano, el plano es mediador de PQ.\n2. Su vector normal es PQ.\n3. Pasa por el punto medio de P y Q.\n4. Escribe n·(X-M)=0." },
    { type: "pau-open", text: "PAEG septiembre 2012 - Geometria\nDados un punto P(1,0,0) y un plano π, calcula el punto Q de π que hace minima la distancia a P y calcula el punto simetrico P' de P respecto del plano.", solution: "Solucion guiada:\n1. Traza la recta perpendicular al plano por P usando el vector normal del plano.\n2. Interseca esa recta con el plano para obtener Q.\n3. El simetrico P' cumple Q=(P+P')/2." },
    { type: "pau-open", text: "PAEG reserva 2 - 2007 - Geometria\nDados cuatro puntos A, B, C y D, calcula el area del triangulo ABC y analiza si los cuatro puntos forman un tetraedro; en caso afirmativo, halla su volumen.", solution: "Solucion guiada:\n1. Area del triangulo: (1/2)|AB x AC|.\n2. Para tetraedro, comprueba que el producto mixto [AB,AC,AD] no sea cero.\n3. Volumen: |[AB,AC,AD]|/6." }
  ],
  matesIIPauLimites: [
    {
      type: "pau-open",
      text: "2021 - convocatoria de junio - Ejercicio 7.a\nCalcula razonadamente el siguiente límite:\nlim x→2 de frac{e^(x-2)-1}{x^2-4}.",
      options: ["1/4", "1/2", "4", "El límite no existe"],
      correct: 0,
      solution: "Resolución:\n1. Al sustituir x=2 obtenemos 0/0, una indeterminación en forma de cociente.\n2. Aplicamos la regla de L'Hôpital: derivamos por separado el numerador y el denominador.\n(e^(x-2)-1)'=e^(x-2) y (x²-4)'=2x.\n3. El límite queda:\nlim x→2 de e^(x-2)/(2x).\n4. Ya no hay indeterminación y sustituimos x=2:\ne^0/(2·2)=1/4.\nResultado final: 1/4."
    },
    {
      type: "pau-open",
      text: "2023 - convocatoria de junio - Ejercicio 6.a\nCalcula el siguiente límite:\nlim x→+∞ de (frac{5x+1}{5x})^(x^2).",
      options: ["+∞", "e^(1/5)", "e", "1"],
      correct: 0,
      solution: "Resolución:\n1. Escribimos la base como (5x+1)/(5x)=1+1/(5x). La expresión es una indeterminación del tipo 1^∞.\n2. Aplicamos la fórmula del límite del número e:\nlim (1+u(x))^v(x)=e^[lim u(x)·v(x)].\n3. Aquí u(x)=1/(5x) y v(x)=x². Por tanto:\nu(x)·v(x)=x²/(5x)=x/5.\n4. Cuando x→+∞, x/5→+∞. Entonces el límite es e^(+∞).\nResultado final: +∞."
    },
    {
      type: "pau-open",
      text: "2024 - convocatoria de junio - Ejercicio 4.a\nCalcula el siguiente límite:\nlim x→+∞ de frac{e^x-1}{x^2+3}.",
      options: ["+∞", "0", "1", "e"],
      correct: 0,
      solution: "Resolución:\n1. Tanto el numerador como el denominador tienden a +∞. Podemos aplicar la regla de L'Hôpital.\n2. Derivamos numerador y denominador:\nlim x→+∞ de e^x/(2x).\n3. Sigue siendo una indeterminación ∞/∞, así que aplicamos L'Hôpital otra vez:\nlim x→+∞ de e^x/2.\n4. La función exponencial crece sin límite.\nResultado final: +∞."
    },
    {
      type: "pau-open",
      text: "2026 - convocatoria de junio - Pregunta 5.1.a\nCalcula justificadamente el siguiente límite:\nlim x→∞ de (frac{2x+1}{2x-3})^x.",
      options: ["e^2", "e^4", "1", "+∞"],
      correct: 0,
      solution: "Resolución:\n1. La base tiende a 1 y el exponente a ∞; tenemos una indeterminación 1^∞.\n2. Escribimos la base:\n(2x+1)/(2x-3)=1+4/(2x-3).\n3. Aplicamos la fórmula del límite del número e:\nlim (1+u(x))^v(x)=e^[lim u(x)·v(x)].\n4. Aquí u(x)=4/(2x-3) y v(x)=x. Calculamos el exponente:\nlim x→∞ de 4x/(2x-3)=4/2=2.\n5. Sustituimos este valor en la fórmula.\nResultado final: e²."
    },
    {
      type: "pau-open",
      text: "2026 - convocatoria de julio - Pregunta 5.2.b\nCalcula razonadamente el siguiente límite:\nlim x→0 de frac{e^x-sen(x)-1}{x^2}.",
      options: ["1/2", "0", "1", "+∞"],
      correct: 0,
      solution: "Resolución:\n1. Al sustituir x=0 aparece 0/0. Aplicamos la regla de L'Hôpital.\n2. Derivamos numerador y denominador:\nlim x→0 de (e^x-cos(x))/(2x).\n3. Al sustituir vuelve a aparecer 0/0. Aplicamos L'Hôpital por segunda vez:\nlim x→0 de (e^x+sen(x))/2.\n4. Ahora sustituimos x=0:\n(e^0+sen(0))/2=(1+0)/2.\nResultado final: 1/2."
    }
  ],
  matesIIPauContinuidad: [
    { type: "pau-open", text: "2000 - convocatoria de junio - Bloque 3 - 3-A\nDada la función\nf(x) = { x^2 si x≤0; a+bx si 0<x≤1; 3 si x>1 },\ndeterminar a y b de modo que sea continua. Para los valores que se obtengan, estudiar su derivabilidad.", options: PAU_CONTINUITY_2000_OPTIONS, correct: 0, solution: PAU_CONTINUITY_2000_SOLUTION },
    { type: "pau-open", text: "PAEG junio 2014 - Funciones\nSe considera una funcion definida a trozos. Halla el valor del parametro para que la funcion sea continua en el punto indicado. Para ese valor, representa graficamente la funcion.", solution: "Solucion guiada:\n1. Localiza el punto donde cambia la definicion.\n2. Calcula limite lateral izquierdo, valor de la funcion y limite lateral derecho.\n3. Igualalos para hallar el parametro.\n4. Representa cada rama respetando su intervalo." },
    { type: "pau-open", text: "PAEG septiembre 2013 - Funciones\nEstudia la continuidad de una funcion definida a trozos en el punto indicado. Calcula sus extremos relativos e intervalos de crecimiento y decrecimiento en el intervalo pedido.", solution: "Solucion guiada:\n1. Estudia continuidad en el punto de cambio.\n2. Deriva la rama correspondiente al intervalo pedido.\n3. Busca puntos criticos con f'(x)=0.\n4. Usa el signo de f' para crecimiento y decrecimiento." },
    { type: "pau-open", text: "PAEG reserva 1 - 2013 - Funciones\nHalla el valor del parametro para que una funcion definida a trozos sea continua en x=0. Para ese valor, representa la grafica.", solution: "Solucion guiada:\n1. Calcula los limites laterales en x=0.\n2. Impone que coincidan con el valor de la funcion.\n3. Sustituye el parametro obtenido.\n4. Dibuja cada tramo." },
    { type: "pau-open", text: "PAEG junio 2012 - Funciones\nEstudia la continuidad en x=1. Calcula los extremos relativos y los intervalos de crecimiento y decrecimiento de la funcion en el intervalo indicado.", solution: "Solucion guiada:\n1. Compara limite por la izquierda, valor y limite por la derecha.\n2. Deriva donde corresponda.\n3. Resuelve f'(x)=0 para candidatos a extremo.\n4. Clasifica usando el signo de la derivada." }
  ],
  matesIIPauDerivadas: [
    {
      type: "pau-open",
      text: "2008 - reserva 1 - Primer bloque B\nDetermina los valores a,b ∈ R para que la función f(x)=a·sen(x)+b·cos(x) pase por el punto (π/4, √2) y además cumpla que la pendiente de la recta tangente en el punto de abscisa x=π/2 sea 5. Calcula la derivada de orden 2008 de dicha función.",
      options: ["a=7, b=-5 y f^(2008)(x)=7·sen(x)-5·cos(x)", "a=-5, b=7 y f^(2008)(x)=-5·sen(x)+7·cos(x)", "a=7, b=-5 y f^(2008)(x)=-7·sen(x)+5·cos(x)", "a=2, b=0 y f^(2008)(x)=2·sen(x)"],
      correct: 0,
      solution: "Resolución:\n1. Como la gráfica pasa por (π/4,√2), se cumple f(π/4)=√2.\n2. sen(π/4)=cos(π/4)=√2/2, así que a·√2/2+b·√2/2=√2. Dividimos por √2/2 y obtenemos a+b=2.\n3. Derivamos: f'(x)=a·cos(x)-b·sen(x).\n4. La pendiente en x=π/2 es 5:\nf'(π/2)=a·0-b·1=-b=5, luego b=-5.\n5. Sustituimos en a+b=2: a-5=2, de donde a=7. La función es f(x)=7·sen(x)-5·cos(x).\n6. Escribimos la función y sus siete primeras derivadas para observar la repetición:\n[[derivative-cycle-2008]]\nEl ciclo se repite cada cuatro derivadas. Por eso dividimos el orden solicitado entre la longitud del ciclo:\n2008:4=502, resto 0.\nEs decir, 2008=4·502+0. Como el resto es 0, corresponde la posición de f(x) en el ciclo:\nf^(2008)(x)=f(x)=7·sen(x)-5·cos(x).\nResultado final: a=7, b=-5 y f^(2008)(x)=7·sen(x)-5·cos(x)."
    },
    {
      type: "pau-open",
      text: "2009 - reserva 2 - Primer bloque A\nEncuentra el punto de la gráfica de la función f(x)=x^3+x^2+x+1 en el que la pendiente de la recta tangente sea mínima.",
      options: ["P(frac{-1}{3}, frac{20}{27})", "P(frac{1}{3}, frac{40}{27})", "P(-1, 0)", "P(0, 1)"],
      correct: 0,
      solution: "Resolución:\n1. La pendiente de la tangente es f'(x). Derivamos:\nf'(x)=3x²+2x+1.\n2. Debemos encontrar el mínimo de esta función cuadrática. Derivamos de nuevo:\nf''(x)=6x+2.\n3. Igualamos a cero: 6x+2=0, luego x=frac{-1}{3}.\n4. Como la tercera derivada es f'''(x)=6>0, f'(x) alcanza un mínimo en x=frac{-1}{3}.\n5. Calculamos la ordenada del punto:\nf(frac{-1}{3})=paren{frac{-1}{3}}³+paren{frac{-1}{3}}²-frac{1}{3}+1\n=frac{-1}{27}+frac{1}{9}-frac{1}{3}+1=frac{20}{27}.\nResultado final: P(frac{-1}{3}, frac{20}{27})."
    },
    {
      type: "pau-open",
      text: "2021 - convocatoria de julio - Ejercicio 6\nSea la función f(x)=(2x^2+2x-2)/(3x^2+3).\na) Halla razonadamente las coordenadas de los extremos relativos de la función f(x) y clasifícalos.\nb) Calcula la ecuación de la recta tangente y la ecuación de la recta normal a la gráfica de la función f(x) en el punto de abscisa x=1.",
      options: ["Mínimo (2-√5,-√5/3), máximo (2+√5,√5/3); tangente y=2x/3-1/3; normal y=-3x/2+11/6", "Máximo (2-√5,-√5/3), mínimo (2+√5,√5/3); tangente y=2x/3+1/3; normal y=3x/2-11/6", "Mínimo (-2-√5,-√5/3), máximo (-2+√5,√5/3); tangente y=x/3; normal y=-3x", "No tiene extremos; tangente y=x/3+1/3; normal y=-3x"],
      correct: 0,
      partSolutions: [
        "Resolución del apartado a):\n1. Derivamos con la regla del cociente y escribimos toda la derivada como una fracción:\nf'(x)=frac{(4x+2)(3x²+3)−(2x²+2x−2)·6x}{(3x²+3)²}=frac{−6x²+24x+6}{(3x²+3)²}=frac{−6(x²−4x−1)}{(3x²+3)²}.\n2. El denominador (3x²+3)² es siempre positivo. Por tanto, los puntos críticos se obtienen anulando el numerador:\nx²−4x−1=0, de donde x=2−√5 o x=2+√5.\n3. Probamos un valor de cada intervalo en f'(x):\n• En (−∞,2−√5), tomamos x=−1: f'(−1)=frac{−24}{36}<0.\n• En (2−√5,2+√5), tomamos x=0: f'(0)=frac{6}{9}=frac{2}{3}>0.\n• En (2+√5,+∞), tomamos x=5: f'(5)=frac{−24}{6084}<0.\n[[signchart points=\"−∞|2−√5|2+√5|+∞\" signs=\"−|+|−\" arrows=\"↓|↑|↓\"]]\n4. En x=2−√5 el signo cambia de − a +, luego hay un mínimo relativo. En x=2+√5 cambia de + a −, luego hay un máximo relativo.\n5. Como en ambos puntos críticos x²=4x+1, se obtiene f(x)=frac{5x}{3(2x+1)}. Por tanto, f(2−√5)=frac{−√5}{3} y f(2+√5)=frac{√5}{3}.\nResultado final: mínimo relativo en (2−√5,frac{−√5}{3}) y máximo relativo en (2+√5,frac{√5}{3}).",
        "Resolución del apartado b):\n1. Calculamos el punto de tangencia: f(1)=frac{2+2−2}{3+3}=frac{1}{3}.\n2. Sustituimos x=1 en la derivada: f'(1)=frac{−6+24+6}{(3+3)²}=frac{24}{36}=frac{2}{3}.\n3. La recta tangente tiene pendiente m=frac{2}{3}:\ny−frac{1}{3}=frac{2}{3}(x−1), por tanto y=frac{2x}{3}−frac{1}{3}.\n4. La recta normal es perpendicular a la tangente. Por tanto, sus pendientes cumplen:\nm·m_n=−1.\nSustituimos m=frac{2}{3}:\nfrac{2}{3}·m_n=−1.\nDespejamos la pendiente de la normal:\nm_n=frac{−1}{frac{2}{3}}=−1·frac{3}{2}=frac{−3}{2}.\n5. Usamos la ecuación punto-pendiente de la normal:\ny−frac{1}{3}=frac{−3}{2}(x−1), por tanto y=frac{−3x}{2}+frac{11}{6}.\nResultado final: tangente y=frac{2x}{3}−frac{1}{3} y normal y=frac{−3x}{2}+frac{11}{6}."
      ],
      solution: "Resolución:\n1. Derivamos con la regla del cociente:\nf'(x)=[(4x+2)(3x²+3)-(2x²+2x-2)(6x)]/(3x²+3)²\n=(-6x²+24x+6)/(3x²+3)²\n=-6(x²-4x-1)/(3x²+3)².\n2. El denominador es siempre positivo. Los puntos críticos verifican x²-4x-1=0, luego x=2-√5 o x=2+√5.\n3. El signo de f' es negativo antes de 2-√5, positivo entre las dos raíces y negativo después de 2+√5. Por tanto hay un mínimo en x=2-√5 y un máximo en x=2+√5.\n4. Usando x²=4x+1 en ambos puntos críticos, f(x)=5x/[3(2x+1)]. Así obtenemos f(2-√5)=-√5/3 y f(2+√5)=√5/3.\n5. En x=1: f(1)=1/3 y f'(1)=2/3. La tangente es y-1/3=(2/3)(x-1), es decir, y=2x/3-1/3.\n6. Para hallar la pendiente de la normal usamos que las pendientes de dos rectas perpendiculares cumplen m·m_n=-1. Sustituimos m=2/3:\n(2/3)·m_n=-1, luego m_n=-1:(2/3)=-3/2.\n7. La normal es y-1/3=(-3/2)(x-1), es decir, y=-3x/2+11/6.\nResultado final: mínimo (2-√5,-√5/3), máximo (2+√5,√5/3), tangente y=2x/3-1/3 y normal y=-3x/2+11/6."
    },
    {
      type: "pau-open",
      text: "2023 - convocatoria de junio - Ejercicio 7.a\nSea la función f(x)=x^3+3x^2+x+3. Obtén sus máximos y mínimos relativos.",
      options: ["Máximo (-1-√6/3, 4+4√6/9) y mínimo (-1+√6/3, 4-4√6/9)", "Mínimo (-1-√6/3, 4+4√6/9) y máximo (-1+√6/3, 4-4√6/9)", "Máximo (-1,4) y mínimo (1,8)", "No tiene extremos relativos"],
      correct: 0,
      solution: "Resolución:\n1. Derivamos: f'(x)=3x²+6x+1.\n2. Resolvemos f'(x)=0:\nx=[-6±√(36-12)]/6=-1±√6/3.\n3. Calculamos la segunda derivada: f''(x)=6x+6.\nEn x=-1-√6/3, f''(x)<0, por lo que hay un máximo.\nEn x=-1+√6/3, f''(x)>0, por lo que hay un mínimo.\n4. Para calcular las ordenadas escribimos u=x+1. Entonces f(x)=u³-2u+4. En los puntos críticos u=±√6/3 y u³=(2/3)u.\n5. Si u=-√6/3, f(x)=4+4√6/9. Si u=√6/3, f(x)=4-4√6/9.\nResultado final: máximo en (-1-√6/3,4+4√6/9) y mínimo en (-1+√6/3,4-4√6/9)."
    },
    {
      type: "pau-open",
      text: "2026 - convocatoria de julio - Pregunta 5.1\nDada la función f(x)=x^3+a·x^2+b·x+c:\na) Halla, razonadamente, los coeficientes a, b y c sabiendo que la función tiene un extremo relativo en el punto (1,4) y que la recta tangente en x=3 es paralela a y=2x-1.\nb) Para los valores obtenidos, determina la ecuación de la recta normal a f(x) en x=0.",
      options: ["a=-11/2, b=8, c=1/2; normal y=-x/8+1/2", "a=11/2, b=-8, c=1/2; normal y=x/8+1/2", "a=-11/2, b=8, c=-1/2; normal y=-8x-1/2", "a=-5, b=7, c=1; normal y=-x/7+1"],
      correct: 0,
      solution: "Resolución:\n1. Como (1,4) pertenece a la gráfica, f(1)=4:\n1+a+b+c=4, luego a+b+c=3.\n2. Al ser un extremo relativo en x=1, f'(1)=0. Como f'(x)=3x²+2ax+b:\n3+2a+b=0, luego 2a+b=-3.\n3. La tangente en x=3 es paralela a y=2x-1, cuya pendiente es 2. Por tanto f'(3)=2:\n27+6a+b=2, luego 6a+b=-25.\n4. Restamos las dos últimas ecuaciones: 4a=-22, de donde a=-11/2.\n5. Sustituimos en 2a+b=-3: -11+b=-3, luego b=8. En a+b+c=3 obtenemos -11/2+8+c=3, luego c=1/2.\n6. En x=0, f(0)=1/2 y f'(0)=b=8. La pendiente de la normal es -1/8.\n7. Ecuación de la normal: y-1/2=(-1/8)(x-0).\nResultado final: a=-11/2, b=8, c=1/2 y la recta normal es y=-x/8+1/2."
    }
  ],
  matesIIPauAplicacionDerivadas: [
    {
      type: "pau-open",
      text: "2000 - convocatoria de junio - Bloque 1 - 1-A\nEl coste de producción de x unidades de un producto viene dado por C=x^2-300x+100 pesetas y el precio de venta de una unidad es U=1000-x pesetas. ¿Cuántas unidades deben vender para que el beneficio sea máximo?",
      options: ["325 unidades", "650 unidades", "300 unidades", "500 unidades"],
      correct: 0,
      solution: "Resolución:\n1. Los ingresos al vender x unidades son el número de unidades por el precio de cada una:\nI(x)=x(1000-x)=1000x-x².\n2. El beneficio es ingresos menos costes:\nB(x)=I(x)-C(x)\n=1000x-x²-(x²-300x+100)\n=-2x²+1300x-100.\n3. Derivamos: B'(x)=-4x+1300.\n4. Igualamos a cero: -4x+1300=0, luego x=325.\n5. Comprobamos que es un máximo: B''(x)=-4<0.\nResultado final: deben vender 325 unidades para que el beneficio sea máximo."
    },
    {
      type: "pau-open",
      text: "2004 - convocatoria de junio - Primer bloque 1º-B\nUn alambre de 100 metros de largo se divide en dos trozos. Con uno de los trozos se forma un cuadrado y con el otro una circunferencia. Hallar la longitud de los trozos para que la suma de las áreas del cuadrado y del círculo sea mínima.",
      options: ["Cuadrado: 400/(π+4) m; circunferencia: 100π/(π+4) m", "Cuadrado: 50 m; circunferencia: 50 m", "Cuadrado: 100π/(π+4) m; circunferencia: 400/(π+4) m", "Cuadrado: 25 m; circunferencia: 75 m"],
      correct: 0,
      solution: "Resolución:\n1. Llamamos x a la longitud destinada al cuadrado. Para la circunferencia quedan 100-x metros.\n2. En el cuadrado, cada lado mide x/4 y su área es A_c=x²/16.\n3. En la circunferencia, 2πr=100-x, por lo que r=(100-x)/(2π). Su área es A_o=πr²=(100-x)²/(4π).\n4. La suma de áreas es A(x)=x²/16+(100-x)²/(4π), con 0≤x≤100.\n5. Derivamos:\nA'(x)=x/8-(100-x)/(2π).\n6. Igualamos a cero:\nx/8=(100-x)/(2π)\n2πx=800-8x\n(2π+8)x=800\nx=400/(π+4).\n7. El otro trozo mide 100-x=100π/(π+4). Además, A''(x)=1/8+1/(2π)>0, luego se trata de un mínimo.\nResultado final: 400/(π+4) m para el cuadrado y 100π/(π+4) m para la circunferencia."
    },
    {
      type: "pau-open",
      text: "2005 - convocatoria de junio - Optimización\nUn cartel debe tener 100 cm^2 de superficie impresa. Los márgenes laterales miden 4 cm cada uno, el margen superior 3 cm y el inferior 2 cm. Hallar las dimensiones de la superficie impresa para que el área total del cartel sea mínima.",
      options: ["Ancho 4√10 cm y alto 5√10/2 cm", "Ancho 5√10/2 cm y alto 4√10 cm", "Ancho 10 cm y alto 10 cm", "Ancho 8 cm y alto 25/2 cm"],
      correct: 0,
      solution: "Resolución:\n1. Llamamos x al ancho de la zona impresa. Como su área es 100 cm², su altura es 100/x.\n2. El cartel completo mide x+8 de ancho y 100/x+5 de alto.\n3. Su área total es:\nA(x)=(x+8)(100/x+5)=140+5x+800/x.\n4. Derivamos: A'(x)=5-800/x².\n5. Igualamos a cero:\n5-800/x²=0\nx²=160\nx=4√10, porque una longitud debe ser positiva.\n6. La altura impresa es 100/(4√10)=5√10/2.\n7. A''(x)=1600/x³>0 para x>0, por lo que el área es mínima.\nResultado final: la superficie impresa debe medir 4√10 cm de ancho y 5√10/2 cm de alto."
    },
    {
      type: "pau-open",
      text: "2024 - convocatoria de junio - Ejercicio 2\nUna cooperativa de aceite quiere diseñar envases con forma de prisma de base cuadrada y volumen 1 dm^3, incluidas las dos bases, de modo que tengan la mínima superficie. Determina los valores de x e y, la superficie de cada envase y su coste si el material cuesta 5 euros por dm^2.",
      options: ["x=1 dm, y=1 dm; superficie 6 dm^2; coste 30 €", "x=2 dm, y=1/4 dm; superficie 10 dm^2; coste 50 €", "x=1/2 dm, y=4 dm; superficie 17/2 dm^2; coste 85/2 €", "x=√2 dm, y=1/2 dm; superficie 5 dm^2; coste 25 €"],
      correct: 0,
      solution: "Resolución:\n1. Si x es el lado de la base cuadrada e y la altura, el volumen es x²y=1. Despejamos y=1/x².\n2. La superficie incluye dos bases y cuatro caras laterales:\nS=2x²+4xy.\n3. Sustituimos y=1/x²:\nS(x)=2x²+4/x, con x>0.\n4. Derivamos: S'(x)=4x-4/x².\n5. Igualamos a cero:\n4x-4/x²=0\nx³=1\nx=1 dm.\n6. Entonces y=1/x²=1 dm. Como S''(x)=4+8/x³ y S''(1)=12>0, la superficie es mínima.\n7. Superficie: S(1)=2+4=6 dm². Coste: 6·5=30 euros.\nResultado final: x=1 dm, y=1 dm, superficie 6 dm² y coste 30 €."
    },
    {
      type: "pau-open",
      text: "2026 - convocatoria de junio - Pregunta 2\nDurante una campaña de promoción de productos de Castilla-La Mancha, el beneficio diario, expresado en cientos de euros, viene dado por B(x)=80x·e^(-0,5x), donde x representa los días transcurridos.\na) Estudia el crecimiento y decrecimiento y determina el día en que el beneficio diario es máximo.\nb) Determina el valor al que tiende el beneficio a largo plazo e interprétalo.",
      options: ["Crece hasta x=2 y decrece después; máximo el día 2; a largo plazo tiende a 0", "Decrece siempre; máximo el día 0; a largo plazo tiende a 80", "Crece hasta x=1 y decrece después; máximo el día 1; a largo plazo tiende a 0", "Crece siempre; no tiene máximo; a largo plazo tiende a +∞"],
      correct: 0,
      solution: "Resolución:\n1. Consideramos x≥0 porque representa tiempo. Derivamos usando la regla del producto:\nB'(x)=80e^(-0,5x)+80x(-0,5)e^(-0,5x)\n=80e^(-0,5x)(1-0,5x).\n2. Como 80e^(-0,5x)>0, el signo de B'(x) depende de 1-0,5x.\n3. B'(x)=0 cuando 1-0,5x=0, es decir, x=2.\n4. Si 0≤x<2, B'(x)>0 y B crece. Si x>2, B'(x)<0 y B decrece. Por tanto el beneficio diario es máximo el día 2.\n5. El valor máximo es B(2)=160e^(-1)=160/e cientos de euros.\n6. A largo plazo, lim x→+∞ de 80x·e^(-0,5x)=0, porque la exponencial decreciente domina al factor x.\nResultado final: crece hasta el día 2, después decrece; el máximo se alcanza el día 2 y a largo plazo el beneficio diario tiende a 0."
    }
  ],
  matesIIPauIntegrales: [
    {
      type: "pau-open",
      text: "2000 - convocatoria de junio - Matemáticas II - Bloque 2 - 2-A\nCalcular\nI = ∫ (x + 1)/(x³ + x² - 6x) dx.",
      options: [
        "I = -(1/6) ln|x| - (2/15) ln|x+3| + (3/10) ln|x-2| + C",
        "I = (1/6) ln|x| - (2/15) ln|x+3| + (3/10) ln|x-2| + C",
        "I = -(1/6) ln|x| + (2/15) ln|x+3| + (3/10) ln|x-2| + C",
        "I = -(1/6) ln|x| - (2/15) ln|x-3| + (3/10) ln|x+2| + C"
      ],
      correct: 0,
      solution: `Resolución:
1. Factorizamos el denominador:
x^3+x^2-6x=x(x^2+x-6)=x(x+3)(x-2).
2. Descomponemos en fracciones simples:
frac{x+1}{x(x+3)(x-2)}=frac{A}{x}+frac{B}{x+3}+frac{C}{x-2}.
Multiplicamos toda la igualdad por x(x+3)(x-2) para eliminar los denominadores:
x+1=A(x+3)(x-2)+Bx(x-2)+Cx(x+3).
3. Calculamos los coeficientes sustituyendo valores que anulan dos de los tres términos.
Para x=0:
0+1=A(0+3)(0-2)+B·0·(0-2)+C·0·(0+3),
1=-6A,
A=-frac{1}{6}.
Para x=-3:
-3+1=A·0·(-5)+B·(-3)·(-5)+C·(-3)·0,
-2=15B,
B=-frac{2}{15}.
Para x=2:
2+1=A·5·0+B·2·0+C·2·5,
3=10C,
C=frac{3}{10}.
4. Sustituimos los coeficientes en la descomposición:
frac{x+1}{x(x+3)(x-2)}=-frac{1}{6}·frac{1}{x}-frac{2}{15}·frac{1}{x+3}+frac{3}{10}·frac{1}{x-2}.
5. Calculamos las tres integrales por separado usando ∫frac{1}{x-a}dx=ln|x-a|+C:
Primera integral:
-frac{1}{6}·∫frac{1}{x}dx=-frac{1}{6}·ln|x|.
Segunda integral:
-frac{2}{15}·∫frac{1}{x+3}dx=-frac{2}{15}·ln|x+3|.
Tercera integral:
frac{3}{10}·∫frac{1}{x-2}dx=frac{3}{10}·ln|x-2|.
6. Sumamos las tres primitivas y añadimos una única constante de integración:
I=-frac{1}{6}·ln|x|-frac{2}{15}·ln|x+3|+frac{3}{10}·ln|x-2|+C.
Comprobación: al derivar la expresión obtenida se recupera frac{x+1}{x^3+x^2-6x}.
Resultado final:
I=-frac{1}{6}·ln|x|-frac{2}{15}·ln|x+3|+frac{3}{10}·ln|x-2|+C.`
    },
    {
      type: "pau-open",
      text: "2000 - convocatoria de junio - Matemáticas II - Bloque 4 - 4-A\nCalcular el área del recinto limitado por las curvas y=x²-1, y=11-x y el eje OX. Dibujar el recinto.",
      options: [
        "A = 116/3",
        "A = 76/3",
        "A = 64/3",
        "A = 32"
      ],
      correct: 0,
      solution: "Resolución:\n1. Buscamos los puntos que delimitan el recinto. La parábola corta al eje OX cuando x²−1=0, es decir, en x=−1 y x=1. La recta corta al eje OX cuando 11−x=0, es decir, en x=11. Para este recinto utilizamos el corte x=1 de la parábola con el eje OX.\n2. Calculamos el corte entre la parábola y la recta:\nx²−1=11−x ⇒ x²+x−12=0 ⇒ (x+4)(x−3)=0.\nLos cortes son x=−4 y x=3. El que delimita este recinto es x=3 y su ordenada es y=8.\n[[area-graph-parabola-line]]\n3. Como se ve en la gráfica, el área azul queda bajo la parábola desde x=1 hasta x=3 y el área verde queda bajo la recta desde x=3 hasta x=11. Por eso dividimos el cálculo en dos integrales:\n[[area-equation-parabola-line]]\n4. Calculamos la primera integral y aplicamos la regla de Barrow:\n[[barrow-equation-parabola]]\n5. Calculamos la segunda integral y aplicamos la regla de Barrow:\n[[barrow-equation-line]]\n6. Sumamos las dos áreas:\nA=frac{20}{3}+32=frac{20}{3}+frac{96}{3}=frac{116}{3}.\nResultado final:\nA=frac{116}{3} unidades cuadradas."
    },
    {
      type: "pau-open",
      text: "PAU - Matemáticas II - Integrales\nCalcular\n∫₀² 3x² dx\ne interpretar geométricamente el resultado.",
      options: ["8", "6", "4", "12"],
      correct: 0,
      solution: "Resolución:\n1. Buscamos una primitiva de 3x²:\n∫3x² dx = x³.\n2. Aplicamos la regla de Barrow:\n∫₀² 3x² dx = [x³]₀² = 2³-0³ = 8.\n3. Como 3x² es positiva en [0,2], el valor coincide con el área bajo la curva.\nResultado final: 8."
    },
    {
      type: "pau-open",
      text: "PAU - Matemáticas II - Integrales racionales\nCalcular\n∫ 1/(x²-1) dx.",
      options: [
        "(1/2) ln|(x-1)/(x+1)| + C",
        "(1/2) ln|(x+1)/(x-1)| + C",
        "ln|x²-1| + C",
        "1/(2x) + C"
      ],
      correct: 0,
      solution: "Resolución:\n1. Factorizamos: x²-1=(x-1)(x+1).\n2. Descomponemos:\n1/[(x-1)(x+1)] = A/(x-1)+B/(x+1).\n3. Entonces 1=A(x+1)+B(x-1).\nCon x=1: 1=2A, luego A=1/2.\nCon x=-1: 1=-2B, luego B=-1/2.\n4. Integramos:\n∫1/(x²-1) dx = (1/2)ln|x-1|-(1/2)ln|x+1|+C.\nResultado final:\n(1/2) ln|(x-1)/(x+1)| + C."
    },
    {
      type: "pau-open",
      text: "PAU - Matemáticas II - Integrales definidas\nCalcular el área limitada por f(x)=x²-4 y el eje OX entre x=-2 y x=2.",
      options: ["32/3", "16/3", "0", "8"],
      correct: 0,
      solution: "Resolución:\n1. En [-2,2], f(x)=x²-4 es menor o igual que 0.\n2. El área geométrica no es ∫(x²-4) dx, sino ∫_{-2}^{2} (4-x²) dx.\n3. Calculamos:\n∫_{-2}^{2} (4-x²) dx = [4x - x³/3]_{-2}^{2}.\n4. En x=2: 8-8/3=16/3.\nEn x=-2: -8+8/3=-16/3.\n5. Restamos: 16/3 - (-16/3)=32/3.\nResultado final: A=32/3."
    }
  ],
  ccssIIPauMatrices: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 1 - A\n1) Despeja la matriz X en la ecuacion: 2·X - B = A·X.\n2) Halla la matriz X de la ecuacion anterior sabiendo que\nA = [[1, 0, 1], [2, 1, 0], [-1, 3, 1]] y B = [[1, -2], [-3, 3], [4, -3]].", solution: "Solucion guiada:\n1. Agrupa los terminos con X: 2X-AX=B.\n2. Factoriza: (2I-A)X=B.\n3. Calcula 2I-A.\n4. Si tiene inversa, X=(2I-A)^(-1)B." },
    { type: "pau-open", text: "2000 - convocatoria de junio - Mates II - Bloque 4 - 4-B\nResolver el sistema de ecuaciones matriciales:\n3X - 2Y = [[7, 3], [16, 4]]\nX + 3Y = [[6, 12], [-2, 27]]", options: ["X = [[3, 3], [4, 6]]\nY = [[1, 3], [-2, 7]]", "X = [[1, 3], [-2, 7]]\nY = [[3, 3], [4, 6]]", "X = [[3, 9], [-6, 21]]\nY = [[1, 3], [-2, 7]]", "X = [[6, 12], [-2, 27]]\nY = [[7, 3], [16, 4]]"], correct: 0, solution: "Resolución paso a paso:\n1. Llamamos A = [[7, 3], [16, 4]] y B = [[6, 12], [-2, 27]].\n2. El sistema queda:\n3X - 2Y = A\nX + 3Y = B\n3. De la segunda ecuación despejamos X:\nX = B - 3Y.\n4. Sustituimos en la primera:\n3(B - 3Y) - 2Y = A.\n5. Desarrollamos:\n3B - 9Y - 2Y = A, luego 3B - 11Y = A.\n6. Despejamos Y:\n11Y = 3B - A, por tanto Y = (3B - A)/11.\n7. Calculamos 3B:\n3B = [[18, 36], [-6, 81]].\n8. Restamos A:\n3B - A = [[18-7, 36-3], [-6-16, 81-4]] = [[11, 33], [-22, 77]].\n9. Dividimos entre 11:\nY = [[1, 3], [-2, 7]].\n10. Ahora usamos X = B - 3Y:\n3Y = [[3, 9], [-6, 21]].\n11. Restamos:\nX = [[6, 12], [-2, 27]] - [[3, 9], [-6, 21]] = [[3, 3], [4, 6]].\nResultado final:\nX = [[3, 3], [4, 6]] e Y = [[1, 3], [-2, 7]]." },
    { type: "pau-open", text: "PAEG 2006 - junio - Castilla-La Mancha - Matrices\nDespeja la matriz X en funcion de A e I2 en una ecuacion matricial con matrices cuadradas de orden dos, y resuelve para la matriz dada.", solution: "Solucion guiada:\n1. Agrupa terminos con X.\n2. Factoriza respetando el orden de multiplicacion.\n3. Usa inversa cuando el determinante no sea cero." },
    { type: "pau-open", text: "PAEG 2005 - septiembre - Castilla-La Mancha\nSe consideran dos matrices A y B, donde m es un numero real. Encuentra los valores de m para los que A·B tiene inversa.", solution: "Solucion guiada:\n1. Usa det(A·B)=det(A)det(B).\n2. A·B tiene inversa si ese producto es distinto de cero.\n3. Excluye los valores de m que anulen algun determinante." }
  ],
  ccssIIPauSistemas: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 1 - B\nEn una fabrica de articulos deportivos se dispone de 10 cajas de diferente tamaño: Grandes, Medianas y Pequeñas para envasar camisetas, con capacidad para 50, 30 y 25 camisetas respectivamente. Si una caja grande fuera mediana, entonces habria el mismo numero de grandes y medianas. En total se envasan 390 camisetas. Determina el numero de cajas que hay de cada clase.", solution: "Solucion guiada:\n1. Sea G, M, P el numero de cajas grandes, medianas y pequeñas.\n2. G+M+P=10.\n3. 50G+30M+25P=390.\n4. Si una grande fuera mediana: G-1=M+1, luego G-M=2.\n5. Resuelve el sistema." },
    { type: "pau-open", text: "PAEG junio 2014 - Sistemas\nUna empresa gasta un total de 1250 euros para que sus 10 empleados realicen un curso de formacion. Hay cuantias de 80, 150 y 200 euros. La cantidad total del grado 1 es igual a la del grado 3. Plantea y resuelve el sistema.", solution: "Solucion guiada:\n1. Define x,y,z empleados en cada grado.\n2. x+y+z=10.\n3. 80x+150y+200z=1250.\n4. 80x=200z.\n5. Resuelve el sistema." },
    { type: "pau-open", text: "PAEG junio 2013 - Sistemas\nPara recaudar dinero para el viaje de fin de curso, unos estudiantes venden camisetas, bufandas y gorras a 10, 5 y 7 euros. Recaudan 2980 euros, venden 380 prendas y el numero de camisetas es el doble del numero de gorras. Plantea y resuelve el sistema.", solution: "Solucion guiada:\n1. Sea c,b,g el numero de camisetas, bufandas y gorras.\n2. c+b+g=380.\n3. 10c+5b+7g=2980.\n4. c=2g.\n5. Resuelve y comprueba." },
    { type: "pau-open", text: "PAEG reserva 1 - 2013 - Sistemas\nTres amigos van a una papeleria. Luis compra 3 cuadernos, 2 carpetas y 4 boligrafos y paga 29 euros. Carmen compra 4 carpetas y 6 boligrafos y paga 38 euros. Pedro compra 5 cuadernos y 3 carpetas y paga 39 euros. Plantea y resuelve el sistema.", solution: "Solucion guiada:\n1. Sea x el precio del cuaderno, y el de carpeta, z el de boligrafo.\n2. Escribe las tres ecuaciones de las compras.\n3. Resuelve por eliminacion o matriz inversa.\n4. Comprueba cada importe." }
  ],
  ccssIIPauProgramacionLineal: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 2 - A\nUna compañia de telefonia movil ofrece 15 centimos por cada SMS y 25 centimos por cada minuto de conversacion. Condiciones: el numero de llamadas de un minuto no puede ser mayor que el numero de mensajes aumentado en 3, ni menor que el numero de mensajes disminuido en 3. Sumando el quintuplo del numero de mensajes con el numero de llamadas no puede obtenerse mas de 27.\n1) Dibuja la region factible. 2) Determina el numero de mensajes y llamadas para que el beneficio sea maximo. 3) ¿Cual es ese beneficio maximo?", solution: "Solucion guiada:\n1. Define x=mensajes, y=llamadas.\n2. Restricciones: y≤x+3, y≥x-3, 5x+y≤27, x≥0, y≥0.\n3. Funcion objetivo: B=15x+25y.\n4. Calcula vertices de la region factible y evalua B." },
    { type: "pau-open", text: "PAEG reserva 1 - 2013 - Programacion lineal\nUna empresa tiene 160 kg de arroz y 60 tarros de azafran. Elabora lotes A con 3 kg de arroz y 2 tarros, que vende a 50 euros; y lotes B con 5 kg de arroz y 1 tarro, que vende a 30 euros. Plantea el problema, dibuja la region factible, determina vertices y calcula la solucion optima.", solution: "Solucion guiada:\n1. Sea x=lotes A, y=lotes B.\n2. Restricciones: 3x+5y≤160, 2x+y≤60, x≥0, y≥0.\n3. Funcion objetivo: F=50x+30y.\n4. Evalua F en los vertices." },
    { type: "pau-open", text: "PAEG junio 2012 - Programacion lineal\nUna empresa tiene 3000 bolsas de ajo y 2000 botellas de aceite. Lotes A: 3 bolsas y 1 botella, precio 50 euros. Lotes B: 1 bolsa y 2 botellas, precio 80 euros. Dibuja la region factible y calcula cuantos lotes de cada tipo debe preparar para obtener la mayor cantidad de dinero.", solution: "Solucion guiada:\n1. Define x=lotes A, y=lotes B.\n2. Restricciones: 3x+y≤3000, x+2y≤2000, x≥0, y≥0.\n3. Funcion objetivo: F=50x+80y.\n4. Calcula vertices y elige el maximo." },
    { type: "pau-open", text: "PAEG septiembre 2012 - Programacion lineal\nQueremos invertir en dos tipos de acciones. A no puede superar 10000 euros, B no puede superar 8000 euros y A+B no puede exceder de 15000 euros. Rentabilidad esperada: A 1%, B 5%. Dibuja la region factible y determina la inversion que maximiza el beneficio.", solution: "Solucion guiada:\n1. Sea x inversion en A, y inversion en B.\n2. Restricciones: x≤10000, y≤8000, x+y≤15000, x≥0, y≥0.\n3. Funcion objetivo: F=0,01x+0,05y.\n4. Evalua en vertices." }
  ],
  ccssIIPauFuncionesContinuidad: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 3 - A\nDada la función\nf(x) = { |x+2| si x≤-1; k si -1<x<1; (x-2)^2 si x≥1 }.\n1) Halla el valor de k para que la gráfica sea continua para x=-1.\n2) Para ese valor de k, dibuja la gráfica.\n3) Calcula el área del recinto limitado por la gráfica de f y el eje de abscisas.", options: ["k=1 y área=17/6", "k=-1 y área=13/6", "k=1 y área=7/3", "k=2 y área=17/6"], correct: 0, solution: "Resolución:\n1. En x=-1, la rama izquierda vale |-1+2|=1. Para que haya continuidad, la rama central debe tener el mismo valor, por tanto k=1.\n2. Los ceros que delimitan el recinto son x=-2 en la primera rama y x=2 en la tercera. Entre ellos la función es no negativa.\n3. Separamos el área por tramos:\nA=∫_{-2}^{-1}(x+2)dx+∫_{-1}^{1}1dx+∫_{1}^{2}(x-2)²dx.\n4. Calculamos:\n∫_{-2}^{-1}(x+2)dx=1/2,\n∫_{-1}^{1}1dx=2,\n∫_{1}^{2}(x-2)²dx=1/3.\n5. Sumamos: A=1/2+2+1/3=17/6.\nResultado final: k=1 y el área es 17/6 unidades cuadradas." },
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 3 - B\nEl rendimiento R, en porcentaje, de un estudiante en una hora de examen viene dado por R(t)=300t(1-t), siendo 0≤t≤1.\n1) Representa gráficamente R(t).\n2) Indica cuándo aumenta y disminuye el rendimiento y cuándo se hace cero.\n3) ¿Cuándo es máximo el rendimiento y cuál es?", options: ["Aumenta en (0,1/2), disminuye en (1/2,1); máximo R(1/2)=75", "Aumenta en (0,1), no disminuye; máximo R(1)=300", "Disminuye en (0,1/2), aumenta en (1/2,1); mínimo R(1/2)=75", "Aumenta en (0,1/3), disminuye en (1/3,1); máximo 100"], correct: 0, solution: "Resolución:\n1. Desarrollamos: R(t)=300t-300t². Es una parábola abierta hacia abajo.\n2. Sus ceros son 300t(1-t)=0, es decir, t=0 y t=1.\n3. Derivamos: R'(t)=300-600t.\n4. R'(t)=0 cuando t=1/2. Si 0<t<1/2, R'(t)>0 y el rendimiento aumenta. Si 1/2<t<1, R'(t)<0 y disminuye.\n5. Calculamos el máximo: R(1/2)=300·(1/2)·(1/2)=75.\nResultado final: aumenta hasta t=1/2, disminuye después y su máximo es 75% en t=1/2 hora." },
    { type: "pau-open", text: "2018 - convocatoria de julio - Propuesta B - Ejercicio 3\nSe considera la función\nf(x) = { |x|+5t si x≤0; (x+t)^2-10x si x>0 }.\na) ¿Para qué valores de t es continua en x=0?\nb) Para t=2, calcula los extremos relativos en (0,+∞).\nc) Para t=2, calcula los intervalos de crecimiento y decrecimiento en (0,+∞).", options: ["Continua para t=0 o t=5; con t=2 tiene mínimo en (3,-5), decrece en (0,3) y crece en (3,+∞)", "Continua solo para t=2; tiene máximo en (3,5), crece en (0,3) y decrece después", "Continua para todo t; con t=2 no tiene extremos", "Continua para t=-5; tiene mínimo en (2,-4)"], correct: 0, solution: "Resolución:\n1. En x=0, la rama izquierda vale f(0)=5t. El límite por la derecha vale t². Para continuidad exigimos t²=5t.\n2. Resolvemos t(t-5)=0: t=0 o t=5.\n3. Para t=2 y x>0:\nf(x)=(x+2)²-10x=x²-6x+4.\n4. Derivamos: f'(x)=2x-6. Se anula en x=3.\n5. Si 0<x<3, f'(x)<0 y la función decrece. Si x>3, f'(x)>0 y crece. Por tanto hay un mínimo en x=3.\n6. f(3)=9-18+4=-5.\nResultado final: continuidad para t=0 o t=5; para t=2, mínimo (3,-5), decrece en (0,3) y crece en (3,+∞)." },
    { type: "pau-open", text: "2020 - Matemáticas aplicadas a las CCSS II - Bloque 2 - Ejercicio 3\nSe considera la función\nf(x) = { x+t si x≤-1; x^3-2x^2+4 si x>-1 }.\na) ¿Para qué valor de t es continua en x=-1?\nb) Calcula los extremos relativos en (-1,+∞).\nc) Calcula los intervalos de crecimiento y decrecimiento en (-1,+∞).", options: ["t=2; máximo (0,4), mínimo (4/3,76/27); crece en (-1,0)∪(4/3,+∞) y decrece en (0,4/3)", "t=-2; mínimo (0,4), máximo (4/3,76/27); decrece en (-1,0)∪(4/3,+∞)", "t=1; único mínimo (0,4); crece en todo el intervalo", "t=2; no tiene extremos relativos"], correct: 0, solution: "Resolución:\n1. En x=-1, la rama izquierda vale -1+t. El límite por la derecha es (-1)³-2(-1)²+4=1.\n2. Para continuidad: -1+t=1, luego t=2.\n3. En x>-1 derivamos f(x)=x³-2x²+4:\nf'(x)=3x²-4x=x(3x-4).\n4. Los puntos críticos son x=0 y x=4/3.\n5. Estudiamos el signo: f'>0 en (-1,0), f'<0 en (0,4/3) y f'>0 en (4/3,+∞).\n6. Por tanto hay un máximo en x=0, con f(0)=4, y un mínimo en x=4/3.\n7. f(4/3)=64/27-32/9+4=76/27.\nResultado final: t=2; máximo (0,4), mínimo (4/3,76/27); crece en (-1,0)∪(4/3,+∞) y decrece en (0,4/3)." }
  ],
  ccssIIPauProbabilidad: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 2 - B\nUna caja contiene tres monedas. Una moneda es normal, otra tiene dos caras y la tercera esta trucada de forma que la probabilidad de obtener cara es 1/3. Las tres monedas tienen igual probabilidad de ser elegidas.\n1) Se elige al azar una moneda y se lanza al aire, ¿cual es la probabilidad de que salga cara?\n2) Si lanzamos la moneda trucada dos veces, ¿cual es la probabilidad de que salga una cara y una cruz?", solution: "Solucion guiada:\n1. Usa probabilidad total para la primera pregunta.\n2. P(cara)=1/3·1/2+1/3·1+1/3·1/3.\n3. Para la moneda trucada dos lanzamientos: cara-cruz o cruz-cara.\n4. P=2·(1/3)·(2/3)." },
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 4 - A\nEntre la poblacion de una determinada region se estima que el 55% presenta obesidad, el 20% padece hipertension y el 15% tiene obesidad y es hipertenso.\n1) Calcula la probabilidad de ser hipertenso o tener obesidad.\n2) Calcula la probabilidad de tener obesidad condicionada a ser hipertenso.", solution: "Solucion guiada:\n1. P(O∪H)=P(O)+P(H)-P(O∩H).\n2. Sustituye: 0,55+0,20-0,15.\n3. P(O|H)=P(O∩H)/P(H)=0,15/0,20." },
    { type: "pau-open", text: "PAEG junio 2014 - Probabilidad\nEn una poblacion, el 40% ve habitualmente la television, el 10% lee habitualmente y el 1% ve la television y lee habitualmente. Calcula la probabilidad de que vea television o lea, y la probabilidad de que lea sabiendo que ve television.", solution: "Solucion guiada:\n1. Usa P(T∪L)=P(T)+P(L)-P(T∩L).\n2. Usa P(L|T)=P(L∩T)/P(T)." },
    { type: "pau-open", text: "PAEG junio 2014 - Probabilidad total y Bayes\nEn una empresa hay robots A, B y C que sueldan el 15%, 20% y 65% de los productos. Las probabilidades de defecto son 0,02, 0,03 y 0,01. Calcula la probabilidad de defecto y, si hay defecto, la probabilidad de que lo haya soldado A.", solution: "Solucion guiada:\n1. P(D)=P(A)P(D|A)+P(B)P(D|B)+P(C)P(D|C).\n2. Para Bayes: P(A|D)=P(A)P(D|A)/P(D)." }
  ],
  ccssIIPauMuestreoInferencia: [
    { type: "pau-open", text: "2008 - convocatoria de junio - CCSS II - Bloque 4 - B\nPara efectuar un control de calidad sobre la duracion en horas de un modelo de juguetes electronicos se elige una muestra aleatoria de 36 juguetes de ese modelo, obteniendose una duracion media de 97 horas. Sabiendo que la duracion se distribuye normalmente con desviacion tipica de 10 horas:\n1) Encontrar el intervalo de confianza al 99,2% para la duracion media.\n2) Interpretar el significado del intervalo obtenido.", solution: "Solucion guiada:\n1. Con σ conocida: IC=xbarra Â± z·σ/sqrt(n).\n2. xbarra=97, σ=10, n=36.\n3. Busca z para confianza 99,2%.\n4. Sustituye y expresa el intervalo.\n5. Interpreta: el procedimiento captura la media poblacional con ese nivel de confianza." },
    { type: "pau-open", text: "PAEG junio 2014 - Muestreo e inferencia\nUna empresa produce dispositivos electronicos con pantalla HD. La resolucion sigue una normal de media desconocida y desviacion tipica σ=20 pixeles. Se toma una muestra de 100 dispositivos y se obtiene el intervalo de confianza (1076,08 , 1083,92). Calcula la media muestral y el nivel de confianza.", solution: "Solucion guiada:\n1. La media muestral es el centro del intervalo.\n2. El error es la semiamplitud.\n3. Usa E=z·σ/sqrt(n) para despejar z.\n4. Con z obtienes el nivel de confianza." },
    { type: "pau-open", text: "PAEG junio 2014 - Muestreo e inferencia\nEn un aeropuerto, el tiempo de espera hasta que sale la maleta sigue una normal de media desconocida y desviacion tipica σ=3 minutos. Se toma una muestra de 50 viajeros con media 17 minutos. Halla un intervalo de confianza para la media poblacional al 95%.", solution: "Solucion guiada:\n1. IC=xbarra Â± z·σ/sqrt(n).\n2. Para 95%, z=1,96.\n3. Sustituye xbarra=17, σ=3, n=50." },
    { type: "pau-open", text: "PAEG septiembre 2014 - Muestreo e inferencia\nEl tiempo medio que tarda una empresa de mensajeria en recoger un paquete sigue una normal de media desconocida y desviacion tipica σ=10 minutos. Se toman 10 encargos con tiempos 15,19,20,22,24,25,27,28,30,32. Halla un intervalo de confianza al 95% y el tamaño minimo para error menor que 1 minuto.", solution: "Solucion guiada:\n1. Calcula la media muestral de los 10 datos.\n2. IC=xbarra Â± 1,96·σ/sqrt(n).\n3. Para el tamaño minimo: E=zσ/sqrt(n)<1.\n4. Despeja n>(zσ/E)^2." }
  ],
  ccssIIMatrices: [
    { text: "(PAU modelo) Sean A=[[1,2],[0,1]] y B=[[3,0],[1,-1]]. Calcula 2A-B.", options: ["[[-1,4],[-1,3]]", "[[5,4],[1,1]]", "[[1,4],[1,1]]", "[[-1,2],[-1,1]]"], correct: 0, solution: "Solucion:\n1. Calculamos 2A=[[2,4],[0,2]].\n2. Restamos B elemento a elemento: [[2-3,4-0],[0-1,2-(-1)]].\nResultado final: [[-1,4],[-1,3]]." },
    { text: "(PAU modelo) Si A=[[1,2],[3,4]], calcula A^2.", options: ["[[7,10],[15,22]]", "[[1,4],[9,16]]", "[[5,11],[11,25]]", "[[4,6],[6,8]]"], correct: 0, solution: "Solucion:\n1. A^2=A·A.\n2. Primera fila: 1·1+2·3=7 y 1·2+2·4=10.\n3. Segunda fila: 3·1+4·3=15 y 3·2+4·4=22.\nResultado final: [[7,10],[15,22]]." },
    { text: "(PAU modelo) Resuelve la ecuacion matricial X+A=B, con A=[[2,1],[0,3]] y B=[[5,4],[2,1]].", options: ["X=[[3,3],[2,-2]]", "X=[[7,5],[2,4]]", "X=[[3,5],[2,4]]", "X=[[-3,-3],[-2,2]]"], correct: 0, solution: "Solucion:\n1. Despejamos X=B-A.\n2. Restamos elemento a elemento.\nResultado final: X=[[3,3],[2,-2]]." },
    { text: "(PAU modelo) Sean A=[[1,0],[2,1]] y B=[[2,1],[0,3]]. Calcula A·B.", options: ["[[2,1],[4,5]]", "[[2,1],[2,4]]", "[[1,3],[4,3]]", "[[2,0],[4,3]]"], correct: 0, solution: "Solucion:\n1. Multiplicamos filas por columnas.\n2. Primera fila: [1,0]·columnas de B da 2 y 1.\n3. Segunda fila: [2,1]·columnas de B da 4 y 5.\nResultado final: [[2,1],[4,5]]." },
    { text: "(PAU modelo) Calcula la matriz inversa de A=[[1,2],[3,5]].", options: ["[[-5,2],[3,-1]]", "[[5,-2],[-3,1]]", "[[-5,3],[2,-1]]", "No tiene inversa"], correct: 0, solution: "Solucion:\n1. det(A)=1·5-2·3=-1.\n2. A^-1=(1/det(A))[[5,-2],[-3,1]].\n3. Multiplicamos por -1.\nResultado final: [[-5,2],[3,-1]]." },
    { text: "(PAU modelo) Si A=[[1,m],[0,2]], ¿para que valores de m tiene inversa?", options: ["Para todo m real", "Solo m=0", "Para m≠0", "Para m≠2"], correct: 0, solution: "Solucion:\n1. Una matriz cuadrada tiene inversa si det(A)≠0.\n2. det(A)=1·2-0·m=2.\n3. Como 2≠0, no depende de m.\nResultado final: para todo m real." },
    { text: "(PAU modelo) En un problema de costes, la matriz P=[[3,5],[2,4]] recoge productos por lote y C=[[10],[6]] costes unitarios. Calcula P·C.", options: ["[[60],[44]]", "[[40],[32]]", "[[13],[8]]", "[[80],[56]]"], correct: 0, solution: "Solucion:\n1. Producto fila por columna.\n2. Primer lote: 3·10+5·6=60.\n3. Segundo lote: 2·10+4·6=44.\nResultado final: [[60],[44]]." },
    { text: "(PAU modelo) Dada A=[[2,1],[1,1]], calcula X si A·X=[[5],[3]].", options: ["X=[[2],[1]]", "X=[[1],[2]]", "X=[[3],[5]]", "X=[[-2],[7]]"], correct: 0, solution: "Solucion:\n1. Si X=[[x],[y]], el sistema es 2x+y=5, x+y=3.\n2. Restamos ecuaciones: x=2.\n3. Sustituimos: y=1.\nResultado final: X=[[2],[1]]." }
  ],
  ccssIIDeterminantes: [
    { text: "(PAU modelo) Calcula det [[2,1],[3,4]].", options: ["5", "11", "-5", "8"], correct: 0, solution: "Solucion:\n1. En 2x2: det=ad-bc.\n2. det=2·4-1·3=8-3.\nResultado final: 5." },
    { text: "(PAU modelo) Calcula det [[1,2,0],[0,1,3],[2,0,1]].", options: ["13", "7", "-13", "0"], correct: 0, solution: "Solucion:\n1. Desarrollamos por la primera fila.\n2. 1·(1·1-3·0)-2·(0·1-3·2)+0=1-2·(-6).\nResultado final: 13." },
    { text: "(PAU modelo) Si det(A)=3 para una matriz 2x2, calcula det(2A).", options: ["12", "6", "3", "24"], correct: 0, solution: "Solucion:\n1. Si A es de orden 2, det(kA)=k^2 det(A).\n2. det(2A)=2^2·3=12.\nResultado final: 12." },
    { text: "(PAU modelo) Para A=[[1,a],[2,4]], ¿para que valor de a no tiene inversa?", options: ["a=2", "a=4", "a=1", "a=-2"], correct: 0, solution: "Solucion:\n1. No tiene inversa si det(A)=0.\n2. det(A)=1·4-a·2=4-2a.\n3. 4-2a=0 da a=2.\nResultado final: a=2." },
    { text: "(PAU modelo) Si una matriz tiene dos filas proporcionales, su determinante es...", options: ["0", "1", "-1", "El producto de la diagonal"], correct: 0, solution: "Solucion:\n1. Dos filas proporcionales implican dependencia lineal.\n2. Con filas dependientes, el determinante se anula.\nResultado final: 0." },
    { text: "(PAU modelo) Calcula det [[3,0,0],[1,2,0],[4,-1,5]].", options: ["30", "10", "0", "-30"], correct: 0, solution: "Solucion:\n1. Es triangular inferior.\n2. El determinante es el producto de la diagonal.\nResultado final: 3·2·5=30." },
    { text: "(PAU modelo) Si det(A)=2 y det(B)=-3, calcula det(A·B).", options: ["-6", "6", "-1", "5"], correct: 0, solution: "Solucion:\n1. Usamos det(A·B)=det(A)·det(B).\n2. 2·(-3)=-6.\nResultado final: -6." },
    { text: "(PAU modelo) Calcula det [[1,2],[2,4]].", options: ["0", "8", "-2", "4"], correct: 0, solution: "Solucion:\n1. La segunda fila es el doble de la primera.\n2. Filas proporcionales dan determinante cero.\nResultado final: 0." }
  ],
  ccssIISistemas: [
    { text: "(PAU modelo) Resuelve por Cramer: x+y=5, 2x-y=1.", options: ["x=2, y=3", "x=3, y=2", "x=1, y=4", "x=5, y=0"], correct: 0, solution: "Solucion:\n1. Sumamos las ecuaciones: 3x=6.\n2. x=2.\n3. Sustituimos en x+y=5: y=3.\nResultado final: x=2, y=3." },
    { text: "(PAU modelo) El sistema x+y+z=6, x-y=0, z=2 tiene solucion...", options: ["x=2, y=2, z=2", "x=1, y=3, z=2", "x=3, y=3, z=0", "x=0, y=0, z=6"], correct: 0, solution: "Solucion:\n1. De z=2.\n2. x+y+2=6, luego x+y=4.\n3. x-y=0 implica x=y.\nResultado final: x=2, y=2, z=2." },
    { text: "(PAU modelo) En una tienda se venden camisetas a 10 €, bufandas a 5 € y gorras a 7 €. Si se venden 380 prendas, se recaudan 2980 € y camisetas=2·gorras, ¿cuántas camisetas hay?", options: ["180", "160", "140", "200"], correct: 0, solution: "Solucion:\n1. Sea c,b,g. c+b+g=380, 10c+5b+7g=2980, c=2g.\n2. Sustituimos c=2g: b=380-3g.\n3. 20g+5(380-3g)+7g=2980, 12g=1080, g=90.\n4. Entonces c=2g=180.\nResultado final: 180 camisetas." },
    { text: "(PAU modelo) Resuelve 2x+y=7, x+3y=11.", options: ["x=2, y=3", "x=3, y=1", "x=1, y=5", "x=4, y=-1"], correct: 0, solution: "Solucion:\n1. De 2x+y=7 sale y=7-2x.\n2. Sustituimos: x+3(7-2x)=11.\n3. x+21-6x=11, -5x=-10, x=2.\n4. y=3.\nResultado final: x=2, y=3." },
    { text: "(PAU modelo) Si el determinante de la matriz de coeficientes de un sistema 3x3 es distinto de cero, el sistema es...", options: ["Compatible determinado", "Compatible indeterminado", "Incompatible", "Sin ecuaciones"], correct: 0, solution: "Solucion:\n1. det(A)≠0 implica que A tiene inversa.\n2. Entonces existe una unica solucion.\nResultado final: compatible determinado." },
    { text: "(PAU modelo) Resuelve x+y=8, y+z=7, x+z=9.", options: ["x=5, y=3, z=4", "x=4, y=5, z=3", "x=3, y=4, z=5", "x=6, y=2, z=5"], correct: 0, solution: "Solucion:\n1. Sumamos las tres ecuaciones: 2x+2y+2z=24, luego x+y+z=12.\n2. Restando x+y=8 queda z=4.\n3. Restando y+z=7 queda x=5.\n4. Restando x+z=9 queda y=3.\nResultado final: (5,3,4)." },
    { text: "(PAU modelo) Una empresa tiene 24 empleados en A, C y T. A=C+T y C=3T. ¿Cuántos hay en Toledo?", options: ["3", "6", "9", "12"], correct: 0, solution: "Solucion:\n1. Sea T=t, C=3t y A=C+T=4t.\n2. Total: 4t+3t+t=8t=24.\nResultado final: t=3 empleados en Toledo." },
    { text: "(PAU modelo) Si un sistema tiene dos ecuaciones proporcionales y una contradictoria con ellas, es...", options: ["Incompatible", "Compatible determinado", "Compatible indeterminado", "Lineal homogeneo"], correct: 0, solution: "Solucion:\n1. Ecuaciones proporcionales dan la misma restriccion.\n2. Si otra ecuacion contradice esa restriccion, no hay punto comun.\nResultado final: sistema incompatible." }
  ],
  ccssIIProgramacionLineal: [
    { text: "(PAU modelo) Maximiza F=50x+30y con 3x+5y≤160, 2x+y≤60, x≥0, y≥0. La solucion optima es...", options: ["(20,20), F=1600", "(0,32), F=960", "(30,0), F=1500", "(0,0), F=0"], correct: 0, solution: "Solucion:\n1. Vértices: (0,0), (30,0), (0,32) y corte de 3x+5y=160 con 2x+y=60.\n2. Del corte: y=60-2x; 3x+5(60-2x)=160, x=20, y=20.\n3. Evaluamos F: 1600, que es máximo.\nResultado final: (20,20)." },
    { text: "(PAU modelo) En programacion lineal, la solucion optima de una funcion lineal sobre una region factible acotada se busca en...", options: ["Los vertices", "El centro siempre", "Cualquier punto interior", "Solo el eje X"], correct: 0, solution: "Solucion:\n1. Una funcion lineal alcanza maximo o minimo en algun vertice de la region factible.\nResultado final: se evaluan los vertices." },
    { text: "(PAU modelo) La restriccion x+y≤15 representa...", options: ["El semiplano por debajo de la recta x+y=15", "La recta x+y=15 solamente", "El semiplano x<0", "Una parabola"], correct: 0, solution: "Solucion:\n1. La igualdad x+y=15 es la frontera.\n2. El signo ≤ indica el lado que contiene puntos como (0,0).\nResultado final: semiplano por debajo de la recta." },
    { text: "(PAU modelo) Si en un problema se exige preparar lotes A y B, con x≥0 e y≥0, eso significa...", options: ["No se pueden preparar cantidades negativas", "Ambas cantidades son siempre cero", "x debe ser menor que y", "Solo se permite x=0"], correct: 0, solution: "Solucion:\n1. Las variables representan cantidades de lotes.\n2. Una cantidad negativa no tiene sentido en el contexto.\nResultado final: x e y deben ser no negativas." },
    { text: "(PAU modelo) Maximiza F=x+2y en el triangulo de vertices (0,0), (4,0), (0,3).", options: ["(0,3), F=6", "(4,0), F=4", "(0,0), F=0", "(4,3), F=10"], correct: 0, solution: "Solucion:\n1. Evaluamos en vertices.\n2. F(0,0)=0, F(4,0)=4, F(0,3)=6.\nResultado final: maximo en (0,3)." },
    { text: "(PAU modelo) Minimiza F=2x+y en los vertices (1,1), (4,1), (2,5).", options: ["(1,1), F=3", "(4,1), F=9", "(2,5), F=9", "(0,0), F=0"], correct: 0, solution: "Solucion:\n1. Evaluamos solo vertices factibles.\n2. F(1,1)=3, F(4,1)=9, F(2,5)=9.\nResultado final: minimo en (1,1)." },
    { text: "(PAU modelo) La region x≥0, y≥0, x≤10, y≤8, x+y≤15 es...", options: ["Acotada", "No acotada", "Vacia", "Una recta"], correct: 0, solution: "Solucion:\n1. Las restricciones x≤10, y≤8 y x+y≤15 cierran la region junto a los ejes.\nResultado final: region acotada." },
    { text: "(PAU modelo) Una inversion A no puede superar 10000 €, B no puede superar 8000 € y A+B≤15000. Si se maximiza 0,01A+0,05B, conviene...", options: ["A=7000, B=8000", "A=10000, B=0", "A=0, B=0", "A=15000, B=8000"], correct: 0, solution: "Solucion:\n1. B da mas rentabilidad, por eso se toma su maximo: B=8000.\n2. Quedan 7000 hasta el limite A+B≤15000.\nResultado final: A=7000, B=8000." }
  ],
  ccssIILimitesContinuidad: [
    { text: "(PAU modelo) Calcula lim x->2 (x^2-4)/(x-2).", options: ["4", "0", "2", "No existe"], correct: 0, solution: "Solución:\n1. Al sustituir x=2 aparece 0/0.\n2. Aplicamos la regla de L'Hôpital y derivamos por separado: (x²-4)'=2x y (x-2)'=1.\n3. El límite queda lim x→2 de 2x.\n4. Sustituimos x=2.\nResultado final: 4." },
    { text: "(PAU modelo) Para que f(x)={x+1 si x<2; t si x≥2} sea continua en x=2, t debe valer...", options: ["3", "2", "1", "0"], correct: 0, solution: "Solucion:\n1. Limite por la izquierda: 2+1=3.\n2. Valor por la derecha y f(2) es t.\n3. Para continuidad: t=3.\nResultado final: t=3." },
    { text: "(PAU modelo) lim x->∞ (3x^2-1)/(x^2+5) vale...", options: ["3", "0", "∞", "-1/5"], correct: 0, solution: "Solución:\n1. Numerador y denominador tienden a +∞, por lo que aparece ∞/∞.\n2. Aplicamos la regla de L'Hôpital: (3x²-1)'=6x y (x²+5)'=2x.\n3. El límite queda lim x→∞ de 6x/(2x)=3.\nResultado final: 3." },
    { text: "(PAU modelo) La recta x=1 es asintota vertical de f(x)=1/(x-1) porque...", options: ["El denominador se anula en x=1", "f(1)=1", "La funcion es polinomica", "El limite vale 0"], correct: 0, solution: "Solucion:\n1. En x=1 el denominador vale 0.\n2. Al acercarnos a 1, la funcion se hace infinita.\nResultado final: x=1 es asintota vertical." },
    { text: "(PAU modelo) Calcula lim x->0 sen(x)/x.", options: ["1", "0", "∞", "No existe"], correct: 0, solution: "Solución:\n1. Al sustituir x=0 aparece 0/0.\n2. Aplicamos la regla de L'Hôpital: (sen x)'=cos x y (x)'=1.\n3. El límite queda lim x→0 de cos(x).\n4. Sustituimos x=0: cos(0)=1.\nResultado final: 1." },
    { text: "(PAU modelo) Si lim x->a- f(x)=4 y lim x->a+ f(x)=4, pero f(a)=1, entonces f en a es...", options: ["Discontinua evitable", "Continua", "Discontinua de salto", "No definida en ningun punto"], correct: 0, solution: "Solucion:\n1. El limite existe y vale 4.\n2. Pero no coincide con f(a), que vale 1.\nResultado final: discontinuidad evitable." },
    { text: "(PAU modelo) lim x->∞ (5x-3)/(2x+1) vale...", options: ["5/2", "5", "0", "2/5"], correct: 0, solution: "Solución:\n1. Numerador y denominador tienden a +∞, por lo que aparece ∞/∞.\n2. Aplicamos la regla de L'Hôpital: (5x-3)'=5 y (2x+1)'=2.\n3. El nuevo cociente es constante.\nResultado final: 5/2." },
    { text: "(PAU modelo) Para que f sea continua en x=a debe cumplirse...", options: ["lim x->a- f(x)=f(a)=lim x->a+ f(x)", "f'(a)=0", "f(a)=0 siempre", "Los limites laterales sean opuestos"], correct: 0, solution: "Solucion:\n1. La continuidad exige que coincidan limite por la izquierda, valor de la funcion y limite por la derecha.\nResultado final: lim x->a- f(x)=f(a)=lim x->a+ f(x)." }
  ],
  ccssIIDerivadas: [
    { text: "(PAU modelo) Deriva f(x)=x^3-3x^2+2.", options: ["f'(x)=3x^2-6x", "f'(x)=x^2-6x", "f'(x)=3x^2-3x", "f'(x)=3x^3-6x"], correct: 0, solution: "Solucion:\n1. Derivamos termino a termino.\n2. (x^3)'=3x^2, (-3x^2)'=-6x y la constante deriva 0.\nResultado final: f'(x)=3x^2-6x." },
    { text: "(PAU modelo) La pendiente de la tangente a f(x)=x^2+1 en x=2 es...", options: ["4", "5", "2", "0"], correct: 0, solution: "Solucion:\n1. La pendiente es f'(2).\n2. f'(x)=2x.\n3. f'(2)=4.\nResultado final: 4." },
    { text: "(PAU modelo) Si f'(x)=3x^2-6x, los puntos criticos son...", options: ["x=0 y x=2", "x=1 y x=2", "x=-2 y x=0", "x=3"], correct: 0, solution: "Solucion:\n1. Igualamos f'(x)=0.\n2. 3x^2-6x=3x(x-2)=0.\nResultado final: x=0 y x=2." },
    { text: "(PAU modelo) Deriva f(x)=ln(x)+e^x.", options: ["1/x+e^x", "ln(x)+e^x", "x+e^x", "1/x+xe^(x-1)"], correct: 0, solution: "Solucion:\n1. (ln x)'=1/x.\n2. (e^x)'=e^x.\nResultado final: f'(x)=1/x+e^x." },
    { text: "(PAU modelo) Deriva f(x)=(x^2+1)^4.", options: ["8x(x^2+1)^3", "4(x^2+1)^3", "2x(x^2+1)^4", "x^8+1"], correct: 0, solution: "Solucion:\n1. Regla de la cadena: si u=x^2+1, f=u^4.\n2. f'=4u^3·u' y u'=2x.\nResultado final: 8x(x^2+1)^3." },
    { text: "(PAU modelo) Si f'(x)>0 en (1,∞), la funcion en ese intervalo es...", options: ["Creciente", "Decreciente", "Constante", "Discontinua"], correct: 0, solution: "Solucion:\n1. Derivada positiva indica pendiente positiva.\nResultado final: la funcion es creciente." },
    { text: "(PAU modelo) Para f(x)=x^3-3x, f''(x) es...", options: ["6x", "3x^2-3", "6", "x^2-3"], correct: 0, solution: "Solucion:\n1. f'(x)=3x^2-3.\n2. Derivamos otra vez: f''(x)=6x.\nResultado final: 6x." },
    { text: "(PAU modelo) Recta tangente a f(x)=x^2 en x=1.", options: ["y=2x-1", "y=x+1", "y=2x+1", "y=x-1"], correct: 0, solution: "Solucion:\n1. Punto: f(1)=1.\n2. Pendiente: f'(x)=2x, f'(1)=2.\n3. y-1=2(x-1).\nResultado final: y=2x-1." }
  ],
  ccssIIIntegralesIndefinidas: [
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (3x² - 4x + 1) dx.", options: ["x³ - 2x² + x + C", "x³ - 4x² + x + C", "6x - 4 + C", "x³ - 2x² + C"], correct: 0, solution: "Resolución:\n1. Integramos término a término.\n2. ∫3x² dx = x³.\n3. ∫(-4x) dx = -2x².\n4. ∫1 dx = x.\nResultado final:\n∫(3x²-4x+1)dx = x³ - 2x² + x + C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (2x + 5)/(x² + 5x + 1) dx.", options: ["ln|x²+5x+1| + C", "2ln|x²+5x+1| + C", "(x²+5x+1)² + C", "ln|2x+5| + C"], correct: 0, solution: "Resolución:\n1. Observamos que el denominador es x²+5x+1.\n2. Su derivada es 2x+5, que coincide con el numerador.\n3. Usamos la regla ∫u'/u dx = ln|u| + C.\nResultado final:\nln|x²+5x+1| + C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ x·e^(x²) dx.", options: ["(1/2)e^(x²)+C", "2e^(x²)+C", "x²e^(x²)+C", "e^x²+C"], correct: 0, solution: "Resolución:\n1. Tomamos u=x², entonces du=2x dx.\n2. En la integral aparece x dx, por tanto x dx = du/2.\n3. ∫x·e^(x²)dx = (1/2)∫e^u du.\nResultado final:\n(1/2)e^(x²)+C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ 1/(x+3) dx.", options: ["ln|x+3| + C", "1/(x+3)² + C", "-1/(x+3)² + C", "ln|x|+3 + C"], correct: 0, solution: "Resolución:\n1. Es una integral inmediata de tipo ∫1/u du.\n2. Si u=x+3, entonces u'=1.\nResultado final:\n∫1/(x+3)dx = ln|x+3| + C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (6x²)/(x³+1) dx.", options: ["2ln|x³+1|+C", "ln|x³+1|+C", "6ln|x³+1|+C", "2/(x³+1)+C"], correct: 0, solution: "Resolución:\n1. El denominador es u=x³+1.\n2. Su derivada es u'=3x².\n3. El numerador 6x² es 2·3x², por tanto queda 2∫u'/u dx.\nResultado final:\n2ln|x³+1|+C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (4x - 2)³ dx.", options: ["(4x-2)^4/16 + C", "(4x-2)^4/4 + C", "3(4x-2)² + C", "(4x-2)^4 + C"], correct: 0, solution: "Resolución:\n1. Tomamos u=4x-2, entonces du=4dx.\n2. dx=du/4.\n3. ∫(4x-2)³dx = (1/4)∫u³du = (1/4)·u⁴/4.\nResultado final:\n(4x-2)^4/16 + C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (1/√x) dx.", options: ["2√x + C", "√x + C", "1/(2√x)+C", "ln|x|+C"], correct: 0, solution: "Resolución:\n1. Escribimos 1/√x como x^(-1/2).\n2. Aplicamos la regla de la potencia:\n∫x^n dx = x^(n+1)/(n+1), si n≠-1.\n3. n+1=1/2.\nResultado final:\n2√x+C." },
    { text: "PAU - CCSS II - Integrales indefinidas\nCalcular\n∫ (e^x + 2x) dx.", options: ["e^x + x² + C", "e^x + 2 + C", "xe^x + x² + C", "e^x + 2x² + C"], correct: 0, solution: "Resolución:\n1. Integramos por separado.\n2. ∫e^x dx = e^x.\n3. ∫2x dx = x².\nResultado final:\ne^x+x²+C." }
  ],
  ccssIIIntegralesDefinidas: [
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₀² 3x² dx.", options: ["8", "6", "4", "12"], correct: 0, solution: "Resolución:\n1. Una primitiva de 3x² es x³.\n2. Aplicamos Barrow:\n∫₀²3x²dx = [x³]₀² = 2³-0³.\nResultado final: 8." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₁³ 2x dx.", options: ["8", "4", "6", "10"], correct: 0, solution: "Resolución:\n1. Una primitiva de 2x es x².\n2. Evaluamos entre 1 y 3:\n[x²]₁³ = 3²-1² = 9-1.\nResultado final: 8." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular el área limitada por f(x)=x y el eje OX entre x=0 y x=4.", options: ["8", "4", "16", "2"], correct: 0, solution: "Resolución:\n1. Como f(x)=x es positiva en [0,4], el área coincide con la integral.\n2. A=∫₀⁴ x dx.\n3. Una primitiva es x²/2.\n4. A=[x²/2]₀⁴=16/2-0=8.\nResultado final: A=8." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₀¹ (x+1) dx.", options: ["3/2", "1", "2", "1/2"], correct: 0, solution: "Resolución:\n1. Una primitiva de x+1 es x²/2+x.\n2. Evaluamos en 1: 1/2+1=3/2.\n3. Evaluamos en 0: 0.\nResultado final: 3/2." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₁ᵉ 1/x dx.", options: ["1", "e", "0", "ln(2)"], correct: 0, solution: "Resolución:\n1. Una primitiva de 1/x es ln|x|.\n2. Aplicamos Barrow:\n∫₁ᵉ 1/x dx = [ln|x|]₁ᵉ = ln(e)-ln(1).\n3. ln(e)=1 y ln(1)=0.\nResultado final: 1." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₀^π sen(x) dx.", options: ["2", "0", "1", "π"], correct: 0, solution: "Resolución:\n1. Una primitiva de sen(x) es -cos(x).\n2. Evaluamos:\n[-cos(x)]₀^π = -cos(π)-[-cos(0)].\n3. cos(π)=-1 y cos(0)=1, luego 1-(-1)=2.\nResultado final: 2." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular el área limitada por f(x)=2 y el eje OX entre x=0 y x=5.", options: ["10", "5", "2", "7"], correct: 0, solution: "Resolución:\n1. La función f(x)=2 es positiva y constante.\n2. El área puede verse como rectángulo: base 5 y altura 2.\n3. También: ∫₀⁵2dx=[2x]₀⁵=10.\nResultado final: A=10." },
    { text: "PAU - CCSS II - Integrales definidas\nCalcular\n∫₀² (4-x²) dx.", options: ["16/3", "8/3", "4", "32/3"], correct: 0, solution: "Resolución:\n1. Una primitiva de 4-x² es 4x-x³/3.\n2. Evaluamos entre 0 y 2:\n[4x-x³/3]₀² = 8-8/3.\n3. 8=24/3, luego 24/3-8/3=16/3.\nResultado final: 16/3." }
  ],
  ccssIIProbabilidad: [
    { text: "(PAU junio 2014 modelo) P(TV)=0,40, P(Lee)=0,10 y P(TV∩Lee)=0,01. Calcula P(TV∪Lee).", options: ["0,49", "0,50", "0,04", "0,31"], correct: 0, solution: "Solucion:\n1. Usamos P(A∪B)=P(A)+P(B)-P(A∩B).\n2. 0,40+0,10-0,01=0,49.\nResultado final: 0,49." },
    { text: "(PAU junio 2014 modelo) Con los datos P(TV)=0,40 y P(TV∩Lee)=0,01, calcula P(Lee|TV).", options: ["0,025", "0,25", "0,04", "0,10"], correct: 0, solution: "Solucion:\n1. P(Lee|TV)=P(Lee∩TV)/P(TV).\n2. 0,01/0,40=0,025.\nResultado final: 0,025." },
    { text: "(PAU modelo Bayes) Robots A,B,C producen 15%,20%,65% con defectos 0,02;0,03;0,01. Calcula P(defecto).", options: ["0,0155", "0,06", "0,02", "0,0100"], correct: 0, solution: "Solucion:\n1. Probabilidad total: 0,15·0,02+0,20·0,03+0,65·0,01.\n2. 0,003+0,006+0,0065=0,0155.\nResultado final: 0,0155." },
    { text: "(PAU modelo) Si P(A)=0,2, P(B)=0,8, P(D|A)=0,02 y P(D|B)=0,1, calcula P(D).", options: ["0,084", "0,12", "0,08", "0,024"], correct: 0, solution: "Solucion:\n1. Aplicamos probabilidad total.\n2. P(D)=0,2·0,02+0,8·0,1=0,004+0,08.\nResultado final: 0,084." },
    { text: "(PAU modelo) En una baraja española de 40 cartas se sacan dos sin reemplazo. P(dos oros) es...", options: ["3/52", "1/16", "1/4", "9/40"], correct: 0, solution: "Solucion:\n1. P(1ª oro)=10/40.\n2. Sin reemplazo, P(2ª oro|1ª oro)=9/39.\n3. Producto: 10/40·9/39=90/1560=3/52.\nResultado final: 3/52." },
    { text: "(PAU modelo) En una urna hay 8 rojas y 16 azules. Se extraen 3 sin reposicion. P(tres rojas) es...", options: ["(8/24)(7/23)(6/22)", "(8/24)^3", "(16/24)(15/23)(14/22)", "3·8/24"], correct: 0, solution: "Solucion:\n1. Sin reposicion cambian los totales.\n2. Multiplicamos probabilidades condicionadas.\nResultado final: (8/24)(7/23)(6/22)." },
    { text: "(PAU modelo) Si una maquina funciona bien con probabilidad 0,98 y P(accidente|bien)=0,1, P(accidente|falla)=0,6, calcula P(accidente).", options: ["0,11", "0,698", "0,098", "0,012"], correct: 0, solution: "Solucion:\n1. P(falla)=0,02.\n2. P(accidente)=0,98·0,1+0,02·0,6=0,098+0,012.\nResultado final: 0,11." },
    { text: "(PAU modelo) Si un candidato sabe 15 de 20 temas y salen 2 sin repeticion, P(saber los dos) es...", options: ["(15/20)(14/19)", "(15/20)^2", "(5/20)(4/19)", "15/20"], correct: 0, solution: "Solucion:\n1. Primera extraccion: 15/20.\n2. Segunda, si ya salio uno sabido: 14/19.\nResultado final: (15/20)(14/19)." }
  ],
  ccssIIDistribuciones: [
    { text: "(PAU septiembre 2014 modelo) Si aprobar una asignatura tiene probabilidad 0,9 y son 2 asignaturas independientes, P(aprueba las dos) es...", options: ["0,81", "0,18", "0,99", "0,90"], correct: 0, solution: "Solucion:\n1. Son sucesos independientes.\n2. P(dos aprobadas)=0,9·0,9=0,81.\nResultado final: 0,81." },
    { text: "(PAU modelo) Si X~B(2,0,9), calcula P(X=1).", options: ["0,18", "0,81", "0,01", "0,09"], correct: 0, solution: "Solucion:\n1. Formula binomial: P(X=1)=C(2,1)(0,9)^1(0,1)^1.\n2. 2·0,9·0,1=0,18.\nResultado final: 0,18." },
    { text: "(PAU modelo) En X~B(n,p), la media y la desviacion tipica son...", options: ["μ=np, σ=sqrt(np(1-p))", "μ=p, σ=np", "μ=n+p, σ=sqrt(n)", "μ=np, σ=np(1-p)"], correct: 0, solution: "Solucion:\n1. En una binomial, media μ=np.\n2. Varianza=npq, con q=1-p.\n3. Desviacion tipica σ=sqrt(npq).\nResultado final: μ=np, σ=sqrt(np(1-p))." },
    { text: "(PAU modelo) Si X~N(85,20), tipifica x=105.", options: ["z=1", "z=-1", "z=20", "z=0,25"], correct: 0, solution: "Solucion:\n1. z=(x-μ)/σ.\n2. z=(105-85)/20=1.\nResultado final: z=1." },
    { text: "(PAU modelo) Si Z~N(0,1), P(Z<0) vale...", options: ["0,5", "0", "1", "0,95"], correct: 0, solution: "Solucion:\n1. La normal tipica es simetrica respecto de 0.\n2. La mitad del area queda a la izquierda.\nResultado final: 0,5." },
    { text: "(PAU modelo) Si X~N(100,15), P(X<100) es...", options: ["0,5", "0,15", "1", "0"], correct: 0, solution: "Solucion:\n1. La media parte la normal en dos zonas iguales.\nResultado final: P(X<μ)=0,5." },
    { text: "(PAU modelo) En B(10,0,3), la varianza es...", options: ["2,1", "3", "0,21", "7"], correct: 0, solution: "Solucion:\n1. Varianza=npq.\n2. q=1-0,3=0,7.\n3. 10·0,3·0,7=2,1.\nResultado final: 2,1." },
    { text: "(PAU modelo) Si una variable normal se tipifica, se transforma en...", options: ["Z~N(0,1)", "B(n,p)", "N(1,0)", "Una distribucion uniforme"], correct: 0, solution: "Solucion:\n1. Tipificar consiste en restar la media y dividir por la desviacion tipica.\nResultado final: Z~N(0,1)." }
  ],
  ccssIIMuestreoInferencia: [
    { text: "(PAU junio 2014 modelo) Un intervalo de confianza es (1076,08 , 1083,92). La media muestral es...", options: ["1080", "1076,08", "1083,92", "7,84"], correct: 0, solution: "Solucion:\n1. La media muestral es el centro del intervalo.\n2. (1076,08+1083,92)/2=2160/2.\nResultado final: 1080." },
    { text: "(PAU modelo) Con σ=3, n=50, media 17 y confianza 95%, el intervalo para μ usa z=1,96 y queda...", options: ["17 Â± 1,96·3/sqrt(50)", "17 Â± 3/sqrt(95)", "50 Â± 1,96·3/17", "17 Â± 1,96·sqrt(50)/3"], correct: 0, solution: "Solucion:\n1. Con σ conocida: IC = xbarra Â± z·σ/sqrt(n).\n2. Sustituimos xbarra=17, z=1,96, σ=3, n=50.\nResultado final: 17 Â± 1,96·3/sqrt(50)." },
    { text: "(PAU modelo) Para disminuir la amplitud de un intervalo manteniendo el nivel de confianza, hay que...", options: ["Aumentar el tamaño muestral", "Disminuir el tamaño muestral", "Aumentar σ", "Cambiar la media"], correct: 0, solution: "Solucion:\n1. La amplitud depende del error z·σ/sqrt(n).\n2. Si n aumenta, sqrt(n) aumenta y el error disminuye.\nResultado final: aumentar n." },
    { text: "(PAU modelo) Si el intervalo al 95% es (898,04 , 901,96), la media muestral es...", options: ["900", "898,04", "901,96", "3,92"], correct: 0, solution: "Solucion:\n1. Centro del intervalo: (898,04+901,96)/2.\n2. La suma es 1800.\nResultado final: 900." },
    { text: "(PAU modelo) El error maximo de estimacion para media con σ conocida es...", options: ["E=z·σ/sqrt(n)", "E=σ/n", "E=xbarra/n", "E=z·sqrt(n)/σ"], correct: 0, solution: "Solucion:\n1. En intervalos para la media con σ conocida se usa la normal.\n2. El radio del intervalo es E=z·σ/sqrt(n).\nResultado final: E=z·σ/sqrt(n)." },
    { text: "(PAU modelo) Si queremos error menor que 1 con σ=4 y confianza 95%, el tamaño n debe cumplir...", options: ["n>(1,96·4/1)^2", "n<1,96·4", "n=4/1,96", "n>1/(1,96·4)^2"], correct: 0, solution: "Solucion:\n1. Exigimos z·σ/sqrt(n)<E.\n2. Despejamos: sqrt(n)>zσ/E, luego n>(zσ/E)^2.\nResultado final: n>(1,96·4/1)^2." },
    { text: "(PAU modelo) Si aumenta el nivel de confianza y n no cambia, el intervalo...", options: ["Se hace mas amplio", "Se hace mas estrecho", "No cambia", "Desaparece"], correct: 0, solution: "Solucion:\n1. Mayor confianza implica mayor valor critico z.\n2. El error aumenta y el intervalo se ensancha.\nResultado final: se hace mas amplio." },
    { text: "(PAU modelo) Para que un intervalo de confianza sea valido, la muestra debe ser...", options: ["Aleatoria y representativa", "Elegida solo entre los mejores casos", "Siempre de tamaño 10", "No aleatoria"], correct: 0, solution: "Solucion:\n1. La inferencia pretende representar a la poblacion.\n2. Si la muestra esta sesgada, el intervalo no es fiable.\nResultado final: muestra aleatoria y representativa." }
  ],
  bachGeneral: [
    { text: "Factoriza: x²-9.", options: ["(x-3)(x+3)", "(x-9)(x+1)", "x(x-9)", "(x-3)²"], correct: 0, solution: "Resolución:\n1. Reconocemos una diferencia de cuadrados: x²-9=x²-3².\n2. Aplicamos a²-b²=(a-b)(a+b).\nResultado final: x²-9=(x-3)(x+3)." },
    { text: "Calcula: log₁₀(1000).", options: ["3", "10", "100", "1/3"], correct: 0, solution: "Resolución:\n1. Buscamos el exponente al que hay que elevar 10 para obtener 1000.\n2. Como 10³=1000, se cumple log₁₀(1000)=3.\nResultado final: 3." },
    { text: "Si f(x)=x²+2x, calcula f'(x).", options: ["2x+2", "x+2", "2x", "x²"], correct: 0, solution: "Resolución:\n1. Derivamos término a término.\n2. La derivada de x² es 2x y la derivada de 2x es 2.\nResultado final: f'(x)=2x+2." },
    { text: "Calcula el límite de 1/x cuando x tiende a +∞.", options: ["0", "1", "+∞", "No existe"], correct: 0, solution: "Resolución:\n1. El numerador permanece constante y el denominador crece sin límite.\n2. Por ello, 1/x toma valores positivos cada vez más próximos a 0.\nResultado final: el límite es 0." },
    { text: "Calcula ∫2x dx.", options: ["x²+C", "2+C", "2x²+C", "x+C"], correct: 0, solution: "Resolución:\n1. Aplicamos la regla de la potencia: ∫xⁿdx=xⁿ⁺¹/(n+1)+C.\n2. ∫2x dx=2·x²/2+C.\nResultado final: x²+C." }
  ],
  ecuacionesBach: [
    { text: "Resuelve: x²-4x+3=0.", options: ["x=1 o x=3", "x=-1 o x=-3", "x=2", "x=4"], correct: 0, solution: "Resolución:\n1. Factorizamos buscando dos números cuyo producto sea 3 y cuya suma sea -4: -1 y -3.\n2. x²-4x+3=(x-1)(x-3).\n3. Igualamos cada factor a cero: x-1=0 o x-3=0.\nResultado final: x=1 o x=3." },
    { text: "Resuelve: eˣ=1.", options: ["x=0", "x=1", "x=e", "No tiene solución"], correct: 0, solution: "Resolución:\n1. Escribimos 1 como potencia de base e: 1=e⁰.\n2. Igualamos los exponentes: x=0.\nResultado final: x=0." },
    { text: "Resuelve el sistema: 2x+y=5, x-y=1.", options: ["x=2, y=1", "x=1, y=3", "x=3, y=-2", "x=5, y=1"], correct: 0, solution: "Resolución por sustitución:\n1. De x-y=1 despejamos y=x-1.\n2. Sustituimos en la primera ecuación: 2x+(x-1)=5.\n3. 3x-1=5 ⇒ 3x=6 ⇒ x=2.\n4. y=x-1=2-1=1.\nResultado final: x=2, y=1." },
    { text: "Resuelve: |x|=6.", options: ["x=6 o x=-6", "x=6", "x=-6", "x=0"], correct: 0, solution: "Resolución:\n1. |x|=6 significa que la distancia de x a 0 es 6.\n2. Planteamos los dos casos: x=6 o x=-6.\nResultado final: x=6 o x=-6." },
    { text: "Resuelve: x³=8.", options: ["x=2", "x=4", "x=8/3", "x=-2"], correct: 0, solution: "Resolución:\n1. Aplicamos la raíz cúbica en ambos miembros: x=∛8.\n2. Como 2³=8, ∛8=2.\nResultado final: x=2." }
  ],
  matrices: [
    { text: "Si A=((1,2),(3,4)), ¿cuál es la traza de A?", options: ["5", "10", "3", "4"], correct: 0, solution: "Resolución:\n1. La traza de una matriz cuadrada es la suma de los elementos de su diagonal principal.\n2. tr(A)=1+4=5.\nResultado final: 5." },
    { text: "Suma las matrices ((1,0),(2,3)) y ((4,1),(0,2)).", options: ["((5,1),(2,5))", "((4,0),(0,6))", "((5,0),(2,3))", "((1,1),(2,5))"], correct: 0, solution: "Resolución:\n1. Las matrices tienen la misma dimensión, por lo que se suman elemento a elemento.\n2. Primera fila: 1+4=5 y 0+1=1.\n3. Segunda fila: 2+0=2 y 3+2=5.\nResultado final: ((5,1),(2,5))." },
    { text: "¿Cuándo se pueden sumar dos matrices?", options: ["Cuando tienen la misma dimensión", "Cuando son cuadradas", "Cuando tienen determinante", "Siempre"], correct: 0, solution: "Resolución:\n1. Para sumar matrices debe existir una correspondencia entre todos sus elementos.\n2. Por ello han de tener el mismo número de filas y el mismo número de columnas.\nResultado final: cuando tienen la misma dimensión." },
    { text: "Multiplica por 2 la matriz ((1,-3),(0,4)).", options: ["((2,-6),(0,8))", "((1,-6),(0,8))", "((2,-3),(0,4))", "((3,-1),(2,6))"], correct: 0, solution: "Resolución:\n1. Multiplicamos cada elemento de la matriz por 2.\n2. 2·1=2, 2·(-3)=-6, 2·0=0 y 2·4=8.\nResultado final: ((2,-6),(0,8))." },
    { text: "La matriz identidad de orden 2 tiene en la diagonal principal...", options: ["Unos", "Ceros", "Doses", "El determinante"], correct: 0, solution: "Resolución:\n1. La identidad de orden 2 es I₂=((1,0),(0,1)).\n2. Tiene unos en la diagonal principal y ceros fuera de ella.\nResultado final: unos." }
  ],
  determinantes: [
    { text: "Calcula el determinante |(1,2),(3,4)|.", options: ["-2", "10", "2", "-10"], correct: 0, solution: "Resolución:\n1. Para un determinante de orden 2 utilizamos |(a,b),(c,d)|=a·d-b·c.\n2. |(1,2),(3,4)|=1·4-2·3=4-6.\nResultado final: -2." },
    { text: "Calcula el determinante |(2,0),(0,5)|.", options: ["10", "7", "0", "3"], correct: 0, solution: "Resolución:\n1. Es un determinante diagonal, por lo que multiplicamos los elementos de la diagonal principal.\n2. |(2,0),(0,5)|=2·5=10.\nResultado final: 10." },
    { text: "Si dos filas de una matriz son iguales, su determinante es...", options: ["0", "1", "-1", "El doble"], correct: 0, solution: "Resolución:\n1. Intercambiar dos filas cambia el signo del determinante.\n2. Si las filas son iguales, el intercambio no modifica la matriz; por tanto, el determinante tendría que ser igual a su opuesto.\nResultado final: el determinante vale 0." },
    { text: "Calcula el determinante |(0,1),(1,0)|.", options: ["-1", "1", "0", "2"], correct: 0, solution: "Resolución:\n1. Aplicamos |(a,b),(c,d)|=a·d-b·c.\n2. |(0,1),(1,0)|=0·0-1·1.\nResultado final: -1." },
    { text: "Si det(A)≠0, entonces A es...", options: ["Invertible", "Nula", "Diagonal siempre", "Simétrica siempre"], correct: 0, solution: "Resolución:\n1. Una matriz cuadrada posee inversa exactamente cuando su determinante es distinto de cero.\n2. Como det(A)≠0, existe A⁻¹.\nResultado final: A es invertible." }
  ],
  limites: [
    { text: "Calcula lim(x→2)(x+3).", options: ["5", "3", "2", "0"], correct: 0, solution: "Resolución:\n1. La función x+3 es continua en x=2.\n2. Sustituimos directamente: 2+3=5.\nResultado final: el límite vale 5." },
    { text: "Calcula lim(x→1)((x²-1)/(x-1)).", options: ["2", "0", "1", "No existe"], correct: 0, solution: "Resolución:\n1. Al sustituir x=1 aparece la indeterminación 0/0.\n2. Factorizamos: x²-1=(x-1)(x+1).\n3. Para x≠1 simplificamos el factor x-1 y queda x+1.\n4. Sustituimos: 1+1=2.\nResultado final: el límite vale 2." },
    { text: "Una función continua en x=a cumple que...", options: ["El límite coincide con f(a)", "No tiene límite", "Siempre vale 0", "Tiene salto"], correct: 0, solution: "Resolución:\n1. Deben existir los dos límites laterales y ser iguales.\n2. Además, ese límite común debe coincidir con el valor de la función.\nResultado final: lim(x→a)f(x)=f(a)." },
    { text: "Calcula lim(x→+∞)(5/x).", options: ["0", "5", "+∞", "1"], correct: 0, solution: "Resolución:\n1. El numerador es constante y el denominador crece sin límite.\n2. El cociente toma valores positivos cada vez más pequeños.\nResultado final: el límite vale 0." },
    { text: "Calcula lim(x→0)(sen x/x).", options: ["1", "0", "+∞", "No existe"], correct: 0, solution: "Resolución:\n1. Al sustituir x=0 aparece 0/0.\n2. Aplicamos la regla de L'Hôpital: lim(x→0)(cos x/1).\n3. Sustituimos x=0: cos 0=1.\nResultado final: el límite vale 1." }
  ],
  derivadas: [
    { text: "Deriva f(x)=x³.", options: ["3x²", "x²", "3x", "x⁴/4"], correct: 0, solution: "Resolución:\n1. Aplicamos la regla de la potencia: (xⁿ)'=n·xⁿ⁻¹.\n2. f'(x)=3x³⁻¹.\nResultado final: f'(x)=3x²." },
    { text: "Deriva f(x)=5x-7.", options: ["5", "5x", "-7", "12"], correct: 0, solution: "Resolución:\n1. (5x)'=5.\n2. La derivada de la constante -7 es 0.\nResultado final: f'(x)=5." },
    { text: "Deriva f(x)=x²+4x.", options: ["2x+4", "x+4", "2x", "x²+4"], correct: 0, solution: "Resolución:\n1. Derivamos término a término.\n2. (x²)'=2x y (4x)'=4.\nResultado final: f'(x)=2x+4." },
    { text: "Si f'(a)=0, el punto de abscisa a puede ser...", options: ["Un extremo relativo", "Una asíntota vertical", "Un dominio vacío", "Una raíz siempre"], correct: 0, solution: "Resolución:\n1. Si una función derivable tiene un extremo relativo interior, su derivada se anula en ese punto.\n2. Por ello f'(a)=0 convierte a x=a en candidato a extremo, aunque después hay que estudiar el signo de f'.\nResultado final: puede ser un extremo relativo." },
    { text: "Deriva f(x)=1/x.", options: ["-1/x²", "1", "x", "1/x²"], correct: 0, solution: "Resolución:\n1. Escribimos 1/x=x⁻¹.\n2. Aplicamos la regla de la potencia: (x⁻¹)'=-x⁻².\nResultado final: f'(x)=-1/x²." }
  ],
  integrales: [
    { text: "Calcula ∫ 3x² dx.", options: ["x³ + C", "6x + C", "3x³ + C", "x² + C"], correct: 0, solution: "Solución:\n1. Aplicamos la regla de la potencia.\n2. ∫3x²dx = 3·x³/3 = x³.\nResultado final: x³+C." },
    { text: "Calcula ∫5 dx.", options: ["5x+C", "5+C", "x⁵+C", "0"], correct: 0, solution: "Resolución:\n1. La primitiva de una constante k es kx.\n2. Por tanto, ∫5dx=5x+C.\nResultado final: 5x+C." },
    { text: "Calcula ∫(1/x) dx.", options: ["ln|x|+C", "1/x²+C", "x+C", "-1/x+C"], correct: 0, solution: "Resolución:\n1. Utilizamos la integral inmediata ∫(1/x)dx=ln|x|+C, válida para x≠0.\nResultado final: ln|x|+C." },
    { text: "Una integral definida representa geométricamente...", options: ["Área con signo", "Pendiente", "Raíz", "Moda"], correct: 0, solution: "Resolución:\n1. La integral definida suma áreas infinitesimales entre la gráfica y el eje OX.\n2. Las zonas sobre el eje cuentan positivamente y las situadas debajo, negativamente.\nResultado final: representa un área con signo." },
    { text: "Calcula ∫(2x+1) dx.", options: ["x²+x+C", "2+C", "x²+C", "2x²+x+C"], correct: 0, solution: "Resolución:\n1. Integramos término a término.\n2. ∫2x dx=x² y ∫1dx=x.\nResultado final: x²+x+C." }
  ],
  probabilidadBach: [
    { text: "Si A y B son independientes, P(A∩B) es...", options: ["P(A)·P(B)", "P(A)+P(B)", "P(A)-P(B)", "1"], correct: 0, solution: "Resolución:\n1. Por definición de independencia, la probabilidad de que ocurran ambos sucesos es el producto de sus probabilidades.\nResultado final: P(A∩B)=P(A)·P(B)." },
    { text: "Si P(A)=0,4 y P(B)=0,5 son independientes, calcula P(A∩B).", options: ["0,2", "0,9", "0,1", "0,45"], correct: 0, solution: "Resolución:\n1. Al ser independientes, P(A∩B)=P(A)·P(B).\n2. P(A∩B)=0,4·0,5=0,2.\nResultado final: 0,2." },
    { text: "La probabilidad del suceso contrario de A es...", options: ["1-P(A)", "P(A)-1", "P(A)/2", "P(A)²"], correct: 0, solution: "Resolución:\n1. A y su contrario Aᶜ son incompatibles y completan todo el espacio muestral.\n2. P(A)+P(Aᶜ)=1.\n3. Despejamos P(Aᶜ)=1-P(A).\nResultado final: 1-P(A)." },
    { text: "Si P(A)=0,7, entonces P(Aᶜ)=...", options: ["0,3", "0,7", "1,7", "-0,3"], correct: 0, solution: "Resolución:\n1. Aplicamos P(Aᶜ)=1-P(A).\n2. P(Aᶜ)=1-0,7=0,3.\nResultado final: 0,3." },
    { text: "La probabilidad condicionada P(A|B) se calcula como...", options: ["P(A∩B)/P(B)", "P(A)/P(B)", "P(A)+P(B)", "P(B)/P(A)"], correct: 0, solution: "Resolución:\n1. Restringimos el espacio muestral al suceso B.\n2. La parte favorable es la intersección A∩B.\nResultado final: P(A|B)=P(A∩B)/P(B), con P(B)≠0." }
  ],
  estadisticaBach: [
    { text: "En una binomial B(n,p), la media es...", options: ["n·p", "n+p", "p/n", "n-p"], correct: 0, solution: "Resolución:\n1. Una variable binomial cuenta éxitos en n ensayos independientes con probabilidad p.\n2. Su esperanza o media viene dada por μ=n·p.\nResultado final: n·p." },
    { text: "En una normal típica N(0,1), la media es...", options: ["0", "1", "-1", "0,5"], correct: 0, solution: "Resolución:\n1. La notación N(μ,σ) identifica la media y la desviación típica.\n2. En N(0,1), μ=0 y σ=1.\nResultado final: la media es 0." },
    { text: "Si X∼B(10; 0,5), la media es...", options: ["5", "10", "0,5", "2"], correct: 0, solution: "Resolución:\n1. En una distribución binomial, μ=n·p.\n2. Sustituimos n=10 y p=0,5: μ=10·0,5=5.\nResultado final: 5." },
    { text: "Un intervalo de confianza sirve para estimar...", options: ["Un parámetro poblacional", "Una derivada", "Un determinante", "Una raíz exacta"], correct: 0, solution: "Resolución:\n1. Se calcula a partir de una muestra aleatoria.\n2. Proporciona un conjunto plausible de valores para una característica desconocida de la población.\nResultado final: estima un parámetro poblacional." },
    { text: "Si aumenta el tamaño muestral, el error típico normalmente...", options: ["Disminuye", "Aumenta", "No existe", "Se duplica siempre"], correct: 0, solution: "Resolución:\n1. El error típico contiene el tamaño muestral en el denominador mediante √n.\n2. Al aumentar n, aumenta √n y disminuye el cociente.\nResultado final: el error típico disminuye." }
  ]
};

function rotate(items, amount) {
  return items.slice(amount).concat(items.slice(0, amount));
}

function answerMultipartPart(partIndex, optionIndex) {
  if (state.answered || state.multipartResponses[partIndex] !== undefined) return;
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const question = buildQuestions(theme, course)[state.questionIndex];
  const part = question?.parts?.[partIndex];
  if (!part) return;
  const isCorrect = optionIndex === part.correct;
  state.multipartResponses[partIndex] = { optionIndex, correct: isCorrect };

  part.options.forEach((_, index) => {
    const button = document.getElementById(`part-${partIndex}-answer-${index}`);
    if (button) button.disabled = true;
  });
  document.getElementById(`part-${partIndex}-answer-${part.correct}`)?.classList.add("correct");
  if (!isCorrect) document.getElementById(`part-${partIndex}-answer-${optionIndex}`)?.classList.add("wrong");
  const partFeedback = document.getElementById(`part-feedback-${partIndex}`);
  if (partFeedback) partFeedback.textContent = isCorrect ? "Apartado correcto." : "Respuesta incorrecta. Al terminar podrás ver la resolución completa.";

  if (state.multipartResponses.filter((response) => response !== undefined).length !== question.parts.length) return;
  clearQuestionTimer();
  state.answered = true;
  markChallengeQuestionAnswered(question);
  const correctParts = state.multipartResponses.filter((response) => response.correct).length;
  state.score += correctParts * 100;
  state.streak = correctParts === question.parts.length ? state.streak + 1 : 0;
  question.parts.forEach((answeredPart, index) => {
    state.sessionAnswers.push({
      question: `${question.source || question.text} · ${answeredPart.label} ${answeredPart.text || ""}`,
      correct: Boolean(state.multipartResponses[index]?.correct),
      solution: answeredPart.solution || ""
    });
  });
  const feedback = document.getElementById("feedback");
  if (feedback) feedback.textContent = correctParts === question.parts.length
    ? "Todos los apartados son correctos."
    : `Has acertado ${correctParts} de ${question.parts.length} apartados. Puedes consultar las soluciones paso a paso.`;
  document.getElementById("help-btn").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  if (correctParts === question.parts.length) burstSparkles();
  scheduleFitStudentScreen();
}

function answerQuestion(index) {
  if (state.answered) return;
  clearQuestionTimer();

  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const questions = buildQuestions(theme, course);
  const question = questions[state.questionIndex];
  if (question.type === "pau-open" && !question.options?.length) return;
  const isCorrect = index === question.correct;

  state.answered = true;
  markChallengeQuestionAnswered(question);
  state.score += isCorrect ? 100 + state.streak * 20 : 0;
  state.streak = isCorrect ? state.streak + 1 : 0;
  state.sessionAnswers.push({ question: question.text, correct: isCorrect, solution: question.solution || "" });

  document.getElementById(`answer-${question.correct}`).classList.add("correct");
  if (!isCorrect) {
    document.getElementById(`answer-${index}`).classList.add("wrong");
  }
  document.getElementById("help-btn").style.display = "block";
  document.getElementById("feedback").textContent = isCorrect
    ? "Correcto. Muy buen ritmo."
    : "Casi. Revisa la resolución y vuelve a intentarlo en la siguiente.";
  document.getElementById("next-btn").style.display = "block";
  if (question.type === "pau-open") {
    document.getElementById("help-btn").style.display = "block";
    showSolutionHelp();
  }

  if (isCorrect) burstSparkles();
  scheduleFitStudentScreen();
}

function completeOpenPauQuestion() {
  if (state.answered) return;
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const questions = buildQuestions(theme, course);
  const question = questions[state.questionIndex];
  state.answered = true;
  markChallengeQuestionAnswered(question);
  state.score += 100;
  state.streak += 1;
  state.sessionAnswers.push({ question: question.text, correct: true, solution: question.solution || "" });
  document.getElementById("feedback").textContent = "Ejercicio PAU trabajado. Pasa al siguiente cuando hayas revisado el procedimiento.";
  const nextButton = document.getElementById("next-btn");
  if (nextButton) {
    nextButton.textContent = "Siguiente";
    nextButton.onclick = nextQuestion;
  }
  scheduleFitStudentScreen();
}

function showSolutionHelp() {
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const questions = buildQuestions(theme, course);
  const question = questions[state.questionIndex];
  if (!question) {
    renderBachBlockSelector();
    return;
  }
  const help = document.getElementById("solution-help");
  if (Array.isArray(question.parts) && question.parts.length) {
    help.innerHTML = `<strong>Resoluciones paso a paso:</strong><div class="multipart-solutions">${question.parts.map((part) => `
      <section class="part-solution"><h3>${escapeHtml(part.label)}</h3><div class="solution-help-body">${formatSolutionText(part.solution)}</div></section>
    `).join("")}</div>`;
  } else {
    help.innerHTML = `<div class="solution-help-body">${formatSolutionText(didacticSolutionText(question))}</div>`;
  }
  help.style.display = "block";
  if (question.type === "pau-open" || course.id.startsWith("2bach")) {
    document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  }
  scheduleFitStudentScreen();
}

function showTopicExplanation() {
  const modal = document.getElementById("lesson-modal");
  const panel = document.getElementById("topic-explanation-detail");
  if (!panel) return;
  const hasInfographic = panel.dataset.infographic === "true"
    || Boolean(panel.querySelector(".infographic-fullscreen-frame"));
  if (modal) {
    modal.style.display = "grid";
    modal.classList.toggle("lesson-modal-infographic", hasInfographic);
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");
  }
  document.body.classList.toggle("lesson-infographic-open", hasInfographic);
  if (!hasInfographic) document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  panel.style.display = "grid";
  const bookPanel = document.getElementById("book-content-panel");
  if (bookPanel) bookPanel.style.display = "none";
  if (!hasInfographic) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  scheduleFitStudentScreen();
}

function showBookContent() {
  const modal = document.getElementById("lesson-modal");
  const panel = document.getElementById("book-content-panel");
  if (!panel) return;
  if (modal) {
    modal.style.display = "grid";
    modal.classList.remove("lesson-modal-infographic");
  }
  document.body.classList.remove("lesson-infographic-open");
  document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  panel.style.display = "grid";
  const explanationPanel = document.getElementById("topic-explanation-detail");
  if (explanationPanel) explanationPanel.style.display = "none";
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  scheduleFitStudentScreen();
}

function closeLessonPanels() {
  const modal = document.getElementById("lesson-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("lesson-modal-infographic");
  }
  document.body.classList.remove("lesson-infographic-open");
  document.querySelector(".shell-student-fit")?.classList.remove("shell-scroll-if-needed");
  stopSummarySpeech();
  scheduleFitStudentScreen();
}

function startQuestionTimer() {
  clearQuestionTimer();
  state.timeLeft = questionSecondsFor(courseById(state.courseId));
  updateTimerDisplay();
  timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();
    if (state.timeLeft <= 0) handleTimeUp();
  }, 1000);
}

function clearQuestionTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerDisplay() {
  const timer = document.getElementById("timer");
  if (!timer) return;
  timer.textContent = formatTimer(state.timeLeft);
  timer.classList.toggle("timer-warning", state.timeLeft <= 20);
}

function handleTimeUp() {
  if (state.answered) return;
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const questions = buildQuestions(theme, course);
  const question = questions[state.questionIndex];
  if (Array.isArray(question.parts) && question.parts.length) {
    state.answered = true;
    state.streak = 0;
    question.parts.forEach((part, partIndex) => {
      const response = state.multipartResponses[partIndex];
      document.getElementById(`part-${partIndex}-answer-${part.correct}`)?.classList.add("correct");
      part.options.forEach((_, optionIndex) => {
        const button = document.getElementById(`part-${partIndex}-answer-${optionIndex}`);
        if (button) button.disabled = true;
      });
      state.sessionAnswers.push({
        question: `${question.source || question.text} · ${part.label} ${part.text || ""}`,
        correct: Boolean(response?.correct),
        timedOut: !response,
        solution: part.solution || ""
      });
    });
    document.getElementById("feedback").textContent = "Tiempo agotado. Puedes revisar todas las soluciones antes de continuar.";
    document.getElementById("help-btn").style.display = "block";
    document.getElementById("next-btn").style.display = "block";
    scheduleFitStudentScreen();
    return;
  }
  state.answered = true;
  state.streak = 0;
  state.sessionAnswers.push({ question: question.text, correct: false, timedOut: true, solution: question.solution || "" });
  if (question.type !== "pau-open") document.getElementById(`answer-${question.correct}`).classList.add("correct");
  document.getElementById("feedback").textContent = "Tiempo agotado. Mira la ayuda paso a paso y pasa al siguiente reto.";
  document.getElementById("help-btn").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  scheduleFitStudentScreen();
}

function currentTopicVideoLesson() {
  const preparedLesson = window.TOPIC_VIDEO_LESSONS?.[`${state.courseId}-${state.topicIndex}`];
  const course = courseById(state.courseId);
  if (preparedLesson && course) {
    return {
      ...preparedLesson,
      contentSource: "infographic",
      sourceInfographic: bachInfographicFor(course, state.topicIndex)
    };
  }
  if (!course || !ESO_COURSE_IDS.includes(course.id)) return null;
  return buildEsoTopicVideoLesson(course, state.topicIndex);
}

function normalizedVideoKey(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function esoTopicVideoTitle(course, topicIndex) {
  const resource = Array.isArray(course.resources) ? course.resources[topicIndex] : "";
  if (typeof resource === "string" && resource) {
    const filename = resource.split(/[\\/]/).pop();
    const fromInfographic = filename
      .replace(/^\d+[-–]\s*/, "")
      .replace(/\s*-\s*Infograf[ií]a\.pdf$/i, "")
      .replace(/\.pdf$/i, "")
      .trim();
    if (fromInfographic) return fromInfographic;
  }
  return course.themes[topicIndex];
}

function esoVideoProfileFor(theme, course) {
  const key = normalizedVideoKey(theme);
  const profiles = window.ESO_VIDEO_CONTENT || [];
  return profiles.find((profile) => {
    if (profile.courses && !profile.courses.includes(course.id)) return false;
    return profile.match.some((term) => key.includes(normalizedVideoKey(term)));
  }) || {
    id: "general",
    symbol: "∑",
    exampleTitle: "Aplicamos el procedimiento con orden",
    expression: theme,
    steps: ["Identificamos los datos", "Elegimos la propiedad adecuada", "Calculamos y comprobamos"],
    speech: "Leemos con atención, organizamos los datos y aplicamos la propiedad correspondiente. Al terminar comprobamos que el resultado responde exactamente a la pregunta.",
    mistake: "No empieces a calcular sin identificar primero qué se pide y qué propiedad debes utilizar.",
    keywords: ["Datos", "Concepto", "Propiedad", "Procedimiento", "Resultado", "Comprobar"]
  };
}

function buildEsoTopicVideoLesson(course, topicIndex) {
  const theme = course.themes[topicIndex];
  const title = esoTopicVideoTitle(course, topicIndex);
  const sourceInfographic = bachInfographicFor(course, topicIndex);
  const explanation = topicExplanation(theme, course);
  const profile = esoVideoProfileFor(theme, course);
  const concepts = explanation.steps.slice(0, 4);
  const conceptNarration = concepts.map((step, index) => `${index === 0 ? "Primero" : index === concepts.length - 1 ? "Por último" : "Después"}, ${step.title.toLowerCase()}. ${step.body}`).join(" ");
  const processNarration = profile.steps.map((step, index) => `Paso ${index + 1}. ${String(step).replace(/(?:Resultado|luego|por tanto)\s*:/i, "")}.`).join(" ");
  return {
    title,
    course: course.name.replace(/ opcion /i, " · opción "),
    duration: "3–4 minutos",
    contentSource: "infographic",
    sourceInfographic,
    scenes: [
      {
        kind: "topic-welcome",
        eyebrow: "Escena 1 · Idea principal",
        title: `Descubrimos ${title}`,
        narration: `${explanation.summary} ${explanation.intro}`,
        takeaway: profile.keywords.slice(0, 4).join(" · "),
        symbol: profile.symbol,
        items: profile.keywords.slice(0, 3)
      },
      {
        kind: "topic-concepts",
        eyebrow: "Escena 2 · Conceptos esenciales",
        title: "Las ideas que debes reconocer",
        narration: conceptNarration,
        takeaway: "Comprender primero; calcular después.",
        cards: concepts
      },
      {
        kind: "topic-process",
        eyebrow: "Escena 3 · Método",
        title: profile.exampleTitle,
        narration: processNarration,
        takeaway: "Una operación o idea principal en cada paso.",
        steps: profile.steps
      },
      {
        kind: "worked-example",
        eyebrow: "Escena 4 · Ejemplo guiado",
        title: "Lo resolvemos paso a paso",
        narration: profile.speech,
        takeaway: profile.steps[profile.steps.length - 1],
        expression: profile.expression,
        steps: profile.steps
      },
      {
        kind: "topic-check",
        eyebrow: "Escena 5 · Evita errores",
        title: "Comprueba antes de responder",
        narration: `Un error frecuente es el siguiente. ${profile.mistake} Como comprobación final, ${explanation.check}`,
        takeaway: explanation.check,
        mistake: profile.mistake,
        check: explanation.check
      },
      {
        kind: "topic-recap",
        eyebrow: "Escena 6 · Resumen",
        title: "Ya estás preparado para el reto",
        narration: `Repasamos. ${explanation.summary} Sigue el procedimiento con orden, escribe la notación correctamente y comprueba siempre el resultado. Ahora puedes volver al reto y practicar ${title}.`,
        takeaway: "Entiende · aplica · calcula · comprueba",
        symbol: profile.symbol,
        items: profile.keywords.slice(0, 6)
      }
    ]
  };
}

function topicVideoVisual(scene) {
  if (scene.kind === "welcome") {
    return `
      <div class="video-natural-orbit" aria-hidden="true">
        ${Array.from({ length: 10 }, (_, number) => `<span style="--i:${number}">${number}</span>`).join("")}
        <div class="video-natural-core"><strong>ℕ</strong><small>números naturales</small></div>
      </div>
      <div class="video-use-cards">
        <span><b>24</b> alumnos</span><span><b>3.º</b> puesto</span><span><b>128</b> páginas</span>
      </div>`;
  }
  if (scene.kind === "place-value") {
    const digits = [
      ["CM", "5", "500.000"], ["DM", "8", "80.000"], ["UM", "3", "3.000"],
      ["C", "2", "200"], ["D", "0", "0"], ["U", "4", "4"]
    ];
    return `
      <div class="video-place-number">583.204</div>
      <div class="video-place-grid">
        ${digits.map(([label, digit, value], index) => `<div style="--delay:${index}"><small>${label}</small><strong>${digit}</strong><span>${value}</span></div>`).join("")}
      </div>
      <div class="video-expanded-number">500.000 + 80.000 + 3.000 + 200 + 4</div>`;
  }
  if (scene.kind === "compare") {
    return `
      <div class="video-comparison"><span>4.305</span><b>&lt;</b><span>4.350</span><b>&lt;</b><span>4.503</span></div>
      <div class="video-number-line">
        <div class="video-number-line-track"></div>
        <span style="--position:10%">4.305</span><span style="--position:48%">4.350</span><span style="--position:86%">4.503</span>
      </div>
      <p class="video-direction">menor <span>→</span> mayor</p>`;
  }
  if (scene.kind === "add-subtract") {
    return `
      <div class="video-operation-pair">
        <article><span class="video-op-symbol">+</span><small>JUNTAR</small><strong>248 + 137 = 385</strong><p>sumandos → suma</p></article>
        <article><span class="video-op-symbol">−</span><small>HALLAR LA DIFERENCIA</small><strong>385 − 137 = 248</strong><p>minuendo − sustraendo</p></article>
      </div>
      <div class="video-check-pill">Comprobación: 248 + 137 = 385 ✓</div>`;
  }
  if (scene.kind === "multiply-divide") {
    return `
      <div class="video-operation-pair">
        <article><span class="video-op-symbol">×</span><small>SUMA REPETIDA</small><strong>6 · 4 = 24</strong><p>4 + 4 + 4 + 4 + 4 + 4</p></article>
        <article><span class="video-op-symbol">:</span><small>REPARTO</small><strong>47 : 6 = 7</strong><p>resto = 5</p></article>
      </div>
      <div class="video-division-rule"><span>Dividendo</span><b>=</b><span>divisor · cociente</span><b>+</b><span>resto</span></div>`;
  }
  if (scene.kind === "priority") {
    return `
      <div class="video-priority-stack">
        <div><small>1 · PARÉNTESIS</small><strong>18 + 3 · <mark>(12 − 8)</mark></strong></div>
        <div><small>2 · MULTIPLICACIÓN</small><strong>18 + <mark>3 · 4</mark></strong></div>
        <div><small>3 · SUMA</small><strong><mark>18 + 12</mark></strong></div>
        <div class="is-result"><small>RESULTADO</small><strong>30</strong></div>
      </div>`;
  }
  if (scene.kind === "topic-welcome") {
    return `
      <div class="video-topic-emblem" aria-hidden="true"><span>${escapeHtml(scene.symbol)}</span></div>
      <div class="video-topic-keywords">
        ${scene.items.map((item, index) => `<span style="--delay:${index}">${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="video-topic-route"><i></i><b>Comprender</b><i></i><b>Practicar</b><i></i><b>Comprobar</b></div>`;
  }
  if (scene.kind === "topic-concepts") {
    return `
      <div class="video-concept-grid">
        ${scene.cards.map((card, index) => `
          <article style="--delay:${index}"><span>${index + 1}</span><strong>${escapeHtml(card.title)}</strong><p>${escapeHtml(card.body)}</p></article>
        `).join("")}
      </div>`;
  }
  if (scene.kind === "topic-process") {
    return `
      <div class="video-method-path">
        ${scene.steps.map((step, index) => `<div style="--delay:${index}"><span>${index + 1}</span><p>${formatMathText(step)}</p></div>`).join("")}
      </div>`;
  }
  if (scene.kind === "worked-example") {
    return `
      <div class="video-example-expression">${formatMathText(scene.expression)}</div>
      <div class="video-example-steps">
        ${scene.steps.map((step, index) => `<div style="--delay:${index}"><small>Paso ${index + 1}</small><strong>${formatMathText(step)}</strong></div>`).join("")}
      </div>`;
  }
  if (scene.kind === "topic-check") {
    return `
      <div class="video-check-cards">
        <article class="is-warning"><span>!</span><small>EVITA ESTE ERROR</small><p>${escapeHtml(scene.mistake)}</p></article>
        <article class="is-success"><span>✓</span><small>COMPROBACIÓN FINAL</small><p>${escapeHtml(scene.check)}</p></article>
      </div>`;
  }
  if (scene.kind === "topic-recap") {
    const itemCount = Math.max(scene.items.length, 1);
    return `
      <div class="video-recap-wheel video-topic-recap-wheel">
        <div class="video-recap-center">${escapeHtml(scene.symbol)}</div>
        ${scene.items.map((item, index) => `<span style="--angle:${index * (360 / itemCount)}deg;--delay:${index}">${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="video-ready-message">¡Preparado para el reto!</div>`;
  }
  return `
    <div class="video-recap-wheel">
      <div class="video-recap-center">ℕ</div>
      <span style="--angle:0deg">Contar</span>
      <span style="--angle:60deg">Posición</span>
      <span style="--angle:120deg">Comparar</span>
      <span style="--angle:180deg">Sumar</span>
      <span style="--angle:240deg">Multiplicar</span>
      <span style="--angle:300deg">Prioridad</span>
    </div>
    <div class="video-ready-message">¡Preparado para el reto!</div>`;
}

function currentTopicPodcast() {
  const podcasts = window.TOPIC_PODCASTS?.[state.courseId] || [];
  if (!ESO_COURSE_IDS.includes(state.courseId)) return podcasts[state.topicIndex] || null;
  const course = courseById(state.courseId);
  const normalizedPodcastTitle = (value) => normalizeDisplayText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const expectedTitle = normalizedPodcastTitle(course.themes[state.topicIndex] || "");
  const semanticId = semanticTopicId(course, state.topicIndex);
  const semanticTitleAliases = {
    "1eso:fracciones-decimales": ["fracciones"]
  };
  const acceptedTitles = new Set([
    expectedTitle,
    ...(semanticTitleAliases[semanticId] || []).map(normalizedPodcastTitle)
  ]);
  return podcasts.find((podcast) => acceptedTitles.has(normalizedPodcastTitle(podcast?.title || ""))) || null;
}

function topicPodcastControlsHtml(course) {
  const podcast = currentTopicPodcast();
  const isBachillerato = course?.id?.includes("bach");
  if (isBachillerato && !podcast?.master) {
    return `
      <section class="topic-podcast-inline is-pending" id="topic-podcast-inline" aria-label="Escuchar explicación">
        <strong class="topic-podcast-inline-title">Escuchar explicación</strong>
        <p class="topic-podcast-pending" role="status">Audio Master pendiente</p>
      </section>`;
  }
  const versions = isBachillerato
    ? [{ level: "master", icon: "★", label: "Master" }]
    : [
        { level: "express", icon: "⚡", label: "Express" },
        { level: "master", icon: "★", label: "Master" }
      ];
  const versionButtons = versions.map(({ level, icon, label }) => {
    const available = Boolean(podcast?.[level]);
    const description = available
      ? (level === "master" ? "Audio completo" : "Audio breve")
      : "Próximamente";
    return `
      <button
        type="button"
        class="topic-podcast-inline-choice is-${level}"
        data-podcast-level="${level}"
        aria-pressed="false"
        onclick="playTopicPodcast('${level}')"
        ${available ? "" : "disabled"}
      >
        <span aria-hidden="true">${icon}</span>
        <strong>${label}</strong>
        <small>${description}</small>
      </button>`;
  }).join("");

  return `
    <section class="topic-podcast-inline" id="topic-podcast-inline" aria-label="Escuchar explicación">
      <strong class="topic-podcast-inline-title">Escuchar explicación</strong>
      <div class="topic-podcast-inline-options ${isBachillerato ? "is-master-only" : ""}" id="topic-podcast-intro">
        ${versionButtons}
      </div>
      <div class="topic-podcast-inline-player" id="topic-podcast-player" hidden></div>
    </section>`;
}

function openTopicPodcastSelector() {
  const controls = document.getElementById("topic-podcast-inline");
  controls?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  controls?.querySelector("button:not(:disabled)")?.focus();
}

function playTopicPodcast(level) {
  const podcast = currentTopicPodcast();
  const src = podcast?.[level];
  if (!src) return;
  if (topicPodcastAudio) {
    topicPodcastAudio.pause();
    topicPodcastAudio.removeAttribute("src");
  }
  const intro = document.getElementById("topic-podcast-intro");
  const player = document.getElementById("topic-podcast-player");
  if (!player) return;
  intro?.querySelectorAll("[data-podcast-level]").forEach((button) => {
    const selected = button.dataset.podcastLevel === level;
    button.classList.toggle("is-playing", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  player.hidden = false;
  player.innerHTML = `
    <div class="topic-podcast-now-playing">
      <span class="topic-podcast-cover" aria-hidden="true">${level === "master" ? "★" : "⚡"}</span>
      <div><small>Reproduciendo · ${level === "master" ? "Master" : "Express"}</small><strong>${escapeHtml(podcast.title)}</strong></div>
      <button type="button" class="topic-podcast-stop" onclick="stopTopicPodcastPlayback()" aria-label="Parar el audio">
        <span aria-hidden="true">■</span> Parar
      </button>
    </div>
    <audio id="topic-podcast-audio" controls preload="metadata" src="${escapeHtml(src)}">
      Tu navegador no puede reproducir este archivo de audio.
    </audio>`;
  topicPodcastAudio = document.getElementById("topic-podcast-audio");
  topicPodcastAudio?.play().catch(() => {});
}

function stopTopicPodcastPlayback() {
  if (topicPodcastAudio) {
    topicPodcastAudio.pause();
    topicPodcastAudio.currentTime = 0;
  }
  showTopicPodcastOptions();
}

function stopAllAppMedia() {
  if (topicPodcastAudio) {
    topicPodcastAudio.pause();
    topicPodcastAudio.removeAttribute("src");
    topicPodcastAudio.load?.();
  }
  topicPodcastAudio = null;
  document.querySelectorAll("audio, video").forEach((media) => media.pause?.());
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function showTopicPodcastOptions() {
  if (topicPodcastAudio) topicPodcastAudio.pause();
  const intro = document.getElementById("topic-podcast-intro");
  const player = document.getElementById("topic-podcast-player");
  intro?.querySelectorAll("[data-podcast-level]").forEach((button) => {
    button.classList.remove("is-playing");
    button.setAttribute("aria-pressed", "false");
  });
  if (player) {
    player.hidden = true;
    player.innerHTML = "";
  }
  topicPodcastAudio = null;
}

function closeTopicPodcast() {
  if (topicPodcastAudio) {
    topicPodcastAudio.pause();
    topicPodcastAudio.removeAttribute("src");
    topicPodcastAudio.load?.();
  }
  topicPodcastAudio = null;
  showTopicPodcastOptions();
}

function openTopicVideo() {
  const lesson = currentTopicVideoLesson();
  if (!lesson) return false;
  closeTopicVideo();
  stopSummarySpeech();
  topicVideoState = {
    lesson,
    sceneIndex: 0,
    paused: false,
    speaking: false,
    speechToken: 0
  };
  const modal = document.createElement("section");
  modal.id = "topic-video-modal";
  modal.className = "topic-video-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", `Vídeo explicativo: ${lesson.title}`);
  modal.innerHTML = `
    <header class="topic-video-header">
      <div><span>${escapeHtml(lesson.course)} · Vídeo explicativo</span><strong>${escapeHtml(lesson.title)}</strong></div>
      <div class="topic-video-header-actions"><span class="topic-video-duration">${escapeHtml(lesson.duration)}</span><button class="primary topic-video-close" onclick="closeTopicVideo()">Cerrar</button></div>
    </header>
    <main class="topic-video-main">
      <div class="topic-video-copy">
        <span class="topic-video-eyebrow" id="topic-video-eyebrow"></span>
        <h2 id="topic-video-title"></h2>
        <p class="topic-video-caption" id="topic-video-caption"></p>
        <div class="topic-video-takeaway" id="topic-video-takeaway"></div>
      </div>
      <div class="topic-video-stage" id="topic-video-stage" aria-live="polite"></div>
    </main>
    <footer class="topic-video-controls">
      <div class="topic-video-progress" id="topic-video-progress" style="--scene-count:${lesson.scenes.length}"></div>
      <div class="topic-video-buttons">
        <button class="ghost" id="topic-video-prev" onclick="previousTopicVideoScene()">Anterior</button>
        <button class="primary topic-video-play" id="topic-video-play" onclick="toggleTopicVideoPlayback()">Pausar</button>
        <button class="ghost" id="topic-video-replay" onclick="replayTopicVideoScene()">Repetir escena</button>
        <button class="secondary" id="topic-video-next" onclick="nextTopicVideoScene()">Siguiente</button>
      </div>
      <div class="topic-video-status" id="topic-video-status">Reproduciendo con voz y subtítulos</div>
    </footer>`;
  document.body.appendChild(modal);
  document.body.classList.add("topic-video-open");
  renderTopicVideoScene(true);
  return true;
}

function renderTopicVideoScene(autoplay = false) {
  if (!topicVideoState) return;
  const { lesson, sceneIndex } = topicVideoState;
  const scene = lesson.scenes[sceneIndex];
  const stage = document.getElementById("topic-video-stage");
  if (!stage || !scene) return;
  document.getElementById("topic-video-eyebrow").textContent = scene.eyebrow;
  document.getElementById("topic-video-title").textContent = scene.title;
  document.getElementById("topic-video-caption").textContent = scene.narration;
  document.getElementById("topic-video-takeaway").innerHTML = formatMathText(scene.takeaway);
  stage.dataset.scene = scene.kind;
  stage.innerHTML = topicVideoVisual(scene);
  document.getElementById("topic-video-progress").innerHTML = lesson.scenes.map((item, index) => `
    <button class="${index === sceneIndex ? "is-current" : ""} ${index < sceneIndex ? "is-viewed" : ""}" onclick="goToTopicVideoScene(${index})" aria-label="Ir a la escena ${index + 1}"><span></span><small>${index + 1}</small></button>
  `).join("");
  document.getElementById("topic-video-prev").disabled = sceneIndex === 0;
  const next = document.getElementById("topic-video-next");
  next.textContent = sceneIndex === lesson.scenes.length - 1 ? "Volver al reto" : "Siguiente";
  topicVideoState.paused = false;
  topicVideoState.speaking = false;
  updateTopicVideoControls();
  if (autoplay) requestAnimationFrame(() => speakTopicVideoScene());
}

function preferredSpanishFemaleVoice() {
  if (!("speechSynthesis" in window)) return null;
  const femaleNames = ["elvira", "helena", "dalia", "laura", "sabina", "mónica", "monica", "paulina", "luciana", "paloma", "isabela", "soledad"];
  const maleNames = ["álvaro", "alvaro", "jorge", "pablo", "raúl", "raul", "diego", "antonio"];
  const spanishVoices = window.speechSynthesis.getVoices().filter((voice) => voice.lang?.toLowerCase().startsWith("es"));
  return spanishVoices
    .map((voice) => {
      const name = voice.name.toLowerCase();
      let score = voice.lang.toLowerCase() === "es-es" ? 35 : 10;
      if (name.includes("natural")) score += 120;
      if (name.includes("online")) score += 30;
      if (name.includes("elvira")) score += 45;
      if (femaleNames.some((hint) => name.includes(hint))) score += 80;
      if (maleNames.some((hint) => name.includes(hint))) score -= 100;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score)[0]?.voice || null;
}

function speakTopicVideoScene() {
  if (!topicVideoState) return;
  const scene = topicVideoState.lesson.scenes[topicVideoState.sceneIndex];
  const status = document.getElementById("topic-video-status");
  if (!("speechSynthesis" in window)) {
    if (status) status.textContent = "La voz no está disponible; puedes avanzar con los controles.";
    return;
  }
  topicVideoState.speechToken += 1;
  const token = topicVideoState.speechToken;
  window.speechSynthesis.cancel();
  if (status) status.textContent = "Preparando una voz femenina más natural…";
  let started = false;
  const beginNarration = () => {
    if (started || !topicVideoState || topicVideoState.speechToken !== token) return;
    started = true;
    const naturalText = `${scene.title}. ${scene.narration}`
      .replace(/;\s*/g, ". ")
      .replace(/:\s*/g, ", ");
    const utterance = new SpeechSynthesisUtterance(naturalText);
    utterance.lang = "es-ES";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.volume = 1;
    const spanishFemaleVoice = preferredSpanishFemaleVoice();
    if (spanishFemaleVoice) utterance.voice = spanishFemaleVoice;
    topicVideoState.utterance = utterance;
    topicVideoState.speaking = true;
    topicVideoState.paused = false;
    updateTopicVideoControls();
    if (status) status.textContent = "Reproduciendo con voz femenina y subtítulos";
    utterance.onend = () => {
      if (!topicVideoState || topicVideoState.speechToken !== token) return;
      topicVideoState.speaking = false;
      updateTopicVideoControls();
      if (topicVideoState.sceneIndex < topicVideoState.lesson.scenes.length - 1) {
        topicVideoState.sceneIndex += 1;
        renderTopicVideoScene(true);
      } else {
        const finalStatus = document.getElementById("topic-video-status");
        if (finalStatus) finalStatus.textContent = "Explicación terminada. Puedes repetir una escena o volver al reto.";
      }
    };
    utterance.onerror = () => {
      if (!topicVideoState || topicVideoState.speechToken !== token) return;
      topicVideoState.speaking = false;
      updateTopicVideoControls();
    };
    window.speechSynthesis.speak(utterance);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    beginNarration();
  } else {
    window.speechSynthesis.addEventListener?.("voiceschanged", beginNarration, { once: true });
    window.setTimeout(beginNarration, 450);
  }
}

function updateTopicVideoControls() {
  if (!topicVideoState) return;
  const play = document.getElementById("topic-video-play");
  const status = document.getElementById("topic-video-status");
  if (play) play.textContent = topicVideoState.paused ? "Continuar" : topicVideoState.speaking ? "Pausar" : "Escuchar escena";
  if (status && topicVideoState.speaking) status.textContent = topicVideoState.paused ? "Vídeo en pausa" : "Reproduciendo con voz y subtítulos";
}

function toggleTopicVideoPlayback() {
  if (!topicVideoState || !("speechSynthesis" in window)) return;
  if (!topicVideoState.speaking) {
    speakTopicVideoScene();
    return;
  }
  if (topicVideoState.paused) {
    window.speechSynthesis.resume();
    topicVideoState.paused = false;
  } else {
    window.speechSynthesis.pause();
    topicVideoState.paused = true;
  }
  updateTopicVideoControls();
}

function stopTopicVideoSpeech() {
  if (!topicVideoState) return;
  topicVideoState.speechToken += 1;
  topicVideoState.speaking = false;
  topicVideoState.paused = false;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function goToTopicVideoScene(index) {
  if (!topicVideoState) return;
  const nextIndex = Math.max(0, Math.min(index, topicVideoState.lesson.scenes.length - 1));
  stopTopicVideoSpeech();
  topicVideoState.sceneIndex = nextIndex;
  renderTopicVideoScene(true);
}

function previousTopicVideoScene() {
  if (!topicVideoState || topicVideoState.sceneIndex === 0) return;
  goToTopicVideoScene(topicVideoState.sceneIndex - 1);
}

function nextTopicVideoScene() {
  if (!topicVideoState) return;
  if (topicVideoState.sceneIndex >= topicVideoState.lesson.scenes.length - 1) {
    closeTopicVideo();
    return;
  }
  goToTopicVideoScene(topicVideoState.sceneIndex + 1);
}

function replayTopicVideoScene() {
  if (!topicVideoState) return;
  stopTopicVideoSpeech();
  renderTopicVideoScene(true);
}

function closeTopicVideo() {
  if (topicVideoState) stopTopicVideoSpeech();
  document.getElementById("topic-video-modal")?.remove();
  document.body?.classList.remove("topic-video-open");
  topicVideoState = null;
  const speakButton = document.getElementById("speak-summary-btn");
  if (speakButton) speakButton.textContent = "Escuchar explicación";
}

function stopSummarySpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  summaryUtterance = null;
  const stopButton = document.getElementById("stop-summary-btn");
  if (stopButton) stopButton.style.display = "none";
  const speakButton = document.getElementById("speak-summary-btn");
  if (speakButton) speakButton.textContent = "Escuchar explicación";
}

function speakSummary() {
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  if (openTopicVideo()) return;
  const explanation = topicExplanation(theme, course);
  const esoInfo = esoTopicInfo(course, state.topicIndex);
  if (esoInfo?.error) {
    alert(esoInfo.error);
    return;
  }
  const esoPart = esoInfo?.summary ? `Resumen extraido del libro: ${esoInfo.summary.replace(/-\s*/g, "")}` : "";
  const bookText = bookExplanationFor(course, state.topicIndex);
  const bookPart = bookText ? `Explicación del libro: ${bookText.slice(0, 1800)}` : "";
  const text = esoPart
    ? `Tema ${theme}, de ${courseDisplayName(course)}. ${esoPart}`
    : `Tema ${theme}, de ${courseDisplayName(course)}. ${explanation.summary} ${explanation.intro} ${explanation.steps.map((step) => `${step.title}: ${step.body}`).join(" ")} ${explanation.check} ${bookPart}`;
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no tiene lectura en voz alta disponible.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.96;
  summaryUtterance = utterance;
  const stopButton = document.getElementById("stop-summary-btn");
  if (stopButton) stopButton.style.display = "block";
  const speakButton = document.getElementById("speak-summary-btn");
  if (speakButton) speakButton.textContent = "Reiniciar explicación";
  const finishSpeaking = () => {
    if (summaryUtterance !== utterance) return;
    summaryUtterance = null;
    if (stopButton) stopButton.style.display = "none";
    if (speakButton) speakButton.textContent = "Escuchar explicación";
  };
  utterance.onend = finishSpeaking;
  utterance.onerror = finishSpeaking;
  window.speechSynthesis.speak(utterance);
}

function nextQuestion() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const theme = course.themes[state.topicIndex];
  const questions = buildQuestions(theme, course);

  if (state.questionIndex >= questions.length - 1) {
    saveReport();
    renderResult();
    return;
  }

  state.questionIndex += 1;
  state.answered = false;
  state.multipartResponses = [];
  state.timeLeft = questionSecondsFor(course);
  renderStudy();
}

function renderResult() {
  clearQuestionTimer();
  const course = courseById(state.courseId);
  const eso = isEsoCourse(course);
  const activeBlock = state.blockKey
    ? (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === state.blockKey)
    : null;
  const theme = activeBlock?.label || course.themes[state.topicIndex];
  const backToTopicsAction = BACH_II_COURSE_IDS.includes(course.id) && state.blockKey
    ? "renderBachBlockSelector()"
    : "renderDashboard()";
  const correct = state.sessionAnswers.filter((answer) => answer.correct).length;
  const total = state.sessionAnswers.length;
  const medal = correct === total ? "Oro" : correct >= Math.ceil(total * 0.7) ? "Plata" : "Bronce";
  const challengeLevel = topicChallengeLevelLabel();
  const reviewItems = state.sessionAnswers
    .filter((answer) => !answer.correct)
    .map((answer) => `
      <article class="review-item">
        <strong>${escapeHtml(answer.timedOut ? "Tiempo agotado" : "Respuesta incorrecta")}</strong>
        <p>${formatMathText(answer.question)}</p>
        <small>${formatSolutionText(answer.solution || "Vuelve a leer el resumen del tema y repasa el procedimiento paso a paso.")}</small>
      </article>
    `).join("");

  renderShell(`
    <section class="screen-panel" style="width:min(760px,100%);margin:0 auto;text-align:center">
      <h1 class="headline">Medalla de ${medal}</h1>
      <p class="subhead">${escapeHtml(state.student.name)} ha terminado ${escapeHtml(theme)} en ${escapeHtml(courseDisplayName(course))}.</p>
      <div class="badge-row" style="justify-content:center">
        <span class="badge">Aciertos: ${correct}/${total}</span>
        <span class="badge">Puntos: ${state.score}</span>
        <span class="badge">Medalla: ${medal}</span>
        ${eso ? `<span class="badge challenge-level-${state.topicChallengeLevel}">Nivel: ${challengeLevel}</span>` : ""}
      </div>
      <div class="topic-actions" style="justify-content:center;margin-top:18px">
        <button class="primary" style="max-width:360px" onclick="repeatTopic()">Repetir${eso ? ` nivel ${challengeLevel}` : ""} con ejercicios distintos</button>
        <button class="ghost" onclick="${backToTopicsAction}">${activeBlock ? "Elegir otro bloque" : "Elegir otro tema"}</button>
      </div>
      ${reviewItems ? `
        <div class="result-review">
          <h2>Ayuda del reto</h2>
          ${reviewItems}
        </div>
      ` : ""}
    </section>
  `);
  burstSparkles(34);
}

function saveReport() {
  const reports = readReports();
  const course = courseById(state.courseId);
  const activeBlock = state.blockKey
    ? (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === state.blockKey)
    : null;
  const theme = activeBlock?.label || course.themes[state.topicIndex];
  const correct = state.sessionAnswers.filter((answer) => answer.correct).length;
  reports.push({
    date: new Date().toLocaleString("es-ES"),
    academicYear: state.academicYear || DEFAULT_ACADEMIC_YEAR,
    student: state.student.name,
    group: state.student.groupLabel || state.student.group,
    course: courseDisplayName(course),
    theme,
    challengeLevel: isEsoCourse(course) ? topicChallengeLevelLabel() : "",
    score: state.score,
    correct,
    total: state.sessionAnswers.length
  });
  localStorage.setItem(REPORT_KEY, JSON.stringify(reports));
}

function readReports() {
  try {
    return JSON.parse(localStorage.getItem(REPORT_KEY) || "[]");
  } catch {
    return [];
  }
}

function reportAcademicYear(report) {
  return report.academicYear || DEFAULT_ACADEMIC_YEAR;
}

function availableAcademicYears() {
  const years = new Set(ACADEMIC_YEARS);
  readReports().forEach((report) => years.add(reportAcademicYear(report)));
  const [start] = DEFAULT_ACADEMIC_YEAR.split("-").map(Number);
  years.add(`${start - 1}-${start}`);
  years.add(`${start + 1}-${start + 2}`);
  return [...years].sort().reverse();
}

function reportsByAcademicYear(year = state.adminYear) {
  return readReports().filter((report) => reportAcademicYear(report) === year);
}

function groupOptions(year = state.adminYear) {
  return students
    .filter((student) => student.academicYear === year)
    .map((student) => ({
      value: `${student.courseId}__${student.group}`,
      label: student.groupLabel || `${courseDisplayName(student.courseId)} ${student.group}`,
      courseId: student.courseId,
      group: student.group
    }))
    .filter((item, index, list) => list.findIndex((candidate) => candidate.value === item.value) === index);
}

function selectedAdminGroup() {
  const options = groupOptions(state.adminYear);
  const value = state.adminGroup || options[0]?.value || "";
  return options.find((option) => option.value === value) || options[0] || null;
}

function studentAttemptSummary(student, reports) {
  const groupLabel = student.groupLabel || `${courseDisplayName(student.courseId)} ${student.group}`;
  const entries = reports.filter((report) => report.student === student.name && report.group === groupLabel);
  const best = entries.reduce((max, report) => Math.max(max, Number(report.score) || 0), 0);
  const last = entries[entries.length - 1];
  return {
    student: student.name,
    group: groupLabel,
    attempts: entries.length,
    best,
    lastTheme: last?.theme || "-",
    lastDate: last?.date || "-"
  };
}

function medalCount() {
  if (!state.student) return 0;
  return readReports().filter((report) =>
    report.student === state.student.name &&
    report.group === (state.student.groupLabel || state.student.group) &&
    reportAcademicYear(report) === (state.academicYear || DEFAULT_ACADEMIC_YEAR)
  ).length;
}

function renderAdmin() {
  const years = availableAcademicYears();
  state.adminYear = state.adminYear || years[0] || DEFAULT_ACADEMIC_YEAR;
  state.adminMode = state.adminMode || "all";
  const reports = reportsByAcademicYear(state.adminYear);
  const yearOptions = years
    .map((year) => `<option value="${year}" ${year === state.adminYear ? "selected" : ""}>${year}</option>`)
    .join("");
  const modePanel = renderAdminModePanel(reports);

  renderShell(`
    <section class="screen-panel" style="width:min(1160px,100%);margin:0 auto">
      <div class="workspace-head">
        <div>
          <h1>Panel del profesor</h1>
          <div class="small">Informes locales guardados por año académico.</div>
        </div>
        <div class="topic-actions">
          <button class="secondary" onclick="downloadReports()">Descargar CSV</button>
          <button class="ghost" onclick="publicLogout()">Salir</button>
        </div>
      </div>
      <div class="admin-toolbar">
        <div class="field admin-year-field">
          <label for="admin-year">Año académico</label>
          <select id="admin-year" onchange="setAdminYear(this.value)">${yearOptions}</select>
        </div>
        <button class="${state.adminMode === "group" ? "secondary" : "ghost"}" onclick="showAdminGroup()">Elegir grupo</button>
        <button class="${state.adminMode === "student" ? "secondary" : "ghost"}" onclick="showAdminStudent()">Buscar alumno</button>
        <button class="${state.adminMode === "all" ? "secondary" : "ghost"}" onclick="showAdminAll()">Alumnos con reto</button>
        <button class="${state.adminMode === "manage" ? "secondary" : "ghost"}" onclick="showAdminManage()">Listas y claves</button>
      </div>
      ${modePanel}
    </section>
  `, true);
}

function renderAdminModePanel(reports) {
  if (state.adminMode === "group") return renderAdminGroupPanel(reports);
  if (state.adminMode === "student") return renderAdminStudentPanel(reports);
  if (state.adminMode === "manage") return renderAdminManagePanel();
  return renderAdminAllPanel(reports);
}

function renderAdminGroupPanel(reports) {
  const options = groupOptions(state.adminYear);
  const selected = selectedAdminGroup();
  const selectedValue = selected?.value || "";
  const selectHtml = options
    .map((option) => `<option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
    .join("");
  const groupStudents = selected
    ? students.filter((student) => student.academicYear === state.adminYear && student.courseId === selected.courseId && student.group === selected.group)
    : [];
  const rows = groupStudents.length
    ? groupStudents.map((student) => {
      const summary = studentAttemptSummary(student, reports);
      return `
        <tr>
          <td>${escapeHtml(summary.student)}</td>
          <td>${escapeHtml(summary.group)}</td>
          <td>${summary.attempts}</td>
          <td>${summary.best}</td>
          <td>${escapeHtml(summary.lastTheme)}</td>
          <td>${escapeHtml(summary.lastDate)}</td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="6">No hay alumnos en este grupo.</td></tr>`;

  return `
    <div class="admin-section">
      <div class="field admin-filter">
        <label for="admin-group">Grupo</label>
        <select id="admin-group" onchange="setAdminGroup(this.value)">${selectHtml}</select>
      </div>
      <table class="admin-table">
        <thead>
          <tr><th>Alumno</th><th>Grupo</th><th>Retos hechos</th><th>Mejor puntuación</th><th>Último tema</th><th>Última sesión</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderAdminStudentPanel(reports) {
  const query = state.adminStudentQuery || "";
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? reports.filter((report) => report.student.toLowerCase().includes(normalizedQuery))
    : [];
  const rows = matches.length
    ? matches.map((report) => adminReportRow(report)).join("")
    : `<tr><td colspan="8">${normalizedQuery ? "No hay resultados para ese alumno en este año." : "Escribe parte del nombre del alumno y pulsa Buscar."}</td></tr>`;

  return `
    <div class="admin-section">
      <div class="admin-search">
        <div class="field admin-filter">
          <label for="admin-student-query">Alumno</label>
          <input id="admin-student-query" value="${escapeHtml(query)}" placeholder="Nombre del alumno" />
        </div>
        <button class="secondary" onclick="searchAdminStudent()">Buscar</button>
      </div>
      <table class="admin-table">
        <thead>
          <tr><th>Fecha</th><th>Año</th><th>Alumno</th><th>Grupo</th><th>Curso</th><th>Tema</th><th>Aciertos</th><th>Puntos</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderAdminAllPanel(reports) {
  const summaries = [];
  const seen = new Set();
  reports.forEach((report) => {
    const key = `${report.student}__${report.group}`;
    if (seen.has(key)) return;
    seen.add(key);
    const entries = reports.filter((item) => item.student === report.student && item.group === report.group);
    const best = entries.reduce((max, item) => Math.max(max, Number(item.score) || 0), 0);
    const last = entries[entries.length - 1];
    summaries.push({ student: report.student, group: report.group, attempts: entries.length, best, lastTheme: last.theme, lastDate: last.date });
  });

  const rows = summaries.length
    ? summaries.map((summary) => `
      <tr>
        <td>${escapeHtml(summary.student)}</td>
        <td>${escapeHtml(summary.group)}</td>
        <td>${summary.attempts}</td>
        <td>${summary.best}</td>
        <td>${escapeHtml(summary.lastTheme)}</td>
        <td>${escapeHtml(summary.lastDate)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6">Todavía no hay alumnos con retos en este año académico.</td></tr>`;

  return `
    <div class="admin-section">
      <table class="admin-table">
        <thead>
          <tr><th>Alumno</th><th>Grupo</th><th>Retos hechos</th><th>Mejor puntuación</th><th>Último tema</th><th>Última sesión</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function adminReportRow(report) {
  return `
    <tr>
      <td>${escapeHtml(report.date)}</td>
      <td>${escapeHtml(reportAcademicYear(report))}</td>
      <td>${escapeHtml(report.student)}</td>
      <td>${escapeHtml(report.group)}</td>
      <td>${escapeHtml(report.course)}</td>
      <td>${escapeHtml(report.theme)}</td>
      <td>${report.correct}/${report.total}</td>
      <td>${report.score}</td>
    </tr>
  `;
}

function renderAdminManagePanel() {
  const rows = students
    .filter((student) => student.academicYear === state.adminYear)
    .map((student) => {
      const course = courseById(student.courseId);
      const stage = isEsoCourse(course) ? "ESO: estudio + aventura" : "Bachillerato: solo estudio";
      return `
        <tr>
          <td>${escapeHtml(student.academicYear)}</td>
          <td>${escapeHtml(courseDisplayName(course))}</td>
          <td>${escapeHtml(student.groupLabel || student.group)}</td>
          <td>${escapeHtml(student.name)}</td>
          <td><code>${escapeHtml(student.password)}</code></td>
          <td>${stage}</td>
        </tr>
      `;
    }).join("");

  return `
    <div class="admin-section">
      <div class="teacher-prep">
        <article><strong>Gestion preparada</strong><span>Crear anos academicos, cursos, grupos y alumnos se puede alimentar ampliando las listas de datos.</span></article>
        <article><strong>Seguimiento</strong><span>Los informes separan ano, curso, grupo, alumno, tema, modo, aciertos y puntos.</span></article>
        <article><strong>Desbloqueos</strong><span>La aventura guarda temas desbloqueados, jefes derrotados, XP, monedas y logros por alumno.</span></article>
      </div>
      <table class="admin-table">
        <thead>
          <tr><th>Ano</th><th>Curso</th><th>Grupo</th><th>Alumno</th><th>Clave</th><th>Ruta</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function setAdminYear(year) {
  state.adminYear = year;
  renderAdmin();
}

function showAdminGroup() {
  state.adminMode = "group";
  state.adminGroup = state.adminGroup || groupOptions(state.adminYear)[0]?.value || "";
  renderAdmin();
}

function showAdminStudent() {
  state.adminMode = "student";
  renderAdmin();
}

function showAdminAll() {
  state.adminMode = "all";
  renderAdmin();
}

function showAdminManage() {
  state.adminMode = "manage";
  renderAdmin();
}

function setAdminGroup(value) {
  state.adminGroup = value;
  renderAdmin();
}

function searchAdminStudent() {
  state.adminStudentQuery = document.getElementById("admin-student-query").value;
  renderAdmin();
}

function downloadReports() {
  const reports = reportsByAcademicYear(state.adminYear);
  const headers = ["Fecha", "Año académico", "Alumno", "Grupo", "Curso", "Tema", "Aciertos", "Total", "Puntos"];
  const csv = [
    headers.join(";"),
    ...reports.map((report) => [
      report.date,
      reportAcademicYear(report),
      report.student,
      report.group,
      report.course,
      report.theme,
      report.correct,
      report.total,
      report.score
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(";"))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `informes-margarita-salas-${state.adminYear}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function burstSparkles(count = 22) {
  const root = document.getElementById("sparkles");
  const centerX = window.innerWidth * 0.5;
  const centerY = window.innerHeight * 0.42;
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count;
    const distance = 80 + Math.random() * 150;
    spark.className = "spark";
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.background = ["#f6b73c", "#f0183f", "#00a878", "#1457b8"][i % 4];
    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    root.appendChild(spark);
    setTimeout(() => spark.remove(), 820);
  }
}

function showAdminHint() {
  alert("Acceso profesor: escribe la contraseña de administrador en la pantalla inicial.");
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") renderAdminLogin();
  if (event.key === "Escape") closeAvatarDropdowns();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest?.(".avatar-visual-select")) closeAvatarDropdowns();
});

window.addEventListener("pagehide", stopAllAppMedia);
window.addEventListener("beforeunload", stopAllAppMedia);
stopAllAppMedia();
window.addEventListener("load", () => window.bootstrapPublicAuth?.());






