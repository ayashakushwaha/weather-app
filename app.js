const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=463662d7c3b09190c269c50e95a38a24&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const weatherDescription = weatherData.weather[0].description;
      // const weatherBox = JSON.stringify(weatherData);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.setHeader("Content-type", "text/html");
      res.write(
        `<h1>The temperation of ${query} is ${temp} degrees celcius .the weather is ${weatherDescription} in ${query}.</h1>`
      );
      res.write(`<img src="${imgURL}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("our server is running");
});
