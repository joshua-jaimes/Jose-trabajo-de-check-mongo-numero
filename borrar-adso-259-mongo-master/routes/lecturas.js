import { Router } from "express";
import { getLecturas, getUsuarioEmail, postLecturas, deleteUsuario } from "../controllers/usuario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarEmail, validarExisteUsuario } from "../helpers/usuarios.js";

const router = new Router()



router.get( "/id", [
    check('usuario_id',"El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
    ], getLecturas)


router.delete( "/id", [
    check('usuario_id',"El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
] ,deleteUsuario)



router.post(   "/id"  , [
    check('usuario_id',"El campo usuario_id es obligatorio").not().isEmpty(),
    check('tipo',"El campo tipo es obligatorio").isIn(['lectura','escritura']),
    check('contenido',"El campo contenido es obligatorio").not().isEmpty(),
    check('fecha_lectura',"El campo fecha_lectura es obligatorio").not().isEmpty().isISO8601(),
    validarCampos
] ,postLecturas)


export default router