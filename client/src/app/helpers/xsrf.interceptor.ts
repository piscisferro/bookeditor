import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

	constructor(private cookieService: CookieService) {}
	
	
	/*
	* let set cookie XSRF-TOKEN in path another that '/'
	*/
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		let newReq = req;
		
		if (this.cookieService.check('XSRF-TOKEN')) {
            newReq = req.clone({ setHeaders: { "X-XSRF-TOKEN": this.cookieService.get('XSRF-TOKEN') } });
        }
		 
		return next.handle( newReq );
  }
  

}