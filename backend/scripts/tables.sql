create table if not exists `tfilms` (
   `id` int(10) not null auto_increment
,  `name` text not null
,  primary key (`id`)
  ) 
engine=myisam default charset=latin1 
auto_increment=1;

create table if not exists `tsessions` (
  `id` int(10) not null auto_increment ,
  `seq` int(10) not null ,
  `time` varchar(70) not null ,
  `room` varchar(70) not null ,
  `price` decimal(17,8) not null,
  `dayOfTheWeek` varchar(70) not null ,
  `film_id` int(10) not null,
  primary key (`id`)
) engine=myisam default charset=latin1 
  auto_increment=1 ;

ALTER TABLE tsessions ADD CONSTRAINT sess_film_id_fk 
  FOREIGN KEY(film_id) 
  REFERENCES tfilms (id) ON DELETE CASCADE ON UPDATE CASCADE;

create table if not exists `tpurchases` (
  `id` int(10) not null auto_increment,
  `customer_name` varchar(100) not null,
  `banner`  varchar(40) not null,
  `card_number` varchar(40) not null,
  `transaction_id` varchar(40) not null,
  `authorization` varchar(40) not null,
  `film_id` int(10) not null,
  `transaction_date` varchar(40) not null,
  primary key (`id`)
) engine=myisam default charset=latin1 
  auto_increment=1 ;

  ALTER TABLE tpurchases ADD CONSTRAINT purch_film_id_fk 
  FOREIGN KEY(film_id) 
  REFERENCES tfilms (id) ON DELETE CASCADE ON UPDATE CASCADE;

create table if not exists `titens_purchases` (
  `id` int(10) not null auto_increment,
  `purchase_id` int(10) not null,
  `chair`  varchar(40) not null,
  `session_id` int(10) not null,
  `total` decimal(17,8) not null,
  primary key (`id`)
) engine=myisam default charset=latin1 
  auto_increment=1 ;

ALTER TABLE titens_purchases ADD CONSTRAINT ite_purc_session_id_fk 
FOREIGN KEY(session_id) REFERENCES tsessions (id) ON DELETE CASCADE ON UPDATE CASCADE;
