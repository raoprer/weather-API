const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //when user opens the url
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //when the user does some action
  console.log(req.body.cityName);
  var query = req.body.cityName;
  var appid = "24f6c434e45b873ab2a98d2364c6abd5";
  var unit = "metric";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appid +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const wdata = JSON.parse(data); //To make it to readable format from hexa
      var temp = wdata.main.temp;
      var wdes = wdata.weather[0].description;
      var icon = wdata.weather[0].icon;
      var imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + wdes + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees celsius</h1>"
      );
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
