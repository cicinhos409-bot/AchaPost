/* ==========================================================
   AchaPost - páginas legais
   JavaScript puro, sem bibliotecas.
   ========================================================== */
(function () {
  "use strict";

  var indice = document.querySelector(".legal-indice");
  var links = document.querySelectorAll(".legal-indice a");
  var secoes = document.querySelectorAll(".legal-texto section[id]");

  /* ---------- 1. Índice: aberto no computador, recolhido no celular ---------- */
  var telaGrande = window.matchMedia("(min-width: 900px)");

  function ajustarIndice() {
    if (!indice) return;
    if (telaGrande.matches) indice.setAttribute("open", "");
    else indice.removeAttribute("open");
  }

  ajustarIndice();
  if (telaGrande.addEventListener) telaGrande.addEventListener("change", ajustarIndice);
  else if (telaGrande.addListener) telaGrande.addListener(ajustarIndice);

  // No celular, fecha o índice depois de escolher uma seção
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      if (!telaGrande.matches && indice) indice.removeAttribute("open");
    });
  });

  /* ---------- 2. Destaca no índice a seção que está na tela ---------- */
  function marcar(id) {
    links.forEach(function (a) {
      a.classList.toggle("ativo", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && secoes.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) marcar(e.target.id);
      });
    }, { rootMargin: "-90px 0px -65% 0px", threshold: 0 });

    secoes.forEach(function (s) { observador.observe(s); });
  }

  /* ---------- 3. Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
