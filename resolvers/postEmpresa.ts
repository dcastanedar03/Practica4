import { Request, Response } from "npm:express@4.18.2";
import { EmpresaModel } from "../db/tempresa.ts";
import { EmpresaModelType } from "../db/tempresa.ts";

export const postEmpresa = async(req: Request<EmpresaModelType>, res:Response<EmpresaModelType | {error: unknown}>) => {
    try{
        const{nombre} = req.body;
        if(!nombre){
            res.status(500).send({error:"se necesita nombre"});
        }
        const alreadyexist = await EmpresaModel.findOne({nombre: nombre})
        if(alreadyexist){
            res.status(500).send({error:"Empresa ya creada"})
        }
        const empresa = new EmpresaModel({nombre})
        await empresa.save();

        res.status(200).send(empresa)
    }catch(error){
        res.status(500).send(error)
    }
}