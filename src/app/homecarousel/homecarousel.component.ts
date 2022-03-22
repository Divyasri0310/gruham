import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-homecarousel',
  templateUrl: './homecarousel.component.html',
  styleUrls: ['./homecarousel.component.css']
})
export class HomecarouselComponent implements OnInit {

  constructor(public apartmentSerObj:ApartmentService) { }
  show = false;
  alladds:any;
  propertydetails=[];
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
              console.log(this.propertydetails)
            }
          }
        },
        error:(err)=>{
          alert("something error")
        }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    margin:20,
    navText: ['<div class="nav-button owl-prev" style:" background-color:"black";"> ‹ </div>', '<div class="nav-button owl-next">›</div>'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
}
