import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartdataService {

  userObj:any;
  cartBhSubject=new BehaviorSubject(null)

  getcartBhSubject(){
    return this.cartBhSubject
  }
  constructor(public Obj:HttpClient,public userServiceObj:UsersService) { }

  //add to cart
  addtocart(data:any):Observable<any>{
    let cartdataobj={"userName":"","property":""};
    this.userServiceObj.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.userObj={"username":"nouser"}
        }
        else{
          cartdataobj.userName=res.username
          this.userObj=res
          let property=data
          cartdataobj.property=property
          // console.log(cartdataobj)
          // console.log(this.userObj)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.post(`http://localhost:4200/cart/${this.userObj.username}/addcart`,cartdataobj)
  }

  //get cart
  getcart():Observable<any>{
    let cartdataobj={"userName":"","property":""};
    this.userObj=this.userServiceObj.getUserLogin()
    return this.Obj.get(`http://localhost:4200/cart/${this.userObj.username}/getcart`)
  }

  //remove from cart
  removecart(index):Observable<any>{
    this.userObj=this.userServiceObj.getUserLogin()
    return this.Obj.delete(`http://localhost:4200/cart/${this.userObj.username}/${index}/deleteadd`)
  }
  
  appointmentPost(slotObj):Observable<any>{
    this.userObj=this.userServiceObj.getUserLogin()
    return this.Obj.post(`http://localhost:4200/appointment/${this.userObj.username}/slot`,slotObj)
  }

  appointmentAsOwner():Observable<any>{
    return this.Obj.get(`http://localhost:4200/appointment/appointmentslot`)
  }

  cancelslot(slotObj){
    return this.Obj.put(`http://localhost:4200/appointment/deleteslot`,slotObj)
  }
  
}

