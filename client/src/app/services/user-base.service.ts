import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserBase } from '../models/user-base';
import { API_BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserBaseService {

  constructor(private httpClient: HttpClient) { }

  findAllUserBases(): Observable<UserBase[]>{
      return this.httpClient.get(API_BASE_URL + '/api/user-base')
      	.pipe( map(res => <UserBase[]>res) );
  }

  findUserBaseById(id:number): Observable<UserBase>{
      return this.httpClient.get(API_BASE_URL + '/api/user-base/' + id)
        .pipe( map(res => <UserBase>res) );
  }

  createUserBase(userBase: UserBase): Observable<boolean>{
      return this.httpClient.post(API_BASE_URL + '/api/user-base/', userBase)
        .pipe( map(res => {
          let aux = res;
          return aux != null && aux['id'] != null;
        })
    );
  }

  updateUserBase(userBase: UserBase, id: number): Observable<boolean>{
      return this.httpClient.put(API_BASE_URL + '/api/user-base/' + id, userBase)
        .pipe( map(res => {
          let aux = res;
          return aux != null && aux['id'] != null;
        })
    );
  }
  }
