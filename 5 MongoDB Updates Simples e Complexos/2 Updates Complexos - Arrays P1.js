// Exercício 1: Adicione a categoria "superhero" ao filme Batman .
db.movies.updateOne({ title: "Batman" }, { $push: { category: "superhero" } });
// Exercício 2: Utilizando o modificador $each , adicione as categorias "villain" e "comic-based" ao filme Batman .
db.movies.updateOne({ title: "Batman" }, { $push: { category: { $each: [ "villain", "comic-based" ] } } });
// Exercício 3: Remova a categoria "action" do filme Batman .
db.movies.updateOne({ title: "Batman" }, { $pull: { category: "adventure" } });
// Exercício 4: Remova o primeiro elemento do array category do filme Batman .
db.movies.updateOne({ title: "Batman" }, { $pop: { category: -1 } });