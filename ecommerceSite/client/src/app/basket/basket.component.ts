import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { AlertService, UserService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';

var totalPrice =0;
@Component({
  moduleId: module.id,
  templateUrl: 'basket.component.html',
  styleUrls: [
      '../css/style.default.css',
      '../css/font-awesome.css',
      '../css/animate.min.css',
      '../css/owl.theme.css',
      '../css/custom.css'
  ]
})
export class BasketComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
  users: User[] = [];
  products : Product[] = [];
  appState = 'default';
  op; // ordr price with shipping
  fp; //final price of component
  productQuant;
  q;
  
  paymentOrderPrice :number = 10;
  @Output() onPayment = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, private productService: ProductService,
    private router: Router, private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loadAllUsers();
    this.finalPrice();
    this.orderSummary();
  }
   loadAllUsers() {
    
    //load all users and their cart items
    this.userService.getAll().subscribe(users => { this.users = users; });
}
  finalPrice(){
    var userCartLength= this.currentUser.cart.length;
    
    //calculate the total price of the items in users cart

    for(var i=0; i <userCartLength; i++ ){
        totalPrice=    totalPrice +  (this.currentUser.cart[i].productPrice); 
    }
    this.fp = totalPrice;
    

  }
  orderSummary(){
    //display the order summary with shipping
      var orderPrice = 0;
      orderPrice = totalPrice + 10;
      this.op = orderPrice;
      
  }
  orderDiscount(){
   // calculate the discount 
   //alert(this.model.item.cartQuantity);
    totalPrice = totalPrice - ( (totalPrice * 0.10) );
    
    this.orderSummary();
    alert(this.productQuant);
  }
  cartObjectDelete(productName: string , user : User)
  {        
      this.appState='edit';
      this.userService.updateuser(productName , user)
      .subscribe(
          data => {
               this.alertService.success('Product Deleted from Cart Successfully !!', true);
               this.loadAllUsers();
               
          },
         
          error => {
             this.alertService.error(error);
          });
  }
    
    loadQuant(q){
    
    this.productQuant = q;
    }
    updateBasket(){
       alert(this.productQuant);
        //alert(this.productQuant);
    }
    proPayment(paymentPrice : number){
          alert(paymentPrice);
          this.onPayment.emit(paymentPrice);

    }



  
}
