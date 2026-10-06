const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express")
const path = require("path")

const app = express()


app.use(express.urlencoded({ extended: true }));

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "/views"));


app.post("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  let q = `UPDATE user
           SET username = ?, email = ?
           WHERE id = ?`;

  connection.query(q, [username, email, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }

    console.log("User Updated Successfully");

    res.redirect("/user");
  });
});

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



app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) AS count FROM user`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }

    const count = result[0].count;

    console.log(count);

    res.render("home.ejs", { count });
  });
});

//USERS 

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }

    const data = result;

    console.log(data);

    res.render("user.ejs", { data });
  });
});

//EDIT OPTION

app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;

  let q = `SELECT * FROM user WHERE id = ?`;

  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }

    const user = result[0];

    res.render("edit.ejs", { user });
  });
});


app.listen("3000" , () => {
  console.log("Server is listending to port 3000")
})