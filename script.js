// Interactive UI enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section, .cert-card, .timeline-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
});
