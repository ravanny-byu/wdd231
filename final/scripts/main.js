import { renderizarDestaquesHome, inicializarPaginaDestinos, renderizarCuriosidades } from './destinos.js';
import { configurarFormulario, exibirResultadoFormulario } from './formulario.js';

function configurarMenuMobile() {
    const botao = document.querySelector('#menu-toggle');
    const listaNav = document.querySelector('#nav-list');
    if (!botao || !listaNav) return;

    botao.addEventListener('click', () => {
        const aberto = listaNav.classList.toggle('open');
        botao.setAttribute('aria-expanded', String(aberto));
    });
}

function atualizarRodape() {
    const anoSpan = document.querySelector('#ano-atual');
    if (anoSpan) {
        anoSpan.textContent = String(new Date().getFullYear());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    configurarMenuMobile();
    atualizarRodape();

    const pagina = document.body.dataset.page;
    if (pagina === 'home') {
        renderizarDestaquesHome('#destaques-home');
    } else if (pagina === 'destinos') {
        inicializarPaginaDestinos('#lista-destinos', '#filtro-categoria');
    } else if (pagina === 'explorar') {
        renderizarCuriosidades('#lista-curiosidades');
        configurarFormulario('#form-sugestao');
    } else if (pagina === 'resultado') {
        exibirResultadoFormulario('#resultado-envio');
    }
});