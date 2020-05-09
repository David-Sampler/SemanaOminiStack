const rota = require('express')
const rotas = rota.Router()
const ongs = require('./controller/OngControllers')
const ProfileControlle = require('./controller/ProfileController')
const incidentes = require('./controller/incidentesControllers')
const SessionController = require('./controller/SessionController')

module.exports = (
    
    rotas.get('/ongs',ongs.listaOngs),
    rotas.post('/ongs', ongs.insertOngs),

    rotas.get('/login',SessionController.login),

    rotas.get('/incidentes',incidentes.listaIncidente),
    rotas.post('/incidentes',incidentes.insertIncidente),
    rotas.delete('/incidentes/:id',incidentes.deleteIncidentes),
    rotas.get('/profile',ProfileControlle.especificoOng)


)