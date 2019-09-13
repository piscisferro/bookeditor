import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
import { BookService } from '../../../services/book.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Book } from '../../../models/book';
import { Review } from '../../../models/review';

@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
	reviews: Array<Review>;
  books: Array<Book>;
	baseReviewUrl: string;
  isCollapse: boolean;
  commentError: boolean;

  addReviewForm: FormGroup;
  ratingCtrl = new FormControl(1, Validators.compose([Validators.required, Validators.min(1)]));
  bookIdCtrl = new FormControl('', Validators.required);
  commentCtrl = new FormControl('', Validators.maxLength(50));

	constructor(private reviewService: ReviewService, private bookService: BookService, private route: ActivatedRoute, private formBuilder: FormBuilder) {	}

	ngOnInit(){

		let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];

    this.isCollapse = true;
    this.addReviewForm = this.formBuilder.group({
      bookId: this.bookIdCtrl,
      rating: this.ratingCtrl,
      content: this.commentCtrl
    });

    	if(paramUserId){
    		this.baseReviewUrl = '/user/' + paramUserId + '/reviews';

    		this.reviewService.findCurrentUserReviews().subscribe(data =>{ this.reviews = data; });
        this.bookService.findAllBooks().subscribe(data =>{ this.books = data; });


    	} else {
    		this.baseReviewUrl = '/reviews';

    		this.reviewService.findAllReviews().subscribe(data =>{ this.reviews = data; });

    	}
	}

  onSubmit(reviewFormData) {
    let book: Book = this.books.find(res => res.id == reviewFormData.bookId);
    let review: Review = new Review(reviewFormData.rating, reviewFormData.content, book);

    console.log(book);
    console.log(review);

    this.reviewService.addReview(review).subscribe(data => {this.reviews.push(data); });

    this.addReviewForm.reset();
  }

}
