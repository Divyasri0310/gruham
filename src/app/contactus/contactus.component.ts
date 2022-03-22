import { Component, OnInit } from '@angular/core';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  faEnvelopeicon=faEnvelope
  faPhoneAlticon=faPhoneAlt
  constructor() { }

  ngOnInit(): void {
  }

}
