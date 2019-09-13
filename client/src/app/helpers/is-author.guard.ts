import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class IsAuthorGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    	if( !this.authenticationService.isAuth() ) return false;
    	
    	 
    	let paramUserId = route.params['userId'];
    	let currentUserId = this.authenticationService.getUserId();
    	
    	let checkUserId = !paramUserId || (paramUserId && paramUserId == currentUserId);
    	let checkAuthority = this.authenticationService.hasAuthority('AUTHOR');
    	
    	
        return checkUserId && checkAuthority;
    }
}