import { Request, Response} from "npm:express@4.18.2";
import { EmpresaModel } from "../db/tempresa.ts";
import { EmpresaModelType } from "../db/tempresa.ts";

export const deleteEmpresa = async(req: Request<{id: string}>, res: Response<EmpresaModelType | {error: unknown} >) => {
    try{
        const id = req.params.id;
        const tarea = await EmpresaModel.findByIdAndDelete(id);
        if(!tarea){
            res.status(500).send({error: "Empresa no encontrada"});
            return;
        }
        res.status(200).send("Empresa borrada");
    }catch(error){
        res.status(500).send(error);
    }
}