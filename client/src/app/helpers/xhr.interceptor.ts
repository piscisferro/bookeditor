import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		let newReq = req;
		
		//by default we hope a JSON response
		if (!req.headers.has('Content-Type')) {
			newReq = newReq.clone({
				headers: req.headers.set('Content-Type', 'application/json')
			});
		}
		
		//notify server we do not want a header WWW-Authenticate in first visit
		//re-sent to server credentials (header Authorization: Basic XXX)
		newReq = newReq.clone({
			headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
			
			withCredentials: true
		});
		
		
		return next.handle( newReq );
  }
}
