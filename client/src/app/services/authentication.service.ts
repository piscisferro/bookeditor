import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserDetails, Principal } from '../models/user-details';
import { API_BASE_URL } from '../app.constants';

const CURRENT_USER_KEY = 'current.user.data';

@Injectable()
export class AuthenticationService {
	private currentUser: UserDetails;

	private authenticatedSource: BehaviorSubject<boolean>;
  	authenticated: Observable<boolean>;
  

  	constructor(private httpClient: HttpClient) { 
  		this.authenticatedSource = new BehaviorSubject<boolean>(false);
  		this.authenticated = this.authenticatedSource.asObservable();
  		this.currentUser = null;
  		
  		//if exists previous data reload it
  		if(sessionStorage.getItem(CURRENT_USER_KEY)){
  			this.currentUser = UserDetails.fromJSON( JSON.parse( sessionStorage.getItem(CURRENT_USER_KEY) ) );
  			this.authenticatedSource.next(true);
  	  		
  		}
  	}


	login(credentials, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
            'Content-Type': 'application/json'
        } : {});

        const options = {headers: headers, withCredentials: true};

        this.httpClient.get(API_BASE_URL + '/api/user', options)
	        .pipe(catchError(err => {
	        	
	        	this.currentUser = null;
	        	sessionStorage.removeItem(CURRENT_USER_KEY);
	        	this.authenticatedSource.next(false);
	        	
	        	return callback && callback();
	        	
	        }))
	        .subscribe(response => {
	        	
	            if (response['name']) {
	            	
	                
	                this.currentUser = new UserDetails( response['name'], response['authorities'] );
	                
	                if(response['principal']){
	                	let p = response['principal'];
	                	this.currentUser.setPrincipal( new Principal(p['id'], p['name'], p['surname'], p['username']) );
	                }
	                
	                //save in session storage
	                sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify( this.currentUser ));
	                
	                this.authenticatedSource.next(true);
	                
	            } else {
	                
	                this.currentUser = null;
	                sessionStorage.removeItem(CURRENT_USER_KEY);
	                
	                this.authenticatedSource.next(false);
	            }
	            
	            return callback && callback();
	            
	        });

	}

  	logout(callback) {
  		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  		const options = {headers: headers, withCredentials: true};

  		this.httpClient.get(API_BASE_URL + '/logout', options).pipe(finalize(() => {
  	    	
  			this.currentUser = null;
  	    	sessionStorage.removeItem(CURRENT_USER_KEY);
  			this.authenticatedSource.next(false);

  			callback && callback();

    	})).subscribe();
  	}
  
  	/** call from UnAuthInterceptor (response 401 in http request) */
  	forceLogout() {
  		
    	this.currentUser = null;
    	sessionStorage.removeItem(CURRENT_USER_KEY);
    	
    	this.authenticatedSource.next(false);
	}
  
  	isAuth(){
  		return this.authenticated;
  	}
  
 
  	hasAuthority(authorityName:string){
  		return this.currentUser && this.currentUser.hasAuthority(authorityName);
  	}
  
  	getUserId(): string {
  		return this.currentUser && this.currentUser.principal && this.currentUser.principal.id;
  	}
  	
  	getPrincipal(): Principal {
  		return this.currentUser && this.currentUser.principal;
  	}


}
