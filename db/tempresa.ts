import mongoose from "npm:mongoose@7.6.3";
import { Empresa } from "../types.ts";
import { TrabajadorModel } from "./ttrabajador.ts";
import { TareaModel } from "./ttarea.ts";

const schema = mongoose.Schema;

const EmpresaSchema = new schema(
    {
        nombre: {type: String, required: true, unique: true}, 
        trabajadores: [{type: schema.Types.ObjectId, required:false, default: null, ref:"Trabajador"}] 
    },
    {timestamps: false}
);

EmpresaSchema
    .path("trabajadores")
    .validate(function (trabajadores:Array<mongoose.Schema.Types.ObjectId>) {
        if(trabajadores){
            if(trabajadores.length > 10){
                throw new Error('La empresa como maximo puede tener 10 trabajadores');
            }
        }
        return true;
    })

EmpresaSchema
    .post("findOneAndUpdate", async function (doc: EmpresaModelType) {
        const empresa = await EmpresaModel.findById(doc._id).exec(); 

        if (empresa && empresa.trabajadores && empresa.trabajadores.length < 10) {
            await TrabajadorModel.updateMany({_id:{$in: empresa.trabajadores}}, {$set:{empresa: empresa._id}});
            return;
        }

        throw new Error('La empresa como maximo puede tener 10 trabajadores');
});

EmpresaSchema
    .post("findOneAndDelete", async function (empresa:EmpresaModelType) {
        if(empresa && empresa.trabajadores){ 
            try {
                await TrabajadorModel.updateMany({_id:{$in: empresa.trabajadores}}, {$set:{empresa: null}, $pull:{tareas: {$exists: true}}});
                await TareaModel.deleteMany({ empresa: empresa._id });
            } catch (error) {
                console.error(error);
            }
        }
})

export type EmpresaModelType = mongoose.Document & Omit<Empresa,"id"|"trabajadores"> & {
    trabajadores: Array<mongoose.Schema.Types.ObjectId> | null;
}
export const EmpresaModel =  mongoose.model<EmpresaModelType>("Empresa", EmpresaSchema);