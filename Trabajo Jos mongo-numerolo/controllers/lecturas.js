
// controllers/lecturas.js
import Lectura from "../models/lecturas.js"
import Usuario from "../models/usuario.js"
import Pago from "../models/pagos.js"
import { generarLecturaGemini } from "../helpers/lecturas.js"
const getLecturas = async (req, res) => {
    try {
        const lecturas = await Lectura.find()
        res.json({ lecturas })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const getLecturasId = async (req, res) => {
    try {
        const { usuario_id } = req.query
        const lecturas = await Lectura.find({ usuario_id })
        res.json({ lecturas })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const postLecturas = async (req, res) => {
    try {
        const { usuario_id, tipo } = req.body
        // Verificar que el usuario existe
        const usuario = await Usuario.findById(usuario_id)
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        }
        // Validaciones según el tipo de lectura
        if (tipo === 'principal') {
            // Regla: Lectura Principal para todos (activos/inactivos) pero SOLO UNA VEZ
            const lecturaExistente = await Lectura.findOne({ usuario_id, tipo: 'principal' })
            if (lecturaExistente) {
                return res.status(400).json({
                    msg: "Ya has generado tu lectura principal. Esta lectura es única de por vida."
                })
            }
        }
        else if (tipo === 'diaria') {
            // Regla: Lectura Diaria SOLO si tiene pago/membresía activa
            const pagoActivo = await Pago.findOne({
                usuario_id,
                fecha_vencimiento: { $gte: new Date() }
            })

            // También verificamos si el usuario tiene estado activo
            if (!pagoActivo && usuario.estado !== 1) {
                return res.status(403).json({
                    msg: "Necesitas una membresía activa para acceder a lecturas diarias"
                })
            }
        }
        // Generar el contenido con Gemini
        const contenido = await generarLecturaGemini(usuario.fechanacimiento, tipo)
        // Crear y guardar la lectura
        const lectura = new Lectura({
            usuario_id,
            tipo,
            contenido
        })
        await lectura.save()
        res.json({ lectura, msg: "Lectura creada correctamente" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const putLecturas = async (req, res) => {
    try {
        const { id } = req.params
        const { tipo, contenido } = req.body
        await Lectura.findByIdAndUpdate(id, { tipo, contenido })
        res.json({ msg: "Lectura modificada correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const deleteLecturas = async (req, res) => {
    try {
        const { id } = req.params
        await Lectura.findByIdAndDelete(id)
        res.json({ msg: "Lectura eliminada correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}
export { getLecturas, postLecturas, putLecturas, deleteLecturas, getLecturasId }