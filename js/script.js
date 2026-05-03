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

        // Ejecutar animación con un pequeño retraso extra para que el ojo se fije en el título
        setTimeout(() => {
          const isDarkNow = document.body.classList.contains("dark");
          updateTitleAnimation(isDarkNow);
        }, 500);
      }, 600);
    } else {
      document.body.classList.remove("loading");
      setTimeout(() => {
        const isDarkNow = document.body.classList.contains("dark");
        updateTitleAnimation(isDarkNow);
      }, 500);
    }
  }, 1200);

  applyTheme(true);
});

function updateTitleAnimation(isDark) {
  const title = document.getElementById("main-title");
  if (!title) return;

  // eliminar todas las posibles clases de animación anteriores
  title.classList.remove(
    "animate__animated",
    "animate__pulse",
    "animate__hinge",
    "animate__flash",
    "animate__infinite",
    "flicker-animation"
  );

  // reiniciar el flujo para que la animación vuelva a empezar
  void title.offsetWidth;

  // aplicar según modo
  if (isDark) {
    // Usamos nuestra animación personalizada de parpadeo para el modo oscuro
    title.classList.add("flicker-animation");
  } else {
    // En modo claro usamos 'pulse' infinito de Animate.css
    title.classList.add("animate__animated", "animate__pulse", "animate__infinite");
  }
}

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
    },
    surprise: "img/mind-flayer-stranger-things.gif"
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
    },
    surprise: "img/vecna-stranger-things.gif"
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
      light: "Bases de datos relacionales<br>Lógica computacional<br>Debugging de código avanzado<br>Estructuración de APIs seguras",
      dark: "Rastreo de datos corruptos<br>Detección de patrones anómalos<br>Filtrado de ruido digital<br>Extracción de información en el vacío"
    },
    surprise: "img/stranger-things-demogorgon.gif"
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
      light: "Análisis estadístico avanzado<br>Lógica de sistemas<br>Interpretación de datos masivos<br>Visualización de la información",
      dark: "Decodificación de señales entrópicas<br>Pensamiento abstracto extremo<br>Traducción de lenguajes del abismo<br>Identificación de brechas interdimensionales"
    },
    surprise: "img/giphy.gif"
  }
};

/* Tema */
function applyTheme(skipAnimation = false) {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(isDark ? "dark" : "light");

  updateProfile(isDark);
  updateCardImages(isDark);
  if (!skipAnimation) updateTitleAnimation(isDark);
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
    updateTitleAnimation(isDark);
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

//Animación Sorpresa
const profileImg = document.getElementById("profile-img");

function getCurrentProfile() {
  return profileImg.dataset.profile;
}
const btn = document.getElementById("surprise-btn-id");
const profileInfo = document.querySelector(".profile-info");

let isShowingSurprise = false;
const originalContent = profileInfo.innerHTML;

btn.addEventListener("click", () => {
  const currentProfile = getCurrentProfile();
  const surpriseImg = profiles[currentProfile].surprise;

  if (!isShowingSurprise) {
    profileInfo.innerHTML = `
      <div class="surprise-container">
        <img src="${surpriseImg}" alt="surprise" />
      </div>
    `;

    btn.textContent = "Cerrar sorpresa";
    isShowingSurprise = true;
  } else {
    profileInfo.innerHTML = originalContent;

    btn.textContent = "¡Sorpresa!";
    isShowingSurprise = false;
  }
});