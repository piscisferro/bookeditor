import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    	const loginUrl: UrlTree = this.router.parseUrl('/login?errorCode=error.no.logged');
    
    	let userId = this.authenticationService.getUserId();
    
    	
    	
        if (this.authenticationService.isAuth()) {
        	
        	let newUrl = '';
        	if( this.authenticationService.hasAuthority('ADMIN') ){
        		newUrl = '/books';
        	} else if( this.authenticationService.hasAuthority('REVIEWER') ){
        		newUrl = `user/${userId}/reviews`;
        	} else if( this.authenticationService.hasAuthority('AUTHOR') ){
        		newUrl = `user/${userId}/books`;
        	} else {
        		newUrl = 'welcome'; 
        	}
        	
        	console.info("AuthGuard: newUrl=" + newUrl);

            // logged in so redirect by authority
            return this.router.parseUrl( newUrl );
        }
        
        console.info("AuthGuard: user not logged, redirect to login...");
        
        return loginUrl;
        
        /*
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { errorCode: 'error.no.logged' }});
        
        return false;
        */
    }
}