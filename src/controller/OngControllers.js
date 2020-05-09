const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    listaOngs: async (req, res) => {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)

    },

    insertOngs: (async (req, res) => {
        let { name, email, whatsapp, city, uf } = req.body
        //criptrofando
        const id = crypto.randomBytes(4).toString('HEX')
        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
        } catch (error) {
            console.log(error)
        }
        return await res.json({ id })
    }),

  


}