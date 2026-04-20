window.addEventListener("load", () => {

  const loader = document.getElementById("loader");
  const isBitacora = window.location.href.includes('bitacora');

  if (isBitacora) {
    loader.classList.remove("light");
    loader.classList.add("dark");
    document.body.classList.add("dark");
  }

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }, 600);
  }, 2000);

});

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle && themeIcon) {

  const lightImages = {
    max: 'img/max_light.png',
    nancy: 'img/nancy_light.png',
    steve: 'img/steve_light.png'
  };

  const darkImages = {
    max: 'img/max_dark.png',
    nancy: 'img/nancy_dark.png',
    steve: 'img/steve_dark.png'
  };

  // =========================
  // 🧠 APLICAR TEMA GUARDADO
  // =========================
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.src = "img/btn_down.png";
    updateImages(true);
  } else {
    themeIcon.src = "img/btn_up.png";
    updateImages(false);
  }

  // =========================
  // 🔁 EVENTO CLICK
  // =========================
  themeToggle.addEventListener("click", () => {

    const isDark = document.body.classList.toggle("dark");

    // Guardar estado
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Cambiar icono
    themeIcon.src = isDark
      ? "img/btn_down.png"
      : "img/btn_up.png";

    // Cambiar imágenes
    updateImages(isDark);

  });

  // =========================
  // 🖼️ FUNCION CAMBIO IMAGENES
  // =========================
  function updateImages(isDark) {

    const imgs = isDark
      ? Object.values(darkImages)
      : Object.values(lightImages);

    document.querySelectorAll('.card-image img').forEach((img, index) => {
      img.src = imgs[index] || img.src;
    });
  }

}