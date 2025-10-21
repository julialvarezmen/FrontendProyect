"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rutas
app.use('/', index_1.default);
