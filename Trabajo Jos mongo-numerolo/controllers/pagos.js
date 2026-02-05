import Pago from "../models/pagos.js"

const getPagos = async (req, res) => {
    try {
        const pagos = await Pago.find()
        res.json({ pagos })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const getPagosId = async (req, res) => {
    try {
        const { usuario_id } = req.query
        const pagos = await Pago.find({ usuario_id })
        res.json({ pagos })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const postPagosId = async (req, res) => {
    try {
        const { usuario_id, monto, fecha_pago, fecha_vencimiento, metodo } = req.body
        const pago = new Pago({
            usuario_id, monto, fecha_pago, fecha_vencimiento, metodo
        })
        await pago.save()
        res.json({ pago, msg: "Pago creado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const putPagosId = async (req, res) => {
    try {
        const { id } = req.params
        const { monto, fecha_pago, fecha_vencimiento, metodo } = req.body
        await Pago.findByIdAndUpdate(id, { monto, fecha_pago, fecha_vencimiento, metodo })
        res.json({ msg: "Pago modificado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}
const deletePagos = async (req, res) => {
    try {
        const { id } = req.params
        await Pago.findByIdAndDelete(id)
        res.json({ msg: "Pago eliminado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}
export { getPagos, postPagosId, putPagosId, deletePagos, getPagosId }


