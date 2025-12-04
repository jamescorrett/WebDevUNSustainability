const express = require('express')
const app = express()
const port = 3000
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile("index.html", (err) => {
        if (err)
            console.log(err)
    })
})
//const transporter = nodemailer.createTransport({
   // service: 'gmail',
    //auth: {
   //     user: process.env.Email_USER, // my email
      //  pass: process.env.Email_PASS,
  //  },
//});
app.post("/form", (req, res)=>{
     console.log(req.body);
     let name = req.body.name;
     let email = req.body.email;
     let message = req.body.message;
    res.json({name:name, email:email});
});
   

app.listen(port, () => {
    console.log('app is listening')
})

