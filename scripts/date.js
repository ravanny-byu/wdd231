
const anoAtual = document.querySelector("#currentyear");
const ultimaModificacao = document.querySelector("#lastModified");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}
