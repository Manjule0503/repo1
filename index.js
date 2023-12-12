import Express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mysql from "mysql2";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Constants
const PORT = 8081;
const HOST = '0.0.0.0';
// App
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