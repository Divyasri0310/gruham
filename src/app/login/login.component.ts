import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { CartdataService } from '../cartdata.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrationError = {
    error:false,
    errorMessage:''  
  }
  constructor(public obj:FormBuilder,public serviceObj:UsersService,public carddataObj:CartdataService,public routerObj:Router) { }

  ngOnInit(): void {
  }

  userLogin=this.obj.group({
    usernameoremail:['',Validators.required],
    password:['',Validators.required]
  })

  get usernameoremail(){
    return this.userLogin.get("usernameoremail")
  }
  get password(){
    return this.userLogin.get("password")
  }

  navigatetosignup(){
    this.routerObj.navigateByUrl('/signup')
  }
  navigatetoforgot(){
    this.routerObj.navigateByUrl('/forgotpassword')
  }
  navigatetorestore(){
    this.routerObj.navigateByUrl('/restore')
  }

  hide:boolean=true

  login(){
    console.log(this.userLogin.value)
    this.serviceObj.loginData(this.userLogin.value).subscribe({
      next:(res)=>{
        if(res.message=="username or email invalid signup to create new account"){
          // alert("username or email invalid signup to create new account")
          this.registrationError.error=true;
          this.registrationError.errorMessage="username or email invalid signup to create new account";
        }
        else if(res.message=="password is invalid"){
          // alert("password is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password is invalid";
        }
        else if(res.message=="login success"){
          this.routerObj.navigateByUrl('/home')
          // alert("login success")
          localStorage.setItem("token",res.token)
          this.serviceObj.getbhSubject().next(res.user)
          // this.carddataObj.getcartBhSubject().next(res.user)
        }
        else{
          // alert("username temporarily in deleted status")
          this.registrationError.error=true;
          this.registrationError.errorMessage="username temporarily in deleted status";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }


}
