// ============ HEADER SCROLL STATE ============
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 500);
});

// ============ MOBILE MENU ============
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ============ SCROLL REVEAL ANIMATIONS ============
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // small stagger for siblings
        const delay = entry.target.dataset.delay || (i % 4) * 90;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));

// ============ NEWSLETTER FORM ============
const newsForm = document.getElementById("newsForm");
const newsEmail = document.getElementById("newsEmail");

newsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsEmail.value.trim();
  if (!email) return;
  const btn = newsForm.querySelector("button");
  const original = btn.textContent;
  btn.textContent = "Subscribed \u2713";
  btn.disabled = true;
  newsEmail.value = "";
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 2500);
});

// ============ ACTIVE NAV LINK HIGHLIGHT ============
const sections = document.querySelectorAll("section[id], footer[id]");
const navAnchors = navLinks.querySelectorAll("a:not(.nav-cta)");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.style.color =
            a.getAttribute("href") === `#${id}` ? "var(--accent-2)" : "";
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((s) => navObserver.observe(s));
