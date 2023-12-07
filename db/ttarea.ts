import mongoose from "npm:mongoose@7.6.3";
import { Tarea } from "../types.ts";
import { Estado } from "../types.ts";
import { TrabajadorModel } from "./ttrabajador.ts";
import { EmpresaModelType } from "./tempresa.ts";

const schema = mongoose.Schema;
const TareaSchema = new schema(
    {
        nombre:{type: String, required: true},
        estado:{type: String, required: true, enum: Object.values(Estado)}, 
        trabajador:{type: schema.Types.ObjectId, required: true, ref: "Trabajador"},
        empresa:{type: schema.Types.ObjectId, required: true, ref: "Empresa"},
    },
    {timestamps: false}
);

TareaSchema
    .path("estado")
    .validate(function(estado: Estado){
        if(estado === Estado.Closed){
            throw new Error('No puedes crear una tarea en estado closed');
        }
        return Object.values(Estado).includes(estado);
    })

TareaSchema
    .path("empresa")
    .validate(async function (empresa: EmpresaModelType) {
        const trabajador = await TrabajadorModel.findById(this.trabajador);
        if(trabajador){
            if(trabajador.empresa){
                if(empresa.id.toString() == trabajador.empresa.toString()){
                    return true;
                }else{
                    throw new Error("El trabajador no concuerda con la empresa")
                }
            }
        }
    })

TareaSchema
    .post("save", async function (tarea:TareaModelType) {
        await TrabajadorModel.findByIdAndUpdate(tarea.trabajador, {$push: {tareas: tarea._id}});
    })

TareaSchema 
    .post("findOneAndDelete", async function (tarea:TareaModelType) {
        await TrabajadorModel.updateMany({tareas: tarea._id}, {$pull: {tareas: tarea._id}});
    })

export type TareaModelType = mongoose.Document & Omit<Tarea,"id"|"empresa"|"trabajador"> & {
    empresa: mongoose.Schema.Types.ObjectId;
    trabajador: mongoose.Schema.Types.ObjectId;
}
export const TareaModel =  mongoose.model<TareaModelType>("Tarea", TareaSchema);