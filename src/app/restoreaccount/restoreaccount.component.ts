import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-restoreaccount',
  templateUrl: './restoreaccount.component.html',
  styleUrls: ['./restoreaccount.component.css']
})
export class RestoreaccountComponent implements OnInit {

  registrationError = {
    error:false,
    errorMessage:''  
  }
  constructor(public obj:FormBuilder,public serviceObj:UsersService,public router:Router) { }

  ngOnInit(): void {
  }

  userRestore=this.obj.group({
    usernameoremail:['',Validators.required],
    password:['',Validators.required]
  })

  get usernameoremail(){
    return this.userRestore.get("usernameoremail")
  }
  get password(){
    return this.userRestore.get("password")
  }

  restore(){
    console.log(this.userRestore.value)
    this.serviceObj.restoreUser(this.userRestore.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="user not found username or email is invalid"){
          // alert("user not found username or email is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not found username or email is invalid";
        }
        else if(res.message=="password is invalid"){
          // alert("password is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password is invalid";
        }
        else if(res.message=="user get back in and login success"){
          // alert("user get back in and login success")
          localStorage.setItem("token",res.token)
          this.serviceObj.getbhSubject().next(res.user)
          this.router.navigateByUrl("/home")
          // this.carddataObj.getcartBhSubject().next(res.user)
        }
        else if(res.message=="user can access account"){
          // alert("user can access their account")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user can access account";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }
}
