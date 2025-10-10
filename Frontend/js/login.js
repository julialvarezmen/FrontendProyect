document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error-message');

  if (username === '' || password === '') {
    errorMsg.textContent = 'Por favor, complete ambos campos.';
    return;
  }

  // Redirigir siempre a app.html si hay datos
  window.location.href = 'app.html';
});