document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // Validação básica para a API do ViaCEP (mínimo 3 caracteres na rua/cidade)
    if (rua.length < 3) {
        alert("O logradouro deve ter pelo menos 3 caracteres.");
        return;
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

    resultadoDiv.innerHTML = "Buscando...";

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            resultadoDiv.innerHTML = ""; // Limpa o "Buscando..."

            if (dados.length === 0) {
                resultadoDiv.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
            } else {
                dados.forEach(item => {
                    resultadoDiv.innerHTML += `
                        <div class="item-resultado">
                            <p><strong>CEP:</strong> ${item.cep}</p>
                            <p><strong>Bairro:</strong> ${item.bairro}</p>
                            <p><strong>Logradouro:</strong> ${item.logradouro}</p>
                        </div>
                    `;
                });
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            resultadoDiv.innerHTML = "<p>Erro ao buscar dados. Verifique os campos.</p>";
        });
});