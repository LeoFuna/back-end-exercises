-- Criação de uma ideia de banco de dados para um zoológico
CREATE DATABASE IF NOT EXISTS zoo;

USE zoo;

CREATE TABLE animais(
id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, 
nome VARCHAR(40) NOT NULL,
especie VARCHAR(40) NOT NULL, 
sexo VARCHAR(1) NOT NULL, 
idade VARCHAR(3) NOT NULL, 
localizacao VARCHAR(30) NOT NULL
);

CREATE TABLE gerente(
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(40) NOT NULL
);

CREATE TABLE cuidadores(
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(40) NOT NULL,
    id_gerente INTEGER NOT NULL,
    FOREIGN KEY (id_gerente) REFERENCES gerente (id)
);

CREATE TABLE animal_cuidador(
id_cuidador INTEGER NOT NULL,
id_animal INTEGER NOT NULL,
CONSTRAINT PRIMARY KEY(id_cuidador, id_animal)
);

INSERT INTO animais(nome, especie, sexo, idade, localizacao) 
VALUES ('Simba', 'Leão', 'M', 34, 'Centro de Felinos'),
('Pumba', 'Javali', 'M', 14, 'Floresta'),
('Pepa', 'Porco', 'F', 17, 'Chiqueiro');

INSERT INTO gerente(nome) VALUES ('Marcos Freitas'), ('Jasmin Ferreira');

INSERT INTO cuidadores(nome, id_gerente) VALUES ('Richard Rasmussen', 2), ('Helena Torres', 2), ('Samantha Ribas', 1);

INSERT INTO animal_cuidador(id_animal, id_cuidador) VALUES (1, 1), (2, 1), (3, 2);


-------------------
-- 1. Crie uma view chamada film_with_categories utilizando as tabelas category , film_category e film do banco de dados sakila . 
-- Essa view deve exibir o título do filme, o id da categoria e o nome da categoria. Os resultados devem ser ordenados pelo título do filme.
USE sakila;
CREATE VIEW film_with_category AS SELECT F.title, C.category_id, C.`name` FROM film_category AS FC
INNER JOIN film AS F ON F.film_id = FC.film_id
INNER JOIN category AS C ON C.category_id = FC.category_id
ORDER BY F.title;

-- 2. Crie uma view chamada film_info utilizando as tabelas actor , film_actor e film do banco de dados sakila . 
-- Sua view deve exibir o actor_id , o nome completo do ator ou da atriz em uma coluna com o ALIAS actor e o título dos filmes. 
-- Os resultados devem ser ordenados pelos nomes de atores e atrizes.
CREATE VIEW film_info AS SELECT A.actor_id, CONCAT(first_name, ' ', last_name) AS actor, F.title FROM film_actor AS FA
INNER JOIN film AS F ON F.film_id = FA.film_id
INNER JOIN actor AS A ON A.actor_id = FA.actor_id
ORDER BY `actor`;

-- 3.Crie uma view chamada address_info que faça uso das tabelas address e city do banco de dados sakila . 
-- Sua view deve exibir o address_id , o address , o district , o city_id e a city . 
-- Os resultados devem ser ordenados pelo nome das cidades.
CREATE VIEW address_info AS SELECT A.address_id, A.address, A.district, A.city_id, C.city FROM address A
INNER JOIN city C ON C.city_id = A.city_id
ORDER BY C.city;

-- 4. Crie uma view chamada movies_languages , usando as tabelas film e language do banco de dados sakila . 
-- Sua view deve exibir o título do filme , o id do idioma e o idioma do filme.
CREATE VIEW movies_language AS SELECT F.title, L.language_id, L.`name` FROM film F
INNER JOIN language L ON L.language_id = F.language_id;

--Crie um FULLTEXT INDEX na tabela category (banco de dados sakila ), adicionando-o na coluna name.
CREATE FULLTEXT INDEX name_index ON sakila.category(`name`);
DROP INDEX name_index ON sakila.category;

-- Crie um INDEX na tabela address (banco de dados sakila ) adicionando-o na coluna postal_code .
CREATE INDEX postal_code_index ON sakila.address(postal_code);
DROP INDEX postal_code_index ON sakila.address;

-- Escreva uma query SQL para alterar na tabela localtions o nome da coluna street_address para address , mantendo o mesmo tipo e tamanho de dados.
ALTER TABLE hr.locations CHANGE street_address address VARCHAR(40) NOT NULL;
-- Escreva uma query SQL para alterar o nome da coluna region_name para region , mantendo o mesmo tipo e tamanho de dados.
ALTER TABLE hr.regions CHANGE region_name region VARCHAR(25);