package es.ingenia.bookeditor.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.ingenia.bookeditor.dto.BookDTO;
import es.ingenia.bookeditor.service.BookService;

@RestController
@RequestMapping(path = "api/books")
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping(path = "/search/books-current-user")
	public List<BookDTO> findCurrentUserBooks() {
		return bookService.findCurrentUserBooks();
	}

	@GetMapping(path = "/search/book-current-user-by-id/{id}")
	public BookDTO findCurrentUserBookById(@PathVariable("id") Long id) {
		return bookService.findCurrentUserBookById(id);
	}

	@GetMapping(path = "/{id}")
	public BookDTO findBookById(@PathVariable("id") Long id) {
		return bookService.findBookById(id);
	}

	@GetMapping
	public List<BookDTO> findAllBooks() {
		return bookService.findAllBooks();
	}

	@PutMapping(path = "/{id}")
	public void updateBook(@PathVariable("id") Long id, @RequestBody BookDTO book, Principal principal) {
		bookService.updateBook(id, book, principal);
	}
}