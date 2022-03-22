import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(public userserviceObj:UsersService,public httpserviceObj:HttpClient) { }
//get all data apartments from api
  getDataFromapi():Observable<any>{
    return this.httpserviceObj.get("http://localhost:4200/add/getadds")
  }

  loginObj;
   //add post
   addpostData(userObj:any):Observable<any>{

    this.loginObj=this.userserviceObj.getUserLogin()
    return this.httpserviceObj.post(`http://localhost:4200/add/${this.loginObj.username}/postadd`,userObj)
  }

  

  //get our posts(apartments) by username
  mypostadds():Observable<any>{
    this.loginObj=this.userserviceObj.getUserLogin()
    return this.httpserviceObj.get(`http://localhost:4200/add/${this.loginObj.username}/myadds`)
  }

   //delete add
   deleteadd(id:any):Observable<any>{
    this.loginObj=this.userserviceObj.getUserLogin()
    return this.httpserviceObj.delete(`http://localhost:4200/add/${this.loginObj.username}/${id}/deleteadd`)
  }


  idBhSubject=new BehaviorSubject(null)
  getid(){
    return this.idBhSubject
  }
//update rent
 updateid;
  updateadd(userObj:any):Observable<any>{
    this.idBhSubject.subscribe({
      next:(id)=>{
        this.updateid=id
      }
    })
    this.loginObj=this.userserviceObj.getUserLogin()
    return this.httpserviceObj.put(`http://localhost:4200/add/${this.loginObj.username}/${this.updateid}/updateadd`,userObj)
  }
  
}
