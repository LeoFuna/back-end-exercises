-- Primeiros contatos com comandos de busca em query como: SELECT, WHERE, LIKE, BETWEEN, ORDER BY, entre outros.

USE sakila;

SELECT * FROM customer WHERE email = 'LEONARD.SCHOFIELD@sakilacustomer.org';

SELECT * FROM customer WHERE active IS TRUE AND store_id = 2 AND first_name <> 'KENNETH' ORDER BY first_name;

SELECT title, description, release_year, replacement_cost FROM film
WHERE rating = 'PG' AND replacement_cost > '18.00'
ORDER BY replacement_cost DESC, title DESC LIMIT 100;

SELECT COUNT(*) FROM customer WHERE active IS TRUE AND store_id = 1;

SELECT * FROM customer WHERE active IS FALSE AND store_id = 1;

SELECT * FROM film WHERE rating = 'NC-17' ORDER BY rental_rate, title;

SELECT * FROM film WHERE title LIKE '%ace%';

SELECT * FROM film WHERE description LIKE '%china';

SELECT * FROM film WHERE description LIKE '%girl%' AND title LIKE '%lord';

SELECT * FROM film WHERE title LIKE '___gon%' AND description LIKE '%Documentary%';

SELECT count(*) FROM payment WHERE DATE(payment_date) = '2005-05-25';

SELECT count(*) FROM payment WHERE payment_date BETWEEN '2005-07-01' AND '2005-08-22';
