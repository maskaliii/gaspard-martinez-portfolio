const body = document.body;
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const briefForm = document.querySelector("[data-brief-form]");

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Ouvrir le menu");
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Ouvrir le menu");
  nav?.querySelector("a")?.focus();
});

briefForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(briefForm);
  const name = data.get("name")?.toString().trim() || "Non précisé";
  const type = data.get("type")?.toString().trim() || "Projet web";
  const message = data.get("message")?.toString().trim() || "Bonjour MasKali'Web, je souhaite échanger au sujet d’un projet web.";
  const bodyLines = [
    `Nom: ${name}`,
    `Besoin: ${type}`,
    "",
    message,
  ];

  const subject = encodeURIComponent(`Projet web MasKali'Web - ${type}`);
  const emailBody = encodeURIComponent(bodyLines.join("\n"));
  window.location.href = `mailto:gaspard.martinez.pro@gmail.com?subject=${subject}&body=${emailBody}`;
});
