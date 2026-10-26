(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  // ---------- 深浅色切换 ----------
  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return media.matches ? "dark" : "light";
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // 隐私模式等情况下存不了，忽略即可
    }
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      saveTheme(next);
    });
  }

  // ---------- 滚动后给导航加底线 ----------
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- 导航高亮当前区块 ----------
  var links = document.querySelectorAll(".nav a");
  var sections = [];
  links.forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (target) sections.push({ link: link, el: target });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sections.forEach(function (s) {
            s.link.classList.toggle("is-active", s.el === entry.target);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s.el);
    });
  }

  // ---------- 进入视口时淡入 ----------
  var revealTargets = document.querySelectorAll(".hero-inner, .section-head, .card, .contact-list li");
  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      revealer.observe(el);
    });
  }

  // ---------- 复制邮箱 ----------
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      var original = btn.textContent;
      function done(label) {
        btn.textContent = label;
        setTimeout(function () {
          btn.textContent = original;
        }, 1600);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () { done("已复制"); },
          function () { done("复制失败"); }
        );
      } else {
        done("请手动复制");
      }
    });
  });

  // ---------- 页脚年份 ----------
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
