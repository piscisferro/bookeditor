package es.ingenia.bookeditor.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Author implements Serializable {
	private static final long serialVersionUID = 6368409710895438852L;

	@Id
	@GeneratedValue
	private Long id;

	private String name;
	private String surname;
	private String bio;
	private Long userId;

	public Author() {
		super();
	}

	public Author(String name, String surname) {
		super();
		this.name = name;
		this.surname = surname;
	}

	public Author(String name, String surname, Long userId) {
		super();
		this.name = name;
		this.surname = surname;
		this.userId = userId;
	}

}