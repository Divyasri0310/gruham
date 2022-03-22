const exp=require("express")
const dataapp=exp.Router()
dataapp.use(exp.json())
const Data=require("../models/Data")
const User=require("../models/User")
const expressAsyncHandler=require("express-async-handler")
dataapp.get("/getadds",expressAsyncHandler(async(req,res)=>{
  let data=await Data.find().exec()
  res.send({message:"adds data",payload:data})
}))

//cloudinary
var cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')
 
//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
 
//configure cloudinary storage multer
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
      return{
          //with this folder name new folder name is created in media storage
          folder:"buildingPic",
          public_id:file.filename+'-'+Date.now()
      }
  }  
})
//configure multer ,multer is a middle ware  (we are informing multer to store the data in given path/storage)
const upload = multer({storage:cloudinaryStorage})


//post apartments
dataapp.post("/:username/postadd",upload.single('photo'),expressAsyncHandler(async(req,res)=>{

  //img url returned from cloudinary
  let imgCdn = req.file.path;

  //get userObj from client
  let userObjFromClient = JSON.parse(req.body.userObj)


  let data=await User.findOne({username:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not existed.. signup to post"})
  }
  else if(data.username=="nouser"){
    res.send({message:"user not existed.. signup to post"})
  }
  else if(data.username==userObjFromClient.OwnerName){
    if(data.email==userObjFromClient.email){
      if(data.phoneNo==userObjFromClient.phoneNo){
        let existedpost=await Data.findOne({OwnerName:req.params.username}).exec()
        if(existedpost==null){
          userObjFromClient.property.buildingPic=imgCdn
          apartmentObj=new Data({...userObjFromClient})
          // apartmentObj.property.push(userObjFormClient.property)
          await apartmentObj.save()
          res.send({message:"add posted"})
        }
        else{
          let duplicate = []
          for(let x of existedpost.property){
            if(JSON.stringify(x)===JSON.stringify(userObjFromClient.property)){
              duplicate.push(x)
            }
          }
          if(duplicate.length>0){
             res.send({message:"same add is already posted"})
          }
          else{
            userObjFromClient.property.buildingPic=imgCdn
            existedpost.property.push(userObjFromClient.property)
            await Data.updateOne({OwnerName:req.params.username},{$set:{property:existedpost.property}})
            res.send({message:"next add posted"})
          }
      }
      }
      else{
        res.send({message:"phoneno not matched"})
      }
    }
    else{
      res.send({message:"email not matched"})
    }
}
else{
  res.send({message:"ownername is not matched"})
}
}))
dataapp.get("/:username/myadds",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
  if(data==null){
    res.send({message:"user not yet posted"})
  }
  else{
    if(data.property.length==0){
      res.send({message:"currently no adds existed"})
    }
    else{
      res.send({message:"user's adds",payload:data})
    }
  }
}))
dataapp.put("/:username/:id/updateadd",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
  if(data==null){
    res.send({message:"no add exists"})
  }
  else{
    let newdata=req.body
    data.property.splice(req.params.id,1,newdata)
    await Data.findOneAndUpdate({OwnerName:req.params.username},{$set:{property:data.property}}).exec()
    res.send({message:"add updated"})
  }
}))
dataapp.delete("/:username/:id/deleteadd",expressAsyncHandler(async(req,res)=>{
  let data=await Data.findOne({OwnerName:req.params.username}).exec()
    data.property.splice(req.params.id,1)
    await Data.findOneAndUpdate({OwnerName:req.params.username},{$set:{property:data.property}}).exec()
    res.send({message:"add deleted"})
}))
dataapp.use((req,res,next)=>{
  res.send({message:"path not found",payload:`${req.url} not found`})
})
dataapp.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message})
})
module.exports=dataapp