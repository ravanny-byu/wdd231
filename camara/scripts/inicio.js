const botaoMenu = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const empresasDestaque = document.querySelector("#empresasDestaque");

const temperatura = document.querySelector("#temperatura");
const descricaoTempo = document.querySelector("#descricaoTempo");
const sensacaoTermica = document.querySelector("#sensacaoTermica");
const iconeTempo = document.querySelector("#iconeTempo");
const previsaoDias = document.querySelector("#previsaoDias");

function capitalizar(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
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

async function carregarDestaques() {
    if (!empresasDestaque) return;

    try {
        const resposta = await fetch("dados/membros.json");
        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status} ao carregar membros.`);
        }

        const empresas = await resposta.json();
        const empresasElegiveis = empresas.filter(
            (empresa) => empresa.membershipLevel === 2 || empresa.membershipLevel === 3
        );

        const selecionadas = embaralhar(empresasElegiveis).slice(0, 3);
        mostrarDestaques(selecionadas);
    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);
        empresasDestaque.textContent = "Não foi possível carregar as empresas em destaque.";
    }
}

function mostrarDestaques(empresas) {
    if (!empresasDestaque) return;
    empresasDestaque.innerHTML = "";

    if (empresas.length === 0) {
        empresasDestaque.textContent = "Nenhuma empresa Ouro ou Prata encontrada.";
        return;
    }

    const nomesNiveis = {
        1: "Associado comum",
        2: "Associado Prata",
        3: "Associado Ouro"
    };

    empresas.forEach((empresa) => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-destaque");

        const imagem = document.createElement("img");
        imagem.src = `imagens/${empresa.image}`;
        imagem.alt = `Logotipo de ${empresa.name}`;
        imagem.loading = "lazy";
        imagem.width = 200;
        imagem.height = 120;

        const nome = document.createElement("h3");
        nome.textContent = empresa.name;

        const categoria = document.createElement("p");
        categoria.textContent = empresa.category || "Empresa associada";

        const endereco = document.createElement("p");
        endereco.textContent = `Endereço: ${empresa.address}`;

        const telefone = document.createElement("p");
        telefone.textContent = `Telefone: ${empresa.phone}`;

        const nivel = document.createElement("p");
        nivel.textContent = `Associação: ${nomesNiveis[empresa.membershipLevel] || "Associado"}`;

        cartao.append(imagem, nome, categoria, endereco, telefone, nivel);

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

const latitude = -22.5269;
const longitude = -41.945;

async function carregarClima() {
    if (!temperatura || !descricaoTempo || !sensacaoTermica || !previsaoDias) return;

    try {
        const chave = window.OPENWEATHER_API_KEY;
        if (!chave) {
            throw new Error("Chave da API OpenWeatherMap não configurada.");
        }

        const urlAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chave}`;
        const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chave}`;

        const [respostaAtual, respostaPrevisao] = await Promise.all([
            fetch(urlAtual),
            fetch(urlPrevisao)
        ]);

        if (!respostaAtual.ok || !respostaPrevisao.ok) {
            throw new Error("Erro ao consultar os dados meteorológicos.");
        }

        const [dadosAtuais, dadosPrevisao] = await Promise.all([
            respostaAtual.json(),
            respostaPrevisao.json()
        ]);

        temperatura.textContent = `${Math.round(dadosAtuais.main.temp)} °C`;
        descricaoTempo.textContent = capitalizar(dadosAtuais.weather[0].description);
        sensacaoTermica.textContent = `${Math.round(dadosAtuais.main.feels_like)} °C`;

        if (iconeTempo && dadosAtuais.weather[0].icon) {
            iconeTempo.src = `https://openweathermap.org/img/wn/${dadosAtuais.weather[0].icon}@2x.png`;
            iconeTempo.alt = capitalizar(dadosAtuais.weather[0].description);
        }

        mostrarPrevisao(dadosPrevisao.list);
    } catch (erro) {
        console.error("Erro no clima:", erro);
        temperatura.textContent = "Indisponível";
        descricaoTempo.textContent = "Não foi possível carregar";
        sensacaoTermica.textContent = "Indisponível";
        previsaoDias.textContent = "Não foi possível carregar a previsão do tempo.";
    }
}

function mostrarPrevisao(lista) {
    if (!previsaoDias) return;
    previsaoDias.innerHTML = "";

    const previsoesPorDia = {};
    lista.forEach((item) => {
        const data = item.dt_txt.split(" ")[0];
        if (!previsoesPorDia[data]) {
            previsoesPorDia[data] = [];
        }
        previsoesPorDia[data].push(item);
    });

    const hoje = new Date();
    const hojeUTC = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    const proximosDias = Object.keys(previsoesPorDia)
        .filter((data) => {
            const dataUTC = new Date(`${data}T00:00:00Z`);
            const diferenca = Math.round((dataUTC.getTime() - hojeUTC) / 86400000);
            return diferenca >= 1 && diferenca <= 3;
        })
        .sort()
        .slice(0, 3);

    proximosDias.forEach((data) => {
        const previsao = previsoesPorDia[data].reduce((melhor, atual) => {
            const horaMelhor = Number(melhor.dt_txt.slice(11, 13));
            const horaAtual = Number(atual.dt_txt.slice(11, 13));
            return Math.abs(horaAtual - 12) < Math.abs(horaMelhor - 12) ? atual : melhor;
        });

        const cartao = document.createElement("article");
        cartao.classList.add("cartao-previsao");

        const titulo = document.createElement("h4");
        const [ano, mes, dia] = data.split("-");
        const dataFormatada = new Date(Number(ano), Number(mes) - 1, Number(dia))
            .toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit"
            });

        titulo.textContent = capitalizar(dataFormatada);

        const temp = document.createElement("p");
        temp.textContent = `${Math.round(previsao.main.temp)} °C`;

        const descricao = document.createElement("p");
        descricao.textContent = capitalizar(previsao.weather[0].description);

        cartao.append(titulo, temp, descricao);
        previsaoDias.appendChild(cartao);
    });

    if (proximosDias.length === 0) {
        previsaoDias.textContent = "Previsão para os próximos dias indisponível.";
    }
}

carregarDestaques();
carregarClima();