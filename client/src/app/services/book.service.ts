import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { API_BASE_URL } from '../app.constants';

@Injectable()
export class BookService {

  constructor(private httpClient: HttpClient) {}


  findAllBooks(): Observable<Book[]>{

      return this.httpClient.get(API_BASE_URL + '/api/books')
      	.pipe( map(res => <Book[]>res) );
  }

  findCurrentUserBooks(): Observable<Book[]>{

      return this.httpClient.get(API_BASE_URL + '/api/books/search/books-current-user')
      	.pipe( map(res => <Book[]>res) );
  }

  findBookById(id:number): Observable<Book>{

      return this.httpClient.get(API_BASE_URL + '/api/books/' + id)
      	.pipe( map(res => <Book>res) );
  }

  findCurrentUserBookById(id:number): Observable<Book>{

      return this.httpClient.get(API_BASE_URL + '/api/books/search/book-current-user-by-id/' + id)
      	.pipe( map(res => <Book>res) );
  }

  updateBook(book: Book): Observable<boolean>{

    return this.httpClient.put(API_BASE_URL + '/api/books/' + book.id, book)
      .pipe(
              map(res => {
                let aux = res;

                return aux != null && aux['id'] != null;

              })
            );
  }
}
