export function configurarFormulario(seletorForm) {
    const form = document.querySelector(seletorForm);
    if (!form) return;

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const dados = new FormData(form);
        const parametros = new URLSearchParams({
            nome: String(dados.get('nome') || '').trim(),
            email: String(dados.get('email') || '').trim(),
            lugar: String(dados.get('lugar') || '').trim(),
            mensagem: String(dados.get('mensagem') || '').trim()
        });
        window.location.href = `resultado.html?${parametros.toString()}`;
    });
}

export function exibirResultadoFormulario(seletorContainer) {
    const container = document.querySelector(seletorContainer);
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const nome = params.get('nome') || 'Visitante';
    const email = params.get('email') || 'Não informado';
    const lugar = params.get('lugar') || 'Não informado';
    const mensagem = params.get('mensagem') || 'Sem mensagem adicional.';

    container.innerHTML = `
        <div class="card">
            <h2>Registo / Sugestão Recebida</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Lugar ou destino sugerido:</strong> ${lugar}</p>
            <p><strong>Mensagem:</strong> ${mensagem}</p>
            <a class="btn" href="explorar.html">Voltar a Explorar</a>
        </div>
    `;
}