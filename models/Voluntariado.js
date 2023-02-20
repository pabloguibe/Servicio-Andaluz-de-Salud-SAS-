const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoluntariadoSchema = new Schema({
    nombre: String,
    apellido1: String,
    apellido2: String,
    telefono: String,
    dni: String,
    formacion: String,
    experiencia: String
});

//Crear modelo
const Voluntariado = mongoose.model('Voluntariado', VoluntariadoSchema, "Voluntariado");


module.exports = Voluntariado;