import Sceance from '#models/sceance';
import type { HttpContext } from '@adonisjs/core/http'

export default class SceancesController {
    public async create({ request, response, params }: HttpContext)
    {
        const sceance = new Sceance();
        sceance.uid = request.input('uid');
        sceance.roomUid = params.roomUid;
        sceance.movie = request.input('movie');
        sceance.date = request.input('date');
        await sceance.save();

        return sceance;
    }

    public async readAll({request, response, params}: HttpContext)
    {
        try {
            const sceance = await Sceance.all();
            if(sceance){
                return sceance;
            } else {
                return response.status(204).json({message: 'No sessions found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    // public async read({request, response, params}: HttpContext)
    // {
    //     try {
    //         const sceance = await Sceance.query().where('uid', params.uid).preload('room');
    //         if(sceance){
    //             return sceance;
    //         } else {
    //             return response.status(404).json({message: 'Session not found'});
    //         }
    //     } catch (error) {
    //     	return response.status(500).json({error: error});
    //     }
    // }

    public async update({request, params}: HttpContext)
    {
        const sceance = await Sceance.findOrFail(params.uid);
        if (sceance) {
            sceance.movie = request.input('movie');
            sceance.date = request.input('date');

            if (await sceance.save()) {
            	return sceance;
        	}
        	return; // 422
        }
        return; // 401
    }

    public async destroy({request, response, params}: HttpContext)
    {
        await Sceance.query().where('sceance_uid', params.uid).delete()
        await Sceance.query().where('uid', params.uid).delete();
        return response.json({message:"Session deleted successfully"});
    }
}