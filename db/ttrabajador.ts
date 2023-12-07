import mongoose from "npm:mongoose@7.6.3";
import { Trabajador } from "../types.ts";
import { TareaModel } from "./ttarea.ts";
import { EmpresaModel } from "./tempresa.ts";

const schema = mongoose.Schema;
const TrabajadorSchema = new schema(
    {
        nombre:{type: String, required:true},
        email:{type: String, required: true, unique: true},
        dni:{type: String, required: true, unique: true},
        telefono:{type: String, required: true, unique: true},
        empresa:{type: schema.Types.ObjectId, required: false, default: null, ref: "Empresa"},
        tareas:[{type: schema.Types.ObjectId, required: false, default: null, ref: "Tarea"}] 
    },
    {timestamps: false}
);

TrabajadorSchema
    .path("dni")
    .validate(function(dni: string) {
        return /^[0-9]{8}[A-Z]$/.test(dni); 
    })

TrabajadorSchema
    .path("email")
    .validate(function(email: string) {
        return /^[a-z]{1,64}@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/.test(email); 
    })

TrabajadorSchema
    .path("telefono")
    .validate(function(telefono: string) {
        return /^[0-9]{9}$/.test(telefono); 
    })

TrabajadorSchema
    .path("tareas")
    .validate(function (tareas:Array<mongoose.Schema.Types.ObjectId>) {
        if(tareas){
            if(tareas.length > 10){
                throw new Error('no puede tener mas de 10 tareas');
            }
        }
        return true;
})

TrabajadorSchema
    .post("findOneAndDelete", async function (trabajador:TrabajadorModelType) {
        await TareaModel.deleteMany({trabajador: trabajador._id});
    })

TrabajadorSchema
    .post("findOneAndUpdate", async function (trabajador: TrabajadorModelType) { 
        const trabajadorAhora = await TrabajadorModel.findById(trabajador._id)
        if(trabajadorAhora){
            if(!trabajadorAhora.empresa){
                await EmpresaModel.findOneAndUpdate({id: trabajadorAhora.empresa},
                                                    {$pull: {trabajadoresID: trabajadorAhora._id}},
                                                    {new: true})
            }
            await TareaModel.deleteMany({trabajadorID: trabajadorAhora._id})
        }
    });

export type TrabajadorModelType = mongoose.Document & Omit<Trabajador,"id"|"hipotecas"|"gestor"> & {
    gestor: mongoose.Types.ObjectId;
    hipotecas: Array<mongoose.Schema.Types.ObjectId>;
};
export const TrabajadorModel =  mongoose.model<TrabajadorModelType>("Trabajador", TrabajadorSchema);
