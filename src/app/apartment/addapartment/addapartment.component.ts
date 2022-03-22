import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/apartment.service';


@Component({
  selector: 'app-addapartment',
  templateUrl: './addapartment.component.html',
  styleUrls: ['./addapartment.component.css']
})
export class AddapartmentComponent implements OnInit {

  registrationError = {
    error:false,
    errorMessage:''  
  }
  constructor(public obj:FormBuilder,public apartmentSerObj:ApartmentService,public routerObj:Router) { }
  
  ngOnInit(): void {

  }

  

  addRegistration=this.obj.group({
    OwnerName:['',Validators.required],
    email:['',Validators.required],
    phoneNo:['',Validators.required],
    property:this.obj.group({
      city:['',Validators.required],
      Area:['',Validators.required],
      street:['',Validators.required],
      pincode:['',Validators.required],
      bhkType:['',Validators.required],
      rent:['',Validators.required]
    }),
    // file:[''],
    // fileSource:['']
  })

  images=[]
  fileName:string
  file:File
 
  imageUrl:string | ArrayBuffer="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
  //profile
  onFileSelect(x:File){
    //console.log(file)
    this.file = x;
    this.fileName=x.name
 
    //read file content  FileReader javascript constructor
    const reader = new FileReader
    reader.readAsDataURL(x)
 
    reader.onload=()=>{
      this.imageUrl = reader.result
    }
  }

  get OwnerName(){
    return this.addRegistration.get("OwnerName")
  }
  get email(){
    return this.addRegistration.get("email")
  }
  get phoneNo(){
    return this.addRegistration.get("phoneNo")
  }
  get property(){
    return this.addRegistration.get("property")
  }
  get city(){
    return this.property?.get("city")
  }
  get Area(){
    return this.property?.get("Area")
  }
  get street(){
    return this.property?.get("street")
  }
  get pincode(){
    return this.property?.get("pincode")
  }
  get bhkType(){
    return this.property?.get("bhkType")
  }
  get rent(){
    return this.property?.get("rent")
  }

  submit(){
        //add userObj and profile photo image and here we have formDataObj helps in sending multi media data
        let formData = new FormData()
 
        let userObj = this.addRegistration.value
     
       //add userObj to formData for append 2nd arg should be string or blob(binary large object)
        formData.append("userObj",JSON.stringify(userObj))
     
       //add image to formData
        formData.append("photo",this.file)
    console.log(this.addRegistration.value)
    this.apartmentSerObj.addpostData(formData).subscribe({
      next:(res)=>{
        if(res.message=="add posted"){
          this.routerObj.navigateByUrl('/apartment/myapartments')
          // alert("add posted")
        }
        else if(res.message=="same add is already posted"){
          // alert("same add is already posted")
          this.registrationError.error=true;
          this.registrationError.errorMessage="same add is already posted";
        }
        else if(res.message=="next add posted"){
          this.routerObj.navigateByUrl('/apartment/myapartments')
          // alert("next add posted")
        }
        else if(res.message=="user not existed.. signup to post"){
          // alert("user not existed.. signup to post")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not existed.. signup to post";
        }
        else if(res.message=="phoneno not matched"){
          // alert("phoneno not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="phoneno not matched";
        }
        else if(res.message=="email not matched"){
          // alert("email not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="email not matched";
        }
        else if(res.message=="ownername is not matched"){
          // alert("ownername is not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="ownername is not matched";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }
}
