const test=require("dotenv").config();
console.log(test.parsed);

const {Pool}=require("pg");

let pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
});

module.exports=pool;
