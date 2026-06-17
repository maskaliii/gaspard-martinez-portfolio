const body = document.body;
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const briefForm = document.querySelector("[data-brief-form]");
const revealItems = [...document.querySelectorAll(".reveal")];

function closeNavigation() {
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Ouvrir le menu");
}

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
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

sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeNavigation();
  nav?.querySelector("a")?.focus();
});

briefForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(briefForm);
  const name = data.get("name")?.toString().trim() || "Non précisé";
  const company = data.get("company")?.toString().trim() || "Non précisé";
  const email = data.get("email")?.toString().trim() || "Non précisé";
  const phone = data.get("phone")?.toString().trim() || "Non précisé";
  const type = data.get("type")?.toString().trim() || "Projet web";
  const budget = data.get("budget")?.toString().trim() || "À définir";
  const message =
    data.get("message")?.toString().trim() ||
    "Bonjour MasKali'Web, je souhaite échanger au sujet d'un projet de site internet.";

  const bodyLines = [
    `Nom: ${name}`,
    `Entreprise: ${company}`,
    `Email: ${email}`,
    `Téléphone: ${phone}`,
    `Type de projet: ${type}`,
    `Budget approximatif: ${budget}`,
    "",
    message,
  ];

  const subject = encodeURIComponent(`Demande de devis MasKali'Web - ${type}`);
  const emailBody = encodeURIComponent(bodyLines.join("\n"));
  window.location.href = `mailto:gaspard.martinez.pro@gmail.com?subject=${subject}&body=${emailBody}`;
});
