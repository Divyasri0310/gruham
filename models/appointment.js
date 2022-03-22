const mongoose=require("mongoose")
const appointmentSchema=new mongoose.Schema({
  username:{type:String},
  ownername:{type:String},
  date:{type:String},
},{collection:"appointmentCollection"})

const appointmentModel=mongoose.model("slot",appointmentSchema)
module.exports=appointmentModel