const app = require('express');
const router = app.Router();

const { getKPIs, getChartData } = require('../controllers/common.controller');

router.get('/kpis', getKPIs);
router.get('/chart', getChartData);

module.exports = router;
