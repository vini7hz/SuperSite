// Dados Pix fixos
const chavePix = '11860640990';
const nomePix = 'VINICIUS G TEIXEIRA';
const cidadePix = 'TIJUCAS';

// Função para montar o payload do Pix (simplificado)
function gerarPayloadPix(valor, chave, nome, cidade) {
  // Payload formatado para gerar QR Code (simplificado para exemplo)
  // Na prática, use libs como qrcode-pix ou APIs do Banco Central para gerar payload oficial
  return `00020126360014BR.GOV.BCB.PIX0114${chave}0208${valor.toFixed(2).replace('.', '')}5204000053039865405${valor.toFixed(2)}5802${cidade}5909${nome}6009${cidade}62070503***6304`;
}

// Função para gerar QR code na tela
function gerarQrCode(valor) {
  const payload = gerarPayloadPix(valor, chavePix, nomePix, cidadePix);

  const canvas = document.getElementById('qrCodePix');
  QRCode.toCanvas(canvas, payload, { width: 180 }, function (error) {
    if (error) console.error(error);
    else console.log('QR Code Pix gerado');
  });
}

// Função para carregar o resumo do pedido do localStorage
function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const listaResumo = document.getElementById('listaResumo');
  const totalCompraEl = document.getElementById('totalCompra');

  listaResumo.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} x${item.quantidade}`;
    const precoItem = document.createElement('span');
    precoItem.textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    li.appendChild(precoItem);
    listaResumo.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalCompraEl.textContent = `R$ ${total.toFixed(2)}`;

  gerarQrCode(total);
}

// Evento de submissão do formulário
document.getElementById('formPagamento').addEventListener('submit', e => {
  e.preventDefault();

  const nome = document.getElementById('nomeComprador').value.trim();
  const email = document.getElementById('emailComprador').value.trim();
  const msg = document.getElementById('msgPagamento');

  if (!nome || !email) {
    msg.style.color = 'red';
    msg.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  // Simula confirmação
  msg.style.color = 'green';
  msg.textContent = `Obrigado, ${nome}! Seu pedido foi registrado. Verifique seu e-mail (${email}) para mais informações.`;

  // Aqui você pode limpar o carrinho
  localStorage.removeItem('carrinho');
});

// Carrega resumo quando a página abrir
window.addEventListener('DOMContentLoaded', carregarResumo);
