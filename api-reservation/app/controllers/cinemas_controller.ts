import Cinema from '#models/cinema';
import Room from '#models/room';
import Sceance from '#models/sceance';
import type { HttpContext } from '@adonisjs/core/http'

export default class CinemasController {
    public async create({ request, response }: HttpContext) {
        const cinema = new Cinema();
        cinema.uid = request.input('uid');
        cinema.title = request.input('title');
        await cinema.save();
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
        let test = {sessions: Array(), rooms: Array(), cine: new Cinema}
        await (await Room.query().where('cinema_uid', params.uid)).forEach(async (room) => {
            await Sceance.query().where('room_uid', room.uid).delete()
        })
        await Room.query().where('cinema_uid', params.uid).delete()
        const cinema = await Cinema.findOrFail(params.uid);
        cinema.delete()
        return response.json({message:"Deleted successfully"});
    }
}