-- Test data; run this after create_db.sql
insert into user (username, firstname, lastname, password, created_at, email, mailing_address, phone, gender) values 
	('user1', 'first', 'last', 'password', '2014-10-23 20:04:25', 'test1@email.com', 'toronto', '416-888-8888', 'm'), 
	('user2', 'first', 'last', 'password', '2014-10-23 20:04:25', 'test2@email.com', 'toronto', '416-888-8888', 'm');

-- Test data; run this after create_db.sql
insert into user (username, firstname, lastname, password, email) values 
	('user1', 'first', 'last', 'password',  'test1@email.com'), 
	('user2', 'first', 'last', 'password', 'test2@email.com');

	