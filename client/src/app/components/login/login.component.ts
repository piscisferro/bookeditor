import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string = '';

  credentials = {username: '', password: ''};

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  login() {
    this.authService.login(this.credentials, () => {
    	
    	if(this.authService.isAuth()){
    		this.errorMessage = null;
    		
    		this.router.navigateByUrl('/');
    		
    	} else {
    		//wrong credentials
    		this.errorMessage = "Try again, wrong login or password";
    		
    	}
    	
        
    });
    return false;
  }

}
