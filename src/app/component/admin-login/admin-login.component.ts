import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
     /**
      * 
      * @description if the local storage has already fundooId, it will directly take to dashboard page
      */
      var id=localStorage.getItem("fundooId");
      if(id!=null){
        window.location.href = "/adminDashboard";
      }

      $("button").click(function(){
        try{
       /**
        * 
        * @description taking the email and password values from frontend
        */
        var adminEmail = $('#adminEmail').val();
        var adminPassword = $('#adminPassword').val();

       /**
        * 
        * @description checking whether all the inputs are filled
        */
        if(adminEmail.length == 0 && adminPassword.length == 0){
          $("h5").text("please fill all the inputs");
          return false;
        }
        if(adminEmail.length == 0){
          $("h5").text("please enter email");
          return false;
        }
        if(adminPassword.length == 0){
          $("h5").text("please enter password");
          return false;
        }
       /**
        * 
        * @description email validation
        */
        var regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if(regexEmail.test(adminEmail) == false){
          $("h5").text("invalid email");
          return false;
        }

       /**
        * 
        * @description calling admin login api
        */
        $.ajax({
          type: 'POST',
          url: 'http://34.213.106.173/api/user/adminLogin',
          dataType: "json",
          data:{
            "email": adminEmail,
            "password":adminPassword
          },
          success: function (data) {
            localStorage.setItem("fundooId",data.id);
           /**
            * 
            * @description if the admin login is success then it will directly take to admin dashboard page
            */
            window.location.href = "/adminDashboard";
          },
          error: function (request, status, error) {
            $("h5").text("incorrect email or password");
          }
        });
        return false;
      }catch(e){
        if(e instanceof SyntaxError || e instanceof ReferenceError || e instanceof TypeError || e instanceof RangeError){
        }
      }
      });
    
    });
  }
}