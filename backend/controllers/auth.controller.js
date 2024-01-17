const db = require('../models');
const Employee = db.employees;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwerty_secret';
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!email || !password) {
    res.send({
      message: 'Email and password are required to login',
    });
    return;
  }

  try {
    const employee = await Employee.findOne({ where: { email: email } });

    if (employee === null) {
      res.send({
        message: `No user record found with email ${email}`,
      });
      return;
    }

    const { email: email_address, first_name, last_name, id } = employee;

    const matched = bcrypt.compareSync(password, employee.password);

    if (matched) {
      const token = jwt.sign({ _id: id, email }, JWT_SECRET);
      res.send({
        token,
        email: email_address,
        name: `${first_name} ${last_name}`,
        message: `Logged in success successfully.`,
      });
    } else {
      res.send({
        message: `Wrong password. Please try with a different password.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while login the user.',
    });
  }
};

exports.checklUserCreds = async (email, password) => {
  if (!email || !password) {
    return {
      message: 'Email and password are required to login',
    };
  }

  try {
    const employee = await Employee.findOne({ where: { email: email } });

    if (employee === null) {
      return {
        message: `No user record found with email ${email}`,
      };
    }

    const { email: email_address, first_name, last_name, id } = employee;

    const matched = bcrypt.compareSync(password, employee.password);

    if (matched) {
      const token = jwt.sign({ _id: id, email }, JWT_SECRET);
      return {
        token,
        email: email_address,
        name: `${first_name} ${last_name}`,
        id,
      };
    } else {
      return {
        message: `Wrong password. Please try with a different password.`,
      };
    }
  } catch (err) {
    return {
      message: err.message || 'Some error occurred while login the user.',
    };
  }
};
