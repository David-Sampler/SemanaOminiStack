const connection = require('../database/connection')

module.exports = {
    especificoOng: async(req,res)=>{
           const ong_id = req.headers.authorization; 
           const incidentes = await connection('incidents').where('ong_id',ong_id).select('*')
           return res.json(incidentes )
    }

}