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
db.produtos.aggregate([{ $project: { nome: 1, indiceDeAceitacao: { $add: ["$curtidas", "$vendidos"] } } }])
