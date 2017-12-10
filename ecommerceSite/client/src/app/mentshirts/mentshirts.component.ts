import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'mentshirts.component.html',
  styleUrls: [
    '../css/style.default.css',
    '../css/font-awesome.css',
    '../css/animate.min.css',
    '../css/owl.theme.css',
    '../css/custom.css',
    '/mentshirts.component.css'
  ]
})
export class MentshirtsComponent {
  loading = false;
  returnUrl: string;
  products: Product[] = [];

  constructor(
    
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.productService.getAll().subscribe(products => { this.products = products; });
  }

}




