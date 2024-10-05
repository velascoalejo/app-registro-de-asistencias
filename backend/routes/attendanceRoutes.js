const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Registrar asistencia
router.post('/register', attendanceController.registerAttendance);

// Obtener todas las asistencias
router.get('/', attendanceController.getAllAttendance);

module.exports = router;
