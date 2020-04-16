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

const app = express();
const port = 3000;

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
  }

}));


app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: 'ccapdevsecretproject',
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
  next();
});


app.use('/', villaRouter);
app.use('/', employeeRouter);
app.use('/', guestRouter);
app.use('/', indexRouter);


app.listen(port, function() {
  console.log('App listening at port '  + port)
});
