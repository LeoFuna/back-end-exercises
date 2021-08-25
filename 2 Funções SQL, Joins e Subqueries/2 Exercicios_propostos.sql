-- 1 Utilizando o INNER JOIN , encontre as vendas nacionais ( domestic_sales ) e internacionais ( international_sales ) de cada filme.
USE Pixar;
SELECT M.title, B.domestic_sales, B.international_sales FROM Movies AS M
INNER JOIN BoxOffice AS B 
ON B.movie_id = M.id;
-- 2 Utilizando o INNER JOIN , faça uma busca que retorne o número de vendas para cada filme que possui um número maior de vendas 
-- internacionais ( international_sales ) do que vendas nacionais ( domestic_sales ).

-- 3 Utilizando o INNER JOIN , faça uma busca que retorne os filmes e sua avaliação ( rating ) em ordem decrescente.