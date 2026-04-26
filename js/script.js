document.addEventListener("DOMContentLoaded", () => {

  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  const loader = document.getElementById("loader");
  const loaderDark = document.getElementById("loader-dark");

  if (loader && loaderDark) {
    loader.style.display = "none";
    loaderDark.style.display = "none";

    if (isDark) {
      loaderDark.style.display = "flex";
    } else {
      loader.style.display = "flex";
    }
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
  }, 2000);

  applyTheme();
});

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(isDark ? "dark" : "light");

  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = isDark
      ? "img/img_card_max_profile_dark.png"
      : "img/img_card_max_profile_light.png";
  }

  updateProfileText(isDark);
}

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle && themeIcon) {

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    themeIcon.src = "img/btn_down.png";
  } else {
    themeIcon.src = "img/btn_up.png";
  }

  const backBtnImg = document.querySelector('.back-btn img');
  if (backBtnImg) {
    backBtnImg.src = savedTheme === "dark"
      ? "img/btn_back_dark.png"
      : "img/btn_back_light.png";
  }

  themeToggle.addEventListener("click", () => {

    const body = document.body;
    const isDark = body.classList.toggle("dark");
    body.classList.toggle("light");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeIcon.src = isDark
      ? "img/btn_down.png"
      : "img/btn_up.png";

    const backBtnImg = document.querySelector('.back-btn img');
    if (backBtnImg) {
      backBtnImg.src = isDark
        ? "img/btn_back_dark.png"
        : "img/btn_back_light.png";
    }

    const cardImages = document.querySelectorAll('.card-image img');
    if (cardImages.length > 0) {
      const light = ['img/max_light.png', 'img/nancy_light.png', 'img/steve_light.png', 'img/robin_light.png'];
      const dark = ['img/max_dark.png', 'img/nancy_dark.png', 'img/steve_dark.png', 'img/robin_dark.png'];
      const imgs = isDark ? dark : light;
      cardImages.forEach((img, index) => {
        img.src = imgs[index] || img.src;
      });
    }

    const profileImg = document.getElementById("profile-img");
    if (profileImg) {
      profileImg.src = isDark
        ? "img/img_card_max_profile_dark.png"
        : "img/img_card_max_profile_light.png";
    }

    updateProfileText(isDark);

  });

}

function updateProfileText(isDark) {
  const quote = document.getElementById("profile-quote");
  const desc = document.getElementById("profile-desc");
  const skills = document.getElementById("profile-skills");

  if (quote) {
    quote.textContent = isDark
      ? '"No quiero morir. No estoy lista"'
      : '"No diseño por estética, diseño para vivirlo"';
  }

  if (desc) {
    desc.innerHTML = isDark
      ? "<strong>Perfil:</strong> Indomable y desafiante, no sigue reglas… las rompe. Moldea interfaces que desafían la lógica y alteran la percepción. Lo visual ya no es solo diseño: es una ilusión controlada donde cada detalle puede atraer… o perder al usuario en la oscuridad."
      : "<strong>Perfil:</strong> Creativa, directa y con una personalidad fuerte, transforma ideas en interfaces modernas e intuitivas. Le encanta romper estructuras tradicionales y darle al usuario una experiencia visual única.";
  }

if (skills) {
    skills.innerHTML = isDark
      ? "<strong>Habilidades:</strong><br>Manipulación de interfaces en entornos inestables<br>Precisión visual en escenarios caóticos"
      : "<strong>Habilidades:</strong><br>Pensamiento creativo<br>Atención al detalle visual<br>Adaptabilidad";
  }
}