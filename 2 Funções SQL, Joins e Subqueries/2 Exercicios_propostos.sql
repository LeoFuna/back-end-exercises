USE Pixar;
-- 1 Utilizando o INNER JOIN , encontre as vendas nacionais ( domestic_sales ) e internacionais ( international_sales ) de cada filme.
SELECT M.title, B.domestic_sales, B.international_sales FROM Movies AS M
INNER JOIN BoxOffice AS B 
ON B.movie_id = M.id;
-- 2 Utilizando o INNER JOIN , faça uma busca que retorne o número de vendas para cada filme que possui um número maior de vendas 
-- internacionais ( international_sales ) do que vendas nacionais ( domestic_sales ).
SELECT M.title, B.international_sales FROM Movies AS M
INNER JOIN BoxOffice AS B
ON M.id = B.movie_id 
WHERE B.international_sales > B.domestic_sales;
-- 3 Utilizando o INNER JOIN , faça uma busca que retorne os filmes e sua avaliação ( rating ) em ordem decrescente.
SELECT M.title, B.rating FROM Movies AS M
INNER JOIN BoxOffice AS B
ON M.id = B.movie_id
ORDER BY B.rating DESC;
-- 4