
import { Authority } from './authority';

export class UserDetails {
	name: string;
	authenticated: boolean;

	authorities: Array<Authority>;

	principal: Principal;

	/*
	constructor(name:string, authorityName:string){
		this.authenticated = true;

		this.name = name;
		this.authorities = [ new Authority( authorityName ) ];
	}
	*/

	constructor(name:string, authorities:Array<Authority>){
		this.authenticated = true;

		this.name = name;
		this.authorities = authorities;
	}

	getPrincipal(): Principal {
		return this.principal;
	}

	setPrincipal(principal: Principal){
		this.principal = principal;
	}

	hasAuthority(authorityName:string){

		for(let auth of this.authorities) {
			if(auth.authority == authorityName){
				return  true;
			}
		}

		return false;
	}

	static fromJSON(json: Object): UserDetails {
		let user = Object.create(UserDetails.prototype);
		return Object.assign(user, json);
	}

}

// export class Authority {
// 	authority: string;
//
// 	constructor(authority:string){
// 		this.authority = authority;
// 	}
// }



export class Principal {
	id: string
	name: string;
	surname: string;
	username: string;


	constructor(id: string, name:string, surname:string, username:string){
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
	}

}
