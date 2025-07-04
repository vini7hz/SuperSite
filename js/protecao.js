// Checa se o usuário está logado
function checarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
      // Não está logado, redireciona para login
      window.location.href = 'login.html';
    }
  }
  