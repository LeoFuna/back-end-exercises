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

// Selecione e faça a contagem dos restaurantes que não possuem avaliação menor ou igual a 5 , 
// essa consulta também deve retornar restaurantes que não possuem o campo avaliação.
db.restaurants.count({ rating: { $not: { $gte: 5 } } })
// Selecione e faça a contagem dos restaurantes em que a avaliação seja maior ou igual a 6 , ou restaurantes localizados no bairro Brooklyn .

// Selecione e faça a contagem dos restaurantes localizados nos bairros Queens , Staten Island e Broklyn e possuem avaliação maior que 4 .
// Selecione e faça a contagem dos restaurantes onde nem o campo avaliação seja igual a 1 , nem o campo culinária seja do tipo American .
// Selecione e faça a contagem dos resturantes em que a avaliação seja maior que 6 ou menor que 10 , E esteja localizado no bairro Brooklyn , OU não possuem culinária do tipo Delicatessen .