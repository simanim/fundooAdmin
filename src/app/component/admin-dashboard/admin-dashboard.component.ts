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
    var rowindex;
    $(document).ready(function(){
      var id=localStorage.getItem("fundooId");

     /**
      * 
      * @description getting the service name and number of users registered to each service
      */
      try{
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/user/UserStatics',
        dataType:"json",
        headers:{
          "Authorization": id
        },
        success: function (data) {
          var html="";
          for(var i=0;i<data.data.details.length;i++){
            html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:5%; background-color:rgb(157, 223, 203)'>";
            html += "<div class='card-title' style='padding-top:5%;color: rgb(19, 102, 74)'><h4><u>"+data.data.details[i].service+"</u></h4></div>";
            html += "<div class='card-body' style='padding-bottom:5%'>number of users: "+data.data.details[i].count+"</div>";
            html += "</div></div>";
          }
         /**
          * 
          * @description according to the number of service card, it will print
          */
          $("#services").html(html);
        },
        error: function (request, status, error) {
          console.log("card printing failed");
        }
      });
   
     /**
      * 
      * @description getting the userlist table
      */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        dataType:"json",
        success: function (data) {
          var list=data.data.data;
          var userList=[];
          for(var i=0; i<list.length; i++){
            userList.push([i+1,list[i].firstName,list[i].lastName,list[i].email,list[i].service]);
          }
          var table=$('#userlistTable').DataTable( {
            "data":userList,
            "columnDefs": [{
              "targets": 5,
              "render": function ( data, type, row, meta ) {
                return '<button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal" style="background-color:rgb(203, 241, 230)">More Details</button>';
              }
            }]
          });

         /**
          * 
          * @description getting the details of the particular user, when click on the details button
          */
          $('#userlistTable tbody').on('click', 'tr', function () {
            rowindex = table.row(this).index();
            // console.log(rowindex);
            // console.log(data.data.data[rowindex]);
            $("#labelFirstName").text("First Name : "+data.data.data[rowindex].firstName);
            $("#labelLastName").text("Last Name : "+data.data.data[rowindex].lastName);
            $("#labelEmail").text("Email : "+data.data.data[rowindex].email);
            $("#labelPhoneNum").text("Phone Num : "+data.data.data[rowindex].phoneNumber);
            $("#labelService").text("Service : "+data.data.data[rowindex].service);
            $("#labelDate").text("Created Date : "+data.data.data[rowindex].createdDate);

          });
          
        },
        error:function(error){
          console.log(error);
        }
      }).fail( function (request, status, error) {
        console.log("userlist failed");
      });
      
      

     /**
      * 
      * @description logging out
      */
      $("#logout").click(function(){
        $.ajax({
          type: 'POST',
          url: 'http://34.213.106.173/api/user/logout',
          headers:{
            "Authorization": id
          },
          success: function (data) {
           /**
            * 
            * @description if the logout is success then it will directly take to admin login page
            */
            window.location.href = "/adminLogin";
            localStorage.removeItem("fundooId");
          },
          error: function (request, status, error) {
            console.log("logout failed");
          }
        });
      });
    }
    catch(e){
      if(e instanceof SyntaxError || e instanceof ReferenceError || e instanceof TypeError || e instanceof RangeError){
        console.log("something bad happened!!! ");
      }
    }
    });
  }
}