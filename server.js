const fs = require('node:fs/promises');

const fastify = require('fastify')({
  logger: true
})

fastify.post('/upload', async (request, reply) => {

  return request.body;
})

fastify.get('/', async (request, reply) => {
  reply.type("text/html");
  return fs.readFile("./index.html", "utf-8");
})

fastify.get('/WebBlob.js', async (request, reply) => {
  reply.type("text/javascript");
  return fs.readFile("./WebBlob.js", "utf-8");
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})