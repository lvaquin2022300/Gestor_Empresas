import { Router } from 'express';
import { check } from 'express-validator';
import { empresaPost, empresaGet, empresaPut, empresaFiltro } from './empresas.controller.js';
import { existenteEmpresa, existeEmpresaById } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';



const router = new Router();

router.get('/', [validarJWT, validarCampos], empresaGet);


router.post(
  '/',
  [
    check('nombreE').custom(existenteEmpresa),
    check('nivelImpacto', 'El nivel de impacto es obligatorio').not().isEmpty(),
    check('años', 'Los años de la empresa son obligatorios').not().isEmpty(),
    validarCampos,
  ],
  empresaPost
);

router.get('/:order', [validarJWT, validarCampos], empresaFiltro);

router.put(
  "/:id",
  [
    check("id", "El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos
  ], empresaPut);


export default router;
