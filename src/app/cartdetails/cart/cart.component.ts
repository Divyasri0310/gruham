import { Component, OnInit,TemplateRef } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'
import { CartdataService } from 'src/app/cartdata.service';
import { UsersService } from 'src/app/users.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  mycart=[];
  faHearticon=faHeart
  constructor(public cartObj:CartdataService, public routerobj:Router, public modalService:BsModalService,public userServiceObj:UsersService) { }

  refreshdata=()=>{
    this.cartObj.getcart().subscribe({
      next:(res)=>{
      return this.mycart=res.payload?.property
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.mycart
  }
  ngOnInit(): void {
    this.refreshdata()
  }

  //delete from cart
  delete(index:any){
    this.cartObj.removecart(index).subscribe({
      next:(res)=>{
        if(res.message=="add not found"){
        }
        else if(res.message=="add removed from cart"){
          this.refreshdata()
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  
  modalRef: BsModalRef;

  bookingObj={
    "ownername":"null",
    "date":"null"
  }
  openModal(template: TemplateRef<any>,v) {
    this.modalRef = this.modalService.show(template);
    // console.log(v.OwnerName)
    this.bookingObj.ownername=v.OwnerName
  }

  
  book(value){
   this.bookingObj.date=value
  //  console.log(this.bookingObj)
   this.cartObj.appointmentPost(this.bookingObj).subscribe({
     next:(res)=>{
       if(res.message=="user not existed.. login to access cart"){
        //  alert("user not existed.. login to access cart")
       }
       else if(res.message=="slot booked"){
         alert("slot booked")
       }
       else if(res.message="you can't add it"){
         alert("you can't add it")
       }
       else{
        //  alert("error")
       }
     },
     error:(err)=>{
       alert(err)
     }
   })
   this.modalRef.hide();
  }

  ownerarray=[]
  userarray=[]
  data=[];

  cancelmyslot(data){
    this.cartObj.cancelslot(data).subscribe({
      next:(res)=>{
        alert("appointment canceled")
        this.modalRef.hide();
      },
      error:(err)=>{
        alert("error")
      }
    })
  }

  today = new Date().toISOString().slice(0, 10) 
  ok(){
    this.modalRef.hide();
  }

  slotModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.cartObj.appointmentAsOwner().subscribe({
      next:(res)=>{
        this.data=res.payload
        this.userServiceObj.userBhSubject.subscribe({
          next:(response)=>{
            this.userarray.splice(0,this.userarray.length)
            this.ownerarray.splice(0,this.ownerarray.length)
            for(let v of this.data){
              if(v.username==response.username){
                this.userarray.push(v)
              }
              else if(v.ownername==response.username){
                this.ownerarray.push(v)
              }
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
