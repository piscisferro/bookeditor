package es.ingenia.bookeditor.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewDTO {

	private Long id;

	private Integer rating;
	private String content;

	private Long userId;

	private BookDTO book;
}
