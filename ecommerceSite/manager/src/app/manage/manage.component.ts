import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/index';
//import { UserService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  model: any = {};
  currentUser: User;
  product: Product;
  users: User[] = [];
  products : Product[] = []; //todos
  appState = 'default';
  productName = '';     //text
  oldProductName='';//oldText
  totalAvailability = '';  //text
  oldTotalAvailability = ''; //oldText
  file : any = null;

  constructor( private productService: ProductService,
    private router: Router) 
{
//this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

ngOnInit() {
  //this.loadAllUsers();
}

// deleteUser(_id: string) {
//   this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
// }

showProducts() {
  this.productService.getAll().subscribe(products => { this.products = products; });
}

addProduct(){
 
  alert("Added Successfully");
  this.productService.create(this.model)
  .subscribe(
      data => {
           //this.alertService.success('Addition successful', true);
      },
      error => {
         //this.alertService.error(error);
      });
}

deleteProduct(_id: string) {
  this.productService.delete(_id).subscribe(() => {this.loadAllProducts()});
}

private loadAllProducts() {
  this.productService.getAll().subscribe(products => { this.products = products; });
}

editProduct(product : Product)
{
  this.appState='edit';
  this.model._id = product._id;
  this.model.productId= product.productId;
  this.model.productName = product.productName;
  this.model.type = product.type;
  this.model.totalAvailability = product.totalAvailability;
}

updateProduct(){
  
  this.productService.update(this.model).subscribe(() => {this.loadAllProducts()});
}

uploadImage(){
  alert("hi bitches");

  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
  
  
}

}

// private loadAllUsers() {
//   this.userService.getAll().subscribe(users => { this.users = users; });
// }




