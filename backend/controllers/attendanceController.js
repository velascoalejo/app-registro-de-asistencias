const Attendance = require('../models/Attendance');

// Registrar asistencia de un usuario
exports.registerAttendance = async (req, res) => {
    const { userId, isVerifiedByFacialRecognition } = req.body;
    
    try {
        const attendance = new Attendance({
            user: userId,
            isVerifiedByFacialRecognition
        });
        
        await attendance.save();
        res.status(201).json({ message: 'Asistencia registrada exitosamente', attendance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener la asistencia de todos los usuarios
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('user', 'name email');
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
