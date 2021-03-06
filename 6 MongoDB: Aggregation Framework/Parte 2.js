// FIXAÇÃO APLICANDO CONDIÇÕES AO JOIN
// 1 Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([{ 
  $lookup: {
    from: 'transactions',
    localField: 'name',
    foreignField: 'from',
    as: 'transactions_done'
  },
  }]);
// 2 Selecione os quatro primeiros clientes com as suas respectivas transações recebidas ordenados pelo estado em ordem alfabética;
db.clients.aggregate([
  { $lookup: {
    from: 'transactions',
    localField: 'name',
    foreignField: 'to',
    as: 'transactions_received'
  } },
  { $sort: {
    State: 1,
  } },
  {
    $limit: 4,
  }
  ]);
  
// 3 Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
  {
    $match: {
      State: { $eq: "Florida" }
    }
  },
  { $lookup: {
    from: 'transactions',
    let: { transaction_client: "$name" },
    pipeline: [
      {
        $match: { $expr: { $eq: ["$to", "$$transaction_client"] } }
      }
    ],
    as: 'transactions_received'
  } },
  ]);
  
// FIXAÇÃO $add no $project
db.produtos.aggregate([{ $project: { nome: 1, indiceDeAceitacao: { $add: ["$curtidas", "$vendidos"] } } }]);
// FIXAÇÃO $subtract no $project
db.produtos.aggregate([{ $project: { nome: 1, indiceDeAceitacao: { $subtract: [{ $add: ["$curtidas", 1000] }, "$vendidos"] } } }])
// OBSERVAR AS EXPRESSÕES $ceil $floor $rounds

// EXERCICIOS DOD DIA
// Exercício 1 : Utilize uma combinação das expressões aritméticas e adicione um campo chamado idade à coleção clientes . 
// Algumas dicas:
  // - arredonde para baixo o valor da idade;
  // - calcule a idade usando a diferença entre a data corrente e a data de nascimento;
  // - 1 dia é igual a 86400000 milissegundos.
  db.clientes.aggregate([
    {
    $addFields: { 
        idade: { 
          $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
        }
      }
    }
  ]);
// Exercício 2 : Utilizando o novo campo idade , conte quantos clientes têm entre 18 e 25 anos.
db.clientes.aggregate([
  {
  $addFields: { 
      idade: { 
        $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
      }
    }
  },
  {
    $match: {
      idade: { $gt: 18, $lt: 25 }
    }
  },
  {
    $count: 'totalDeClientes'
  }
]);

// Exercício 3 : Remova os estágios $count e $match do exercício anterior e adicione um estágio no pipeline que coloque as compras do cliente no campo compras .
db.clientes.aggregate([
  {
  $addFields: { 
      idade: { 
        $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
      }
    }
  },
  {
    $lookup: {
      from: 'vendas',
      localField: 'clienteId',
      foreignField: 'clienteId',
      as: 'compras'
    }
  }
]);

// Exercício 4 : Selecione TODOS os clientes que compraram entre Junho de 2019 e Março de 2020 .
db.clientes.aggregate([
  {
  $addFields: { 
      idade: { 
        $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
      }
    }
  },
  {
    $lookup: {
      from: 'vendas',
      localField: 'clienteId',
      foreignField: 'clienteId',
      as: 'compras'
    }
  },
  {
    $match: {
      "compras.dataVenda": { $gt: ISODate('2019-06-01'), $lt: ISODate('2020-03-31') }
    }
  }
]);
// Exercício 5 : Confira o número de documentos retornados pelo pipeline com o método itcount() . Até aqui, você deve ter 486 documentos sendo retornados.
db.clientes.aggregate([
  {
  $addFields: { 
      idade: { 
        $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
      }
    }
  },
  {
    $lookup: {
      from: 'vendas',
      localField: 'clienteId',
      foreignField: 'clienteId',
      as: 'compras'
    }
  },
  {
    $match: {
      "compras.dataVenda": { $gt: ISODate('2019-06-01'), $lt: ISODate('2020-03-31') }
    }
  },
]).itcount();
// Exercício 6 : Ainda nesse pipeline , descubra os 5 estados com mais compras.
db.clientes.aggregate([
  {
  $addFields: { 
      idade: { 
        $floor: { $divide: [{ $subtract: [new Date(), "$dataNascimento"] }, 86400000 * 365] } 
      }
    }
  },
  {
    $lookup: {
      from: 'vendas',
      localField: 'clienteId',
      foreignField: 'clienteId',
      as: 'compras'
    }
  },
  {
    $match: {
      "compras.dataVenda": { $gt: ISODate('2019-06-01'), $lt: ISODate('2020-03-31') }
    }
  },
  {
    $unwind: "$compras",
  },
  {
    $group: {
      _id: "$endereco.uf",
      comprasDoEstado: {
        $sum: 1
      }
    }
  },
  {
    $sort: { comprasDoEstado: -1 }
  },
  {
    $limit: 5,
  }
]);
// Exercício 7 : Descubra o cliente que mais consumiu QUEIJO PRATO .
db.clientes.aggregate([
  {
    $lookup: {
      from: 'vendas',
      localField: 'clienteId',
      foreignField: 'clienteId',
      as: 'compras'
    }
  },
  {
    $unwind: "$compras"
  },
  {
    $unwind: "$compras.itens"
  },
  {
    $match: { "compras.itens.nome": "QUEIJO PRATO" }
  },
  {
    $group: {
      _id: "$nome",
      totalDeQueijosComprados: {
        $sum: "$compras.itens.quantidade"
      }
    }
  },
  {
    $sort: { totalDeQueijosComprados: -1 }
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: 'clientes',
      localField: '_id',
      foreignField: 'nome',
      as: 'dadosCliente'
    }
  },
  {
    $project: {
      nomeCliente: "$_id",
      uf: "$dadosCliente.endereco.uf",
      totalConsumido: "$totalDeQueijosComprados",
      _id: 0,
    }
  }
]);