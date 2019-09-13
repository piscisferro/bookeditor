package es.ingenia.bookeditor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.ingenia.bookeditor.entity.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

	@Query("select b from Book b where b.author.userId = ?#{ principal?.id } ")
	public List<Book> findCurrentUserBooks();

	@Query("select b from Book b where b.author.userId = ?#{ principal?.id } and b.id=:id")
	public Book findCurrentUserBookById(@Param("id") Long id);
}