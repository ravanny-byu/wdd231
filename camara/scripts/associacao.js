
// Menu de navegação
const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");

        botaoMenu.setAttribute("aria-expanded", aberto);
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menu.classList.contains("aberto")) {
            menu.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
            botaoMenu.focus();
        }
    });
}

// Atualizar ano e data de modificação no rodapé
const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}

// Registrar data e hora em que a página foi carregada
const campoDataHora = document.querySelector("#dataHora");

if (campoDataHora) {
    campoDataHora.value = new Date().toISOString();
}

// Abrir os diálogos dos níveis de associação
const botoesDialog = document.querySelectorAll("[data-dialog]");

botoesDialog.forEach((botao) => {
    botao.addEventListener("click", () => {
        const idDialog = botao.dataset.dialog;
        const dialog = document.querySelector(`#${idDialog}`);

        if (dialog) {
            dialog.showModal();
        }
    });
});

// Fechar os diálogos
const botoesFechar = document.querySelectorAll(".fechar-dialog");

botoesFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const dialog = botao.closest("dialog");

        if (dialog) {
            dialog.close();
        }
    });
});

// Fechar diálogo ao clicar fora do conteúdo
document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (evento) => {
        if (evento.target === dialog) {
            dialog.close();
        }
    });
});
