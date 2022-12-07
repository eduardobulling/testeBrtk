import { Router } from "express";
import { CursoController } from "./controller/CursoController";

const routes = Router();

routes.post('/createCurso', new CursoController().createCurso);
routes.get('/listarCurso', new CursoController().listarCurso);

export default routes;