import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ApartmentService } from 'src/app/apartment.service';
import { CartdataService } from 'src/app/cartdata.service';


@Component({
  selector: 'app-allapartments',
  templateUrl: './allapartments.component.html',
  styleUrls: ['./allapartments.component.css']
})
export class AllapartmentsComponent implements OnInit {

  constructor(public cartobj:CartdataService,public apartmentSerObj:ApartmentService,public routerObj:Router) { }

  faHearticon=faHeart

  alladds:any;
  propertydetails=[];
  iterateData = []
  ngOnInit(): void {
    this.apartmentSerObj.getDataFromapi().subscribe({
      next:(res)=>{
        this.alladds=res.payload
        for(let v of this.alladds){
          for(let u of v.property){
            u.OwnerName=v.OwnerName
            u.email=v.email
            u.phoneNo=v.phoneNo
            this.propertydetails.push(u)
            this.iterateData = this.propertydetails
          }
        }
      },
      error:(err)=>{
        alert("something error")
      }
    })
  }

  alldata(){
    this.apartmentSerObj.getDataFromapi().subscribe({
      next:(res)=>{
        this.alladds=res.payload
        for(let v of this.alladds){
          for(let u of v.property){
            u.OwnerName=v.OwnerName
            u.email=v.email
            u.phoneNo=v.phoneNo
            this.iterateData = this.propertydetails
          }
        }
      },
      error:(err)=>{
        alert("something error")
      }
    })
  }
  mycart=[];

  add(data:any){
    // console.log(data)
    this.cartobj.addtocart(data).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="user not existed.. login to access cart"){
          this.routerObj.navigateByUrl('/login')
          // alert("user not existed.. login to access cart")
        }
        else if(res.message=="add added to cart"){
          this.mycart.push(data)
          this.routerObj.navigateByUrl('/cartdetails/cart')
          // console.log("mycart",this.mycart)
          // alert("add added to cart")
        }
        else if(res.message=="add already existed in cart"){
          alert("add already existed in cart")
        }
        else if(res.message=="next add is added to cart"){
          this.routerObj.navigateByUrl('/cartdetails/cart')
          // alert("next add is added to cart")
        }
      },
      error:(err)=>{
        alert(err)
      }
    })
  }
  finalData=[];
  selectArea(v){
    if(v.target.value=="all" ){
        this.iterateData = this.propertydetails
    }
    else{
      this.finalData.splice(0,this.propertydetails.length)
      this.propertydetails.forEach(obj=>{
        if(v.target.value == obj.Area ){
          this.finalData.push(obj)
        }
      })
      this.iterateData = this.finalData
    }
    //console.log(this.iterateData)
  }

}
