const exphbs = require('express-handlebars');
let express = require('express');
let app = express();
const settingBill = require("./settings");
const settings = settingBill();


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
  let setValues = settings.returnValues()
 let color = settings.color()


  res.render('settings-bill',{setValues, color});

});


app.post('/settings', function (req, res) {
 
    settings.updateCall(req.body.callCost)
    settings.updateSms(req.body.smsCost)
    settings.warning(req.body.warnLevel)
    settings.critical(req.body.critLevel)

  res.redirect('/')
  })

  app.post("/action", function(req,res){

      let type = req.body.billItemTypeWithSettings;
       settings.calculate(type);
       settings.total()

    res.redirect('/')
 
  })

app.get('actions/:type', function (req, res){
  let type = req.params.type;
if(type == 'call' || type == 'sms'){

  let filteredList= settings.filterRecords(type)

  res.render('actions', {bill:filteredList} )

}else{
  res.render('actions', {bill: settings.billList()} )

}
  //res.render('actions',{bill} )
  console.log(type)

})


let PORT = process.env.PORT || 4007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});