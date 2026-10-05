const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

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
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// 100 users generate
let data = [];

for (let i = 1; i <= 100; i++) {
  data.push(getRandomUser());
}

// Insert into MySQL
connection.query(q, [data], (err, result) => {
  if (err) {
    console.log(result);
  } else {
    console.log("100 Users Added Successfully");
    console.log(result);
  }

  connection.end();
});