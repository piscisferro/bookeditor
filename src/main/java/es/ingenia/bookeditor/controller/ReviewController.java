package es.ingenia.bookeditor.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.ingenia.bookeditor.dto.ReviewDTO;
import es.ingenia.bookeditor.repository.ReviewRepository;
import es.ingenia.bookeditor.service.ReviewService;

@RestController
@RequestMapping(path = "api/reviews")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private ReviewRepository reviewRepository;

	@GetMapping(path = "/search/reviews-current-user")
	public List<ReviewDTO> findCurrentUserReviews() {
		return reviewService.findCurrentUserReviews();
	}

	@GetMapping(path = "/search/review-current-user-by-id/{id}")
	public ReviewDTO findCurrentUserReviews(@PathVariable("id") Long id) {
		return reviewService.findCurrentUserReviewsById(id);
	}

	@GetMapping("/{id}")
	public ReviewDTO findReviewById(@PathVariable Long id) {
		return reviewService.findReviewById(id);
	}

	@GetMapping
	public List<ReviewDTO> findAllReviews() {
		return reviewService.findAllReviews();
	}

	@PostMapping
	public ReviewDTO addReview(@RequestBody ReviewDTO review, Principal principal) {
		return reviewService.addReview(review, principal);
	}

	@PutMapping(path = "/{id}")
	public void updateReview(@PathVariable("id") Long id, @RequestBody ReviewDTO review, Principal principal) {
		reviewService.updateReview(id, review, principal);
	}

	@DeleteMapping(path = "/{id}")
	public void deleteReview(@PathVariable("id") Long id, Principal principal) {
		reviewService.deleteReview(id, principal);
	}
}