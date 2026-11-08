
const listaEmpresas = document.querySelector("#listaEmpresas");
const botaoGrade = document.querySelector("#visualizacaoGrade");
const botaoLista = document.querySelector("#visualizacaoLista");
const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");

// Carrega as empresas do arquivo JSON
async function carregarEmpresas() {
    try {
        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        const empresas = await resposta.json();

        mostrarEmpresas(empresas);
    } catch (erro) {
        console.error("Erro:", erro);
        listaEmpresas.innerHTML = "<p>Não foi possível carregar as empresas.</p>";
    }
}

// Cria os cartões das empresas
function mostrarEmpresas(empresas) {
    listaEmpresas.innerHTML = "";

    empresas.forEach((empresa) => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-empresa");

        const imagem = document.createElement("img");
        imagem.src = `imagens/${empresa.image}`;
        imagem.alt = `Imagem de ${empresa.name}`;
        imagem.loading = "lazy";

        const nome = document.createElement("h3");
        nome.textContent = empresa.name;

        const categoria = document.createElement("p");
        categoria.textContent = empresa.category;

        const endereco = document.createElement("p");
        endereco.textContent = empresa.address;

        const telefone = document.createElement("p");
        telefone.textContent = empresa.phone;

        const nivel = document.createElement("p");
        const nomesNiveis = {
            1: "Associado comum",
            2: "Associado prata",
            3: "Associado ouro"
        };
        nivel.textContent = nomesNiveis[empresa.membershipLevel];

        cartao.append(
            imagem,
            nome,
            categoria,
            endereco,
            telefone,
            nivel
        );

        if (empresa.website) {
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

// Alterna para visualização em grade
botaoGrade.addEventListener("click", () => {
    listaEmpresas.classList.remove("lista-empresas");
    listaEmpresas.classList.add("grade-empresas");
});

// Alterna para visualização em lista
botaoLista.addEventListener("click", () => {
    listaEmpresas.classList.remove("grade-empresas");
    listaEmpresas.classList.add("lista-empresas");
});

// Abre e fecha o menu em telas pequenas
botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("aberto");
});

// Atualiza o ano do rodapé
document.querySelector("#anoAtual").textContent = new Date().getFullYear();

// Mostra a data da última modificação
document.querySelector("#ultimaModificacao").textContent = document.lastModified;

// Inicia o carregamento
carregarEmpresas();
