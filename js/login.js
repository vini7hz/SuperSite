// Simples autenticação local com usuários no localStorage

const usuariosKey = 'usuariosCadastrados';
const usuarioLogadoKey = 'usuarioLogado';

function carregarUsuarios() {
  return JSON.parse(localStorage.getItem(usuariosKey)) || [];
}

function salvarUsuarioLogado(usuario) {
  localStorage.setItem(usuarioLogadoKey, JSON.stringify(usuario));
}

document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  const usuarios = carregarUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  const msgLogin = document.getElementById('msgLogin');

  if (usuario) {
    salvarUsuarioLogado(usuario);
    msgLogin.style.color = 'green';
    msgLogin.textContent = 'Login realizado com sucesso! Redirecionando...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    msgLogin.style.color = 'red';
    msgLogin.textContent = 'Email ou senha incorretos.';
  }
});
