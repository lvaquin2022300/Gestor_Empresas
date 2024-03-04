import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { empresaReportGet } from "./empresas.controller.js";

const router = Router();

router.get("/", [validarJWT, validarCampos], empresaReportGet);

export default router;
