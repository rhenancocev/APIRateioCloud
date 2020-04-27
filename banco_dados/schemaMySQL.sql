--criando o database
create database rateiocloud;
--usando o database
use rateiocloud;

--criação de tabelas
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

CREATE TABLE `CLOUD_EXTRATO` (
	`period` DATE ,
	`account_period` varchar(100) ,
	`resource_Id` varchar(200) ,
	`resource_name` varchar(200) ,
	`resource_tag` varchar(200) ,
	`be` varchar(200) ,
	`billing_mode` varchar(200) ,
	`fee_name` varchar(200) ,
	`resource_type` varchar(200) ,
	`product` varchar(200) ,
	`product_specifications` varchar(200) ,
	`region` varchar(200) ,
	`enterprise_project_id` varchar(200) ,
	`enterprise_project_name` varchar(200) ,
	`usage_type` varchar(200) ,
	`usage_` DECIMAL (50,2) ,
	`usage_type_in` varchar(200) ,
	`usage_unit` varchar(200) ,
	`official_total_amount_usd` DECIMAL(18,8) ,
	`discount_amount_usd` DECIMAL(18,8) ,
	`tax_usd` DECIMAL(18,8) ,
	`amount_usd` DECIMAL(18,8) ,
	`transaction_time` varchar(200) 
);

--script para dar permissão para a api utilizar a senha do root no BD
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
