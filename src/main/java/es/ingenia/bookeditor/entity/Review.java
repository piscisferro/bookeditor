package es.ingenia.bookeditor.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Review implements Serializable {
	private static final long serialVersionUID = 4905495756177928403L;

	@Id
	@GeneratedValue
	private Long id;

	private Integer rating;
	private String content;

	private Long userId;

	@OneToOne
	private Book book;

	public Review() {
		super();
	}

	public Review(Integer rating, String content, Long userId, Book book) {
		super();
		this.rating = rating;
		this.content = content;
		this.userId = userId;
		this.book = book;
	}

}