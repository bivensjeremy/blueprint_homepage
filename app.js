require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const nodemailer = require("nodemailer");


const app = express();
const log = console.log;



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/portfolio", function(req, res) {
  res.render("portfolio");
});

app.get("/services", function(req, res) {
  res.render("services");
});

app.get("/messagesent", function(req, res) {
  res.render("messagesent");
});

app.route("/contact")
  .get(function(req, res) {
    res.render("contact");
  })
  .post(function(req, res) {
    const name = req.body.Name;
    const email = req.body.Email;
    const phone = req.body.Phone;
    const subject = req.body.Subject;
    const message = req.body.Message;

    const smtpTrans = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
      }
    });

    const mailOpts = {
      from: 'contact@bivensblueprint.com',
      to: 'admin@bivensblueprint.com',
      subject: `${subject}`,
      html: `<b>Name:</b> ${name} <br> <b>Email:</b> ${email} <br><b>Phone:</b> ${phone} <br> <b>Message:</b> ${message}`
    }
    smtpTrans.sendMail(mailOpts, function(err, success) {
      if (err) {
        log(err)
      } else {
        res.render('messagesent');
      }
    });
  });


app.listen(3000, function() {
  console.log("Server Started on port 3000")
});
