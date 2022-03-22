import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartdetailsRoutingModule } from './cartdetails-routing.module';
import { CartdetailsComponent } from './cartdetails.component';
import { CartComponent } from './cart/cart.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    CartdetailsComponent,
    CartComponent,

  ],
  imports: [
    CommonModule,
    CartdetailsRoutingModule,
    ModalModule.forRoot()
  ]
})
export class CartdetailsModule { }
