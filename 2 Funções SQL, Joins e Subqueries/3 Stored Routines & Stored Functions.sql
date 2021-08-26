USE sakila;
DELIMITER $$

CREATE PROCEDURE ExibeOs10AtoresMaisPopulares()
BEGIN
	SELECT actor_id, (
		SELECT COUNT(*) FROM film_actor
        WHERE film_actor.actor_id = actor.actor_id
    ) AS FilmsDone FROM actor;
END $$

DELIMITER ;

USE sakila;
DELIMITER $$

CREATE PROCEDURE ExibeFilmesPorCategoria(IN categoria VARCHAR(50))
BEGIN
	SELECT FC.film_id, F.title, FC.category_id, C.`name`
    FROM film_category AS FC
    INNER JOIN category AS C ON C.category_id = FC.category_id
    INNER JOIN film AS F ON F.film_id = FC.film_id
    WHERE categoria = C.`name`;
END $$

DELIMITER ;

CALL ExibeFilmesPorCategoria('Animation');

USE sakila;
DELIMITER $$

CREATE PROCEDURE VerificaSeClienteAtivo(IN email VARCHAR(60), OUT ativo_ou_nao VARCHAR(8))
BEGIN
	SELECT active 
    INTO ativo_ou_nao 
    FROM customer 
    WHERE email = customer.email;
END $$

DELIMITER ;

CALL VerificaSeClienteAtivo('SANDRA.MARTIN@sakilacustomer.org', @eAtivo);
SELECT @eAtivo;