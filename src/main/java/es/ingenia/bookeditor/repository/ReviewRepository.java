package es.ingenia.bookeditor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.ingenia.bookeditor.entity.Review;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {

	@Query("select r from Review r where r.userId = ?#{ principal?.id } ")
	public List<Review> findCurrentUserReviews();

	@Query("select r from Review r where r.userId = ?#{ principal?.id } and r.id = :id")
	public Review findCurrentUserReviewsById(@Param("id") Long id);
}