USE sakila;
INSERT INTO staff (first_name, last_name, address_id, store_id, active, username) VALUES 
('Leonardo', 'Funabashi', 3, 2, TRUE, 'leofuna');

SELECT * FROM staff;
INSERT INTO staff (first_name, last_name, address_id, store_id, active, username) VALUES 
('Lucas', 'Funabashi', 4, 1, TRUE, 'lucfuna'),
('Leandro', 'Funabashi', 3, 2,  FALSE, 'leafuna');

INSERT INTO actor (first_name, last_name) SELECT first_name, last_name FROM customer;
SELECT * FROM actor;

SET SQL_SAFE_UPDATES = 0; -- Utilizado para conseguir fazer update sem bloqueio

UPDATE actor SET first_name = 'JULES' WHERE first_name = 'JULIA';

SELECT * FROM category;
UPDATE category SET name = 'Science Fiction' WHERE name = 'Sci-Fi';

SELECT * FROM film;
UPDATE film SET rental_rate = 25.00 WHERE length > 100 AND rating IN ('G', 'PG', 'PG13') AND replacement_cost > 20.00;

UPDATE film SET rental_rate = (
CASE 
	WHEN length <= 100 THEN 10.00
	WHEN length > 100 THEN 20.00
    ELSE length
END
);

SELECT * FROM actor;
DELETE FROM film_actor WHERE actor_id IN (12, 726);

DELETE FROM actor WHERE first_name = 'KARL';

SELECT * FROM film_text;
DELETE FROM film_text WHERE description LIKE '%saga%';

TRUNCATE film_actor; --Apaga tudo que está na film_actor
SELECT * FROM film_actor;