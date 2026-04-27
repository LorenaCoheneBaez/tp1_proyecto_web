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


/* =========================
   DATOS DE PERFILES
========================= */
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
      light: "Carismático y resolutivo, se encarga de que todo funcione como debería.",
      dark: "Carismático y resiliente, enfrenta fallas ocultas y detecta Demobugs."
    },
    skills: {
      light: "Observación<br>Trabajo en equipo<br>Reacción rápida<br>Resolución de conflictos",
      dark: "Instinto de supervivencia<br>Detección de anomalías<br>Trabajo bajo presión"
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
      light: "Creativa, directa y con personalidad fuerte.",
      dark: "Indomable y desafiante, rompe reglas visuales."
    },
    skills: {
      light: "Pensamiento creativo<br>Atención al detalle<br>Adaptabilidad",
      dark: "Manipulación de interfaces<br>Precisión en caos"
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


/* =========================
   TEMA
========================= */
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(isDark ? "dark" : "light");

  updateProfile(isDark);
}


/* =========================
   PERFIL
========================= */
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

  if (role) role.innerHTML = `<strong>Rol:</strong> ${profile.role[mode]}`;
  if (quote) quote.textContent = profile.quote[mode];
  if (desc) desc.innerHTML = `<strong>Perfil:</strong> ${profile.desc[mode]}`;
  if (skills) skills.innerHTML = `<strong>Habilidades:</strong><br>${profile.skills[mode]}`;
}


/* =========================
   CAMBIO DIMENSIÓN
========================= */
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
  });
}


/* =========================
   🧭 CARDS
========================= */
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


/* =========================
   📱 MENÚ
========================= */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
