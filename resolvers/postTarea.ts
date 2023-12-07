import { Request, Response } from "npm:express@4.18.2";
import { TareaModel } from "../db/ttarea.ts";
import { TareaModelType } from "../db/ttarea.ts";

export const postTarea= async(req: Request<TareaModelType>, res:Response<TareaModelType | {error: unknown}>) => {
    try{
        const{nombre, estado, empresa, trabajador} = req.body;
        if(!nombre || !estado || !empresa || !trabajador){
            res.status(500).send({error:"se necesita nombre, estado, empresa y trabajador"});
        }
        const tarea = new TareaModel({nombre, estado, empresa, trabajador})
        await tarea.save();

        res.status(200).send(tarea)
    }catch(error){
        res.status(500).send(error)
    }
}