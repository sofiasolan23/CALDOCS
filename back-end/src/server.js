const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { rateLimiter } = require('./middleware/authMiddleware');
require('dotenv').config();

//RUTAS DE LOS CRUDS
const areaRoutes = require('./routes/areaRoutes.js');
const formatoRoutes = require('./routes/formatoRoutes.js')
const unidadRoutes = require('./routes/unidadRoutes.js')
const  responsableRoutes = require('./routes/responsableRoutes.js');
const procedimientoRoutes = require('./routes/procedimientoRoutes.js');
const procesoRoutes = require('./routes/Routesproceso.js');

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');

// Aplicar rate limiting a todas las rutas
app.use(rateLimiter);



app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.use('/api/area', areaRoutes);
app.use('/api/formato', formatoRoutes);
app.use('/api/unidad', unidadRoutes);
app.use('/api/responsable', responsableRoutes);
app.use('/api/procedimiento', procedimientoRoutes);
app.use('/api/proceso', procesoRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'Public/uploads')));


// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));