const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controlador para registrar un usuario
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear un nuevo usuario con la imagen como Buffer
        const user = new User({
            name,
            email,
            password: hashedPassword,
            profileImage: req.file.buffer  // Almacenar la imagen como Buffer
        });

        // Guardar el usuario en la base de datos
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controlador para obtener la imagen de perfil de un usuario
exports.getProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.profileImage) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        // Configurar el tipo de contenido como imagen
        res.set('Content-Type', 'image/jpeg');  // o 'image/png'
        res.send(user.profileImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
