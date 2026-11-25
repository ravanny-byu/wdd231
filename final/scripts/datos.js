export async function obterDestinos() {
    const resposta = await fetch('dados/destinos.json');
    if (!resposta.ok) {
        throw new Error('Não foi possível carregar dados/destinos.json');
    }
    return resposta.json();
}

export async function obterInfoPais(codigoPais) {
    if (!codigoPais) return null;
    try {
        const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${codigoPais}`);
        if (!resposta.ok) return null;
        const dados = await resposta.json();
        const pais = Array.isArray(dados) ? dados[0] : dados;
        return {
            capital: pais?.capital?.[0] || 'N/D',
            populacao: pais?.population ? pais.population.toLocaleString('pt-PT') : 'N/D'
        };
    } catch {
        return null;
    }
}