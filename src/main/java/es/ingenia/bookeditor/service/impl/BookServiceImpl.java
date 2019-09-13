package es.ingenia.bookeditor.service.impl;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.ingenia.bookeditor.dto.BookDTO;
import es.ingenia.bookeditor.dto.mapper.BookMapper;
import es.ingenia.bookeditor.entity.Book;
import es.ingenia.bookeditor.repository.BookRepository;
import es.ingenia.bookeditor.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private BookEditorUserDetailsServiceImpl bookEditorUserDetailsService;

	public List<BookDTO> findCurrentUserBooks() {

		List<Book> books = bookRepository.findCurrentUserBooks();

		return getBookDTOS(books);

	}

	@Override
	public BookDTO findCurrentUserBookById(Long id) {

		return BookMapper.bookToDto(bookRepository.findCurrentUserBookById(id));

	}

	@Override
	public List<BookDTO> findAllBooks() {

		return getBookDTOS((List<Book>) bookRepository.findAll());

	}

	@Override
	public BookDTO findBookById(Long id) {
		return BookMapper.bookToDto(bookRepository.findById(id).get());
	}

	@Transactional
	@Override
	public void updateBook(Long id, BookDTO book, Principal principal) {

		Optional<Book> optionalBookFound = bookRepository.findById(id);

		if (optionalBookFound.isPresent()) {

			try {

				Book bookFound = optionalBookFound.get();

				if (!bookEditorUserDetailsService.loadUserByUsername(principal.getName()).getId().equals(bookFound.getAuthor().getUserId())) {
					throw new Exception("Book not allowed to edit");
				}

				BookMapper.bookDTOtoEntity(book, bookFound);

				bookRepository.save(bookFound);

			}
			catch (Exception e) {
				e.printStackTrace();
			}

		}

	}

	private List<BookDTO> getBookDTOS(List<Book> books) {

		List<BookDTO> result = new ArrayList<>();

		if (!books.isEmpty()) {
			for (Book b : books) {
				result.add(BookMapper.bookToDto(b));
			}
		}

		return result;
	}
}