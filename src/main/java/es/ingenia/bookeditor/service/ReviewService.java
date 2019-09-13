package es.ingenia.bookeditor.service;

import java.security.Principal;
import java.util.List;

import es.ingenia.bookeditor.dto.ReviewDTO;

public interface ReviewService {

	List<ReviewDTO> findCurrentUserReviews();

	ReviewDTO findCurrentUserReviewsById(Long id);

	List<ReviewDTO> findAllReviews();

	ReviewDTO findReviewById(Long id);

	ReviewDTO addReview(ReviewDTO review, Principal principal);

	void updateReview(Long id, ReviewDTO review, Principal principal);

	void deleteReview(Long id, Principal principal);
}
