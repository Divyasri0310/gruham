const exp=require("express")
const appointmentapp=exp.Router()
appointmentapp.use(exp.json())
const appointment=require("../models/appointment")
const verifyToken=require("../middlewears/verifyToken")
const expressAsyncHandler=require("express-async-handler")


appointmentapp.post("/:username/slot",expressAsyncHandler(async(req,res)=>{
  if(req.params.username=="nouser"){
    res.send({message:"user not existed.. login to access cart"})
  }
  else{
    if(req.body.ownername==req.params.username){
      res.send({message:"you can't add it"})
    }
    else{
      let dataFormClient=req.body
      dataFormClient.username=req.params.username
      let doc=await appointment.create(dataFormClient)
      await doc.save()
      res.send({message:"slot booked",payload:dataFormClient})
    }
  }
}))

appointmentapp.get("/appointmentslot",expressAsyncHandler(async(req,res)=>{
  if(req.params.username=="nouser"){
    res.send({message:"user not existed.. login to access cart"})
  }
  else{
    let result = await appointment.find().exec()
    res.send({message:"my booking slots",payload:result})
  }
}))

appointmentapp.get("/:ownername/bookedslot",expressAsyncHandler(async(req,res)=>{
  if(req.params.ownername=="nouser"){
    res.send({message:"user not existed.. login to access cart"})
  }
  else{
    let result = await appointment.find({ownername:"req.params.ownername"}).exec()
    if(result==null){
      res.send({message:"no bookedslot"})
    }
    else{
      res.send({message:"booked",payload:result})
    }
  }
}))

appointmentapp.put("/deleteslot",expressAsyncHandler(async(req,res)=>{
    let result = await appointment.findOneAndDelete({$and:[{username:req.body.username},{ownername:req.body.ownername},{date:req.body.date}]}).exec()
    res.send({message:"slot canceled"})
}))

module.exports=appointmentapp