import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { Principal } from '../../models/user-details';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	isAuth: boolean;
	principal: Principal;
	isAdmin: boolean;
	userId: number;
	
	private isAuthSubscription;
	
	constructor(private authService: AuthenticationService, private router: Router) {}
	
	ngOnInit(){
		//this.authService.login(undefined, undefined);
		this.isAuthSubscription = this.authService.isAuth()
			.subscribe((auth) => {
				this.isAuth = auth;
				
				if(this.isAuth){
					this.principal = this.authService.getPrincipal();
					this.userId = parseInt( this.principal.id );
					this.isAdmin = this.authService.hasAuthority('ADMIN');
				}
				
			});
	}
	
	ngOnDestroy(){
		this.isAuthSubscription.unsubscribe();
	}
	


}

