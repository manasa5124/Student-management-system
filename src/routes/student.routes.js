const express = require('express');
const controller = require('../controllers/student.controller');
const validate = require('../middlewares/validation.middleware');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Protect all student routes
router.get('/', protect, controller.getAll);
router.get('/:id', protect, controller.getById);
router.post('/', protect, validate, controller.create);
router.put('/:id', protect, validate, controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;
