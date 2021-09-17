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
db.clientes.aggregate([{ 
  $match: {
    sexo: "FEMININO", dataNascimento: { $gt: ISODate("1995-01-01T00:00:00.0Z"), $lt: ISODate("2005-01-01T00:00:00.0Z") } }
}]);
// Exercício 3: Utilizando o estágio $match , escreva uma agregação para retornar somente os clientes do sexo "FEMININO" e com data de nascimento entre os anos de 1995 e 2005 , limitando a quantidade de documentos retornados em 5 .
db.clientes.aggregate([{ 
  $match: {
    sexo: "FEMININO", dataNascimento: { $gt: ISODate("1995-01-01T00:00:00.0Z"), $lt: ISODate("2005-01-01T00:00:00.0Z") } }
  }, { $limit: 5 }]);
// Exercício 4: Conte quantos clientes do estado SC existem na coleção. Retorne um documento em que o campo _id contenha a UF e outro campo com o total.
db.clientes.aggregate([ 
  { $group: {
    _id: "$endereco.uf",
    total: {
      $sum: 1
    }
  }}, 
  { $match: { _id: "SC" } }, 
  { $project: { total: 1 } }
]);
// Exercício 5: Agrupe os clientes por sexo . Retorne o total de clientes de cada sexo no campo total .
db.clientes.aggregate([ 
  { $group: {
    _id: "$sexo",
    total: {
      $sum: 1
    }
  }}, 
  { $project: { total: 1 } }
]);
// Exercício 6: Agrupe os clientes por sexo e uf . Retorne o total de clientes de cada sexo no campo total.
db.clientes.aggregate([ 
  { $group: {
    _id: {
      sexo: "$sexo",
      localidade: "$endereco.uf"
      },
    total: {
      $sum: 1
    }
  }}, 
  { $project: { total: 1 } }
]);
// Exercício 7 : Utilizando a mesma agregação do exercício anterior, adicione um estágio de projeção para modificar 
// os documentos de saída, de forma que se pareçam com o documento a seguir (não se importe com a ordem dos campos):
db.clientes.aggregate([ 
  { $group: {
    _id: {
      sexo: "$sexo",
      localidade: "$endereco.uf"
      },
    total: {
      $sum: 1
    }
  }}, 
  { $project: { estado: "$_id.localidade", sexo: "$_id.sexo", total: 1, _id: 0 } }
]);
// Exercício 8 : Descubra quais são os 5 clientes que gastaram o maior valor.
db.vendas.aggregate([ 
  {
    $group: {
      _id: "$clienteId",
      gastoTotal: { $sum: "$valorTotal" }
    }
  },
  {
    $sort: {
      gastoTotal: -1
    }
  },
  {
    $limit: 5
  }
]);
// Exercício 9 : Descubra quais são os 10 clientes que gastaram o maior valor no ano de 2019 .
db.vendas.aggregate([ 
  {
    $match: {
      dataVenda: { $gte: ISODate("2019-01-01"), $lte: ISODate("2019-12-31") }
    }
  },
  {
    $group: {
      _id: "$clienteId",
      gastoTotal: { $sum: "$valorTotal" }
    }
  },
  {
    $sort: {
      gastoTotal: -1
    }
  },
  {
    $limit: 10
  }
]);
// Exercício 10 : Descubra quantos clientes compraram mais de 5 vezes. Retorne um documento que contenha somente o campo clientes com o total de clientes.
db.vendas.aggregate([ 
  {
    $group: {
      _id: "$clienteId",
      comprasRealizadas: { $sum: 1 }
    }
  },
  {
    $match: {
      comprasRealizadas: { $gte: 5 }
    }
  },
  {
    $count: "clientes"
  }
]);
// Exercício 11 : Descubra quantos clientes compraram menos de três vezes entre os meses de Janeiro de 2020 e Março de 2020 .
db.vendas.aggregate([ 
  {
    $match: {
      dataVenda: { $gte: ISODate("2020-01-01"), $lte: ISODate("2020-03-31") }
    }
  },
  {
    $group: {
      _id: "$clienteId",
      comprasRealizadas: { $sum: 1 }
    }
  },
  {
    $match: {
      comprasRealizadas: { $lt: 3 }
    }
  },
  {
    $count: "clientesDeJanAMar"
  }
]);
// Exercício 12 : Descubra quais as três uf s que mais compraram no ano de 2020 . Retorne os documentos no seguinte formato:

// Exercício 13 : Encontre qual foi o total de vendas e a média de vendas de cada uf no ano de 2019 . 
// Ordene os resultados pelo nome da uf . Retorne os documentos no seguinte formato: