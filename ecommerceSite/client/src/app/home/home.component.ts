import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: [
        '../css/style.default.css',
        '../css/font-awesome.css',
        '../css/animate.min.css',
        '../css/owl.theme.css',
        '../css/custom.css'
    ]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    products: Product[] = [];
    returnUrl: string;

    // login-modal attributes
    model: any = {};
    loading = false;


    constructor(private userService: UserService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.loadAllUsers();
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    showProducts() {
        this.productService.getAll().subscribe(products => { this.products = products; });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    redirectLogin() {
        // Get the modal
        var modal = document.getElementById('login-modal');

        // Get the button that opens the modal
        var btn = document.getElementById("login");

        // When the user clicks on the button, open the modal

        modal.style.display = "block";

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    redirectLogout(){

    }

    login() {
        // Get the modal
        var modal = document.getElementById('login-modal');
        modal.style.display = "none";
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    }