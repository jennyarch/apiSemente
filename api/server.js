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

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Configurar o body-parser para analisar o corpo das solicitações
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ler os dados do arquivo db.json
const dbPath = './db.json';
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Rota para obter todos os eventos
app.get('/api/eventos', (req, res) => {
  const eventos = db.eventos;
  res.json(eventos);
});

// Rota para obter um evento específico
app.get('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const evento = db.eventos.find(e => e.id === id);
  if (!evento) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }
  res.json(evento);
});

// Rota para criar um novo evento
app.post('/api/eventos', (req, res) => {
  const novoEvento = {
    id: db.eventos.length > 0 ? Math.max(...db.eventos.map(e => e.id)) + 1 : 1,
    titulo: req.body.titulo,
    data: req.body.data,
    imagem: req.body.imagem,
  };
  db.eventos.push(novoEvento);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.status(201).json(novoEvento);
});

// Rota para atualizar um evento existente
app.put('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const evento = db.eventos.find(e => e.id === id);
  if (!evento) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }
  evento.titulo = req.body.titulo;
  evento.data = req.body.data;
  evento.imagem = req.body.imagem;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.json(evento);
});

// Rota para excluir um evento
app.delete('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.eventos.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }
  db.eventos.splice(index, 1);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.sendStatus(204);
});

// ROTA TODAS AS IMAGENS
app.get('/api/carrossel', (req, res) => {
  const carrossel = db.carrossel;
  res.json(carrossel);
});

//ROTA PARA OBTER UMA IMAGEM ESPECIFICA
app.get('/api/carrossel/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const carrossel = db.carrossel.find(e => e.id === id);
  if (!carrossel) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }
  res.json(carrossel);
});

//ROTA PARA CRIAR NOVO LINK
app.get('/api/links/', (req, res) => {
  const links = db.links;
  res.json(links);
});

app.get('/api/links/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const link = db.links.find(e => e.id === id);
  if(!link){
    return res.status(404).json({ error: 'Link não encontrado' });
  }
  res.json(link);
});

app.post('/api/links', (req, res) => {
  const novoLink = {
    id: db.links.length > 0 ? Math.max(...db.links.map(e => e.id)) + 1 : 1,
    link: req.body.link,
    titulo: req.body.titulo,
  };
  db.links.push(novoLink);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.status(201).json(novoLink);
});

app.put('/api/links/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const link = db.links.find(e => e.id === id);
  if (!link) {
    return res.status(404).json({ error: 'Links não encontrado' });
  }
  link.id = req.body.id;
  link.link = req.body.link;
  link.titulo = req.body.titulo;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.json(link);
});

app.delete('/api/links/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.links.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Link não encontrado' });
  }
  db.links.splice(index, 1);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  res.sendStatus(204);
});

// Iniciar o servidor
// app.listen(4000, () => {
//   console.log('Servidor iniciado na porta 4000');
// });


// Export the Server API
module.exports = server