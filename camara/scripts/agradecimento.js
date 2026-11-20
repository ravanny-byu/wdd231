
// Recuperar os dados enviados pelo formulário
const parametros = new URLSearchParams(window.location.search);

// Exibir os dados com segurança usando textContent
function mostrarResultado(parametro, elementoId) {
    const elemento = document.querySelector(`#${elementoId}`);
    const valor = parametros.get(parametro);

    if (elemento) {
        elemento.textContent = valor && valor.trim()
            ? valor
            : "Não informado";
    }
}

// Dados pessoais e da organização
mostrarResultado("primeiroNome", "resultadoPrimeiroNome");
mostrarResultado("sobrenome", "resultadoSobrenome");
mostrarResultado("email", "resultadoEmail");
mostrarResultado("telefone", "resultadoTelefone");
mostrarResultado("organizacao", "resultadoOrganizacao");

// Data e hora
const campoDataHora = document.querySelector("#resultadoDataHora");
const dataRecebida = parametros.get("dataHora");

if (campoDataHora && dataRecebida) {
    const data = new Date(dataRecebida);

    if (!Number.isNaN(data.getTime())) {
        campoDataHora.textContent = data.toLocaleString("pt-BR");
    }
}
