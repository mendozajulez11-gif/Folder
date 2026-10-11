document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Diseñador de Bases de Datos",
    "Estudiante de 5° Ciclo - Ing. de Sistemas",
    "Desarrollador de Software Full Stack"
  ];

  let i = 0;

  function typingEffect() {
    let word = words[i].split("");
    function loopTyping() {
      if (word.length > 0) {
        const el = document.getElementById('typewriter');
        if (el) el.innerHTML += word.shift();
      } else {
        setTimeout(deletingEffect, 2000);
        return;
      }
      setTimeout(loopTyping, 70);
    }
    loopTyping();
  }

  function deletingEffect() {
    let word = words[i].split("");
    function loopDeleting() {
      if (word.length > 0) {
        word.pop();
        const el = document.getElementById('typewriter');
        if (el) el.innerHTML = word.join("");
      } else {
        i = (i + 1) % words.length;
        setTimeout(typingEffect, 400);
        return;
      }
      setTimeout(loopDeleting, 35);
    }
    loopDeleting();
  }

  typingEffect();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Toggle de tema claro / oscuro (por defecto: claro) ---
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a fondo blanco' : 'Cambiar a fondo oscuro');
    }
  }

  let savedTheme = 'light';
  try {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') savedTheme = stored;
  } catch (e) { /* localStorage no disponible: se mantiene 'light' */ }

  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* per-viewer only */ }
    });
  }
});