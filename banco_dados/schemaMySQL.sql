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
	`rateio` varchar (3) not null,
	`cloud` varchar(100) not null,
	`aprovador` varchar(60),
	`cr` varchar(255),
	PRIMARY KEY (`resource_id`)
);

CREATE TABLE `CLOUD_EXTRATO` (
	`billing_cycle` varchar(255) ,
	`date_` date,
	`enterprise_project` varchar(255) ,
	`enterprise_project_id` varchar(255) ,
	`account_name` varchar(255) ,
	`service_type_code` varchar(255) ,
	`service_type` varchar(255) ,
	`resource_type_code` varchar(255) ,
	`resource_type` varchar(255) ,
	`product_id` varchar(255) ,
	`billing_mode` varchar(255) ,
	`bill_type` varchar(255) ,
	`resource_id` varchar(255) ,
	`resource_name` varchar(255) ,
	`resource_tag` varchar(255) ,
	`sku_code` varchar(255) ,
	`resource_specifications` varchar(255) ,
	`parent_resource_id` varchar(255) ,
	`root_resource_id` varchar(255) ,
	`region_code` varchar(255) ,
	`region` varchar(255) ,
	`az` varchar(255) ,
	`list_price_usd` DECIMAL(18,8) ,
	`discount_usd` DECIMAL(18,8) ,
	`amount_usd` DECIMAL(18,8) ,
	`cash_payment_usd` DECIMAL(5,2) ,
	`cash_coupon_used_usd` DECIMAL(5,2) ,
	`monthly_settlement_usd` DECIMAL(5,2) ,
	`written_off_usd` DECIMAL(5,2),
	`projeto` varchar(200) ,
	`funcao` varchar(200) ,
	`owner_` varchar(200) ,
	`rateio` varchar (3) ,
	`cloud` varchar(200) ,
	`aprovador` varchar(60),
	`cr` varchar(255)
	 
);

--script para dar permissão para a api utilizar a senha do root no BD
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
