/* =========================================================
   MACIN FRAMEWORK - JS MÍNIMO
   - Inicializa iconos Lucide
   - Toggle de navbar móvil (icono menu/x)
   - Abrir/cerrar modal
   - Toggle genérico con data-toggle
   ========================================================= */
(function () {
  "use strict";

  function renderIcons() {
      if (window.lucide) window.lucide.createIcons();
  }

    /* ---------- Navbar móvil ---------- */
    function initNavbar() {
        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");
        if (!menuToggle || !navLinks) return;

        const logoImg = document.querySelector(".navbar .logo img");

        function setMenuIcon(isOpen) {
            if (logoImg) logoImg.src = isOpen ? "logo.svg" : "logo-blanco.svg";
            menuToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            renderIcons();
        }

        // Renderizar el ícono inicial
        setMenuIcon(false);

        // Al hacer clic, aplicamos la transición, abrimos/cerramos y luego la quitamos
        menuToggle.addEventListener("click", () => {
            navLinks.style.transition = "transform 0.15s ease-in-out";

            const isOpen = navLinks.classList.toggle("active");
            setMenuIcon(isOpen);

            // Quitamos la transición al terminar para evitar conflictos
            if (!isOpen) {
              setTimeout(() => {
                  navLinks.style.transition = "none";
              }, 150);
            }
        });

        // Al redimensionar la ventana
        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                // Si pasamos a escritorio, quitamos el estado activo sin animación
                navLinks.style.transition = "none";
                navLinks.classList.remove("active");
                setMenuIcon(false);
            }
        });
    }
    /* ---------- Modal ---------- */
    function initModals() {
        // Botones con data-modal-open="idModal"
        document.querySelectorAll("[data-modal-open]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = btn.getAttribute("data-modal-open");
                const overlay = document.getElementById(id);
                if (overlay) {
                    overlay.classList.add("is-active");
                    document.body.style.overflow = "hidden";
                }
            });
        });

        // Cerrar: data-modal-close, click en overlay o tecla Escape
        document.querySelectorAll(".modal-overlay").forEach((overlay) => {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) closeModal(overlay);
            });
            overlay.querySelectorAll("[data-modal-close]").forEach((btn) => {
                btn.addEventListener("click", () => closeModal(overlay));
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                document
                    .querySelectorAll(".modal-overlay.is-active")
                    .forEach(closeModal);
            }
        });

        function closeModal(overlay) {
            overlay.classList.remove("is-active");
            document.body.style.overflow = "";
        }
    }

    /* ---------- Init ---------- */
    window.addEventListener("load", () => {
        renderIcons();
        initNavbar();
        initModals();
    });
})();
