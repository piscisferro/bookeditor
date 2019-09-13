package es.ingenia.bookeditor.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.ingenia.bookeditor.entity.Author;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {

}