import "./style.scss";

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  let currentAudio;

  function stopAllAudioExcept(exceptAudio) {
    document.querySelectorAll("audio").forEach((audio) => {
      if (audio !== exceptAudio && !audio.paused) {
        audio.pause();
      }
    });
  }

  function startAudio(section) {
    const audioId = section.getAttribute("data-audio-id");
    const audioElement = document.getElementById(audioId);

    if (audioElement) {
      stopAllAudioExcept(audioElement);
      audioElement.play();
      currentAudio = audioElement;
    }
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

          startAudio(entry.target);


          const activeLink = document.querySelector('ul#navBar a[href="#${entry.target.id}"]')
          if(activeLink){
            link.classList.remove("active");
          }
          activeLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0% 0% -25%",
    }
  );

  sections.forEach((section) => {
    observer.observe(section);

    // Lecture au clic pour les appareils mobiles
    section.addEventListener("click", () => {
      startAudio(section);
    });
  });
});

// Extras UI :
// Fonction pour faire défiler vers le haut
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Afficher/cacher le bouton en fonction du défilement
window.onscroll = function () {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Attacher l'événement de clic au bouton
document.getElementById("backToTopBtn").addEventListener("click", scrollToTop);

if (window.innerWidth <= 768) {
  showToast(
    "ℹ️ Pour l'ambiance sonore, veuillez cliquer sur la première image😉"
  );
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
  }, 10);

  setTimeout(function () {
    toast.remove();
  }, 5000);
}

// Footer :
const year = document.querySelector("span#year");
const date = new Date();
const currentYear = date.getFullYear();

year.innerHTML = currentYear;
