package es.ingenia.bookeditor.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RoleBaseDTO {

	private Long id;

	private String authority;

}
