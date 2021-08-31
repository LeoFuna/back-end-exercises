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
