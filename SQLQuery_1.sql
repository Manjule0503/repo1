create DATABASE Rupesh
		drop table User
		CREATE TABLE User(
		    email VARCHAR(25),
		    pass VARCHAR(10)
		)
		SELECT * from User;
        DELETE from User WHERE email='a@b.com'
		ALTER user 'root'@'localhost' IDENTIFIED with  mysql_native_password by 'root123';