const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server


// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// // Configurar o body-parser para analisar o corpo das solicitações
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Dados de exemplo do arquivo db.json
// const db = require('../db.json');

// // Rota para obter todos os eventos
// app.get('/api/eventos', (req, res) => {
//     res.json(db.eventos);
// });

// // Rota para obter um evento específico
// app.get('/api/eventos/:id', (req, res) => {
//     const evento = db.eventos.find(e => e.id === parseInt(req.params.id));
//     if (!evento) {
//         return res.status(404).json({ error: 'Evento não encontrado' });
//     }
//     res.json(evento);
// });

// // Rota para criar um novo evento
// app.post('/api/eventos', (req, res) => {
//     const novoEvento = {
//         id: db.eventos.length > 0 ? db.eventos[db.eventos.length - 1].id + 1 : 1,
//         titulo: req.body.titulo,
//         data: req.body.data,
//         imagem: req.body.imagem,
//     };
//     db.eventos.push(novoEvento);
//     res.status(201).json(novoEvento);
// });

// // Rota para atualizar um evento existente
// app.put('/api/eventos/:id', (req, res) => {
//     const evento = db.eventos.find(e => e.id === parseInt(req.params.id));
//     if (!evento) {
//         return res.status(404).json({ error: 'Evento não encontrado' });
//     }
//     evento.titulo = req.body.titulo;
//     evento.data = req.body.data;
//     evento.imagem = req.body.imagem;
//     res.json(evento);
// });

// // Rota para excluir um evento
// app.delete('/api/eventos/:id', (req, res) => {
//     const index = db.eventos.findIndex(e => e.id === parseInt(req.params.id));
//     if (index === -1) {
//         return res.status(404).json({ error: 'Evento não encontrado' });
//     }
//     db.eventos.splice(index, 1);
//     res.sendStatus(204);
// });

// // Iniciar o servidor
// app.listen(4000, () => {
//     console.log('Servidor iniciado na porta 4000');
// });

