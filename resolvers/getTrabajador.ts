import {Request, Response} from "npm:express@4.18.2";
import { TrabajadorModel } from "../db/ttrabajador.ts";
import { TrabajadorModelType } from "../db/ttrabajador.ts";

export const getTrabajador = async(req:Request<{id:string}>, res:Response<TrabajadorModelType | {error : unknown}>) => {
    try{
        const id = req.params.id;
        const trabajador = await TrabajadorModel.findById(id).exec(); 
        if(!trabajador){
            res.status(500).send({error: "Trabajador no encontrado"});
            return;
        }
        res.status(200).send(trabajador); 
    }catch(error){
        res.status(404).send(error);
    }
}