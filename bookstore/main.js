(() => {
  const featured = document.querySelector(".featured");
  if (!featured || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  featured.style.opacity = "0";
  featured.style.transform = "translateY(1.5rem)";
  featured.style.transition = "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

  const reveal = () => {
    featured.style.opacity = "1";
    featured.style.transform = "translateY(0)";
  };

  if (!("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.18 }
  );

  observer.observe(featured);
})();
