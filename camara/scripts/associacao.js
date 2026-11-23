const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
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

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
        });
    });
}

const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}

const campoDataHora = document.querySelector("#dataHora");
if (campoDataHora) {
    campoDataHora.value = new Date().toISOString();
}

const botoesDialog = document.querySelectorAll("[data-dialog]");
let ultimoBotaoAcionador = null;

botoesDialog.forEach((botao) => {
    botao.addEventListener("click", () => {
        const idDialog = botao.dataset.dialog;
        const dialog = document.querySelector(`#${idDialog}`);
        if (dialog) {
            ultimoBotaoAcionador = botao;
            dialog.showModal();
        }
    });
});

function restaurarFocoDialog() {
    if (ultimoBotaoAcionador) {
        ultimoBotaoAcionador.focus();
        ultimoBotaoAcionador = null;
    }
}

document.querySelectorAll(".fechar-dialog").forEach((botao) => {
    botao.addEventListener("click", () => {
        const dialog = botao.closest("dialog");
        if (dialog) {
            dialog.close();
            restaurarFocoDialog();
        }
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (evento) => {
        if (evento.target === dialog) {
            dialog.close();
            restaurarFocoDialog();
        }
    });

    dialog.addEventListener("cancel", () => {
        restaurarFocoDialog();
    });
});