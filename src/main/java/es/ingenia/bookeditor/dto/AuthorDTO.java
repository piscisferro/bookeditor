package es.ingenia.bookeditor.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthorDTO {

	private Long id;

	private String name;
	private String surname;
	private String bio;
	private Long userId;
}
