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

-----------------------
USE sakila;
DELIMITER $$

CREATE FUNCTION ExibeQuantidadeDeLocacoesDeUmCliente(id INT)
RETURNS INT READS SQL DATA
BEGIN
	DECLARE numero_de_locacoes INT;
	SELECT COUNT(*) FROM payment WHERE customer_id = id
    INTO numero_de_locacoes;
    RETURN numero_de_locacoes;
END $$

DELIMITER ;

SELECT ExibeQuantidadeDeLocacoesDeUmCliente(2);

SELECT title FROM film INNER JOIN inventory WHERE inventory.film_id = film.film_id;

USE sakila;
DELIMITER $$

CREATE FUNCTION RetornaNomeDoFilmePorIdInventorio(id INT)
RETURNS VARCHAR(80) READS SQL DATA
BEGIN
	DECLARE nome_do_filme VARCHAR(80);
    SELECT F.title FROM film AS F INNER JOIN inventory AS I ON I.film_id = F.film_id WHERE I.inventory_id = id
    INTO nome_do_filme;
    RETURN nome_do_filme;
END $$

DELIMITER ;

SELECT RetornaNomeDoFilmePorIdInventorio(1);

USE sakila;
DELIMITER $$

CREATE FUNCTION ExibeTotalDeFilmesNumaCategoria(categoria VARCHAR(20))
RETURNS INT READS SQL DATA
BEGIN
	DECLARE quantidade_de_filmes INT;
    SELECT COUNT(*) FROM film_category AS F INNER JOIN category AS C ON C.category_id = F.category_id
    WHERE categoria = C.`name` INTO quantidade_de_filmes;
    RETURN quantidade_de_filmes;
END $$

DELIMITER ;

SELECT ExibeTotalDeFilmesNumaCategoria('Action');
-----------------
USE betrybe_automoveis;
DELIMITER $$
CREATE TRIGGER trigger_carros_insert
    BEFORE INSERT ON carros
    FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = NOW(),
		NEW.acao = 'INSERÇÃO',
        NEW.disponivel_em_estoque = 1;
END $$
DELIMITER ;

USE betrybe_automoveis;
DELIMITER $$
CREATE TRIGGER triiger_carros_update
	BEFORE UPDATE ON carros
    FOR EACH ROW
BEGIN
	SET NEW.data_atualizacao = NOW(),
    NEW.acao = 'ATUALIZAÇÃO';
END $$
DELIMITER ;

USE betrybe_automoveis;
DELIMITER $$
CREATE TRIGGER trigger_carros_delete
	AFTER DELETE ON carros
    FOR EACH ROW
BEGIN
	INSERT INTO log_operacoes(tipo_operacao, data_ocorrido) VALUES ('EXCLUSAO', DATE(NOW()));
END $$
DELIMITER ;

----------------------
USE BeeMovies;
DELIMITER $$

CREATE TRIGGER trigger_movies_insert
	BEFORE INSERT ON movies
    FOR EACH ROW
BEGIN
	SET NEW.release_year = YEAR(NOW());
END $$

CREATE TRIGGER trigger_movies_logs_insert
	AFTER INSERT ON movies
    FOR EACH ROW
BEGIN
	INSERT INTO movies_logs(movie_id, executed_action, log_date) VALUES(NEW.movie_id, 'INSERT', DATE(NOW()));
END $$

DELIMITER ;

USE BeeMovies;
DELIMITER $$

CREATE TRIGGER trigger_movies_update
	BEFORE UPDATE ON movies
    FOR EACH ROW
BEGIN
	SET NEW.ticket_price_estimation = IF(NEW.ticket_price > OLD.ticket_price, 'Increasing', 'Decreasing');
    INSERT INTO movies_logs(movie_id, executed_action, log_date) VALUES (NEW.movie_id, 'UPDATE', DATE(NOW()));
END $$

DELIMITER ;
