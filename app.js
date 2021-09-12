const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
var session = require('express-session');

app.set('view engine','ejs');

app.use(express.json());
 app.use(express.urlencoded( { extended : false } ) );

 app.use(cookieParser())

//4 -seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.use('/', require('./router'));

app.use('/typesOfDocuments', require('./routes/typeOfDocument'));
app.use('/employees', require('./routes/employee'));
app.use('/users', require('./routes/user'));
app.use('/roles', require('./routes/rol'));
app.use('/companies', require('./routes/company'));
app.use('/chartOfAccounts', require('./routes/chartOfAccounts'));

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});