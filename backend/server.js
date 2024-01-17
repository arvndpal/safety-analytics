const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const passport = require('passport');
const session = require('express-session');

//Routes import
const tutorialsRoutes = require('./routes/tutorials.route');
const employeesRoutes = require('./routes/employees.route');
const authRoutes = require('./routes/auth.route');
const commmonRoutes = require('./routes/common.route');

//Initialize Passport
const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const printData = (req, res, next) => {
// console.log('req.body', req.body);
// console.log('req.seesion', req.session);
// console.log('req.user', req.user);
//   next();
// };
// app.use(printData);
//Routes
app.use('/api/tutorials', tutorialsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/common', commmonRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
