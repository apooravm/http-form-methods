const DB_PATH = './database/data.json';
let DATABASE = require(DB_PATH);
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/api/getUser', (req, res) => {
    fs.readFile(DB_PATH, (err, data) => {
        if (err) {
            console.log("error in reading DB");
        }
        res.status(200).send(JSON.parse(data));
    });
});

app.post('/api/postUserForm', (req, res) => {
    try {
        const {name, age, email, password} = req.body;
        const userObj = {
            "name": name, 
            "age": age,
            "email": email,
            "password": password,
        }
        DATABASE.push(userObj);
        fs.writeFile(DB_PATH, JSON.stringify(DATABASE, null, " "), (err) => {
            if (err) {
                console.log("error in writing to DB");
            } else {
                res.status(200).redirect("/redirectPage.html");
            }
        });
    } catch (error) {
        console.log("Error");
    }
});

app.post('/api/postUser', (req, res) => {
    try {
        const userObj = req.body.user;
        DATABASE.push(userObj);
        fs.writeFile(DB_PATH, JSON.stringify(DATABASE, null, " "), (err) => {
            if (err) {
                console.log("error in writing to DB");
            } else {
                DATABASE = require(DB_PATH);
                res.status(200).redirect("/redirectPage.html");
            }
        });
    } catch (error) {
        console.log("Error");
    }
});

app.put("/api/putUser/:id", (req, res) => {
    try {
        const userIndex = req.params.id;
        const new_User_Data = req.body.user;

        DATABASE[userIndex] = new_User_Data;
        fs.writeFile(DB_PATH, JSON.stringify(DATABASE, null, " "), (err) => {
            if (err) {
                console.log("error in writing to DB");
                res.status(500).send("Database Error!");
            } else {
                
                res.status(200).send("Success!😷😵");
            }
        });
    } catch (err) {
        console.log("error!");
    }
});

app.delete("/api/deleteUser/:id", (req, res) => {
    try {
        const userIndex = req.params.id;
        DATABASE.splice(userIndex, 1);

        fs.writeFile(DB_PATH, JSON.stringify(DATABASE, null, " "), (err) => {
            if (err) {
                console.log("error in writing to DB");
                res.status(500).send("Database Error!");
            } else {
                res.status(200).send("Success!🥶");
            }
        });
    } catch (err) {
        console.log("error!");
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server live on port ${PORT}`)
})