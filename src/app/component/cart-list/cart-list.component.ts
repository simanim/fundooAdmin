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
        var cartList=[];
        for(let i=0;i<data['data'].length;i++){
          cartList.push([i+1,data['data'][i].id,data['data'][i].product.name,data['data'][i].price])
        }
        $("#loader").hide();
        $("#cartList").show();

        var table=$('#cartList').DataTable( {
          "data":cartList,
          "columnDefs": [{
            "targets": 4,
            "render": function ( data, type, row, meta ) {
              return '<button type="button" class="btn btn-outline-success" id="place" style="background-color:rgb(203, 241, 230)">place order</button>';
            }
          }]
        });

        $('#cartList tbody').on('click', 'tr', function () {
          rowIndex = table.row(this).index();
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCompleteOrder',
            data:{
              "cartId": data['data'][rowIndex].id
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
      },
      error: function (request, status, error) {
      }
    });

  });
}

}
