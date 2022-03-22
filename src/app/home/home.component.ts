import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public routerObj:Router) { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true, //to keep them looping as we slide 
    mouseDrag: true, //to work draging using mouse
    touchDrag: true, //always true is prefered
    pullDrag: false,
    dots: true, //
    navSpeed: 500,
    margin:50,
    navText: ['<', ' >'], //icons u want for navigation purpose
    responsive: { // to tell how many slides to fit in the screen for that particular size
      0: {
        items: 1
      },
      320:{
        items:2

      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  navigatetoallcard(){
    this.routerObj.navigateByUrl('/apartment/allapartments')
  }

}
