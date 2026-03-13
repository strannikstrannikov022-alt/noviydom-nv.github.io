const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(nav.classList.contains("open")));
  });
}

const feedbackForms = document.querySelectorAll(".feedback-form");

for (const feedbackForm of feedbackForms) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = feedbackForm.querySelector('input[name="name"]');
    const phoneInput = feedbackForm.querySelector('input[name="phone"]');
    const messageInput = feedbackForm.querySelector('textarea[name="message"]');

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const text = [
      "Здравствуйте. Интересуют строительные работы.",
      name ? `Имя: ${name}` : "",
      phone ? `Телефон: ${phone}` : "",
      message ? `Задача: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/79829020802?text=${encodeURIComponent(text)}`;
  });
}

const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-card-entry");

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    for (const currentButton of filterButtons) {
      currentButton.classList.toggle("is-active", currentButton === button);
    }

    for (const item of portfolioItems) {
      const categories = (item.dataset.category || "").split(" ");
      const visible = filter === "all" || categories.includes(filter);
      item.hidden = !visible;
    }
  });
}

const lightbox = document.getElementById("portfolio-lightbox");
const lightboxImage = document.getElementById("portfolio-lightbox-image");
const lightboxCaption = document.getElementById("portfolio-lightbox-caption");
const lightboxClose = document.querySelector(".portfolio-lightbox-close");
const portfolioOpenButtons = document.querySelectorAll(".portfolio-open");

const closeLightbox = () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
};

for (const button of portfolioOpenButtons) {
  button.addEventListener("click", () => {
    const card = button.closest(".portfolio-card-entry");

    if (!card || !lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    lightboxImage.src = card.dataset.modalImage || "";
    lightboxImage.alt = card.dataset.modalTitle || "";
    lightboxCaption.textContent = card.dataset.modalTitle || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
