import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public Obj:HttpClient) { }

  userBhSubject=new BehaviorSubject(null)

  getbhSubject(){
    return this.userBhSubject
  }
  
  
  loginObj:any;
  //signup
  postData(userObj:any):Observable<any>{
    return this.Obj.post("http://localhost:4200/user/createuser",userObj)
  }

  //login
  loginData(userObj:any):Observable<any>{
    return this.Obj.post("http://localhost:4200/user/userLogin",userObj)
  }
  //logout
  logout(){
    localStorage.removeItem("token")
    this.getbhSubject().next(null)
  }

  //get userlogin details function
  getUserLogin=()=>{
    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          return this.loginObj={"username":"nouser"}
        }
        else{
          return this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.loginObj
  }


  //forgot password
  forgotpassword(userObj:any):Observable<any>{
    return this.Obj.put("http://localhost:4200/user/forgotpassword",userObj)
  }

  //change password
  changepassword(userObj:any):Observable<any>{
    this.loginObj=this.getUserLogin()
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/changepassword`,userObj)
  }

  //profile update
  updateprofile(userObj:any):Observable<any>{
    this.loginObj=this.getUserLogin()
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/updateuserdetails`,userObj)
  }

  //user delete
  userdelete(userObj:any):Observable<any>{
    this.loginObj=this.getUserLogin()
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/deleteuser`,userObj)
  }

  // restore user
  restoreUser(userObj:any):Observable<any>{
    return this.Obj.put("http://localhost:4200/user/restoreuser",userObj)
  }

}
