export type Empresa ={
    nombre: string;
    trabajadores: Array<Omit<Trabajador, "empresa" | "tareas">>;
    id: string;
}

export type Trabajador ={
    nombre: string;
    dni: string;
    email:string;
    telefono:string; 
    empresa: Array<Omit<Empresa, "trabajadores">>;
    tareas: Array<Omit<Tarea, "empresa" | "trabajador">>;
    id: string;
}

export type Tarea ={
    nombre: string;
    estado : Estado;
    trabajador: Omit<Trabajador, "tareas">;
    empresa: Array<Omit<Empresa, "trabajadores">>;
    id: string;
}

export enum Estado {
    ToDO = "ToDO", InProgress = "InProgress", InTest = "InTest", Closed = "Closed"
}
