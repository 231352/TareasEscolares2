const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));


// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/periodos', require('./routes/periodos.routes'));
app.use('/api/materias', require('./routes/materias.routes'));
app.use('/api/horarios', require('./routes/horarios.routes'));
app.use('/api/tareas', require('./routes/tareas.routes'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
