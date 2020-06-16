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
	`billing_cycle` varchar(10) ,
	`date_` date,
	`enterprise_project` varchar(20) ,
	`enterprise_project_id` int(2) ,
	`account_name` varchar(20) ,
	`service_type_code` varchar(30) ,
	`service_type` varchar(30) ,
	`resource_type_code` varchar(30) ,
	`resource_type` varchar(20) ,
	`billing_mode` varchar(20) ,
	`bill_type` varchar(20) ,
	`resource_id` varchar(60) ,
	`resource_name` varchar(20) ,
	`resource_tag` varchar(20) ,
	`resource_specifications` varchar(20) ,
	`parent_resource_id` varchar(20) ,
	`root_resource_id` varchar(20) ,
	`region` varchar(20) ,
	`az` varchar(20) ,
	`list_price_usd` DECIMAL(18,8) ,
	`discount_usd` DECIMAL(18,8) ,
	`amount_usd` DECIMAL(18,8) ,
	`cash_payment_usd` DECIMAL(5,2) ,
	`cash_coupon_used_usd` DECIMAL(5,2) ,
	`monthly_settlement_usd` DECIMAL(5,2) ,
	`written_off_usd` DECIMAL(5,2) 
);

--script para dar permissão para a api utilizar a senha do root no BD
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
