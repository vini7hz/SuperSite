document.getElementById('formLogin').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const msg = document.getElementById('loginMsg');
  
    // Exemplo simples de validação estática
    if (email === 'admin@site.com' && senha === '123456') {
      msg.style.color = 'green';
      msg.textContent = 'Login bem-sucedido! Redirecionando...';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      msg.textContent = 'E-mail ou senha inválidos.';
      msg.style.color = 'red';
    }
  });
  