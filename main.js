/* =========================================================================
   Wrap It Up Graphix + Tints — interactions
   No scroll listeners (IntersectionObserver only). Reduced-motion aware.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- nav: border on scroll (IO sentinel, not a scroll handler) ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.prepend(sentinel);
    new IntersectionObserver(function (e) {
      nav.classList.toggle("is-scrolled", !e[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---- mobile drawer ---- */
  var drawer = document.querySelector(".drawer");
  var openBtn = document.querySelector(".nav__toggle");
  var closeBtn = document.querySelector(".drawer__close");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setDrawer(false); });
  });

  /* ---- scroll reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- gallery render + lightbox ---- */
  var GAL = {
    wraps: 23,
    tints: 7,
    signage: 21
  };
  var GAL_DIR = { wraps: "wraps", tints: "tints", signage: "signage" };
  var GAL_FILE = { wraps: "wrap", tints: "tint", signage: "sign" };

  var galEl = document.querySelector("[data-gallery]");
  var sources = [];
  if (galEl) {
    var cat = galEl.getAttribute("data-gallery");
    var count = GAL[cat] || 0;
    var dir = GAL_DIR[cat];
    var stub = GAL_FILE[cat];
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= count; i++) {
      var n = i < 10 ? "0" + i : "" + i;
      var src = "images/gallery/" + dir + "/" + stub + "-" + n + ".png";
      sources.push(src);
      var fig = document.createElement("figure");
      fig.className = "shot";
      fig.setAttribute("data-i", i - 1);
      var img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      img.alt = "Wrap It Up " + cat + " project " + i;
      fig.appendChild(img);
      frag.appendChild(fig);
    }
    galEl.appendChild(frag);
  }

  /* lightbox */
  var lb = document.querySelector(".lightbox");
  if (lb && sources.length) {
    var lbImg = lb.querySelector("img");
    var lbCount = lb.querySelector(".lightbox__count");
    var cur = 0;
    function show(idx) {
      cur = (idx + sources.length) % sources.length;
      lbImg.src = sources[cur];
      if (lbCount) lbCount.textContent = (cur + 1) + " / " + sources.length;
    }
    function openLb(idx) { show(idx); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; }
    function closeLb() { lb.classList.remove("is-open"); document.body.style.overflow = ""; }

    if (galEl) galEl.addEventListener("click", function (e) {
      var fig = e.target.closest(".shot");
      if (fig) openLb(+fig.getAttribute("data-i"));
    });
    lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(cur + 1); });
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(cur - 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") show(cur + 1);
      if (e.key === "ArrowLeft") show(cur - 1);
    });
  }

  /* ---- contact form (client-side validation + mailto fallback) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var valid = input.value.trim() !== "" &&
          (input.type !== "email" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;

      var name = (form.querySelector("#name") || {}).value || "";
      var service = (form.querySelector("#service") || {}).value || "";
      var msg = (form.querySelector("#message") || {}).value || "";
      var email = (form.querySelector("#email") || {}).value || "";
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\nService: " + service + "\n\n" + msg
      );
      window.location.href = "mailto:hector@wrapitupgraphix.com?subject=" +
        encodeURIComponent("New project inquiry from " + name) + "&body=" + body;

      form.style.display = "none";
      var ack = document.querySelector(".form__ok");
      if (ack) ack.classList.add("show");
    });
    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".field").classList.remove("invalid");
      });
    });
  }
})();
