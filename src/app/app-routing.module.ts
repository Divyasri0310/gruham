import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cartdetails/cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RestoreaccountComponent } from './restoreaccount/restoreaccount.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'forgotpassword',component:ForgetpasswordComponent},
  {path:'restore',component:RestoreaccountComponent},

  { path: 'userdetails', loadChildren: () => import('./userdetails/userdetails.module').then(m => m.UserdetailsModule) },
  
  {path:"",redirectTo:'home',pathMatch:'full'},
  { path: 'cartdetails', loadChildren: () => import('./cartdetails/cartdetails.module').then(m => m.CartdetailsModule) },
  {path:"cart",component:CartComponent},
  
  { path: 'apartment', loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule) },

  {path:'**',component:NopagefoundComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
exports: [RouterModule]
})
export class AppRoutingModule { }
