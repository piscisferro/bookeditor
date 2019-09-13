package es.ingenia.bookeditor.dto.mapper;

import es.ingenia.bookeditor.dto.AuthorDTO;
import es.ingenia.bookeditor.entity.Author;

public class AuthorMapper {

	public static AuthorDTO authorToDto(Author author) {

		return AuthorDTO.builder()
				.id(author.getId())
				.bio(author.getBio())
				.name(author.getName())
				.surname(author.getSurname())
				.userId(author.getUserId())
				.build();

	}
}
