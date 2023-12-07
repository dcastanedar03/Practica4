import { Request, Response } from "npm:express@4.18.2";
import { TareaModel } from "../db/ttarea.ts";
import { TareaModelType } from "../db/ttarea.ts";
export const getTareas = async (_req: Request, res: Response<TareaModelType[] | {error: unknown}>) => {
    try{
        const empresas = await TareaModel.find()
        res.status(200).send(empresas);
    }catch(error){
        res.status(500).send(error)
    }
}