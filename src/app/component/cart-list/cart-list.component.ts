import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    var id=localStorage.getItem("fundooId");
    var rowIndex;
    $("#loader").show();
    $("#cartList").hide();
  $(document).ready(function(){

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

    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/productcarts/userCartList',
      headers:{
        "Authorization": id
      },
      
      success: function (data) {
        console.log(data);
        
        var rowindex;
        var cartList=[];
        for(let i=0;i<data['data'].length;i++){
          if(data['data'][i].user)
            cartList.push([i+1,data['data'][i].user.firstName+" "+data['data'][i].user.lastName,data['data'][i].user.addresses[0].address,data['data'][i].product.name])
          else
            cartList.push([i+1,"----","----",data['data'][i].product.name])

        }
        $("#loader").hide();
        $("#cartList").show();

        var table=$('#cartList').DataTable( {
          "data":cartList,
          "columns":[
            {'width':'10%'},{'width':'20%'},{'width':'30%'},{'width':'20%'},{'width':'20%'}],
          "columnDefs": [{
            "targets": 4,
            "render": function ( data, type, row, meta ) {
              return '<button type="button" class="btn btn-outline-success" id="place" style="background-color:rgb(203, 241, 230)">confirm</button><button type="button" class="btn btn-outline-success" id="cancel" style="background-color:rgb(203, 241, 230)">cancel</button>';
            }
          }]
        });


        $('#cartList tbody').on('click', '#place', function () {
          rowindex=$(this).closest('tr')
          var index=table.row(rowindex).data()[0]-1;
          
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCompleteOrder',
            data:{
              "cartId": data['data'][index].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              window.location.href = "/cart";
            },
            error: function (request, status, error) {
            }
          })
        });

        $('#cartList tbody').on('click', '#cancel', function () {
          rowindex=$(this).closest('tr')
          var index=table.row(rowindex).data()[0]-1;
          
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCancelOrder',
            data:{
              "cartId": data['data'][index].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              window.location.href = "/cart";
            },
            error: function (request, status, error) {
            }
          })
        });

        // $('#cartList tbody').on('click', 'tr', function () {
        //   rowIndex = table.row(this).index();
        //   $.ajax({
        //     type: 'POST',
        //     url: 'http://34.213.106.173/api/productcarts/adminCompleteOrder',
        //     data:{
        //       "cartId": data['data'][rowIndex].id
        //     },
        //     dataType:"json",
        //     headers:{
        //       "Authorization": id
        //     },
        //     success: function (data) {
        //       window.location.href = "/cart";
        //     },
        //     error: function (request, status, error) {
        //     }
        //   })
        // });
      },
      error: function (request, status, error) {
      }
    });

  });
}

}
