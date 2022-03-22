import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';
import { MyapartmentsComponent } from './myapartments/myapartments.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddapartmentComponent } from './addapartment/addapartment.component';
import { AllapartmentsComponent } from './allapartments/allapartments.component';


@NgModule({
  declarations: [
    ApartmentComponent,
    MyapartmentsComponent,
    AddapartmentComponent,
    AllapartmentsComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ApartmentModule { }
