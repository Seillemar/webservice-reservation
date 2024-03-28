import Cinema from '#models/cinema';
import type { HttpContext } from '@adonisjs/core/http'

export default class CinemasController {
    public async create({ request, response }: HttpContext) {
        const cinema = new Cinema();
        await cinema.fill({
            uid: request.input('uid'),
            title: request.input('title'),
        }).save();
        return cinema;
    }

    public async readAll({request, response, params}: HttpContext)
    {
        try {
            const cinema = await Cinema.all();
            if(cinema){
                return cinema;
            } else {
                return response.status(204).json({message: 'No cinemas found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async read({request, response, params}: HttpContext)
    {
        try {
            const cinema = await Cinema.find(params.name);
            if(cinema){
                return cinema;
            } else {
                return response.status(404).json({message: 'Cinema not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async update({request, params}: HttpContext)
    {
        const cinema = await Cinema.findOrFail(params.uid);
        if (cinema) {
            cinema.uid = request.input('uid');
            cinema.title = request.input('title');

            if (await cinema.save()) {
            	return cinema;
        	}
        	return; // 422
        }
        return; // 401
    }

    public async destroy({request, response, params}: HttpContext)
    {
        await Cinema.query().where('uid', params.uid).delete();
        return response.json({message:"Deleted successfully"});
    }
}