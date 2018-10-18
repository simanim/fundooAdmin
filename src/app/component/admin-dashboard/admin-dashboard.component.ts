import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    $(document).ready(function(){
      var id=localStorage.getItem("id");
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/user/UserStatics',
        dataType:"json",
        headers:{
          "Authorization": id
        },
        success: function (data) {
          console.log("success");
          console.log(data);
          var html="";
          for(var i=0;i<data.data.details.length;i++){
            html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:5%; background-color:rgb(167, 209, 236)'>";
            html += "<div class='card-title' style='padding-top:5%'><h4><u>"+data.data.details[i].service+"</u></h4></div>";
            html += "<div class='card-body' style='padding-bottom:5%'>number of users: "+data.data.details[i].count+"</div>";
            html += "</div></div>";
          }
          $("#services").html(html);
        },
        error: function (request, status, error) {
          console.log("failed");
          console.log(id);
          console.log(request);
          console.log(status);
          console.log(error);
        }
      });
   
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        dataType:"json",
        success: function (data) {
          console.log("success");
          var list=data.data.data;
          var userList=[];
          for(var i=0; i<list.length; i++){
            userList.push([i+1,list[i].firstName,list[i].lastName,list[i].email,list[i].service]);
          }
          $('#example').DataTable( {
            data:userList
        } );
        },
        error: function (request, status, error) {
          console.log("failed");
          console.log(request);
          console.log(status);
          console.log(error);
        }
      });
      $("button").click(function(){
        window.location.href = "/adminLogin";
        localStorage.removeItem("fundooId");
      });
    });
  }

}
