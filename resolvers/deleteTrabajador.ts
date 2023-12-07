import { Request, Response} from "npm:express@4.18.2";
import { TrabajadorModel } from "../db/ttrabajador.ts";
import { TrabajadorModelType } from "../db/ttrabajador.ts";

export const deleteTrabajador = async(req: Request<{id: string}>, res: Response<TrabajadorModelType | {error: unknown} >) => {
    try{
        const id = req.params.id;
        const trabajador = await TrabajadorModel.findByIdAndDelete(id);
        if(!trabajador){
            res.status(500).send({error: "Trabajador no encontrado"});
            return;
        }
        res.status(200).send("Trabajador borrado");
    }catch(error){
        res.status(500).send(error);
    }
}