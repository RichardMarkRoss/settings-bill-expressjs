const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const settingBill = require('./settings');
const settings = settingBill();
// let moment = require("moment");
const bodyParser = require('body-parser');

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
    let setValues = settings.returnValues();
    let color = settings.color();

    res.render('settings-bill', {
        setValues,
        color
    });
});

app.post('/settings', function (req, res) {
    settings.updateCall(req.body.callCost);
    settings.updateSms(req.body.smsCost);
    settings.warning(req.body.warnLevel);
    settings.critical(req.body.critLevel);

    res.redirect('/');
});

app.post('/action', function (req, res) {
    let type = req.body.billItemTypeWithSettings;
    settings.calculate(type);
    settings.total();

    res.redirect('/');
});

app.get('/actions', function (req, res) {
    res.render('actions', {
        bills: settings.billList

    });
});
app.get('/actions/:type', function (req, res) {
    const type = req.params.type;
    res.render('actions', {
        bills: settings.filterRecords(type)
    });
});

let PORT = process.env.PORT || 4007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
