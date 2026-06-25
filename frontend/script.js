const URL = 'http://localhost:3000'; 

document.addEventListener("DOMContentLoaded", () => {
    const gridProdutos = document.getElementById('gridProdutos');

    fetch(`${URL}/potions`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro de rede: ${response.status}`);
            return response.json();
        })
        .then(produtos => {
            gridProdutos.innerHTML = '';

            if (produtos.length === 0) {
                gridProdutos.innerHTML = '<div class="status-msg">Nenhum produto disponível no momento.</div>';
                return;
            }

            produtos.forEach(produto => {
                const card = document.createElement('div');
                card.className = 'produto-card';

                const precoFormatado = typeof produto.value === 'number' 
                    ? `${produto.value.toFixed(2).replace('.', ',')} moedas` 
                    : produto.value;

                card.innerHTML = `
                    <div class="produto-img-placeholder">
                        ${produto.photo ? `<img src="${produto.photo}" alt="${produto.name}">` : 'Sem Imagem'}
                    </div>
                    <div class="produto-card-body">
                        <div class="produto-titulo">${produto.name}</div>
                        <div class="produto-preco">${precoFormatado}</div>
                        <div class="produto-descricao">${produto.description}</div>
                        <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.name}')">Comprar</button>
                    </div>
                `;

                gridProdutos.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            gridProdutos.innerHTML = `<div class="status-msg" style="color: #daff09;">Não foi possível carregar os produtos.</div>`;
        });
});

function adicionarAoCarrinho(identificador) {
    alert(`${identificador} adicionado(a) ao carrinho!`);
}