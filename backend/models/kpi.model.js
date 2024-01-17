module.exports = (sequelize, Sequelize) => {
  const KPI = sequelize.define('kpis', {
    label: {
      type: Sequelize.STRING,
    },
    kpi: {
      type: Sequelize.STRING,
    },
    yoy: {
      type: Sequelize.STRING,
    },
    qoq: {
      type: Sequelize.STRING,
    },
    isYoyUp: {
      type: Sequelize.BOOLEAN,
    },
    isQoqUp: {
      type: Sequelize.BOOLEAN,
    },
  });

  return KPI;
};
