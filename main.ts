import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import { getTrabajador } from "./resolvers/getTrabajador.ts";
import { getTrabajadores } from "./resolvers/getTrabajadores.ts";
import { getEmpresa } from "./resolvers/getEmpresa.ts";
import { getEmpresas } from "./resolvers/getEmpresas.ts";
import { getTarea } from "./resolvers/getTarea.ts";
import { getTareas } from "./resolvers/getTareas.ts";
import { deleteTrabajador } from "./resolvers/deleteTrabajador.ts";
import { deleteEmpresa } from "./resolvers/deleteEmpresa.ts";
import { deleteTarea } from "./resolvers/deleteTarea.ts";
import { postTrabajador } from "./resolvers/postTrabajador.ts";
import { postEmpresa } from "./resolvers/postEmpresa.ts";
import { postTarea } from "./resolvers/postTarea.ts";
import { hire } from "./resolvers/hire.ts";
import { fire } from "./resolvers/fire.ts";
import { statusChange } from "./resolvers/statusChange.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/worker/:id", getTrabajador)
  .get("/business/:id", getEmpresa)
  .get("/task/:id", getTarea)
  .delete("/worker/:id", deleteTrabajador)
  .delete("/business/:id", deleteEmpresa)
  .delete("/task/:id", deleteTarea)
  .get("/worker", getTrabajadores)
  .get("/business/", getEmpresas)
  .get("/task", getTareas)
  .post("/worker", postTrabajador)
  .post("/business", postEmpresa)
  .post("/task", postTarea)
  .put("/business/:id/fire/:workwerId", fire)
  .put("/business/:id/hire/:workwerId", hire)
  .put("/task/:id", statusChange)

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})