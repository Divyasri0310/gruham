import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  modalRef : BsModalRef

  registrationError = {
    error:false,
    errorMessage:''  
  }
  constructor(public userServiceObj:UsersService,public routerObj:Router, public modalService:BsModalService, public obj:FormBuilder ) { }

  userData;
  ngOnInit(): void {
    this.userServiceObj.getbhSubject().subscribe({
      next:(res)=>{
        this.userData=res
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  navigatetoprofileupdate(){
    this.routerObj.navigateByUrl('/userdetails/userprofile')
  }
  navigatetochangepassword(){
    this.routerObj.navigateByUrl('/userdetails/changepassword')
  }
  navigatetodeleteaccount(){
    this.routerObj.navigateByUrl('/userdetails/useraccountdelete')
  }
  navigatetocontactus(){
    this.routerObj.navigateByUrl('/contactus')
  }

  //modal

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.registrationError.error=false;
  }

  openpasswordModal(passwordTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(passwordTemplate);
    this.registrationError.error=false;
  }

  deleteaccountModal(deleteTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteTemplate);
    this.registrationError.error=false;
  }

  //user profile
  userPersonalData=this.obj.group({
    username:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    phoneNo:['',Validators.required]
  })

  get username(){
    return this.userPersonalData.get("username")
  }
  get password(){
    return this.userPersonalData.get("password")
  }
  get email(){
    return this.userPersonalData.get("email")
  }
  get phoneNo(){
    return this.userPersonalData.get("phoneNo")
  }


  check(){

    console.log(this.userPersonalData.value)
    this.userServiceObj.updateprofile(this.userPersonalData.value).subscribe({
      next:(res)=>{
        if(res.message=="user not existed.. signup"){
          // alert("user not existed.. signup")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not existed.. signup";
        }
        else if(res.message=="data is same"){
          // alert("data is same")
          this.registrationError.error=true;
          this.registrationError.errorMessage="data is same";
        }
        else if(res.message=="user details updated"){
          this.userServiceObj.logout()
          this.routerObj.navigateByUrl('/login')
          this.modalRef.hide();
          // alert("user details updated")
        }
        else if(res.message=="password not matched"){
          // alert("password not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password not matched";
        }
        else if(res.message=="email not matched"){
          // alert("email not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="email not matched";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

  //passowrd modal
  passwordChange=this.obj.group({
    username:['',Validators.required],
    oldpassword:['',Validators.required],
    newpassword:['',Validators.required],
    newpasswordmatch:['',Validators.required]
  })

  get userName(){
    return this.passwordChange.get("username")
  }
  get oldpassword(){
    return this.passwordChange.get("oldpassword")
  }
  get newpassword(){
    return this.passwordChange.get("newpassword")
  }
  get newpasswordmatch(){
    return this.passwordChange.get("newpasswordmatch")
  }

  change(){
    console.log(this.passwordChange.value)
    this.userServiceObj.changepassword(this.passwordChange.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found login to changepassword"){
          // alert("user not found login to changepassword")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not found login to changepassword";
        }
        else if(res.message=="user not existed.. signup to post"){
          // alert("user not existed.. signup to post")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not existed.. signup to post";
        }
        else if(res.message=="old and new passwords are same"){
          // alert("password is same")
          this.registrationError.error=true;
          this.registrationError.errorMessage="old and new passwords are same";
        }
        else if(res.message=="password updated"){
          this.routerObj.navigateByUrl('/home')
          this.modalRef.hide();
          // alert("password updated")
        }
        else if(res.message=="new password not matched"){
          // alert("new password not matched")
          this.registrationError.error=true;
          this.registrationError.errorMessage="new password not matched";
        }
        else if(res.message=="oldpassword is invalid"){
          // alert("oldpassword is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="oldpassword is invalid";
        }
        else{
          // alert("username is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="username is invalid";
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

  //user delete
  deleteuser=this.obj.group({
    password:['',Validators.required]
  })


  get delpassword(){
    return this.deleteuser.get("password")
  }

  delete(){
    console.log(this.deleteuser.value)
    this.userServiceObj.userdelete(this.deleteuser.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found"){
          // alert("user not found")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not found";
        }
        else if(res.message=="user already deleted"){
          // alert("user already deleted")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user already deleted";
        }
        else if(res.message=="user not existed.. signup"){
          // alert("user not existed.. signup")
          this.registrationError.error=true;
          this.registrationError.errorMessage="user not existed.. signup";
        }
        else if(res.message=="password is invalid"){
          // alert("password is invalid")
          this.registrationError.error=true;
          this.registrationError.errorMessage="password is invalid";
        }
        else if(res.message=="user deleted"){
          this.userServiceObj.logout()
          this.routerObj.navigateByUrl('/home')
          this.modalRef.hide();
          // alert("user deleted")
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  
}
