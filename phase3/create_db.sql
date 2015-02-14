-- Tested with MySQL v5.1.73

create table user (
	id int AUTO_INCREMENT PRIMARY KEY,
	username varchar(40) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	created_at datetime NOT NULL,
	
	user_type tinyint NOT NULL,
	admin tinyint default 0 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table community (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) UNIQUE NOT NULL,
	
	member_id int NOT NULL,
	FOREIGN KEY (member_id) references user(id),
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table project (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) UNIQUE NOT NULL,
	user_id int NOT NULL,
	created_at datetime NOT NULL,
	description varchar(500) UNIQUE NOT NULL,
	
	FOREIGN KEY (user_id) references user(id),
	funding int NOT NULL
	
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
