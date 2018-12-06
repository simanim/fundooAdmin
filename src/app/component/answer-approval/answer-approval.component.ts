import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-answer-approval',
  templateUrl: './answer-approval.component.html',
  styleUrls: ['./answer-approval.component.css']
})
export class AnswerApprovalComponent implements OnInit {

  constructor() { }
  public approved
  public array=[]
  ngOnInit() {
    var rowindex;
    $("#loader").show();
    $("#userlistTable").hide();

    $(document).ready(function(){
      var id=localStorage.getItem("fundooId");

     /**
      * 
      * @description getting the service name and number of users registered to each service
      */
      try{

      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType:"json",
        headers:{
          "Authorization": id
        },
        success: function (data) {
          var list=data.data;
          var userList=[];
          for(var i=0; i<list.length; i++){
            userList.push([i+1,list[i].message]);
          }
          $("#loader").hide();
          $("#userlistTable").show();

          var table=$('#userlistTable').DataTable( {
            "data":userList,
            "columns":[
              {'width':'20%'},{'width':'60%'},{'width':'20%'}],
            "columnDefs": [{
              "targets": 2,
              "render": function ( data, type, row, meta ) {
                return '<button type="button" class="btn btn-outline-success" id="approve" style="background-color:rgb(203, 241, 230)">accept</button><button id=reject type="button" class="btn btn-outline-success" style="background-color:rgb(203, 241, 230)">reject</button>';
              }
            }]
          });
        
        
            $('#userlistTable tbody').on('click', '#approve', function () {
              rowindex=$(this).closest('tr')
              var index=table.row(rowindex).data();
              
              $.ajax({
                type: 'POST',
                url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+data.data[index[0]-1].id,
                dataType:"json",
                headers:{
                  "Authorization": id
                },
                success: function (data) {
                  window.location.href = "/approval";
                },
                error: function (request, status, error) {
                }
              })
            });
            $('#userlistTable tbody').on('click', '#reject', function () {
              rowindex=$(this).closest('tr')
              var index=table.row(rowindex).data();
                $.ajax({
                  type: 'POST',
                  url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+data.data[index[0]-1].id,
                  dataType:"json",
                  headers:{
                    "Authorization": id
                  },
                  success: function (data) {
                    window.location.href = "/approval";
                  },
                  error: function (request, status, error) {
                  }
                })
            });
            
            
        },
        error: function (request, status, error) {
        }
      });
     
     
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
          }
        });
      });
      $("#back").click(function(){
        window.location.href = "/adminDashboard";
    });
   
      }

      catch(e){
        if(e instanceof SyntaxError || e instanceof ReferenceError || e instanceof TypeError || e instanceof RangeError){
        }
      }
    });
  }
}
