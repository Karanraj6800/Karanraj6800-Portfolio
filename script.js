const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const progress = document.querySelector(".scroll-progress");
const header = document.querySelector(".site-header");
const heroMedia = document.querySelector(".hero-media");
const counters = document.querySelectorAll("[data-count]");
const ambientTiles = document.querySelector(".ambient-tiles");

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressWidth = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  progress.style.width = `${progressWidth}%`;
  header.classList.toggle("is-scrolled", scrollTop > 20);
  heroMedia.style.transform = `scale(1.01) translateY(${scrollTop * 0.035}px)`;
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

window.addEventListener(
  "pointermove",
  (event) => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * 10;
    const y = ((event.clientY / window.innerHeight) - 0.5) * 10;
    ambientTiles.style.setProperty("--ambient-x", `${x}px`);
    ambientTiles.style.setProperty("--ambient-y", `${y}px`);
  },
  { passive: true }
);

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.count);
      const suffix = entry.target.textContent.includes("+") ? "+" : "";
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 28));
      const timer = window.setInterval(() => {
        current = Math.min(target, current + step);
        entry.target.textContent = `${current}${suffix}`;
        if (current === target) {
          window.clearInterval(timer);
        }
      }, 28);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.setProperty("--tilt-x", `${y}deg`);
    card.style.setProperty("--tilt-y", `${x}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

const projectDetails = {
  crm: {
    type: "Make AI / HubSpot / CRM Operations",
    title: "Make AI & HubSpot Customer Operations Intelligence",
    description:
      "Hands-on CRM and customer operations project showing deep usage across Make AI thinking, HubSpot Service, Sales, Marketing, Reporting, and AI tools.",
    points: [
      "Built practical fluency across support workflows, customer data, reporting, service execution, and AI-assisted operations.",
      "Used HubSpot Service Hub, Sales Hub, Marketing Hub, Help Desk, Conversations, SmartCRM, Reporting, Copilot, and ChatSpot.",
      "Showcased 58.6K+ HubSpot product events, 96 features used, 299 active usage days, and a Top 39% HubGrader ranking.",
      "Strong fit for Customer Success Ops, CRM Analyst, RevOps, Business & Operations Analyst, and Operations Analyst roles."
    ]
  },
  "business-game": {
    type: "Business Strategy / Leadership",
    title: "NEOMA Business Game - Marketplace Simulation",
    description:
      "Completed an intensive 5-day team-based Business Game at NEOMA Business School, powered by Marketplace Simulations, while taking overall leadership responsibility for team strategy.",
    points: [
      "Led overall team strategy and coordinated decisions across marketing, finance, sales, operations, and business analysis.",
      "Used market feedback, financial indicators, and team discussion to align pricing, budget allocation, sales, operations, and performance review decisions.",
      "Balanced growth, profitability, customer demand, capacity, and competitive positioning under time pressure.",
      "Strengthened cross-functional leadership, business acumen, data-informed decision-making, and stakeholder alignment in a realistic competitive environment."
    ]
  },
  "responsible-ai": {
    type: "Responsible AI / Research",
    title: "Responsible AI & Business Ethics in Digital Transformation",
    description:
      "MSc in Business Analytics dissertation on how responsible AI practices and business ethics influence digital transformation in India's IT and ITeS sector.",
    points: [
      "Designed and analyzed a quantitative survey of 100 IT/ITeS professionals.",
      "Found transparency, data privacy, training, and governance as key responsible AI priorities.",
      "56% identified lack of transparency as the most common AI deployment issue, and 58% wanted AI ethics training.",
      "Recommended sector-specific governance, transparent data practices, ethical impact assessments, and workforce upskilling."
    ]
  },
  "drug-trends": {
    type: "Healthcare Analytics / R / SQL",
    title: "Drug Use Trends Analysis in Hospitals",
    description:
      "Healthcare analytics project using R and SQLite to analyze drug-related hospital visit data, compare emergency and inpatient settings, and translate findings into resource-planning recommendations.",
    points: [
      "Analyzed 13,960 hospital records across 10 variables, including setting, indicator, group, subgroup, time, dates, values, and measures.",
      "Built a pipeline from CSV inspection and cleaning to date conversion, SQLite integration, exploratory analysis, and visualization.",
      "Used R, RSQLite, dplyr, lubridate, SQLite, and chart-based analysis to compare hospital settings and detect time-based fluctuations.",
      "Identified emergency department visits as a higher-pressure area and connected seasonal or setting-level patterns to staffing and prevention planning.",
      "Recommended stronger emergency department resource allocation, targeted prevention around high-risk periods, and deeper analysis by drug type, demographics, and department."
    ]
  },
  zomato: {
    type: "Innovation / CSR / Operations",
    title: "Zomato Rural Delivery Hub Innovation",
    description:
      "Designed a rural delivery hub model to help non-digital users order food through local Zomato agents.",
    points: [
      "Applied Stage-Gate, design thinking, prototyping, pilot planning, and feedback collection.",
      "Solved rural access barriers around smartphones, payments, logistics, and trust.",
      "Designed an assisted ordering process using local agents, cash payments, and hub-based coordination.",
      "Linked business expansion with CSR, rural employment, digital inclusion, and customer accessibility."
    ]
  },
  toyota: {
    type: "Strategy / Operations",
    title: "Toyota International Strategy & Operations Analysis",
    description:
      "Analyzed Toyota's international expansion strategy, supply chain model, outsourcing/offshoring approach, localization, resilience, and future priorities.",
    points: [
      "Studied Toyota's supply chain model, JIT, lean manufacturing, supplier network, outsourcing, and offshoring decisions.",
      "Evaluated knowledge transfer through standardization, collaboration, training, supplier development, and IT infrastructure.",
      "Reviewed success factors such as US expansion and hybrid leadership, plus risks such as recalls and market-specific challenges.",
      "Recommended digital channels, resilient supply chains, local customization, R&D investment, and CSR."
    ]
  },
  chemical: {
    type: "International Trade / Manufacturing",
    title: "India as the Next Chemical Manufacturing Hub",
    description:
      "International trade case analysis on India's potential to become a global chemical manufacturing hub.",
    points: [
      "Applied Ricardian and Heckscher-Ohlin trade models to India's chemical sector.",
      "Identified opportunities in specialty chemicals, petrochemicals, vertical integration, diversification, R&D, and sustainable manufacturing.",
      "Assessed constraints including raw material availability, cost competition, regulation, and shifting trade dynamics.",
      "Recommended regulatory streamlining, talent development, raw material strategy, trade policy, and specialty chemical focus."
    ]
  }
};

const dialog = document.getElementById("project-dialog");
const dialogType = document.getElementById("dialog-type");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogList = document.getElementById("dialog-list");
const dialogClose = document.querySelector(".dialog-close");
let preservedScrollY = 0;

document.querySelectorAll(".project-card").forEach((card) => {
  card.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    preservedScrollY = window.scrollY;
    const detail = projectDetails[card.dataset.project];
    dialogType.textContent = detail.type;
    dialogTitle.textContent = detail.title;
    dialogDescription.textContent = detail.description;
    dialogList.replaceChildren(
      ...detail.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      })
    );
    dialog.showModal();
    document.body.classList.add("dialog-open");
    window.requestAnimationFrame(() => {
      window.scrollTo(0, preservedScrollY);
    });
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
  window.requestAnimationFrame(() => {
    window.scrollTo(0, preservedScrollY);
  });
}

dialogClose.addEventListener("click", closeDialog);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

const contactForm = document.getElementById("contact-form");
const formNote = document.querySelector(".form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

  formNote.textContent = "Opening your email app with the message ready to send.";
  window.location.href = `mailto:karan587raj@gmail.com?subject=${subject}&body=${body}`;
});
