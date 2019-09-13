package es.ingenia.bookeditor.dto;

import es.ingenia.bookeditor.entity.enums.BookCategoryEnum;
import es.ingenia.bookeditor.entity.enums.BookStateEnum;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookDTO {

	private Long id;

	private String title;
	private String content;

	private BookStateEnum state;

	private BookCategoryEnum category;

	private AuthorDTO author;
}
