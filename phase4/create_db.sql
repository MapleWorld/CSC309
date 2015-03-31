-- Tested with MySQL v5.1.73

-- CREATE SCHEMA communityfund;

create table user (
	-- General Data
	id int AUTO_INCREMENT PRIMARY KEY,
	username varchar(40) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	created_date datetime NOT NULL,
	comparable_date int default 0,
	email varchar(40) UNIQUE NOT NULL
	-- Initiator Data
	phone varchar(20),
	gender varchar(10),
	mailing_address varchar(100),

	-- Funder Data
	money int DEFAULT 0,
	company varchar(30),
	companyType varchar(30),
	
	-- Admin
	admin tinyint default 0 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table community (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) UNIQUE NOT NULL,
	category varchar(100) UNIQUE NOT NULL,
	member_id int NOT NULL,
	FOREIGN KEY (member_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table project (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(30) UNIQUE NOT NULL,
	community varchar(30) UNIQUE NOT NULL,
	funder_id int NOT NULL,
	initiator_id int NOT NULL,
	created_date datetime NOT NULL,
	comparable_date int default 0,
	likes int default 0,
	description varchar(200) UNIQUE NOT NULL,
	FOREIGN KEY (funder_id) references user(id),
	FOREIGN KEY (initiator_id) references user(id),
	funding int DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
