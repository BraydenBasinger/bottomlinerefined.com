document.addEventListener("DOMContentLoaded", function () {
  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("is-open");
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
    });
  }

  /* Accordion (services list / FAQs) */
  document.querySelectorAll(".accordion-header").forEach(function (header) {
    header.addEventListener("click", function () {
      var panel = document.getElementById(header.getAttribute("aria-controls"));
      var isOpen = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!isOpen));
      if (panel) {
        panel.classList.toggle("is-open", !isOpen);
      }
    });
  });

  /* Testimonial slider */
  var slides = document.querySelectorAll(".testimonial-slide");
  if (slides.length) {
    var dotsWrap = document.querySelector(".testimonial-dots");
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
        if (i === 0) dot.classList.add("is-active");
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    var current = 0;
    var fadeMs = 700;

    var activate = function (slide) {
      slide.classList.add("is-active");
      void slide.offsetWidth; /* force reflow so the fade-in transition runs */
      slide.classList.add("is-visible");
    };

    var show = function (index) {
      var old = slides[current];
      current = index;
      var next = slides[current];

      if (old && old !== next && old.classList.contains("is-active")) {
        old.classList.remove("is-visible");
        setTimeout(function () {
          old.classList.remove("is-active");
          activate(next);
        }, fadeMs);
      } else {
        activate(next);
      }

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    };

    var next = function () {
      show((current + 1) % slides.length);
    };

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
      });
    });

    show(current);
    setInterval(next, 6000);
  }

  /* Team member modal (Who We Are) */
  var modalOverlay = document.querySelector(".team-modal-overlay");
  if (modalOverlay) {
    var modalImg = modalOverlay.querySelector("img");
    var modalName = modalOverlay.querySelector(".team-modal-content h2");
    var modalRole = modalOverlay.querySelector(".team-modal-content .role");
    var modalBio = modalOverlay.querySelector(".team-modal-content p");

    var openCard = function (card) {
      modalImg.src = card.getAttribute("data-photo");
      modalImg.alt = card.getAttribute("data-name");
      modalName.textContent = card.getAttribute("data-name");
      modalRole.textContent = card.getAttribute("data-role");
      modalBio.textContent = card.getAttribute("data-bio");
      modalOverlay.classList.add("is-open");
    };

    document.querySelectorAll(".team-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openCard(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCard(card);
        }
      });
    });

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay || e.target.classList.contains("team-modal-close")) {
        modalOverlay.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        modalOverlay.classList.remove("is-open");
      }
    });
  }

  /* Contact page: click-to-reveal phone / email */
  document.querySelectorAll(".reveal-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var link = document.createElement("a");
      link.className = "reveal-value";
      link.href = btn.getAttribute("data-href");
      link.innerHTML =
        '<i class="' + btn.getAttribute("data-icon") + '"></i><span>' +
        btn.getAttribute("data-value") +
        "</span>";
      btn.replaceWith(link);
    });
  });

  /* Scroll-reveal: progressive enhancement only. If IntersectionObserver
     isn't available, elements are simply left visible (see CSS defaults). */
  if ("IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".hero-inner, .section-title, .lede, .lede--accent, .team-card, .icon-box, .sustain-item, .timeline-item"
    );
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* Savings bar fill animation (What We Do page) */
  var savingsBar = document.querySelector(".savings-bar");
  if (savingsBar && "IntersectionObserver" in window) {
    savingsBar.classList.add("will-animate");
    var savingsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            savingsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    savingsObserver.observe(savingsBar);
  }
});
