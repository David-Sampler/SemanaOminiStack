const connection = require('../database/connection')
module.exports = {
    
    listaIncidente: async (req, res) => {
        //controle de paginação

        const { page = 1} = req.query
         //contando quantos tem e é retornado um array.
        const [count] = await connection('incidents').count();
        console.log(count)

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        //LOGICA DA PAGINAÇÃO
        . offset((page - 1) * 5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'])

        //retornando total no hearder
        res.header('X-Total-Count',count['count(*)'])

        return res.json({ incidents })
    },

    insertIncidente: async (req, res) => {

        let { title, description, value } = req.body
        let ong_id = req.headers.authorization;

        try {
            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            })
            return res.json({ id })
        } catch (error) {
            console.log(error)
        }

        return res.json({ msg: "Cadastrado com sucesso" })
    },

    deleteIncidentes: async (req, res) => {
        let { id } = req.params
        let ong_id = req.headers.authorization;
        console.log(ong_id)

        const incidente = await connection('incidents').where('id', id)
            .select('ong_id').first();
        
        if (incidente.ong_id != ong_id) {
            return res.status(401).json({ error: "Não encontrado" })
        }

        await connection('incidents').where('id', id).delete();
        return res.status(204).send()
    }


}