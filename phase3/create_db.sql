-- Tested with MySQL v5.1.73
create table user (
	id int AUTO_INCREMENT PRIMARY KEY,
	username varchar(40) UNIQUE NOT NULL,
	firstname varchar(40) UNIQUE NOT NULL,
	lastname varchar(40) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	created_at datetime NOT NULL,
	email varchar(40) UNIQUE NOT NULL,
	reputation int DEFAULT 0,
	mailing_address varchar(100) NOT NULL,
	phone varchar(20) NOT NULL,
	gender varchar(10) UNIQUE NOT NULL,
	admin tinyint default 0 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table community (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) UNIQUE NOT NULL,
	category varchar(100) UNIQUE NOT NULL,
	FOREIGN KEY (member_id) references user(id),
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table project (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) UNIQUE NOT NULL,
	category varchar(100) UNIQUE NOT NULL,
	funder_id int NOT NULL,
	initiator_id int NOT NULL,
	created_at datetime NOT NULL,
	description varchar(500) UNIQUE NOT NULL,
	FOREIGN KEY (funder_id) references user(id),
	FOREIGN KEY (initiator_id) references user(id),
	funding int DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
