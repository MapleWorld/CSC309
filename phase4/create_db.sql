-- Tested with MySQL v5.1.73

-- CREATE SCHEMA communityfund;

-- insert into user (username, password, created_date, email, mailing_address, phone, gender, money, organization, interest, admin) values 
--	('user1','password', '2014-10-23 20:04:25', 'test1@email.com', 'toronto', '416-888-8888', 'male', 999999, 'Uoft', 'health', 1); 
	
create table user (
	-- General Data
	id int AUTO_INCREMENT PRIMARY KEY,
	username varchar(40) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	created_date datetime NOT NULL,
	comparable_date int default 0,
	email varchar(40) UNIQUE NOT NULL,
	
	-- Initiator Data
	firstname varchar(20),
	lastname varchar(20),
	phone varchar(20),
	gender varchar(10),
	mailing_address varchar(100),
	initiator_reputation int default 0,

	-- Funder Data
	money int DEFAULT 0,
	organization varchar(30),
	interest varchar(30),
	funder_reputation int default 0,
	
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
	community varchar(30)  NOT NULL,
	description varchar(200) NOT NULL,
	initiator_id int NOT NULL,
	created_date datetime NOT NULL,
	comparable_date int default 0,
	funding int DEFAULT 0,
	donation int default 0,
	payment int default 0,
	funder_id int default 0,
	likes int default 0,
	goal int default 0,
	FOREIGN KEY (initiator_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


	
	