SELECT UCASE('Oi, eu sou uma string');
SELECT LCASE('Oi, eu sou uma string');
SELECT REPLACE('Oi, eu sou uma string', 'string', 'cadeia de caracteres');
SELECT LEFT('Oi, eu sou uma string', 3);
SELECT RIGHT('Oi, eu sou um string', 6);
SELECT LENGTH('Oi, eu sou uma string');
SELECT SUBSTRING('Oi, eu sou uma string', 5, 2);
SELECT SUBSTRING('Oi, eu sou uma string', 5);

USE sakila;
SELECT film_id, title, IF(title = 'ACE GOLDFINGER' OR title = 'ACADEMY DINOSAUR', 'Já assisti esse filme', 'Não conheço esse filme') AS 'conheço o filme?'
FROM film;

SELECT title, rating, 
CASE 
	WHEN rating = 'G' THEN 'Livre para todos'
    WHEN rating = 'PG' THEN 'Não recomendado para menores de 10 anos'
    WHEN rating = 'PG-13' THEN 'Não recomendado para menores de 13 anos'
    WHEN rating = 'R' THEN 'Não recomendado para menores de 17 anos'
    ELSE 'Proibido para menores de idade'
    END
AS 'público-alvo' FROM film;

SELECT ROUND(15 + (RAND() * 5)) AS numero;
SELECT ROUND(15.7515971, 5);
SELECT FLOOR(39.494);
SELECT CEIL(85.234);

SELECT DATEDIFF('2030-01-20', CURRENT_DATE()) AS 'Diferença em Dias';
SELECT TIMEDIFF('10:25:45', '11:00:00') AS 'Diferença em Tempo';

SELECT AVG(length) AS 'Média de Duração' FROM film;
SELECT MAX(length) AS 'Duração Máxima' FROM film;
SELECT SUM(length) AS 'Tempo de Exibição Total' FROM film;

SELECT first_name, COUNT(*) FROM actor GROUP BY first_name;
SELECT active, COUNT(*) FROM customer GROUP BY active;
SELECT * FROM customer;
SELECT store_id, IF(active, 'Ativos', 'Inativos'), COUNT(active) FROM customer 
GROUP BY store_id, active 
ORDER BY store_id;
SELECT * FROM film;
SELECT rating, AVG(length) AS 'Média de Duração' FROM film GROUP BY rating ORDER BY `Média de Duração` DESC;

SELECT rating, SUM(replacement_cost) AS custo_total 
FROM film 
GROUP BY rating 
HAVING custo_total > 3950.50 
ORDER BY custo_total;