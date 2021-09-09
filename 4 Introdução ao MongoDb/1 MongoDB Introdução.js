// Exercício 1 : Retorne o documento com o _id igual a 8.
db.bios.find({ _id: 8 })

// Exercício 2 : Retorne o documento com o _id igual a 8, mas só exiba os atributos: _id e name .
db.bios.find({_id: 8}, {name: 1})
// Exercício 3 : Retorne apenas os atributos name e birth do documento com o _id igual a 8.
db.bios.find({ _id: 8 }, { name: 1, birth: 1, _id: 0 })
// Exercício 4 : Retorne todos os documentos em que o atributo name.first seja igual a John , utilizando o método pretty() .
db.bios.find({ 'name.first': 'John' }).pretty()
// Exercício 5 : Retorne os 3 primeiros documentos da coleção bios utilizando o método pretty() .
db.bios.find().limit(3).pretty()
// Exercício 6 : Retorne 2 documentos da coleção bios pulando os 5 primeiros documentos.
db.bios.find().skip(5).limit(2)
// Exercício 7 : Retorne a quantidade de documentos da coleção bios .
db.bios.count()
