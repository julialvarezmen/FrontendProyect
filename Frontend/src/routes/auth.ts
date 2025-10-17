import { Router } from 'express';

const router = Router();

// Mostrar formulario de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Procesar login (solo valida que campos no estén vacíos)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validar que ambos campos estén llenos
  if (!username || !password) {
    return res.render('login', { 
      error: 'Por favor, completa ambos campos' 
    });
  }
  
  // Si los campos están llenos, redirigir al dashboard
  // (sin conexión a base de datos, solo validación de campos)
  res.redirect('/index/dashboard');
});

export default router; 