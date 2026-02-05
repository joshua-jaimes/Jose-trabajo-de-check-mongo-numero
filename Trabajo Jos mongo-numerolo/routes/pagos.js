import { Router } from "express";
import { getPagos, getPagosId, putPagosId, postPagosId, deletePagos } from "../controllers/pagos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarEmail, validarExisteUsuario } from "../helpers/usuarios.js";


const router = new Router()



router.get("/", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
], getPagos)


router.get("/id", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
], getPagosId)



router.delete("/", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
], deletePagos)





router.post("/", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    check('monto', "El campo monto es obligatorio").isIn(['lectura', 'escritura']),
    check('fecha_pago', "El campo fecha_pago es obligatorio").not().isEmpty(),
    check('fecha_vencimiento', "El campo fecha_vencimiento es obligatorio").not().isEmpty().isISO8601(),
    check('metodo', "El campo metodo es obligatorio").not().isEmpty(),
    validarCampos
], postPagosId)




router.put("/id", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
], putPagosId)





export default router