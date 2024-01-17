const app = require('express');
const tutorials = require('../controllers/tutorials.controller');
const router = app.Router();

router.post('/', tutorials.create);

module.exports = router;
