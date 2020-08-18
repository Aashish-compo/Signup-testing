const express = require("express");
const path = require('path');
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
var fetchUrl = require("fetch").fetchUrl;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running sucessfully:)");
})

// app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));


process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));
//Now Everything starts

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});


app.post('/', function(req, res) {

  var names = req.body.names;
  var emails = req.body.emails;
  console.log(names, emails);


  var data = {
    members: [{
      email_address: emails,
      status: "subscribed",
      merge_fields: {
        FNAME: names,
      }
    }]
  };

  var jsonData = JSON.stringify(data);
  console.log(data);

  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/5590cf290f",
    method: "POST",
    headers: {
      "Authorization": "Aahish828 bb0c29dfa250a04f744a859aa6eee4ed-us18"
    },
    body: jsonData
  };

  app.post("/failure.html", function(req, res) {
    res.redirect("/")
  });


  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html")
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }

    }
  });
});
