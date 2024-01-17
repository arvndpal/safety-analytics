module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employees', {
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
