package es.ingenia.bookeditor.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import es.ingenia.bookeditor.entity.enums.BookCategoryEnum;
import es.ingenia.bookeditor.entity.enums.BookStateEnum;
import lombok.Data;

@Data
@Entity
public class Book implements Serializable {
	private static final long serialVersionUID = -5945301612131407452L;

	@Id
	@GeneratedValue
	private Long id;

	private String title;
	private String content;

	private BookStateEnum state;

	private BookCategoryEnum category;

	public Book() {
		super();
	}

	public Book(String title, BookCategoryEnum category) {
		this(title, BookStateEnum.INIT, category);
	}

	public Book(String title, BookStateEnum state, BookCategoryEnum category) {
		this();
		this.title = title;
		this.state = state;
		this.category = category;
	}

	public Book(String title, BookStateEnum state, BookCategoryEnum category, Author author) {
		this();
		this.title = title;
		this.state = state;
		this.category = category;
		this.author = author;
	}

	@ManyToOne
	private Author author;

}