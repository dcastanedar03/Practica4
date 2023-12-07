import { Request, Response } from "npm:express@4.18.2";
import { TrabajadorModel } from "../db/ttrabajador.ts";
import { TrabajadorModelType } from "../db/ttrabajador.ts";

export const postTrabajador= async(req: Request<TrabajadorModelType>, res:Response<TrabajadorModelType | {error: unknown}>) => {
    try{
        const{nombre, dni, email, telefono} = req.body;
        if(!nombre || !dni || !email || !telefono){
            res.status(500).send({error:"se necesita nombre, dni, email y telefono"});
        }
        const alreadyexist = await TrabajadorModel.findOne({dni: dni})
        if(alreadyexist){
            res.status(500).send({error:"Trabajador ya creado"})
        }
        const trabajador = new TrabajadorModel({nombre, dni, email, telefono})
        await trabajador.save();

        res.status(200).send(trabajador)
    }catch(error){
        res.status(500).send(error)
    }
}