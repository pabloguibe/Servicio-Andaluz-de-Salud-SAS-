const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaMayorSchema = new Schema({
    nombre: String,
    apellido1: String,
    apellido2: String,
    telefono: String,
    dni: String,
    patologias: String,
    fechavisita: String,
    lugar: String,
    observacion: String
});

//Crear modelo
const PersonaMayor = mongoose.model('PersonaMayor', PersonaMayorSchema, "PersonaMayor");


module.exports = PersonaMayor;