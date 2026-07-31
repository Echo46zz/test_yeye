(() => {
  const cards = Array.from(document.querySelectorAll(".photo-card"));
  const filters = Array.from(document.querySelectorAll(".filter"));
  const emptyState = document.getElementById("empty-state");
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lb-image");
  const lbTitle = document.getElementById("lb-title");
  const lbMeta = document.getElementById("lb-meta");
  const lbCounter = document.getElementById("lb-counter");

  let visibleCards = cards.slice();
  let currentIndex = 0;
  let lastFocused = null;

  /* reveal on scroll */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  cards.forEach((card) => observer.observe(card));

  /* filtering */
  const applyFilter = (value) => {
    visibleCards = cards.filter((card) => value === "all" || card.dataset.category === value);
    cards.forEach((card) => {
      const shown = visibleCards.includes(card);
      card.classList.toggle("is-hidden", !shown);
      if (shown) card.classList.add("is-visible");
    });
    emptyState.hidden = visibleCards.length > 0;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((other) => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });
      applyFilter(button.dataset.filter);
    });
  });

  /* lightbox */
  const render = (index) => {
    const card = visibleCards[index];
    if (!card) return;
    currentIndex = index;
    lbImage.src = card.dataset.full;
    lbImage.alt = card.querySelector("img").alt;
    lbTitle.textContent = card.dataset.title;
    lbMeta.textContent = card.dataset.meta;
    lbCounter.textContent = `${index + 1} / ${visibleCards.length}`;
  };

  const openLightbox = (card) => {
    const index = visibleCards.indexOf(card);
    if (index < 0) return;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("is-locked");
    render(index);
    lightbox.querySelector(".lb-close").focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lbImage.src = "";
    document.body.classList.remove("is-locked");
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  const step = (delta) => {
    if (!visibleCards.length) return;
    render((currentIndex + delta + visibleCards.length) % visibleCards.length);
  };

  cards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.addEventListener("click", () => openLightbox(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".lb-next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  /* contact form (front-end only) */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "请填写称呼、邮箱和拍摄需求。";
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`拍摄咨询 · ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n联系邮箱：${data.get("email")}`);
    window.location.href = `mailto:hello@linxu.photo?subject=${subject}&body=${body}`;
    status.textContent = "已为你打开邮件客户端，也可以直接写信到 hello@linxu.photo。";
    form.reset();
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
