// Simula usuário logado armazenado no localStorage
// Em app real, use backend e autenticação real

const storageKey = 'usuarioLogado';

// Função para carregar dados do usuário no formulário
function carregarPerfil() {
  const usuario = JSON.parse(localStorage.getItem(storageKey));
  if (usuario) {
    document.getElementById('nome').value = usuario.nome || '';
    document.getElementById('email').value = usuario.email || '';
    document.getElementById('telefone').value = usuario.telefone || '';
  }
}

// Função para salvar dados do usuário no localStorage
function salvarPerfil(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const msg = document.getElementById('msgPerfil');

  if (!nome || !email) {
    msg.style.color = 'red';
    msg.textContent = 'Por favor, preencha os campos obrigatórios.';
    return;
  }

  const usuario = { nome, email, telefone };
  localStorage.setItem(storageKey, JSON.stringify(usuario));

  msg.style.color = 'green';
  msg.textContent = 'Perfil salvo com sucesso!';
}

// Função para logout
function logout() {
  localStorage.removeItem(storageKey);
  alert('Você saiu do sistema.');
  window.location.href = 'login.html';
}

document.getElementById('formPerfil').addEventListener('submit', salvarPerfil);
document.getElementById('btnLogout').addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', carregarPerfil);
