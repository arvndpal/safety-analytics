const dbConfig = require('../config/db.config');
const tutorialModel = require('./tutorial.model');
const employeeModel = require('./employee.model');
const kpiModel = require('./kpi.model');
const chartModel = require('./charts.model');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = tutorialModel(sequelize, Sequelize);
db.employees = employeeModel(sequelize, Sequelize);
db.kpis = kpiModel(sequelize, Sequelize);
db.charts = chartModel(sequelize, Sequelize);

db.sequelize
  .sync()
  .then(() => {
    console.log('DB coonected');
  })
  .catch((err) => {
    console.log('Failed to connect db: ' + err.message);
  });

module.exports = db;
