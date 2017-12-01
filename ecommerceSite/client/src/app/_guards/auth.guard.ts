import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            alert('logged in');
            return true;
        }

        // not logged in so redirect to login page with the return url
        // Neha~ Start of changes 
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        alert('not logged in');
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        // Neha~ End of changes
        
        return false;
    }
}