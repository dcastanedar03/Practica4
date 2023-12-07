import { Request, Response} from "npm:express@4.18.2";
import { TareaModel } from "../db/ttarea.ts";

export const statusChange = async (req: Request<{ id: string }>, res: Response<string | { error: unknown }>) => {
    try {
        const id = req.params.id;
        const status = req.query.status;

        const tarea = await TareaModel.findById(id).exec();
        if (!tarea) {
            res.status(500).send({ error: "Tarea no encontrada" });
            return;
        }

        await TareaModel.findByIdAndUpdate(id, { estado: status }, { new: true }).exec();
        res.status(200).send("actualizado correctamente");

    } catch (error) {
        res.status(500).send(error);
    }
};