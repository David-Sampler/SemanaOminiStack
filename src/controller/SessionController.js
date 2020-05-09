const connection = require('../database/connection')

module.exports = {
    login:async(req,res)=>{
        const {id} = req.body
       
        const ong = await connection('ongs').where('id',id).select('name').first();

        if(!ong){
            return res.json("Ong não existe")
        }else{
            return res.json(ong)
        }

    }
}