package es.ingenia.bookeditor.dto.mapper;

import java.util.Objects;

import es.ingenia.bookeditor.dto.BookDTO;
import es.ingenia.bookeditor.entity.Book;

public class BookMapper {

	public static BookDTO bookToDto(Book book) {

		return BookDTO.builder()
				.id(book.getId())
				.author(AuthorMapper.authorToDto(book.getAuthor()))
				.category(book.getCategory())
				.content(book.getContent())
				.title(book.getTitle())
				.state(book.getState())
				.build();
	}

	public static void bookDTOtoEntity(BookDTO bookDTO, Book book) throws Exception {

		if (!bookDTO.getId().equals(book.getId())) {
			throw new Exception("Id missmatching when updating");
		}

		if (Objects.nonNull(bookDTO.getTitle()) && !bookDTO.getTitle().equals(book.getTitle())) {
			book.setTitle(bookDTO.getTitle());
		}

		if (Objects.nonNull(bookDTO.getCategory()) && !bookDTO.getCategory().equals(book.getCategory())) {
			book.setCategory(bookDTO.getCategory());
		}

		if (Objects.nonNull(bookDTO.getContent()) && !bookDTO.getContent().equals(book.getContent())) {
			book.setContent(bookDTO.getContent());
		}

		if (Objects.nonNull(bookDTO.getState()) && !bookDTO.getState().equals(book.getState())) {
			book.setState(bookDTO.getState());
		}
	}

}
