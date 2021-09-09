// -----------------------Operadores de Comparação ---------------------

// Selecione e faça a contagem dos restaurantes presentes nos bairros Queens , Staten Island e Bronx . (utilizando o atributo borough )
db.restaurants.count({borough: { $in: ["Queens", "Staten Island", "Bronx"]} })
// Selecione e faça a contagem dos restaurantes que não possuem culinária do tipo American . (utilizando o atributo cuisine )
db.restaurants.count({ cuisine: { $ne: 'American' } })
// Selecione e faça a contagem dos restaurantes que possuem avaliação maior ou igual a 8 . (utilizando o atributo rating )
db.restaurants.count({ rating: { $gte: 8 } })
// Selecione e faça a contagem dos restaurantes que possuem avaliação menor que 4 .
db.restaurants.count({ rating: { $lt: 4 } })
// Selecione e faça a contagem dos restaurantes que não possuem as avaliações 5 , 6 e 7 .
db.restaurants.count({ rating: { $nin: [ 5, 6, 7 ] } })

// ------------- operadores lógicos -----------------

// Selecione e faça a contagem dos restaurantes que não possuem avaliação menor ou igual a 5 , 
// essa consulta também deve retornar restaurantes que não possuem o campo avaliação.
db.restaurants.count({ rating: { $not: { $gte: 5 } } })
// Selecione e faça a contagem dos restaurantes em que a avaliação seja maior ou igual a 6 , ou restaurantes localizados no bairro Brooklyn .
db.restaurants.count({ $or: [{rating: { $gte: 6 }}, { borough: "Brooklyn" }] })
// Selecione e faça a contagem dos restaurantes localizados nos bairros Queens , Staten Island e Broklyn e possuem avaliação maior que 4 .
db.restaurants.count({ $and: [{ borough: { $in: ["Queens", "Staten Island", "Brooklyn"] } }, { rating: { $gt: 4 } }] })
// Selecione e faça a contagem dos restaurantes onde nem o campo avaliação seja igual a 1 , nem o campo culinária seja do tipo American .
db.restaurants.count({ $nor: [{ rating: 1 }, { cousine: "American" } ] })
// Selecione e faça a contagem dos resturantes em que a avaliação seja maior que 6 ou menor que 10 , E esteja localizado no bairro Brooklyn , 
// OU não possuem culinária do tipo Delicatessen .
db.restaurants.count({ $or: [ {$and: [ { $or: [{ rating: { $gt: 6 } }, { rating: { $lt: 10 } }] }, { borough: "Brooklyn" } ]}, { cuisine: { $ne: "Delicatessen" }} ]})

// ----------------Metodo Sort --------------------
// Ordene alfabeticamente os restaurantes pelo nome (atributo name ).
db.restaurants.find({}, { name: 1, _id: 0 }).sort({name: 1})
// Ordene os restaurantes de forma descrescente baseado nas avaliações.
db.restaurants.find({}, {rating: 1, _id: 0}).sort({ rating: -1 })

// ------------------Removendo Documentos -----------------------
// Remova o primeiro restaurante que possua culinária do tipo Ice Cream, Gelato, Yogurt, Ices .
db.restaurants.deleteOne({ cuisine: { $in: ["Ice Cream, Gelato, Yogurt, Ices"] } })
// Remova todos os restaurantes que possuem culinária do tipo American .
db.restaurants.deleteMany({ cuisine: "American" })

//-------------------Exercícios Gerais para mongoDB ---------------
// Exercício 1: Inspecione um documento para que você se familiarize com a estrutura. Entenda os atributos e os níveis existentes.
db.superheroes.find().limit(1)
// Exercício 2: Selecione todos os super-heróis com menos de 1.80m de altura. Lembre-se de que essa informação está em centímetros.
db.superheroes.find({ 'aspects.height': { $lt: 180 } })
// Exercício 3: Retorne o total de super-heróis menores que 1.80m.
db.superheroes.count({ 'aspects.height': { $lt: 180 } })
// Exercício 4: Retorne o total de super-heróis com até 1.80m.
db.superheroes.count({ 'aspects.height': { $lte: 180 } })
// Exercício 5: Selecione um super-herói com 2.00m ou mais de altura.
db.superheroes.findOne({ 'aspects.height': { $gte: 200 } })
// Exercício 6: Retorne o total de super-heróis com 2.00m ou mais.
db.superheroes.count({ 'aspects.height': { $gte: 200 } })
// Exercício 7: Selecione todos os super-heróis que têm olhos verdes.
db.superheroes.find({ 'aspects.eyeColor': 'green' })
// Exercício 8: Retorne o total de super-heróis com olhos azuis.
db.superheroes.count({ 'aspects.eyeColor': 'green' })
// Exercício 9: Utilizando o operador $in , selecione todos os super-heróis com cabelos pretos ou carecas ( "No Hair" ).
db.superheroes.find({ 'aspects.hairColor': { $in: ["Black", "No Hair"] } })
// Exercício 10: Retorne o total de super-heróis com cabelos pretos ou carecas ( "No Hair" ).
db.superheroes.count({ 'aspects.hairColor': { $in: ["Black", "No Hair"] } })
// Exercício 11: Retorne o total de super-heróis que não tenham cabelos pretos ou não sejam carecas.
db.superheroes.count({ 'aspects.hairColor': { $nin: ["Black", "No Hair"] } })
// Exercício 12: Utilizando o operador $not , retorne o total de super-heróis que não tenham mais de 1.80m de altura.
db.superheroes.count({ 'aspects.height': { $not: { $gt: 180 } } })
// Exercício 13: Selecione todos os super-heróis que não sejam humanos nem sejam maiores do que 1.80m .
db.superheroes.find({ $and: [{ race: {$not: {$eq: "Human"}} }, { 'aspects.height': { $not: { $gt: 180 } } }] })
// Exercício 14: Selecione todos os super-heróis com 1.80m ou 2.00m de altura e que sejam publicados pela Marvel Comics .
db.superheroes.find({ $and: [ { 'aspects.height': { $in: [180, 200] } }, { publisher: "Marvel Comics" } ] })
// Exercício 15: Selecione todos os super-heróis que pesem entre 80kg e 100kg , sejam Humanos ou Mutantes e não sejam publicados pela DC Comics .
db.superheroes.find({ $and: [{ 'aspects.weight': { $gt: 80, $lt: 100 } }, { race: {$in: ["Human", "Mutant"]}  }, { publisher: {$not: { $eq: "DC Comics" }} }] })
// Exercício 16: Retorne o total de documentos que não contêm o campo race .
db.superheroes.count({ race: { $exists: false } })
// Exercício 17: Retorne o total de documentos que contêm o campo hairColor .
db.superheroes.count({ "aspects.hairColor": { $exists: true } })
// Exercício 18: Remova apenas um documento publicado pela Sony Pictures .
db.superheroes.deleteOne({ publisher: "Sony Pictures" })
// Exercício 19: Remova todos os documentos publicados pelo George Lucas .
db.superheroes.deleteMany({ publisher: "George Lucas" })

