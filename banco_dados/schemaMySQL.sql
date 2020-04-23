--criando o database
create database rateiocloud;
--usando o database
use rateiocloud;
--criando a tabela
CREATE TABLE `CADASTRO_PRODUTO` (
	`resource_id` varchar(255) NOT NULL,
	`resource_type` varchar(255) NOT NULL,
	`resource_name` varchar(255),
	`projeto` varchar(300),
	`funcao` varchar(300),
	`owner_` varchar(300),
	`rateio` int (1) not null,
	`cloud` varchar(100) not null,
	PRIMARY KEY (`resource_id`)
);
