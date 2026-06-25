const URL = 'http://localhost:3000';

const tabelaProdutos = document.getElementById('tabelaProdutos');
const formAdicionar = document.getElementById('formAdicionar');

// 1. GET
function listarProdutos() {
    fetch(`${URL}/potions`)
        .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar dados do servidor.');
            return res.json();
        })
        .then(produtos => {
            tabelaProdutos.innerHTML = '';

            if (produtos.length === 0) {
                tabelaProdutos.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Nenhum item encontrado no inventário.</td></tr>`;
                return;
            }

            produtos.forEach(produto => {
                const id = produto.id;
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td class="text-muted">${id}</td>
                    <td><strong>${produto.name}</strong></td>
                    <td style="color: #daff09; font-weight: bold;">${parseFloat(produto.value).toFixed(2)} moedas</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-edit-custom" onclick="abrirModalEdicao(${id}, '${produto.name}', ${produto.value}, '${produto.description}', '${produto.photo || ''}')">
                            Editar
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger-custom" onclick="removerProduto('${id}')">
                            Excluir
                        </button>
                    </td>
                `;
                tabelaProdutos.appendChild(linha);
            });
        })
        .catch(err => {
            console.error(err);
            tabelaProdutos.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Falha ao carregar os itens do servidor.</td></tr>`;
        });
}

// 2. POST
formAdicionar.addEventListener('submit', function(e) {
    e.preventDefault();

    const novoProduto = {
        name: document.getElementById('nome').value,
        description: document.getElementById('descricao').value,
        value: parseFloat(document.getElementById('preco').value),
        photo: document.getElementById('foto').value || null
    };

    fetch(`${URL}/create-potion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto)
    })
    .then(res => {
        if (!res.ok) throw new Error('Não foi possível salvar o produto.');
        return res.json();
    })
    .then(() => {
        formAdicionar.reset();
        listarProdutos();
        alert('Produto adicionado com sucesso ao grimório!');
    })
    .catch(err => {
        alert('Erro ao adicionar produto: ' + err.message);
    });
});

// 3. DELETE
function removerProduto(id) {
    if (confirm('Tem certeza que deseja remover esta poção do inventário?')) {
        fetch(`${URL}/delete-potion/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao deletar o produto do servidor.');
            listarProdutos();
        })
        .catch(err => {
            alert('Não foi possível remover o item: ' + err.message);
        });
    }
}

function abrirModalEdicao(id, name, value, description, photo) {
    document.getElementById('editId').value = id;
    document.getElementById('editNome').value = name;
    document.getElementById('editPreco').value = value;
    document.getElementById('editDescricao').value = description;
    document.getElementById('editFoto').value = photo;

    const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();
}

// 4. PUT
function salvarEdicao() {
    const id = document.getElementById('editId').value;

    const produtoAtualizado = {
        name: document.getElementById('editNome').value,
        description: document.getElementById('editDescricao').value,
        value: parseFloat(document.getElementById('editPreco').value),
        photo: document.getElementById('editFoto').value || null
    };

    fetch(`${URL}/update-potion/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => {
        if (!res.ok) throw new Error('Não foi possível atualizar o produto.');
        bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
        listarProdutos();
        alert('Poção atualizada com sucesso!');
    })
    .catch(err => {
        alert('Erro ao atualizar produto: ' + err.message);
    });
}

listarProdutos();