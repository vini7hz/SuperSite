// --- Dados Pix fixos ---
const chavePix = '11860640990';
const nomePix = 'VINICIUS G TEIXEIRA';
const cidadePix = 'TIJUCAS';

// --- Modal e elementos ---
const modalAuth = document.getElementById('modalAuth');
const closeModalBtn = document.getElementById('closeModal');

const tabLogin = document.getElementById('tabLogin');
const tabRegistro = document.getElementById('tabRegistro');

const loginFormDiv = document.getElementById('loginForm');
const registroFormDiv = document.getElementById('registroForm');

const formLoginModal = document.getElementById('formLoginModal');
const formRegistroModal = document.getElementById('formRegistroModal');

const msgLoginModal = document.getElementById('msgLoginModal');
const msgRegistroModal = document.getElementById('msgRegistroModal');

const btnFinalizarCompra = document.getElementById('btnFinalizarCompra') || document.createElement('button'); // se não tiver, evitar erro

// --- Função para gerar payload Pix (simplificada) ---
function gerarPayloadPix(valor, chave, nome, cidade) {
  return `00020126360014BR.GOV.BCB.PIX0114${chave}0208${valor.toFixed(2).replace('.', '')}5204000053039865405${valor.toFixed(2)}5802${cidade}5909${nome}6009${cidade}62070503***6304`;
}

// --- Gerar QR Code ---
function gerarQrCode(valor) {
  const payload = gerarPayloadPix(valor, chavePix, nomePix, cidadePix);
  const canvas = document.getElementById('qrCodePix');
  QRCode.toCanvas(canvas, payload, { width: 180 }, function (error) {
    if (error) console.error(error);
  });
}

// --- Carregar resumo do pedido ---
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

// --- Funções de autenticação (localStorage) ---
const usuariosKey = 'usuariosCadastrados';
const usuarioLogadoKey = 'usuarioLogado';

function carregarUsuarios() {
  return JSON.parse(localStorage.getItem(usuariosKey)) || [];
}

function salvarUsuarioLogado(usuario) {
  localStorage.setItem(usuarioLogadoKey, JSON.stringify(usuario));
}

function obterUsuarioLogado() {
  return JSON.parse(localStorage.getItem(usuarioLogadoKey));
}

// --- Controle modal ---

function abrirModal() {
  modalAuth.classList.remove('hidden');
}

function fecharModal() {
  modalAuth.classList.add('hidden');
  limparMensagens();
}

closeModalBtn.addEventListener('click', fecharModal);

// --- Alternar abas ---
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegistro.classList.remove('active');
  loginFormDiv.classList.add('active');
  registroFormDiv.classList.remove('active');
  limparMensagens();
});

tabRegistro.addEventListener('click', () => {
  tabRegistro.classList.add('active');
  tabLogin.classList.remove('active');
  registroFormDiv.classList.add('active');
  loginFormDiv.classList.remove('active');
  limparMensagens();
});

function limparMensagens() {
  msgLoginModal.textContent = '';
  msgRegistroModal.textContent = '';
}

// --- Formulário Login ---
formLoginModal.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  const usuarios = carregarUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    salvarUsuarioLogado(usuario);
    fecharModal();
    liberarPagamento();
    alert(`Bem-vindo, ${usuario.nome}! Agora você pode finalizar o pagamento.`);
  } else {
    msgLoginModal.textContent = 'Email ou senha incorretos.';
  }
});

// --- Formulário Registro ---
formRegistroModal.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('regNome').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const senha = document.getElementById('regSenha').value;
  const confirmarSenha = document.getElementById('regConfirmSenha').value;

  if (!nome || !email || !senha || !confirmarSenha) {
    msgRegistroModal.textContent = 'Preencha todos os campos.';
    return;
  }

  if (!email.includes('@')) {
    msgRegistroModal.textContent = 'Email inválido.';
    return;
  }

  if (senha !== confirmarSenha) {
    msgRegistroModal.textContent = 'Senhas não conferem.';
    return;
  }

  const usuarios = carregarUsuarios();
  if (usuarios.find(u => u.email === email)) {
    msgRegistroModal.textContent = 'Email já cadastrado.';
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
  salvarUsuarioLogado({ nome, email, senha });
  fecharModal();
  liberarPagamento();
  alert(`Bem-vindo, ${nome}! Conta criada com sucesso.`);
});

// --- Controle do botão finalizar pagamento ---
const formPagamento = document.getElementById('formPagamento');
const msgPagamento = document.getElementById('msgPagamento');

function liberarPagamento() {
  // Só habilita o botão e o submit se o usuário estiver logado
  if (obterUsuarioLogado()) {
    formPagamento.querySelector('button[type="submit"]').disabled = false;
  } else {
    formPagamento.querySelector('button[type="submit"]').disabled = true;
  }
}

// Bloqueia pagamento até login
formPagamento.querySelector('button[type="submit"]').disabled = true;

formPagamento.addEventListener('submit', e => {
  e.preventDefault();

  if (!obterUsuarioLogado()) {
    alert('Você precisa estar logado para finalizar o pagamento.');
    abrirModal();
    return;
  }

  const nome = document.getElementById('nomeComprador').value.trim();
  const email = document.getElementById('emailComprador').value.trim();

  if (!nome || !email) {
    msgPagamento.style.color = 'red';
    msgPagamento.textContent = 'Preencha todos os campos.';
    return;
  }

  msgPagamento.style.color = 'green';
  msgPagamento.textContent = `Obrigado, ${nome}! Seu pedido foi registrado. Verifique seu e-mail (${email}).`;

  localStorage.removeItem('carrinho');
  // Você pode redirecionar para uma página de agradecimento aqui
});

// --- Inicialização ---
window.addEventListener('DOMContentLoaded', () => {
  carregarResumo();
  liberarPagamento();

  // Se tiver usuário logado, preenche campos do formulário com os dados dele
  const usuario = obterUsuarioLogado();
  if (usuario) {
    document.getElementById('nomeComprador').value = usuario.nome || '';
    document.getElementById('emailComprador').value = usuario.email || '';
  }
});
