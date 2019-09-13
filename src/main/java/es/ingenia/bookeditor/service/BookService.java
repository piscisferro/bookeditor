package es.ingenia.bookeditor.service;

import java.security.Principal;
import java.util.List;

import es.ingenia.bookeditor.dto.BookDTO;

public interface BookService {

	List<BookDTO> findCurrentUserBooks();

	BookDTO findCurrentUserBookById(Long id);

	List<BookDTO> findAllBooks();

	BookDTO findBookById(Long id);

	void updateBook(Long id, BookDTO book, Principal principal);
}
