import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public obj:UsersService,public routerObj:Router) { }

  ngOnInit(): void {
  }
  faRightFromBracketicon=faRightFromBracket;

  userlogout(){
    this.obj.logout()
    this.routerObj.navigateByUrl('/home')
  }
}
