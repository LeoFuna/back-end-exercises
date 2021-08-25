USE sakila;
SELECT * FROM actor;
SELECT A.actor_id, A.first_name, F.film_id FROM actor AS A INNER JOIN film_actor AS F ON A.actor_id = F.actor_id;

SELECT * FROM staff;
SELECT * FROM address;
SELECT S.first_name, S.last_name, A.address FROM staff AS S INNER JOIN address AS A ON S.address_id = A.address_id;

SELECT C.customer_id, C.first_name, C.email, A.address_id, A.address FROM customer 
AS C INNER JOIN address 
AS A ON C.address_id = A.address_id LIMIT 100;

SELECT C.first_name, C.email, A.address_id, A.address FROM customer 
AS C INNER JOIN address 
AS A ON C.address_id = A.address_id 
WHERE district = 'California' AND first_name LIKE '%rene%';

SELECT A.actor_id, A.first_name, FA.film_id, F.title FROM actor AS A
INNER JOIN film_actor AS FA ON A.actor_id = FA.actor_id
INNER JOIN film AS F ON FA.film_id = F.film_id;