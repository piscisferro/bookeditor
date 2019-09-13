package es.ingenia.bookeditor.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.ingenia.bookeditor.entity.UserBase;

@Repository
public interface UserBaseRepository extends CrudRepository<UserBase, Long> {

	UserBase findByUsername(String username);

}