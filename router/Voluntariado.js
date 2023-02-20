const express = require('express');
const router = express.Router();
const Voluntariado = require('../models/Voluntariado');

router.get('/', async (req, res) => {
    try {
        const arrayVoluntariadoDB = await Voluntariado.find();
        console.log(arrayVoluntariadoDB);
        res.render("Voluntariado", { 
            arrayVoluntariado: arrayVoluntariadoDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearVoluntariado', (req, res) => {
    res.render('crearVoluntariado')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const VoluntariadoDB = new Voluntariado(body) 
        await VoluntariadoDB.save()
        res.redirect('/Voluntariado') 
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const VoluntariadoDB = await Voluntariado.findOne({ _id: id }) 
							
        res.render('detalleVoluntariado', { 
            Voluntariado: VoluntariadoDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalleVoluntariado', { 
            error: true,
            mensaje: 'Voluntariado no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const VoluntariadoDB = await Voluntariado.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(VoluntariadoDB)
        res.json({
            estado: true,
            mensaje: 'Voluntariado editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Voluntariado'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
       
        const VoluntariadoDB = await Voluntariado.findByIdAndDelete({ _id: id });
        console.log(VoluntariadoDB)
       
        if (!VoluntariadoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Voluntariado.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Voluntariado eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;