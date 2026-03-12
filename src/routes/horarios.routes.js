/*
Endpoints
http://localhost:3000/api/horarios             metodo: POS nuevo horario
http://localhost:3000/api/horarios/materia/id  metodo: GET consultar materias
http://localhost:3000/api/horarios/            metodo: GET consultar horarios
http://localhost:3000/api/horarios/id          metodo: PUT actualizar horarios
http://localhost:3000/api/horarios/id          metodo: DELETE borrar horario con id
*/

const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/horarios.controller');

//Crear un nuevo horario
router.post('/', verificarToken, controller.crearHorario);

//Consultar el horario de una mayeria en particular
router.get('/materia/:id_materia', verificarToken, controller.obtenerHorariosPorMateria);

//Listar los horarios por materias
router.get('/', verificarToken, controller.obtenerHorarioCompleto);

//Actualizar horarios
router.put('/:id', verificarToken, controller.actualizarHorario);

//Borrar horarios
router.delete('/:id', verificarToken, controller.eliminarHorario);

module.exports = router;
