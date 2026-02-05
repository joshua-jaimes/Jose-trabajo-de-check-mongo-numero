import mongoose from "mongoose";

const lectura = new mongoose.Schema({
    userid:{type:ObjectId,ref:"Usuario"},
    fecha:{type:Date,default:Date.now},
    descripcion:{type:String,require:true}
});

export default mongoose.model("Lectura",lectura)