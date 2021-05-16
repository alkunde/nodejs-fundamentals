const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const customers = [];

app.use(express.json());

/**
 * GET    - Buscar uma informação dentro do servidor
 * POST   - Inserir uma informação no servidor
 * PUT    - Alterar uma informação no servidor
 * PATCH  - Alterar uma informação específica no servidor
 * DELETE - Deletar uma informação no servidor
 */

/**
 * Tipos de parâmetros
 * 
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params  => Os objetos inserção/alteração (JSON)
 */

/**
 * cpf  - string
 * name - string
 * id   - uuid
 * statement []
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  return response.json(customer.statement);
});

app.listen(3333);