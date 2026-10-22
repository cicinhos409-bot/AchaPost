/* ==========================================================
   AchaPost - landing page
   JavaScript puro, sem bibliotecas.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- 1. Menu mobile ---------- */
  var botaoMenu = document.getElementById("menu-botao");
  var menu = document.getElementById("menu");

  function fecharMenu() {
    if (!menu || !botaoMenu) return;
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botaoMenu.setAttribute("aria-expanded", String(aberto));
      botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    // Fecha ao clicar em um link do menu
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });

    // Fecha com a tecla Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharMenu();
    });
  }

  /* ---------- 2. Acordeão do FAQ ---------- */
  var perguntas = document.querySelectorAll(".faq-pergunta");

  function fecharItem(botao) {
    botao.setAttribute("aria-expanded", "false");
    botao.nextElementSibling.style.maxHeight = null;
  }

  perguntas.forEach(function (botao) {
    botao.addEventListener("click", function () {
      var abrir = botao.getAttribute("aria-expanded") !== "true";

      // Mantém só um item aberto por vez
      perguntas.forEach(fecharItem);

      if (abrir) {
        botao.setAttribute("aria-expanded", "true");
        var resposta = botao.nextElementSibling;
        resposta.style.maxHeight = resposta.scrollHeight + "px";
      }
    });
  });

  // Recalcula a altura do item aberto se a tela mudar de tamanho
  window.addEventListener("resize", function () {
    perguntas.forEach(function (botao) {
      if (botao.getAttribute("aria-expanded") === "true") {
        botao.nextElementSibling.style.maxHeight = botao.nextElementSibling.scrollHeight + "px";
      }
    });
  });

  /* ---------- 3. Alternância Mensal / Anual ---------- */
  var botoesPeriodo = document.querySelectorAll(".alt-botao");
  var precos = document.querySelectorAll(".plano-preco strong");
  var textosPeriodo = document.querySelectorAll(".periodo-texto");

  function definirPeriodo(periodo) {
    botoesPeriodo.forEach(function (b) {
      var ativo = b.getAttribute("data-periodo") === periodo;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });

    precos.forEach(function (el) {
      var valor = el.getAttribute("data-" + periodo);
      if (valor) el.textContent = valor;
    });

    textosPeriodo.forEach(function (el) {
      el.textContent = periodo === "anual" ? "/ano" : "/mês";
    });
  }

  botoesPeriodo.forEach(function (b) {
    b.addEventListener("click", function () {
      definirPeriodo(b.getAttribute("data-periodo"));
    });
  });

  /* ---------- 4. Animações ao rolar ---------- */
  var itens = document.querySelectorAll(".revelar");

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    itens.forEach(function (el) { observador.observe(el); });
  } else {
    // Navegadores antigos: mostra tudo de uma vez
    itens.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- 5. Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
