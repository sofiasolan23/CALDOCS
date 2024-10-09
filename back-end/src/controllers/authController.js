const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database.js')

exports.register = async (req, res) => {
  const { username, email, password} = req.body;
  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el nuevo usuario usando Sequelize
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      reset_Token: null, // Valor por defecto
      reset_token_expiry: null // Valor por defecto
    });
    console.log("Usuario creado exitosamente con los datos ===", newUser);
    

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
};


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes cambiar esto al servicio que prefieras
  auth: {
    user: process.env.EMAIL_USER, // Asegúrate de tener esto configurado en tu .env
    pass: process.env.EMAIL_PASS, // Configura esto en tu .env
  },
});


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Usa Sequelize para buscar al usuario
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username},message:"Bienvenido al Sistema de Formatos De Sena Empresa" });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};



const User = require('../models/userModel.js')

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Busca al usuario por correo usando Sequelize
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token de restablecimiento (válido por 1 hora)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configurar el envío de correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Restablecer tu contraseña',
      html: `
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${user.id}?token=${token}" text-decoration:none;">Restablecer contraseña sin compromiso</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo' });
      }

      console.log('Correo enviado:', info.response);
      res.json({ message: 'Correo de restablecimiento enviado. Por favor revisa tu correo.', token });
    });
  } catch (error) {
    console.error('Error en forgot password:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};


exports.resetPassword = async (req, res) => {
  const { userId } = req.params; // Asegúrate de que estás pasando este parámetro en la ruta
  const { password, token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token es necesario' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userIdInt = parseInt(userId); // Asegúrate de que userId es un número

    console.log('hashedPassword:', hashedPassword); // Para depuración
    console.log('userId:', userIdInt); // Para depuración


    console.log('Query:', 'UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userIdInt]);


    const result = await User.update(
      { password: hashedPassword },
      { where: { id: userIdInt } }
    );
    

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};
