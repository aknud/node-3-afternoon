const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//middleware
const checkForSession = require('./middlewares/checkForSession');

//controllers
const swagctrl = require('./controllers/swagController');
const authctrl = require('./controllers/authController');
const cartctrl = require('./controllers/cartController');
const searchctrl = require('./controllers/searchController');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);

app.use(express.static(`${__dirname}/../../build`));

//swag
app.get('/api/swag', swagctrl.read);

//auth
app.get('/api/user', authctrl.getUser);
app.post('/api/signout', authctrl.signout);
app.post('/api/register', authctrl.register);
app.post('/api/login', authctrl.login);

//cart
app.post('/api/cart', cartctrl.add);
app.post('/api/cart/checkout', cartctrl.checkout);
app.delete('/api/cart', cartctrl.delete);

//search
app.get('/api/search', searchctrl.search);

const port = process.env.PORT || 3020;
console.log('port: ' + process.env.PORT)
app.listen(3000, () => console.log(`Lending an ear on ${port}`));
