const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express")

const app = express()


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Shoaib@101398"
});

// Function PEHLE
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Query
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// // 100 users generate
// let data = [];

// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }



app.get("/" , (req,res) => {
  let q = `SELECT COUNT (*) FROM user`;
  try{
     connection.query(q,(err, result) => {
  if (err) throw err;
    console.log(result);
    res.send(result)
  });
}catch(err){
  console.log(err)
  res.send("Some error in DB")
}
})

app.listen("3000" , () => {
  console.log("Server is listending to port 3000")
})