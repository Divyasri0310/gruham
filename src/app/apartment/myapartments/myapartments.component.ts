import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ApartmentService } from 'src/app/apartment.service';

@Component({
  selector: 'app-myapartments',
  templateUrl: './myapartments.component.html',
  styleUrls: ['./myapartments.component.css']
})
export class MyapartmentsComponent implements OnInit {

  myadds = [];
  faHearticon = faHeart;
  constructor(
    public apartmentSerObj:ApartmentService,
    public routerObj: Router,
    public bsModalServiceObj: BsModalService,
    public formobj: FormBuilder
  ) {}

  refreshdata=()=>{
    this.apartmentSerObj.mypostadds().subscribe({
      next: (res) => {
        // console.log(res)
      return  this.myadds = res.payload?.property;
      },
      error: (err) => {
        console.log(err);
      },
    });
    return this.myadds
  }
  ngOnInit(): void {
    this.refreshdata()
  }


 data ;
  delete(index: any) {

    this.apartmentSerObj.deleteadd(index).subscribe({
      next: (res) => {
        if ((res.message = 'add deleted')) {
         this.refreshdata()
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  registrationError = {
    error:false,
    errorMessage:''  
  }
  

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalServiceObj.show(template, {
      class: 'modal-sm',
    });
    this.registrationError.error=false;
  }

  //rent update
  newObj;
  propertyUpdate = this.formobj.group({
    rent: ['', [Validators.required,Validators.minLength(3)]],
  });

  submit() {
    if(this.propertyUpdate.value.rent ==""){
      this.registrationError.error=true;
      this.registrationError.errorMessage="Enter rent";
    }
    else{
      this.newObj.rent = this.propertyUpdate.value.rent;
    // console.log(this.propertyUpdate.value.rent);
    this.apartmentSerObj.updateadd(this.newObj).subscribe({
      next: (res) => {
        if (res.message == 'no add exists') {
        } 
        else if (res.message == 'add updated') {
          // alert('add updated');
          this.modalRef.hide()
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
  }

  update(template:TemplateRef<any>,v,id){
    // this.routerObj.navigateByUrl('/addupdate')
    this.newObj = v
    // console.log(this.newObj)
    this.openModal(template)  
    this.apartmentSerObj.getid().next(id)
  }

}
