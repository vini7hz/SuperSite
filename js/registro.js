const usuariosKey = 'usuariosCadastrados';

function carregarUsuarios() {
  return JSON.parse(localStorage.getItem(usuariosKey)) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
}

document.getElementById('formRegistro').addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const msgRegistro = document.getElementById('msgRegistro');

  if (!nome || !email || !senha || !confirmarSenha) {
    msgRegistro.style.color = 'red';
    msgRegistro.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  if (!email.includes('@')) {
    msgRegistro.style.color = 'red';
    msgRegistro.textContent = 'Digite um e-mail válido.';
    return;
  }

  if (senha !== confirmarSenha) {
    msgRegistro.style.color = 'red';
    msgRegistro.textContent = 'As senhas não conferem.';
    return;
  }

  const usuarios = carregarUsuarios();

  if (usuarios.find(u => u.email === email)) {
    msgRegistro.style.color = 'red';
    msgRegistro.textContent = 'E-mail já cadastrado.';
    return;
  }

  usuarios.push({ nome, email, senha });
  salvarUsuarios(usuarios);

  msgRegistro.style.color = 'green';
  msgRegistro.textContent = 'Cadastro realizado com sucesso! Redirecionando para login...';

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
