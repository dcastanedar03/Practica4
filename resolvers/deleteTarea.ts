import { Request, Response} from "npm:express@4.18.2";
import { TareaModel } from "../db/ttarea.ts";
import { TareaModelType } from "../db/ttarea.ts";

export const deleteTarea = async(req: Request<{id: string}>, res: Response<TareaModelType | {error: unknown} >) => {
    try{
        const id = req.params.id;
        const tarea = await TareaModel.findByIdAndDelete(id);
        if(!tarea){
            res.status(500).send({error: "Tarea no encontrada"});
            return;
        }
        res.status(200).send("Tarea borrada");
    }catch(error){
        res.status(500).send(error);
    }
}