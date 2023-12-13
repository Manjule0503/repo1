# dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "index.js" ]

# index.js
import Express from "express";

import bodyParser from "body-parser";

import { fileURLToPath } from "url";

import { dirname } from "path";

import mysql from "mysql2";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 8081;

const HOST = '0.0.0.0';

const app = Express();

app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({

    host     : '172.18.0.2',
    
    user     : 'root',
    
    password : 'my-secret-pw',
    
    database : 'Rupesh'

})
  
db.connect(err => {

    if (err) throw err 
    
    console.log('MySQL database connected successfully!')
})

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html");

});

app.post("/register",(req,res)=>{

    const email= req.body.email;
    
    const password=req.body.psw;
    
    console.log(email);
    
    console.log(password);
    
    db.query("INSERT INTO User values('"+email+"','"+password+"')");
    
    res.send('User saved successfully!');

})

app.listen(PORT, HOST, () => {

  console.log(`Running on http://${HOST}:${PORT}`);

});

# steps
1. Create network for crosstalk
	- sudo docker network create --driver bridge test_network

2. Pull mysql form hub
	- sudo docker pull mysql
	- sudo docker run -p 3306:3306 --name mysqlDB --network test_network -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
	- Connect to azuredatastudio

		create DATABASE Rupesh{
		drop table User
		CREATE TABLE User(
		    email VARCHAR(25),
		    pass VARCHAR(10)
		)
		SELECT * from User;

		ALTER user 'root'@'localhost' IDENTIFIED with  mysql_native_password by 'my-secret-pw';
	}
	
3. Unzip Project
4. Create docker container of project 
	- sudo docker build . -t rupesh/node-web-app.
	- sudo docker run -p 8081:8081 -itd --name webapp --network test_network rupesh/node-web-app:latest
	
