const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

// Configurar Multer para almacenar la imagen en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para registrar al usuario con la imagen
router.post('/register', upload.single('profileImage'), userController.registerUser);

// Ruta para obtener la imagen de perfil de un usuario
router.get('/:id/profile-image', userController.getProfileImage);

module.exports = router;
