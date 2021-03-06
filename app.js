const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');
const connectDB = require('./models/connection');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routers/indexRouter');
const villaRouter = require('./routers/villaRouter');
const employeeRouter = require('./routers/employeeRouter');
const guestRouter = require('./routers/guestRouter');

//This is for the initial seeding of documents in MongoDB Atlas
//require('./models/seeder');

const { envPort, sessionKey } = require('./config');

const app = express();
const port = envPort||3000;

app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),

  helpers: {
    strong: function(text) {
      var x = `<strong>${text}</strong>`;
      return new handlebars.SafeString(x);
    },
    cap: function(text) { return text.toUpperCase(); },
    inc: function(value) { return parseInt(value) + 1;},
    comma: function(value) {
      return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); },
    isEqual: function(a, b, opts) {
      if (a == b) {
        return opts.fn(this); 
      } else { 
        return opts.inverse(this);
      } 
    },
    log: function(data) {
      console.log(data);
    }
  },
    

}));


app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: sessionKey,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  if(req.session.Account){
    res.locals.user = req.session.Account;
    if(req.session.isAdmin)
      res.locals.isAdmin = req.session.isAdmin;
    else if(!(req.session.isAdmin))
      res.locals.isGuest = true;
  }
  next();
});


app.use('/', villaRouter);
app.use('/', employeeRouter);
app.use('/', guestRouter);
app.use('/', indexRouter);


app.listen(port, function() {
  console.log('App listening at port '  + port)
});
