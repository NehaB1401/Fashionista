import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  @Input() myData;
  neha;
  price;
  returnUrl: string;

  constructor(
    private dataService: DataService, 
    private router: Router,
  
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.price = this.route.snapshot.paramMap.get('id');
  }
  


}
