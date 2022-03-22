import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddapartmentComponent } from './addapartment/addapartment.component';
import { AllapartmentsComponent } from './allapartments/allapartments.component';
import { ApartmentComponent } from './apartment.component';
import { MyapartmentsComponent } from './myapartments/myapartments.component';

const routes: Routes = [{ path: '', component: ApartmentComponent },
{path:"myapartments",component:MyapartmentsComponent},
{path:"addapartment",component:AddapartmentComponent},
{path:"allapartments",component:AllapartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
