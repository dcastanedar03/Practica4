import { Request, Response } from "npm:express@4.18.2";
import { EmpresaModel } from "../db/tempresa.ts";
import { EmpresaModelType } from "../db/tempresa.ts";

export const getEmpresas = async (_req: Request, res: Response<EmpresaModelType[] | {error: unknown}>) => {
    try{
        const empresas = await EmpresaModel.find()
        res.status(200).send(empresas);
    }catch(error){
        res.status(500).send(error)
    }
}