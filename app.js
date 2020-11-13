'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/adminRoutes');
const shopRoutes = require('./routes/shopRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/users');

// create sample user and products
require('./util/samples').createSamples()


const app = express()
const store = new MongoDBStore({
    uri: 'mongodb://localhost/miniShop',
    collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialied: false,
    store: store
}))
app.use(csrfProtection)
app.use(flash())


app.use((req, res, next) => {   
    if (!req.session.user) {
        return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

// local variable passed in every views
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

// routing
app.use('/admin',adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

// routing if page not found
app.use((req,res) => {
	res.status(404).send('<h1>page not found...</h1>')
});

// conencting to mongodb and listning to port
mongoose.connect('mongodb://localhost/miniShop', {useNewUrlParser: true})
    .then(() => {
        console.log('mongo db connected...')
        app.listen(3000, ()=>{
            console.log('listing through port 3000...')
        });
    })
    .catch(err => {
        console.log(err)
    })
