import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Message } from '../models/message';
import { API_BASE_URL } from '../app.constants';

@Injectable()
export class MessageService {

  constructor(private httpClient: HttpClient) {}


  getMessage(): Observable<Message>{

      return this.httpClient.get<Message>(API_BASE_URL + '/api/resource');
  }

}
