const app = require('express');
const router = app.Router();

const {
  create,
  findAll,
  findOne,
  update,
  deleteEmployee,
} = require('../controllers/employees.controller');
const { checkLoggedIn } = require('../middlewares');

router.post('/', create);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteEmployee);
router.get('/', checkLoggedIn, findAll);
// router.get('/', findAll);

module.exports = router;
