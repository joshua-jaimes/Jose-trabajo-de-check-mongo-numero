import { Router } from "express";
import { getLecturas, getLecturasId, postLecturas, putLecturas, deleteLecturas } from "../controllers/lecturas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = new Router()

router.get("/id", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    validarCampos
], getLecturasId)


router.delete("/:id", [
    check('id', "El campo id es obligatorio").not().isEmpty(),
    validarCampos
], deleteLecturas)



router.post("/", [
    check('usuario_id', "El campo usuario_id es obligatorio").not().isEmpty(),
    check('tipo', "El campo tipo es obligatorio").isIn(['principal', 'diaria']),
    validarCampos
], postLecturas)

router.put("/:id", [
    check('id', "El campo id es obligatorio").not().isEmpty(),
    validarCampos
], putLecturas)


export default router
