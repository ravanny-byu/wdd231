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

const parametros = new URLSearchParams(window.location.search);

function mostrarResultado(parametro, elementoId, mapaValores = null) {
    const elemento = document.querySelector(`#${elementoId}`);
    const valor = parametros.get(parametro);

    if (elemento) {
        if (valor && valor.trim()) {
            const textoLimpo = valor.trim();
            elemento.textContent = mapaValores && mapaValores[textoLimpo]
                ? mapaValores[textoLimpo]
                : textoLimpo;
        } else {
            elemento.textContent = "Não informado";
        }
    }
}

const nomesNiveis = {
    np: "Não Lucrativo",
    bronze: "Bronze",
    silver: "Prata",
    gold: "Ouro"
};

mostrarResultado("primeiroNome", "resultadoPrimeiroNome");
mostrarResultado("sobrenome", "resultadoSobrenome");
mostrarResultado("email", "resultadoEmail");
mostrarResultado("telefone", "resultadoTelefone");
mostrarResultado("organizacao", "resultadoOrganizacao");
mostrarResultado("nivel", "resultadoNivel", nomesNiveis);

const campoDataHora = document.querySelector("#resultadoDataHora");
const dataRecebida = parametros.get("dataHora");

if (campoDataHora && dataRecebida) {
    const data = new Date(dataRecebida);
    if (!Number.isNaN(data.getTime())) {
        campoDataHora.textContent = data.toLocaleString("pt-BR");
    }
}