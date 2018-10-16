import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  model : any = {
    "email":"",
    "password":""
  }
  constructor() { }

  ngOnInit() {
  }
  adminlogin(){
console.log("in")
  }
}
