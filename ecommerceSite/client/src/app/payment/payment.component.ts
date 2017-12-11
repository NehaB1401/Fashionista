import { Component, OnInit, Input ,Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  moduleId: module.id,
  templateUrl: 'payment.component.html',
  styleUrls: [
      '../css/style.default.css',
      '../css/font-awesome.css',
      '../css/animate.min.css',
      '../css/owl.theme.css',
      '../css/custom.css'
  ]
  
  
})
export class PaymentComponent implements OnInit {
  @Input('orderPrice') abc : number;
  
  test;
  constructor() { }

  ngOnInit() {
    alert(this.abc);
  //  this.onPayment(20);
  }
  onPayment(paymentPrice : number){
      this.test = paymentPrice;
      alert("neha you are wrong!!")
      alert(this.test);          
  }

}
