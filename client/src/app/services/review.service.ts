import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Review } from '../models/review';
import { API_BASE_URL } from '../app.constants';

@Injectable()
export class ReviewService {

  constructor(private httpClient: HttpClient) { }


  findAllReviews(): Observable<Review[]> {
    return this.httpClient.get(API_BASE_URL + '/api/reviews').pipe(map(res =>  <Review[]>res ));
  }

  findCurrentUserReviews(): Observable<Review[]> {

    return this.httpClient.get(API_BASE_URL + '/api/reviews/search/reviews-current-user')
    .pipe(map(res =>  <Review[]>res ));
  }

  findCurrentUserReviewById(id:number): Observable<Review> {

    return this.httpClient.get(API_BASE_URL + '/api/reviews/search/review-current-user-by-id/' + id)
    .pipe(map(res =>  <Review>res ));
  }

  findReviewById(id:number): Observable<Review> {

    return this.httpClient.get(API_BASE_URL + '/api/reviews/' + id)
    .pipe(map(res =>  <Review>res ));
  }

  addReview(review: Review): Observable<Review> {
    return this.httpClient.post(API_BASE_URL + '/api/reviews', review).pipe(map(res => <Review>res));
  }

  updateReview(review: Review): Observable<boolean>{

    return this.httpClient.put(API_BASE_URL + '/api/reviews/' + review.id, review)
      .pipe(
              map(res => {
                let aux = res;

                return aux != null && aux['id'] != null;

              })
            );
  }

  deleteReview(review: Review): Observable<boolean> {
    return this.httpClient.delete(API_BASE_URL + '/api/reviews/' + review.id)
      .pipe(
            map(res => {
              let aux = res;

              return aux != null && aux['id'] != null;

            })
          );
  }

  convertJsonToReviews(json: Array<Object>): Array<Review> {
    let result = new Array<Review>();


    for(var i = 0; i < json.length; i++ ){
      let review = new Review(json[i]['rating'], json[i]['content'],json['_embedded']['book']);
      review.id = json[i]['id'];
      review.userId = json[i]['userId'];

      result.push( review );
    }

    return result;
  }

  convertJsonToReview(json: Object): Review {

    let review = new Review(json['rating'], json['content'], json['_embedded']['book']);
    review.id = json['id'];
    review.userId = json['userId'];

    return review;
  }

}
