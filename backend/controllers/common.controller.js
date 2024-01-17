const { Sequelize } = require('sequelize');
const db = require('../models');
const Op = db.Sequelize.Op;
const KPI = db.kpis;
const CHARTS = db.charts;
exports.getKPIs = async (req, res) => {
  const { labels } = req.query;
  const ids = labels.split(',');

  try {
    const kpis = await KPI.findAll({
      where: { id: { [Op.in]: ids } },
    });

    res.send(kpis);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while getting Kpis.',
    });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const chartData = await CHARTS.findOne({ where: { name: req.query.name } });
    res.send(chartData);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while getting Kpis.',
    });
  }
};
