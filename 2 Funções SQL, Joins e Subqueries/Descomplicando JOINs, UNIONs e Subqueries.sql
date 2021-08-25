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

----------------
SELECT f1.film_id, f1.replacement_cost, f2.film_id, f2.replacement_cost FROM film AS f1, film AS f2
WHERE f1.replacement_cost = f2.replacement_cost;

SELECT f1.title, f1.rental_duration, f2.title, f2.rental_duration FROM film AS f1, film AS f2
WHERE f1.length = f2.length AND (f1.rental_duration BETWEEN 2 AND 4) AND (f2.rental_duration BETWEEN 2 AND 4);
-----------------
SELECT first_name, last_name FROM staff
UNION ALL
SELECT first_name, last_name FROM actor;

SELECT first_name, last_name FROM customer WHERE first_name LIKE '%tracy%'
UNION
SELECT first_name, last_name FROM actor WHERE first_name LIKE '%je%';

(SELECT first_name, last_name FROM actor ORDER BY actor_id DESC LIMIT 5)
UNION
(SELECT first_name, last_name FROM staff LIMIT 1)
UNION
(SELECT first_name, last_name FROM customer LIMIT 5 OFFSET 14)
ORDER BY first_name;
----------------------
SELECT id, title FROM hotel.Books AS B
WHERE NOT EXISTS (
	SELECT * FROM hotel.Books_Lent 
    WHERE book_id = B.Id
);

SELECT id, title FROM hotel.Books AS B
WHERE EXISTS (
	SELECT * FROM hotel.Books_Lent
    WHERE book_id = B.Id AND B.Title LIKE '%lost%'
);

SELECT CUS.`Name`, CAR.`Name` FROM hotel.Customers AS CUS
INNER JOIN hotel.Cars AS CAR 
WHERE EXISTS (
	SELECT * FROM hotel.CarSales
    WHERE CarID = CAR.Id AND CustomerID = CUS.CustomerID
);
