const db = require('../models');
const Employee = db.employees;
const bcrypt = require('bcryptjs');
exports.create = async (req, res) => {
  const {
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    companyName = '',
  } = req.body;
  if (!email) {
    res.status(400).send({
      message: 'Email address is cannot be empty.',
    });
    return;
  }

  const employee = await Employee.findOne({ where: { email } });
  if (employee) {
    res.status(400).send({
      message: `Employee already exists with email ${email}`,
    });
    return;
  }
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);

  const employeeObj = {
    first_name: firstName,
    last_name: lastName,
    company: companyName,
    email: email,
    password: hashPassword,
  };

  try {
    const employee = await Employee.create(employeeObj);
    employee.password = undefined;
    res.send(employee);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while creating the Employee Record.',
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'company',
        'email',
        'createdAt',
        'updatedAt',
      ],
    });
    res.send(employees);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving employees.',
    });
  }
};
exports.getUserById = async (id) => {
  const user = await Employee.findOne({ where: { id: id } });

  return JSON.parse(JSON.stringify(user));
};
exports.findOne = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({
      message: 'id is required to retrieve employee details',
    });
    return;
  }

  try {
    const employees = await Employee.findOne({ where: { id: id } });

    if (!employees) {
      res.status(400).send({
        message: 'No employyed employees were found with id ' + id,
      });
      return;
    }
    res.send(employees);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving employee.',
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: 'id is required to update employee details',
    });
    return;
  }

  const {
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    companyName = '',
  } = req.body;

  if (!email) {
    res.status(400).send({
      message: 'Email address is cannot be empty.',
    });
    return;
  }

  try {
    const employee = await Employee.findOne({ where: { id: id } });
    if (employee === null) {
      res.send({
        message: `No Employee record found to update with id ${id}`,
      });
      return;
    }
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    const employeeObj = {
      first_name: firstName,
      last_name: lastName,
      company: companyName,
      email: email,
      password: password ? hashPassword : employee.password,
    };
    const result = await Employee.update(employeeObj, {
      where: { id: id },
    });
    if (result[0] === 1) {
      res.send({ message: `Employee with ${id} updated successfully.` });
    } else {
      res.send({ message: `No Employee found with ${id} to updated.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while updating the Employee Record.',
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: 'id is required to update employee details',
    });
    return;
  }

  try {
    const employee = await Employee.findOne({ where: { id: id } });
    if (employee === null) {
      res.send({
        message: `No Employee record found to delete with id ${id}`,
      });
    }

    const record = await Employee.destroy({
      where: { id: id },
    });

    if (record == 1) {
      res.send({
        message: `Employyee with ${id}  deleted successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while Delete the Employee Record.',
    });
  }
};
