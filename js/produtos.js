const produtos = [
    {
      nome: 'Mouse Gamer RGB',
      preco: 149.99,
      imagem: 'assets/img/mouse.jpg',
      descricao: 'Mouse ergonômico com 7 botões e iluminação RGB.'
    },
    {
      nome: 'Teclado Mecânico',
      preco: 289.90,
      imagem: 'assets/img/teclado.jpg',
      descricao: 'Teclado com switches vermelhos e iluminação customizável.'
    },
    {
      nome: 'Headset Surround 7.1',
      preco: 199.99,
      imagem: 'assets/img/headset.jpg',
      descricao: 'Áudio imersivo com microfone ajustável.'
    },
    {
      nome: 'Monitor 24" Full HD',
      preco: 899.00,
      imagem: 'assets/img/monitor.jpg',
      descricao: 'Tela de alta qualidade com 75Hz e baixo tempo de resposta.'
    }
  ];
  
  function renderizarProdutos() {
    const container = document.getElementById('listaProdutos');
    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto-card';
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <span class="preco">R$ ${produto.preco.toFixed(2)}</span>
        <button onclick="adicionarCarrinho('${produto.nome}')">Adicionar ao Carrinho</button>
      `;
      container.appendChild(card);
    });
  }
  
  function adicionarCarrinho(nomeProduto) {
    const produto = produtos.find(p => p.nome === nomeProduto);
    if (!produto) return;
  
    // Pega o carrinho do localStorage ou inicia vazio
    let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
  
    // Verifica se produto já está no carrinho
    const itemExistente = carrinhoAtual.find(item => item.nome === nomeProduto);
  
    if (itemExistente) {
      // Se já existe, só incrementa quantidade
      itemExistente.quantidade += 1;
    } else {
      // Senão, adiciona novo produto com quantidade 1
      carrinhoAtual.push({...produto, quantidade: 1});
    }
  
    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
  
    alert(`Produto "${nomeProduto}" adicionado ao carrinho!`);
  }
  
  document.addEventListener('DOMContentLoaded', renderizarProdutos);
  