const listaEmpresas = document.querySelector("#listaEmpresas");
const botaoGrade = document.querySelector("#visualizacaoGrade");
const botaoLista = document.querySelector("#visualizacaoLista");
const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");

async function carregarEmpresas() {
    if (!listaEmpresas) return;

    try {
        const resposta = await fetch("dados/membros.json");
        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status} ao carregar os dados.`);
        }

        const empresas = await resposta.json();
        mostrarEmpresas(empresas);
    } catch (erro) {
        console.error("Erro:", erro);
        const mensagem = document.createElement("p");
        mensagem.textContent = "Não foi possível carregar as empresas.";
        listaEmpresas.replaceChildren(mensagem);
    }
}

function mostrarEmpresas(empresas) {
    if (!listaEmpresas) return;
    listaEmpresas.innerHTML = "";

    const nomesNiveis = {
        1: "Associado comum",
        2: "Associado prata",
        3: "Associado ouro"
    };

    empresas.forEach((empresa) => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-empresa");

        const imagem = document.createElement("img");
        imagem.src = `imagens/${empresa.image}`;
        imagem.alt = `Imagem de ${empresa.name}`;
        imagem.loading = "lazy";
        imagem.width = 200;
        imagem.height = 120;

        const nome = document.createElement("h3");
        nome.textContent = empresa.name;

        const categoria = document.createElement("p");
        categoria.textContent = empresa.category;

        const endereco = document.createElement("p");
        endereco.textContent = empresa.address;

        const telefone = document.createElement("p");
        telefone.textContent = empresa.phone;

        const nivel = document.createElement("p");
        nivel.textContent = nomesNiveis[empresa.membershipLevel] || "Associado";

        cartao.append(imagem, nome, categoria, endereco, telefone, nivel);

        if (empresa.website && empresa.website.trim() !== "") {
            const site = document.createElement("a");
            site.href = empresa.website;
            site.textContent = "Visitar site";
            site.target = "_blank";
            site.rel = "noopener noreferrer";
            cartao.appendChild(site);
        }

        listaEmpresas.appendChild(cartao);
    });
}

if (botaoGrade && botaoLista && listaEmpresas) {
    botaoGrade.addEventListener("click", () => {
        listaEmpresas.classList.remove("lista-empresas");
        listaEmpresas.classList.add("grade-empresas");
        botaoGrade.setAttribute("aria-pressed", "true");
        botaoLista.setAttribute("aria-pressed", "false");
    });

    botaoLista.addEventListener("click", () => {
        listaEmpresas.classList.remove("grade-empresas");
        listaEmpresas.classList.add("lista-empresas");
        botaoLista.setAttribute("aria-pressed", "true");
        botaoGrade.setAttribute("aria-pressed", "false");
    });
}

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const menuAberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", String(menuAberto));
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
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

const anoAtual = document.querySelector("#anoAtual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

const ultimaModificacao = document.querySelector("#ultimaModificacao");
if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}

carregarEmpresas();