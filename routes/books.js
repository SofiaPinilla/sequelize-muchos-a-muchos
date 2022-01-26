const express = require('express');
const BookController = require('../controllers/BookController');
const router = express.Router();

router.post('/',BookController.insert)
router.post('/many',BookController.insertMany)
router.delete('/:id',BookController.delete)
router.put('/:id',BookController.update)

module.exports = router;