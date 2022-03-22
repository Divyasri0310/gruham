import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CartdetailsComponent } from './cartdetails.component';

const routes: Routes = [{ path: '', component: CartdetailsComponent },
{path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartdetailsRoutingModule { }
