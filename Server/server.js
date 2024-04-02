const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const { error } = require('console');


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    next();
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: apiKey,
// };
// const url = "https://localhost:8080/api/expenses/get-expenses";

// axios.get(url, { headers });



const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "signup"
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})

con.connect(function(err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
});

app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get employee error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get employee error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee set project = ?  WHERE id =?";
    con.query(sql, [req.body.project, id], (err, result) => {
        if (err) return res.json({ Error: "update employee error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM employee WHERE id =?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Delete employee error in sql" });
        return res.json({ Status: "Success" })
    })
})
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are no Authenticate" });

    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from user";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    })
})

app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    })
})

// app.get('/salary', (req, res) => {
//   const sql = "Select sum(project) as SumOfproject from employee";
//   con.query(sql, (err, result) => {
//     if(err) return res.json({Error: "Error in running query"});
//     return res.json(result);
//   })
// })


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user Where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1h' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})

app.post('/employeelogin', (req, res) => {
        const sql = "SELECT * FROM employee Where email = ?";
        con.query(sql, [req.body.email], (err, result) => {
            if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
            if (result.length > 0) {
                bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                    if (err) return res.json({ Error: "password error" });
                    if (response) {
                        const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret-key", { expiresIn: '1h' });
                        res.cookie('token', token);
                        return res.json({ Status: "Success", id: result[0].id })
                    } else {
                        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
                    }

                })

            } else {
                return res.json({ Status: "Error", Error: "Wrong Email or Password" });
            }
        })
    })
    //  app.get('/employee/:id', (req, res) => {
    //   const id = req.params.id;
    //   const sql = "SELECT * FROM employee where id = ?";
    //   con.query(sql, [id], (err, result) => 
    //   {
    //     if(err) return res.json({Error: "Get employee error in sql"});
    //     return res.json({Status:"Success", Result: result})
    //   })
    //  })


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`name`,`email`,`password`,`address`,`project`,`image`,`gender`,`role`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing Password" });
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.project,
            req.file.filename,
            // req.body.date_format(DateOfJoining), 
            // req.body.DateOfJoining,
            // req.body.DateOfBirth,
            req.body.gender,
            req.body.role

        ]
        con.query(sql, [values], (err, result) => {

            if (err) return res.json({ Error: "Inside signup query" });
            return res.json({ Status: "Success" });
        })
    })
})
const PORT = 8075;
app.listen(PORT, () => {
    console.log("Running");
});