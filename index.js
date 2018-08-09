const exphbs = require('express-handlebars');
let express = require('express');
let app = express();
const settingBill = require("./settings");
const setting = settingBill();


bodyParser = require('body-parser');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('settings-bill', {
    settings: setting.settingBill(),
    total: setting.total()
  });

});


app.post('/settings', function (req, res) {
  setting.settingBill({
    smsCost: req.body.smsCost,
    callCost: req.body.callCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel

  })

  app.post("/action", function(req,res){


    setting.
  })

  // note that data can be sent to the template
  res.render('home', {
    settings
  })
});


let PORT = process.env.PORT || 4007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});