-- 1 Exibir maior salário
SELECT first_name, last_name, MAX(salary) AS maior_salario FROM hr.employees;
-- 2 Diferença entre o maior e o menor salário
SELECT MAX(salary) - MIN(salary) AS diferença_de_salarios FROM hr.employees;
-- 3 a média salarial de cada JOB_ID , ordenando pela média salarial em ordem decrescente.
SELECT job_id, AVG(salary) AS média FROM hr.employees GROUP BY job_id ORDER BY média DESC;
-- 4 a quantidade de dinheiro necessária para realizar o pagamento de todas as pessoas funcionárias.
SELECT SUM(salary) AS custo_salários_total FROM hr.employees;
-- 5 exiba quatro informações: o maior salário, o menor salário, a soma de todos os salários e a média dos salários.
-- Todos os valores devem ser formatados para ter apenas duas casas decimais.
SELECT MAX(salary), MIN(salary), SUM(salary), ROUND(AVG(salary), 2) FROM hr.employees;
-- 6 a quantidade de pessoas que trabalham como pessoas programadoras ( IT_PROG ).
SELECT COUNT(job_id) FROM hr.employees WHERE job_id = 'IT_PROG';
-- 7 a quantidade de dinheiro necessária para efetuar o pagamento de cada profissão ( JOB_ID ).
SELECT job_id, SUM(salary) AS custo_do_setor FROM hr.employees GROUP BY job_id;
-- 8 Utilizando a query anterior, faça as alterações para que seja exibido somente a quantidade de dinheiro 
-- necessária para cobrir a folha de pagamento das pessoas programadoras ( IT_PROG ).
SELECT job_id, SUM(salary) AS custo_do_setor FROM hr.employees GROUP BY job_id HAVING job_id = 'IT_PROG';
-- 9 exiba em ordem decrescente a média salarial de todos os cargos, exceto das pessoas programadoras ( IT_PROG ).
SELECT job_id, AVG(salary) FROM hr.employees GROUP BY job_id HAVING job_id <> 'IT_PROG';
-- 10 exiba média salarial e o número de funcionários de todos os departamentos com mais de dez funcionários. Dica: agrupe pelo department_id .
SELECT DEPARTMENT_ID, AVG(SALARY), COUNT(*) AS funcionários FROM hr.employees GROUP BY DEPARTMENT_ID HAVING funcionários > 10;
-- 11 atualize a coluna PHONE_NUMBER , de modo que todos os telefones iniciados por 515 agora devem iniciar com 777 .
SELECT REPLACE(PHONE_NUMBER, '515', '777') FROM hr.employees;
-- 12 só exiba as informações dos funcionários cujo o primeiro nome tenha oito ou mais caracteres.
SELECT first_name FROM hr.employees WHERE LENGTH(FIRST_NAME) > 7;
-- 13 exiba as seguintes informações de cada funcionário: id , primeiro nome e ano no qual foi contratado (exiba somente o ano).
SELECT EMPLOYEE_ID, FIRST_NAME, YEAR(HIRE_DATE) FROM hr.employees;
-- 14 exiba as seguintes informações de cada funcionário: id , primeiro nome e dia do mês no qual foi contratado (exiba somente o dia).
SELECT EMPLOYEE_ID, FIRST_NAME, DAY(HIRE_DATE) FROM hr.employees;
-- 15 exiba as seguintes informações de cada funcionário: id , primeiro nome e mês no qual foi contratado (exiba somente o mês).
SELECT EMPLOYEE_ID, FIRST_NAME, MONTH(HIRE_DATE) FROM hr.employees;
-- 16 exiba os nomes dos funcionários em letra maiúscula.
SELECT UCASE(first_name) FROM hr.employees;
-- 17 exiba o sobrenome e a data de contratação de todos os funcionário contratados em julho de 1987.
SELECT last_name, DAY(hire_date) FROM hr.employees WHERE DATE(hire_date) LIKE '1987-07%';
-- 18 exiba as seguintes informações de cada funcionário: nome , sobrenome , tempo que trabalha na empresa (em dias) .
SELECT first_name, last_name, (CURRENT_DATE() - DATE(hire_date)) AS dias_contratado FROM hr.employees;