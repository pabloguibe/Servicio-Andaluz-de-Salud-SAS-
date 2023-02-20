const express = require('express');
const router = express.Router();
const PersonaMayor = require('../models/PersonaMayor');

router.get('/', async (req, res) => {
    try {
        const arrayPersonaMayorDB = await PersonaMayor.find();
        console.log(arrayPersonaMayorDB);
        res.render("PersonaMayor", { 
            arrayPersonaMayor: arrayPersonaMayorDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const PersonaMayorDB = new PersonaMayor(body) 
        await PersonaMayorDB.save() 
        res.redirect('/PersonaMayor')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const PersonaMayorDB = await PersonaMayor.findOne({ _id: id }) 
							
        res.render('detalle', { 
            PersonaMayor: PersonaMayorDB,
            error: false
        })
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalle', { 
            error: true,
            mensaje: 'Persona Mayor no encontrada!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const PersonaMayorDB = await PersonaMayor.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(PersonaMayorDB)
        res.json({
            estado: true,
            mensaje: 'PersonaMayor editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar PersonaMayor'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
       
        const PersonaMayorDB = await PersonaMayor.findByIdAndDelete({ _id: id });
        console.log(PersonaMayorDB)
       
        if (!PersonaMayorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar PersonaMayor.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'PersonaMayor eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;