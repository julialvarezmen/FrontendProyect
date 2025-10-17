import { app } from './src/app';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gestor Bancario corriendo en http://localhost:${PORT}`);
  console.log('Backend corriendo en http://localhost:8080');
});