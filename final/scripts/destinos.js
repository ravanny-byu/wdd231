import { obterDestinos, obterInfoPais } from './datos.js';

function criarCartaoDestino(item, infoPais) {
    const artigo = document.createElement('article');
    artigo.className = 'card';

    const detalhePais = infoPais
        ? `<p><strong>Capital:</strong> ${infoPais.capital} · <strong>População:</strong> ${infoPais.populacao}</p>`
        : '';

    artigo.innerHTML = `
        <img src="${item.imagem}" alt="${item.alt}" loading="lazy">
        <span class="meta-tag">${item.pais} · ${item.regiao}</span>
        <h3>${item.nome}</h3>
        <p>${item.resumo}</p>
        <p><strong>Curiosidade:</strong> ${item.curiosidade}</p>
        ${detalhePais}
    `;
    return artigo;
}

export async function renderizarDestaquesHome(seletorContainer) {
    const container = document.querySelector(seletorContainer);
    if (!container) return;

    try {
        const destinos = await obterDestinos();
        const destaques = destinos.filter((d) => d.destaqueHome);
        container.innerHTML = '';

        for (const item of destaques) {
            const infoPais = await obterInfoPais(item.codigoPais);
            container.appendChild(criarCartaoDestino(item, infoPais));
        }
    } catch (erro) {
        container.innerHTML = `<p>Erro ao carregar destaques: ${erro.message}</p>`;
    }
}

export async function inicializarPaginaDestinos(seletorLista, seletorFiltroCategoria) {
    const container = document.querySelector(seletorLista);
    const filtro = document.querySelector(seletorFiltroCategoria);
    if (!container) return;

    try {
        const destinos = await obterDestinos();

        const desenhar = async (categoriaSelecionada = 'todos') => {
            const filtrados = categoriaSelecionada === 'todos'
                ? destinos
                : destinos.filter((d) => d.categoria === categoriaSelecionada);

            container.innerHTML = '';
            for (const item of filtrados) {
                const infoPais = await obterInfoPais(item.codigoPais);
                container.appendChild(criarCartaoDestino(item, infoPais));
            }
        };

        await desenhar();

        if (filtro) {
            filtro.addEventListener('change', (evento) => {
                desenhar(evento.target.value);
            });
        }
    } catch (erro) {
        container.innerHTML = `<p>Erro ao carregar destinos: ${erro.message}</p>`;
    }
}

export async function renderizarCuriosidades(seletorContainer) {
    const container = document.querySelector(seletorContainer);
    if (!container) return;

    try {
        const destinos = await obterDestinos();
        container.innerHTML = '';

        destinos.forEach((item) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <span class="meta-tag">${item.nome} (${item.pais})</span>
                <h3>História e Curiosidade</h3>
                <p>${item.curiosidade}</p>
            `;
            container.appendChild(card);
        });
    } catch (erro) {
        container.innerHTML = `<p>Erro ao carregar curiosidades: ${erro.message}</p>`;
    }
}