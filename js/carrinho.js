// Simulação do carrinho, em um app real você usaria localStorage, API, ou banco
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para renderizar a tabela do carrinho
function renderizarCarrinho() {
  const tbody = document.querySelector('#tabelaCarrinho tbody');
  tbody.innerHTML = '';

  if (carrinho.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem;">Seu carrinho está vazio.</td></tr>`;
    document.getElementById('finalizarCompra').disabled = true;
    atualizarTotal(0);
    return;
  }

  carrinho.forEach((produto, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>
        <input type="number" min="1" max="99" value="${produto.quantidade}" class="quantidade-input" data-index="${index}">
      </td>
      <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
      <td><button class="btn-remover" data-index="${index}">&times;</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('finalizarCompra').disabled = false;
  atualizarTotal(calcularTotal());
  ativarEventosInputs();
}

// Atualiza o valor total da compra
function atualizarTotal(total) {
  document.getElementById('totalCompra').textContent = `R$ ${total.toFixed(2)}`;
}

// Calcula o total do carrinho
function calcularTotal() {
  return carrinho.reduce((acc, prod) => acc + prod.preco * prod.quantidade, 0);
}

// Remove produto do carrinho
function removerProduto(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderizarCarrinho();
}

// Atualiza quantidade de produto
function atualizarQuantidade(index, novaQuantidade) {
  novaQuantidade = Number(novaQuantidade);
  if (novaQuantidade < 1) novaQuantidade = 1;
  if (novaQuantidade > 99) novaQuantidade = 99;
  carrinho[index].quantidade = novaQuantidade;
  salvarCarrinho();
  renderizarCarrinho();
}

// Salva o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adiciona eventos aos inputs de quantidade e botões remover
function ativarEventosInputs() {
  document.querySelectorAll('.quantidade-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      atualizarQuantidade(index, e.target.value);
    });
  });
  document.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      removerProduto(index);
    });
  });
}

// Botão finalizar compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    // Redireciona para a página de pagamento
    window.location.href = 'pagamento.html';
  });
  

// Carrega o carrinho ao abrir a página
renderizarCarrinho();

function adicionarCarrinho(nomeProduto) {
    const produto = produtos.find(p => p.nome === nomeProduto);
    if (!produto) return;
  
    let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinhoAtual.find(item => item.nome === nomeProduto);
  
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinhoAtual.push({...produto, quantidade: 1});
    }
  
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    alert(`Produto "${nomeProduto}" adicionado ao carrinho!`);
  }
  