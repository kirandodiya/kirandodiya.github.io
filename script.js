/* =========================================================
   Portfolio interactions — vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var header = document.querySelector(".site-header");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Header state on scroll ---------- */
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link (scroll spy) ---------- */
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll("a"));
  var map = {};
  navAnchors.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  // "Activities" also covers the profiles section; "Credentials" etc. map directly.
  map.profiles = map.activities;

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
          map[entry.target.id].classList.add("active");
          map[entry.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  // Stagger siblings slightly for a cascading entrance.
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var idx = Array.prototype.indexOf.call(parent.children, el);
    el.style.setProperty("--d", Math.min(idx, 6) * 0.06 + "s");
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          (function (t) { setTimeout(function () { t.classList.add("settled"); }, 1000); })(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated statistics ---------- */
  var nums = document.querySelectorAll(".stat-num");
  function animateNum(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || "";
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateNum(entry.target); sio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { sio.observe(n); });
  } // otherwise the static markup ("70+", "12K+", ...) is already correct

  /* ---------- Hex / data-inspired background ---------- */
  var hex = document.getElementById("hexBg");
  if (hex && !reduceMotion) {
    var lines = [];
    var chars = "0123456789ABCDEF";
    for (var i = 0; i < 22; i++) {
      var row = (i * 16).toString(16).toUpperCase().padStart(4, "0") + "   ";
      for (var j = 0; j < 12; j++) {
        row += chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)] + " ";
      }
      lines.push(row);
    }
    hex.textContent = lines.join("\n");
  }

  /* ---------- Hero canvas: evidence nodes + network lines ---------- */
  var canvas = document.getElementById("heroCanvas");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var nodes = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var running = true;

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(18, Math.min(46, Math.floor(w / 34)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.8
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      var maxD = 150;
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = "rgba(90,180,255," + (0.16 * (1 - d / maxD)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(120,200,255,0.55)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    // Pause when the hero is off-screen or the tab is hidden.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; draw(); }
        else if (!visible) { running = false; }
      }).observe(canvas.parentElement);
    }
    draw();
  }

  /* ---------- Subtle card tilt (pointer devices only) ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "translateY(-4px) perspective(700px) rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" + (x * 4).toFixed(2) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }
})();
