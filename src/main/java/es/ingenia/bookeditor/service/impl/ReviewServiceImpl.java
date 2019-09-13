package es.ingenia.bookeditor.service.impl;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.ingenia.bookeditor.dto.ReviewDTO;
import es.ingenia.bookeditor.dto.mapper.BookMapper;
import es.ingenia.bookeditor.dto.mapper.ReviewMapper;
import es.ingenia.bookeditor.entity.Book;
import es.ingenia.bookeditor.entity.Review;
import es.ingenia.bookeditor.repository.BookRepository;
import es.ingenia.bookeditor.repository.ReviewRepository;
import es.ingenia.bookeditor.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private BookEditorUserDetailsServiceImpl bookEditorUserDetailsService;

	@Override
	public List<ReviewDTO> findCurrentUserReviews() {
		List<Review> reviews = reviewRepository.findCurrentUserReviews();

		return getReviewsDto(reviews);

	}

	@Override
	public ReviewDTO findCurrentUserReviewsById(Long id) {

		return ReviewMapper.reviewToDto(reviewRepository.findCurrentUserReviewsById(id));

	}

	@Override
	public List<ReviewDTO> findAllReviews() {

		return getReviewsDto((List<Review>) reviewRepository.findAll());

	}

	@Override
	public ReviewDTO findReviewById(Long id) {
		return ReviewMapper.reviewToDto(reviewRepository.findById(id).get());
	}

	@Transactional
	@Override
	public ReviewDTO addReview(ReviewDTO review, Principal principal) {

		Optional<Book> optionalBookFound = bookRepository.findById(review.getBook().getId());
		Book bookFound = optionalBookFound.get();

		Review addReview = new Review(
				review.getRating(),
				review.getContent(),
				bookEditorUserDetailsService.loadUserByUsername(principal.getName()).getId(),
				bookFound);

		try {
			return ReviewMapper.reviewToDto(reviewRepository.save(addReview));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Transactional
	@Override
	public void updateReview(Long id, ReviewDTO review, Principal principal) {

		Optional<Review> optionalReviewFound = reviewRepository.findById(id);

		if (optionalReviewFound.isPresent()) {
			try {

				Review reviewFound = optionalReviewFound.get();

				if (!bookEditorUserDetailsService.loadUserByUsername(principal.getName()).getId().equals(reviewFound.getUserId())) {
					throw new Exception("Review not allowed to delete");
				}

				ReviewMapper.reviewDTOtoEntity(review, reviewFound);

				reviewRepository.save(reviewFound);

			}
			catch (Exception e) {
				e.printStackTrace();
			}

		}

	}

	@Transactional
	@Override
	public void deleteReview(Long id, Principal principal) {
		Optional<Review> optionalReviewFound = reviewRepository.findById(id);

		if (optionalReviewFound.isPresent()) {
			try {

				Review reviewFound = optionalReviewFound.get();

				if (!bookEditorUserDetailsService.loadUserByUsername(principal.getName()).getId().equals(reviewFound.getUserId())) {
					throw new Exception("Review not allowed to delete");
				}

				reviewRepository.delete(reviewFound);

			}
			catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	private List<ReviewDTO> getReviewsDto(List<Review> reviewList) {
		List<ReviewDTO> result = new ArrayList<>();

		for (Review r : reviewList) {
			result.add(ReviewMapper.reviewToDto(r));
		}

		return result;
	}
}