document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Smooth Scrolling for Navbar Links
  const navLinks = document.querySelectorAll(".nav-links a, .hero-btns a, .btn-purple-sm");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // 2. Animate Skill Bars when Section enters Viewport
  const skillSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".bar-fill");

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.transition = "width 1.2s ease-in-out";
            bar.style.width = width;
          }, 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  // 3. Floating Card Code Highlight / Interactive Click Copy Effect
  const codeCard = document.querySelector(".code-card");
  if (codeCard) {
    codeCard.style.cursor = "pointer";
    codeCard.addEventListener("click", () => {
      const codeText = codeCard.querySelector("code").innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const headerTitle = codeCard.querySelector(".code-title");
        const originalText = headerTitle.innerText;
        headerTitle.innerText = "Copied!";
        headerTitle.style.color = "#10b981";
        setTimeout(() => {
          headerTitle.innerText = originalText;
          headerTitle.style.color = "#9ca3af";
        }, 1500);
      });
    });
  }

  // 4. Scroll Reveal Animations for Cards
  const observerOptions = {
    threshold: 0.15
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".stat-card, .project-card, .skill-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "all 0.5s ease-out";
    cardObserver.observe(el);
  });

});
