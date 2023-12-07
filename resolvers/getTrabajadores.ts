import { Request, Response } from "npm:express@4.18.2";
import { TrabajadorModel } from "../db/ttrabajador.ts";
import { TrabajadorModelType } from "../db/ttrabajador.ts";
export const getTrabajadores = async (_req: Request, res: Response<TrabajadorModelType[] | {error: unknown}>) => {
    try{
        const empresas = await TrabajadorModel.find()
        res.status(200).send(empresas);
    }catch(error){
        res.status(500).send(error)
    }
}