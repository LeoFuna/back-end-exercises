// PARA FIXAR $match e $limit
//1 Selecione todas as transações feitas pelo cliente chamado "Dave America".
db.transactions.aggregate([{ $match: { from: "Dave America" } }]);
//2 Selecione todas as transações com o valor entre 700 e 6000, ou que sejam recebidas pela cliente "Lisa Simpson".
db.transactions.aggregate([{ $match: { $or: [{ value: { $gt: 700, $lt: 6000 } }, { to: "Lisa Simpson" }] } }]);
//3 Selecione três transações com o valor acima de 1000.
db.transactions.aggregate([{ $match: { value: { $gt: 1000 } }}, { $limit: 3 }]);

// PARA FIXAR $project e $group
//1 Selecione todos os bancos, ou seja, valores do campo bank ;
db.transactions.aggregate([{ $project: { _id: 0, bank: 1 } }]);
//2 Selecione o valor total das transações em cada banco e quantas são;
db.transactions.aggregate([{ $group: { _id: null, valorTotal: { $sum: "$value" }, transacoes: { $sum: 1 } } }]);
//3 Selecione o valor total de transações por banco;
db.transactions.aggregate([{ $group: { _id: "$bank", valorTotal: { $sum: "$value" } } }]);
//4 Selecione os bancos que têm o valor total de transações maior que 1000.
db.transactions.aggregate([{ $group: { _id: "$bank", valorTotal: { $sum: "$value" }} }, { $match: { valorTotal: { $gt: 1000 } } }]);

// PARA FIXAR $unwind e $lookup
//1 Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([{
  $lookup: {
    from: 'transactions',
    localField: 'name',
    foreignField: 'from',
    as: 'transacoesDoCliente'
  } }]);
//2 Selecione quatro clientes com as suas respectivas transações recebidas;
db.clients.aggregate([{
  $lookup: {
    from: 'transactions',
    localField: 'name',
    foreignField: 'to',
    as: 'transacoesDoCliente'
  } }]);
//3 Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
  { $match: { State: "Florida" } },
  { $lookup: {
    from: 'transactions',
    localField: 'name',
    foreignField: 'to',
    as: 'transacoesDoCliente'
    } 
  }]);

// EXERCICIOS DO DIA
// Exercício 1: Utilizando o estágio $match , escreva uma agregação para retornar somente os clientes do sexo "MASCULINO" .
db.clientes.aggregate([{ 
  $match: {
    sexo: "MASCULINO"
  } }])
// Exercício 2: Utilizando o estágio $match , escreva uma agregação para retornar somente os clientes do sexo "FEMININO" e com data de nascimento entre os anos de 1995 e 2005 .

// Exercício 3: Utilizando o estágio $match , escreva uma agregação para retornar somente os clientes do sexo "FEMININO" e com data de nascimento entre os anos de 1995 e 2005 , limitando a quantidade de documentos retornados em 5 .

// Exercício 4: Conte quantos clientes do estado SC existem na coleção. Retorne um documento em que o campo _id contenha a UF e outro campo com o total.

// Exercício 5: Agrupe os clientes por sexo . Retorne o total de clientes de cada sexo no campo total .

// Exercício 6: Agrupe os clientes por sexo e uf . Retorne o total de clientes de cada sexo no campo total .