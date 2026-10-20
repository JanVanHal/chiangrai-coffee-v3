(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shop = document.documentElement.getAttribute("data-shop-name") || "[Your Café Name]";

  document.querySelectorAll("[data-shop-name]").forEach(function (el) {
    if (el !== document.documentElement) el.textContent = shop;
  });

  document.title = shop + " | Coffee in Chiang Rai";

  var ogSite = document.querySelector('meta[property="og:site_name"]');
  if (ogSite) ogSite.setAttribute("content", shop);

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");

  function setMenu(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.hidden = !open;
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function markCurrent() {
    var y = window.scrollY + 120;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= y) current = sec.id;
    });
    navLinks.forEach(function (link) {
      var id = (link.getAttribute("href") || "").slice(1);
      if (id && id === current) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  markCurrent();
  window.addEventListener("scroll", markCurrent, { passive: true });

  function countUp(el) {
    var end = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(end)) return;
    var start = 0;
    var duration = 1200;
    var t0 = performance.now();
    var locale = end >= 1000;

    function frame(now) {
      var t = Math.min(1, (now - t0) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round(start + (end - start) * eased);
      el.textContent = locale ? value.toLocaleString("en-US") : String(value);
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  var hero = document.querySelector(".hero");
  function armHero() {
    if (!hero) return;
    hero.classList.add("is-on");
    hero.querySelectorAll(".reveal, .clip, .draw").forEach(function (el) {
      el.classList.add("is-on");
    });
  }
  if (hero && document.documentElement.classList.contains("js")) {
    requestAnimationFrame(armHero);
  } else {
    armHero();
  }

  if (document.documentElement.classList.contains("js") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-on");
          entry.target.querySelectorAll("[data-count]").forEach(countUp);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal, .clip, .draw").forEach(function (el) {
      if (el.closest(".hero")) return;
      io.observe(el);
    });

    document.querySelectorAll(".fact").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .clip, .draw").forEach(function (el) {
      el.classList.add("is-on");
    });
  }

  var shifter = document.querySelector("[data-shift]");
  if (shifter && !reduce) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight * 1.2) {
            shifter.style.transform = "translate3d(0," + y * 0.12 + "px,0)";
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var honeypot = form.querySelector("[name=botcheck]");
      if (honeypot && honeypot.checked) return;

      if (!form.reportValidity()) return;

      var btn = form.querySelector("[type=submit]");
      var data = new FormData(form);
      var payload = {};
      data.forEach(function (value, key) {
        payload[key] = value;
      });

      btn.disabled = true;
      status.textContent = "Sending…";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (json) {
            return { ok: res.ok, json: json };
          });
        })
        .then(function (result) {
          if (result.ok) {
            status.textContent = result.json.message || "Message sent. Thank you.";
            form.reset();
          } else {
            status.textContent = result.json.message || "Something went wrong. Try again.";
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Try again.";
        })
        .then(function () {
          btn.disabled = false;
        });
    });
  }
})();
