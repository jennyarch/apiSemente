const jsonServer = require('json-server');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(router);



server.listen(port, () => {
    console.log(`JSON Server está rodando na porta: ${port}`);
});

// export default function handler(request, response) {
//     const { name = 'World' } = request.query;
//     return response.send(`Hello ${name}!`);
// }
