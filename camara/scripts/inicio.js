
// ==========================================
// CÂMARA DE COMÉRCIO DE RIO DAS OSTRAS
// Página inicial
// ==========================================

// ELEMENTOS DO HTML
const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const empresasDestaque = document.querySelector("#empresasDestaque");

const temperatura = document.querySelector("#temperatura");
const descricaoTempo = document.querySelector("#descricaoTempo");
const sensacaoTermica = document.querySelector("#sensacaoTermica");
const previsaoDias = document.querySelector("#previsaoDias");

// ==========================================
// MENU DE NAVEGAÇÃO
// ==========================================

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        menu.classList.toggle("aberto");
    });
}

// ==========================================
// RODAPÉ
// ==========================================

const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}

// ==========================================
// EMPRESAS EM DESTAQUE
// ==========================================

async function carregarDestaques() {
    try {
        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar membros.");
        }

        const empresas = await resposta.json();

        // Seleciona somente empresas Ouro e Prata
        const empresasElegiveis = empresas.filter((empresa) => {
            return empresa.membershipLevel === 2 ||
                   empresa.membershipLevel === 3;
        });

        // Embaralha as empresas aleatoriamente
        empresasElegiveis.sort(() => Math.random() - 0.5);

        // Seleciona três empresas
        const selecionadas = empresasElegiveis.slice(0, 3);

        mostrarDestaques(selecionadas);

    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);

        empresasDestaque.innerHTML =
            "<p>Não foi possível carregar as empresas em destaque.</p>";
    }
}

// Cria os cartões das empresas
function mostrarDestaques(empresas) {
    empresasDestaque.innerHTML = "";

    if (empresas.length === 0) {
        empresasDestaque.textContent =
            "Nenhuma empresa Ouro ou Prata encontrada.";
        return;
    }

    empresas.forEach((empresa) => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-destaque");

        // Logotipo
        const imagem = document.createElement("img");
        imagem.src = `imagens/${empresa.image}`;
        imagem.alt = `Logotipo de ${empresa.name}`;
        imagem.loading = "lazy";

        // Nome
        const nome = document.createElement("h3");
        nome.textContent = empresa.name;

        // Categoria
        const categoria = document.createElement("p");
        categoria.textContent = empresa.category || "Empresa associada";

        // Endereço
        const endereco = document.createElement("p");
        endereco.textContent = `Endereço: ${empresa.address}`;

        // Telefone
        const telefone = document.createElement("p");
        telefone.textContent = `Telefone: ${empresa.phone}`;

        // Nível de associação
        const nivel = document.createElement("p");

        const nomesNiveis = {
            1: "Associado comum",
            2: "Associado Prata",
            3: "Associado Ouro"
        };

        nivel.textContent = `Associação: ${nomesNiveis[empresa.membershipLevel]}`;

        // Adiciona informações ao cartão
        cartao.append(
            imagem,
            nome,
            categoria,
            endereco,
            telefone,
            nivel
        );

        // Link do site
        if (empresa.website && empresa.website.trim() !== "") {
            const site = document.createElement("a");

            site.href = empresa.website;
            site.textContent = "Visitar site";
            site.target = "_blank";
            site.rel = "noopener noreferrer";

            cartao.appendChild(site);
        }

        empresasDestaque.appendChild(cartao);
    });
}

// ==========================================
// CLIMA ATUAL E PREVISÃO
// ==========================================

// Coordenadas de Rio das Ostras - RJ
const latitude = -22.5269;
const longitude = -41.9450;

// A chave será carregada de config.js
async function carregarClima() {
    try {
        if (!window.OPENWEATHER_API_KEY) {
            throw new Error("Chave da API não configurada.");
        }

        const chave = window.OPENWEATHER_API_KEY;

        // Busca o clima atual
        const urlAtual =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chave}`;

        const respostaAtual = await fetch(urlAtual);

        if (!respostaAtual.ok) {
            throw new Error("Erro ao consultar o clima atual.");
        }

        const dadosAtuais = await respostaAtual.json();

        temperatura.textContent =
            `${Math.round(dadosAtuais.main.temp)} °C`;

        descricaoTempo.textContent =
            dadosAtuais.weather[0].description;

        sensacaoTermica.textContent =
            `${Math.round(dadosAtuais.main.feels_like)} °C`;

        // Busca a previsão dos próximos dias
        const urlPrevisao =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chave}`;

        const respostaPrevisao = await fetch(urlPrevisao);

        if (!respostaPrevisao.ok) {
            throw new Error("Erro ao consultar a previsão.");
        }

        const dadosPrevisao = await respostaPrevisao.json();

        mostrarPrevisao(dadosPrevisao.list);

    } catch (erro) {
        console.error("Erro no clima:", erro);

        temperatura.textContent = "Indisponível";
        descricaoTempo.textContent = "Não foi possível carregar";
        sensacaoTermica.textContent = "Indisponível";

        previsaoDias.textContent =
            "Não foi possível carregar a previsão do tempo.";
    }
}

// ==========================================
// MOSTRAR PREVISÃO PARA TRÊS DIAS
// ==========================================

function mostrarPrevisao(lista) {
    previsaoDias.innerHTML = "";

    const previsoesPorDia = {};

    // Agrupa as previsões por data
    lista.forEach((item) => {
        const data = item.dt_txt.split(" ")[0];

        if (!previsoesPorDia[data]) {
            previsoesPorDia[data] = [];
        }

        previsoesPorDia[data].push(item);
    });

    const hoje = new Date();

    // Considera somente os próximos três dias
    const proximosDias = Object.keys(previsoesPorDia)
        .filter((data) => {
            const dataUTC = new Date(`${data}T00:00:00Z`);

            const hojeUTC = Date.UTC(
                hoje.getFullYear(),
                hoje.getMonth(),
                hoje.getDate()
            );

            const diferenca = Math.round(
                (dataUTC.getTime() - hojeUTC) / 86400000
            );

            return diferenca >= 1 && diferenca <= 3;
        })
        .sort()
        .slice(0, 3);

    proximosDias.forEach((data) => {
        const previsoes = previsoesPorDia[data];

        // Escolhe o horário mais próximo de 12h
        const previsao = previsoes.reduce((melhor, atual) => {
            const horaMelhor = Number(melhor.dt_txt.slice(11, 13));
            const horaAtual = Number(atual.dt_txt.slice(11, 13));

            return Math.abs(horaAtual - 12) <
                   Math.abs(horaMelhor - 12)
                ? atual
                : melhor;
        });

        const cartao = document.createElement("article");
        cartao.classList.add("cartao-previsao");

        const titulo = document.createElement("h4");

        const [ano, mes, dia] = data.split("-");

        titulo.textContent = new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia)
        ).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit"
        });

        const temp = document.createElement("p");
        temp.textContent =
            `${Math.round(previsao.main.temp)} °C`;

        const descricao = document.createElement("p");
        descricao.textContent =
            previsao.weather[0].description;

        cartao.append(titulo, temp, descricao);

        previsaoDias.appendChild(cartao);
    });

    if (proximosDias.length === 0) {
        previsaoDias.textContent =
            "Previsão para os próximos dias indisponível.";
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarDestaques();
carregarClima();
