document.addEventListener("DOMContentLoaded", () => {

  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  const loader = document.getElementById("loader");
  const loaderDark = document.getElementById("loader-dark");

  if (loader && loaderDark) {
    loader.style.display = "none";
    loaderDark.style.display = "none";

    if (isDark) loaderDark.style.display = "flex";
    else loader.style.display = "flex";
  }

  const activeLoader = isDark ? loaderDark : loader;

  setTimeout(() => {
    if (activeLoader) {
      activeLoader.style.opacity = "0";

      setTimeout(() => {
        activeLoader.style.display = "none";
        document.body.classList.remove("loading");
      }, 600);
    } else {
      document.body.classList.remove("loading");
    }
  }, 1200);

  applyTheme();
});

/* Datos de los perfiles */
const profiles = {
  steve: {
    img: {
      light: "img/img_card_steve_profile_light.png",
      dark: "img/img_card_steve_profile_dark.jpg"
    },
    role: {
      light: "QA-Tester/Ciberseguridad",
      dark: "Monster Hunter"
    },
    quote: {
      light: '"Si algo puede fallar, lo voy a encontrar primero"',
      dark: '"Puede que no sea perfecto, pero soy el que mantiene todo bajo control"'
    },
    desc: {
      light: "Carismático y resolutivo, se encarga de que todo funcione como debería. Detecta bugs antes de que lleguen al usuario y asegura la calidad del producto final",
      dark: "Carismático y resiliente, enfrenta fallas ocultas y detecta Demobugs antes de que emerjan, protegiendo la estabilidad del entorno y evitando que el caos se propague."
    },
    skills: {
      light: "Observación detallada de sistemas y flujos<br>Detección y análisis de vulnerabilidades<br>Reacción rápida ante errores críticos<br>Validación de seguridad y calidad del softwar",
      dark: "Instinto de supervivencia ante errores críticos<br>Detección de anomalías ocultas<br>Trabajo en equipo bajo presión extrema<br>Reacción inmediata ante amenazas del sistema"
    }
  },

  max: {
    img: {
      light: "img/img_card_max_profile_light.png",
      dark: "img/img_card_max_profile_dark.png"
    },
    role: {
      light: "Front-end Developer",
      dark: "Reality Breaker"
    },
    quote: {
      light: '"No diseño por estética, diseño para vivirlo"',
      dark: '"No quiero morir. No estoy lista"'
    },
    desc: {
      light: "Creativa, directa y con personalidad fuerte, transforma ideas en interfaces modernas e intuitivas. Le encanta romper estructuras tradicionales y darle al usuario una experiencia visual única",
      dark: "Indomable y desafiante, rompe reglas visuales. Moldea interfaces que desafían la lógica y alteran la percepción. Lo visual ya no es solo diseño: es una ilusión controlada donde cada detalle puede atraer… o perder al usuario en la oscuridad"
    },
    skills: {
      light: "Pensamiento creativo<br>Atención al detalle<br>Optimización de interfaces<br>Experiencia de Usuario (UX)",
      dark: "Manipulación de interfaces en entornos inestables<br>Precisión visual en escenarios caóticos<br>Detección de errores en sistemas corruptos<br>Adaptación a realidades cambiantes"
    }
  },

  nancy: {
    img: {
      light: "img/img_card_nancy_profile_light.png",
      dark: "img/img_card_nancy_profile_dark.png"
    },
    role: {
      light: "Back-end Developer",
      dark: "Data Hunter"
    },
    quote: {
      light: '"La lógica siempre tiene una respuesta"',
      dark: '"Nada se esconde para siempre"'
    },
    desc: {
      light: "Analítica y estructurada, domina la lógica del sistema.",
      dark: "Busca patrones ocultos en la oscuridad del código."
    },
    skills: {
      light: "Bases de datos<br>Lógica<br>Debugging",
      dark: "Rastreo de datos<br>Detección de patrones"
    }
  },

  robin: {
    img: {
      light: "img/img_card_robin_profile_light.png",
      dark: "img/img_card_robin_profile_dark.png"
    },
    role: {
      light: "Data Analyst",
      dark: "Code Breaker"
    },
    quote: {
      light: '"Todo es un patrón si sabes mirar"',
      dark: '"Los códigos siempre hablan"'
    },
    desc: {
      light: "Rápida mentalmente, analiza y conecta información.",
      dark: "Descifra códigos ocultos en el Upside Down."
    },
    skills: {
      light: "Análisis<br>Lógica<br>Interpretación",
      dark: "Decodificación<br>Pensamiento abstracto"
    },
  }
};

/* Tema */
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(isDark ? "dark" : "light");

  updateProfile(isDark);
  updateCardImages(isDark);
}

/* Perfiles */
function updateProfile(isDark) {
  const profileImg = document.getElementById("profile-img");
  if (!profileImg) return;

  const profileType = profileImg.dataset.profile;
  const profile = profiles[profileType];
  if (!profile) return;

  const mode = isDark ? "dark" : "light";

  profileImg.src = profile.img[mode];

  const role = document.getElementById("profile-role");
  const quote = document.getElementById("profile-quote");
  const desc = document.getElementById("profile-desc");
  const skills = document.getElementById("profile-skills");

  if (role) role.innerHTML = `${profile.role[mode]}`;
  if (quote) quote.textContent = profile.quote[mode];
  if (desc) desc.innerHTML = `${profile.desc[mode]}`;
  if (skills) skills.innerHTML = `${profile.skills[mode]}`;
}

/* Cambia imágenes de las tarjetas */
function updateCardImages(isDark) {
  const cardImages = document.querySelectorAll('.card-image img');
  cardImages.forEach(img => {
    const lightSrc = img.dataset.light;
    const darkSrc = img.dataset.dark;
    if (lightSrc && darkSrc) {
      img.src = isDark ? darkSrc : lightSrc;
    }
  });
}

/* Cambia dimension */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle && themeIcon) {

  const savedTheme = localStorage.getItem("theme");

  themeIcon.src = savedTheme === "dark"
    ? "img/btn_down.png"
    : "img/btn_up.png";

  themeToggle.addEventListener("click", () => {

    const body = document.body;
    const isDark = body.classList.toggle("dark");
    body.classList.toggle("light");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeIcon.src = isDark
      ? "img/btn_down.png"
      : "img/btn_up.png";

    updateProfile(isDark);
    updateCardImages(isDark);
  });
}

/* Cards */
document.querySelectorAll('.card[data-link]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.location.href = card.dataset.link;
  });
});

document.querySelectorAll('.card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const link = card?.dataset.link;
    if (link) window.location.href = link;
  });
});

/* Menu */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
