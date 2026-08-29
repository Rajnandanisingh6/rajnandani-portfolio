document.addEventListener("DOMContentLoaded", () => {
  typing();
  scrollReveal();
  scrollSpy();
  mobileNav();
  backTop();
  imageModal();
  networkBackground();
  themeToggle();
  notesModal();
});


/* TYPING EFFECT */

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

  if (!("IntersectionObserver" in window)) {
    sections.forEach(section => section.classList.add("revealed"));
    return;
  }

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
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      links.forEach(link => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));
}


/* MOBILE NAVIGATION */

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
    menu.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  overlay.addEventListener("click", close);
  links.forEach(link => link.addEventListener("click", close));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) close();
  });
}


/* BACK TO TOP */

function backTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* IMAGE MODAL */

function imageModal() {
  const modal = document.getElementById("imageModal");
  const image = document.getElementById("modalImage");
  const close = document.getElementById("modalClose");
  const previewImages = document.querySelectorAll(".preview-image");
  if (!modal || !image || !close) return;

  previewImages.forEach(img => {
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

  modal.addEventListener("click", event => {
    if (event.target === modal) hide();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") hide();
  });
}


/* INTERACTIVE NOTES */

function notesModal() {
  const modal = document.getElementById("noteModal");
  const close = document.getElementById("noteModalClose");
  const title = document.getElementById("modalNoteTitle");
  const tag = document.getElementById("modalNoteTag");
  const body = document.getElementById("modalNoteBody");
  const notes = document.querySelectorAll(".interactive-note");
  if (!modal || !close || !title || !tag || !body) return;

  const noteData = {
    jwt: {
      tag: "Backend",
      title: "What I Finally Understood About JWT Authentication",
      body: `
        <p>
          When I first came across JWT authentication, I thought it was
          simply about generating a token and checking it later. Once I
          started building a real backend, I realised there are several
          small pieces working together.
        </p>
        <p>
          The basic flow became much clearer to me:
          <strong>user logs in → server verifies credentials → token is
          generated → client sends the token → middleware verifies it</strong>.
        </p>
        <p>
          The part that helped me the most was understanding middleware.
          Instead of writing authentication logic inside every protected
          route, middleware can verify the user first and then allow the
          request to continue.
        </p>
        <p>
          Building my projects also taught me that authentication isn't
          only about making login work. Things like protected routes,
          cookies, validation, error handling and keeping secrets inside
          environment variables matter too.
        </p>
        <p>
          <strong>My takeaway:</strong> concepts become much easier when I
          actually implement them instead of only watching someone else
          write the code.
        </p>
      `
    },

    mvc: {
      tag: "Node.js",
      title: "Why My Node.js Code Started Making More Sense With MVC",
      body: `
        <p>
          One thing I noticed while learning Node.js was that my code
          worked, but it quickly became difficult to understand when
          everything lived inside one or two files.
        </p>
        <p>
          That's when MVC architecture started making sense to me.
          <strong>Routes decide where a request goes, controllers handle
          the logic, and models deal with the database.</strong>
        </p>
        <p>
          Separating these responsibilities doesn't magically make an
          application perfect, but it makes the project much easier to
          navigate and maintain.
        </p>
        <p>
          This became especially useful while working with Express and
          MongoDB. Instead of searching through a huge file to find one
          API, I can quickly identify the route, controller and model
          involved.
        </p>
        <p>
          <strong>My takeaway:</strong> clean code isn't about writing more
          files. It's about giving different responsibilities a clear
          place.
        </p>
      `
    },

    dsa: {
      tag: "DSA",
      title: "What DSA Is Teaching Me Beyond Just Solving Questions",
      body: `
        <p>
          I'm still improving at DSA, and honestly, some problems still
          take me much longer than I expect. But I've started noticing
          something important: DSA is slowly changing the way I look at
          problems.
        </p>
        <p>
          Earlier, I would often try random approaches until something
          worked. Now I try to ask questions like:
          <strong>Can hashing help? Is there a two-pointer approach?
          Am I repeating work? Can I reduce the time complexity?</strong>
        </p>
        <p>
          Patterns such as two pointers, sliding window and hashing are
          especially useful because they give me a starting point when a
          problem initially looks unfamiliar.
        </p>
        <p>
          I'm not trying to become perfect at DSA overnight. My current
          goal is to build consistency and understand why a solution works
          rather than simply memorising it.
        </p>
        <p>
          <strong>My takeaway:</strong> progress in DSA is less about how
          many questions I solve in one day and more about whether I can
          recognise and explain the patterns I have already learned.
        </p>
      `
    },

    projects: {
      tag: "Projects",
      title: "Building a Project Taught Me More Than Watching Tutorials",
      body: `
        <p>
          Tutorials are great when I don't know where to start. They show
          me the structure of a project and introduce tools that I haven't
          used before.
        </p>
        <p>
          But the real learning started when I tried to make the project
          work on my own. Suddenly there were deployment problems,
          authentication issues, database errors, broken API requests and
          small bugs that weren't present in the tutorial.
        </p>
        <p>
          At first those errors were frustrating. Later I realised that
          debugging them was probably the most valuable part of the
          process because I had to understand what my code was actually
          doing.
        </p>
        <p>
          Building <strong>Task Manager</strong> and <strong>MusicNest</strong>
          also made concepts like APIs, authentication, databases,
          deployment and frontend-backend communication much more real
          for me.
        </p>
        <p>
          <strong>My takeaway:</strong> watching a tutorial can show me
          how something is built, but debugging my own project teaches me
          why it works.
        </p>
      `
    }
  };

  function openNote(key) {
    const data = noteData[key];
    if (!data) return;

    tag.textContent = data.tag;
    title.textContent = data.title;
    body.innerHTML = data.body;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeNote() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  notes.forEach(note => {
    note.addEventListener("click", () => openNote(note.dataset.note));

    note.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openNote(note.dataset.note);
      }
    });
  });

  close.addEventListener("click", closeNote);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeNote();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeNote();
  });
}


/* NETWORK BACKGROUND */

function networkBackground() {
  const canvas = document.getElementById("network-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let nodes = [], width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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
      ctx.fillStyle = "rgba(180,130,20,.35)";
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
          ctx.strokeStyle = `rgba(130,130,130,${.08 * (1 - distance / 150)})`;
          ctx.stroke();
        }
      }
    }

    if (!reduced) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}


/* THEME TOGGLE */

function themeToggle() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!btn) return;

  const statsImgs = [
    document.getElementById("ghStatsImg"),
    document.getElementById("ghStreakImg"),
    document.getElementById("lcStatsImg")
  ].filter(Boolean);

  function applyStatsSrc(theme) {
    statsImgs.forEach(img => {
      const src = theme === "light" ? img.dataset.themeLight : img.dataset.themeDark;
      if (src && img.src !== src) img.src = src;
    });
  }

  function sync() {
    const isLight = root.getAttribute("data-theme") === "light";

    btn.textContent = isLight ? "☀️" : "🌙";
    btn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    applyStatsSrc(isLight ? "light" : "dark");

    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", isLight ? "#f4f1eb" : "#1e1e1e");
    }
  }

  sync();

  btn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";

    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }

    sync();
  });
}