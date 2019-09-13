package es.ingenia.bookeditor.dto.mapper;

import java.util.Objects;

import es.ingenia.bookeditor.dto.ReviewDTO;
import es.ingenia.bookeditor.entity.Review;

public class ReviewMapper {

	public static ReviewDTO reviewToDto(Review review) {

		return ReviewDTO.builder()
				.id(review.getId())
				.rating(review.getRating())
				.userId(review.getUserId())
				.content(review.getContent())
				.book(BookMapper.bookToDto(review.getBook()))
				.build();

	}

	public static void reviewDTOtoEntity(ReviewDTO reviewDTO, Review review) throws Exception {

		if (!reviewDTO.getId().equals(review.getId())) {
			throw new Exception("Id missmatching when updating");
		}

		if (Objects.nonNull(reviewDTO.getContent()) && !reviewDTO.getContent().equals(review.getContent())) {
			review.setContent(reviewDTO.getContent());
		}

		if (Objects.nonNull(reviewDTO.getRating()) && !reviewDTO.getRating().equals(review.getRating())) {
			review.setRating(reviewDTO.getRating());
		}
	}
}
