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