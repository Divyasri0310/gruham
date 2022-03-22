import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  registrationError = {
    error:false,
    errorMessage:''  
  }
  constructor(public obj:FormBuilder,public serviceObj:UsersService,public routerObj:Router) { }

  ngOnInit(): void {
  }

  forgetpassword=this.obj.group({
    email:['',Validators.required],
    phoneNo:['',Validators.required],
    newpassword:['',Validators.required],
    newpasswordmatch:['',Validators.required]
  })

  get email(){
    return this.forgetpassword.get("email")
  }
  get phoneNo(){
    return this.forgetpassword.get("phoneNo")
  }
  get newpassword(){
    return this.forgetpassword.get("newpassword")
  }
  get newpasswordmatch(){
    return this.forgetpassword.get("newpasswordmatch")
  }

  check(){
    console.log(this.forgetpassword.value)
    this.serviceObj.forgotpassword(this.forgetpassword.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found Enter correct email"){
          // alert("user not found Enter correct email")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not found Enter correct email";
        }
        else if(res.message=="password is same try to login with same password"){
          // alert("password is same try to login with same password")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password is same try to login with same password";
        }
        else if(res.message=="password updated"){
          this.routerObj.navigateByUrl('/login')
          // alert("password updated")
        }
        else if(res.message=="password not matched"){
          // alert("password not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password not matched";
        }
        else if(res.message=="data not matched Enter correct phone number"){
          // alert("data not matched Enter correct phone number")
          this.registrationError.error=true;
          this.registrationError.errorMessage="data not matched Enter correct phone number";
        }
        else if(res.message=="user temporarily in deleted status"){
          // alert("user temporarily in deleted status")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user temporarily in deleted status";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

}
