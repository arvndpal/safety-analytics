module.exports = (sequelize, Sequelize) => {
  const CHARTS = sequelize.define('charts', {
    name: {
      type: Sequelize.STRING,
    },
    info: {
      type: Sequelize.JSON,
    },
  });

  return CHARTS;
};
