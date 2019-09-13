import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../services/review.service';


import { Review } from '../../../models/review';

@Component({
  selector: 'review-editor',
  templateUrl: './review-editor.component.html',
  styleUrls: ['./review-editor.component.css']
})
export class ReviewEditorComponent implements OnInit {

	@Input()
	review: Review;

	@Output()
	changeReview: EventEmitter<Review> = new EventEmitter<Review>();

  baseReviewUrl: string;
	isCurrentUserAuthor: boolean;
  warningFlag: boolean;

	constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {	}

	ngOnInit(){
      this.warningFlag = false;

      let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];
    	let paramReviewId = this.route.params['value'] && this.route.params['value']['reviewId'];

    	if(!paramReviewId) return;

    	if(paramUserId){
    		this.baseReviewUrl = '/user/' + paramUserId + '/reviews';
    		this.isCurrentUserAuthor = true;

    		this.reviewService.findCurrentUserReviewById(paramReviewId)
				.subscribe(data =>{ this.review = data; });

    	} else {
    		this.baseReviewUrl = '/reviews';
    		this.isCurrentUserAuthor = false;

    		this.reviewService.findReviewById(paramReviewId)
				.subscribe(data =>{ this.review = data; });

    	}
	}

	handleChange(){
		console.info("change review description");

    if(this.review.rating > 0) {

  		this.reviewService.updateReview(this.review)
  			.subscribe(data =>{

  				if(data){
  					this.changeReview.emit( this.review );
  				}

  				this.router.navigateByUrl(this.baseReviewUrl + '/' + this.review.id);

  			});
  	} else {
      this.warningFlag = true;
    }
  }

  closeAlert() {
    this.warningFlag = false;
  }

}
