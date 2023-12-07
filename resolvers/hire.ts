import {Request, Response} from "npm:express@4.18.2";
import { EmpresaModel } from "../db/tempresa.ts";
import { TrabajadorModel } from "../db/ttrabajador.ts";

export const hire = async(req:Request<{id:string, workerId:string}>, res:Response<string | {error : unknown}>) => {
    try{
        const id = req.params.id;
        const workwerId = req.params.workwerId;
        const empresa = await EmpresaModel.findById(id).exec();
        if(!empresa){
            res.status(404).send("Empresa no encontrada");
            return;
        }
        const trabajador = await TrabajadorModel.findById(workwerId).exec();
        if(!trabajador){
            res.status(404).send("Trabajador no encontrado");
            return;
        }
        if(trabajador.empresa !== null){
            res.status(400).send("El trabajador ya trabaja aqui");
            return;
        }
        await EmpresaModel.findOneAndUpdate({_id:id}, {$push: {trabajadores: workwerId}}, {new: true}).exec();
        res.status(200).send("Trabajador contratado"); 
    }catch(error){
        res.status(500).send(error)
    }
}