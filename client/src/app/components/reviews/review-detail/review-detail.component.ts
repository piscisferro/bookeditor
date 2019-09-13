import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ReviewService } from '../../../services/review.service';

import { Review } from '../../../models/review';


@Component({
  selector: 'review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css'],
})
export class ReviewDetailComponent implements OnInit {
	review: Review;
	reviewObs: Observable<Review>;
	baseReviewUrl: string;
	isCurrentUserAuthor: boolean;
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

	constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router: Router) {

  }

	ngOnInit() {

    	let paramReviewId = this.route.params['value'] && this.route.params['value']['reviewId'];
    	let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];

    	if(!paramReviewId) return;

    	if(paramUserId){
    		this.baseReviewUrl = '/user/' + paramUserId + '/reviews';
    		this.isCurrentUserAuthor = true;

    		this.reviewObs = this.reviewService.findCurrentUserReviewById(paramReviewId);

        this.reviewObs.subscribe( data => { this.review = data });

    	} else {
    		this.baseReviewUrl = '/reviews';
    		this.isCurrentUserAuthor = false;

    		this.reviewObs = this.reviewService.findReviewById(paramReviewId);
				this.reviewObs.subscribe(data =>{ this.review = data; });

    	}

	}

  handleDelete(deleteIt: boolean): void {
    if (deleteIt) {
      this.reviewService.deleteReview(this.review)
        .subscribe(data => {
          this.confirmModal.close();
          this.router.navigateByUrl(this.baseReviewUrl);
        });
    }
  }
}
