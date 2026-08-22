document.addEventListener("DOMContentLoaded", () => {
  typing();
  scrollReveal();
  scrollSpy();
  mobileNav();
  backTop();
  imageModal();
  networkBackground();
});


/* TYPING */

function typing() {
  const el = document.getElementById("typedRole");
  if (!el) return;

  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "DSA Enthusiast"
  ];

  let role = 0, index = 0, deleting = false;

  function type() {
    const text = roles[role];

    index += deleting ? -1 : 1;
    el.textContent = text.slice(0, index);

    if (!deleting && index === text.length) {
      deleting = true;
      return setTimeout(type, 1400);
    }

    if (deleting && index === 0) {
      deleting = false;
      role = (role + 1) % roles.length;
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}


/* SCROLL REVEAL */

function scrollReveal() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });

  sections.forEach(section => observer.observe(section));
}


/* SCROLL SPY */

function scrollSpy() {
  const sections = document.querySelectorAll(".section");
  const links = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));
}


/* MOBILE NAV */

function mobileNav() {
  const menu = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const links = document.querySelectorAll(".nav-link");

  if (!menu || !sidebar || !overlay) return;

  const close = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menu.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menu.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");

    overlay.classList.toggle("show", open);
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  overlay.addEventListener("click", close);
  links.forEach(link => link.addEventListener("click", close));

  addEventListener("resize", () => {
    if (innerWidth > 900) close();
  });
}


/* BACK TO TOP */

function backTop() {
  const btn = document.getElementById("backToTop");

  addEventListener("scroll", () => {
    btn.classList.toggle("show", scrollY > 400);
  });

  btn.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* IMAGE MODAL */

function imageModal() {
  const modal = document.getElementById("imageModal");
  const image = document.getElementById("modalImage");
  const close = document.getElementById("modalClose");

  document.querySelectorAll(".preview-image").forEach(img => {
    img.addEventListener("click", () => {
      image.src = img.src;
      image.alt = img.alt;
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  const hide = () => {
    modal.classList.remove("show");
    image.src = "";
    document.body.style.overflow = "";
  };

  close.addEventListener("click", hide);

  modal.addEventListener("click", e => {
    if (e.target === modal) hide();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") hide();
  });
}


/* NETWORK BACKGROUND */

function networkBackground() {
  const canvas = document.getElementById("network-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let nodes = [], width, height;

  function resize() {
    width = innerWidth;
    height = innerHeight;

    const dpr = Math.min(devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(50, Math.floor((width * height) / 16000));

    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.4 + 1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach(node => {
      if (!reduced) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,191,0,.45)";
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle =
            `rgba(160,160,160,${.1 * (1 - distance / 150)})`;
          ctx.stroke();
        }
      }
    }

    if (!reduced) requestAnimationFrame(draw);
  }

  resize();
  draw();
  addEventListener("resize", resize);
}