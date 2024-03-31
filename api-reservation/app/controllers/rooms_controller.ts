import type { HttpContext } from '@adonisjs/core/http'
import Room from "#models/room";
import Sceance from '#models/sceance';
import Cinema from '#models/cinema';

export default class RoomsController {
    public async create({ request, response, params }: HttpContext)
    {
        const room = new Room();
        room.uid = request.input('uid');
        room.cinemaUid = params.cinemaUid;
        room.name = request.input('name');
        room.seats = request.input('seats');
        await room.save();

        return room;
    }

    public async readAll({request, response, params}: HttpContext)
    {
        try {
            const room = await Room.all();
            if(room){
                return room;
            } else {
                return response.status(204).json({message: 'No rooms found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async read({request, response, params}: HttpContext)
    {
        try {
            const room = await Room.query().where('uid', params.uid).preload('cinema');
            if(room){
                return room;
            } else {
                return response.status(404).json({message: 'Room not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async update({request, params}: HttpContext)
    {
        const room = await Room.findOrFail(params.uid);
        if (room) {
            room.name = request.input('name');
            room.seats = request.input('seats');

            if (await room.save()) {
            	return room;
        	}
        	return; // 422
        }
        return; // 401
    }

    public async destroy({request, response, params}: HttpContext)
    {
        await Sceance.query().where('room_uid', params.uid).delete()
        await Room.query().where('uid', params.uid).delete();
        return response.json({message:"Room deleted successfully"});
    }
}