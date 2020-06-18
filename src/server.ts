import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import routes from './routes';
import session from 'express-session';

import MessageEvent from "./events/MessageEvent";
const messageEvent = new MessageEvent();

/**
 * Variaveis gerais
 */
const app = express();
const server = http.createServer(app);
const io = socket(server);

/**
 * Configuracoes de sessao
 */
app.use(session({
	secret: '23efmoi43j42223',
	resave: true,
	saveUninitialized: true
}));

/**
 * Configurações do servidor
 */
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.use(express.json());
app.use(routes);
app.disable('etag');

/**
 * Conexao com socket.io
 */
io.on('connection', messageEvent.onConnect);

/**
 * Inicializacao do servidor
 */
server.listen(3000, () => {
	console.log("Server iniciado em http://localhost:3000");
});