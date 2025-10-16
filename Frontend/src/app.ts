import express from 'express';
import path from 'path';
import indexRoutes from './routes/index';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', indexRoutes);


export { app };