import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import {HttpClientModule} from '@angular/common/http';
import { RestoreaccountComponent } from './restoreaccount/restoreaccount.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
// import { FooterComponent } from './footer/footer.component'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { UserdetailsModule } from './userdetails/userdetails.module';
import { HomecarouselComponent } from './homecarousel/homecarousel.component';
import { FooterComponent } from './footer/footer.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { CartdetailsModule } from './cartdetails/cartdetails.module';
import { ApartmentModule } from './apartment/apartment.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgetpasswordComponent,
    RestoreaccountComponent,
    NavbarComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    NopagefoundComponent,
    HomecarouselComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    UserdetailsModule,
    CarouselModule,
    ModalModule.forRoot(),
    CartdetailsModule,
    ApartmentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
